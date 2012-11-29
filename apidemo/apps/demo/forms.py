'''
from django import forms
from contactform.models import ContactForm

class ContactForm(forms.ModelForm):

	email = forms.EmailField(label='', max_length=100)
	message = forms.CharField(label='', widget=forms.Textarea)

	class Meta:
		model = ContactForm
		fields = ['email', 'message']
'''