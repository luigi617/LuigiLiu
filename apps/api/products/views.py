from apps.products.models import Post
from apps.api.products.serializers import PostSerializer
from apps.api.paginations import StandardResultsSetPagination
from rest_framework import generics


class PostListAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.order_by('-date_added')
    serializer_class = PostSerializer
    pagination_class = StandardResultsSetPagination
    