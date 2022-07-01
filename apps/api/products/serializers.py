from rest_framework import serializers
from apps.products.models import Post, PostImage

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'file']
class PostSerializer(serializers.ModelSerializer):
    post_images = PostImageSerializer(many=True)
    class Meta:
        model = Post
        fields = ['id', 'title', 'text', 'user', "post_images"]