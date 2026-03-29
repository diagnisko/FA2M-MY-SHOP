"""Point d'extension pour Firebase Cloud Messaging (FCM).

Configurer FIREBASE_SERVER_KEY ou utiliser firebase-admin et appeler send_push().
"""

import logging

logger = logging.getLogger(__name__)


def send_push_to_token(title: str, body: str, token: str) -> bool:
    """Envoie une notification (à implémenter avec FCM). Pour l’instant : log."""

    if not token:
        return False
    logger.info("Push stub title=%s token=%s...", title, token[:20])
    # Exemple futur : firebase_admin.messaging.send(...)
    return True


def notify_order_status(user, status: str) -> None:
    if user is None:
        return
    token = getattr(user, "fcm_token", "") or ""
    if token:
        send_push_to_token("Commande FA2M", f"Statut : {status}", token)
