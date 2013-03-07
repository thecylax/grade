# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.contrib.auth.decorators import login_required

def index(request):
    context = {}
    
    return render_to_response('index.html', context,
                              context_instance=RequestContext(request))
