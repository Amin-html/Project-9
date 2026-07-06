from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [
    path('profile/', ProfileView.as_view()),
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', TokenObtainPairView.as_view()),
    path('auth/login/refresh/', TokenRefreshView.as_view()),
    path('history/<int:moto_id>/', ViewHistoryCreateView.as_view()),
    path('history/', ViewHistoryViewList.as_view()),
]