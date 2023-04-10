from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import BabysitterSerializer
from .models import Babysitter
from authapp.models import CustomUser

class BabysitterViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    def list(self, request):
        queryset = Babysitter.objects.filter(avability=True)
        serializer = BabysitterSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer=StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Data  created'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        queryset = Babysitter.objects.filter(avability=True)
        user = get_object_or_404(queryset, pk=pk)
        serializer = BabysitterSerializer(user)
        return Response(serializer.data)
