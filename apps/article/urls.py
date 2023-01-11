from django.urls import path

from . import views

app_name = "articles"
urlpatterns = [
    path('', views.articles, name='articles'),
    path('<int:pk>/', views.article, name='article'),

]
