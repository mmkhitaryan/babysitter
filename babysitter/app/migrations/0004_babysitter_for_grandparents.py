# Generated by Django 4.2 on 2023-04-26 20:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_bookingtable_start_time_alter_bookingtable_end_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='babysitter',
            name='for_grandparents',
            field=models.BooleanField(default=False),
        ),
    ]
