from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
                       url(r'^$', 'grade.curriculum.views.index'),
                       )
