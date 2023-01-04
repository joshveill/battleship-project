/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factories/gameboard.js":
/*!************************************!*\
  !*** ./src/factories/gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/factories/ship.js");


let Gameboard = () => {
  let isStartAllowed = false;
  let hasStarted = false;
  let board = [];

  // initialize the board (10x10) with a false values
  let init = (() => {
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i].push(false);
      }
    }
  })();

  // place a ship at a specific position
  let placeShip = (pos1, pos2, length, dir) => {
    if (board[pos1][pos2]) return false;
    let ship = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship)(length);
    let shipPos = 0;

    //case of horizontal position
    if (dir === "h") {
      if (pos2 + ship.length > 10) return false;

      // checks if pos is reserved
      for (let i = 0; i < length; i++) {
        if (board[pos1][pos2 + i] === "res") return false;
      }

      for (let i = pos2; i < pos2 + ship.length; i++) {
        board[pos1].splice(i, 1, { ship, shipPos });
        reserveAround(pos1, pos2 + shipPos);
        shipPos++;
      }
    }

    //case of vertical position
    if (dir === "v") {
      // checks if ship overflows the board
      if (pos1 + ship.length > 10) return false;

      // checks if pos is reserved
      for (let i = 0; i < length; i++) {
        if (board[pos1 + i][pos2] === "res") return false;
      }

      for (let i = pos1; i < pos1 + ship.length; i++) {
        board[i].splice(pos2, 1, { ship, shipPos });
        //reserve pos
        reserveAround(pos1 + shipPos, pos2);
        shipPos++;
      }
    }
  };

  // makes tiles around ship "reserved"
  let reserveAround = (pos1, pos2) => {
    function cell(n1, n2) {
      if (pos1 + n1 > 9 || pos1 + n1 < 0) return;
      if (board[pos1 + n1][pos2 + n2] === false)
        board[pos1 + n1][pos2 + n2] = "res";
    }
    function reserveCell(resCell) {
      cell(resCell, -1);
      cell(resCell, 0);
      cell(resCell, 1);
    }
    reserveCell(-1);
    reserveCell(0);
    reserveCell(1);
  };

  // calls ship.hit() on specific pos, returns pos if ship missed
  let receiveAttack = (pos1, pos2) => {
    if (board[pos1][pos2] === "miss") return false;
    if (
      typeof board[pos1][pos2] == "object" &&
      board[pos1][pos2].ship.boatHitMap[board[pos1][pos2].shipPos] === "hit"
    )
      return false;

    if (!board[pos1][pos2] || board[pos1][pos2] === "res") {
      board[pos1][pos2] = "miss";
      return board[pos1][pos2];
    } else {
      board[pos1][pos2].ship.hit(board[pos1][pos2].shipPos);
      return board[pos1][pos2].ship.boatHitMap[board[pos1][pos2].shipPos];
    }
  };

  // calls Ship.isSunk to return if ship at pos is sunk
  let isSunk = (pos1, pos2) => {
    return board[pos1][pos2].ship.isSunk() === true ? true : false;
  };
  // returns true if all ships on the board sunk
  let areAllSunk = (board) => {
    let notSunk = false;
    for (let i = 0; i < 10; i++)
      board[i].forEach((e) => {
        if (!e || e === "miss" || e === "res") return;
        if (e.ship.isSunk() === false) notSunk = true;
      });
    return notSunk === true ? false : true;
  };

  return {
    board,
    placeShip,
    receiveAttack,
    isSunk,
    areAllSunk,
    isStartAllowed: {
      get: function () {
        return isStartAllowed;
      },
      set: function (value) {
        isStartAllowed = value;
      },
    },
    hasStarted: {
      get: function () {
        return hasStarted;
      },
      set: function (value) {
        hasStarted = value;
      },
    },
  };
};




/***/ }),

/***/ "./src/factories/ship.js":
/*!*******************************!*\
  !*** ./src/factories/ship.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factories_ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/ship.js */ "./src/factories/ship.js");
/* harmony import */ var _factories_gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/gameboard.js */ "./src/factories/gameboard.js");



let g = (0,_factories_gameboard_js__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();

g.placeShip(2, 2, 4, "h");

g.receiveAttack(2, 3);

console.log(g.board);


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsZUFBZSw4Q0FBSTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBOztBQUVBLHlCQUF5Qix3QkFBd0I7QUFDakQsbUNBQW1DLGVBQWU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBOztBQUVBLHlCQUF5Qix3QkFBd0I7QUFDakQsbUNBQW1DLGVBQWU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOztBQUVxQjs7Ozs7Ozs7Ozs7Ozs7O0FDcklyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUVnQjs7Ozs7OztVQ25CaEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOMkM7QUFDVTs7QUFFckQsUUFBUSxrRUFBUzs7QUFFakI7O0FBRUE7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3QvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3QvLi9zcmMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwLmpzXCI7XG5cbmxldCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGxldCBpc1N0YXJ0QWxsb3dlZCA9IGZhbHNlO1xuICBsZXQgaGFzU3RhcnRlZCA9IGZhbHNlO1xuICBsZXQgYm9hcmQgPSBbXTtcblxuICAvLyBpbml0aWFsaXplIHRoZSBib2FyZCAoMTB4MTApIHdpdGggYSBmYWxzZSB2YWx1ZXNcbiAgbGV0IGluaXQgPSAoKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgYm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBib2FyZFtpXS5wdXNoKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pKCk7XG5cbiAgLy8gcGxhY2UgYSBzaGlwIGF0IGEgc3BlY2lmaWMgcG9zaXRpb25cbiAgbGV0IHBsYWNlU2hpcCA9IChwb3MxLCBwb3MyLCBsZW5ndGgsIGRpcikgPT4ge1xuICAgIGlmIChib2FyZFtwb3MxXVtwb3MyXSkgcmV0dXJuIGZhbHNlO1xuICAgIGxldCBzaGlwID0gU2hpcChsZW5ndGgpO1xuICAgIGxldCBzaGlwUG9zID0gMDtcblxuICAgIC8vY2FzZSBvZiBob3Jpem9udGFsIHBvc2l0aW9uXG4gICAgaWYgKGRpciA9PT0gXCJoXCIpIHtcbiAgICAgIGlmIChwb3MyICsgc2hpcC5sZW5ndGggPiAxMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAvLyBjaGVja3MgaWYgcG9zIGlzIHJlc2VydmVkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZFtwb3MxXVtwb3MyICsgaV0gPT09IFwicmVzXCIpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IHBvczI7IGkgPCBwb3MyICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBib2FyZFtwb3MxXS5zcGxpY2UoaSwgMSwgeyBzaGlwLCBzaGlwUG9zIH0pO1xuICAgICAgICByZXNlcnZlQXJvdW5kKHBvczEsIHBvczIgKyBzaGlwUG9zKTtcbiAgICAgICAgc2hpcFBvcysrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vY2FzZSBvZiB2ZXJ0aWNhbCBwb3NpdGlvblxuICAgIGlmIChkaXIgPT09IFwidlwiKSB7XG4gICAgICAvLyBjaGVja3MgaWYgc2hpcCBvdmVyZmxvd3MgdGhlIGJvYXJkXG4gICAgICBpZiAocG9zMSArIHNoaXAubGVuZ3RoID4gMTApIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gY2hlY2tzIGlmIHBvcyBpcyByZXNlcnZlZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbcG9zMSArIGldW3BvczJdID09PSBcInJlc1wiKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSBwb3MxOyBpIDwgcG9zMSArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm9hcmRbaV0uc3BsaWNlKHBvczIsIDEsIHsgc2hpcCwgc2hpcFBvcyB9KTtcbiAgICAgICAgLy9yZXNlcnZlIHBvc1xuICAgICAgICByZXNlcnZlQXJvdW5kKHBvczEgKyBzaGlwUG9zLCBwb3MyKTtcbiAgICAgICAgc2hpcFBvcysrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBtYWtlcyB0aWxlcyBhcm91bmQgc2hpcCBcInJlc2VydmVkXCJcbiAgbGV0IHJlc2VydmVBcm91bmQgPSAocG9zMSwgcG9zMikgPT4ge1xuICAgIGZ1bmN0aW9uIGNlbGwobjEsIG4yKSB7XG4gICAgICBpZiAocG9zMSArIG4xID4gOSB8fCBwb3MxICsgbjEgPCAwKSByZXR1cm47XG4gICAgICBpZiAoYm9hcmRbcG9zMSArIG4xXVtwb3MyICsgbjJdID09PSBmYWxzZSlcbiAgICAgICAgYm9hcmRbcG9zMSArIG4xXVtwb3MyICsgbjJdID0gXCJyZXNcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVzZXJ2ZUNlbGwocmVzQ2VsbCkge1xuICAgICAgY2VsbChyZXNDZWxsLCAtMSk7XG4gICAgICBjZWxsKHJlc0NlbGwsIDApO1xuICAgICAgY2VsbChyZXNDZWxsLCAxKTtcbiAgICB9XG4gICAgcmVzZXJ2ZUNlbGwoLTEpO1xuICAgIHJlc2VydmVDZWxsKDApO1xuICAgIHJlc2VydmVDZWxsKDEpO1xuICB9O1xuXG4gIC8vIGNhbGxzIHNoaXAuaGl0KCkgb24gc3BlY2lmaWMgcG9zLCByZXR1cm5zIHBvcyBpZiBzaGlwIG1pc3NlZFxuICBsZXQgcmVjZWl2ZUF0dGFjayA9IChwb3MxLCBwb3MyKSA9PiB7XG4gICAgaWYgKGJvYXJkW3BvczFdW3BvczJdID09PSBcIm1pc3NcIikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiBib2FyZFtwb3MxXVtwb3MyXSA9PSBcIm9iamVjdFwiICYmXG4gICAgICBib2FyZFtwb3MxXVtwb3MyXS5zaGlwLmJvYXRIaXRNYXBbYm9hcmRbcG9zMV1bcG9zMl0uc2hpcFBvc10gPT09IFwiaGl0XCJcbiAgICApXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoIWJvYXJkW3BvczFdW3BvczJdIHx8IGJvYXJkW3BvczFdW3BvczJdID09PSBcInJlc1wiKSB7XG4gICAgICBib2FyZFtwb3MxXVtwb3MyXSA9IFwibWlzc1wiO1xuICAgICAgcmV0dXJuIGJvYXJkW3BvczFdW3BvczJdO1xuICAgIH0gZWxzZSB7XG4gICAgICBib2FyZFtwb3MxXVtwb3MyXS5zaGlwLmhpdChib2FyZFtwb3MxXVtwb3MyXS5zaGlwUG9zKTtcbiAgICAgIHJldHVybiBib2FyZFtwb3MxXVtwb3MyXS5zaGlwLmJvYXRIaXRNYXBbYm9hcmRbcG9zMV1bcG9zMl0uc2hpcFBvc107XG4gICAgfVxuICB9O1xuXG4gIC8vIGNhbGxzIFNoaXAuaXNTdW5rIHRvIHJldHVybiBpZiBzaGlwIGF0IHBvcyBpcyBzdW5rXG4gIGxldCBpc1N1bmsgPSAocG9zMSwgcG9zMikgPT4ge1xuICAgIHJldHVybiBib2FyZFtwb3MxXVtwb3MyXS5zaGlwLmlzU3VuaygpID09PSB0cnVlID8gdHJ1ZSA6IGZhbHNlO1xuICB9O1xuICAvLyByZXR1cm5zIHRydWUgaWYgYWxsIHNoaXBzIG9uIHRoZSBib2FyZCBzdW5rXG4gIGxldCBhcmVBbGxTdW5rID0gKGJvYXJkKSA9PiB7XG4gICAgbGV0IG5vdFN1bmsgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspXG4gICAgICBib2FyZFtpXS5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgIGlmICghZSB8fCBlID09PSBcIm1pc3NcIiB8fCBlID09PSBcInJlc1wiKSByZXR1cm47XG4gICAgICAgIGlmIChlLnNoaXAuaXNTdW5rKCkgPT09IGZhbHNlKSBub3RTdW5rID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIHJldHVybiBub3RTdW5rID09PSB0cnVlID8gZmFsc2UgOiB0cnVlO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYm9hcmQsXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgaXNTdW5rLFxuICAgIGFyZUFsbFN1bmssXG4gICAgaXNTdGFydEFsbG93ZWQ6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaXNTdGFydEFsbG93ZWQ7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaXNTdGFydEFsbG93ZWQgPSB2YWx1ZTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBoYXNTdGFydGVkOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGhhc1N0YXJ0ZWQ7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaGFzU3RhcnRlZCA9IHZhbHVlO1xuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJjb25zdCBTaGlwID0gKGwpID0+IHtcbiAgLy9wcm9wZXJ0aWVzXG4gIGNvbnN0IGxlbmd0aCA9IGw7XG4gIGxldCBib2F0SGl0TWFwID0gWy4uLkFycmF5KGwpLmtleXMoKV07XG5cbiAgbGV0IGRvbVRhcmdldHMgPSBbXTtcblxuICAvLyByZXBsYWNlIGhpdCBwb3MgYnkgXCJoaXRcIlxuICBsZXQgaGl0ID0gKHBvcykgPT4ge1xuICAgIGlmIChib2F0SGl0TWFwW3Bvc10gPT0gXCJoaXRcIikgcmV0dXJuIGZhbHNlO1xuICAgIGJvYXRIaXRNYXAuc3BsaWNlKHBvcywgMSwgXCJoaXRcIik7XG4gIH07XG5cbiAgLy8gY2hlY2tzIGlmIHNoaXAgaXMgc3Vua1xuICBsZXQgaXNTdW5rID0gKCkgPT4gYm9hdEhpdE1hcC5ldmVyeSgoeCkgPT4geCA9PT0gXCJoaXRcIik7XG5cbiAgcmV0dXJuIHsgYm9hdEhpdE1hcCwgbGVuZ3RoLCBoaXQsIGlzU3VuaywgZG9tVGFyZ2V0cyB9O1xufTtcblxuZXhwb3J0IHsgU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vZmFjdG9yaWVzL3NoaXAuanNcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanNcIjtcblxubGV0IGcgPSBHYW1lYm9hcmQoKTtcblxuZy5wbGFjZVNoaXAoMiwgMiwgNCwgXCJoXCIpO1xuXG5nLnJlY2VpdmVBdHRhY2soMiwgMyk7XG5cbmNvbnNvbGUubG9nKGcuYm9hcmQpO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=