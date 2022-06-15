from django.db import models
from apps.core.models import TimeStampedModel
from django.utils.translation import gettext_lazy as _
from django.conf import settings
import os

def image_location(instance, filename):
    folder_name = f'products/books/{instance.id}/'
    filename = instance.spritesheet.field.storage.get_valid_name(filename)
    return os.path.join(folder_name, filename)

class Book(TimeStampedModel):
    supplier = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='books', on_delete=models.PROTECT, null=True)
    ISBN = models.CharField(_('ISMB'), max_length=255, blank=True, null=True)
    title = models.CharField(_('Title'), max_length=255,)
    author = models.CharField(_('Author'), max_length=255,)
    price = models.DecimalField(_('Price'), max_digits=settings.DEFAULT_MAX_DIGITS, decimal_places=settings.DEFAULT_DECIMAL_PLACES)
    image = models.ImageField(upload_to=image_location, blank=True, null=True)
    description = models.TextField(_("Condition"), blank=True, null=True)

def dispense_location(instance, filename):
    folder_name = f'products/dispense/{instance.id}/'
    filename = instance.spritesheet.field.storage.get_valid_name(filename)
    return os.path.join(folder_name, filename)

class Dispense(TimeStampedModel):
    supplier = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='dipenses', on_delete=models.PROTECT, null=True)
    title = models.CharField(_('Title'), max_length=255,)
    price = models.DecimalField(_('Price'), max_digits=settings.DEFAULT_MAX_DIGITS, decimal_places=settings.DEFAULT_DECIMAL_PLACES)
    image = models.FileField(upload_to=dispense_location)
    description = models.TextField(_("What it is about"), blank=True, null=True)

