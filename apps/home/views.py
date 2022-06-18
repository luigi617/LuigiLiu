from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, "home/home.html")

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