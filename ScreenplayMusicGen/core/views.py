from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from . models import *
from django.http import HttpResponse
from . serializer import *
from utils.generate_music import *
import os
  
class SmartScreenplayInputView(APIView):
    
    serializer_class = ScreenplayInputSerializer

    def post(self, request):
        if (not request.body):
            return
        serializer = ScreenplayInputSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            audiofile = smart_generate_music(serializer.data['text'])
            res =  audiofile_to_response(audiofile)
            res['Access-Control-Allow-Origin'] = '*'
            return res
        
class AdvancedScreenplayInputView(APIView):

    serializer_class = ScreenplayInputSerializer
    def post(self, request):
        serializer = ScreenplayInputSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            prompts = generate_prompts_from_screenplay(serializer.data['text'])
            return HttpResponse('*'.join(prompts))
        

class StoryOrderingView(APIView):

    serializer_class = StoryOrderingSerializer
    def post(self, request):
        serializer = StoryOrderingSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            audiofile = generate_music(serializer.data['stories'].split("*"))
            res = audiofile_to_response(audiofile)
            res['Access-Control-Allow-Origin'] = '*'
            return res
