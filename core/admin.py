# core/admin.py
from django.contrib import admin
from .models import Client, LoanStatement

admin.site.register(Client)
admin.site.register(LoanStatement)
