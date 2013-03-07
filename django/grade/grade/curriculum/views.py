# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
#    from django.core import serializers
#    jsdata = serializers.get_serializer('json')()

    context = {}    
    return render_to_response('curriculum/index.html', context,
                              context_instance=RequestContext(request))
