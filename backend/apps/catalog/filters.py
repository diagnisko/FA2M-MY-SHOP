import django_filters
from django.db.models import Q

from .models import Product


class ProductFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method="filter_search")
    category = django_filters.NumberFilter(field_name="category_id")
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr="lte")

    class Meta:
        model = Product
        fields = ["search", "category", "min_price", "max_price"]

    def filter_search(self, queryset, name, value):
        if not value:
            return queryset
        return queryset.filter(Q(name__icontains=value) | Q(description__icontains=value))
