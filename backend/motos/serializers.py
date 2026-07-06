from rest_framework import serializers
from .models import Brand, Motorcycle

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'logo']

class MotorcycleSerializer(serializers.ModelSerializer):
    brand_name = serializers.CharField(source='brand.name', read_only=True)

    class Meta:
        model = Motorcycle
        fields = [
            'id', 'brand', 'brand_name', 'model', 'year', 'price',
            'engine_volume', 'power', 'moto_type', 'description',
            'image', 'created_at',
        ]