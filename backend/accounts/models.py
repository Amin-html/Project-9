from django.db import models
from django.contrib.auth.models import User
from motos.models import Motorcycle

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.user.username

class ViewHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='view_history')
    motorcycle = models.ForeignKey(Motorcycle, on_delete=models.CASCADE)
    viewed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-viewed_at']   # последние просмотры сверху

    def __str__(self):
        return f'{self.user.username} смотрел {self.motorcycle}'

# Create your models here.
