from django.db import models
from django.contrib.auth.models import User
from motos.models import Motorcycle

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    motorcycle = models.ForeignKey(Motorcycle, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'motorcycle')  # чтобы нельзя было добавить дважды

    def __str__(self):
        return f'{self.user.username} → {self.motorcycle}'

# Create your models here.
