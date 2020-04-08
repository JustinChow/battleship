// Returns a ship object with length, whether it has been sunk, and where the
// ship has been hit.
export function shipFactory(length) {
  let hits = new Array(length).fill(false);

  return {
    length,
    hits,
  };
};

export default shipFactory;