from django.views import View
from django.http import JsonResponse
from ..models import PointOfInterest

class OptionsView(View):

    def get(self, request):
        return JsonResponse({'categories': list(PointOfInterest.objects.values_list('category', flat=True).distinct())})
