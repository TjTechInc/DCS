# Generated by Django 4.2.7 on 2023-12-04 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_client_grower_no'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='GROWER_NO',
            field=models.CharField(max_length=7, unique=True),
        ),
    ]