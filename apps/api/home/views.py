
from apps.api.home.serializers import RandomArticleListSerializer
from apps.article.models import Article
from rest_framework import generics
from rest_framework.response import Response
import random


class RandomArticleListAPIView(generics.ListAPIView):
    serializer_class = RandomArticleListSerializer
    def get_queryset(self):
        queryset = Article.objects.all()
        query_len = len(queryset) 
        k = 5 if query_len >= 5 else query_len
        indexes = random.sample(range(len(queryset)), k=k)
        queryset = [queryset[q] for q in indexes]
        return queryset

def dictionary_word_API_view():
    return
    






    