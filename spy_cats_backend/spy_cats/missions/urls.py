from django.urls import path
from .views import (MissionAPIView, MissionDetailsAPIView,
                    MissionCompleteAPIView, AssignCatAPIView, 
                    TargetCreateAPIView, TargetUpdateAPIView)


urlpatterns = [
    path("missions/", MissionAPIView.as_view(), name="mission-list-create"),
    path("<int:pk>/", MissionDetailsAPIView.as_view(), name="mission-detail"),
    path("<int:pk>/assign-cat/", AssignCatAPIView.as_view(), name="mission-assign-cat"),
    path("<int:pk>/complete/", MissionCompleteAPIView.as_view(), name="mission-complete"),
    path("<int:mission_id>/targets/", TargetCreateAPIView.as_view(), name="target-create"),
    path("<int:mission_id>/targets/<int:target_id>/", TargetUpdateAPIView.as_view(), name="target-update"),
]