# Generated by Django 4.2.1 on 2023-06-03 03:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_imagefiles'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='imagefiles',
            options={'ordering': ['user']},
        ),
    ]