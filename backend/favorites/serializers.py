from rest_framework import serializers
from .models import Favorite
from motos.serializers import MotorcycleSerializer

class FavoriteSerializer(serializers.ModelSerializer):
    motorcycle_detail = MotorcycleSerializer(source='motorcycle', read_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'motorcycle', 'motorcycle_detail', 'added_at']