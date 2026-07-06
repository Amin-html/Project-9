from rest_framework import generics
from .models import Brand, Motorcycle
from .serializers import BrandSerializer, MotorcycleSerializer
from .filters import MotorcycleFilter

class BrandListView(generics.ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class MotorcycleListView(generics.ListAPIView):
    queryset = Motorcycle.objects.all()
    serializer_class = MotorcycleSerializer
    filterset_class = MotorcycleFilter

class MotorcycleDetailView(generics.RetrieveAPIView):
    queryset = Motorcycle.objects.all()
    serializer_class = MotorcycleSerializer

# Create your views here.
