from rest_framework import serializers
from .models import UserProfile, ViewHistory
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user,email', read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'avatar', 'phone']

class ViewHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewHistory
        fields = ['id', 'motorcycle', 'viewed_at']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # create_user сам хэширует пароль
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user