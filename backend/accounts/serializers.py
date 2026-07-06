from rest_framework import serializers
from .models import UserProfile, ViewHistory

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