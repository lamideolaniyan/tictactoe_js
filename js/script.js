/*
GAME CONTROLLER
*/

const gameController = (function () {
  const gameBoard = ['', '', '', '', '', '', '', '', ''];

  return {
    gameBoard,
    storeMarker(id, marker) {
      gameBoard[id] = marker;
      console.log(gameBoard);
    },
  };
})();

/*
DISPLAY CONTROLLER
*/

const displayController = (function () {
  let currentPlayer;
  const dom = {
    cell: document.querySelectorAll('.cell'),
    board: document.querySelector('.board'),
  };

  return {
    dom,
    getMarker() {
      return currentPlayer;
    },

    changePlayer(marker) {
      if (currentPlayer === 'X') {
        currentPlayer = 'O';
      } else {
        currentPlayer = 'X';
      }
      return currentPlayer;
    },

    renderCells(board, cell, id) {
      cell.textContent = board[id];
    },
  };
})();

/*
OVERALL APP CONTROLLER
*/

const appController = (function (gameCtrl, displayCtrl) {
  let cellNum;
  const dom = displayCtrl.dom;

  dom.board.addEventListener('click', (e) => {
    if (e.target.matches('.cell')) {
      const cell = e.target;
      const board = gameCtrl.gameBoard;
      const id = parseInt(e.target.dataset.id);
      //console.log(cell);

      // Get marker
      //const marker = displayCtrl.getMarker();

      // Change Player
      const marker = displayCtrl.changePlayer();

      // Store marker in clicked position in data structure
      gameCtrl.storeMarker(id, marker);

      // Render cells on board
      displayCtrl.renderCells(board, cell, id);
    }
  });

  window.addEventListener('load', (e) => {
    const cellArr = Array.from(dom.cell);
    cellArr.forEach((el) => (el.textContent = ''));
  });
})(gameController, displayController);

/**
 * Get player marker
 * Store player marker in data structure
 * Display marker on clicked tile
 *
 */
