from config.settings.base import MEDIA_ROOT, MEDIA_URL
from apps.products.models import Dispense, Post
from apps.api.products.serializers import BookCreateSerializer, DispenseCreateSerializer, PostCreateSerializer, PostImageCreateSerializer, PostSerializer, RetrieveDispenseSerializer
from apps.api.paginations import StandardResultsSetPagination
from rest_framework import generics
from rest_framework.response import Response

from pdf2image import convert_from_path
import numpy as np
import os
from PIL import Image
from PIL import ImageFilter


class PostListAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.order_by('-date_added')
    serializer_class = PostSerializer
    pagination_class = StandardResultsSetPagination

    def create(self, request, *args, **kwargs):
        post_title = request.data.get("post_title")
        post_content = request.data.get("post_content")
        post_type = request.data.get("post_type")
        post_images = request.data.getlist("post_images")

        post_serializer = PostCreateSerializer(data = {
            "title": post_title,
            "text": post_content,
            "user": request.user.id
        })
        if post_serializer.is_valid():
            post = post_serializer.save()

        
        if post_images:
            for img in post_images:
                post_image_serializer = PostImageCreateSerializer(data = {
                    "file": img,
                    "uploaded_by_user": request.user.id,
                    "post": post.id
                })
                if post_image_serializer.is_valid():
                    post_image_serializer.save()
        if post_type == "book_selling":
            post_book_num = request.data.get("post_book_num")
            for i in range(int(post_book_num)):
                post_book_title = request.data.get(f"post_book_title_{i}")
                post_book_author = request.data.get(f"post_book_author_{i}")
                post_book_ISBN = request.data.get(f"post_book_ISBN_{i}")
                post_book_school = request.data.get(f"post_book_school_{i}")
                post_book_course = request.data.get(f"post_book_course_{i}")
                post_book_price = request.data.get(f"post_book_price_{i}")
                post_book_serializer = BookCreateSerializer(data = {
                    'ISBN': post_book_ISBN,
                    'author': post_book_author,
                    'title': post_book_title,
                    'price': post_book_price,
                    "school": post_book_school,
                    "course": post_book_course,
                    "post": post.id
                })
                if post_book_serializer.is_valid():
                    post_book_serializer.save()
        elif post_type == "dispense_selling":
            post_dispense_num = request.data.get("post_dispense_num")
            for i in range(int(post_dispense_num)):
                post_dispense_school = request.data.get(f"post_dispense_school_{i}")
                post_dispense_course = request.data.get(f"post_dispense_course_{i}")
                post_dispense_files = request.data.get(f"post_dispense_files_{i}")
                post_dispense_description = request.data.get(f"post_dispense_description_{i}")
                post_dispense_price = request.data.get(f"post_dispense_price_{i}")
                post_dispense_serializer = DispenseCreateSerializer(data = {
                        'price': post_dispense_price,
                        "school": post_dispense_school,
                        "course": post_dispense_course,
                        "dispense": post_dispense_files,
                        "description": post_dispense_description,
                        "uploaded_by": request.user.id,
                        "post": post.id
                    })
                if post_dispense_serializer.is_valid():
                    post_dispense_serializer.save()
                else:
                    print(post_dispense_serializer.errors)
                    
        return Response("created")

        # super().create(request, *args, **kwargs)

class DispenseRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Dispense.objects.all()
    serializer_class = RetrieveDispenseSerializer


    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        return Response(serializer.data)