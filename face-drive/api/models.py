from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    head_shot=models.TextField()

    
    class Meta: # metadata
        ordering = ["user"] # sorted by user field when retrieving

    def __str__(self): # underscore for special Python methods
        return self.user.username

class ImageFiles(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE, unique=False)
    file_name = models.CharField(max_length=250)
    file_string = models.TextField()


    class Meta: # metadata
        ordering = ["user"] # sorted by user field when retrieving

    def __str__(self): # underscore for special Python methods
        return self.user.username