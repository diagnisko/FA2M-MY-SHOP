from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .filters import ProductFilter
from .models import Category, Product, ProductImage
from .serializers import (
    CategorySerializer,
    ProductDetailSerializer,
    ProductListSerializer,
    ProductImageSerializer,
    ProductWriteSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "slug"
    pagination_class = None

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]


class ProductViewSet(viewsets.ModelViewSet):
    filterset_class = ProductFilter

    def get_queryset(self):
        qs = Product.objects.select_related("category").prefetch_related("images")
        user = self.request.user
        if not user.is_authenticated or not user.is_staff:
            qs = qs.filter(is_active=True)
        return qs

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductDetailSerializer
        if self.action in ("create", "update", "partial_update"):
            return ProductWriteSerializer
        return ProductListSerializer

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAdminUser()])
    def images(self, request, pk=None):
        product = self.get_object()
        ser = ProductImageSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        ser.save(product=product)
        return Response(ser.data, status=201)
