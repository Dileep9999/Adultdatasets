from django.db import models

# Create your models here.
class AdultData(models.Model):
    age=models.CharField(max_length=256, blank=True, null=True)
    work=models.CharField(max_length=256, blank=True, null=True)
    fnlwgt=models.CharField(max_length=256, blank=True, null=True)
    education=models.CharField(max_length=256)
    education_num=models.CharField(max_length=256, blank=True, null=True)
    marital_status=models.CharField(max_length=256, blank=True, null=True)
    occupation=models.CharField(max_length=256, blank=True, null=True)
    relationship=models.CharField(max_length=256, blank=True, null=True)
    race=models.CharField(max_length=256, blank=True, null=True)
    sex=models.CharField(max_length=256, blank=True, null=True)
    capital_gain=models.CharField(max_length=256, blank=True, null=True)
    capital_loss=models.CharField(max_length=256, blank=True, null=True)
    hours_per_week=models.CharField(max_length=256, blank=True, null=True)
    native_country=models.CharField(max_length=256, blank=True, null=True)
    salary=models.CharField(max_length=256, blank=True, null=True)

    def __str__(self):
        return "{} ed person completed {}".format(self.age,self.education)