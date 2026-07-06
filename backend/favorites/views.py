from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Favorite
from .serializers import FavoriteSerializer

class FavoriteListView(generics.ListAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

class FavoriteToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, moto_id):
        # если уже в избранном — убираем, если нет — добавляем
        favorite, created = Favorite.objects.get_or_create(
            user=request.user,
            motorcycle=moto_id,
        )
        if not created:
            favorite.delete()
            return Response({'status': 'removed'})
        return Response({'status': 'added'})

# Create your views here.
