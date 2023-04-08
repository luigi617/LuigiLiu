
from apps.api.home.serializers import PokemonListSerializer, RandomArticleListSerializer
from apps.article.models import Article
from apps.home.models import Pokemon
from apps.api.home.solvers.nonogram import nonogram_solver

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
import random
import json


class RandomArticleListAPIView(generics.ListAPIView):
    serializer_class = RandomArticleListSerializer
    def get_queryset(self):
        queryset = Article.objects.all()
        query_len = len(queryset) 
        k = 5 if query_len >= 5 else query_len
        indexes = random.sample(range(len(queryset)), k=k)
        queryset = [queryset[q] for q in indexes]
        return queryset
    
class PokemonListAPIView(generics.ListAPIView):
    serializer_class = PokemonListSerializer
    queryset = Pokemon.objects.all()
    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset

@api_view(['POST'])
def nonogram_solver_API_view(request):
    row = json.loads(request.data.get("row"))
    column = json.loads(request.data.get("column"))
    table = nonogram_solver(row, column)
    return Response(table)


def dictionary_word_API_view():
    return


    






    