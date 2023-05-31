from django.urls import path
from . import views
from django.conf.urls.static import static

from django.contrib.auth.models import User #testing...
from rest_framework.generics import ListAPIView
from .serializers import UserSerializer

from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
	path('', views.apiOverview, name="api-overview"),
	
	path('api-token-auth/', obtain_auth_token, name='api_token_auth'),

	# ACCESS AND REFESH TOKEN
	path('login/', jwt_views.TokenObtainPairView.as_view(), name='login'),
	path('refresh-token/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

	# USER
  path('user-list/', views.userList, name="user-list"),
	path('user-create/', views.userCreate, name="user-create"),
	path('user-detail/<str:pk>/', views.userDetail, name="user-detail"),
	path('user-update/<str:pk>/', views.userUpdate, name="user-update"),
	path('user-delete/<str:pk>/', views.userDelete, name="user-delete"),

	# USER EXTENDED INFORMATION
	path('get-extended-user-informartion/<str:pk>/', views.userAndExtendedInfomation),
	
	# path('user-list-test/', views.userListTest, name="user-list-test"),
	path('user-list-test/', views.userListTest.as_view(), name='user-list-test'),

	# FOR ADMIN ANALYTICS
	path('get-user-quantity/', views.getUserQuantity),
	path('get-realestatepost-quantity/', views.getRealestatePostQuantity),
	path('get-total-area/', views.getTotalArea),
	path('get-total-money/', views.getTotalMoney),
	path('get-realestate-by-region/', views.getRealestateByRegion),
	path('get-last-five-users/', views.getLastFiveUsers),
	path('get-last-five-realestate-detail/', views.getLastFiveRealestateDetail),
	path('get-infomation-users/', views.getUserInfomationList),
	path('get-infomation-realestates/', views.getRealestateInfomationList),
	path('get-infomation-reported-realestates/', views.getReportedRealestateInfomationList),
	path('get-detail-infomation-user/<str:pk>/', views.getDetailInfomationUser),
	

  # REGION
  path('region-list/', views.regionList, name="region-list"),
	path('region-create/', views.regionCreate, name="region-create"),
	path('region-detail/<str:pk>/', views.regionDetail, name="region-detail"),
	path('region-update/<str:pk>/', views.regionUpdate, name="region-update"),
	path('region-delete/<str:pk>/', views.regionDelete, name="region-delete"),


  # REALESTATE
	# path('re-post-list/', views.realEstatePostList, name="re-post-list"),
	path('re-post-list/', views.realEstatePostList.as_view(), name="re-post-list"),
	path('re-post-list-pagination/', views.realEstatePostListPagination, name="re-post-list-pagination"),
	path('re-post-detail/<str:pk>/', views.realEstatePostDetail, name="re-post-detail"),
	path('re-post-create/', views.realEstatePostCreate, name="re-post-create"),


	path('re-post-create-for-test/<str:quantity>/', views.realEstatePostCreateForTest, name="re-post-create-for-test"),

	path('re-post-update/<str:pk>/', views.realEstatePostUpdate, name="re-post-update"),
	path('re-post-delete/<str:pk>/', views.realEstatePostDelete, name="re-post-delete"),
	path('re-post-delete-all/', views.realEstatePostDeleteAll, name="re-post-delete-all"),

	path('re-post-report/<str:pk>/', views.realEstatePostReport, name="re-post-report"),

	path('get-realestate-by-user-id/<str:pk>/', views.getRealestatePostsByUserId),

	# NEW118
	path('re-post-report-by-user/<str:pk>/', views.realEstatePostReport, name="re-post-report"),
	# NEW118





	#COMMENT
	path('comment-list/', views.commentList, name="comment-list"),
	path('comment-create/', views.commentCreate, name="comment-create"),
	path('comment-detail/<str:pk>/', views.commentDetail, name="comment-detail"),
	path('comment-update/<str:pk>/', views.commentUpdate, name="comment-update"),
	path('comment-delete/<str:pk>/', views.commentDelete, name="comment-delete"),


	path('get-comments/', views.getComments, name="get-comments"),

	# 6/7/2022
	# CONFIG
	path('config-list/', views.configList, name="config-list"),
	path('config-create/', views.configCreate, name="config-create"),

	# CONFIG
	path('spec-list-create/', views.SpecListCreate.as_view()),
	path('spec-retrieve-update-delete/<id>/', views.SpecRetrieveUpdateDelete.as_view()),



	#REALESTATE POST 2
	path('re-post2-list-create/', views.realestatePost2ListCreate.as_view()),
	path('re-post2-retrieve-update-delete/<id>/', views.realestatePost2RetrieveUpdateDelete.as_view()),
	path('re-post2-multiple-create/', views.realestatePost2s_list),
	path('re-post2-similar-post-update/', views.realestatePost2s_similar_post_update),
	path('re-post2-multiple-create-include-similarpost/', views.realestatePost2sCreateIncludeSimilarPost),
	path('re-post2-report/<str:pk>/', views.realestatePost2Report),
	path('re-post2-report-by-user/', views.realEstatePost2ReportByUser),
	path('re-post2-report-list-retrieve/', views.getReportedRealestateList),
	path('re-post2-detail/<str:pk>/', views.realEstatePost2Detail),
	path('re-post2-customize-create/', views.RealesatePostCreateWithCustomization),

	path('re-post2-customize-update/<str:pk>/', views.RealesatePostUpdateWithCustomization),
	
	path('getRealestatePostsById/', views.getRealestatePostsByListId),

	path('get-realestate-by-user-id/<str:pk>/', views.getRealestatePostsByUserId),

	# WatchList
	path('watchlist-create/', views.watchlistCreate.as_view()),
	path('watchlist-retrieve-update-delete/<id>/', views.watchlistRetrieveUpdateDelete.as_view()),

	# User and Watchlist
	path('get-watchlist-and-detail-infomation-user/<str:pk>/', views.getWatchlistAndDetailInfomationOfUser),


	path('get-watchlist-and-detail-infomation-user/<str:pk>/', views.getWatchlistAndDetailInfomationOfUser),

]