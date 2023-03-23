from django.urls import path
from . import views
dictionary_urlpatterns = [
    path('dictionary/<str:word>/', views.dictionary_word_API_view, name='dictionary'),
]