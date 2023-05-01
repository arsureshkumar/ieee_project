from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

# Extend userprofile model
class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    phone=models.IntegerField(default=0)
    head_shot=models.ImageField(upload_to='profile_pictures',blank=True)
    
    class Meta: # metadata
        ordering = ["user"] # sorted by user field when retrieving

    def __str__(self): # underscore for special Python methods
        return self.user.username

def create_profile(sender,**kwargs): # sender refers to model class and **kwargs to accept any number of args
    if kwargs['created']:
        user_profile=UserProfile.objects.get_or_create(user=kwargs['instance'])

    # TODO: maybe add update user functionality here too

post_save.connect(create_profile,sender=User) # 