import './css/Grid.css';
import { Table } from 'react-bootstrap';



/**********************
Create the row of table 
***********************/
function createRow(row, col){
    let table = []
    for (let i = 0; i < row; i++) {
      table.push(<tr>
        {
          createCol(col)
        }
      </tr>)
    }
    return table
}

/**********************
Create the colunm of table 
***********************/
function createCol(col){
    let table = []

    for (let i = 0; i < col; i++) {
      table.push(<td>
      { }
      </td>)
    }
    return table
}

/**********************
Grid component with row and col parameters for App component
***********************/
function Grid({row,col}){
  return (
    <Table className="grid-table" id="grid">
      <tbody>
        {createRow(row,col)}
      </tbody>
    </Table>
  );
}

export default Grid;
