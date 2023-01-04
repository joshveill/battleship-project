const Ship = (l) => {
  //properties
  const length = l;
  let boatHitMap = [...Array(l).keys()];

  let domTargets = [];

  // replace hit pos by "hit"
  let hit = (pos) => {
    if (boatHitMap[pos] == "hit") return false;
    boatHitMap.splice(pos, 1, "hit");
  };

  // checks if ship is sunk
  let isSunk = () => boatHitMap.every((x) => x === "hit");

  return { boatHitMap, length, hit, isSunk, domTargets };
};

export { Ship };
