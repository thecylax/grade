# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.contrib.auth.decorators import login_required

from grade.curriculum.models import Course

@login_required
def index(request):
    #from django.core import serializers
    #jsdata = serializers.get_serializer('json')
    #courses = Course.objects.all()
    
    p1 = Course.objects.filter(period=1)
    p2 = Course.objects.filter(period=2)
    p3 = Course.objects.filter(period=3)
    p4 = Course.objects.filter(period=4)
    p5 = Course.objects.filter(period=5)
    p6 = Course.objects.filter(period=6)
    p7 = Course.objects.filter(period=7)
    p8 = Course.objects.filter(period=8)

    courses = map(None, p1, p2, p3, p4, p5, p6, p7, p8)

    context = {'courses': courses}
    return render_to_response('curriculum/index.html', context,
                              context_instance=RequestContext(request))
