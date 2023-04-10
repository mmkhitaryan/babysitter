from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import serializers
from .models import CustomUser
from .sms_auth import create_sms_challenge
from .sms_auth import validate_challenge_and_return_user
from app.models import Babysitter, Family

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'phone', 'user_type', 'babysitter', 'family', 'user_type']
        depth = 1

class AuthTokenSerializer(serializers.Serializer):
    phone = serializers.CharField(
        label=_("Phone number"),
        write_only=True,
        required=False
    )
    challenge_token = serializers.CharField(
        label=_("Challenge token"),
        required=False
    )
    account_type = serializers.IntegerField(
        label=_("Is registered"),
        write_only=True,
    )
    is_registered = serializers.CharField(
        label=_("Is registered"),
        read_only=True
    )
    token = serializers.CharField(
        label=_("Token"),
        read_only=True
    )
    sms_code = serializers.CharField(
        label=_("Sms code"),
        required=False
    )

    def validate(self, attrs):
        phone = attrs.get('phone')

        if not attrs.get('challenge_token'):
            try:
                user = CustomUser.objects.get(phone=phone)
                attrs["challenge_token"]=create_sms_challenge(phone)
                attrs["is_registered"]=True
                del attrs["phone"]
                return attrs

            except ObjectDoesNotExist:
                attrs["challenge_token"]=create_sms_challenge(phone)
                attrs["is_registered"]=False
                del attrs["phone"]
                return attrs

        challenge_token = attrs.get('challenge_token')
        sms_code = attrs.get('sms_code')
        account_type = attrs.get('account_type')
        user = validate_challenge_and_return_user(challenge_token, sms_code, account_type)

        if not user:
            msg = _('Sms code is invalid or expired.')
            raise serializers.ValidationError(msg, code='authorization')
        
        attrs['user'] = user

        Babysitter.objects.create(user=user)
        Family.objects.create(user=user)
        return attrs
