from django.urls import path
from . import views

urlpatterns = [
    path('brands/', views.BrandListView.as_view()),
    path('motos/', views.MotorcycleListView.as_view()),
    path('motos/<int:pk>/', views.MotorcycleDetailView.as_view()),
]