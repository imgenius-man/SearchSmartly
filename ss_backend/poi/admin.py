from django.contrib import admin
from .models import PointOfInterest

@admin.register(PointOfInterest)
class PointOfInterestAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'category', 'latitude', 'longitude')
