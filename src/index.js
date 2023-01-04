import { Ship } from "./factories/ship.js";
import { Gameboard } from "./factories/gameboard.js";

let g = Gameboard();

g.placeShip(4, 4, 4, "h");
console.log(g.board[4][4]);

console.log(g.board[4][4]);
console.log(g.board[4][5]);
console.log(g.board[4][6]);
console.log(g.board[4][7]);

console.log(g.board);
