# Generated by Django 4.2 on 2023-06-05 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0016_remove_babysitter_for_grandparents_babysitter_baby_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='babysitter',
            name='full_name',
            field=models.CharField(default='', max_length=255),
        ),
    ]
