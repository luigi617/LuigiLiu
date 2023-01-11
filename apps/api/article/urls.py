from django.urls import path
from . import views
articles_urlpatterns = [
    path('articles/', views.ArticleListAPIView.as_view(), name='article_list'),
    path('articles/<int:pk>/', views.ArticleRetrieveAPIView.as_view(), name='article_retrieve'),
]