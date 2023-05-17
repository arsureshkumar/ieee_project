from django.http import HttpResponse
from django.http import JsonResponse
import json

# Views for our facial recognition API
def receiveImage(request):
    print(request)
    if request.method =="POST":
        try:
            data = json.loads(request.body)  # Access JSON data
            # Process the data or perform any necessary operations
            return JsonResponse(
                 {'message': 'POST request received successfully',
                  'imageData': data})
        
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=405)

def testReq(request):
    print("Test get req")
    try:
        return JsonResponse({'message': 'Hello there!'})
    except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)
    
    