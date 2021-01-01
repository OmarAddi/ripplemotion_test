from battleship import models
from rest_framework import serializers
# Create your views here.



class GridSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Grid
		fields = '__all__' 

class CoordinateSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Coordinate
		depth = 1 #To have coordinates
		fields = ('ship','x_coor','y_coor')