from django.test import TestCase, override_settings
from django.urls import reverse
from rest_framework.test import APIClient
from django.core import mail


class AlertEmailTest(TestCase):
    """Ensure an email is sent when an alert is created."""

    def setUp(self):
        self.client = APIClient()

    @override_settings(
        ALERT_RECIPIENTS=['test@example.com'],
        EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend',
        DEFAULT_FROM_EMAIL='noreply@example.com',
    )
    def test_email_sent_on_alert_creation(self):
        payload = {
            'title': 'Test',
            'message': 'Test message',
            'latitude': 1.0,
            'longitude': 2.0,
        }
        response = self.client.post(reverse('create-alert'), payload, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn('New Alert: Test', mail.outbox[0].subject)
