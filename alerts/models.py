from django.db import models

class Alert(models.Model):
    title = models.CharField(max_length=200)
    user_id = models.CharField(max_length=100,null=True, blank=True)
    message = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.user_id}" 