import { shipFactory } from './Ship';

export function boardFactory() {
  let board = [[null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]

  let ships = [];

  let hits = [];
  let misses = [];

  function setBoardSquare(row, col, ship, pos, vertical) {
    board[row][col] = {
      ship,
      pos,
      vertical
    };
  }

  function getBoard() {
    return board;
  }

  function placeShip(rowStart, colStart, vertical, length) {
    if (rowStart < 0 || rowStart >= 10 || colStart < 0 || colStart >= 10 
      || (vertical && rowStart + length - 1 >= 10) 
      || (!vertical && colStart + length - 1 >= 10)) {
      throw new Error("A ship can't be placed there");
    }
    const ship = shipFactory(length);
    let pos = 0;
    if (vertical) {
      for (let row = rowStart; row < rowStart + length; row++) {
        setBoardSquare(row, colStart, ship, pos, vertical);
        pos++;
      }
    } else {
      for (let col = colStart; col < colStart + length; col++) {
        setBoardSquare(rowStart, col, ship, pos, vertical);
        pos++;
      }
    }

    ships.push(ship);
    return ship;
  }

  function receiveAttack(row, col) {
    if (board[row][col]) {
      hits.push([row, col]);
      const {pos, ship} = board[row][col]
      ship.hit(pos);
    } else {
      misses.push([row, col]);
    }
  }

  function isAllSunk() {
    return ships.every((ship) => ship.isSunk());
  }

  function getHits() {
    return hits;
  }

  function getMisses() {
    return misses;
  }

  return {
    getBoard,
    getHits,
    getMisses,
    placeShip,
    receiveAttack,
    isAllSunk
  };
}

export default boardFactory;