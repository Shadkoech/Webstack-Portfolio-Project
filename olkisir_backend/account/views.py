# from .serializers import UserSerializers, UserLoginSerializer
# from .models import User
# from rest_framework import generics
# from rest_framework.permissions import IsAdminUser, AllowAny
# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response

# class UserList(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializers


# class AuthUserLoginView(APIView):
#     serializer_class = UserLoginSerializer
#     permission_classes = (AllowAny, )

#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         valid = serializer.is_valid(raise_exception=True)

#         if valid:
#             status_code = status.HTTP_200_OK

#             response = {
#                 'success': True,
#                 'statusCode': status_code,
#                 'message': 'User logged in successfully',
#                 'email': serializer.data['email'],
#                 'role': serializer.data['role']
#             }

#             return Response(response, status=status_code)

# views.py
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializers, UserLoginSerializer
from .models import User
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializers

class AuthUserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)

        if valid:
            user = User.objects.get(email=serializer.data['email'])
            refresh = RefreshToken.for_user(user)

            response = {
                'success': True,
                'statusCode': status.HTTP_200_OK,
                'message': 'User logged in successfully',
                'email': serializer.data['email'],
                'role': serializer.data['role'],
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }

            return Response(response, status=status.HTTP_200_OK)
