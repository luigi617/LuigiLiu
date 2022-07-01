from django.db import models
from apps.core.models import AbstractImage, TimeStampedModel
from django.utils.translation import gettext_lazy as _
from django.conf import settings
import os

def image_location(instance, filename):
    folder_name = f'products/post/'
    return os.path.join(folder_name, filename)



class Post(TimeStampedModel):
    title = models.CharField(_('Title'), max_length=255,)
    text = models.TextField(_("Text"), blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posts', on_delete=models.PROTECT, null=True)

class PostImage(AbstractImage):
    file = models.ImageField(upload_to=image_location)
    post = models.ForeignKey(Post, related_name='post_images', blank=True, null=True, on_delete=models.PROTECT)

class Book(TimeStampedModel):
    post = models.ForeignKey(Post, related_name='books', on_delete=models.SET_NULL, blank=True, null=True)
    ISBN = models.CharField(_('ISBN'), max_length=255, blank=True, null=True)
    author = models.CharField(_('Author'), max_length=255,)
    price = models.DecimalField(_('Price'), max_digits=settings.DEFAULT_MAX_DIGITS, decimal_places=settings.DEFAULT_DECIMAL_PLACES)

def dispense_location(instance, filename):
    folder_name = f'products/dispense/'
    filename = str(instance.id)
    return os.path.join(folder_name, filename)

class Dispense(TimeStampedModel):
    post = models.ForeignKey(Post, related_name='dispenses', on_delete=models.SET_NULL, blank=True, null=True)
    dispense = models.FileField(upload_to=dispense_location)
    price = models.DecimalField(_('Price'), max_digits=settings.DEFAULT_MAX_DIGITS, decimal_places=settings.DEFAULT_DECIMAL_PLACES)

class Comment(TimeStampedModel):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE, blank=True, null=True)
    text = models.TextField(_("Text"), blank=True, null=True)
    reply_to = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments_replied', on_delete=models.PROTECT, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments', on_delete=models.PROTECT, null=True)

