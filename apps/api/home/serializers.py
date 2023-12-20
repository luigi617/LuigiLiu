from rest_framework import serializers
from apps.article.models import Article
from apps.home.models import Pokemon
from apps.api.article.serializers import ArticleCategorySerializer

class DisplayArticleListSerializer(serializers.ModelSerializer):
    category = ArticleCategorySerializer()
    class Meta:
        model = Article
        fields = ["id", "url_name", "user", "title", "date_added", "cover_img", "category"]

class PokemonListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon
        fields = ["pokedex_number", "abilities", "hp", "attack", "sp_attack", "defense", "sp_defense", "speed", "base_total", "capture_rate", "name", "type1", "type2"]



