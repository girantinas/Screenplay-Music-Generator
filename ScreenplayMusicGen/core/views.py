from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from django.http import HttpResponse
from . serializer import *
from utils.generate_music import *
import os
  
class SmartScreenplayInputView(APIView):
    
    serializer_class = ScreenplayInputSerializer

    def post(self, request):
        serializer = ScreenplayInputSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return audiofile_to_response("./test/ES_Mindful Endeavors - Amaranth Cove.mp3")
            # audiofile = smart_generate_music(serializer.data)
            # return audiofile_to_response(audiofile)
        
class AdvancedScreenplayInputView(APIView):

    serializer_class = ScreenplayInputSerializer
    def post(self, request):
        serializer = ScreenplayInputSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            prompts = generate_prompts_from_screenplay(serializer.data)
            return HttpResponse(prompts)
        

# class StoryOrderingView(APIView):

#     serializer_class = StoryOrderingSerializer
#     def post(self, request):
#         serializer = StoryOrderingSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             audiofile = generate_music(serializer.data)
#             return audiofile_to_response(audiofile)
