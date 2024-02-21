from django.urls import path
from .views.poi_view import PoiView
from .views.options_view import OptionsView

urlpatterns = [
    path('', PoiView.as_view()),
    path('options', OptionsView.as_view())
]
