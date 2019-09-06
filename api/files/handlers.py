from django.core.files.uploadhandler import TemporaryFileUploadHandler

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


class ProgressUploadHandler(TemporaryFileUploadHandler):
    TemporaryFileUploadHandler.chunk_size = 128 * 2 ** 10

    def receive_data_chunk(self, raw_data, start):
        file_size = int(self.request.META['CONTENT_LENGTH']) # 824962512
        progress_status = round((start * 100) / file_size, 2)
        self.render_progress(progress_status)
        self.file.write(raw_data)

    def file_complete(self, file_size):
        self.file.seek(0)
        self.file.size = file_size
        self.render_progress(100)
        return self.file

    def render_progress(self, percent):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'render_upload_progress_group',
            {'type': 'render_progress', 'message': str(percent)}
        )
