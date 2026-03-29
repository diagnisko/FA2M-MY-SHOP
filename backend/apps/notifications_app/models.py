from django.db import models

# Les tokens FCM sont stockés sur User.fcm_token.
# Ce module peut accueillir des campagnes / journaux plus tard.


class PushCampaign(models.Model):
    """Brouillon pour campagnes promo (envoi FCM à brancher côté serveur)."""

    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title
