from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


# -------------------------
# REGISTER SERIALIZER
# -------------------------
class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User

        fields = [
            "first_name",
            "last_name",
            "email",
            "password",
            "role",
            "grade",
            "subject"
        ]

    # validate password strength (Django rules)
    def validate_password(self, value):
        validate_password(value)
        return value

    # role-based validation
    def validate(self, data):

        role = data.get("role")

        if role == "student" and not data.get("grade"):
            raise serializers.ValidationError({
                "grade": "Grade is required for students"
            })

        if role == "teacher" and not data.get("subject"):
            raise serializers.ValidationError({
                "subject": "Subject is required for teachers"
            })

        return data

    def create(self, validated_data):

        return User.objects.create_user(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
            password=validated_data["password"],
            role=validated_data["role"],
            grade=validated_data.get("grade"),
            subject=validated_data.get("subject")
        )


# -------------------------
# JWT LOGIN SERIALIZER (EMAIL)
# -------------------------
class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):

    username_field = "email"

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # extra data inside token
        token["role"] = user.role
        token["email"] = user.email

        return token

    def validate(self, attrs):

        data = super().validate(attrs)

        user = self.user

        # extra response data
        data["email"] = user.email
        data["role"] = user.role
        data["first_name"] = user.first_name
        data["last_name"] = user.last_name

        return data