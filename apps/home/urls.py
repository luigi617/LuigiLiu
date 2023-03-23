from django.urls import path

from . import views
app_name = "home"
urlpatterns = [
    path('', views.index, name='index'),
    # path('aboutme/', views.aboutme, name='aboutme'),
    path('games/', views.game_list, name='game_list'),
    path('game/sudoku/', views.sudoku, name='sudoku'),
    path('game/maze/', views.maze, name='maze'),
    path('game/typing/', views.typing, name='typing'),
    path('game/sort/', views.sort, name='sort'),
    path('game/minesweeper/', views.minesweeper, name='minesweeper'),
    # path('dictionary/', views.dictionary, name='dictionary'),
    
]