from django.db import models
from django.contrib.postgres.fields import ArrayField

class PointOfInterest(models.Model):
    id = models.CharField(max_length=200, primary_key=True)
    name = models.CharField(max_length=300)
    category = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    ratings = ArrayField(models.CharField())

    def __str__(self):
        return self.name
