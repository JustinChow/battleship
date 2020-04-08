import React from 'react';
import './NextShipContainer.css';
import { NextShip } from './NextShip';

export function NextShipContainer(props) {  
  const msg = props.shipLength ? "Next Ship: " : "You're done placing your ships!";
  return(
    <div className="next-ship-container">
      <h2>{msg}</h2>
      {props.shipLength && 
        <NextShip
          shipLength={props.shipLength}
          isShipVertical={props.isShipVertical}
        />
      }
      {props.shipLength &&
        <p>The dot on the ship will be placed on the square that you click.</p>
      }
      {!props.shipLength &&
        <button onClick={() => props.onClick()}>Start Game</button>
      }
    </div>
  );
}