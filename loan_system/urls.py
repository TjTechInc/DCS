from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    # Include your app's urls with the 'api' prefix
    path('api/', include('core.urls')),
]
