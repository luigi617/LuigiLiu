from django.db import models


from apps.user.models import User

# Create your models here.


class Pokemon(models.Model):
    pokedex_number = models.IntegerField()
    generation = models.PositiveSmallIntegerField()
    is_legendary = models.BooleanField()

    abilities = models.JSONField()

    against_bug = models.PositiveSmallIntegerField()
    against_dark = models.PositiveSmallIntegerField()
    against_dragon = models.PositiveSmallIntegerField()
    against_electric = models.PositiveSmallIntegerField()
    against_fairy = models.PositiveSmallIntegerField()
    against_fight = models.PositiveSmallIntegerField()
    against_fire = models.PositiveSmallIntegerField()
    against_flying = models.PositiveSmallIntegerField()
    against_ghost = models.PositiveSmallIntegerField()
    against_grass = models.PositiveSmallIntegerField()
    against_ground = models.PositiveSmallIntegerField()
    against_ice = models.PositiveSmallIntegerField()
    against_normal = models.PositiveSmallIntegerField()
    against_poison = models.PositiveSmallIntegerField()
    against_psychic = models.PositiveSmallIntegerField()
    against_rock = models.PositiveSmallIntegerField()
    against_steel = models.PositiveSmallIntegerField()
    against_water = models.PositiveSmallIntegerField()
    
    hp = models.PositiveSmallIntegerField()
    attack = models.PositiveSmallIntegerField()
    sp_attack = models.PositiveSmallIntegerField()
    defense = models.PositiveSmallIntegerField()
    sp_defense = models.PositiveSmallIntegerField()
    speed = models.PositiveSmallIntegerField()
    base_total = models.PositiveSmallIntegerField()

    base_egg_steps = models.PositiveIntegerField()
    base_happiness = models.PositiveSmallIntegerField()
    capture_rate = models.PositiveSmallIntegerField()
    experience_growth = models.PositiveIntegerField()
    height_cm = models.PositiveIntegerField(null=True)
    weight_g = models.PositiveIntegerField(null=True)

    percentage_male = models.FloatField(null=True)
    classfication = models.CharField(max_length=60)
    name = models.CharField(max_length=50)
    japanese_name = models.CharField(max_length=50)

    type1 = models.CharField(max_length=20)
    type2 = models.CharField(max_length=20)
    