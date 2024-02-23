from django.urls import path
from .views import PCOSPredictionView,FeatureView

urlpatterns = [
    path('ultrasound', PCOSPredictionView.as_view(), name='pcos_prediction'),
    path('feature', FeatureView.as_view(), name='Feature'),

]