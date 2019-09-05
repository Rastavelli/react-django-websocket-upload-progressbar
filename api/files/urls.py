from django.conf.urls import url, include
from .views import FileUploadViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('files', FileUploadViewSet)

urlpatterns = [
    url(r'', include(router.urls)),
]
