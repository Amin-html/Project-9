import django_filters
from .models import Motorcycle

class MotorcycleFilter(django_filters.FilterSet):
    # min/max — диапазон цены
    min = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    # поиск по названию модели, без учёта регистра
    q = django_filters.CharFilter(field_name='model', lookup_expr='icontains')
    # алиас: в ТЗ параметр называется type, а поле в модели — moto_type
    type = django_filters.CharFilter(field_name='moto_type')

    class Meta:
        model = Motorcycle
        fields = ['brand']