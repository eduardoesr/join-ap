from django.urls import path

from .views import (
    mapAPIView,
    mapDetailAPIView,
)

urlpatterns = [
    path('map/', mapAPIView.as_view()),
    path('map/<pk>/', mapDetailAPIView.as_view()),
]