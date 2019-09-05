from channels.consumer import AsyncConsumer
from asgiref.sync import async_to_sync


class UploadProgressConsumer(AsyncConsumer):

    async def websocket_connect(self, event):
        await self.channel_layer.group_add('render_upload_progress_group', self.channel_name)
        print("connected", event)
        await self.send({
            "type": "websocket.accept",

        })

    async def render_progress(self, event):
        print('progress', event)
        await self.send({
            "type": "websocket.send",
            "text": event["message"]
        })

    async def websocket_receive(self, event):
        print("received", event)
        await self.send({
            "type": "websocket.send",
            "text": event["text"]
        })

    async def disconnect(self, close_code):
        async_to_sync(self.group_name)('render_updates_group')
