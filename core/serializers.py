# core/serializers.py
from rest_framework import serializers
from .models import Client, LoanStatement

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class LoanStatementSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanStatement
        fields = '__all__'
