from django.views.generic.simple import direct_to_template

# FIXME rename docs.html tutorial.html
def tutorial(request, template_name="docs.html", extra_context=None):
    return direct_to_template(request, template=template_name, extra_context=extra_context)
