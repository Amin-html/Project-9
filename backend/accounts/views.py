from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProfile, ViewHistory
from .serializers import UserProfileSerializer, RegisterSerializer, ViewHistorySerializer
from django.contrib.auth.models import User

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class ViewHistoryCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, moto_id):
        # пишем просмотр, не заботясь о дублях — история может повторяться
        ViewHistory.objects.create(user=request.user, motorcycle_id=moto_id)
        return Response({'status': 'ok'})

class ViewHistoryViewList(generics.ListAPIView):
    serializer_class = ViewHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # последние 10 просмотров
        return ViewHistory.objects.filter(user=self.request.user)[10]
# Create your views here.
