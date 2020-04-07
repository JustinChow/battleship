import { playerFactory } from './Player.js';

describe('Player', () => {
  test('record a hit', () => {
    const player = playerFactory("Test Player");
    player.recordHit([0, 0]);
    expect(player.getHits()).toEqual([[0, 0]]);
  });

  test('record a miss', () => {
    const player = playerFactory("Test Player2");
    player.recordMiss([5, 5]);
    expect(player.getMisses()).toEqual([[5, 5]]);
  });

  test('generate an attack', () => {
    const player = playerFactory("Test CPU");
    const [row, col] = player.generateAttack();
    expect(row).toBeGreaterThan(-1);
    expect(row).toBeLessThan(10);
    expect(col).toBeGreaterThan(-1);
    expect(col).toBeLessThan(10);
  });
});