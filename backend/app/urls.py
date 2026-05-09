from django.urls import path

from .views import RegisterView, EmailTokenObtainPairView

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view()),

    path("api/token/", EmailTokenObtainPairView.as_view()),

    path("api/token/refresh/", TokenRefreshView.as_view()),
]