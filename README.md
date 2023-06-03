# IEEE Quarterly Project FaceDrive

tldr: A file storage web app (basically google drive) with facial recognition as its main form of authentication. Users can create accounts with their face as the key to logging in to their respective accounts. For now, users can upload and view images in the web app. All the facial recognition, file upload and download, is handled on the backend in Python using the Django framework. The frontend is a NextJS app, which is a meta framework built on top of React. To run the full stack web app, we have the backend server locally hosted on port 8000 while the frontend is hosted on port 3000. 

Our facial recognition functionality is built based on the face-recognition Python library, which itself is built on top of Dlib, a machine learning library built in C++. The endpoint in Django that handles face recognition goes through a two step process:
1) It calls the face_locations method, which identifies human faces in the photo, based on this location data, it then encodes the photo into a 128 dimension face encoding. (idk what this means either, all I do is follow the documentation)
2) We repeat step 1 twice for the face image data stored in our DB, and the photo taken at login from a potential user. With these two face encodings, we compare them and if the similarities meet a certain threshhold, the user is logged in to their account

## Architecture
- **Frontend: NextJS, TailwindCSS, JS Fetch API**
- **Backend: Django(Python), facial_recognition**
- **Database: SQLite**

## System Diagram
![FaceDrive Architecture](https://github.com/arsureshkumar/ieee_project/assets/31028008/e54df04d-aa38-4b44-a6da-42ee178eaf5e|width=10px)

## Screenshots of the app

![Screenshot (505)](https://github.com/arsureshkumar/ieee_project/assets/31028008/c910d1b9-2cbc-4794-89aa-fa46af280a65)

![Screenshot (506)](https://github.com/arsureshkumar/ieee_project/assets/31028008/ad80a992-1748-4f57-85e3-8bb8c5b64271)

![Screenshot (508)](https://github.com/arsureshkumar/ieee_project/assets/31028008/3ab16dbb-d457-4f73-8da5-138dd9542788)

![Screenshot (510)](https://github.com/arsureshkumar/ieee_project/assets/31028008/bad2557a-6aca-4e50-8f4e-b3f94db88a55)

![Screenshot (509)](https://github.com/arsureshkumar/ieee_project/assets/31028008/afdeeb90-dfd6-4f7d-88e0-169930dada79)

![Screenshot (507)](https://github.com/arsureshkumar/ieee_project/assets/31028008/1c3df8ef-e5c8-4302-8364-0022b79b83bc)
