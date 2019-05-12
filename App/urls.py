from django.contrib import admin
from django.urls import path,include
from django.conf.urls import url
from django.views.generic.base import TemplateView
from .views import graphs,getData,getOptions

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('graph',graphs.as_view()),
    path('all',getData.as_view()),
    path('options',getOptions.as_view())
]