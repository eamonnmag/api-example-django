api-example-django
============

This is a Django app built on the 23andMe API, that also pulls in data from
SNPedia.

Clone the repo:

```git clone git@github.com:23andMe/api-example-django.git```

Go into the directory, and setup a virtual environment with python:

```cd api-example-django && virtualenv . --no-site-packages```

Install the required packages with ```pip```:

```pip install -r requirements.txt```

Change ```CLIENT_ID, CLIENT_SECRET, and CALLBACK_URL``` in ```apidemo/settings.py```, to match your dev credentials from http://api.23andme.com/dev/.  I changed my ```CALLBACK_URL``` to ```http://localhost:8000/auth/callback/``` because that's where I run the local Django server.

Change ```SECRET_KEY``` to something unique.

Create the session databases:

```cd apidemo && python manage.py syncdb```

And finally, run the server on localhost:

```python manage.py runserver```
