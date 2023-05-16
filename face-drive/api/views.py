from django.shortcuts import render
from django.http import HttpResponse

# Views for our facial recognition API
def receiveImage(request):
    if request.method =="POST":
        print("RecieverImage post request")
        return None
    print("NOT POST req")
    return HttpResponse("Get request")