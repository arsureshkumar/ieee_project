from django.db import models
from api.models import UserProfile

# Create your models here.
class Log(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    photo = models.TextField()
    is_correct = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return super().__str__()
