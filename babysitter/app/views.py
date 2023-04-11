from datetime import timedelta
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status

from rest_framework import generics
from rest_framework.views import APIView

from rest_framework.response import Response
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters
from rest_framework import filters as drffilters
from rest_framework.permissions import BasePermission

from .serializers import BabysitterSerializer, BookingTableSerializer
from .models import Babysitter, BookingTable
from authapp.models import CustomUser
from django.db.models import Q


class OnlyForFamily(BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type==2

class OnlyForBabysitter(BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type==1


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
    ordering_fields = ('hourly_rate',)
    ordering = ('-hourly_rate',)

    def get_queryset(self):
        # TODO: add filtering show only babysitters with no active booking
        queryset = Babysitter.objects.filter(
            Q(bookingtable__end_time__lte=timezone.now()) | ~Q(bookingtable__isnull=False),
            published=True
        )
        return queryset

class RetrieveBabysitterView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyForBabysitter)

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

class BookBabysitterView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyForFamily)

    def put(self, request, pk, format=None):
        # check if babysitter is booked already
        # if not, create new booking
        user_family = request.user.family
        babysitter = Babysitter.objects.get(id=pk)

        # TODO: unit test
        is_babysitter_free_now = babysitter.bookingtable.filter(
            end_time__gte=timezone.now()
        ).count()==0

        hours = int(request.data['hours'])

        if is_babysitter_free_now:
            b = BookingTable.objects.create(
                family=user_family,
                babysitter=babysitter,
                end_time=timezone.now()+timedelta(hours=hours)
            )
            return Response(BookingTableSerializer(b).data, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "babysitter is already booked"}, status=status.HTTP_400_BAD_REQUEST)
