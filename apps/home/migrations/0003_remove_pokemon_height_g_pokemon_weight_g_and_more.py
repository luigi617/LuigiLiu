# Generated by Django 4.0.3 on 2023-04-02 23:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_alter_pokemon_percentage_male'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pokemon',
            name='height_g',
        ),
        migrations.AddField(
            model_name='pokemon',
            name='weight_g',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='pokemon',
            name='height_cm',
            field=models.PositiveSmallIntegerField(null=True),
        ),
    ]
