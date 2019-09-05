from django.db import models


class File(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=200)
    file = models.FileField(upload_to='')

    def __str__(self):
        return self.file.name
