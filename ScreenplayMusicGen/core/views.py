from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
# Create your views here.
  
class ScreenplayInputView(APIView):
    
    serializer_class = ScreenplayInputSerializer
  
    def get(self, request):
        screenplay_input = [ {"text" : obj.text}  for obj in ScreenplayInput.objects.all()]
        return Response(screenplay_input)
  
    def post(self, request):
        serializer = ScreenplayInputSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)
        # TODO: Add ML Code