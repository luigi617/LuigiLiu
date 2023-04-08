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
    # path('dictionary/', views.dictionary, name='dictionary'),
    
]