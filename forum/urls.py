from django.urls import path
from . import views

urlpatterns = [
  # FORUM POST
  path('user-list/', views.userList.as_view(), name="user-list"),
  path('user-detail/<id>/', views.userDetail.as_view(), name="user-detail"),

  # FORUM POST
  path('post-list/', views.forumPostList.as_view(), name="forum-post-list"),
  path('post-detail/<id>/', views.forumPostDetail.as_view(), name="forum-post-detail"),
  path('retrieve-last-five-posts/', views.retrieveLastFiveForumPost),
  # REGION
  path('region-list/', views.regionList.as_view(), name="region-list"),
  path('region-detail/<id>/', views.regionDetail.as_view(), name="region-detail"),
  path('region-multiple-create/', views.RegionMultipleCreate),
  path('region-id-retrieve/<str:region_code>/', views.RegionIdRetrieve),

  # COMMENT
  path('comment-list/', views.commentList.as_view(), name="comment-list"),
  path('comment-detail/<id>/', views.commentDetail.as_view(), name="comment-detail"),
  path('get-comment-by-post-id/<str:pk>/', views.getCommentByPostId),
]