from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from .forms import LoginForm,Registrationform
from django.contrib.auth import authenticate, login

from django.urls import path, include # not exactly sure where this is used for 

import os
import face_recognition
import cv2 

def facedect(loc):
    cam = cv2.VideoCapture(0) # activates camera
    s, img = cam.read() # s is True is successfully captured, img is a NumPy array but just of a single frame
    
    if s:   
        
        BASE_DIR = os.path.abspath(__file__) # __file__ gives path of current python script
        MEDIA_ROOT = os.path.join(BASE_DIR,'profile_pictures')

        loc=(str(MEDIA_ROOT)+loc)
        # Load profile pic and get encodings for it
        profile_image = face_recognition.load_image_file(loc)
        profile_image_encoding = face_recognition.face_encodings(profile_image)[0]

        small_frame = cv2.resize(img, (0, 0), fx=0.25, fy=0.25) # resize to 1/4 of original for faster face recognition processing

        rgb_small_frame = small_frame[:, :, ::-1] # BGR (from OpenCV) to RGB (for face_recognition) 

        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations) # two args..?

        check = face_recognition.compare_faces(profile_image_encoding, face_encodings)
        
        video_capture.release() # to stop capturing video

        print(check)
        if check[0]:
            return True
        else :
            return False


def about(request):
    return render(request,'templates/about.html',{})

def register(request):
    if request.method =="POST":
            form = Registrationform(request.POST)
            if form.is_valid():
                    form.save() # model instance created, cleaned data saved there, and model saved to database
                    username=form.cleaned_data['username'] # get validated data
                    password=form.cleaned_data['password1']
                    user = authenticate(username=username,password=password) # returns autheticated user object if authentication succeeds
                    login(request,user) # facedect??
                    return redirect(home)
            else:
                    return redirect(login)        

    form =Registrationform() # create a new instance of form class to be rendered
    return render(request,'templates/register.html',{'form':form}) 

def base(request):
        if request.method =="POST":
                form =LoginForm(request.POST)
                if form.is_valid():
                        username=request.POST['email']
                        password=request.POST['password']
                        user = authenticate(request,username=username,password=password)
                        if user is not None:
                                if facedect(user.userprofile.head_shot.url):
                                        login(request,user) 
                                return redirect(home)
                        else:
                                return redirect(index)        
        else:
                MyLoginForm = LoginForm()
                return render(request,"base.html",{"MyLoginForm": MyLoginForm})  

def login_view(request):
    return render(request, 'templates/login.html', {})

def logout_view(request):
    logout(request)
    return redirect(login)

def index(request):
   return render(request, 'templates/index.html', {})


@login_required
def home_view(request):
    return render(request, 'templates/home.html', {})


# def find_user_view(request):
#     return JsonResponse({'success': True})