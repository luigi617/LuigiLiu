from django.shortcuts import render

# Create your views here.
def articles(request):
    return render(request, "articles/articles_list.html")
def article(request, pk):
    return render(request, "articles/article.html", context={"pk":pk})