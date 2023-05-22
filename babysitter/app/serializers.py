from datetime import timedelta, datetime

from django.utils import timezone
from django.db.models import Avg

from rest_framework import serializers
from .models import Babysitter, BookingTable, Family, Certificate, Review
from rest_framework.serializers import ImageField

class BabysitterCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['id', 'certificate_file']

class BabysitterSerializer(serializers.ModelSerializer):
    birthday = serializers.DateField()
    age = serializers.SerializerMethodField()
    booked_dates = serializers.SerializerMethodField()

    def get_age(self, obj):
        # Calculate age based on date_of_birth
        from datetime import date

        today = date.today()
        age = today.year - obj.birthday.year
        return age

    def get_booked_dates(self, obj):
        start_time = timezone.now()
        b = obj.bookingtable.filter(
            start_time__gte=start_time,
        )
        return BookingTableShortSerializer(b, many=True).data

    class Meta:
        model = Babysitter
        fields = ['id', 'hourly_rate', 'years_of_experience', 'bio', 'published', 'full_name', 'for_grandparents', 'birthday', 'gender', 'avatar', 'education', 'age', 'booked_dates']
        read_only_fields = ('published', 'avatar')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'text', 'rating']


class BabysitterSerializerDetailView(BabysitterSerializer):
    avg_rating = serializers.SerializerMethodField()
    reviews = ReviewSerializer(many=True, read_only=True)


    def get_avg_rating(self, obj):
        avg_rating = obj.reviews.aggregate(Avg('rating'))['rating__avg']
        return avg_rating

    class Meta:
        model = Babysitter
        fields = ['id', 'hourly_rate', 'years_of_experience', 'bio', 'published', 'full_name', 'for_grandparents', 'birthday', 'gender', 'avatar', 'education', 'avg_rating', 'reviews']


class BabysitterAvatarSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField()
    class Meta:
        model = Babysitter
        fields = ['avatar']

class BookingTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingTable
        fields = ['id','start_time','end_time', 'notes', 'family', 'babysitter']
        depth = 1

class BookingTableShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingTable
        fields = ['id','start_time','end_time']

class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = ['id','address', 'payment_method', 'number_of_children', 'special_needs']
