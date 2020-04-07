import React from 'react';
import './App.css';
import { Gameboard } from './Gameboard'
import { render } from '@testing-library/react';
import { playerFactory } from './Player';
import { boardFactory } from './Boardfactory';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.player = playerFactory("Player 1");
    this.player.getGameboard().placeShip(3, 3, true, 2);
    this.player.getGameboard().placeShip(5, 3, false, 2);
    this.opponent = playerFactory("CPU");
    this.opponent.getGameboard().placeShip(6, 1, true, 2);
    this.opponent.getGameboard().placeShip(5, 3, false, 2);
  }
  render() {
    return (<div className="App">
      <Gameboard player={this.opponent} isPlayer={false}/>
      <Gameboard player={this.player} isPlayer={true}/>
    </div>);
  }
}

export default App;
