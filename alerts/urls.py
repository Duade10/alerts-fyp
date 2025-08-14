from django.urls import path
from .views import CreateAlertView, ListNearbyAlertsView, send_sos_email, signup, login

urlpatterns = [
    path('alerts/', CreateAlertView.as_view(), name='create-alert'),
    path('alerts/nearby/', ListNearbyAlertsView.as_view(), name='list-nearby-alerts'),
    path('send-sos-email/', send_sos_email, name='send-sos-email'),
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
]