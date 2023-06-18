from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from django.http import HttpResponse
from . serializer import *
import os
  
class ScreenplayInputView(APIView):
    
    serializer_class = ScreenplayInputSerializer

    def post(self, request):
        serializer = ScreenplayInputSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            audiofile = ScreenplayInputView.generate_music(serializer.data)
            response = HttpResponse()
            with open(audiofile, "rb") as f:
                response.write(f.read())
            response['Content-Length'] = os.path.getsize(audiofile)
            response['Content-Disposition'] = 'attachment; filename="' + audiofile + '"'
            return response

    @staticmethod
    def generate_music(text):
        # TODO: Add ML
        # Invoke Slurm to do so
        filename = "./test/ES_Mindful Endeavors - Amaranth Cove.mp3"
        return filename
