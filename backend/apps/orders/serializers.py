from decimal import Decimal

from rest_framework import serializers

from apps.catalog.models import Product

from .models import CartItem, Order, OrderItem, PaymentMethod


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    unit_price = serializers.DecimalField(
        max_digits=12, decimal_places=2, source="product.price", read_only=True
    )
    main_image = serializers.ImageField(source="product.main_image", read_only=True)
    line_total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ("id", "product", "product_name", "unit_price", "main_image", "quantity", "line_total")

    def get_line_total(self, obj):
        return obj.product.price * obj.quantity


class CartSerializer(serializers.Serializer):
    """Représentation du panier (pas un ModelSerializer)."""

    def to_representation(self, cart):
        items = cart.items.select_related("product")
        subtotal = Decimal("0")
        for item in items:
            subtotal += item.product.price * item.quantity
        return {
            "items": CartItemSerializer(items, many=True).data,
            "subtotal": subtotal,
        }


class CartItemWriteSerializer(serializers.Serializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.filter(is_active=True))
    quantity = serializers.IntegerField(min_value=1)


class CheckoutSerializer(serializers.Serializer):
    payment_method = serializers.ChoiceField(choices=[c[0] for c in PaymentMethod.choices])
    shipping_name = serializers.CharField(max_length=200)
    shipping_phone = serializers.CharField(max_length=32)
    shipping_address = serializers.CharField()
    notes = serializers.CharField(required=False, allow_blank=True)


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("product", "product_name", "unit_price", "quantity")


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "status",
            "payment_method",
            "total",
            "shipping_name",
            "shipping_phone",
            "shipping_address",
            "notes",
            "items",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("status", "total", "created_at", "updated_at")


class OrderAdminSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "user",
            "username",
            "status",
            "payment_method",
            "total",
            "shipping_name",
            "shipping_phone",
            "shipping_address",
            "notes",
            "items",
            "created_at",
            "updated_at",
        )
