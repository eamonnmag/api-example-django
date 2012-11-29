from django.conf.urls.defaults import patterns, url, include
from api.views import callback, logout, profiles, user, genotype

urlpatterns = patterns('', 
    url(r'^callback/$', callback),
    url(r'^logout/$', logout),
    url(r'^profiles/$', profiles),
    url(r'^user/$', user),
    url(r'^genotype/(?P<snpid>\w+)/$', genotype),
)
