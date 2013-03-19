from grade.curriculum.models import Course
from django.contrib import admin

class CourseAdmin(admin.ModelAdmin):
    list_display = ('period', 'code', 'name', 'prerequisite', 'optative')

admin.site.register(Course, CourseAdmin)
