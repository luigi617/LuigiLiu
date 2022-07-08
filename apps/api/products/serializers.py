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

class RetrieveDispenseSerializer(serializers.BaseSerializer):
    class Meta:
        model = Dispense

    def to_representation(self, instance):
        output = {}
        output["id"] = instance.id
        # output["trial_dispense"] = self.context["request"].build_absolute_uri(instance.trial_dispense.url)
        user_id = self.context["request"].user.id
        if instance.uploaded_by.id == user_id or  instance.allowed_user.filter(id = user_id).exists():
            output["dispense"] = self.context["request"].build_absolute_uri(instance.dispense.url)
        else:
            output["dispense"] = self.context["request"].build_absolute_uri(instance.trial_dispense.url)

            
        return output



class PostImageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'file', "uploaded_by_user", "post"]
class BookCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'ISBN', 'author', 'title', 'price', "school", "course", "post"]
class DispenseCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dispense
        fields = ['id', 'price', "school", "course", "description", "dispense", "post", "uploaded_by"]

class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'text', "user"]