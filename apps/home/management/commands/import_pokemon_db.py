import pandas as pd
import numpy as np

from django.core.management.base import BaseCommand
from apps.home.models import Pokemon

from django.templatetags.static import static
from config.settings.base import ROOT_DIR

class Command(BaseCommand):
    help = 'Import Pokemon Data'

    def handle(self, *args, **kwargs):
        # delete pokemon data
        Pokemon.objects.all().delete()

        file_path = str(ROOT_DIR) + static("/csv/pokemon.csv")

        with open(file_path) as file:
            df = pd.read_csv(file, sep=",")
            capture_rate_expection = "30 (Meteorite)255 (Core)"

            for i, pokemon in df.iterrows():
                pokemon_obj = Pokemon()

                pokemon_obj.pokedex_number = pokemon["pokedex_number"]
                pokemon_obj.generation = pokemon["generation"]
                pokemon_obj.is_legendary = pokemon["is_legendary"]

                pokemon_obj.abilities = pokemon["abilities"]

                pokemon_obj.against_bug = int(pokemon["against_bug"] * 100)
                pokemon_obj.against_dark = int(pokemon["against_dark"] * 100)
                pokemon_obj.against_dragon = int(pokemon["against_dragon"] * 100)
                pokemon_obj.against_electric = int(pokemon["against_electric"] * 100)
                pokemon_obj.against_fairy = int(pokemon["against_fairy"] * 100)
                pokemon_obj.against_fight = int(pokemon["against_fight"] * 100)
                pokemon_obj.against_fire = int(pokemon["against_fire"] * 100)
                pokemon_obj.against_flying = int(pokemon["against_flying"] * 100)
                pokemon_obj.against_ghost = int(pokemon["against_ghost"] * 100)
                pokemon_obj.against_grass = int(pokemon["against_grass"] * 100)
                pokemon_obj.against_ground = int(pokemon["against_ground"] * 100)
                pokemon_obj.against_ice = int(pokemon["against_ice"] * 100)
                pokemon_obj.against_normal = int(pokemon["against_normal"] * 100)
                pokemon_obj.against_poison = int(pokemon["against_poison"] * 100)
                pokemon_obj.against_psychic = int(pokemon["against_psychic"] * 100)
                pokemon_obj.against_rock = int(pokemon["against_rock"] * 100)
                pokemon_obj.against_steel = int(pokemon["against_steel"] * 100)
                pokemon_obj.against_water = int(pokemon["against_water"] * 100)

                pokemon_obj.hp = pokemon["hp"]
                pokemon_obj.attack = pokemon["attack"]
                pokemon_obj.sp_attack = pokemon["sp_attack"]
                pokemon_obj.defense = pokemon["defense"]
                pokemon_obj.sp_defense = pokemon["sp_defense"]
                pokemon_obj.speed = pokemon["speed"]
                pokemon_obj.base_total = pokemon["base_total"]

                pokemon_obj.base_egg_steps = pokemon["base_egg_steps"]
                pokemon_obj.base_happiness = pokemon["base_happiness"]
                pokemon_obj.capture_rate = pokemon["capture_rate"] if pokemon["capture_rate"] != capture_rate_expection else 30
                pokemon_obj.experience_growth = pokemon["experience_growth"]
                pokemon_obj.height_cm = int(pokemon["height_m"] * 100) if not np.isnan(pokemon["height_m"]) else None
                pokemon_obj.weight_g = int(pokemon["weight_kg"] * 100) if not np.isnan(pokemon["weight_kg"]) else None

                pokemon_obj.percentage_male = pokemon["percentage_male"]
                pokemon_obj.classfication = pokemon["classfication"]
                pokemon_obj.name = pokemon["name"]
                pokemon_obj.japanese_name = pokemon["japanese_name"]
                pokemon_obj.type1 = pokemon["type1"]
                pokemon_obj.type2 = pokemon["type2"]
                try:
                    pokemon_obj.save()
                except Exception as e:
                    print(e, pokemon_obj.pokedex_number)
                


            
