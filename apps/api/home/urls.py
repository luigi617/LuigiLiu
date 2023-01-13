from django.urls import path
from . import views
home_urlpatterns = [
    path('random-articles/', views.RandomArticleListAPIView.as_view(), name='random_article_list'),
]