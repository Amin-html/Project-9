from django.db import models

class Brand(models.Model):
    name = models.CharField(max_length=150, unique=True)
    logo = models.ImageField(upload_to='brands/', blank=True, null=True)

    def __str__(self):
        return self.name

class Motorcycle(models.Model):
    TYPE_CHOICES = [
        ('sport', 'Спорт'),
        ('cruiser', 'Круизер'),
        ('enduro', 'Эндуро'),
        ('naked', 'Нейкед'),
        ('touring', 'Туристический'),
    ]

    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='motorcycles')
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    price = models.IntegerField()
    engine_volume = models.IntegerField(help_text='Объём двигателя в см³')
    power = models.IntegerField(help_text='Мощность в л.с.', blank=True, null=True)
    moto_type = models.CharField(choices=TYPE_CHOICES, max_length=100)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='motos/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.brand.name} {self.model} ({self.year})'

# Create your models here.
