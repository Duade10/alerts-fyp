from django.urls import path
from .views import (
    CreateAlertView,
    ListNearbyAlertsView,
    LatestNearbyAlertView,
    RegisterView,
    LoginView,
    ContactListCreateView,
    NotificationListView,
)

urlpatterns = [
    path('alerts/', CreateAlertView.as_view(), name='create-alert'),
    path('alerts/nearby/', ListNearbyAlertsView.as_view(), name='list-nearby-alerts'),
    path('alerts/nearest/', LatestNearbyAlertView.as_view(), name='latest-nearby-alert'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('contacts/', ContactListCreateView.as_view(), name='contacts'),
    path('notifications/', NotificationListView.as_view(), name='notifications'),
]
