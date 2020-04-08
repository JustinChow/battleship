import React from 'react';

//Component to render radio buttons to select whether we want to place a ship
//in the vertical position or horizontal position
export function OrientationSelector(props) {
  return (
    <form>
      <label>
        <input
          type="radio"
          value="vertical"
          checked={props.isShipVertical === true}
          onChange={(e) => props.onChange(e)}
        />
        Vertical
      </label>
      <label>
        <input
          type="radio"
          value="horizontal"
          checked={props.isShipVertical === false}
          onChange={(e) => props.onChange(e)}
        />
        Horizontal
      </label>
    </form>
  ); 
}