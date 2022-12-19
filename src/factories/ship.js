import { SHIP_LENGTHS } from "../helper.js";

export const Ship = (typeOfShip) => {
  //Ship's basic properties
  const id = typeOfShip;
  const length = SHIP_LENGTHS[typeOfShip];

  //Logic for hit on boat
  const hits = Array(length).fill(null);
  const hit = (i) => (hits[i] = "hit");
  const getHits = () => hits;

  //logic for if the boat has sinked
  const isSunk = () => hits.every((x) => x === "hit");

  return { id, length, hit, getHits, isSunk };
};