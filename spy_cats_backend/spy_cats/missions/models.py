from django.db import models
from cats.models import Cat


class Mission(models.Model):
    name = models.CharField(max_length=128)
    cat = models.OneToOneField(Cat, on_delete=models.SET_NULL,
                               null=True, blank=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {"Completed" if self.is_completed else "Pending"}"


class Target(models.Model):
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    country = models.CharField(max_length=32)
    notes = models.TextField(blank=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {"Completed" if self.is_completed else "Pending"}"
