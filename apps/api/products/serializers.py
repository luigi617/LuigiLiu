from rest_framework import serializers
from apps.products.models import Post, PostImage, Book, Dispense

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'file']
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'ISBN', 'author', 'price']
class DispenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dispense
        fields = ['id', 'dispense', 'price']
class PostSerializer(serializers.ModelSerializer):
    post_images = PostImageSerializer(many=True, required=False)
    books = BookSerializer(many=True, required=False)
    dispenses = DispenseSerializer(many=True, required=False)
    class Meta:
        model = Post
        fields = ['id', 'title', 'text', 'user', "post_images", "books", "dispenses"]