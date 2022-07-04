import os
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser

from phonenumber_field.modelfields import PhoneNumberField
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill


def avatar_location(instance, filename):
    folder_name = f'users/avatars/{instance.id}/'
    return os.path.join(folder_name, filename)
class User(AbstractUser):
    phone = PhoneNumberField(unique=True, null=True)
    avatar_thumbnail = ProcessedImageField(upload_to=avatar_location,
                                           processors=[ResizeToFill(100, 50)],
                                           format='JPEG',
                                           options={'quality': 60},
                                           null=True,
                                           )