from apps.products.models import Post
from apps.api.products.serializers import PostSerializer
from rest_framework import generics


class PostListAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer