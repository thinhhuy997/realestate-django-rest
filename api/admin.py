from django.contrib import admin
from .models import Region, RealEstatePost, Comment, Config, SpecDetail, RealEstatePost2, Image, SimilarRealestatePostList, WatchList, ReportedRealestateList, Video
from django.contrib.auth.admin import UserAdmin

# Register your models here.

admin.site.register(Region)
admin.site.register(RealEstatePost)
admin.site.register(Comment)

# realestate2
admin.site.register(Config)
admin.site.register(SpecDetail)
admin.site.register(Image)
admin.site.register(Video)
admin.site.register(SimilarRealestatePostList)
admin.site.register(RealEstatePost2)

# watchlist
# admin.site.register(WatchID)
admin.site.register(WatchList)

# NEW118
admin.site.register(ReportedRealestateList)