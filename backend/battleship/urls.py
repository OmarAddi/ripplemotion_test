from .views import GridViewSet, GenerateShip
from rest_framework import routers
from django.urls import path, include

router = routers.SimpleRouter()
router.register('api/grid', GridViewSet)
router.register('api/ship', GenerateShip)



urlpatterns = [
    path('', include(router.urls)),
]

