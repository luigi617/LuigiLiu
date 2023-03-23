from django.shortcuts import render
from django.http import HttpResponse

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

def dictionary(request):
    return render(request, "dictionary/dictionary.html")

def page_not_found_view(request, *args, **argv):
    return render(request, '404.html', status=404)
def server_error(request, *args, **argv):
    return render(request, '500.html', status=500)
