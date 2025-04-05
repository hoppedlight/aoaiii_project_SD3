from django.urls import path
from .views import ai_pc_builder

urlpatterns = [
    path("api/pcbuilder/", ai_pc_builder),
]
