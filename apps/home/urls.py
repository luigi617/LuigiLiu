from django.urls import path

from . import views
app_name = "home"
urlpatterns = [
    path('', views.index, name='index'),
    path('game/sudoku', views.sudoku, name='sudoku'),
    path('game/maze', views.maze, name='maze'),
    path('game/typing', views.typing, name='typing'),
    path('game/sort', views.sort, name='sort'),
]