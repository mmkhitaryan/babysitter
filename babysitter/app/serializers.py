from rest_framework import serializers
from .models import Babysitter, BookingTable, Family, Certificate
from rest_framework.serializers import ImageField

class BabysitterCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['id', 'certificate_file']

class BabysitterSerializer(serializers.ModelSerializer):
    birthday = serializers.DateField()
    age = serializers.SerializerMethodField()

    def get_age(self, obj):
        # Calculate age based on date_of_birth
        from datetime import date

        today = date.today()
        age = today.year - obj.birthday.year
        return age

    class Meta:
        model = Babysitter
        fields = ['id', 'hourly_rate', 'years_of_experience', 'bio', 'published', 'full_name', 'for_grandparents', 'birthday', 'gender', 'avatar', 'education', 'age']
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
