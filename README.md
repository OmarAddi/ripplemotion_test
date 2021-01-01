# Test Ripple Motion

## Framework utilisés 
* Back-end: Django 3.1.4
* Front-end: ReactJS 17.0.1

## Installation

1. Créez un dépôt git local:

`git init`

2. Clonez le dépôt:

`git clone https://github.com/OmarADDI/ripplemotion_test.git`

3. Déplacez-vous dans le répertoire du projet:

`cd ripplemotion_test`

4. Créez l'application:

`docker-compose build`


5. Lancez l'application:

`docker-compose up`

## Accès à l'application

* URL front: `http://localhost:3000`
* URL back: `http://localhost:8000`

## Utilisation

1. Entrez le nombre de colonnes et de lignes 
2. Appuyez sur le bouton générer afin de visualiser le placement des bateaux sur la grille

La taille minimale de la grille est de 7x7 pour que le serveur puisse trouver les coordonnées, respectant les critères, pour chaque bateau.

Cependant, le temps de génération des coordonnées sur cette taille de grille prend plusieurs secondes.
