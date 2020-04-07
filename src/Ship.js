// Returns a ship object with length, whether it has been sunk, and where the
// ship has been hit.
export function shipFactory(length) {
  let hits = new Array(length).fill(false);

  function getLength() {
    return length;
  }
  
  function isSunk() {
    return hits.every((e) => e === true);
  }

  function hit(pos) {
    if (pos < 0 || pos > length-1) {
      throw new Error(`Position ${pos} is not a valid position to hit for `
      + `a battleship of length ${length}`);
    }
    else {
      hits[pos] = true;
      return hits.slice();
    }
  }

  function getHits() {
    return hits;
  }

  return {
    getLength,
    hit, 
    isSunk,
    getHits,
  };

};

export default shipFactory;