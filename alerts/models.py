from django.db import models

class Alert(models.Model):
    user_id = models.CharField(max_length=200, null=True)
    title = models.CharField(max_length=200)
    message = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title