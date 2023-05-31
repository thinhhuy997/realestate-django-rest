from pyparsing import Char
from .models import RealEstatePost, RealEstatePost2
from django_filters import FilterSet, AllValuesFilter
from django_filters import DateTimeFilter, NumberFilter, CharFilter, MultipleChoiceFilter, ModelMultipleChoiceFilter
from .models import Region
from django import forms

choices= ( 
         (1,1),
         (2,2),
         (3,3),
         )

class RealestateFilter(FilterSet):
  min_price = NumberFilter(field_name='total_price', lookup_expr='gte')
  max_price = NumberFilter(field_name='total_price', lookup_expr='lte')
  min_area = NumberFilter(field_name='spec_detail__area', lookup_expr='gte')
  max_area = NumberFilter(field_name='spec_detail__area', lookup_expr='lte')
  min_mattien = NumberFilter(field_name='spec_detail__mat_tien', lookup_expr='gte')
  max_mattien= NumberFilter(field_name='spec_detail__mat_tien', lookup_expr='lte')
  min_duongvao = NumberFilter(field_name='spec_detail__duong_vao', lookup_expr='gte')
  max_duongvao= NumberFilter(field_name='spec_detail__duong_vao', lookup_expr='lte')
  min_bedroom = NumberFilter(field_name='spec_detail__bedroom_number', lookup_expr='gte')
  max_bedroom= NumberFilter(field_name='spec_detail__bedroom_number', lookup_expr='lte')
  min_toilet = NumberFilter(field_name='spec_detail__toilet_number', lookup_expr='gte')
  max_toilet= NumberFilter(field_name='spec_detail__toilet_number', lookup_expr='lte')
  huong_nha = CharFilter(field_name='spec_detail__huong_nha')
  phap_ly = CharFilter(field_name='spec_detail__phap_ly')

  class Meta:
    model = RealEstatePost2
    fields = (
      'min_price',
      'max_price',
      'min_area',
      'max_area',
      'min_mattien',
      'max_mattien',
      'min_duongvao',
      'max_duongvao',
      'min_bedroom',
      'max_bedroom',
      'min_toilet',
      'max_toilet',
      'region',
      'huong_nha',
      'phap_ly'
    )