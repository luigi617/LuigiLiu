from django.shortcuts import render

# Create your views here.
def exchange(request):
    return render(request, "products/exchange.html")