from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alerts', '0002_userprofile_contact'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='alert',
            name='created_by',
            field=models.ForeignKey(
                on_delete=models.CASCADE,
                related_name='alerts',
                to=settings.AUTH_USER_MODEL,
                default=1,
            ),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('read', models.BooleanField(default=False)),
                ('alert', models.ForeignKey(on_delete=models.CASCADE, related_name='notifications', to='alerts.alert')),
                ('user', models.ForeignKey(on_delete=models.CASCADE, related_name='notifications', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
