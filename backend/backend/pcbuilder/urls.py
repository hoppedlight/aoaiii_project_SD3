from django.urls import path
from .views import ScrapePCPartPicker

urlpatterns = [
    path('api/parts/scrape/', ScrapePCPartPicker.as_view(), name='scrape-pcpartpicker'),
]
