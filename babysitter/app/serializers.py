from rest_framework import serializers
from .models import Babysitter, BookingTable, Family

class BabysitterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Babysitter
        fields = ['id', 'hourly_rate', 'years_of_experience', 'bio', 'published', 'full_name']

class BookingTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingTable
        fields = ['id','start_time','end_time', 'notes', 'family', 'babysitter']
        depth = 1

class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = ['id','address', 'payment_method', 'number_of_children', 'special_needs', 'published', 'for_grandparents']
