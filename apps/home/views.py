from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

def index(request):
    # return render(request, "home/test/sample.html")
    return render(request, "home/home.html")
def aboutme(request):
    return render(request, "home/aboutme.html")

def game_list(request):
    return render(request, "game/game_list.html")
def sudoku(request):
    return render(request, "game/sudoku.html")
def maze(request):
    return render(request, "game/maze.html")
def typing(request):
    return render(request, "game/typing.html")
def sort(request):
    return render(request, "game/sort.html")
def minesweeper(request):
    return render(request, "game/minesweeper.html")
def pokemon_database(request):
    return render(request, "game/pokemon_database.html")
def nonogram(request):
    return render(request, "game/nonogram.html")
def snake(request):
    return render(request, "game/snake.html")
def game2048(request):
    return render(request, "game/game2048.html")

def map(request):
    return render(request, "game/map.html")

def dictionary(request):
    return render(request, "dictionary/dictionary.html")


def page_not_found_view(request, *args, **argv):
    return render(request, '404.html', status=404)
def server_error(request, *args, **argv):
    return render(request, '500.html', status=500)

