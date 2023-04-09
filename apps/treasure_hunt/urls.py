from django.urls import path

from . import views

app_name = "treasure_hunt"
urlpatterns = [
    path('', views.treasure_hunt, name='treasure_hunt'),
    path('treasures/<int:pk>/', views.treasure, name='treasure'),
]