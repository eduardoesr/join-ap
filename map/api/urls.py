from django.urls import path

from .views import mapAPIView

urlpatterns = [
    path('map/', mapAPIView.as_view())
]