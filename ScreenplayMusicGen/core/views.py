from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
import os
  
class ScreenplayInputView(APIView):
    
    serializer_class = ScreenplayInputSerializer

    def post(self, request):
        serializer = ScreenplayInputSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            audiofile = ScreenplayInputView.generate_music(serializer.data)
            f = open(audiofile, "rb") 
            response = Response()
            response.write(f.read())
            response['Content-Type'] ='audio/mp3'
            response['Content-Length'] = os.path.getsize(audiofile)
            return response

    @staticmethod
    def generate_music(text):
        # TODO: Add ML
        # Invoke Slurm to do so
        filename = "/Users/rohaga/Documents/CalHacks/Screenplay-Music-Generator/ScreenplayMusicGen/test/ES_Mindful Endeavors - Amaranth Cove.mp3"
        return filename
