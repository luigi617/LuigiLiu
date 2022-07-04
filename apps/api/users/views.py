
from apps.api.users.serializers import UserProfileSerializer
from apps.user.models import User
from rest_framework import generics
from rest_framework.response import Response


class UserProfileRetrieveAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer


    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)



    