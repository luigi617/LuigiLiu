from django.urls import path

from . import views
app_name = "home"
urlpatterns = [
    path('', views.index, name='index'),
    path('game_solver/sudoku', views.sudoku, name='sudoku'),
]