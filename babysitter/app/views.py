from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.response import Response
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters

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
    filter_backends = (filters.DjangoFilterBackend,)

    def get_queryset(self):
        queryset = queryset.filter(published=True)
        return queryset
