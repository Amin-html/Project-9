from django.db import models
from django.contrib.auth.models import User
from motos.models import Motorcycle

class Review(models.Model):
    motorcycle = models.ForeignKey(Motorcycle, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('motorcycle', 'user') # один юзер — один отзыв на мото

    def __str__(self):
        return f'{self.user.username} - {self.motorcycle} ({self.rating}/5)'

# Create your models here.
