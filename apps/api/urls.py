from apps.api.products.urls import products_urlpatterns
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = format_suffix_patterns(
    products_urlpatterns
)