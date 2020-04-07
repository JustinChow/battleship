import { boardFactory } from './Boardfactory';
import { isEqual } from 'lodash';

export function playerFactory(name) {
  let board = boardFactory();
  let hits = [];
  let misses = [];

  function recordMiss([row, col]) {
    misses.push([row, col]);
  }

  function recordHit([row, col]) {
    hits.push([row, col]);
  }

  function getGameboard() {
    return board;
  }

  function getMisses() {
    return misses;
  }

  function getHits() {
    return hits;
  }

  // Generates a random number from 0-N
  function generateRandomNum(n) {
    return Math.floor(Math.random() * n);
  }

  function generateAttack() {
    let row = 0;
    let col = 0;
    do {
      row = generateRandomNum(10);
      col = generateRandomNum(10);
    } while (hits.some((e) => isEqual([row, col], e)) || misses.some((e) => isEqual([row, col], e)))
    return [row, col];
  }

  return {
    recordMiss,
    recordHit,
    getMisses,
    getHits,
    generateAttack,
    getGameboard,
  };
}

export default playerFactory;