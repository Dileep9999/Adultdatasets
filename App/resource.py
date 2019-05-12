from import_export import resources
from .models import Person

class AdultDataResource(resources.ModelResource):
    
    class Meta:
        model = Person