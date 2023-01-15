from django.shortcuts import render
from django.http import HttpResponseNotFound

# Create your views here.
def articles(request):
    return render(request, "articles/articles_list.html")
def article(request, pk):
    return render(request, "articles/article.html", context={"pk":pk})
def create_article(request):
    if not request.user.is_authenticated:
        return HttpResponseNotFound()
    return render(request, "articles/create_article.html")
def edit_article(request, pk):
    if not request.user.is_authenticated:
        return HttpResponseNotFound()
    return render(request, "articles/edit_article.html", context={"pk":pk})