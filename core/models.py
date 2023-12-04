# models.py
from django.db import models
import uuid
from django.contrib.auth.models import User


# models.py
from django.db import models
import uuid
from django.contrib.auth.models import User


class Client(models.Model):
    GROWER_NO = models.CharField(
        max_length=36, unique=True, default=uuid.uuid4, primary_key=True)
    SURNAME = models.CharField(max_length=255)
    NAME_INITIALS = models.CharField(max_length=10)
    NATIONAL_ID = models.CharField(max_length=20)
    TEL_NO = models.CharField(max_length=15)
    EMAIL = models.EmailField(max_length=255)
    POSTAL_ADDRESS1 = models.CharField(max_length=255)
    POSTAL_ADDRESS2 = models.CharField(max_length=255)
    FARM_NAME = models.CharField(max_length=255)
    AREA_PROVINCE = models.CharField(max_length=50)
    CURRENT_REG = models.CharField(max_length=50)
    NEXT_REG = models.CharField(max_length=50)
    CONTRACTOR = models.CharField(max_length=255)
    HECTARES = models.DecimalField(max_digits=10.0, decimal_places=2)
    PROVINCE = models.CharField(max_length=50)


class LoanStatement(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    LOAN_SCHEME = models.CharField(max_length=150)
    INPUT_TYPE = models.CharField(max_length=150)
    PRODUCT_CODE = models.CharField(max_length=20)
    DESCRIPTION = models.TextField(max_length=255)
    PACKAGING_UNITS = models.CharField(max_length=20)
    UNITS_ISSUED = models.FloatField()
    CURRENCY = models.CharField(max_length=10)
    UNIT_PRICE = models.FloatField()
    AMOUNT = models.CharField(max_length=10)
    INVOICE_AMOUNT = models.FloatField()
    CREDITOR_NO = models.CharField(max_length=20)
    RECEIPT_NO = models.CharField(max_length=20)
    CHAIRMAN = models.CharField(max_length=255)
    AREA_MGR = models.CharField(max_length=255)
    COLLECTION_POINT = models.CharField(max_length=255)


class UserAuth(models.Model):
    username = models.CharField(max_length=50, unique=True, primary_key=True)
    password = models.CharField(max_length=255)
