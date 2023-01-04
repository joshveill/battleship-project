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
        reserveAround(pos1 + shipPos, pos2); //reserve pos
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
    function reserveCell(row) {
      cell(row, -1);
      cell(row, 0);
      cell(row, 1);
    }
    reserveCell(-1);
    reserveCell(0);
    reserveCell(1);
  };

  // calls ship.hit() on specific POS, returns POS if ship missed
  let receiveAttack = (pos1, pos2) => {
    if (board[pos1][pos2] === "miss") return false;
    if (
      typeof board[pos1][pos2] == "object" &&
      board[pos1][pos2].ship.tiles[board[pos1][pos2].shipPos] === "hit"
    )
      return false;

    if (!board[pos1][pos2] || board[pos1][pos2] === "res") {
      board[pos1][pos2] = "miss";
      return board[pos1][pos2];
    } else {
      board[pos1][pos2].ship.hit(board[pos1][pos2].shipPos);
      return board[pos1][pos2].ship.tiles[board[pos1][pos2].shipPos];
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

g.placeShip(4, 4, 4, "h");
console.log(g.board[4][4]);

console.log(g.board[4][4]);
console.log(g.board[4][5]);
console.log(g.board[4][6]);
console.log(g.board[4][7]);

console.log(g.board);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsZUFBZSw4Q0FBSTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBOztBQUVBLHlCQUF5Qix3QkFBd0I7QUFDakQsbUNBQW1DLGVBQWU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBOztBQUVBLHlCQUF5Qix3QkFBd0I7QUFDakQsbUNBQW1DLGVBQWU7QUFDbEQsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7O0FBRXFCOzs7Ozs7Ozs7Ozs7Ozs7QUNuSXJCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRWdCOzs7Ozs7O1VDbkJoQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ04yQztBQUNVOztBQUVyRCxRQUFRLGtFQUFTOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0Ly4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1wcm9qZWN0Ly4vc3JjL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAtcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vc2hpcC5qc1wiO1xuXG5sZXQgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBsZXQgaXNTdGFydEFsbG93ZWQgPSBmYWxzZTtcbiAgbGV0IGhhc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgbGV0IGJvYXJkID0gW107XG5cbiAgLy8gaW5pdGlhbGl6ZSB0aGUgYm9hcmQgKDEweDEwKSB3aXRoIGEgZmFsc2UgdmFsdWVzXG4gIGxldCBpbml0ID0gKCgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGJvYXJkW2ldID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgYm9hcmRbaV0ucHVzaChmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9KSgpO1xuXG4gIC8vIHBsYWNlIGEgc2hpcCBhdCBhIHNwZWNpZmljIHBvc2l0aW9uXG4gIGxldCBwbGFjZVNoaXAgPSAocG9zMSwgcG9zMiwgbGVuZ3RoLCBkaXIpID0+IHtcbiAgICBpZiAoYm9hcmRbcG9zMV1bcG9zMl0pIHJldHVybiBmYWxzZTtcbiAgICBsZXQgc2hpcCA9IFNoaXAobGVuZ3RoKTtcbiAgICBsZXQgc2hpcFBvcyA9IDA7XG5cbiAgICAvL2Nhc2Ugb2YgaG9yaXpvbnRhbCBwb3NpdGlvblxuICAgIGlmIChkaXIgPT09IFwiaFwiKSB7XG4gICAgICBpZiAocG9zMiArIHNoaXAubGVuZ3RoID4gMTApIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gY2hlY2tzIGlmIHBvcyBpcyByZXNlcnZlZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbcG9zMV1bcG9zMiArIGldID09PSBcInJlc1wiKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSBwb3MyOyBpIDwgcG9zMiArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm9hcmRbcG9zMV0uc3BsaWNlKGksIDEsIHsgc2hpcCwgc2hpcFBvcyB9KTtcbiAgICAgICAgcmVzZXJ2ZUFyb3VuZChwb3MxLCBwb3MyICsgc2hpcFBvcyk7XG4gICAgICAgIHNoaXBQb3MrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL2Nhc2Ugb2YgdmVydGljYWwgcG9zaXRpb25cbiAgICBpZiAoZGlyID09PSBcInZcIikge1xuICAgICAgLy8gY2hlY2tzIGlmIHNoaXAgb3ZlcmZsb3dzIHRoZSBib2FyZFxuICAgICAgaWYgKHBvczEgKyBzaGlwLmxlbmd0aCA+IDEwKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIC8vIGNoZWNrcyBpZiBwb3MgaXMgcmVzZXJ2ZWRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW3BvczEgKyBpXVtwb3MyXSA9PT0gXCJyZXNcIikgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gcG9zMTsgaSA8IHBvczEgKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJvYXJkW2ldLnNwbGljZShwb3MyLCAxLCB7IHNoaXAsIHNoaXBQb3MgfSk7XG4gICAgICAgIHJlc2VydmVBcm91bmQocG9zMSArIHNoaXBQb3MsIHBvczIpOyAvL3Jlc2VydmUgcG9zXG4gICAgICAgIHNoaXBQb3MrKztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gbWFrZXMgdGlsZXMgYXJvdW5kIHNoaXAgXCJyZXNlcnZlZFwiXG4gIGxldCByZXNlcnZlQXJvdW5kID0gKHBvczEsIHBvczIpID0+IHtcbiAgICBmdW5jdGlvbiBjZWxsKG4xLCBuMikge1xuICAgICAgaWYgKHBvczEgKyBuMSA+IDkgfHwgcG9zMSArIG4xIDwgMCkgcmV0dXJuO1xuICAgICAgaWYgKGJvYXJkW3BvczEgKyBuMV1bcG9zMiArIG4yXSA9PT0gZmFsc2UpXG4gICAgICAgIGJvYXJkW3BvczEgKyBuMV1bcG9zMiArIG4yXSA9IFwicmVzXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc2VydmVDZWxsKHJvdykge1xuICAgICAgY2VsbChyb3csIC0xKTtcbiAgICAgIGNlbGwocm93LCAwKTtcbiAgICAgIGNlbGwocm93LCAxKTtcbiAgICB9XG4gICAgcmVzZXJ2ZUNlbGwoLTEpO1xuICAgIHJlc2VydmVDZWxsKDApO1xuICAgIHJlc2VydmVDZWxsKDEpO1xuICB9O1xuXG4gIC8vIGNhbGxzIHNoaXAuaGl0KCkgb24gc3BlY2lmaWMgUE9TLCByZXR1cm5zIFBPUyBpZiBzaGlwIG1pc3NlZFxuICBsZXQgcmVjZWl2ZUF0dGFjayA9IChwb3MxLCBwb3MyKSA9PiB7XG4gICAgaWYgKGJvYXJkW3BvczFdW3BvczJdID09PSBcIm1pc3NcIikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiBib2FyZFtwb3MxXVtwb3MyXSA9PSBcIm9iamVjdFwiICYmXG4gICAgICBib2FyZFtwb3MxXVtwb3MyXS5zaGlwLnRpbGVzW2JvYXJkW3BvczFdW3BvczJdLnNoaXBQb3NdID09PSBcImhpdFwiXG4gICAgKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKCFib2FyZFtwb3MxXVtwb3MyXSB8fCBib2FyZFtwb3MxXVtwb3MyXSA9PT0gXCJyZXNcIikge1xuICAgICAgYm9hcmRbcG9zMV1bcG9zMl0gPSBcIm1pc3NcIjtcbiAgICAgIHJldHVybiBib2FyZFtwb3MxXVtwb3MyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9hcmRbcG9zMV1bcG9zMl0uc2hpcC5oaXQoYm9hcmRbcG9zMV1bcG9zMl0uc2hpcFBvcyk7XG4gICAgICByZXR1cm4gYm9hcmRbcG9zMV1bcG9zMl0uc2hpcC50aWxlc1tib2FyZFtwb3MxXVtwb3MyXS5zaGlwUG9zXTtcbiAgICB9XG4gIH07XG4gIC8vIGNhbGxzIFNoaXAuaXNTdW5rIHRvIHJldHVybiBpZiBzaGlwIGF0IHBvcyBpcyBzdW5rXG4gIGxldCBpc1N1bmsgPSAocG9zMSwgcG9zMikgPT4ge1xuICAgIHJldHVybiBib2FyZFtwb3MxXVtwb3MyXS5zaGlwLmlzU3VuaygpID09PSB0cnVlID8gdHJ1ZSA6IGZhbHNlO1xuICB9O1xuICAvLyByZXR1cm5zIHRydWUgaWYgYWxsIHNoaXBzIG9uIHRoZSBib2FyZCBzdW5rXG4gIGxldCBhcmVBbGxTdW5rID0gKGJvYXJkKSA9PiB7XG4gICAgbGV0IG5vdFN1bmsgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspXG4gICAgICBib2FyZFtpXS5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgIGlmICghZSB8fCBlID09PSBcIm1pc3NcIiB8fCBlID09PSBcInJlc1wiKSByZXR1cm47XG4gICAgICAgIGlmIChlLnNoaXAuaXNTdW5rKCkgPT09IGZhbHNlKSBub3RTdW5rID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIHJldHVybiBub3RTdW5rID09PSB0cnVlID8gZmFsc2UgOiB0cnVlO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYm9hcmQsXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgaXNTdW5rLFxuICAgIGFyZUFsbFN1bmssXG4gICAgaXNTdGFydEFsbG93ZWQ6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaXNTdGFydEFsbG93ZWQ7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaXNTdGFydEFsbG93ZWQgPSB2YWx1ZTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBoYXNTdGFydGVkOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGhhc1N0YXJ0ZWQ7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaGFzU3RhcnRlZCA9IHZhbHVlO1xuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJjb25zdCBTaGlwID0gKGwpID0+IHtcbiAgLy9wcm9wZXJ0aWVzXG4gIGNvbnN0IGxlbmd0aCA9IGw7XG4gIGxldCBib2F0SGl0TWFwID0gWy4uLkFycmF5KGwpLmtleXMoKV07XG5cbiAgbGV0IGRvbVRhcmdldHMgPSBbXTtcblxuICAvLyByZXBsYWNlIGhpdCBwb3MgYnkgXCJoaXRcIlxuICBsZXQgaGl0ID0gKHBvcykgPT4ge1xuICAgIGlmIChib2F0SGl0TWFwW3Bvc10gPT0gXCJoaXRcIikgcmV0dXJuIGZhbHNlO1xuICAgIGJvYXRIaXRNYXAuc3BsaWNlKHBvcywgMSwgXCJoaXRcIik7XG4gIH07XG5cbiAgLy8gY2hlY2tzIGlmIHNoaXAgaXMgc3Vua1xuICBsZXQgaXNTdW5rID0gKCkgPT4gYm9hdEhpdE1hcC5ldmVyeSgoeCkgPT4geCA9PT0gXCJoaXRcIik7XG5cbiAgcmV0dXJuIHsgYm9hdEhpdE1hcCwgbGVuZ3RoLCBoaXQsIGlzU3VuaywgZG9tVGFyZ2V0cyB9O1xufTtcblxuZXhwb3J0IHsgU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vZmFjdG9yaWVzL3NoaXAuanNcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanNcIjtcblxubGV0IGcgPSBHYW1lYm9hcmQoKTtcblxuZy5wbGFjZVNoaXAoNCwgNCwgNCwgXCJoXCIpO1xuY29uc29sZS5sb2coZy5ib2FyZFs0XVs0XSk7XG5cbmNvbnNvbGUubG9nKGcuYm9hcmRbNF1bNF0pO1xuY29uc29sZS5sb2coZy5ib2FyZFs0XVs1XSk7XG5jb25zb2xlLmxvZyhnLmJvYXJkWzRdWzZdKTtcbmNvbnNvbGUubG9nKGcuYm9hcmRbNF1bN10pO1xuXG5jb25zb2xlLmxvZyhnLmJvYXJkKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==