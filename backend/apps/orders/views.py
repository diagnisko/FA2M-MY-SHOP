from decimal import Decimal

from django.db import transaction
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.catalog.models import Product

from .models import Cart, CartItem, Order, OrderItem, OrderStatus, PaymentMethod
from .serializers import (
    CartItemWriteSerializer,
    CartSerializer,
    CheckoutSerializer,
    OrderAdminSerializer,
    OrderSerializer,
)


def get_or_create_cart(user):
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart


class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart = get_or_create_cart(request.user)
        return Response(CartSerializer(cart).data)


class CartItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        ser = CartItemWriteSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        cart = get_or_create_cart(request.user)
        product = ser.validated_data["product"]
        qty = ser.validated_data["quantity"]
        if product.stock < qty:
            return Response({"detail": "Stock insuffisant."}, status=400)
        item, created = CartItem.objects.get_or_create(cart=cart, product=product, defaults={"quantity": qty})
        if not created:
            new_qty = item.quantity + qty
            if product.stock < new_qty:
                return Response({"detail": "Stock insuffisant."}, status=400)
            item.quantity = new_qty
            item.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request):
        """Met à jour la quantité: { product_id, quantity }."""
        try:
            product_id = int(request.data.get("product"))
            quantity = int(request.data.get("quantity"))
        except (TypeError, ValueError):
            return Response({"detail": "product et quantity requis."}, status=400)
        if quantity < 1:
            cart = get_or_create_cart(request.user)
            CartItem.objects.filter(cart=cart, product_id=product_id).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        cart = get_or_create_cart(request.user)
        try:
            item = CartItem.objects.get(cart=cart, product_id=product_id)
        except CartItem.DoesNotExist:
            return Response({"detail": "Ligne introuvable."}, status=404)
        if item.product.stock < quantity:
            return Response({"detail": "Stock insuffisant."}, status=400)
        item.quantity = quantity
        item.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request):
        product_id = request.data.get("product") or request.query_params.get("product")
        if not product_id:
            return Response({"detail": "product requis."}, status=400)
        cart = get_or_create_cart(request.user)
        CartItem.objects.filter(cart=cart, product_id=product_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        ser = CheckoutSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        cart = get_or_create_cart(request.user)
        items = list(cart.items.select_related("product").all())
        if not items:
            return Response({"detail": "Panier vide."}, status=400)
        pm = ser.validated_data["payment_method"]
        if pm in (PaymentMethod.STRIPE, PaymentMethod.PAYPAL, PaymentMethod.MOBILE_MONEY):
            return Response(
                {"detail": "Ce mode de paiement sera disponible après configuration (Stripe / PayPal / Mobile Money)."},
                status=501,
            )
        total = Decimal("0")
        for ci in items:
            p = ci.product
            if p.stock < ci.quantity:
                return Response({"detail": f'Stock insuffisant pour "{p.name}".'}, status=400)
            total += p.price * ci.quantity
        order = Order.objects.create(
            user=request.user,
            payment_method=pm,
            total=total,
            shipping_name=ser.validated_data["shipping_name"],
            shipping_phone=ser.validated_data["shipping_phone"],
            shipping_address=ser.validated_data["shipping_address"],
            notes=ser.validated_data.get("notes") or "",
            status=OrderStatus.PENDING,
        )
        for ci in items:
            p = ci.product
            OrderItem.objects.create(
                order=order,
                product=p,
                product_name=p.name,
                unit_price=p.price,
                quantity=ci.quantity,
            )
            Product.objects.filter(pk=p.pk).update(stock=p.stock - ci.quantity)
        cart.items.all().delete()
        return Response(OrderSerializer(order).data, status=201)


class OrderListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        qs = Order.objects.filter(user=request.user).prefetch_related("items")
        return Response(OrderSerializer(qs, many=True).data)


class OrderDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            order = Order.objects.prefetch_related("items").get(pk=pk, user=request.user)
        except Order.DoesNotExist:
            return Response({"detail": "Introuvable."}, status=404)
        return Response(OrderSerializer(order).data)


class AdminOrderListView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        qs = Order.objects.select_related("user").prefetch_related("items").all()
        return Response(OrderAdminSerializer(qs, many=True).data)


class AdminOrderDetailView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, pk):
        try:
            order = Order.objects.select_related("user").prefetch_related("items").get(pk=pk)
        except Order.DoesNotExist:
            return Response({"detail": "Introuvable."}, status=404)
        return Response(OrderAdminSerializer(order).data)

    def patch(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({"detail": "Introuvable."}, status=404)
        status_val = request.data.get("status")
        if status_val not in dict(OrderStatus.choices):
            return Response({"detail": "Statut invalide."}, status=400)
        order.status = status_val
        order.save(update_fields=["status", "updated_at"])
        return Response(OrderAdminSerializer(order).data)


class AdminUserListView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        from django.contrib.auth import get_user_model

        User = get_user_model()
        users = list(
            User.objects.values(
                "id", "username", "email", "is_staff", "date_joined", "phone"
            )[:500]
        )
        return Response(users)
