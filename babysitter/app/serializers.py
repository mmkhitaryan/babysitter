from rest_framework import serializers
from .models import Babysitter

class BabysitterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Babysitter
        fields = ['id', 'hourly_rate', 'years_of_experience', 'bio', 'avability', 'published']
