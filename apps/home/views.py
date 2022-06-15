from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, "home/home.html")

def sudoku(request):
    return render(request, "game_solver/sudoku.html")