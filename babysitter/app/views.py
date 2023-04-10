from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import BabysitterSerializer
from .models import Babysitter

class BabysitterViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    def list(self, request):
        queryset = Babysitter.objects.filter(avability=True)
        serializer = BabysitterSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Babysitter.objects.filter(avability=True)
        user = get_object_or_404(queryset, pk=pk)
        serializer = BabysitterSerializer(user)
        return Response(serializer.data)
