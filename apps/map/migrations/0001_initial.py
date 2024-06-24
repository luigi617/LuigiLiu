# Generated by Django 4.0.3 on 2024-06-24 19:39

import apps.map.models
from django.db import migrations, models
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Marker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_image', models.ImageField(blank=True, null=True, upload_to=apps.map.models.company_image)),
                ('company_name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, null=True, region=None)),
                ('tags', models.TextField()),
                ('opening_hours', models.TextField()),
            ],
        ),
    ]
