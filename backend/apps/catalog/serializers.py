from rest_framework import serializers

from .models import Category, Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ("id", "image", "sort_order")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug", "description")


class ProductListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "slug",
            "description",
            "price",
            "stock",
            "category",
            "category_name",
            "main_image",
            "is_active",
        )


class ProductDetailSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source="category", read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "slug",
            "description",
            "price",
            "stock",
            "category",
            "category_detail",
            "main_image",
            "images",
            "is_active",
            "created_at",
            "updated_at",
        )


class ProductWriteSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        allow_null=True,
        required=False,
    )

    class Meta:
        model = Product
        fields = (
            "name",
            "slug",
            "description",
            "price",
            "stock",
            "category",
            "main_image",
            "is_active",
        )
        extra_kwargs = {"slug": {"allow_blank": True, "required": False}}
