from rest_framework import serializers
from . models import *
  
class ScreenplayInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScreenplayInput
        fields = ['text']

class StoryOrderingSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoryOrdering
        fields = ['stories']