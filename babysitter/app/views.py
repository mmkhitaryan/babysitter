from django.shortcuts import get_object_or_404
from rest_framework import status

from rest_framework import generics
from rest_framework.views import APIView

from rest_framework.response import Response
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters
from rest_framework import filters as drffilters

from .serializers import BabysitterSerializer
from .models import Babysitter
from authapp.models import CustomUser

class BabysitterFilterset(filters.FilterSet):
    class Meta:
        model = Babysitter
        fields = {
            'hourly_rate': ['exact', 'lte', 'gte', 'gt', 'lt'],
            'years_of_experience': ['exact', 'lte', 'gte', 'gt', 'lt']
        }

class BabysitterListView(generics.ListAPIView):
    model = Babysitter
    serializer_class = BabysitterSerializer
    filterset_class  = BabysitterFilterset
    filter_backends = (filters.DjangoFilterBackend, drffilters.OrderingFilter)
    ordering_fields = ('hourly_rate')
    ordering = ('-hourly_rate')

    def get_queryset(self):
        queryset = Babysitter.objects.filter(published=True)
        return queryset

class RetrieveBabysitter(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        usernames = request.user.babysitter
        return Response(BabysitterSerializer(usernames).data)

    def put(self, request, format=None):
        users_babysitter = request.user.babysitter
        serializer = BabysitterSerializer(users_babysitter, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
