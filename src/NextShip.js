import React from 'react';
import './NextShip.css';

export function NextShip(props) {
  const shipDivs = []
  const dot = <span className="ship-dot"></span>
  for (let i = 0; i < props.shipLength; i++) {
    shipDivs.push(<div className="ship-div">
      {i === 0 && 
        dot}
    </div>)

  }

  const divContainerStyle = {};
  if (props.isShipVertical) {
    divContainerStyle.gridTemplateRows = `repeat(${props.shipLength}, 25px)`;
    divContainerStyle.gridTemplateColumns = '25px';
    divContainerStyle.width = '25px';
    divContainerStyle.height = `${25 * props.shipLength}px`;
  } else {
    divContainerStyle.gridTemplateColumns = `repeat(${props.shipLength}, 25px)`;
    divContainerStyle.gridTemplateRows = '25px';
    divContainerStyle.height = '25px';
    divContainerStyle.width = `${25 * props.shipLength}px`;
  }


  return (
    <div className="ship-divs-container" style={divContainerStyle}>
      {shipDivs}
    </div>
  )
}