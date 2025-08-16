from django.contrib.auth import authenticate
from django.http import Http404
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from django.core.mail import send_mail
import math

from .models import Alert, Contact
from .serializers import (
    AlertSerializer,
    UserSerializer,
    LoginSerializer,
    ContactSerializer,
)


class CreateAlertView(generics.CreateAPIView):
    """Create a new emergency alert."""
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer

    def perform_create(self, serializer):
        """Send an email notification after creating an alert."""
        alert = serializer.save()
        recipients = getattr(settings, 'ALERT_RECIPIENTS', [])
        if recipients:
            send_mail(
                subject=f"New Alert: {alert.title}",
                message=alert.message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=recipients,
            )


class ListNearbyAlertsView(generics.ListAPIView):
    """List all alerts within a specified radius of a given location."""
    serializer_class = AlertSerializer

    def get_queryset(self):
        latitude = self.request.query_params.get('lat')
        longitude = self.request.query_params.get('lon')
        radius_km = self.request.query_params.get('radius')

        if not all([latitude, longitude, radius_km]):
            return Alert.objects.none()

        try:
            lat = float(latitude)
            lon = float(longitude)
            radius = float(radius_km)
        except (ValueError, TypeError):
            return Alert.objects.none()

        alerts_in_radius = []
        for alert in Alert.objects.all():
            R = 6371
            dLat = math.radians(alert.latitude - lat)
            dLon = math.radians(alert.longitude - lon)
            a = (
                math.sin(dLat / 2) * math.sin(dLat / 2)
                + math.cos(math.radians(lat)) * math.cos(math.radians(alert.latitude))
                * math.sin(dLon / 2) * math.sin(dLon / 2)
            )
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
            distance = R * c

            if distance <= radius:
                alerts_in_radius.append(alert)

        return alerts_in_radius


class LatestNearbyAlertView(generics.RetrieveAPIView):
    serializer_class = AlertSerializer

    def get_object(self):
        latitude = self.request.query_params.get('lat')
        longitude = self.request.query_params.get('lon')
        radius_km = self.request.query_params.get('radius')

        if not all([latitude, longitude, radius_km]):
            raise Http404

        try:
            lat = float(latitude)
            lon = float(longitude)
            radius = float(radius_km)
        except (ValueError, TypeError):
            raise Http404

        alerts_view = ListNearbyAlertsView()
        alerts_view.request = self.request
        queryset = alerts_view.get_queryset()
        if not queryset:
            raise Http404
        return max(queryset, key=lambda a: a.timestamp)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            username=serializer.validated_data['email'],
            password=serializer.validated_data['password'],
        )
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'require_location': True})
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


class ContactListCreateView(generics.ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Contact.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
