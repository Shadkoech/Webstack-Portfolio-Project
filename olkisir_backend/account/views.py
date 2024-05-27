from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializers, UserLoginSerializer, LogoutSerializer
from .models import User
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import LogoutSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

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

class UserDetailsView(APIView):
    # Class the fetches user details
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_data = {
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'role': user.role,
        }
        return Response(user_data, status=status.HTTP_200_OK)
        
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    serializer_class = LogoutSerializer

    def post(self, request):
        # print('ew')
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            refresh_token = serializer.validated_data['refresh_token']
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response(status=status.HTTP_205_RESET_CONTENT)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)