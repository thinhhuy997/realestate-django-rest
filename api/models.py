from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from djongo import models

# Create your models here.

class Region(models.Model):
  region_name = models.CharField(max_length=100)
  region_description = models.CharField(max_length=255, null = True, blank = True)

  def __str__(self):
    return self.region_name



DIRECTIONS = [
        ('North', 'North'),
        ('East', 'East'),
        ('South', 'South'),
        ('West', 'West')
        ]
  
# lets us explicitly set upload path and filename
def upload_to(instance, filename):
  return 'images/realesate/{filename}'.format(filename=filename)

# lets us explicitly set upload path and filename
def video_upload_to(instance, filename):
  return 'videos/realesate/{filename}'.format(filename=filename)

class RealEstatePost(models.Model):
  region = models.ForeignKey(Region, related_name='real_estate_posts', on_delete=models.CASCADE, default=None)
  created_by = models.ForeignKey(User, related_name='real_estate_posts', on_delete=models.CASCADE, default=None)
  created_at = models.DateTimeField(auto_now_add=True)
  title = models.CharField(max_length=200)
  description = models.CharField(max_length=255)
  image_url = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True) # URL IMAGES
  contact_phone_number = models.CharField(max_length=12)
  area_by_m2 = models.CharField(max_length=10)              # by m2
  width_of_facade = models.IntegerField()                   # by meters
  width_of_road = models.IntegerField()                     # by meters
  direction = models.CharField(max_length=15, choices=DIRECTIONS)
  is_legal = models.BooleanField(default=False)
  price = models.CharField(max_length=10)                   # by milion .000.000đ
  rank = models.IntegerField(default=1)


  def __str__(self):
    return self.title

class Comment(models.Model):
  created_by = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE, default=None)
  realEstatePost = models.ForeignKey(RealEstatePost, related_name='comments', on_delete=models.CASCADE)
  comment_text = models.CharField(max_length=255)

  def __str__(self):
    return self.comment_text














# Model Config
class Config(models.Model):
  post_date = models.CharField(max_length=200)
  expiry_date = models.CharField(max_length=200)
  type_post = models.CharField(max_length=100)
  code_post = models.CharField(max_length=100)

  def __str__(self):
    return self.code_post

class SpecDetail(models.Model):
  area = models.FloatField(null=True, blank=True)
  price = models.CharField(max_length=100, null=True, blank=True)
  mat_tien = models.FloatField(null=True, blank=True)
  huong_nha = models.CharField(max_length=200, null=True, blank=True)
  duong_vao = models.FloatField(default=0.0)
  bedroom_number = models.IntegerField(null=True, blank=True)
  toilet_number = models.IntegerField(null=True, blank=True)
  phap_ly = models.CharField(max_length=200, null=True, blank=True)
  
  def __str__(self):
    return str(self.area) + "m2, " + str(self.price)  + "tỷ"

class Image(models.Model):
  image_1 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True)
  image_2 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True)
  image_3 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True)
  image_4 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True)
  image_5 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True)
  image_6 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True)
  image_7 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True)
  image_8 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True)
  image_9 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True)
  image_10 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True)

class Video(models.Model):
  video_1 = models.FileField(upload_to=video_upload_to, default=None, blank=True, null=True)
  video_2 = models.FileField(upload_to=video_upload_to, default=None, blank=True, null=True)
  video_3 = models.FileField(upload_to=video_upload_to, default=None, blank=True, null=True)
  video_4 = models.FileField(upload_to=video_upload_to, default=None, blank=True, null=True)
  video_5 = models.FileField(upload_to=video_upload_to, default=None, blank=True, null=True)


class SimilarRealestatePostList(models.Model):
  postId_1 = models.IntegerField()
  postId_2 = models.IntegerField()
  postId_3 = models.IntegerField()
  postId_4 = models.IntegerField()
  postId_5 = models.IntegerField()

class RealEstatePost2(models.Model):
  region = models.ForeignKey(Region, related_name='real_estate_post2s', on_delete=models.CASCADE, null=True, blank=True)
  created_by = models.ForeignKey(User, related_name='real_estate_post2s', on_delete=models.CASCADE, null=True, blank=True)
  similar_posts = models.ForeignKey(SimilarRealestatePostList, related_name='real_estate_post2s', on_delete=models.CASCADE,
  null=True, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  images = models.ForeignKey(Image, related_name='real_estate_post2s', on_delete=models.CASCADE, null=True, blank=True)
  videos = models.ForeignKey(Video, related_name='real_estate_post2s', on_delete=models.CASCADE, null=True, blank=True)
  title = models.CharField(max_length=200)
  address = models.CharField(max_length=300, null=True, blank=True)
  total_price = models.FloatField(null=True, blank=True)
  description = models.CharField(max_length=2000)
  phone = models.CharField(max_length=200, blank=True, null=True)
  spec_detail = models.ForeignKey(SpecDetail, related_name='real_estate_post2s',on_delete=models.CASCADE, null=True, blank=True)
  config = models.ForeignKey(Config, related_name='real_estate_post2s',on_delete=models.CASCADE, null=True, blank=True)
  rank = models.IntegerField(default=1)

  def __str__(self):
    return self.title



class WatchList(models.Model):
  owner = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
  watchPostIdListString = models.CharField(max_length=500, null=True, blank=True)
  def __str__(self):
    return self.owner.username

class ExtendedUserInfomation(models.Model):
  user = models.OneToOneField(User,
        on_delete=models.CASCADE)
  phone = models.CharField(max_length=100, null=True, blank=True)
  address_line1 = models.CharField(max_length=200, null=True, blank=True)
  address_line2 = models.CharField(max_length=200, null=True, blank=True)
  post_code = models.CharField(max_length=50, null=True, blank=True)


# NEW118
class ReportedRealestateList(models.Model):
  reported_list_str = models.CharField(max_length=1000)
# NEW118