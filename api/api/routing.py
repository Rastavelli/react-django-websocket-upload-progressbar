from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from .consumer import UploadProgressConsumer

application = ProtocolTypeRouter({
    "websocket": URLRouter([
        path("", UploadProgressConsumer),
    ])
})
