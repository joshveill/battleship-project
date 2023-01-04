import { Gameboard } from "../factories/gameboard";

test("creates gameboard of 10x10", () => {
  let g = Gameboard();
  expect(g.board.length && g.board[0].length).toBe(10);
});
//placeShip
test("returns false if there's already a ship", () => {
  let g = Gameboard();
  g.placeShip(0, 0, 2, "h");
  expect(g.placeShip(0, 1, 2, "h")).toBe(false);
});

//truthy value at ship position
test("place horizontal ship of length 1 at pos 0,0", () => {
  let g = Gameboard();
  g.placeShip(0, 0, 1, "h");
  expect(g.board[0][0]).toBeTruthy();
});
//test
test("place horizontal ship of length 4 at pos 4,4", () => {
  let g = Gameboard();
  g.placeShip(4, 4, 4, "h");
  expect(
    g.board[4][4] && g.board[4][5] && g.board[4][6] && g.board[4][7]
  ).toBeTruthy();
});
