from django.urls import path
from .views import CatAPIView, CatDetailsAPIView

urlpatterns = [
    path('cats/', CatAPIView.as_view(), name='cats-list'),
    path('cats/<int:cat_id>/', CatDetailsAPIView.as_view(), name='cat-detail'),
]