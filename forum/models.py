from unicodedata import category
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.
def upload_to(instance, filename):
  return 'images/forum/{filename}'.format(filename=filename)

class Region(models.Model):
  code = models.CharField(max_length=20, unique = True, null = True)
  region_name = models.CharField(max_length=100, unique = True)
  region_description = models.CharField(max_length=255)
  color_code = models.CharField(max_length=2, unique = True, null = True)

  def __str__(self):
      return self.region_name




class Post(models.Model):
  CHOICES = (
    ('SELL', 'SELL'),
    ('LEASE', 'LEASE')
  )

  region = models.ForeignKey(Region, related_name='posts', on_delete=models.CASCADE, default=None)
  created_by = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE, default=None)
  created_date = models.DateTimeField(auto_now_add=True)
  title = models.CharField(max_length=200)
  content = models.CharField(max_length=800)
  category = models.CharField(max_length=100, choices = CHOICES, default=None, blank=True, null=True)
  image_1 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True) # URL IMAGES
  image_2 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True) # URL IMAGES
  image_3 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True) # URL IMAGES
  image_4 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True) # URL IMAGES
  image_5 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True) # URL IMAGES
  image_6 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True) # URL IMAGES
  image_7 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True) # URL IMAGES
  image_8 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True) # URL IMAGES
  image_9 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True) # URL IMAGES
  image_10 = models.ImageField(upload_to=upload_to, default=None, blank=True, null=True) # URL IMAGES

  def __str__(self):
    return self.title

  # def get_created_at(self, obj):
  #       return obj.created_at.strftime(format="%m-%d-%Y %H:%M:%S")

class Comment(models.Model):
  created_by = models.ForeignKey(User, related_name='user_comments', on_delete=models.CASCADE, default=None)
  post = models.ForeignKey(Post, related_name='user_comments', on_delete=models.CASCADE)
  comment_text = models.CharField(max_length=255)
  created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

  def __str__(self):
    return self.comment_text

  def get_created_at(self, obj):
        return obj.created_at.strftime(format="%m-%d-%Y %H:%M:%S")
