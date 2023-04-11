from rest_framework import serializers
from .models import Babysitter, BookingTable

class BabysitterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Babysitter
        fields = ['id', 'hourly_rate', 'years_of_experience', 'bio', 'published', 'full_name']

class BookingTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingTable
        fields = ['id','end_time', 'notes', 'family', 'babysitter']
