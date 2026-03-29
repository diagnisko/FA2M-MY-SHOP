from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ("Profil FA2M", {"fields": ("phone", "address", "fcm_token")}),
    )
    list_display = ("username", "email", "phone", "is_staff", "is_active")
