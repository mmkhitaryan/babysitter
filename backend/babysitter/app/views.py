from datetime import timedelta, datetime
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

from .serializers import BabysitterSerializer, BookingTableSerializer, FamilySerializer, BabysitterSerializerDetailView
from .serializers import BabysitterAvatarSerializer, BabysitterCertificateSerializer, ReviewSerializer, AddressSerializer

from .models import Babysitter, BookingTable, Address
from authapp.models import CustomUser
from django.db.models import Q
from django.db.models import F, Func
from authapp.sms_service import send_sms


class OnlyForFamily(BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type==2

class OnlyForBabysitter(BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type==1

class AgeFilterBackend(drffilters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        from datetime import date
        today = date.today()
        min_age = request.query_params.get('age_min')  # Minimum age
        max_age = request.query_params.get('age_max')  # Maximum age
        
        if min_age:
            min_birthday = today.replace(year=today.year - int(min_age))
            queryset = queryset.filter(birthday__lte=min_birthday)
        
        if max_age:
            max_birthday = today.replace(year=today.year - int(max_age) - 1)
            queryset = queryset.filter(birthday__gt=max_birthday)
        
        return queryset

class BabysitterFilterset(filters.FilterSet):
    class Meta:
        model = Babysitter
        fields = {
            'hourly_rate': ['exact', 'lte', 'gte', 'gt', 'lt'],
            'years_of_experience': ['exact', 'lte', 'gte', 'gt', 'lt'],
            'detsad': ['exact'],
            'threeToFive': ['exact'],
            'baby': ['exact']
        }

class UploadBabysitterAvatarView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyForBabysitter)

    def post(self, request, format=None):
        users_babysitter = request.user.babysitter
        serializer = BabysitterAvatarSerializer(users_babysitter, data=request.data, context={'request': request})
        if serializer.is_valid():
            users_babysitter.published = False
            users_babysitter.save()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddressListView(generics.ListAPIView):
    model = Address
    serializer_class = AddressSerializer
    pagination_class = None

    def get_queryset(self):
        return Address.objects.all()

class BabysitterListView(generics.ListAPIView):
    model = Babysitter
    serializer_class = BabysitterSerializer
    filterset_class  = BabysitterFilterset
    filter_backends = (filters.DjangoFilterBackend, drffilters.OrderingFilter, AgeFilterBackend)
    ordering_fields = ('hourly_rate',)
    ordering = ('-hourly_rate',)

    def get_queryset(self):
        queryset = Babysitter.objects.filter(
            Q(bookingtable__start_time__gte=timezone.now()) | ~Q(bookingtable__isnull=False),
            published=True
        )

        address_type = []
        
        if self.request.user.is_authenticated:
            address_type = [self.request.user.family.address_type]

            if address_type.id!=1:
                queryset = queryset.filter(
                    address_type__in=address_type,
                )

        return queryset.distinct()

class RetrieveBabysitterByIdView(APIView):
    authentication_classes = (TokenAuthentication,)

    def get(self, request, pk, format=None):
        babysitter = Babysitter.objects.get(id=pk)
        babysitter = BabysitterSerializerDetailView(babysitter, context={'request': request})
        return Response(babysitter.data)

class CurrentOrderView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def delete(self, request):
        if request.user.user_type == 1:
            order = request.user.babysitter

        if request.user.user_type == 2:
            order = request.user.family
        
        last_active_booking = order.bookingtable.filter(
            end_time__gte=timezone.now()
        )

        if last_active_booking.count()==0:
            return Response({"status": "There is no current active bookings on your account"}, status=status.HTTP_404_NOT_FOUND)
        
        last_active_booking = last_active_booking[0]
        last_active_booking.delete()

        return Response({"status": "Booking is removed"})


    def get(self, request, format=None):
        if request.user.user_type == 1:
            order = request.user.babysitter

        if request.user.user_type == 2:
            order = request.user.family
        
        last_active_booking = order.bookingtable.filter(
            end_time__gte=timezone.now()
        )

        if last_active_booking.count()==0:
            return Response({"status": "There is no current active bookings on your account"}, status=status.HTTP_404_NOT_FOUND)
        
        last_active_booking = last_active_booking[0]

        return Response(BookingTableSerializer(last_active_booking, context={'request': request}).data)

class RetrieveBabysitterView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyForBabysitter)

    def get(self, request, format=None):
        usernames = request.user.babysitter
        return Response(BabysitterSerializer(usernames, context={'request': request}).data)

    def put(self, request, format=None):
        users_babysitter = request.user.babysitter
        serializer = BabysitterSerializer(users_babysitter, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            users_babysitter.published = False
            users_babysitter.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RetrieveFamilyView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyForFamily)

    def get(self, request, format=None):
        usernames = request.user.family
        return Response(FamilySerializer(usernames).data)

    def put(self, request, format=None):
        users_babysitter = request.user.family
        serializer = FamilySerializer(users_babysitter, data=request.data)
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
        hours = int(request.data['hours'])

        start_time = timezone.now()
        end_time = timezone.now()+timedelta(hours=hours)

        if start_time_raw := request.data.get('start_time'):
            start_time = datetime.fromisoformat(start_time_raw)
            end_time = start_time+timedelta(hours=hours)

            if timezone.now()>=start_time:
                return Response({"error": "Start time can not be in the past"}, status=status.HTTP_400_BAD_REQUEST)


        # TODO: unit test
        is_babysitter_free_now = babysitter.bookingtable.filter(
            start_time__lt=end_time,
            end_time__gt=start_time
        ).count()==0


        is_family_free_now = user_family.bookingtable.filter(
            start_time__lt=end_time,
            end_time__gt=start_time
        ).count()==0

        if not is_family_free_now:
            return Response({"error": "You already have a booking for that time"}, status=status.HTTP_409_CONFLICT)

        if not is_babysitter_free_now:
            return Response({"error": "Babysitter is already booked for that time"}, status=status.HTTP_400_BAD_REQUEST)

        b = BookingTable.objects.create(
            family=user_family,
            babysitter=babysitter,
            end_time=end_time,
            start_time=start_time
        )

        send_sms(babysitter.user.phone, f"{babysitter.full_name}, у вас новая запись!")
        return Response(BookingTableSerializer(b).data, status=status.HTTP_201_CREATED)

class ManageCertificatesView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyForBabysitter)

    def post(self, request, format=None):
        babysitter = request.user.babysitter
        serializer = BabysitterCertificateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            babysitter.published = False
            babysitter.save()

            serializer.validated_data['babysitter'] = babysitter
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        babysitter_certificates = request.user.babysitter.certificates
        babysitter = BabysitterCertificateSerializer(babysitter_certificates, many=True, context={'request': request})
        return Response(babysitter.data)

    def delete(self, request, pk, format=None):
        babysitter_certificates = request.user.babysitter.certificates
        the_cert = babysitter_certificates.filter(id=pk).first()

        if not the_cert:
            return Response({"error": "There is no such cert"}, status=status.HTTP_404_NOT_FOUND)

        the_cert.delete()
        return Response({"status": "Cert is removed"})

class ReviewsView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, OnlyForFamily)

    def post(self, request, pk, format=None):
        babysitter = Babysitter.objects.get(id=pk)
        serializer = ReviewSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.validated_data['babysitter'] = babysitter
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk, format=None):
        babysitter = Babysitter.objects.get(id=pk)
        reviews = ReviewSerializer(babysitter.reviews, many=True, context={'request': request})
        return Response(reviews.data)
