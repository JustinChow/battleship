import React from 'react';
import './Game.css';
import { Gameboard } from './Gameboard'
import { playerFactory } from './Player';
import { cloneDeep } from 'lodash';
import { shipFactory } from './Ship';

export class Game extends React.Component {
  checkWinner() {
    const playerShips = this.props.players.player.ships;
    const cpuShips = this.props.players.cpu.ships;

    if (playerShips.every(ship => ship.hits.every((hit) => hit === true))) {
      return 'computer';
    } else if (cpuShips.every(ship => ship.hits.every((hit) => hit === true))) {
      return 'player';
    }
    //return this.state.every((ship) => ship.isSunk());
  }

  attackClickHandler(index) {
    //Only allow clicks if it's the player's turn and nobody has won yet
    if (this.props.playerNext && !this.checkWinner()) {
      this.props.onAttack('cpu', index);
    }
  }

  //Generates an attack on a player by regisering an attack on a square that 
  //hasn't been attacked yet
  generateAttack(player) {
    //Only generates attack if no winner yet
    if (!this.checkWinner()){
      let square = 0;
      const hits = this.props.players[player].hits;
      const misses = this.props.players[player].misses;
      do {
        square = Math.floor(Math.random() * 100);
      } while (hits.some((e) => square === e) || misses.some((e) => square === e))
      this.props.onAttack("player", square);
    }
    
  }


  componentDidUpdate() {
    //Generate and register an attack from the computer in 2 seconds if it's the
    //computer's turn
    if (!this.props.playerNext) {
      setTimeout(() => this.generateAttack("player"), 2000);
    }
  }

  render() {
    const winner = this.checkWinner()
    let status;

    if (winner) {
      status = winner + " wins!"
    } else {
      status = "It's " + (this.props.playerNext ? "your " : "the computer's ") 
        + "turn";

    }

    console.log(winner);
    
    return (<div className="App">
      <h1>Battleship</h1>
      <Gameboard 
        player={this.props.players.cpu} 
        isPlayer={false}
        playerNext={this.props.playerNext}
        onClick={(i) => this.attackClickHandler(i)}
      />
      <p>{status}</p>
      <Gameboard 
        player={this.props.players.player} 
        isPlayer={true}
        playerNext={this.props.playerNext}
        onClick={()=>{}}
      />
    </div>);
  }
}

export default Game;
