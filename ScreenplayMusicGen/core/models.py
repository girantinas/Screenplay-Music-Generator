from django.db import models

class ScreenplayInput(models.Model):
    text = models.CharField(max_length=500)

class StoryOrdering(models.Model):
    stories = models.TextField(max_length=2000) # pound-separated list of prompts