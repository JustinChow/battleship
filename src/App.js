import React from 'react';
import { Game } from './Game'
import { playerFactory } from './Player';
import { GameSetup } from './GameSetup';
import { cloneDeep } from 'lodash';
import { shipFactory } from './Ship'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.shipLengths = [5, 4, 3, 3, 2];

    this.state = {
      players: {
        player: playerFactory(),
        cpu: playerFactory(),
      },
      gameStarted: false,
      errorMsg: "",
      nextShipToPlace: 0, //index of next ship to be placed when setting up game
      playerNext: true,
    }
  }
  
  //Returns a new board with the updated square
  getNewBoard(board, square, shipIndex, pos, vertical) {
    const newBoard = cloneDeep(board);
    const newSquare = {
      shipIndex,
      pos,
      vertical
    };
    newBoard[square] = newSquare;

    return newBoard;

    // return {
    //   players: {
    //     ...state.players,
    //     [player]: {
    //       ...state.players[player],
    //       board: board
    //     }
    //   }
    // };
}
  
  //Returns a new ship array with the new ship added
  getNewShips(ships, ship) {
    const newShips = cloneDeep(ships);
    newShips.push(ship);
    return newShips;
    // return {
    //   players: {
    //     ...state.players,
    //     [player]: {
    //       ...state.players[player],
    //       ships: ships
    //     }
    //   }
    // }
  }

  // Returns a list of squares for the ship to occupy if the placement is valid
  // otherwise, returns null
  getShipSquares(state, player, square, vertical, length) {
    if (!vertical && square % 10 + length-1 > 9) {
      return null;
    }
    const board = state.players[player].board
    let squares = []
    for (let pos = 0; pos < length; pos++) {
      squares.push(square);
      if (vertical) {
        square += 10;
      } else {
        square++;
      }
    }
    //Make sure every square is within the grid and doesn't overlap with 
    //another ship
    if (squares.some((s) => board[s] || s < 0 || s > 99 || (s > 99))) {
      return null;
    } else {
      return squares;
    }
  }
  
  //Given a list a squares and the previous state, generate the new state
  //after the ship has been placed. If the ship placement is valid, the new
  //state will be returned, otherwise the return will be null.
  placeShip(state, player, square, vertical, length) {
    const squares = this.getShipSquares(state, player, square, vertical, length);
    if (squares) {
      const board = state.players[player].board;
      const ships = state.players[player].ships;
      const ship = shipFactory(length);
      const shipIndex = ships.length
      const newShips = this.getNewShips(ships, ship);
      let newBoard = board;
      for (let pos = 0; pos < length; pos++) {
        newBoard = this.getNewBoard(newBoard, squares[pos], shipIndex, pos, vertical);
      }
      return ({
        players: {
          ...state.players,
          [player]: {
            ...state.players[player],
            ships: newShips,
            board: newBoard,
          }
        },
        errorMsg: "",
        nextShipToPlace: state.nextShipToPlace + 1,
      }); 
    } else {
      return null;
    }
  }

  placeShipClickHandler(square, vertical, length) {
    this.setState((state) => {
      const newState = this.placeShip(state, 'player', square, vertical, length);
      if (newState) {
          return newState;
      } else {
        return {errorMsg: "Can't place ship there."};
      }
    });
  }

  placeOpponentShip(length) {
    this.setState((state) => {
      let vertical;
      if (Math.random() >= 0.5) {
        vertical = true
      } else {
        vertical = false
      }
      
      let square;
      do {
        square = Math.floor(Math.random() * 100);
      } while (!this.placeShip(state, 'cpu', square, vertical, length))

      return this.placeShip(state, 'cpu', square, vertical, length);

    });
    
  }

  generateOpponentBoard() {
    this.placeOpponentShip(5);
    this.placeOpponentShip(4);
    this.placeOpponentShip(3);
    this.placeOpponentShip(3);
    this.placeOpponentShip(2);
  }

  startGameHandler() {
    this.generateOpponentBoard()


    this.setState({gameStarted: true});
  }

  updateHitState(player, square) {
    this.setState((state) => {
      const hits = state.players[player].hits.slice();
      const board = state.players[player].board;
      hits[square] = true;
      const {pos, shipIndex} = board[square];
      const ships = cloneDeep(state.players[player].ships);
      const ship = Object.assign({}, state.players[player].ships[shipIndex])
      ship.hits[pos] = true;
      ships[shipIndex] = ship;
      // const ships = this.state.players[player].ships;
      // const shipIndex = ships.indexOf(ship);
      // const newShips = cloneDeep(ships);
      // newShips[shipIndex].hits[pos] = true;

      return ({
        playerNext: !state.playerNext,
        players: {
          ...state.players,
          [player]: {
            ...state.players[player],
            hits: hits,
            ships: ships,
          }
        }
      });
    });
  }

  updateMissState(player, square) {
    this.setState((state) => {
      const misses = state.players[player].misses.slice()
      misses[square] = true;

      return ({
        playerNext: !this.state.playerNext,
        players: {
          ...state.players,
          [player]: {
            ...state.players[player],
            misses: misses,
          }
        }
      });
    });
  }

  attackHandler(player, index) {
    const square = this.state.players[player].board[index]
    if (square) {
      this.updateHitState(player, index);
    } else {
      this.updateMissState(player, index);
    }
  }

  render() {
    return (<div className="App">
      {!this.state.gameStarted &&
        <GameSetup
          players={this.state.players}
          onClick={(i, vertical, length) => this.placeShipClickHandler(i, vertical, length)}
          shipLength = {this.shipLengths[this.state.nextShipToPlace]}
          onStartGame={() => this.startGameHandler()}
        />
      }
      {this.state.gameStarted &&   
        <Game players={this.state.players}
          onAttack={(player, index) => this.attackHandler(player, index)}
          playerNext={this.state.playerNext}
        />
      }
      <p className="error-msg">{this.state.errorMsg}</p>
    </div>);
  }
}

export default App;
