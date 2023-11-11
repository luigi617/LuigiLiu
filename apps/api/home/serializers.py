from rest_framework import serializers
from apps.article.models import Article
from apps.home.models import Pokemon

class DisplayArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "url_name", "user", "title", "date_modified", "cover_img"]

class PokemonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = ["pokedex_number", "abilities", "hp", "attack", "sp_attack", "defense", "sp_defense", "speed", "base_total", "capture_rate", "name", "type1", "type2"]



