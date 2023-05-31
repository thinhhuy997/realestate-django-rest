from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Region, RealEstatePost, Comment, Config, SpecDetail, RealEstatePost2, WatchList, ExtendedUserInfomation

class UserSerializer(serializers.ModelSerializer):
	# real_estate__posts = serializers.PrimaryKeyRelatedField(many=True, queryset=RealEstatePost.objects.all())

	class Meta:
			model = User
			fields = '__all__'
			extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):
			password = validated_data.pop('password')
			user = User(**validated_data)
			user.set_password(password)
			user.save()
			return user

class ExtendedUserInformationSerializer(serializers.ModelSerializer):				
  class Meta:
    model = ExtendedUserInfomation
    fields = '__all__'

class RegionSerializer(serializers.ModelSerializer):
  real_estate_posts = serializers.SlugRelatedField(many=True, read_only=True,
        slug_field='title')
				
  class Meta:
    model = Region
    fields = ['id','region_name', 'region_description', 'real_estate_posts']

class RealEstatePostSerializer(serializers.ModelSerializer):
	class Meta:
		model = RealEstatePost
		fields = '__all__'
		depth = 1

class CommentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Comment
		fields = '__all__'




# 6/7/2022
class ConfigSerializer(serializers.ModelSerializer):
  class Meta:
			model = Config
			fields = '__all__'

class SpecSerializer(serializers.ModelSerializer):
  class Meta:
			model = SpecDetail
			fields = '__all__'

class RealEstatePost2Serializer(serializers.ModelSerializer):

	class Meta:
		model = RealEstatePost2
		fields = '__all__'
		depth = 1

# Watchlist
class WatchlistSerializer(serializers.ModelSerializer):
  class Meta:
			model = WatchList
			fields = ("id", "owner", "watchPostIdListString")
    	