from django.db import models

class Grid(models.Model):
	width   = models.IntegerField()
	length  = models.IntegerField()


class Ship(models.Model):
	name = models.CharField(max_length=254)
	size = models.IntegerField()

	def __str__(self):
		return self.name

class Coordinate(models.Model):
	x_coor  = models.IntegerField()
	y_coor  = models.IntegerField()
	ship = models.ForeignKey(Ship, on_delete=models.CASCADE)
	
	def __str__(self):
		return self.ship.name

