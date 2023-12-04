from django.urls import path
from .views import CustomAuthToken, CustomRegistrationView, register_user, login_user, view_data, capture_data
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/', CustomAuthToken.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', CustomRegistrationView.as_view(), name='register'),
    path('register_user/', register_user, name='register_user'),
    path('login_user/', login_user, name='login_user'),
    path('view_data/', view_data, name='view_data'),
    path('capture_data/', capture_data, name='capture_data'),
]
