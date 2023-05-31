from ast import Or
from turtle import title
import json
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status

from rest_framework import generics
from django.db.models import Sum, Q, Count
from rest_framework.parsers import MultiPartParser, FormParser


from rest_framework.decorators import authentication_classes
from rest_framework.decorators import permission_classes
from rest_framework.authentication import TokenAuthentication

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from api.permissions import IsOwnerOrReadOnly, AuthorAllStaffAllButEditOrReadOnly

from rest_framework.decorators import api_view, permission_classes, APIView
from rest_framework.response import Response
from .serializers import RealEstatePostSerializer, RegionSerializer, UserSerializer, CommentSerializer, ConfigSerializer, RealEstatePost2Serializer, SpecSerializer, WatchList, WatchlistSerializer

from django.contrib.auth.models import User
from .models import ExtendedUserInfomation, RealEstatePost, Region, Comment, RealEstatePost2, Config, SimilarRealestatePostList, SpecDetail, Image, Video, WatchList, ReportedRealestateList

from rest_framework.pagination import LimitOffsetPagination

from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
import django_filters.rest_framework
from .realestate_filters import RealestateFilter

# NEW
# import joblib
# import pandas as pd
from .recommender import Recommender
# from sklearn.preprocessing import MinMaxScaler


# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'Login': '/login/',
		'Refesh token': '/refresh-token/',
		'-------------':'-------------------------------------------------------',
		'List user': '/user-list/',
		'Create user': '/user-create/',
		'Detail user': '/user-detail/<str:pk>/',
		'Update user': '/user-update/<str:pk>/',
		'Delete user': '/user-delete/<str:pk>/',
		'-------------':'-------------------------------------------------------',
		'List region': '/region-list/',
		'Create region': '/region-create/',
		'Detail region': '/region-detail/<str:pk>/',
		'Update region': '/region-update/<str:pk>/',
		'Delete region': '/region-delete/<str:pk>/',
		'-------------':'-------------------------------------------------------',
		'List All and Create realestate post': '/re-post2-list-create/',
		'Retrieve, Update and Delete a realestate post': '/re-post2-retrieve-update-delete/<id>/',
		'Create multiple post at one by json.data': '/re-post2-multiple-create/',
		'Update field similar-post of all realestate post': '/re-post2-similar-post-update/',
		'Create multiple post at one include similar post': 're-post2-retrieve-update-delete/<id>/',
		'Report a realestate post': '/re-post2-report/<str:pk>/',
		'-------------':'-------------------------------------------------------',
		'List comment': '/comment-list/',
		'Create comment': '/comment-create/',
		'Detail comment': '/comment-detail/<str:pk>/',
		'Update comment': '/comment-update/<str:pk>/',
		'Delete comment': '/comment-delete/<str:pk>/',
		
		}

	return Response(api_urls)

# Testing...
class userListTest(generics.ListAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	filter_backends = [SearchFilter]
	search_fields = ['username']

# User
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userList(request):
	users = User.objects.all().order_by('-id')
	serializer = UserSerializer(users, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def userDetail(request, pk):
	user = User.objects.get(id=pk)
	serializer = UserSerializer(user, many=False)
	return Response(serializer.data)

@api_view(['POST'])
def userCreate(request):
	serializer = UserSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
	
	return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def userUpdate(request, pk):
	user = User.objects.get(id=pk)
	serializer = UserSerializer(instance=user, data=request.data)

	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)

	return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def userDelete(request, pk):
	user = User.objects.get(id = pk)
	
	user.delete()

	return Response('User successfully delete!')

#Extended User Infomation
@api_view(['GET', 'PUT'])
def userAndExtendedInfomation(request, pk):
	if request.method == 'GET':
				user_obj = User.objects.filter(id = pk)
				user_obj_dict = user_obj.values().first()
				try:
					eui_obj = ExtendedUserInfomation.objects.filter(user = user_obj[0])
					eui_obj_dict = eui_obj.values().first()
					if eui_obj_dict is None:
						raise TypeError
				except:
					eui_obj = ExtendedUserInfomation.objects.create(user = user_obj[0], phone = "", address_line1 = "", address_line2 = "", post_code = "")
					eui_obj_dict = ExtendedUserInfomation.objects.filter(id = eui_obj.id).values().first()

				return Response({**user_obj_dict, **eui_obj_dict})

	if request.method == 'PUT':
				user_obj = User.objects.get(id = pk)
				eui_obj = ExtendedUserInfomation.objects.get(user = user_obj)
				if "first_name" in request.data:
					first_name = request.data['first_name']
					user_obj.first_name = first_name

				if "last_name" in request.data:
					last_name = request.data['last_name']
					user_obj.last_name = last_name

				if "phone" in request.data:
					phone = request.data['phone']
					eui_obj.phone = phone

				if "address_line1" in request.data:
					address_line1 = request.data['address_line1']
					eui_obj.address_line1 = address_line1

				if "address_line2" in request.data:
					address_line2 = request.data['address_line2']
					eui_obj.address_line2 = address_line2

				if "post_code" in request.data:
					post_code = request.data['post_code']
					eui_obj.post_code = post_code
				
				user_obj.save()
				eui_obj.save()

				user_obj_dict = User.objects.filter(id = user_obj.id).values().first()
				eui_obj_dict = ExtendedUserInfomation.objects.filter(user = user_obj).values().first()

				return Response({**user_obj_dict, **eui_obj_dict})
				
				
				

		

#ADMIN
@api_view(['GET'])
def getUserQuantity(request):
	user_quantity = User.objects.count()
	return Response({"quantity": user_quantity})

@api_view(['GET'])
def getRealestatePostQuantity(request):
	post_quantity = RealEstatePost2.objects.count()
	return Response({"post_quantity": post_quantity})

@api_view(['GET'])
def getTotalArea(request):
	total_area = SpecDetail.objects.aggregate(Sum('area'))
	return Response(total_area)

@api_view(['GET'])
def getTotalMoney(request):
	total_money = RealEstatePost2.objects.aggregate(Sum('total_price'))
	return Response(total_money)

@api_view(['GET'])
def getLastFiveUsers(request):
	last_five_users = User.objects.filter(~Q(username = "admin")).order_by('-id')[:5][::-1]
	return Response({"last_five_users": [user.username for user in last_five_users]})

@api_view(['GET'])
def getLastFiveRealestateDetail(request):
	last_five_realestate = RealEstatePost2.objects.filter().order_by('-id')[:5][::-1]
	# list = [image for image in Image.objects.filter(real_estate_post2s__in = last_five_realestate[0].id)]
	image_obj = Image.objects.filter(real_estate_post2s__in = last_five_realestate)
	last_five_realestate_detail = [{"title": item.title,"created_at": item.created_at, "total_price": item.total_price,
	} for item in last_five_realestate]
	for i in range(0, len(image_obj)):
		last_five_realestate_detail[i]["image_1"] = str(image_obj[i].image_1)
	return Response({"items": last_five_realestate_detail})

@api_view(['GET'])
def getUserInfomationList(request):
	infomation_users_obj = User.objects.annotate(post_count=Count('real_estate_post2s')).filter(~Q(username = "admin")).order_by('-id')
	
	data = [{"id" :item.id, "username": item.username, "email": item.email, "realestate_quantity": item.post_count
	} for item in infomation_users_obj]
	return Response({"items": data})

@api_view(['GET'])
def getRealestateInfomationList(request):
	# infomation_users_obj = User.objects.annotate(post_count=Count('real_estate_post2s')).filter(~Q(username = "admin")).order_by('-id')
	# data1 = [{"id" :item.id, "username": item.username, "email": item.email, "realestate_quantity": item.post_count
	# } for item in infomation_users_obj]

	infomation_realestates_obj = RealEstatePost2.objects.all().order_by('-created_at')
	data = [{"id": item.id, "title": item.title,"img": str(item.images.image_1),"total_price": item.total_price, "region": item.region.region_name, "username": item.created_by.username, 
	"similar_posts": [item.similar_posts.postId_1, item.similar_posts.postId_2, item.similar_posts.postId_3, item.similar_posts.postId_4, item.similar_posts.postId_5]} 
	for item in infomation_realestates_obj]
	
	return Response({"items": data})

@api_view(['GET', 'POST'])
def getReportedRealestateInfomationList(request):
	if request.method == 'POST':
		try:
			reported_list_str = request.data["reported_list_str"]
			reported_list_arr = reported_list_str.split()
			infomation_realestates_obj = RealEstatePost2.objects.filter(pk__in = reported_list_arr)
			data = [{"id": item.id, "title": item.title,"img": str(item.images.image_1),"total_price": item.total_price, "region": item.region.region_name, "username": item.created_by.username, 
			"similar_posts": [item.similar_posts.postId_1, item.similar_posts.postId_2, item.similar_posts.postId_3, item.similar_posts.postId_4, item.similar_posts.postId_5]} 
			for item in infomation_realestates_obj]
			
			return Response({"items": data})
		except:
			return Response({"items": None})
	if request.method == 'GET':
		return Response("This api use to get list of infomation of reported realestate!")
@api_view(['GET'])
def getDetailInfomationUser(request, pk):
	detail_infomation_user_obj = User.objects.annotate(post_count=Count('real_estate_post2s')).get(id = pk)
	
	data = {"id" :detail_infomation_user_obj.id, "username": detail_infomation_user_obj.username,
	"is_active": detail_infomation_user_obj.is_active,
	"first_name": detail_infomation_user_obj.first_name, "last_name": detail_infomation_user_obj.last_name,
	 "email": detail_infomation_user_obj.email, "date_joined": detail_infomation_user_obj.date_joined,
	 "is_staff": detail_infomation_user_obj.is_staff, "realestate_quantity": detail_infomation_user_obj.post_count,
	}
	return Response(data)

@api_view(['GET', 'POST'])
def RealesatePostCreateWithCustomization(request):
	if request.method == 'GET':
		return Response("This api use for create realestate with recomendation system!")
	if request.method == 'POST':
		region_data = request.data["region"]
		created_by_data = request.data["created_by"]
		# similar_posts = request.data[""]
		title_data = request.data["title"]
		description_data = request.data["description"]
		address_data = request.data["address"]
		phone_data = request.data["phone"]
		# images_data = request.data["images"]
		
		# new
		area_data = request.data["area"]
		price_data = request.data["price"]
		if price_data[0] == "0" or price_data == "Thỏa thuận":
			spec_price_data = "Thỏa thuận"
			total_price_data = 0.0
		else:
			spec_price_data = price_data
			price_split_arr = price_data.split()
			if price_split_arr[1] == "tỷ":
				total_price_data = float(price_split_arr[0])
			elif price_split_arr[1] == "triệu":
				total_price_data = float(price_split_arr[0]) / 1000
			elif price_split_arr[1] == "tỷ/m2":
				total_price_data = float(price_split_arr[0]) * float(area_data)
			elif price_split_arr[1] == "triệu/m2":
				total_price_data = float(price_split_arr[0]) * float(area_data) / 1000
			elif price_split_arr[1] == "nghìn/m2":
				total_price_data = float(price_split_arr[0]) * float(area_data) / 1000000
			else:
				total_price_data = 0.0
		# new
		print("--------------------------------------------------------------------")
		print(spec_price_data)
		print(total_price_data)
		print("--------------------------------------------------------------------")
		# total_price_data = request.data["price"]
		# total_price_data = float(total_price_data) / 1000000000
		# area_data = request.data["area"]

		mat_tien_data = request.data["mat_tien"]
		huong_nha_data = request.data["huong_nha"]
		duong_vao_data = request.data["duong_vao"]
		toilet_number_data = request.data["toilet_number"]
		bedroom_number_data = request.data["bedroom_number"]
		phap_ly_data = request.data["phap_ly"]
		# phone = request.data["phone"]
		# For IMGs URL
		try:
			image_1_data = request.data["image_1"]
		except:
			image_1_data = None
		try:
			image_2_data = request.data["image_2"]
		except:
			image_2_data = None
		try:
			image_3_data = request.data["image_3"]
		except:
			image_3_data = None
		try:
			image_4_data = request.data["image_4"]
		except:
			image_4_data = None
		try:
			image_5_data = request.data["image_5"]
		except:
			image_5_data = None
		try:
			image_6_data = request.data["image_6"]
		except:
			image_6_data = None
		try:
			image_7_data = request.data["image_7"]
		except:
			image_7_data = None
		try:
			image_8_data = request.data["image_8"]
		except:
			image_8_data = None
		try:
			image_9_data = request.data["image_9"]
		except:
			image_9_data = None
		try:
			image_10_data = request.data["image_10"]
		except:
			image_10_data = None

		# Videos
		try:
			video_1_data = request.data["video_1"]
		except:
			video_1_data = None
		try:
			video_2_data = request.data["video_2"]
		except:
			video_2_data = None
		try:
			video_3_data = request.data["video_3"]
		except:
			video_3_data = None
		try:
			video_4_data = request.data["video_4"]
		except:
			video_4_data = None
		try:
			video_5_data = request.data["video_5"]
		except:
			video_5_data = None
		
		print('----------------------------------------')
		print(image_1_data)
		print('----------------------------------------')
		print(video_1_data)
		print('----------------------------------------')

		# TESTING...
		# For create instances
		region_obj = Region.objects.get(region_name = region_data) #region instance
		created_by_obj = User.objects.get(username = created_by_data) #user instance
		# For similar_posts instance
		# Scaler
		# scaler = joblib.load("F:/Workspace/Django/real_estate/api/MinMaxScalerModel.gz")

		# data1 and data2
		data_1 = {"id": 1010101 ,"region": region_data, "area": float(area_data), "price": spec_price_data, "mat_tien": float(mat_tien_data), 
		"huong_nha": huong_nha_data, "duong_vao": float(duong_vao_data), "bedroom_number": int(bedroom_number_data), 
		"toilet_number": int(toilet_number_data), "phap_ly": phap_ly_data}
		print('-------------------------------------------------------------------------------')
		print(data_1)
		print('-------------------------------------------------------------------------------')
		

		# data_1 = {"id": 1010101,
		# 				"region": "Bảo Lộc",
		#         "area": 260,
		#         "price": "1 triệu/m2",	
		#         "mat_tien": 15,
		#         "huong_nha": "Nam",
		#         "duong_vao": 9,
		#         "bedroom_number": 0,
		#         "toilet_number": 0,
		#         "phap_ly": "Sổ đỏ/ Sổ hồng"}

		all_realestate_obj = RealEstatePost2.objects.all()
		data_2 = [{"id": item.id, "region": item.region.region_name, "area": item.spec_detail.area,
		"price": item.spec_detail.price, "mat_tien": item.spec_detail.mat_tien, "huong_nha": item.spec_detail.huong_nha,
		"duong_vao": item.spec_detail.duong_vao, "bedroom_number": item.spec_detail.bedroom_number, 
		"toilet_number": item.spec_detail.toilet_number, "phap_ly": item.spec_detail.phap_ly} for item in all_realestate_obj]
		# print('-----------------------------------------------------------------')
		# print(data_2)
		# print('-----------------------------------------------------------------')
		
		
		# print('---------------data2-----------------------')
		# print(data_2)

		# similar instance
		similar = Recommender(user_data=data_1, database=data_2)
		similar_id_list = similar.get_recommended()
		print('-------------------------------------------------------------------------------')
		print(similar_id_list)
		print('-------------------------------------------------------------------------------')
		# similar_posts_obj = similar_posts


		# image instance
		image_list_obj = Image.objects.create(image_1 = image_1_data,image_2 = image_2_data,image_3 = image_3_data,
		image_4 = image_4_data,image_5 = image_5_data,image_6 = image_6_data,image_7 = image_7_data,
		image_8 = image_8_data,image_9 = image_9_data,image_10 = image_10_data)

		# video instance
		video_list_obj = Video.objects.create(video_1 = video_1_data, video_2 = video_2_data, video_3 = video_3_data,
		video_4 = video_4_data, video_5 = video_5_data)

		# spec instance
		try:
			area_data = float(area_data)
		except:
			area_data = 0.0
		try:
			mat_tien_data = float(mat_tien_data)
		except:
			mat_tien_data = 0.0
		try:
			duong_vao_data = float(duong_vao_data)
		except:
			duong_vao_data = 0.0
		try:
			toilet_number_data = float(toilet_number_data)
		except:
			toilet_number_data = 0
		try:
			bedroom_number_data = float(bedroom_number_data)
		except:
			bedroom_number_data = 0

		spec_detail_obj = SpecDetail.objects.create(area = area_data, price = spec_price_data, mat_tien = mat_tien_data, huong_nha = huong_nha_data,
		duong_vao = duong_vao_data, toilet_number = toilet_number_data, bedroom_number = bedroom_number_data,
		phap_ly = phap_ly_data)

		# Similar Post
		# similar_obj = SimilarRealestatePostList.objects.create(postId_1=0, postId_2=0,postId_3=0,postId_4=0,postId_5=0)
		similar_obj = SimilarRealestatePostList.objects.create(postId_1=similar_id_list[0], postId_2=similar_id_list[1]
		,postId_3=similar_id_list[2],postId_4=similar_id_list[3],postId_5=similar_id_list[4])
		# Realestate2 instance
		try:
			realestate_obj = RealEstatePost2.objects.create(region = region_obj, created_by = created_by_obj,
			images=image_list_obj, videos = video_list_obj, title=title_data, description = description_data, address = address_data,phone = phone_data,
			total_price = total_price_data, spec_detail = spec_detail_obj, similar_posts = similar_obj)
			status = "success"
		except:
			status = "Error"
		
		if status == "success":
			return Response({"status": status, "post_data": {"id": realestate_obj.id}})
		
		return Response({"status": "success"})

# newtest68
@api_view(['GET', 'PUT'])
def RealesatePostUpdateWithCustomization(request, pk):
	if request.method == 'PUT':
		region_data = request.data["region"]
		# similar_posts = request.data[""]
		title_data = request.data["title"]
		description_data = request.data["description"]
		address_data = request.data["address"]
		phone_data = request.data["phone"]
		# images_data = request.data["images"]
		# total_price_data = request.data["price"]
		# total_price_data = float(total_price_data) / 1000000000

		# NEW
		# new
		area_data = request.data["area"]
		price_data = request.data["price"]
		if price_data[0] == "0" or price_data == "Thỏa thuận":
			spec_price_data = "Thỏa thuận"
			total_price_data = 0.0
		else:
			spec_price_data = price_data
			price_split_arr = price_data.split()
			if price_split_arr[1] == "tỷ":
				total_price_data = float(price_split_arr[0])
			elif price_split_arr[1] == "triệu":
				total_price_data = float(price_split_arr[0]) / 1000
			elif price_split_arr[1] == "tỷ/m2":
				total_price_data = float(price_split_arr[0]) * float(area_data)
			elif price_split_arr[1] == "triệu/m2":
				total_price_data = float(price_split_arr[0]) * float(area_data) / 1000
			elif price_split_arr[1] == "nghìn/m2":
				total_price_data = float(price_split_arr[0]) * float(area_data) / 1000000
			else:
				total_price_data = 0.0
		# NEW

		spec_detail_id_data = request.data["spec_detail_id"]
		# area_data = request.data["area"]
		mat_tien_data = request.data["mat_tien"]
		huong_nha_data = request.data["huong_nha"]
		duong_vao_data = request.data["duong_vao"]
		toilet_number_data = request.data["toilet_number"]
		bedroom_number_data = request.data["bedroom_number"]
		phap_ly_data = request.data["phap_ly"]
		# phone = request.data["phone"]
		# For IMGs URL
		try:
			image_1_data = request.data["image_1"]
		except:
			image_1_data = None
		try:
			image_2_data = request.data["image_2"]
		except:
			image_2_data = None
		try:
			image_3_data = request.data["image_3"]
		except:
			image_3_data = None
		try:
			image_4_data = request.data["image_4"]
		except:
			image_4_data = None
		try:
			image_5_data = request.data["image_5"]
		except:
			image_5_data = None
		try:
			image_6_data = request.data["image_6"]
		except:
			image_6_data = None
		try:
			image_7_data = request.data["image_7"]
		except:
			image_7_data = None
		try:
			image_8_data = request.data["image_8"]
		except:
			image_8_data = None
		try:
			image_9_data = request.data["image_9"]
		except:
			image_9_data = None
		try:
			image_10_data = request.data["image_10"]
		except:
			image_10_data = None

		# For create instances
		region_obj = Region.objects.get(region_name = region_data) #region instance

		# image instance
		# image_list_obj = Image.objects.create(image_1 = image_1_data,image_2 = image_2_data,image_3 = image_3_data,
		# image_4 = image_4_data,image_5 = image_5_data,image_6 = image_6_data,image_7 = image_7_data,
		# image_8 = image_8_data,image_9 = image_9_data,image_10 = image_10_data)
		# spec instance
		try:
			area_data = float(area_data)
		except:
			area_data = 0.0
		try:
			mat_tien_data = float(mat_tien_data)
		except:
			mat_tien_data = 0.0
		try:
			duong_vao_data = float(duong_vao_data)
		except:
			duong_vao_data = 0.0
		try:
			toilet_number_data = float(toilet_number_data)
		except:
			toilet_number_data = 0
		try:
			bedroom_number_data = float(bedroom_number_data)
		except:
			bedroom_number_data = 0

		spec_detail_obj = SpecDetail.objects.get(id = spec_detail_id_data)
		spec_detail_obj.area = area_data
		spec_detail_obj.price = spec_price_data
		spec_detail_obj.mat_tien = mat_tien_data
		spec_detail_obj.huong_nha = huong_nha_data
		spec_detail_obj.duong_vao = duong_vao_data
		spec_detail_obj.toilet_number = toilet_number_data
		spec_detail_obj.bedroom_number = bedroom_number_data
		spec_detail_obj.phap_ly = phap_ly_data
		spec_detail_obj.save()
		# spec_detail_obj = SpecDetail.objects.create(area = area_data, mat_tien = mat_tien_data, huong_nha = huong_nha_data,
		# duong_vao = duong_vao_data, toilet_number = toilet_number_data, bedroom_number = bedroom_number_data,
		# phap_ly = phap_ly_data)

		# Similar Post
		similar_obj = SimilarRealestatePostList.objects.create(postId_1=0, postId_2=0,postId_3=0,postId_4=0,postId_5=0)
		# Realestate2 instance
		try:
			realestate_obj_tmp = RealEstatePost2.objects.get(id = pk)
			realestate_obj_tmp.region = region_obj
			# realestate_obj_tmp.images = image_list_obj
			realestate_obj_tmp.title = title_data
			realestate_obj_tmp.description = description_data
			realestate_obj_tmp.address = address_data
			realestate_obj_tmp.phone = phone_data
			realestate_obj_tmp.total_price = total_price_data
			realestate_obj_tmp.spec_detail = spec_detail_obj
			realestate_obj_tmp.similar_posts = similar_obj
			realestate_obj_tmp.save()
			status = "success"
		except:
			status = "Error"
		
		if status == "success":
			return Response({"status": status, "post_data": {"id": realestate_obj_tmp.id}})
		
		return Response({"status": "success"})
	return Response({"status": "success"})
		
# newtest68

@api_view(['GET', 'POST'])
def getAndCreateWatchList(request):
	if request.method == 'POST':
		print(request.data)

	return {"message": "success"}




@api_view(['GET'])
def getRealestateByRegion(request):
	baoloc_post_quantity = RealEstatePost2.objects.filter(region__region_name = "Bảo Lộc").count()
	json_baoloc = {"region": "Bảo Lộc", "realestate_quantity": baoloc_post_quantity}

	dalat_post_quantity = RealEstatePost2.objects.filter(region__region_name = "Đà Lạt").count()
	json_dalat = {"region": "Đà Lạt", "realestate_quantity": dalat_post_quantity}

	cattien_post_quantity = RealEstatePost2.objects.filter(region__region_name = "Cát Tiên").count()
	json_cattien = {"region": "Cát Tiên", "realestate_quantity": cattien_post_quantity}

	dateh_post_quantity = RealEstatePost2.objects.filter(region__region_name = "Đà Tẻh").count()
	json_dateh = {"region": "Đà Tẻh", "realestate_quantity": dateh_post_quantity}

	lamha_post_quantity = RealEstatePost2.objects.filter(region__region_name = "Lâm Hà").count()
	json_lamha = {"region": "Lâm Hà", "realestate_quantity": lamha_post_quantity}

	donduong_post_quantity = RealEstatePost2.objects.filter(region__region_name = "Đơn Dương").count()
	json_donduong = {"region": "Đơn Dương", "realestate_quantity": donduong_post_quantity}

	dilinh_post_quantity = RealEstatePost2.objects.filter(region__region_name = "Di Linh").count()
	json_dilinh = {"region": "Di Linh", "realestate_quantity": dilinh_post_quantity}

	dahuoai_post_quantity = RealEstatePost2.objects.filter(region__region_name = "Đạ Huoai").count()
	json_dahuoai = {"region": "Đạ Huoai", "realestate_quantity": dahuoai_post_quantity}

	ductrong_post_quantity = RealEstatePost2.objects.filter(region__region_name = "Đức Trọng").count()
	json_ductrong = {"region": "Đức Trọng", "realestate_quantity": ductrong_post_quantity}

	baolam_post_quantity = RealEstatePost2.objects.filter(region__region_name = "Bảo Lâm").count()
	json_baolam = {"region": "Bảo Lâm", "realestate_quantity": baolam_post_quantity}
	
	lacduong_post_quantity = RealEstatePost2.objects.filter(region__region_name = "Lạc Dương").count()
	json_lacduong = {"region": "Lạc Dương", "realestate_quantity": lacduong_post_quantity}
	return Response({"items": [json_cattien, json_dateh, json_baoloc, json_dahuoai, json_dilinh, json_ductrong,
	json_baolam, json_lacduong, json_dalat, json_lamha, json_donduong]})


# Region
@api_view(['POST'])
def regionCreate(request):
	serializer = RegionSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
	
	return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def regionList(request):
	regions = Region.objects.all().order_by('-id')
	serializer = RegionSerializer(regions, many = True)
	
	return Response(serializer.data)



@api_view(['GET'])
def regionListPagination(request):
	paginator = LimitOffsetPagination()
	# paginator.page_size = 2

	regions = Region.objects.all().order_by('-id')
	result_page = paginator.paginate_queryset(regions, request)

	serializer = RegionSerializer(result_page, many=True)


	return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def regionDetail(request, pk):
	region = Region.objects.get(id = pk)
	serializer = RegionSerializer(region, many = False)
	
	return Response(serializer.data)

@api_view(['POST'])
def regionUpdate(request, pk):
	region = Region.objects.get(id = pk)
	serializer = RegionSerializer(instance = region, data = request.data)

	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
	
	return Response(data = serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def regionDelete(request, pk):
	region = Region.objects.get(id = pk)
	region.delete()

	return Response('Region is successfully delete')

# Real Estate post
# @api_view(['GET'])
# @permission_classes([IsAuthenticatedOrReadOnly])
# def realEstatePostList(request):
# 	realEstatePosts = RealEstatePost.objects.all().order_by('-id')
# 	serializer = RealEstatePostSerializer(realEstatePosts, many=True)
# 	return Response(serializer.data)

class realEstatePostList(generics.ListAPIView):
	queryset = RealEstatePost.objects.all()
	serializer_class = RealEstatePostSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticatedOrReadOnly,)


	# filter_backends = [SearchFilter]

	# customized filter class
	filterset_class = RealestateFilter
	filter_backends = [SearchFilter, django_filters.rest_framework.DjangoFilterBackend]
	# search_fields = ('^title',)


	# filterset_fields = ['is_legal']
	search_fields = ['title']

@api_view(['GET'])
def realEstatePostListPagination(request):
	paginator = LimitOffsetPagination()
	realestate_posts = RealEstatePost.objects.all().order_by('-id')
	result_page = paginator.paginate_queryset(realestate_posts, request)

	serializer = RealEstatePostSerializer(result_page, many=True)

	return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def regionListPagination(request):
	paginator = LimitOffsetPagination()
	# paginator.page_size = 2

	regions = Region.objects.all().order_by('-id')
	result_page = paginator.paginate_queryset(regions, request)

	serializer = RegionSerializer(result_page, many=True)


	return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def realEstatePostDetail(request, pk):
	realEstatePosts = RealEstatePost.objects.get(id=pk)
	serializer = RealEstatePostSerializer(realEstatePosts, many=False)
	return Response(serializer.data)


@api_view(['POST'])
def realEstatePostCreate(request):
	serializer = RealEstatePostSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
	else:
		return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def realEstatePostCreateForTest(request, quantity):

	first = int(RealEstatePost.objects.latest('id').id) + 1

	last = first + int(quantity)

	title = request.data['title']

	for i in range(first, last):
		request.data['title'] = title + " " + str(i)
		serializer = RealEstatePostSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()

	return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def realEstatePostUpdate(request, pk):
	realestatePost = RealEstatePost.objects.get(id=pk)
	serializer = RealEstatePostSerializer(instance=realestatePost, data=request.data)

	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)

	return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def realEstatePostDelete(request, pk):
	realEstatePost = RealEstatePost.objects.get(id=pk)
	realEstatePost.delete()

	return Response('Real estate post successfully delete!')

@api_view(['DELETE'])
def realEstatePostDeleteAll(request):
	realEstatePosts = RealEstatePost.objects.all()
	realEstatePosts.delete()

	return Response('All of real estate posts succsesfully delete!')

# For admin report real estate post
@api_view(['POST'])
def realEstatePostReport(request, pk):
	realEstatePost = RealEstatePost.objects.get(id=pk)
	realEstatePost.rank = realEstatePost.rank - 1
	realEstatePost.save()

	return Response('Real estate post successfully report')

#COMMENT
@api_view(['POST'])
def commentCreate(request):
	serializer = CommentSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
	
	return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def commentList(request):
	comments = Comment.objects.all().order_by('-id')
	serializer = CommentSerializer(comments, many=True)
	return Response(serializer.data)

# Testing...
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getComments(request):
	user = request.user
	comments = user.comments.all().order_by('-id')
	serializer = CommentSerializer(comments, many=True)
	return Response(serializer.data)


@api_view(['GET'])
def commentDetail(request, pk):
	comment = Comment.objects.get(id = pk)
	serializer = RegionSerializer(comment, many = False)
	
	return Response(serializer.data)

@api_view(['POST'])
def commentUpdate(request, pk):
	comment = Comment.objects.get(id = pk)
	serializer = CommentSerializer(instance = comment, data = request.data)

	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
	
	return Response(data = serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def commentDelete(request, pk):
	comment = Comment.objects.get(id = pk)
	comment.delete()

	return Response('Comment is successfully delete')

#/////////////////////////////////////

#Config
@api_view(['POST'])
def configCreate(request):
	serializer = ConfigSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data)
	
	return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def configList(request):
	configs = Config.objects.all().order_by('-id')
	serializer = ConfigSerializer(configs, many=True)
	return Response(serializer.data)

#SpecDetail
class SpecListCreate(generics.ListCreateAPIView):
	queryset = SpecDetail.objects.all()
	serializer_class = SpecSerializer


class SpecRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
	queryset = SpecDetail.objects.all()
	serializer_class = SpecSerializer
	lookup_field = 'id'

# Realestate Post 2
class realestatePost2ListCreate(generics.ListCreateAPIView):
	queryset = RealEstatePost2.objects.all().order_by('-rank', '-created_at')
	serializer_class = RealEstatePost2Serializer

	filter_backends = [SearchFilter, DjangoFilterBackend]
	filterset_class = RealestateFilter
	search_fields = ['title', 'description']



class realestatePost2RetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
	queryset = RealEstatePost2.objects.all()
	serializer_class = RealEstatePost2Serializer

	lookup_field = 'id'

class realestatePost2List(generics.ListAPIView):
	queryset = RealEstatePost2.objects.all()
	serializer_class = RealEstatePost2Serializer

	filter_backends = [SearchFilter]
	search_fields = ['title']

@api_view(['GET'])
def realEstatePost2Detail(request, pk):
	realEstatePost2 = RealEstatePost2.objects.get(id=pk)
	serializer = RealEstatePost2Serializer(realEstatePost2, many=False)
	return Response(serializer.data)

#asdasdasdas
def getUser(phone):
	if not User.objects.filter(username=phone).exists():
		user = User.objects.create_user(username=phone,
			email=phone,
			password='123456')
	else:
		user = User.objects.get(username = phone)

	return user

def getRegion(region_name):
	if not Region.objects.filter(region_name=region_name).exists():
		region = Region.objects.create(region_name=region_name)
	else:
		region = Region.objects.get(region_name = region_name)
	return region

def getImages(imgs):
	urls = ["" for i in range(0, 10)]
	for i in range(0, 10):
		if(i < len(imgs)):
			urls[i] = imgs[i]
	
	images = Image.objects.create(image_1=urls[0],image_2=urls[1],image_3=urls[2],image_4=urls[3],image_5=urls[4]
	,image_6=urls[5],image_7=urls[6],image_8=urls[7],image_9=urls[8],image_10=urls[9])
	
	return images

def getSpecDetail(spec_detail):
	area = 0.0
	price = ""
	mat_tien = 0.0
	duong_vao = 0.0
	huong_nha = ""
	bedroom_number = 0
	toilet_number = 0
	phap_ly = ""

	if "Diện tích" in spec_detail:
		area = spec_detail["Diện tích"].split()[0]
		try:
			area = float(area)
		except:
			area = 0.0
	

	if "Mức giá" in spec_detail:
		price = spec_detail["Mức giá"]
		

	if "Mặt tiền" in spec_detail:
		mat_tien = spec_detail["Mặt tiền"].split()[0]
		try:
			mat_tien = float(mat_tien)
		except:
			mat_tien = 0.0

	if "Đường vào" in spec_detail:
		duong_vao = spec_detail["Đường vào"].split()[0]
		try:
			duong_vao = float(duong_vao)
		except:
			duong_vao = 0.0

	if "Hướng nhà" in spec_detail:
		huong_nha = spec_detail["Hướng nhà"]

	
	if "Số phòng ngủ" in spec_detail:
		bedroom_number = spec_detail["Số phòng ngủ"].split()[0]
		try:
			bedroom_number = int(bedroom_number)
		except:
			bedroom_number = 0
	
	if "Số toilet" in spec_detail:
		toilet_number = spec_detail["Số toilet"].split()[0] or "0"
		try:
			toilet_number = int(toilet_number)
		except:
			toilet_number = 0

	if "Pháp lý" in spec_detail:
		phap_ly = spec_detail["Pháp lý"]
	
	spec_detail = SpecDetail.objects.create(area = area, price = price, 
	mat_tien = mat_tien, duong_vao = duong_vao, huong_nha = huong_nha,
	bedroom_number = bedroom_number, toilet_number = toilet_number, phap_ly = phap_ly)

	return spec_detail

def getConfig(config):
	post_date = ""
	expiry_date = ""
	type_post = ""
	code_post = ""


	if "Ngày đăng" in config:
		post_date = config["Ngày đăng"]

	if "Ngày hết hạn" in config:
		expiry_date = config["Ngày hết hạn"]

	if "Loại tin" in config:
		type_post = config["Loại tin"]

	if "Mã tin" in config:
		code_post = config["Mã tin"]

	config = Config.objects.create(post_date = post_date, expiry_date=expiry_date, 
		type_post=type_post, code_post = code_post
	)

	return config

@api_view(['GET', 'POST'])
def realestatePost2s_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        return Response({"status":"create multiple realestate post"})

    elif request.method == 'POST':
					serializer_data_list = []
					for item in request.data['items']:
						print(item['title'])
						print('-----------------------------------')
						# user
						phone = item["phone"]
						user_obj = getUser(phone)
						# region
						region_name = item["region"]
						region_obj = getRegion(region_name)
						# title
						title = item["title"]
						# description
						description = item["description"]
						# address
						address = item["address"]
						# total_price
						total_price = item["total_price"]
						# imgs
						imgs = item["imgs"]
						imgs_obj = getImages(imgs)
						print(imgs_obj)
						# Spec Detail
						spec_detail = item["spec_detail"]
						spec_detail_obj = getSpecDetail(spec_detail)
						# config
						config = item["config"]
						config_obj = getConfig(config)

						
						real_estate_post2_obj = RealEstatePost2.objects.create(id = int(item["config"]["Mã tin"]) , created_by = user_obj,
							region = region_obj, total_price = total_price, images = imgs_obj, title = title, description = description, address = address, phone = phone, 
							spec_detail = spec_detail_obj, config = config_obj
						)
						
						serializer = RealEstatePost2Serializer(real_estate_post2_obj)
						serializer_data_list.append(serializer.data)


						
					return Response(serializer_data_list)

class realestatePost2Detail(generics.RetrieveUpdateDestroyAPIView):
  queryset = RealEstatePost2.objects.all()
  serializer_class = RealEstatePost2Serializer
  lookup_field = 'id'
	
@api_view(['GET', 'POST'])
def realestatePost2sCreateIncludeSimilarPost(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        return Response({"status":"create multiple realestate post"})

    elif request.method == 'POST':
					serializer_data_list = []
					for item in request.data['items']:
						print(item['title'])
						print('-----------------------------------')
						# user
						phone = item["phone"]
						user_obj = getUser(phone)
						# region
						region_name = item["region"]
						region_obj = getRegion(region_name)
						# title
						title = item["title"]
						# description
						description = item["description"]
						# address
						address = item["address"]
						# total_price
						total_price = item["total_price"]
						# imgs
						imgs = item["imgs"]
						imgs_obj = getImages(imgs)
						print(imgs_obj)
						# Spec Detail
						spec_detail = item["spec_detail"]
						spec_detail_obj = getSpecDetail(spec_detail)
						# config
						config = item["config"]
						config_obj = getConfig(config)
						# similar_posts
						similar_posts_obj = SimilarRealestatePostList.objects.create(
							postId_1 = item["similar_posts"][0], postId_2 = item["similar_posts"][1],
							postId_3 = item["similar_posts"][2],postId_4 = item["similar_posts"][3],
							postId_5 = item["similar_posts"][4])

						
						real_estate_post2_obj = RealEstatePost2.objects.create(id = int(item["config"]["Mã tin"]) , created_by = user_obj,
							region = region_obj, total_price = total_price, images = imgs_obj, title = title, description = description, address = address, phone = phone, 
							spec_detail = spec_detail_obj, config = config_obj, similar_posts = similar_posts_obj
						)
						
						# serializer = RealEstatePost2Serializer(real_estate_post2_obj)
						# serializer_data_list.append(serializer.data)

					return Response("Create multiple post include similar post successfully!")

@api_view(['POST'])
def realestatePost2s_similar_post_update(request):
	# serializer_data_list = []
	for item in request.data["items"]:
		print('-------------------------')
		print(item["code_post"])
		similar_posts_obj = SimilarRealestatePostList.objects.create(
			postId_1 = item["similar_posts"][0], postId_2 = item["similar_posts"][1],
			postId_3 = item["similar_posts"][2],postId_4 = item["similar_posts"][3],
			postId_5 = item["similar_posts"][4])
		realestate_post2_obj =  RealEstatePost2.objects.get(id = item["code_post"])
		realestate_post2_obj.similar_posts = similar_posts_obj
		realestate_post2_obj.save()
	
	return Response({"success": True})

# For report real estate post
@api_view(['POST'])
def realestatePost2Report(request, pk):
	realEstatePost2 = RealEstatePost2.objects.get(id=pk)
	realEstatePost2.rank = realEstatePost2.rank - 1
	realEstatePost2.save()

	return Response('Real estate post successfully report')

# For user report real estate post
@api_view(['GET', 'POST'])
def realEstatePost2ReportByUser(request):
	if request.method == "POST":
		try:
			reported_item = request.data["reported_item"]
		except Exception as e:
			print(e)
			reported_item = None

		try:
			reportedRealestateList_obj = ReportedRealestateList.objects.get(id = 1)
		except Exception as e:
			print(e)
			reportedRealestateList_obj = ReportedRealestateList.objects.create(id = 1)
		
		try:
			if reported_item != None: 
				reportedRealestateList_obj.reported_list_str = reportedRealestateList_obj.reported_list_str + " " + reported_item
				reportedRealestateList_obj.save()
		except Exception as e:
			print(e)
			return Response('Can not add this id into reported list!')
		return Response({"reported_list": reportedRealestateList_obj.reported_list_str})
	if request.method == "GET":
		return Response('This api for user report realestate post!')

# For get reported_list with id = 1
@api_view(['GET'])
def getReportedRealestateList(request):
	if request.method == "GET":
		try:
			reportedRealestateList_obj = ReportedRealestateList.objects.get(id = 1)
			return Response({'reported_list_str': reportedRealestateList_obj.reported_list_str})
		except Exception as e:
			print(e)
			reportedRealestateList_obj = ReportedRealestateList.objects.create(id = 1)
			return Response({'reported_list_str': reportedRealestateList_obj.reported_list_str})


# WatchList
class watchlistCreate(generics.ListCreateAPIView):
	queryset = WatchList.objects.all()
	serializer_class = WatchlistSerializer

class watchlistRetrieveUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
	queryset = WatchList.objects.all()
	serializer_class = WatchlistSerializer
	# lookup_field = 'owner__id'

@api_view(['GET', 'PUT'])
def getWatchlistAndDetailInfomationOfUser(request, pk):
	if request.method == "GET":
		user_obj = User.objects.get(id = pk)
		try:
			watchlist_obj = WatchList.objects.get(owner = user_obj)
		except:
			watchlist_obj = WatchList.objects.create(owner = user_obj)

		return Response({"id":user_obj.id,"username": user_obj.username, "is_superuser": user_obj.is_superuser,
		"first_name": user_obj.first_name,
    "last_name": user_obj.last_name,
		"email": user_obj.email,
    "is_staff": user_obj.is_staff,
    "is_active": user_obj.is_active,
    "date_joined": user_obj.date_joined,
		"watch_list": watchlist_obj.watchPostIdListString
		})

	if request.method == "PUT":
		user_obj = User.objects.get(id = pk)
		status = []
		try:
			user_obj.first_name = request.data["first_name"]
			user_obj.save()
			status.append("first_name is successfully updated")
		except:
			print("first_name is none")
		try:
			user_obj.last_name = request.data["last_name"]
			user_obj.save()
			status.append("last_name is successfully updated")
		except:
			print("last_name is none")
			
		try:
			watchlist_obj = WatchList.objects.get(owner = user_obj)
			watchlist_obj.watchPostIdListString = request.data["watch_list"]
			watchlist_obj.save()
			status.append("watch_list is successfully updated")
		except:
			print("watch_list is none")

		if len(status) == 0:
			return Response({"message": "No field update"})
		else:
			return Response({"message": status})

@api_view(['GET', 'POST'])
def getRealestatePostsByListId(request):
	if request.method =="GET":
		return Response({"message": "Provide postIds to get realestate list!"})
	if request.method == "POST":
		if "post_ids" in request.data:
			post_ids = [item for item in request.data["post_ids"]]
			realestate_objs = RealEstatePost2.objects.filter(id__in = post_ids)
			realestate_objs = [{"id": item.id, "title": item.title, 
			"address": item.address, "total_price": item.total_price, 
			"area": item.spec_detail.area, "image_1": str(item.images.image_1)} 
			for item in realestate_objs]
			return Response(realestate_objs)
	
	return Response({"message": "testing"})

@api_view(['GET'])
def getRealestatePostsByUserId(request, pk):
	if request.method == 'GET':
		owner_obj = User.objects.get(id = pk)
		realestate_post_objs = RealEstatePost2.objects.all().filter(created_by = owner_obj)
		realestate_post_objs_dict = realestate_post_objs.values()
		try:
			return Response([{**item} for item in realestate_post_objs_dict])
		except:
			return Response(
				{}
				)