from django.urls import path

from . import views

app_name = "treasure_hunt"
urlpatterns = [
    path('', views.treasure_hunt, name='treasure_hunt'),
    path('treasures/<int:pk>/', views.treasure, name='treasure'),
    path('manage-treasure-games/', views.manage_treasure_game_list, name='manage_treasure_game_list'),
    path('manage-treasure-games/<int:pk>/', views.manage_treasure_game, name='manage_treasure_game'),
    path('manage-treasure-games/<int:pk>/evidences', views.manage_treasure_evidence, name='manage_treasure_evidence'),
]