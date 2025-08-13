from rest_framework import generics
from .models import Alert
from .serializers import AlertSerializer
from rest_framework.response import Response
from django.conf import settings
from django.core.mail import send_mail
import json
import math
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework import status

class CreateAlertView(generics.CreateAPIView):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        alert = serializer.save(user_id=self.request.user.username)
        recipients = getattr(settings, 'ALERT_RECIPIENTS', [settings.DEFAULT_FROM_EMAIL])
        if recipients:
            send_mail(
                subject=f"New Alert: {alert.title}",
                message=alert.message or "No additional message provided.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=recipients,
            )

class ListNearbyAlertsView(generics.ListAPIView):
    serializer_class = AlertSerializer
    permission_classes = [IsAuthenticated]

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
            a = (math.sin(dLat / 2) * math.sin(dLat / 2) +
                 math.cos(math.radians(lat)) * math.cos(math.radians(alert.latitude)) *
                 math.sin(dLon / 2) * math.sin(dLon / 2))
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
            distance = R * c

            if distance <= radius:
                alerts_in_radius.append(alert)

        return alerts_in_radius

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')

            if not all([username, password, email]):
                return JsonResponse({'error': 'Username, password, and email are required'}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)

            user = User.objects.create_user(username=username, email=email, password=password)
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse({'message': 'User created successfully', 'token': token.key, 'redirect': '/'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            if not all([username, password]):
                return JsonResponse({'error': 'Username and password are required'}, status=400)

            user = authenticate(request, username=username, password=password)
            if user is not None:
                token, _ = Token.objects.get_or_create(user=user)
                return JsonResponse({'message': 'Login successful', 'token': token.key, 'redirect': '/'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            email = data.get('email')
            phone = data.get('phone')
            password = data.get('password')

            if not all([username, password, email, first_name, last_name, phone]):
                return JsonResponse({'error': 'All fields are required'}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)

            user = User.objects.create_user(username=username, email=email, password=password)
            user.first_name = first_name
            user.last_name = last_name
            user.phone = phone
            user.save()
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse({'message': 'User created successfully', 'token': token.key, 'redirect': '/login'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_sos_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = request.user.username
            latitude = data.get('latitude')
            longitude = data.get('longitude')
            title = data.get('title', 'SOS Alert')
            message = data.get('message', 'Emergency alert triggered.')

            if not latitude or not longitude:
                return JsonResponse({'error': 'Latitude and longitude are required'}, status=400)

            alert = Alert.objects.create(
                user_id=user_id,
                title=title,
                message=message,
                latitude=latitude,
                longitude=longitude
            )

            subject = f"SOS Alert: {title} from {user_id}"
            message_content = f"Emergency alert triggered.\nTitle: {title}\nMessage: {message}\nLocation: Lat {latitude}, Long {longitude}"
            from_email = settings.DEFAULT_FROM_EMAIL
            recipients = getattr(settings, 'ALERT_RECIPIENTS', [settings.DEFAULT_FROM_EMAIL])

            send_mail(subject, message_content, from_email, recipients, fail_silently=False)
            return JsonResponse({'message': 'Emergency alert sent successfully!', 'alert_id': alert.id}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)