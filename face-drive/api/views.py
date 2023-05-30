from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from .models import UserProfile
import json

# Views for our facial recognition API
# Stores username, password (hashed in django), image data from head shot (FK with UserProfile table)
@csrf_exempt
def registerUser(request):
    print(request)
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
    
    