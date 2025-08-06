from rest_framework import generics
from .models import Alert
from .serializers import AlertSerializer
from rest_framework.response import Response
import math

class CreateAlertView(generics.CreateAPIView):
    """
    Create a new emergency alert.
    """
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer

class ListNearbyAlertsView(generics.ListAPIView):
    """
    List all alerts within a specified radius of a given location.
    Pass 'lat', 'lon', and 'radius' (in kilometers) as query parameters.
    Example: /api/alerts/nearby/?lat=6.5244&lon=3.3792&radius=10
    """
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

        # Dummy distance calculation (Haversine formula simplified)
        # This is for demonstration; for a real-world app, use GeoDjango or a proper geospatial library.
        alerts_in_radius = []
        for alert in Alert.objects.all():
            # Rough distance calculation
            R = 6371  # Radius of Earth in kilometers
            dLat = math.radians(alert.latitude - lat)
            dLon = math.radians(alert.longitude - lon)
            a = (math.sin(dLat / 2) * math.sin(dLat / 2) +
                 math.cos(math.radians(lat)) * math.cos(math.radians(alert.latitude)) *
                 math.sin(dLon / 2) * math.sin(dLon / 2))
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
            distance = R * c

            if distance <= radius:
                alerts_in_radius.append(alert)

        return alerts_in_radius