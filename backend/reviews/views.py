from rest_framework import generics, permissions
from .models import Review
from .serializers import ReviewSerializer

class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer

    def get_permissions(self):
        # читать может любой, писать — только авторизованный
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        return Review.objects.filter(motorcycle_id=self.kwargs['moto_id'])

    def perform_create(self, serializer):
        # сохраняем отзыв + пишем историю просмотра заодно, если нужно
        serializer.save(user=self.request.user, motorcycle_id=self.kwargs['moto_id'])


# Create your views here.
