from django.db import models

class ScreenplayInput(models.Model):
    text = models.CharField(max_length=500)
