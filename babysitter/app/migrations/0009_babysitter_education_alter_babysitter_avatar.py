# Generated by Django 4.2 on 2023-05-08 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_babysitter_avatar_alter_babysitter_birthday'),
    ]

    operations = [
        migrations.AddField(
            model_name='babysitter',
            name='education',
            field=models.IntegerField(choices=[(1, 'высшее'), (2, 'среднее'), (3, 'неоконченное')], default=2),
        ),
        migrations.AlterField(
            model_name='babysitter',
            name='avatar',
            field=models.ImageField(upload_to='avatars'),
        ),
    ]
