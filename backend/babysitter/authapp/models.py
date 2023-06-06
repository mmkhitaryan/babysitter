from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomUser(AbstractBaseUser, PermissionsMixin):
    USER_TYPES = [
        (1, "Babysitter"),
        (2, "Family")
    ]
    user_type = models.IntegerField(choices=USER_TYPES, default=USER_TYPES[1][0])
    phone = models.CharField(max_length=12, unique=True)
    USERNAME_FIELD = "phone"
