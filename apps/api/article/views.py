
from apps.api.article.serializers import ArticleListSerializer, ArticleRetrieveSerializer, ArticleCreateSerializer, ArticleUpdateSerializer
from apps.article.models import Article
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class ArticleListAPIView(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleListSerializer
    
class ArticleRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleRetrieveSerializer
    def get_object(self):
        return self.queryset.get(url_name = self.kwargs["url_name"])

class ArticleCreationAPIView(generics.CreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleCreateSerializer
    permission_classes = [IsAuthenticated]


    def create(self, request, *args, **kwargs):
        title = request.data.get("title")
        url_name = request.data.get("url_name")
        content = request.data.get("content")
        cover_img = request.FILES.getlist("cover")
        data = {
            "title": title,
            "url_name": url_name,
            "content": content,
            "user": request.user.id,
        }
        if cover_img:
            data.update({"cover_img": cover_img[0]})
        serializer = ArticleCreateSerializer(data = data)

        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

class ArticleUpdateAPIView(generics.UpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleUpdateSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        id = request.data.get("id")
        url_name = request.data.get("url_name")
        title = request.data.get("title")
        content = request.data.get("content")
        cover_imgs = request.FILES.getlist("cover")
        data = {
            "title": title,
            "url_name": url_name,
            "content": content,
            "user": request.user.id,
        }
        if cover_imgs:
            data.update({"cover_img": cover_imgs[0]})
        instance = Article.objects.get(id = id)
        serializer = ArticleCreateSerializer(instance, data = data, partial=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)







    