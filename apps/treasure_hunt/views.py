from django.shortcuts import render
from django.http import HttpResponseNotFound

def treasure_hunt(request):
    return render(request, "treasure_hunt/treasure_hunt.html")

def treasure(request, pk):
    return render(request, "treasure_hunt/treasure.html", context={"pk":pk})

def manage_treasure_game_list(request):
    if not request.user.is_authenticated:
        return HttpResponseNotFound()
    return render(request, "treasure_hunt/manage_treasure_game_list.html")

def manage_treasure_game(request, pk):
    if not request.user.is_authenticated:
        return HttpResponseNotFound()
    return render(request, "treasure_hunt/manage_treasure_game.html", context={"pk":pk})