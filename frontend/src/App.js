import './App.css';
import { Container, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import Grid from './component/Grid';



function App(){
	const [row, setRow] = useState('')
	const [col, setCol] = useState('')
  const [description, setDescription] = useState(false)


	/**********************
	Do a post request to send the size
	of grid to the back-end
	***********************/
	function shipGenerator(row, col){
    document.getElementById("generate_button").disabled = true;

    setDescription(false);
		deleteGrid(row,col);
		axios.post('http://127.0.0.1:8000/api/grid/', {
    		width: col-1,
      	length: row-1
		})
		.finally(getShipCoordinates());
  	}

	/**********************
	Get the coordinates generate 
	by the back-end
	***********************/
	function getShipCoordinates(){
  		axios.get('http://127.0.0.1:8000/api/ship/')
  		.then(response => {
  			placeShip(response.data);
  		})
  	}


    /**********************
    Place ships in grid
    Get the cell and style it
    ***********************/
  	function placeShip(data){
  		for (const i in data) {
  			if (data[i].ship.name === "Croiseur") {
  		  		document.getElementById('grid').rows[data[i].y_coor].cells[data[i].x_coor].style.backgroundColor = "black";
  			}
  			else if (data[i].ship.name === "Escorteur") {
  		  		document.getElementById('grid').rows[data[i].y_coor].cells[data[i].x_coor].style.backgroundColor = "green";
  			}
  			else if (data[i].ship.name === "Torpilleur") {
  		  		document.getElementById('grid').rows[data[i].y_coor].cells[data[i].x_coor].style.backgroundColor = "red";
  			}
  			else if (data[i].ship.name === "Sous-marin") {
  		  		document.getElementById('grid').rows[data[i].y_coor].cells[data[i].x_coor].style.backgroundColor = "blue";
  			}	
		  }
      setDescription(true);    
      document.getElementById("generate_button").disabled = false;

  	}

    /**********************
    Delete the background color
    of cells 
    ***********************/
  	function deleteGrid(row, col){
      setDescription(false);
  		for (let i = 0; i < row; i++) {
  			for (let j = 0; j < col; j++) {
		  		document.getElementById('grid').rows[i].cells[j].style.backgroundColor = "white";
			   }
		  } 
  	}

    /**********************
    Display an error message 
    if the grid is too small
    ***********************/
  	function preventSmallGrid(row, col){
  		let size = row*col
  		if (size<49 & size>0){
  			return <p className="alert_message">La taille de la grille est trop petite.</p>
  		}
  	}

    /**********************
    Display the color of each
    ship
    ***********************/
    function descript(description){
      if (description)
      {
        return(
          <Row>
            <p className="croiseur">Croiseur</p>
            <p className="escorteur">Escorteur</p>
            <p className="torpilleur">Torpilleur</p>
            <p className="sous-marin">Sous-marin</p>
          </Row>
          )        
      }

    }
    
	return (
		<Container fluid className="App">
			<header>
				<img   src={process.env.PUBLIC_URL + 'logo_RM.png'} />
				<h1>Bataille navale</h1>
			</header>
			<Row>
				<input placeholder="Nombre de lignes" onChange={event => setRow(event.target.value)}  />
				<input placeholder="Nombre de colonnes" onChange={event => setCol(event.target.value)}  />
	  		</Row>
			<Row>
				{preventSmallGrid(row,col)}
        {descript(description)}
	  		</Row>
			<Row>
				<Grid row={row} col={col} />
			</Row>
			<Row>
				<button 
          id="generate_button"
          onClick={() => shipGenerator(row, col)}>
					Générer
				</button>
				<button onClick={() => deleteGrid(row, col)}>
					Effacer
				</button>
			</Row>
		</Container>
	);
}

export default App;

