from django.contrib import admin
from .models import Cat

@admin.register(Cat)
class CatAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'breed', 'experience', 'salary')
    list_filter = ('breed', 'experience')
    search_fields = ('name', 'breed')
    ordering = ('id',)