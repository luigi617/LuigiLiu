from apps.api.users.urls import users_urlpatterns
from apps.api.article.urls import articles_urlpatterns
from apps.api.home.urls import home_urlpatterns
from apps.api.dictionary.urls import dictionary_urlpatterns
from apps.api.treasure_hunt.urls import treasure_hunt_urlpatterns
from apps.api.map.urls import map_urlpatterns
from apps.api.custom_api.urls import custom_api_urlpatterns
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = format_suffix_patterns(
    users_urlpatterns +
    articles_urlpatterns +
    home_urlpatterns +
    dictionary_urlpatterns +
    treasure_hunt_urlpatterns +
    map_urlpatterns +
    custom_api_urlpatterns
)