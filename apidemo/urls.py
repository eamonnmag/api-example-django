from django.conf.urls.defaults import *
#from apidemo.views import index
from django.views.generic.simple import direct_to_template

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r"^$", direct_to_template, {
        "template": "docs.html",
    }, name="home"),

    url(r'^auth/', include('api.urls')),
    url(r'^docs/', "apidemo.views.tutorial"),
    url(r'^demo/', include('demo.urls')),

    #url(r'^$', index),

    #url(r"^admin/", include(admin.site.urls)),
    #url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
)

# use django to always server static content.  bad idea in production, but hey, this is a tutorial about 23andMe not django!
import settings
urlpatterns += patterns('',
    (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
)

