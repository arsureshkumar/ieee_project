# Generated by Django 4.2.1 on 2023-06-03 04:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_imagefiles_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='imagefiles',
            name='file_endpoint',
            field=models.CharField(default='', max_length=250),
        ),
    ]
