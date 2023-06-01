from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from .models import UserProfile
import json

# Face recognition libraries
import face_recognition
import numpy as np
import base64
import io
from PIL import Image

def facedect(profile_image_base64, test_image_base64, test_image_location):
    # Decode profile image from base64
    profile_image_bytes = base64.b64decode(profile_image_base64.split(",")[1])
    profile_image = Image.open(io.BytesIO(profile_image_bytes))
    profile_image.save("./test-images/profile.jpg")
    profile_image = np.array(profile_image)
    # print(profile_image)

    # Decode test image from base64
    test_image_bytes = base64.b64decode(test_image_base64.split(",")[1])
    test_image = Image.open(io.BytesIO(test_image_bytes))
    test_image.save("./test-images/login.jpg")
    test_image = np.array(test_image)
    # print(test_image)


    # Get face encodings for profile image
    profile_locations = face_recognition.face_locations(profile_image, model="cnn", number_of_times_to_upsample=0)
    print("profile locations when logging in are ", profile_locations)
    profile_image_encoding = face_recognition.face_encodings(profile_image, known_face_locations=profile_locations, num_jitters=100, model="large")
    print("profile_image_encoding", profile_image_encoding)

    # Get face encodings for test image
    print("Login face locations when logging in are ", test_image_location)
    face_encodings = face_recognition.face_encodings(test_image, known_face_locations=test_image_location, num_jitters=100, model="large")
    print("face_encodings", face_encodings)

    if len(face_encodings) > 0:
        # Compare test image encodings with profile image encoding
        check = face_recognition.compare_faces(profile_image_encoding, face_encodings[0], tolerance=0.7)
        print(check)
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
            
            username = data["username"] 
            login_headshot = data["image"]
            # Check if login username exists in DB
            try:
                user = User.objects.get(username=username)
                try:
                    profile = UserProfile.objects.get(user=user)
                    head_shot = profile.head_shot

                    head_shot_bytes = base64.b64decode(head_shot.split(",")[1])
                    headshot_image = Image.open(io.BytesIO(head_shot_bytes))
                    headshot_image = np.array(headshot_image)
                    face_locations = face_recognition.face_locations(headshot_image, model="cnn", number_of_times_to_upsample=0)
                    if len(face_locations) == 0:
                        return JsonResponse({'error': 'Cannot find face.'}, status=400)
                    else:
                        # User and UserProfile exist, you can access head_shot data here
                        # 1st arg is image in DB, 2nd is login image
                        if facedect(head_shot, login_headshot, face_locations):
                            print("face rec success!")
                            return JsonResponse({'message': 'User face rec auth success.'}, status=200)
                        else:
                            print("face rec failure!")
                            return JsonResponse({'error': 'Face not recognized.'}, status=400)
                
                except UserProfile.DoesNotExist:
                    # UserProfile does not exist for the user
                    return JsonResponse({'error': 'UserProfile does not exist.'}, status=404)

            except User.DoesNotExist:
            # User does not exist
                return JsonResponse({'error': 'User does not exist.'}, status=404)


        
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

            # Check if the user already exists
            try:
                user = User.objects.get(username=data["username"])
                return JsonResponse({'error': 'User already exists'}, status=400)
            
            except User.DoesNotExist:

                # Check if we can detect a face
                profile_image_bytes = base64.b64decode(data["image"].split(",")[1])
                profile_image = Image.open(io.BytesIO(profile_image_bytes))
                profile_image = np.array(profile_image)
                face_locations = face_recognition.face_locations(profile_image, model="cnn", number_of_times_to_upsample=0)
                print("face locations are ", face_locations)

                if len(face_locations) == 0:
                    return JsonResponse({'error': 'No faces detected'}, status=401) 

                # Create the User object
                user = User.objects.create_user(username=data["username"], password=data["password"])

                # Create the UserProfile object
                user_profile = UserProfile(user=user, head_shot=data["image"])
                user_profile.save()

                return JsonResponse(
                    {'message': 'POST request received successfully',
                    'registerData': data}, status=200)
        
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
        return JsonResponse({'users': user_data}, status=200)

    # Return a 405 Method Not Allowed response for non-GET requests
    return JsonResponse({'error': 'Method not allowed.'}, status=405)
    
    