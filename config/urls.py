"""LuigiLiu URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
import os

urlpatterns = [
    path('', include('apps.home.urls', namespace="home")),
    path('articles/', include('apps.article.urls', namespace="articles")),
    # path('user/', include('apps.user.urls')),
    # path('accounts/', include('allauth.urls')),
]

urlpatterns += [
    path('api/', include('rest_framework.urls')),
    path('api/', include('apps.api.urls')),
    path(os.environ.get("DJANGO_ADMIN", default="admin"), admin.site.urls),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

handler404 = "apps.home.views.page_not_found_view"
handler500 = "apps.home.views.server_error"