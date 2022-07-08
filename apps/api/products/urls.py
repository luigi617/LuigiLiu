from django.urls import path
from . import views
products_urlpatterns = [
    path('products/posts/', views.PostListAPIView.as_view(), name='posts-list'),
    path('products/dispenses/<int:pk>/', views.DispenseRetrieveAPIView.as_view(), name='dispense-retrieve'),
]