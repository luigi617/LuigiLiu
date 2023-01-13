from rest_framework import serializers
from apps.article.models import Article

class RandomArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "user", "title", "date_modified", "cover_img"]



