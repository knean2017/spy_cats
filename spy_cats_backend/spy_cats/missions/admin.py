from django.contrib import admin
from .models import Mission, Target


class TargetInline(admin.TabularInline):
    model = Target
    extra = 1  
    fields = ("name", "country", "notes", "is_completed")
    readonly_fields = ("is_completed",)


@admin.register(Mission)
class MissionAdmin(admin.ModelAdmin):
    list_display = ("name", "cat", "is_completed")
    list_filter = ("is_completed",)
    search_fields = ("name", "cat__name")
    inlines = [TargetInline]  # Mission-ə bağlı target-ləri göstərir
    actions = ["mark_completed"]  # admin action əlavə etmək istəyirsənsə

    def mark_completed(self, request, queryset):
        updated = queryset.update(is_completed=True)
        self.message_user(request, f"{updated} mission(s) marked as completed.")
    mark_completed.short_description = "Mark selected missions as completed"


@admin.register(Target)
class TargetAdmin(admin.ModelAdmin):
    list_display = ("name", "mission", "country", "is_completed")
    list_filter = ("is_completed", "country")
    search_fields = ("name", "mission__name", "country")
