import React, { Component } from 'react';
import Box from './Box.js';

class Board extends Component {
  state = {
    world: [
        ['','',''],
        ['','',''],
        ['','','']
    ],
    isXTurn: true,
    winner: false
  };


  renderWorld(){
    return this.state.world.map((row, y) => <div style={{display:'block'}}>{row.map((item, x) => <Box status={item} updateBox={this.updateBox.bind(this, x, y)}></Box>)}</div>)
  }

  updateBox(x, y){
    let newWorld = JSON.parse(JSON.stringify(this.state.world));
    newWorld[y][x] = this.state.isXTurn ? 'x': 'y';
    this.setState({world: newWorld}, ()=>{
        this.checkVictory(x, y);
        this.changeTurn();
    });
  }

  changeTurn(){
    this.setState({isXTurn: !this.state.isXTurn})
  }

  checkVictory(x, y){
    let { world } = this.state;
    let winHorizontal = world[y].filter((item)=> item === world[y][x]).length === 3;
    let winVertical = world.filter((row)=> row[x] === world[y][x]).length === 3;
    let winDiagonal = false;
    // Checks if user selected a space that could win diagonally
    if((x !== 1 || y === 1) && (x === 1 || y !== 1)){

      if(x !== y){
        winDiagonal = world[0][2] === world[1][1] && world[1][1] === world[2][0];
      }else if(x === 1){
        winDiagonal = (world[0][0] === world[1][1] && world[1][1] === world[2][2]) || (world[0][2] === world[1][1] && world[1][1] === world[2][0])
      }else{
        winDiagonal =  world[0][0] === world[1][1] && world[1][1] === world[2][2]
      }
    }
    if(winHorizontal || winVertical || winDiagonal)
      this.setState({winner: this.state.isXTurn ? 'x': 'y'});
  }


  render() {
    let winner = this.state.winner ? `Winner is ${this.state.winner}`: ''
    return (
      <div>
          <h1>Current Player is : {this.state.isXTurn ? 'x': 'y'}</h1>
          {this.renderWorld()}
          <h1>{winner}</h1>
      </div>
    );
  }
}

export default Board;
