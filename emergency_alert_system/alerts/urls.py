from django.urls import path
from .views import CreateAlertView, ListNearbyAlertsView

urlpatterns = [
    path('alerts/', CreateAlertView.as_view(), name='create-alert'),
    path('alerts/nearby/', ListNearbyAlertsView.as_view(), name='list-nearby-alerts'),
]