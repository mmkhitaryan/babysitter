# Generated by Django 4.2 on 2023-04-10 17:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='babysitter',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='babysitter', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='family',
            name='address',
            field=models.CharField(default='', max_length=250),
        ),
        migrations.AlterField(
            model_name='family',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='family', to=settings.AUTH_USER_MODEL),
        ),
    ]
