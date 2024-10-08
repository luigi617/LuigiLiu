from django.urls import path

from . import views
app_name = "home"
urlpatterns = [
    path('', views.index, name='index'),
    path('aboutme/', views.aboutme, name='aboutme'),
    path('games/', views.game_list, name='game_list'),
    path('games/sudoku/', views.sudoku, name='sudoku'),
    path('games/maze/', views.maze, name='maze'),
    path('games/typing/', views.typing, name='typing'),
    path('games/sort/', views.sort, name='sort'),
    path('games/minesweeper/', views.minesweeper, name='minesweeper'),
    path('games/pokemon_database/', views.pokemon_database, name='pokemon_database'),
    path('games/nonogram/', views.nonogram, name='nonogram'),
    path('games/snake/', views.snake, name='snake'),
    path('games/2048/', views.game2048, name='game2048'),
    # path('dictionary/', views.dictionary, name='dictionary'),
    path('games/map/', views.map, name='map'),

    
]