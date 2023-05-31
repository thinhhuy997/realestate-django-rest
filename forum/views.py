from django.shortcuts import render
from .models import Post, Region, Comment
from django.contrib.auth.models import User

from .serializers import PostSerializer, RegionSerializer, CommentSerializer, UserSerializer

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
import django_filters.rest_framework
from rest_framework.decorators import api_view
from django.db.models import Count
# from .realestate_filters import RealestateFilter

# Create your views here.

# USER
class userList(generics.ListCreateAPIView):
  queryset = User.objects.all().order_by('-id')
  serializer_class = UserSerializer

class userDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = User.objects.all().order_by('-id')
  serializer_class = UserSerializer
  lookup_field = 'id'

# REGION
class regionList(generics.ListCreateAPIView):
  queryset = Region.objects.all().order_by('-id')
  serializer_class = RegionSerializer

class regionDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Region.objects.all()
  serializer_class = RegionSerializer
  lookup_field = 'id'

# FORUM POST
class forumPostList(generics.ListCreateAPIView):
  queryset = Post.objects.all().order_by('-id')
  serializer_class = PostSerializer
  filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
  filterset_fields = ['category']

class forumPostDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Post.objects.all()
  serializer_class = PostSerializer
  lookup_field = 'id'

@api_view(['Get'])
def retrieveLastFiveForumPost(request):
  
  if request.method == 'GET':
    post_objs = Post.objects.filter().order_by("-id")[:5]
    post_arr = [{"id": item.id, "region": {"region_name": item.region.region_name, "color_code": item.region.color_code}
    , "created_by": item.created_by.username,
    "created_date": item.created_date, "title": item.title, "content": item.content, "comment_count": Comment.objects.filter(post = item.id).count(),
    "category": item.category} for item in post_objs]
    return Response({"items": post_arr})

@api_view(['Get'])
def RegionIdRetrieve(request, region_code):
  region_id = None
  if request.method == 'GET':
    region_obj = Region.objects.get(code = region_code)
    region_id = region_obj.id
  return Response({"region_id": region_id})

# Comment
class commentList(generics.ListCreateAPIView):
  queryset = Comment.objects.all()
  serializer_class = CommentSerializer

class commentDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Comment.objects.all()
  serializer_class = CommentSerializer
  lookup_field = 'id'

# Get comment by post id
@api_view(['GET'])
def getCommentByPostId(request, pk):
  post_obj = Post.objects.get(id = pk)
  comment_objs = Comment.objects.filter(post = post_obj)

  res_data = [{"id": item.id, "created_by": item.created_by.username, "comment_text": item.comment_text, 
  "created_at": item.created_at} 
  for item in comment_objs]

  print('----------------------------------')
  print(res_data)

  return Response(res_data)

# Create multiple region
@api_view(['GET', 'POST'])
def RegionMultipleCreate(request):
  if request.method == 'GET':
        return Response({"status":"create multiple region"})

  elif request.method == 'POST':
    serializer_data_list = []
    for item in request.data['items']:
      code = item['code']
      region_name = item['region_name']
      region_description = item['region_description']
      color_code = item['color_code']
      
      try:
        region_obj = Region.objects.create(
          code = code,
          region_name = region_name,
          region_description = region_description,
          color_code = color_code
						)

        serializer = RegionSerializer(region_obj)
        serializer_data_list.append(serializer.data)
      except:
        pass

    return Response(serializer_data_list)

  return Response("testing...")
