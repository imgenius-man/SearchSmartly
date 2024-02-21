from django.views import View
from django.http import JsonResponse
from django.core.paginator import Paginator
from ..models import PointOfInterest
from django.db.models import Q

class PoiView(View):

    def get(self, request):
        search_param = request.GET.get('search', '')
        filter_param = request.GET.get('filter', '')
        page_number = request.GET.get('page', 1)

        query_set = PointOfInterest.objects.all().order_by('id')

        if search_param:
            query_set = query_set.filter(id__icontains=search_param)

        if filter_param:
            filter_categories = filter_param.split(',')
            query_set = query_set.filter(Q(category__in=filter_categories))

        paginator = Paginator(query_set, 15)
        page_obj = paginator.get_page(page_number)

        pois_data = list(page_obj.object_list.values())

        return JsonResponse({
            'data': pois_data,
            'page': page_obj.number,
            'total_pages': paginator.num_pages
        })
