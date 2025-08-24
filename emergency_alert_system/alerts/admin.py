from django.contrib import admin

from .models import Alert, UserProfile, Contact, Notification

admin.site.register(Alert)
admin.site.register(UserProfile)
admin.site.register(Contact)
admin.site.register(Notification)
