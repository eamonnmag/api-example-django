'''
import datetime
from django.db import models
from django.utils.translation import ugettext_lazy as _

class ContactForm(models.Model):
    email = models.EmailField(_('Email Address'))
    message = models.TextField(_('Contact Form Message'))
    created = models.DateTimeField(_('Created'), default=datetime.datetime.now)

    def __unicode__(self):
        return _('Contact form message for %(email)s') % {'email': self.email}
'''