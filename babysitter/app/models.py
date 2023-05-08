from django.db import models

from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Babysitter(models.Model):
    EDUCATION_CHOICES = [
        (1, "высшее"),
        (2, "среднее"),
        (3, "неоконченное")
    ]

    hourly_rate = models.IntegerField(default=12)
    years_of_experience = models.IntegerField(default=1)
    bio = models.CharField(max_length=900, default='')
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='babysitter')
    published = models.BooleanField(default=False)
    full_name = models.CharField(max_length=25, default='')
    for_grandparents = models.BooleanField(default=False)
    birthday = models.DateField(auto_now_add=True)
    gender = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='avatars')
    education = models.IntegerField(choices=EDUCATION_CHOICES, default=EDUCATION_CHOICES[1][0])

class Family(models.Model):
    PAYMENT_METHOD = [
        (1, "Card"),
        (2, "Cash")
    ]
    address = models.CharField(max_length=250, default='')
    payment_method = models.IntegerField(choices=PAYMENT_METHOD, default=PAYMENT_METHOD[1][0])
    number_of_children = models.IntegerField(default=1)
    special_needs = models.CharField(max_length=500, default='')
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='family')

class BookingTable(models.Model):
    end_time = models.DateTimeField()
    start_time = models.DateTimeField(auto_now=True)
    notes = models.CharField(max_length=500)
    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='bookingtable')
    babysitter = models.ForeignKey(Babysitter, on_delete=models.CASCADE, related_name='bookingtable')
