from apps.api.users.urls import users_urlpatterns
from apps.api.article.urls import articles_urlpatterns
from apps.api.home.urls import home_urlpatterns
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = format_suffix_patterns(
    users_urlpatterns + articles_urlpatterns + home_urlpatterns
)