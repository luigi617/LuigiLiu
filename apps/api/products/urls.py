from django.urls import path
from . import views
products_urlpatterns = [
    path('posts/', views.PostListAPIView.as_view(), name='posts-list'),
]