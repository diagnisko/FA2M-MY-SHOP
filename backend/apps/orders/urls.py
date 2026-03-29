from django.urls import path

from .views import (
    AdminOrderDetailView,
    AdminOrderListView,
    AdminUserListView,
    CartItemView,
    CartView,
    CheckoutView,
    OrderDetailView,
    OrderListView,
)

urlpatterns = [
    path("cart/", CartView.as_view()),
    path("cart/items/", CartItemView.as_view()),
    path("cart/checkout/", CheckoutView.as_view()),
    path("orders/", OrderListView.as_view()),
    path("orders/<int:pk>/", OrderDetailView.as_view()),
    path("admin/orders/", AdminOrderListView.as_view()),
    path("admin/orders/<int:pk>/", AdminOrderDetailView.as_view()),
    path("admin/users/", AdminUserListView.as_view()),
]
