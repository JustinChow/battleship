import React from 'react';
import './Game.css';
import { Gameboard } from './Gameboard'
import { playerFactory } from './Player';
import { cloneDeep } from 'lodash';
import { shipFactory } from './Ship';
import { OrientationSelector } from './OrientationSelector';
import { NextShipContainer } from './NextShipContainer';

export class GameSetup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShipVertical: true,
    }
  }
  
  clickHandler(i) {
    if(this.props.shipLength) {
      this.props.onClick(i, this.state.isShipVertical, this.props.shipLength)
    } else {
      console.log("No more ships");
    }
    
  }

  orientationSelectionHandler(e) {
    let isShipVertical;
    if (e.target.value === "vertical") {
      isShipVertical = true;
    } else if (e.target.value === "horizontal") {
      isShipVertical = false;
    } else {
      throw new Error("Invalid selection for ship orientation");
    }
    this.setState({isShipVertical: isShipVertical});
  }

  render() { 
    return (<div className="App">
      <Gameboard 
        player={this.props.players.player} 
        isPlayer={true}
        playerNext={this.state.playerNext}
        onClick={(i) => this.clickHandler(i)}
      />
      <OrientationSelector 
      isShipVertical={this.state.isShipVertical}
      onChange={(e) => this.orientationSelectionHandler(e)}
      />
      <NextShipContainer
        shipLength={this.props.shipLength}
        isShipVertical={this.state.isShipVertical}
        onClick={() => this.props.onStartGame()}
      />
    </div>
    );
  }
}