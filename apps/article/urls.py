from django.urls import path

from . import views

app_name = "articles"
urlpatterns = [
    path('', views.articles, name='articles'),
    path('<str:url_name>/', views.article, name='article'), # be careful with this url
    path('create/create/', views.create_article, name='create-article'),
    path('edit/<str:url_name>/', views.edit_article, name='edit-article'),

]
