from django.shortcuts import render

# Create your views here.
def profile(request, username):
    print(username)
    return render(request, "users/profile.html")