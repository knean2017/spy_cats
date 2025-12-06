from rest_framework.views import APIView, Response, status
from .models import Mission, Target
from cats.models import Cat
from .serializers import MissionSerializer, TargetSerializer
from django.shortcuts import get_object_or_404


class MissionAPIView(APIView):
    def get(self, request):
        missions = Mission.objects.all()
        serializer = MissionSerializer(missions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
     
    def post(self, request):
        serializer = MissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, 
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, 
                        status=status.HTTP_400_BAD_REQUEST)


class MissionDetailsAPIView(APIView):
    def delete(self, request, mission_id):
        mission = get_object_or_404(Mission, id=mission_id)
        if mission.cat is not None:
            return Response({"error": "Cannot delete a mission with assigned cat"}, 
                            status=status.HTTP_400_BAD_REQUEST)
        mission.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class MissionCompleteAPIView(APIView):
    def patch(self, request, mission_id):
        mission = get_object_or_404(Mission, id=mission_id)

        if mission.is_completed:
            return Response({"message": "Mission is already completed"},
                            status=status.HTTP_400_BAD_REQUEST)

        incomplete_targets = mission.target_set.filter(is_completed=False)
        if incomplete_targets.exists():
            return Response({"message": "Cannot complete mission until all targets are completed"},
                            status=status.HTTP_400_BAD_REQUEST)

        mission.is_completed = True
        mission.save()

        return Response({"message": f"Mission '{mission.name}' marked as completed"},
                        status=status.HTTP_200_OK)


class AssignCatAPIView(APIView):
    def patch(self, request, mission_id):
        mission = get_object_or_404(Mission, id=mission_id)
        cat_id = request.data.get('cat_id')
        if mission.cat is not None:
            return Response({"error": "Mission already has a cat"},
                            status=status.HTTP_400_BAD_REQUEST)
        cat = get_object_or_404(Cat, id=cat_id)
        mission.cat = cat
        mission.save()
        return Response({"message": f"Cat {cat.name} assigned to mission {mission.name}"})

# TARGET
class TargetCreateAPIView(APIView):
    def post(self, request, mission_id):
        mission = get_object_or_404(Mission, id=mission_id)

        if mission.target_set.count() >= 3:
            return Response({"error": "A mission can have maximum 3 targets"},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = TargetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(mission=mission)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class TargetUpdateAPIView(APIView):
    def patch(self, request, mission_id, target_id):
        mission = get_object_or_404(Mission, id=mission_id)
        target = get_object_or_404(Target, id=target_id, mission=mission)

        if mission.is_completed or target.is_completed:
            return Response({"error": "Cannot update a completed target or mission"},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = TargetSerializer(target, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

