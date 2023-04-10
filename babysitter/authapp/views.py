
from django.contrib.auth import login

from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .serializers import AuthTokenSerializer, CustomUserSerializer
from knox.views import LoginView as KnoxLoginView

class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data.get('user')
        if user:
            login(request, user)
            return super(LoginView, self).post(request, format=None)
        else:
            return Response(serializer.validated_data)

class CustomUserView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        return Response(
            CustomUserSerializer(request.user).data
        )
