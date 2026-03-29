from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from apps.notifications_app.services import notify_order_status

from .models import Order


@receiver(pre_save, sender=Order)
def _cache_order_status(sender, instance, **kwargs):
    if not instance.pk:
        instance._prev_status = None
        return
    try:
        prev = Order.objects.only("status").get(pk=instance.pk)
        instance._prev_status = prev.status
    except Order.DoesNotExist:
        instance._prev_status = None


@receiver(post_save, sender=Order)
def order_status_changed_push(sender, instance, **kwargs):
    prev = getattr(instance, "_prev_status", None)
    if prev is not None and prev != instance.status and instance.user_id:
        notify_order_status(instance.user, instance.get_status_display())
