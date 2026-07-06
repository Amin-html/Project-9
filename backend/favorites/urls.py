from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('favorites/', views.FavoriteListView.as_view()),
    path('favorites/<int:moto_id>/', views.FavoriteToggleView.as_view()),
]