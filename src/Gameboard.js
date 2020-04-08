
import React from 'react';
import './Gameboard.css';

export function Gameboard(props) {
  function renderGridSquares() {
    let gridSquares = [];
    const {board, hits, misses} = props.player;
    const shipColor = "yellow";
    for (let i = 0; i < 100; i++) {
      let squareStyle = {}
      if (props.isPlayer === true) {    
        if (board[i] !== null) {
          const {vertical, shipIndex, pos} = board[i]
          const ship = props.player.ships[shipIndex];
          const length = ship.length;
          
          squareStyle.backgroundColor = shipColor;
          if (length > 1) {
            if (pos != length - 1) {
              if (vertical) {
                squareStyle.borderBottomStyle = 'dashed';
              }
              else {
                squareStyle.borderRightStyle = 'dashed';
              }
            }
          }  
        }
      }
      gridSquares.push(<div 
        className="grid-square" 
        key={i}
        style={squareStyle}
        onClick={() => props.onClick(i)}>
          {(hits[i]) &&
            <span className="hit-dot"></span>
          }
          {(misses[i]) &&
            <span className="miss-dot"></span>
          }
      </div>);
    }
    return gridSquares;
  }

  return (
    <div className="game-board">
      {renderGridSquares()}
    </div>
  );
  
}

export default Gameboard