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
console.log(g);

g.placeShip(2, 2, 4, "h");

g.receiveAttack(2, 3);

console.log(g.board);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsZUFBZSw4Q0FBSTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBOztBQUVBLHlCQUF5Qix3QkFBd0I7QUFDakQsbUNBQW1DLGVBQWU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBOztBQUVBLHlCQUF5Qix3QkFBd0I7QUFDakQsbUNBQW1DLGVBQWU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTs7QUFFcUI7Ozs7Ozs7Ozs7Ozs7OztBQ3RJckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFZ0I7Ozs7Ozs7VUNuQmhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjJDO0FBQ1U7O0FBRXJELFFBQVEsa0VBQVM7QUFDakI7O0FBRUE7O0FBRUE7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3QvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3QvLi9zcmMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwLmpzXCI7XG5cbmxldCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGxldCBpc1N0YXJ0QWxsb3dlZCA9IGZhbHNlO1xuICBsZXQgaGFzU3RhcnRlZCA9IGZhbHNlO1xuICBsZXQgYm9hcmQgPSBbXTtcblxuICAvLyBpbml0aWFsaXplIHRoZSBib2FyZCAoMTB4MTApIHdpdGggYSBmYWxzZSB2YWx1ZXNcbiAgbGV0IGluaXQgPSAoKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgYm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBib2FyZFtpXS5wdXNoKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pKCk7XG5cbiAgLy8gcGxhY2UgYSBzaGlwIGF0IGEgc3BlY2lmaWMgcG9zaXRpb25cbiAgbGV0IHBsYWNlU2hpcCA9IChwb3MxLCBwb3MyLCBsZW5ndGgsIGRpcikgPT4ge1xuICAgIGlmIChib2FyZFtwb3MxXVtwb3MyXSkgcmV0dXJuIGZhbHNlO1xuICAgIGxldCBzaGlwID0gU2hpcChsZW5ndGgpO1xuICAgIGxldCBzaGlwUG9zID0gMDtcblxuICAgIC8vY2FzZSBvZiBob3Jpem9udGFsIHBvc2l0aW9uXG4gICAgaWYgKGRpciA9PT0gXCJoXCIpIHtcbiAgICAgIGlmIChwb3MyICsgc2hpcC5sZW5ndGggPiAxMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAvLyBjaGVja3MgaWYgcG9zIGlzIHJlc2VydmVkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZFtwb3MxXVtwb3MyICsgaV0gPT09IFwicmVzXCIpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IHBvczI7IGkgPCBwb3MyICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBib2FyZFtwb3MxXS5zcGxpY2UoaSwgMSwgeyBzaGlwLCBzaGlwUG9zIH0pO1xuICAgICAgICByZXNlcnZlQXJvdW5kKHBvczEsIHBvczIgKyBzaGlwUG9zKTtcbiAgICAgICAgc2hpcFBvcysrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vY2FzZSBvZiB2ZXJ0aWNhbCBwb3NpdGlvblxuICAgIGlmIChkaXIgPT09IFwidlwiKSB7XG4gICAgICAvLyBjaGVja3MgaWYgc2hpcCBvdmVyZmxvd3MgdGhlIGJvYXJkXG4gICAgICBpZiAocG9zMSArIHNoaXAubGVuZ3RoID4gMTApIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gY2hlY2tzIGlmIHBvcyBpcyByZXNlcnZlZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbcG9zMSArIGldW3BvczJdID09PSBcInJlc1wiKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSBwb3MxOyBpIDwgcG9zMSArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm9hcmRbaV0uc3BsaWNlKHBvczIsIDEsIHsgc2hpcCwgc2hpcFBvcyB9KTtcbiAgICAgICAgLy9yZXNlcnZlIHBvc1xuICAgICAgICByZXNlcnZlQXJvdW5kKHBvczEgKyBzaGlwUG9zLCBwb3MyKTtcbiAgICAgICAgc2hpcFBvcysrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBtYWtlcyB0aWxlcyBhcm91bmQgc2hpcCBcInJlc2VydmVkXCJcbiAgbGV0IHJlc2VydmVBcm91bmQgPSAocG9zMSwgcG9zMikgPT4ge1xuICAgIGZ1bmN0aW9uIGNlbGwobjEsIG4yKSB7XG4gICAgICBpZiAocG9zMSArIG4xID4gOSB8fCBwb3MxICsgbjEgPCAwKSByZXR1cm47XG4gICAgICBpZiAoYm9hcmRbcG9zMSArIG4xXVtwb3MyICsgbjJdID09PSBmYWxzZSlcbiAgICAgICAgYm9hcmRbcG9zMSArIG4xXVtwb3MyICsgbjJdID0gXCJyZXNcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVzZXJ2ZUNlbGwocmVzQ2VsbCkge1xuICAgICAgY2VsbChyZXNDZWxsLCAtMSk7XG4gICAgICBjZWxsKHJlc0NlbGwsIDApO1xuICAgICAgY2VsbChyZXNDZWxsLCAxKTtcbiAgICB9XG4gICAgcmVzZXJ2ZUNlbGwoLTEpO1xuICAgIHJlc2VydmVDZWxsKDApO1xuICAgIHJlc2VydmVDZWxsKDEpO1xuICB9O1xuXG4gIC8vIGNhbGxzIHNoaXAuaGl0KCkgb24gc3BlY2lmaWMgcG9zLCByZXR1cm5zIHBvcyBpZiBzaGlwIG1pc3NlZFxuICBsZXQgcmVjZWl2ZUF0dGFjayA9IChwb3MxLCBwb3MyKSA9PiB7XG4gICAgaWYgKGJvYXJkW3BvczFdW3BvczJdID09PSBcIm1pc3NcIikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiBib2FyZFtwb3MxXVtwb3MyXSA9PSBcIm9iamVjdFwiICYmXG4gICAgICBib2FyZFtwb3MxXVtwb3MyXS5zaGlwLmJvYXRIaXRNYXBbYm9hcmRbcG9zMV1bcG9zMl0uc2hpcFBvc10gPT09IFwiaGl0XCJcbiAgICApXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoIWJvYXJkW3BvczFdW3BvczJdIHx8IGJvYXJkW3BvczFdW3BvczJdID09PSBcInJlc1wiKSB7XG4gICAgICBib2FyZFtwb3MxXVtwb3MyXSA9IFwibWlzc1wiO1xuICAgICAgcmV0dXJuIGJvYXJkW3BvczFdW3BvczJdO1xuICAgIH0gZWxzZSB7XG4gICAgICBib2FyZFtwb3MxXVtwb3MyXS5zaGlwLmhpdChib2FyZFtwb3MxXVtwb3MyXS5zaGlwUG9zKTtcbiAgICAgIHJldHVybiBib2FyZFtwb3MxXVtwb3MyXS5zaGlwLmJvYXRIaXRNYXBbYm9hcmRbcG9zMV1bcG9zMl0uc2hpcFBvc107XG4gICAgfVxuICB9O1xuXG4gIC8vIGNhbGxzIFNoaXAuaXNTdW5rIHRvIHJldHVybiBpZiBzaGlwIGF0IHBvcyBpcyBzdW5rXG4gIGxldCBpc1N1bmsgPSAocG9zMSwgcG9zMikgPT4ge1xuICAgIHJldHVybiBib2FyZFtwb3MxXVtwb3MyXS5zaGlwLmlzU3VuaygpID09PSB0cnVlID8gdHJ1ZSA6IGZhbHNlO1xuICB9O1xuXG4gIC8vIHJldHVybnMgdHJ1ZSBpZiBhbGwgc2hpcHMgb24gdGhlIGJvYXJkIHN1bmtcbiAgbGV0IGFyZUFsbFN1bmsgPSAoYm9hcmQpID0+IHtcbiAgICBsZXQgbm90U3VuayA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKylcbiAgICAgIGJvYXJkW2ldLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgaWYgKCFlIHx8IGUgPT09IFwibWlzc1wiIHx8IGUgPT09IFwicmVzXCIpIHJldHVybjtcbiAgICAgICAgaWYgKGUuc2hpcC5pc1N1bmsoKSA9PT0gZmFsc2UpIG5vdFN1bmsgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIG5vdFN1bmsgPT09IHRydWUgPyBmYWxzZSA6IHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBib2FyZCxcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBpc1N1bmssXG4gICAgYXJlQWxsU3VuayxcbiAgICBpc1N0YXJ0QWxsb3dlZDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpc1N0YXJ0QWxsb3dlZDtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpc1N0YXJ0QWxsb3dlZCA9IHZhbHVlO1xuICAgICAgfSxcbiAgICB9LFxuICAgIGhhc1N0YXJ0ZWQ6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaGFzU3RhcnRlZDtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBoYXNTdGFydGVkID0gdmFsdWU7XG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsImNvbnN0IFNoaXAgPSAobCkgPT4ge1xuICAvL3Byb3BlcnRpZXNcbiAgY29uc3QgbGVuZ3RoID0gbDtcbiAgbGV0IGJvYXRIaXRNYXAgPSBbLi4uQXJyYXkobCkua2V5cygpXTtcblxuICBsZXQgZG9tVGFyZ2V0cyA9IFtdO1xuXG4gIC8vIHJlcGxhY2UgaGl0IHBvcyBieSBcImhpdFwiXG4gIGxldCBoaXQgPSAocG9zKSA9PiB7XG4gICAgaWYgKGJvYXRIaXRNYXBbcG9zXSA9PSBcImhpdFwiKSByZXR1cm4gZmFsc2U7XG4gICAgYm9hdEhpdE1hcC5zcGxpY2UocG9zLCAxLCBcImhpdFwiKTtcbiAgfTtcblxuICAvLyBjaGVja3MgaWYgc2hpcCBpcyBzdW5rXG4gIGxldCBpc1N1bmsgPSAoKSA9PiBib2F0SGl0TWFwLmV2ZXJ5KCh4KSA9PiB4ID09PSBcImhpdFwiKTtcblxuICByZXR1cm4geyBib2F0SGl0TWFwLCBsZW5ndGgsIGhpdCwgaXNTdW5rLCBkb21UYXJnZXRzIH07XG59O1xuXG5leHBvcnQgeyBTaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9mYWN0b3JpZXMvc2hpcC5qc1wiO1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZmFjdG9yaWVzL2dhbWVib2FyZC5qc1wiO1xuXG5sZXQgZyA9IEdhbWVib2FyZCgpO1xuY29uc29sZS5sb2coZyk7XG5cbmcucGxhY2VTaGlwKDIsIDIsIDQsIFwiaFwiKTtcblxuZy5yZWNlaXZlQXR0YWNrKDIsIDMpO1xuXG5jb25zb2xlLmxvZyhnLmJvYXJkKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==