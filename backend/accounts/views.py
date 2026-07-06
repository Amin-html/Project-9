from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import UserProfile
from .serializers import UserProfileSerializer, RegisterSerializer
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
# Create your views here.
