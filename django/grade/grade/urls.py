from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^$', 'grade.home.views.index'),
                       url(r'^curriculum/', include('grade.curriculum.urls')),
#                       url(r'^schedule/', include('grade.schedule.urls')),

                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^login/', 'django.contrib.auth.views.login', {'template_name': 'login.html'}),
                       url(r'^logout/', 'django.contrib.auth.views.logout_then_login', {'login_url': '/'}),
                       )

if settings.LOCAL:
    urlpatterns += patterns('',
                            (r'^media/(.*)$', 'django.views.static.serve',
                             {'document_root': settings.MEDIA_ROOT}),
                            )
