from django.conf.urls import url
from django.urls import include, path
from rest_framework import routers

from common import views

router = routers.DefaultRouter()
router.register("user", views.UserViewSet)

app_name = "common"

urlpatterns = [
    path("", include(router.urls)),
    url(r"^user/login", views.UserLoginViewSet.as_view()),
    url(r"^user/logout", views.UserLogoutViewSet.as_view()),
]
