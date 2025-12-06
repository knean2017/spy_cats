import requests
from rest_framework import serializers
from .models import Cat


BREEDS = [breed["name"] for breed in requests.get("https://api.thecatapi.com/v1/breeds").json()]


class CatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cat
        fields = "__all__"

    
    def validate_breed(self, value):
        if value not in BREEDS:
            raise serializers.ValidationError("Invalid breed")
        return value
    
    def validate_salary(self, value):
        if value < 0:
            raise serializers.ValidationError("Salary must be positive.")
        return value
