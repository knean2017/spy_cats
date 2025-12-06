from rest_framework.views import Response, APIView, status
from django.shortcuts import get_object_or_404
from .serializers import CatSerializer
from .models import Cat


class CatAPIView(APIView):
    def get(self, request):
        cats = Cat.objects.all()
        serializer = CatSerializer(cats, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = CatSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Cat is created successfully"},
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CatDetailsAPIView(APIView):
    def get(self, request, cat_id):
        cat = get_object_or_404(Cat, id=cat_id)
        serializer = CatSerializer(cat)

        return Response({"cat": serializer.data})
        
    def patch(self, request, cat_id):
        cat = get_object_or_404(Cat, id=cat_id)
        if "salary" in request.data:
            cat.salary = request.data["salary"]
            cat.save()
            return Response({"message": "Salary updated successfully"},
                            status=status.HTTP_200_OK)    
            
        return Response({"error": "Salary field required"}, 
                        status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, cat_id):
        cat = get_object_or_404(Cat, id=cat_id)
        cat.delete()
        return Response({"message": "Cat deleted successfully"}, 
                        status=status.HTTP_204_NO_CONTENT)

