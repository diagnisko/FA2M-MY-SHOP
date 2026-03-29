from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Utilisateur boutique + staff admin."""

    phone = models.CharField(max_length=32, blank=True)
    address = models.TextField(blank=True)
    fcm_token = models.CharField(max_length=512, blank=True, help_text="Token FCM pour notifications push")

    class Meta:
        ordering = ["-date_joined"]
