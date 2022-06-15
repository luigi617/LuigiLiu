from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
# from phonenumber_field import modelfields

class User(AbstractUser):
    phone = PhoneNumberField(unique=True, null=True)