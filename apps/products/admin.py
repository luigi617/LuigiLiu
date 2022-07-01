from django.contrib import admin

# Register your models here.
from apps.products.models import *

admin.site.register(Post)
admin.site.register(PostImage)
admin.site.register(Book)
admin.site.register(Dispense)
admin.site.register(Comment)