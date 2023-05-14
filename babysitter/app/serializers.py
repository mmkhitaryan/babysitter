from rest_framework import serializers
from .models import Babysitter, BookingTable, Family
from rest_framework.serializers import ImageField

class BabysitterSerializer(serializers.ModelSerializer):
    birthday = serializers.DateField()
    class Meta:
        model = Babysitter
        fields = ['id', 'hourly_rate', 'years_of_experience', 'bio', 'published', 'full_name', 'for_grandparents', 'birthday', 'gender', 'avatar', 'education']
        read_only_fields = ('published', 'avatar')

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

class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = ['id','address', 'payment_method', 'number_of_children', 'special_needs']
