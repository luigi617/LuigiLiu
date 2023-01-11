from rest_framework import serializers
from apps.article.models import Article

class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "user", "title", "date_modified"]
class ArticleRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "user", "title", "content", "date_modified"]


