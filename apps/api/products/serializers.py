from apps.api.users.serializers import BasicUserSerializer
from rest_framework import serializers
from apps.products.models import Post, PostImage, Book, Dispense, Comment

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'file']
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'ISBN', 'author', 'title', 'price', "school", "course"]
class DispenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dispense
        fields = ['id', 'price', "school", "course", "description"]
class CommentSerializer(serializers.ModelSerializer):
    user = BasicUserSerializer()
    class Meta:
        model = Comment
        fields = ['id', 'text', "reply_to", "user", "date_added"]
class PostSerializer(serializers.ModelSerializer):
    post_images = PostImageSerializer(many=True, required=False)
    books = BookSerializer(many=True, required=False)
    dispenses = DispenseSerializer(many=True, required=False)
    comments = CommentSerializer(many=True, required=False)
    user = BasicUserSerializer()
    class Meta:
        model = Post
        fields = ['id', 'title', 'text', 'user', "post_images", "books", "dispenses", "comments", "date_added"]