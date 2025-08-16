from django.contrib import admin

from .models import Alert, UserProfile, Contact

admin.site.register(Alert)
admin.site.register(UserProfile)
admin.site.register(Contact)
