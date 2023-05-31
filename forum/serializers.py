from dataclasses import field
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Region, Post, Comment

class UserSerializer(serializers.ModelSerializer):
	
	class Meta:
			model = User
			fields = '__all__'
			extra_kwargs = {'password': {'write_only': True}}

	# def create(self, validated_data):
	# 		password = validated_data.pop('password')
	# 		user = User(**validated_data)
	# 		user.set_password(password)
	# 		user.save()
	# 		return user

class RegionSerializer(serializers.ModelSerializer):
  # posts = serializers.SlugRelatedField(many=True, read_only=True,
  #       slug_field='title')
				
  class Meta:
    model = Region
    fields = '__all__'
		# fields = ['id', 'code', 'region_name', 'region_description', 'color_code', 'posts']




class CommentSerializer(serializers.ModelSerializer):
	# created_by = serializers.SlugRelatedField(read_only = True, slug_field = 'username')
	# comment_count = serializers.SerializerMethodField()

	class Meta:
		model = Comment
		fields = '__all__'





class PostSerializer(serializers.ModelSerializer):
	region = serializers.PrimaryKeyRelatedField(queryset=Region.objects.all())
	created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

	user_comments = CommentSerializer(many = True, read_only = True)

	comment_count = serializers.SerializerMethodField()

	class Meta:
		model = Post
		fields = ['id', 'region', 'created_by', 'created_date', 'title', 'content', 'comment_count', 'user_comments', 'category'
		, 'image_1', 'image_2', 'image_3', 'image_4', 'image_5', 'image_6', 'image_7', 'image_8', 'image_9', 'image_10']
		# fields = '__all__'
		# depth = 1

	def to_representation(self, instance):
		self.fields['region'] = RegionSerializer()
		self.fields['created_by'] = UserSerializer()
		return super(PostSerializer, self).to_representation(instance)

	def get_comment_count(self, obj):
		return obj.user_comments.count()

