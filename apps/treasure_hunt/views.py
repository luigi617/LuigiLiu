from django.shortcuts import render


def treasure_hunt(request):
   
    return render(request, "treasure_hunt/treasure_hunt.html")
def treasure(request, pk):
    return render(request, "treasure_hunt/treasure.html", context={"pk":pk})