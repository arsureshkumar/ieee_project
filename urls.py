from django.urls import path
from . import views 
urlpatterns = [

    path('templates/index/',views.about,name='index'),
    path('templates/about/',views.about,name='about'),
    path('templates/home/',views.home_view,name='home'),
    path('templates/register/',views.register,name='register'),
    path('templates/login/',views.login_view,name='login')
]
