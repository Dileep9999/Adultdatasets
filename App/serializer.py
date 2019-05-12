from rest_framework import serializers
from .models import AdultData

class AdultDataSerailzer(serializers.ModelSerializer):

    class Meta:
        model=AdultData
        fields='__all__'