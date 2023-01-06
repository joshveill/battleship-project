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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsZUFBZSw4Q0FBSTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBOztBQUVBLHlCQUF5Qix3QkFBd0I7QUFDakQsbUNBQW1DLGVBQWU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBOztBQUVBLHlCQUF5Qix3QkFBd0I7QUFDakQsbUNBQW1DLGVBQWU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTs7QUFFcUI7Ozs7Ozs7Ozs7Ozs7OztBQ3RJckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFZ0I7Ozs7Ozs7VUNuQmhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjJDO0FBQ1U7O0FBRXJELFFBQVEsa0VBQVM7QUFDakI7QUFDQTs7QUFFQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC8uL3NyYy9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC8uL3NyYy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXAuanNcIjtcblxubGV0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgbGV0IGlzU3RhcnRBbGxvd2VkID0gZmFsc2U7XG4gIGxldCBoYXNTdGFydGVkID0gZmFsc2U7XG4gIGxldCBib2FyZCA9IFtdO1xuXG4gIC8vIGluaXRpYWxpemUgdGhlIGJvYXJkICgxMHgxMCkgd2l0aCBhIGZhbHNlIHZhbHVlc1xuICBsZXQgaW5pdCA9ICgoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBib2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGJvYXJkW2ldLnB1c2goZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSkoKTtcblxuICAvLyBwbGFjZSBhIHNoaXAgYXQgYSBzcGVjaWZpYyBwb3NpdGlvblxuICBsZXQgcGxhY2VTaGlwID0gKHBvczEsIHBvczIsIGxlbmd0aCwgZGlyKSA9PiB7XG4gICAgaWYgKGJvYXJkW3BvczFdW3BvczJdKSByZXR1cm4gZmFsc2U7XG4gICAgbGV0IHNoaXAgPSBTaGlwKGxlbmd0aCk7XG4gICAgbGV0IHNoaXBQb3MgPSAwO1xuXG4gICAgLy9jYXNlIG9mIGhvcml6b250YWwgcG9zaXRpb25cbiAgICBpZiAoZGlyID09PSBcImhcIikge1xuICAgICAgaWYgKHBvczIgKyBzaGlwLmxlbmd0aCA+IDEwKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIC8vIGNoZWNrcyBpZiBwb3MgaXMgcmVzZXJ2ZWRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW3BvczFdW3BvczIgKyBpXSA9PT0gXCJyZXNcIikgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gcG9zMjsgaSA8IHBvczIgKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJvYXJkW3BvczFdLnNwbGljZShpLCAxLCB7IHNoaXAsIHNoaXBQb3MgfSk7XG4gICAgICAgIHJlc2VydmVBcm91bmQocG9zMSwgcG9zMiArIHNoaXBQb3MpO1xuICAgICAgICBzaGlwUG9zKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9jYXNlIG9mIHZlcnRpY2FsIHBvc2l0aW9uXG4gICAgaWYgKGRpciA9PT0gXCJ2XCIpIHtcbiAgICAgIC8vIGNoZWNrcyBpZiBzaGlwIG92ZXJmbG93cyB0aGUgYm9hcmRcbiAgICAgIGlmIChwb3MxICsgc2hpcC5sZW5ndGggPiAxMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAvLyBjaGVja3MgaWYgcG9zIGlzIHJlc2VydmVkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZFtwb3MxICsgaV1bcG9zMl0gPT09IFwicmVzXCIpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IHBvczE7IGkgPCBwb3MxICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBib2FyZFtpXS5zcGxpY2UocG9zMiwgMSwgeyBzaGlwLCBzaGlwUG9zIH0pO1xuICAgICAgICAvL3Jlc2VydmUgcG9zXG4gICAgICAgIHJlc2VydmVBcm91bmQocG9zMSArIHNoaXBQb3MsIHBvczIpO1xuICAgICAgICBzaGlwUG9zKys7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIG1ha2VzIHRpbGVzIGFyb3VuZCBzaGlwIFwicmVzZXJ2ZWRcIlxuICBsZXQgcmVzZXJ2ZUFyb3VuZCA9IChwb3MxLCBwb3MyKSA9PiB7XG4gICAgZnVuY3Rpb24gY2VsbChuMSwgbjIpIHtcbiAgICAgIGlmIChwb3MxICsgbjEgPiA5IHx8IHBvczEgKyBuMSA8IDApIHJldHVybjtcbiAgICAgIGlmIChib2FyZFtwb3MxICsgbjFdW3BvczIgKyBuMl0gPT09IGZhbHNlKVxuICAgICAgICBib2FyZFtwb3MxICsgbjFdW3BvczIgKyBuMl0gPSBcInJlc1wiO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXNlcnZlQ2VsbChyZXNDZWxsKSB7XG4gICAgICBjZWxsKHJlc0NlbGwsIC0xKTtcbiAgICAgIGNlbGwocmVzQ2VsbCwgMCk7XG4gICAgICBjZWxsKHJlc0NlbGwsIDEpO1xuICAgIH1cbiAgICByZXNlcnZlQ2VsbCgtMSk7XG4gICAgcmVzZXJ2ZUNlbGwoMCk7XG4gICAgcmVzZXJ2ZUNlbGwoMSk7XG4gIH07XG5cbiAgLy8gY2FsbHMgc2hpcC5oaXQoKSBvbiBzcGVjaWZpYyBwb3MsIHJldHVybnMgcG9zIGlmIHNoaXAgbWlzc2VkXG4gIGxldCByZWNlaXZlQXR0YWNrID0gKHBvczEsIHBvczIpID0+IHtcbiAgICBpZiAoYm9hcmRbcG9zMV1bcG9zMl0gPT09IFwibWlzc1wiKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKFxuICAgICAgdHlwZW9mIGJvYXJkW3BvczFdW3BvczJdID09IFwib2JqZWN0XCIgJiZcbiAgICAgIGJvYXJkW3BvczFdW3BvczJdLnNoaXAuYm9hdEhpdE1hcFtib2FyZFtwb3MxXVtwb3MyXS5zaGlwUG9zXSA9PT0gXCJoaXRcIlxuICAgIClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGlmICghYm9hcmRbcG9zMV1bcG9zMl0gfHwgYm9hcmRbcG9zMV1bcG9zMl0gPT09IFwicmVzXCIpIHtcbiAgICAgIGJvYXJkW3BvczFdW3BvczJdID0gXCJtaXNzXCI7XG4gICAgICByZXR1cm4gYm9hcmRbcG9zMV1bcG9zMl07XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvYXJkW3BvczFdW3BvczJdLnNoaXAuaGl0KGJvYXJkW3BvczFdW3BvczJdLnNoaXBQb3MpO1xuICAgICAgcmV0dXJuIGJvYXJkW3BvczFdW3BvczJdLnNoaXAuYm9hdEhpdE1hcFtib2FyZFtwb3MxXVtwb3MyXS5zaGlwUG9zXTtcbiAgICB9XG4gIH07XG5cbiAgLy8gY2FsbHMgU2hpcC5pc1N1bmsgdG8gcmV0dXJuIGlmIHNoaXAgYXQgcG9zIGlzIHN1bmtcbiAgbGV0IGlzU3VuayA9IChwb3MxLCBwb3MyKSA9PiB7XG4gICAgcmV0dXJuIGJvYXJkW3BvczFdW3BvczJdLnNoaXAuaXNTdW5rKCkgPT09IHRydWUgPyB0cnVlIDogZmFsc2U7XG4gIH07XG5cbiAgLy8gcmV0dXJucyB0cnVlIGlmIGFsbCBzaGlwcyBvbiB0aGUgYm9hcmQgc3Vua1xuICBsZXQgYXJlQWxsU3VuayA9IChib2FyZCkgPT4ge1xuICAgIGxldCBub3RTdW5rID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKVxuICAgICAgYm9hcmRbaV0uZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICBpZiAoIWUgfHwgZSA9PT0gXCJtaXNzXCIgfHwgZSA9PT0gXCJyZXNcIikgcmV0dXJuO1xuICAgICAgICBpZiAoZS5zaGlwLmlzU3VuaygpID09PSBmYWxzZSkgbm90U3VuayA9IHRydWU7XG4gICAgICB9KTtcbiAgICByZXR1cm4gbm90U3VuayA9PT0gdHJ1ZSA/IGZhbHNlIDogdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGJvYXJkLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGlzU3VuayxcbiAgICBhcmVBbGxTdW5rLFxuICAgIGlzU3RhcnRBbGxvd2VkOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlzU3RhcnRBbGxvd2VkO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlzU3RhcnRBbGxvd2VkID0gdmFsdWU7XG4gICAgICB9LFxuICAgIH0sXG4gICAgaGFzU3RhcnRlZDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBoYXNTdGFydGVkO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGhhc1N0YXJ0ZWQgPSB2YWx1ZTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9O1xuIiwiY29uc3QgU2hpcCA9IChsKSA9PiB7XG4gIC8vcHJvcGVydGllc1xuICBjb25zdCBsZW5ndGggPSBsO1xuICBsZXQgYm9hdEhpdE1hcCA9IFsuLi5BcnJheShsKS5rZXlzKCldO1xuXG4gIGxldCBkb21UYXJnZXRzID0gW107XG5cbiAgLy8gcmVwbGFjZSBoaXQgcG9zIGJ5IFwiaGl0XCJcbiAgbGV0IGhpdCA9IChwb3MpID0+IHtcbiAgICBpZiAoYm9hdEhpdE1hcFtwb3NdID09IFwiaGl0XCIpIHJldHVybiBmYWxzZTtcbiAgICBib2F0SGl0TWFwLnNwbGljZShwb3MsIDEsIFwiaGl0XCIpO1xuICB9O1xuXG4gIC8vIGNoZWNrcyBpZiBzaGlwIGlzIHN1bmtcbiAgbGV0IGlzU3VuayA9ICgpID0+IGJvYXRIaXRNYXAuZXZlcnkoKHgpID0+IHggPT09IFwiaGl0XCIpO1xuXG4gIHJldHVybiB7IGJvYXRIaXRNYXAsIGxlbmd0aCwgaGl0LCBpc1N1bmssIGRvbVRhcmdldHMgfTtcbn07XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL2ZhY3Rvcmllcy9zaGlwLmpzXCI7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzXCI7XG5cbmxldCBnID0gR2FtZWJvYXJkKCk7XG5jb25zb2xlLmxvZyhnKTtcbmcucGxhY2VTaGlwKDIsIDIsIDQsIFwiaFwiKTtcblxuZy5yZWNlaXZlQXR0YWNrKDIsIDMpO1xuXG5jb25zb2xlLmxvZyhnLmJvYXJkKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==