from django.db import models

class PCOSPrediction(models.Model):
    image = models.ImageField(upload_to='pcos_images')
    result = models.BooleanField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prediction #{self.id}"
