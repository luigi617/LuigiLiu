from rest_framework import serializers
from apps.article.models import Article

class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "user", "title", "date_modified"]
class ArticleRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "user", "title", "content", "date_modified", "cover_img"]
    
class ArticleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["user", "title", "content", "cover_img"]
class ArticleUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["user", "title", "content", "cover_img"]


