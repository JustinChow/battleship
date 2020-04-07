import { shipFactory } from './Ship.js';

describe('Ship', () => {
  test('hit position 1', () => {
    const ship = shipFactory(3);
    expect(ship.hit(1)).toEqual([false, true, false]);
  });

  test('hit position greater than length-1', () => {
    const ship = shipFactory(2);
    expect(() => ship.hit(2)).toThrow('Position 2 is not a valid position to '
    + 'hit for a battleship of length 2');
  });

  test('hit position less than 0', () => {
    const ship = shipFactory(2);
    expect(() => ship.hit(-1)).toThrow('Position -1 is not a valid position to '
      + 'hit for a battleship of length 2');
  });

  test('ship is sunk', () => {
    const ship = shipFactory(1);
    ship.hit(0);
    expect(ship.isSunk()).toBe(true);
  });

  test('ship not sunk', () => {
    const ship = shipFactory(1);
    expect(ship.isSunk()).toBe(false);
  });

  test('get hits', () => {
    const ship = shipFactory(2);
    ship.hit(0);
    expect(ship.getHits()).toEqual([true, false]);
  });
});