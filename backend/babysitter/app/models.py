from django.utils import timezone
from django.db import models

from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator

User = get_user_model()

# Create your models here.
class Address(models.Model):
    name = models.CharField(255)
    def __str__(self):
        return self.name

class Babysitter(models.Model):
    EDUCATION_CHOICES = [
        (1, "высшее"),
        (2, "среднее"),
        (3, "неоконченное")
    ]

    hourly_rate = models.IntegerField(default=500)
    years_of_experience = models.IntegerField(default=1)
    bio = models.CharField(max_length=900, default='')
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='babysitter')
    published = models.BooleanField(default=False)
    full_name = models.CharField(max_length=255, default='')
    baby = models.BooleanField(default=False)
    detsad = models.BooleanField(default=False)
    threeToFive = models.BooleanField(default=False)
    birthday = models.DateField(default=timezone.now)
    gender = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='avatars')
    education = models.IntegerField(choices=EDUCATION_CHOICES, default=EDUCATION_CHOICES[1][0])
    address_type = models.ManyToManyField(Address)
    def __str__(self):
        return self.full_name


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
    address_type = models.ForeignKey(Address, on_delete=models.SET_DEFAULT, default=1)

class BookingTable(models.Model):
    end_time = models.DateTimeField()
    start_time = models.DateTimeField()
    notes = models.CharField(max_length=500)
    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='bookingtable')
    babysitter = models.ForeignKey(Babysitter, on_delete=models.CASCADE, related_name='bookingtable')

class Certificate(models.Model):
    babysitter = models.ForeignKey(Babysitter, on_delete=models.CASCADE, related_name='certificates')
    certificate_file = models.ImageField(upload_to='certificates')

class Review(models.Model):
    babysitter = models.ForeignKey(Babysitter, on_delete=models.CASCADE, related_name='reviews')
    text = models.TextField()
    rating = models.PositiveIntegerField(
        validators=[MaxValueValidator(5), MinValueValidator(1)]
    )
