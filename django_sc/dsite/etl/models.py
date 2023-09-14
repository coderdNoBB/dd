from django.db import models

class Spia(models.Model):
    date = models.DateField
    region = models.CharField(max_length=100)
    site = models.CharField(max_length=100)
    measure1 = models.DecimalField
    measure2 = models.DecimalField

class Mask(models.Model):
    date = models.DateField
    region = models.CharField(max_length=100)
    site = models.CharField(max_length=100)
    book = models.CharField(max_length=100)
    measure1 = models.DecimalField
    measure2 = models.DecimalField

class Ira(models.Model):
    date = models.DateField
    region = models.CharField(max_length=100)
    site = models.CharField(max_length=100)
    book = models.CharField(max_length=100)
    measure1 = models.DecimalField
    measure2 = models.DecimalField    

