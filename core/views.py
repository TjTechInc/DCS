# core/views.py
from django.contrib.auth.views import LoginView
from django.contrib.auth import authenticate, login
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.response import Response
from .models import Client, LoanStatement
from .serializers import ClientSerializer, LoanStatementSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.generics import CreateAPIView
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.core.mail import send_mail


@receiver(post_save, sender=User)
def user_registered(sender, instance, created, **kwargs):
    if created:
        # Additional tasks when a new user is registered
        send_mail('Welcome!', 'Thank you for registering.',
                  'from@example.com', [instance.email])


class CustomRegistrationView(CreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def create(self, request, *args, **kwargs):
        # Your custom registration logic here
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user_id': user.pk, 'email': user.email})


class ClientListCreateView(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class LoanStatementListCreateView(generics.ListCreateAPIView):
    queryset = LoanStatement.objects.all()
    serializer_class = LoanStatementSerializer


@api_view(['POST'])
@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = request.data
        user = User.objects.create_user(
            username=data['username'], password=data['password'])
        Client.objects.create(
            user=user, GROWER_NO=data['GROWER_NO'], SURNAME=data['SURNAME'], EMAIL=data['EMAIL'], TEL_NO=data['TEL_NO'])
        return JsonResponse({'message': 'User registered successfully'}, status=201)


@api_view(['POST'])
@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = request.data
        user = authenticate(
            username=data['username'], password=data['password'])
        if user:
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_data(request):
    client_data = Client.objects.filter(user=request.user)
    serializer = ClientSerializer(client_data, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def capture_data(request):
    if request.method == 'POST':
        data = request.data
        data['user'] = request.user.id
        serializer = LoanStatementSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Data captured successfully'}, status=201)
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
