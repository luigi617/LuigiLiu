from django.shortcuts import render
from django.http import HttpResponseNotFound

# Create your views here.
def articles(request):
    return render(request, "articles/articles_list.html", context={"nav_white":True})
def article(request, url_name):
    return render(request, "articles/article.html", context={"url_name":url_name})
def create_article(request):
    if not request.user.is_authenticated:
        return HttpResponseNotFound()
    return render(request, "articles/create_article.html")
def edit_article(request, url_name):
    if not request.user.is_authenticated:
        return HttpResponseNotFound()
    return render(request, "articles/edit_article.html", context={"url_name":url_name})