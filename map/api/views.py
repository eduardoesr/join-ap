from rest_framework.views import APIView
from rest_framework import generics, mixins
from rest_framework.response import Response

from ..models import Map
from .serializers import MapSerializer

class mapAPIView(generics.GenericAPIView, 
                    mixins.ListModelMixin,
                    mixins.CreateModelMixin):
    queryset            = Map.objects.all()
    serializer_class    = MapSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class mapDetailAPIView(generics.GenericAPIView, 
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin, 
                    mixins.DestroyModelMixin):
    queryset            = Map.objects.all()
    serializer_class    = MapSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)