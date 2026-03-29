from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import FCMTokenSerializer, RegisterSerializer, UserSerializer

User = get_user_model()


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        ser = RegisterSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        try:
            user = ser.save()
        except IntegrityError:
            return Response(
                {
                    "username": [
                        "Ce nom d’utilisateur est déjà pris. Choisissez-en un autre.",
                    ],
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def patch(self, request):
        ser = UserSerializer(request.user, data=request.data, partial=True)
        ser.is_valid(raise_exception=True)
        ser.save()
        return Response(ser.data)


class PasswordResetRequestView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = (request.data.get("email") or "").strip().lower()
        if not email:
            return Response({"detail": "Email requis."}, status=400)
        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            return Response({"detail": "Si un compte existe, un email a été envoyé."})
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        link = f"{settings.FRONTEND_URL}/reinitialiser-mot-de-passe?uid={uid}&token={token}"
        send_mail(
            subject="Réinitialisation mot de passe FA2M",
            message=f"Utilisez ce lien pour réinitialiser votre mot de passe :\n{link}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=True,
        )
        if settings.DEBUG:
            return Response({"detail": "Lien (dev)", "link": link})
        return Response({"detail": "Si un compte existe, un email a été envoyé."})


class PasswordResetConfirmView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        uid = request.data.get("uid")
        token = request.data.get("token")
        new_password = request.data.get("new_password")
        if not all([uid, token, new_password]):
            return Response({"detail": "uid, token et new_password requis."}, status=400)
        try:
            pk = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=pk)
        except (User.DoesNotExist, ValueError, TypeError):
            return Response({"detail": "Lien invalide."}, status=400)
        if not default_token_generator.check_token(user, token):
            return Response({"detail": "Lien invalide ou expiré."}, status=400)
        user.set_password(new_password)
        user.save()
        return Response({"detail": "Mot de passe mis à jour."})


class FCMRegisterView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        ser = FCMTokenSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        request.user.fcm_token = ser.validated_data["fcm_token"]
        request.user.save(update_fields=["fcm_token"])
        return Response({"detail": "Token enregistré."})
