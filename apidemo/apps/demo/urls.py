from django.conf.urls.defaults import *

urlpatterns = patterns('',
    url(r'^$', 'demo.views.view', name='demo_view'),
)
