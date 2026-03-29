import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("catalog", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Cart",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "user",
                    models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="cart", to=settings.AUTH_USER_MODEL),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Order",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("pending", "En attente"),
                            ("confirmed", "Confirmée"),
                            ("shipped", "Expédiée"),
                            ("delivered", "Livrée"),
                            ("cancelled", "Annulée"),
                        ],
                        default="pending",
                        max_length=20,
                    ),
                ),
                (
                    "payment_method",
                    models.CharField(
                        choices=[
                            ("cod", "Paiement à la livraison"),
                            ("pickup", "Paiement sur place (retrait)"),
                            ("stripe", "Stripe (à configurer)"),
                            ("paypal", "PayPal (à configurer)"),
                            ("mobile_money", "Mobile Money (à configurer)"),
                        ],
                        default="cod",
                        max_length=32,
                    ),
                ),
                ("total", models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ("shipping_name", models.CharField(max_length=200)),
                ("shipping_phone", models.CharField(max_length=32)),
                ("shipping_address", models.TextField()),
                ("notes", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="orders",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
        migrations.CreateModel(
            name="OrderItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("product_name", models.CharField(max_length=200)),
                ("unit_price", models.DecimalField(decimal_places=2, max_digits=12)),
                ("quantity", models.PositiveIntegerField()),
                (
                    "order",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="items", to="orders.order"),
                ),
                (
                    "product",
                    models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to="catalog.product"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="CartItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("quantity", models.PositiveIntegerField(default=1)),
                (
                    "cart",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="items", to="orders.cart"),
                ),
                (
                    "product",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="catalog.product"),
                ),
            ],
            options={
                "unique_together": {("cart", "product")},
            },
        ),
    ]
