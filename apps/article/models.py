from django.db import models

from apps.core.models import TimeStampedModel
from apps.user.models import User

# Create your models here.
class Article(TimeStampedModel):

    title = models.CharField(max_length=255)
    content = models.TextField()
    user = models.ForeignKey(User, related_name="articles", on_delete=models.PROTECT)