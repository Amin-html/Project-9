from django.urls import path
from . import views

urlpatterns = [
    path('reviews/<int:moto_id>/', views.ReviewListCreateView.as_view()),
]