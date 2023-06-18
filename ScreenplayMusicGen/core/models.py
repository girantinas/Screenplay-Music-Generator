from django.db import models

class ScreenplayInput(models.Model):
    text = models.CharField(max_length=10000)

class StoryOrdering(models.Model):
    stories = models.TextField(max_length=2000) # star-separated list of prompts