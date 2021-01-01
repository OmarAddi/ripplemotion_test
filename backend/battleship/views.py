from django.shortcuts import render
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from .serializers import GridSerializer, CoordinateSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError

from .models import Grid, Coordinate, Ship

from random import randint


class GridViewSet(ModelViewSet): 
	queryset = Grid.objects.all()
	serializer_class = GridSerializer

	def create(self, request, *args, **kwargs):
		Grid.objects.all().delete()
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_create(serializer)
		headers = self.get_success_headers(serializer.data)
		return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



class GenerateShip(ReadOnlyModelViewSet): 
	queryset = Ship.objects.all()
	serializer_class = CoordinateSerializer

	def list(self, request, *args, **kwargs):
		Coordinate.objects.all().delete()
		coordinates = None
		while coordinates is None:
			try:
				coordinates = self.populate_coordinate()
			except:
				Coordinate.objects.all().delete()
		serializer = self.get_serializer(coordinates, many=True)
		return Response(serializer.data)


	def populate_coordinate(self):
		grid = Grid.objects.first()
		coords_set_all = set()
		for ship in self.queryset:
			n = 0
			size = ship.size
			coords_ship = []
			ship_is_aware = False
			while not ship_is_aware:
				coords_ship = []
				coords_around_ship = []

				direction = randint(0, 1) #0 for vertical & 1 for horizontal

				"""
				Generate a random origin coordinate less the size of ship 
				then incremente the x or y coordinate according to the size
				"""
				if direction == 0: 
					x, y = randint(0, grid.width), randint(0, grid.length-ship.size) 
								
					for i in range (0,ship.size):
						coords_ship.append((x, y+i))
						coords_around_ship += get_coordinate_around(x, y+i)

				else:
					x, y = randint(0, grid.width-ship.size), randint(0, grid.length)

					for i in range (0,ship.size):
						coords_ship.append((x+i, y))
						coords_around_ship += get_coordinate_around(x+i, y)
				
				"""
				Checks if the coordinate is not used
				"""
				is_available = not any([True for c in coords_ship if c in coords_set_all]) 

				"""
				Add coordinates to the ship and save it in DB
				"""
				if is_available:
					for coordinate in coords_around_ship:
						coords_set_all.add(coordinate)

					for coordinate in coords_ship:
						coords_set_all.add(coordinate)

						x_coor = str(coordinate).split(", ")[0].split('(')[1]
						y_coor = str(coordinate).split(", ")[1].split(')')[0]
						new_coor = Coordinate(x_coor=int(x_coor),y_coor=int(y_coor), ship=ship)
						new_coor.save()
					ship_is_aware = True

				n = n + 1
				"""
				if the program does not find a place for a ship
				it generates an error to start over
				"""
				if n > 200:
					raise ValidationError

		return Coordinate.objects.all()


def get_coordinate_around(x, y):
	return [
		(x-1, y-1),
		(x-1, y),
		(x-1, y+1),
		(x, y-1),
		(x, y+1),
		(x+1, y-1),
		(x+1, y),
		(x+1, y+1),
	]



