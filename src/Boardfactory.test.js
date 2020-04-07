import { boardFactory } from './Boardfactory';

describe('Gameboard', () => {
  test('record a hit on 0, 0', () => {
    const board = boardFactory();
    const row = 0;
    const col = 0;
    const vertical = true;
    const length = 2;
    
    const ship = board.placeShip(row, col, vertical, length);

    board.receiveAttack(0, 0);

    expect(ship.getHits()).toEqual([true, false]);
    expect(board.getHits()).toEqual([[0, 0]]);
    
  });

  test('record a hit on 1, 0', () => {
    const board = boardFactory();
    const row = 0;
    const col = 0;
    const vertical = true;
    const length = 2;
    
    const ship = board.placeShip(row, col, vertical, length);

    board.receiveAttack(1, 0);

    expect(ship.getHits()).toEqual([false, true]);
    expect(board.getHits()).toEqual([[1, 0]]);
  });

  test('record a miss on 0, 3', () => {
    const board = boardFactory();
    const row = 0;
    const col = 0;
    const vertical = true;
    const length = 2;
    
    const ship = board.placeShip(row, col, vertical, length);

    board.receiveAttack(3, 0);

    expect(board.getMisses()).toEqual([[3, 0]]);
  })

  test('place a valid ship', () => {
    const board = boardFactory();
    const row = 4;
    const col = 5;
    const vertical = false;
    const length = 4;

    const ship = board.placeShip(row, col, vertical, length);

    const expectedBoard = [[null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, {ship, pos: 0, vertical: false}, {ship, pos: 1, vertical: false}, {ship, pos: 2, vertical: false}, {ship, pos: 3, vertical: false}, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]
    
    expect(board.getBoard()).toEqual(expectedBoard);
  });

  test('place an invalid ship', () => {
    const board = boardFactory();
    const row = 15;
    const col = -2;
    const vertical = false;
    const length = 4;

    expect(() => board.placeShip(row, col, vertical, length)).toThrow("A ship can't be placed there");
  })

  test('all ships sunk', () => {
    const board = boardFactory();
    board.placeShip(0, 0, true, 2);
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    
    expect(board.isAllSunk()).toBe(true);
  });

  test ('not all ships sunk', () => {
    const board = boardFactory();
    board.placeShip(0, 0, true, 2);
    board.receiveAttack(0, 0);
    
    expect(board.isAllSunk()).toBe(false);
  })
});