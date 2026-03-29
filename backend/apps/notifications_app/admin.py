from django.contrib import admin

from .models import PushCampaign


@admin.register(PushCampaign)
class PushCampaignAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at", "sent_at")
