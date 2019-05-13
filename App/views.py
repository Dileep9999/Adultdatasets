from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .models import AdultData
from .serializer import AdultDataSerailzer
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
from django.core.paginator import Paginator
from django.core.cache import cache
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
 
CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)


# from rest_framework import PageNumberPagination
from rest_framework import pagination
class LargeResultsSetPagination(pagination.PageNumberPagination):
    page_size = 30
    page_size_query_param = 'page_size'
    max_page_size = 100


class tet(generics.ListAPIView):
    
    def get(self,request):
        return Response('Hello World')


class graphs(generics.ListAPIView):

    def get(self, request):
        if 'graph_data' in cache:
            data = cache.get('graph_data')
            return  Response(data)
        else:
            male_count = AdultData.objects.filter(sex="Male").count()
            female_count = AdultData.objects.filter(sex="Female").count()
            dat=[x['relationship'] for x in AdultData.objects.values('relationship').distinct() ]
            race=[y['race'] for y in AdultData.objects.values('race').distinct()]
            relationship_counts=[]
            for data in dat:
                c=AdultData.objects.filter(relationship__startswith=data).count()
                relationship_counts.append(c)
            cache.set('graph_data',{
                    "male_female":[male_count, female_count],
                    "relationship_status":dat,
                    "races":race,
                    "relationship_counts":relationship_counts
                },timeout=CACHE_TTL)
            return Response(
                {
                    "male_female":[male_count, female_count],
                    "relationship_status":dat,
                    "races":race,
                    "relationship_counts":relationship_counts
                }
            )
class getData(generics.ListAPIView):
    serializer_class=AdultDataSerailzer
    queryset=AdultData.objects.all()
    pagination_class = LargeResultsSetPagination
    
    # def get_queryset(self):
    #     data_list=AdultData.objects.all()
    #     paginator = Paginator(data_list, 25)
    #     page = self.request.query_params.get('page',1)
    #     data = paginator.get_page(page)
    #     return paginator
        
    filter_backends = (DjangoFilterBackend,filters.SearchFilter,)
    filterset_fields = ('sex','race','relationship')
    # # search_fields = ('__all__',)
    # # filter_backends = (ProductsFilterBackend,)
    search_fields = ('sex', 'education', 'native_country','marital_status','occupation','relationship','race','salary','age','occupation')
    # data_numpage = 0
    # pagination_numpages = 0
    # pagination_hasprev = 0
    # pagination_hasnext = 0
    # data_count = 0

class getOptions(generics.ListAPIView):

    def get(self,request):
        if 'options' in cache:
            data = cache.get('options')
            return  Response(data)
        else:
            try:
                race=[y['race'] for y in AdultData.objects.values('race').distinct()]
                relationship=[x['relationship'] for x in AdultData.objects.values('relationship').distinct()]
                cache.set('options',{
                    "relationship":relationship,
                    "race":race
                },timeout=CACHE_TTL)
                return Response({
                    "relationship":relationship,
                    "race":race
                })
            except Exception as e:
                return Response({
                    "message":e
                },status=400)
