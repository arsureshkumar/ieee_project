from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    head_shot=models.TextField()
    files = []
    
    def addFile(self, f):
        self.files.append(f)

    def getFiles(self):
        return self.files
    

    class Meta: # metadata
        ordering = ["user"] # sorted by user field when retrieving

    def __str__(self): # underscore for special Python methods
        return self.user.username