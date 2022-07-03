# Generated by Django 4.0.3 on 2022-07-03 14:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0003_post_rename_image_dispense_dispense_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='title',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Title'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='post',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='products.post'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='comment',
            name='reply_to',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, related_name='comments_replied', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='comment',
            name='text',
            field=models.TextField(default=None, verbose_name='Text'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, related_name='comments', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
