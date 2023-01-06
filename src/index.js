import { Ship } from "./factories/ship.js";
import { Gameboard } from "./factories/gameboard.js";

let g = Gameboard();
console.log(g);
g.placeShip(2, 2, 4, "h");

g.receiveAttack(2, 3);

console.log(g.board);
