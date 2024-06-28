
from apps.api.custom_api.urls import custom_api_urlpatterns
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = format_suffix_patterns(
    custom_api_urlpatterns
)