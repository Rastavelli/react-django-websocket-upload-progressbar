from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from .handlers import ProgressUploadHandler

from .models import File
from .serializers import FileSerializer


class FileUploadViewSet(viewsets.ModelViewSet):

    queryset = File.objects.all()
    serializer_class = FileSerializer

    def create(self, request, *args, **kwargs):
        request.upload_handlers = [ProgressUploadHandler(request)]
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



