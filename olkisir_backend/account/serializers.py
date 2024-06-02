from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate



#creating serializers.


class UserSerializers(serializers.ModelSerializer):
    """
    Serializer for User model. Handles the creation and validation of User objects.
    """
    
    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "password", "username", "role"]

    def create(self, validated_data):
        """
        Create and return a new User instance, given the validated data.
        
        Args:
            validated_data (dict): Validated data containing user information.
        
        Returns:
            User: The newly created User instance.
        """
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role=validated_data['role']
        )
        # Set the user's password using Django's built-in set_password method
        user.set_password(validated_data['password'])
        # Save the user instance to the database
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for user login. Validates user credentials and returns user information if valid.
    """
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    role = serializers.CharField(read_only=True)

    def validate(self, data):
        """
        Validate user credentials. If valid, return user information.
        
        Args:
            data (dict): Data containing email and password.
        
        Returns:
            dict: Validated user data containing email, password, and role.
        
        Raises:
            serializers.ValidationError: If the login credentials are invalid.
        """
        email = data['email']
        password = data['password']
        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid login credentials")

        try:
            validation = {
                'email': user.email,
                "password": user.password,
                'role': user.role,
            }
            return validation
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid login credentials")

class LogoutSerializer(serializers.Serializer):
    """
    Serializer for user logout. Validates the refresh token required for logging out.
    """
    refresh_token = serializers.CharField(required=True)