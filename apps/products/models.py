from io import StringIO, BytesIO
from config.settings.base import MEDIA_ROOT
from .validators import validate_dispense_extension
from django.db import models
from apps.core.models import AbstractImage, TimeStampedModel
from django.utils.translation import gettext_lazy as _
from django.conf import settings
import os
from pdf2image import convert_from_bytes
from PIL import ImageFilter
from django.core.files.base import ContentFile

def image_location(instance, filename):
    folder_name = f'products/post/'
    return os.path.join(folder_name, filename)



class Post(TimeStampedModel):
    title = models.CharField(_('Title'), max_length=255, blank=True, null=True)
    text = models.TextField(_("Text"), )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posts', on_delete=models.PROTECT, null=True)

class PostImage(AbstractImage):
    file = models.ImageField(upload_to=image_location)
    post = models.ForeignKey(Post, related_name='post_images', null=True, on_delete=models.PROTECT)

class Book(TimeStampedModel):
    title = models.CharField(_('Title'), max_length=100, blank=True, null=True)
    
    post = models.ForeignKey(Post, related_name='books', on_delete=models.SET_NULL, null=True)
    ISBN = models.CharField(_('ISBN'), max_length=255, blank=True, null=True)
    author = models.CharField(_('Author'), max_length=255, blank=True, null=True)
    price = models.DecimalField(_('Price'), max_digits=settings.DEFAULT_MAX_DIGITS, decimal_places=settings.DEFAULT_DECIMAL_PLACES)
    school = models.CharField(_('School'), max_length=100, blank=True, null=True)
    course = models.CharField(_('Course'), max_length=100, blank=True, null=True)

def dispense_location(instance, filename):
    folder_name = f'products/dispense/'
    return os.path.join(folder_name, filename)
def dispense_trial_location(instance, filename):
    folder_name = f'products/dispense/trial/'
    return os.path.join(folder_name, filename)



class Dispense(TimeStampedModel):
    post = models.ForeignKey(Post, related_name='dispenses', on_delete=models.SET_NULL, null=True)
    dispense = models.FileField(upload_to=dispense_location, validators=[validate_dispense_extension])
    trial_dispense = models.FileField(upload_to=dispense_trial_location, null=True)
    description = models.CharField(_('Description'), max_length=255, blank=True, null=True)
    price = models.DecimalField(_('Price'), max_digits=settings.DEFAULT_MAX_DIGITS, decimal_places=settings.DEFAULT_DECIMAL_PLACES)
    school = models.CharField(_('School'), max_length=100, blank=True, null=True)
    course = models.CharField(_('Course'), max_length=100, blank=True, null=True)
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='dispenses', on_delete=models.PROTECT, null=True)
    allowed_user = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='bought_dispenses', blank=True, null=True)

    def save(self, *args, **kwargs):
        trial_dispense = BytesIO()
        cover_page_image = convert_from_bytes(
            pdf_file = self.dispense.open("rb").read(),
        )
        page_num = len(cover_page_image)
        num_page_display = int(page_num / 5)
        percentage_page_display = page_num / 5 - int(page_num / 5)

        width, height = cover_page_image[num_page_display].size
        top = int(height - (height * percentage_page_display))
        box = (0, top, width, height)
        ic = cover_page_image[num_page_display].crop(box)

        ic = ic.filter(ImageFilter.GaussianBlur(15))
        cover_page_image[num_page_display].paste(ic, box)
        for i in range(num_page_display + 1, page_num):
            cover_page_image[i] = cover_page_image[i].filter(ImageFilter.GaussianBlur(15))
        images = []
        for im in cover_page_image:
            images.append(im.convert('RGB'))
        filename = "".join(os.path.basename(self.dispense.name).split(".")[:-1])
        images[0].save(fp=trial_dispense, format="PDF", save_all=True, append_images=images[1:])
        self.trial_dispense = ContentFile(trial_dispense.getvalue(), filename + '.pdf')


        super(Dispense, self).save(*args, **kwargs)

class Comment(TimeStampedModel):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField(_("Text"))
    reply_to = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments_replied', on_delete=models.PROTECT, blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments', on_delete=models.PROTECT)

