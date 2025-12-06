from django.db import models


class Cat(models.Model):
    name = models.CharField(max_length=32)
    experience = models.PositiveIntegerField()
    breed = models.CharField(max_length=50)
    salary = models.FloatField()


    def __str__(self):
        return f"{self.name}"