from django.db import models

# Create your models here.
class Map(models.Model):
    name = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=8, decimal_places=4)
    longitude = models.DecimalField(max_digits=8, decimal_places=4)
    expiration_date = models.DateTimeField()