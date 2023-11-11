from rest_framework import serializers
from apps.article.models import Article

class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "url_name", "user", "title", "date_modified", "cover_img"]
class ArticleRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "url_name", "user", "title", "content", "date_modified", "cover_img"]
    
class ArticleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["user", "url_name", "title", "content", "cover_img"]
class ArticleUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["user", "url_name", "title", "content", "cover_img"]


