from django.urls import path
from . import views
treasure_hunt_urlpatterns = [
    path('treasures/', views.GroupTreasureListAPIView.as_view(), name='treasure_list'),
    path('treasures/<int:pk>/', views.TreasureRetrieveAPIView.as_view(), name='treasure_retrieve'),
    path('treasures/<int:pk>/hints/', views.GroupTreasureHintListAPIView.as_view(), name='treasure_hintlist'),

    path('group-treasure/', views.GroupTreasureUpdateAPIView.as_view(), name='update_group_treasure'),
    path('group-treasure-hint/', views.GroupTreasureHintUpdateAPIView.as_view(), name='update_group_treasure_hint'),
]