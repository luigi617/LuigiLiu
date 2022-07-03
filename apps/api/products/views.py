from apps.products.models import Post
from apps.api.products.serializers import PostSerializer
from apps.api.paginations import StandardResultsSetPagination
from rest_framework import generics


class PostListAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = StandardResultsSetPagination