from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from .models import UserProfile
import json

# Face recognition libraries
import face_recognition
import cv2 
import numpy as np
import base64
import io
from PIL import Image

def facedect(profile_image_base64, test_image_base64):
    # Decode profile image from base64
    profile_image_bytes = base64.b64decode(profile_image_base64)
    profile_image = Image.open(io.BytesIO(profile_image_bytes))
    profile_image = np.array(profile_image)

    # Decode test image from base64
    test_image_bytes = base64.b64decode(test_image_base64)
    test_image = Image.open(io.BytesIO(test_image_bytes))
    test_image = np.array(test_image)

    # Convert profile image to RGB format
    profile_image_rgb = profile_image[:, :, ::-1]

    # Resize and convert test image to RGB format
    small_test_image = cv2.resize(test_image, (0, 0), fx=0.25, fy=0.25)
    small_test_image_rgb = small_test_image[:, :, ::-1]

    # Get face encodings for profile image
    profile_image_encoding = face_recognition.face_encodings(profile_image_rgb)[0]

    # Get face encodings for test image
    face_encodings = face_recognition.face_encodings(small_test_image_rgb)

    if len(face_encodings) > 0:
        # Compare test image encodings with profile image encoding
        check = face_recognition.compare_faces([profile_image_encoding], face_encodings[0])
        if check[0]:
            return True
        else:
            return False
    else:
        return False


# Login endpoint 
def loginUser(request):
    if request.method =="POST":
        try:
            data = json.loads(request.body)  # Access JSON data
            

            return JsonResponse(
                 {'message': 'POST request received successfully',
                  'registerData': data})
        
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=405)


# Views for our facial recognition API
# Stores username, password (hashed in django), image data from head shot (FK with UserProfile table)
@csrf_exempt
def registerUser(request):
    if request.method =="POST":
        try:
            data = json.loads(request.body)  # Access JSON data
            
            # Create the User object
            user = User.objects.create_user(username=data["username"], password=data["password"])

            # Create the UserProfile object
            user_profile = UserProfile(user=user, head_shot=data["image"])
            user_profile.save()

            return JsonResponse(
                 {'message': 'POST request received successfully',
                  'registerData': data})
        
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=405)

# GET All users in our UserProfile table
def getUsers(request):
    if request.method == 'GET':
        # Fetch all User objects and related UserProfile objects
        users = User.objects.all()
        print(users)
        user_data = []
        for user in users:
            try:
                user_profile = UserProfile.objects.get(user=user)
                user_data.append({
                    'username': user.username,
                    'head_shot': user_profile.head_shot
                })
            except UserProfile.DoesNotExist:
                # Skip users without a UserProfile
                pass

        # Return the user data as a JSON response
        return JsonResponse({'users': user_data})

    # Return a 405 Method Not Allowed response for non-GET requests
    return JsonResponse({'error': 'Method not allowed.'}, status=405)
    
def fileUpload(request):
    if request.method =="POST":
        try:
            data = json.loads(request.body)  # Access JSON data
            
            try:
                user = UserProfile.objects.get(username = data["username"])
                user.addFile(data["file"])
            except UserProfile.DoesNotExist:
                return JsonResponse({'message': 'No such user'}, status=400)
            

            return JsonResponse(
                 {'message': 'POST request received successfully',
                  'registerData': data})
        
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=405)
    pass

def getUserFiles(request):
    if request.method == 'GET':
        # Fetch all User objects and related UserProfile objects
        try:
            user = UserProfile.objects.get(username = data["username"])
            user_data = user.getFiles()
        except UserProfile.DoesNotExist:
            return JsonResponse({'message': 'No such user'}, status=400)

        # Return the user data as a JSON response
        return JsonResponse({'users': user_data})

    # Return a 405 Method Not Allowed response for non-GET requests
    return JsonResponse({'error': 'Method not allowed.'}, status=405)
    pass