from django.db import models

from apps.core.models import TimeStampedModel
from apps.user.models import User
import os
# Create your models here.

def cover_location(instance, filename):
    folder_name = f'articles/cover/{instance.id}/'
    return os.path.join(folder_name, filename)

class Article(TimeStampedModel):

    title = models.CharField(max_length=255)
    content = models.TextField()
    user = models.ForeignKey(User, related_name="articles", on_delete=models.PROTECT)
    cover_img = models.ImageField(upload_to=cover_location, null=True, blank=True,)