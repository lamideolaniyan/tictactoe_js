/*
GAME CONTROLLER
*/

const gameController = (function () {
  let gameBoard = ['', '', '', '', '', '', '', '', ''];

  return {
    gameBoard,
    storeMarker(id, marker) {
      gameBoard[id] = marker;
      console.log(gameBoard);
    },

    checkWinner(gamePlaying) {
      if (gameBoard[0] !== '' && gameBoard[0] === gameBoard[3] && gameBoard[0] === gameBoard[6]) {
        gamePlaying = false;
      } else if (gameBoard[0] !== '' && gameBoard[0] === gameBoard[1] && gameBoard[0] === gameBoard[2]) {
        gamePlaying = false;
      } else if (gameBoard[0] !== '' && gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8]) {
        gamePlaying = false;
      } else if (gameBoard[1] !== '' && gameBoard[1] === gameBoard[4] && gameBoard[1] === gameBoard[7]) {
        gamePlaying = false;
      } else if (gameBoard[2] !== '' && gameBoard[2] === gameBoard[5] && gameBoard[2] === gameBoard[8]) {
        gamePlaying = false;
      } else if (gameBoard[2] !== '' && gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6]) {
        gamePlaying = false;
      } else if (gameBoard[3] !== '' && gameBoard[3] === gameBoard[4] && gameBoard[3] === gameBoard[5]) {
        gamePlaying = false;
      } else if (gameBoard[6] !== '' && gameBoard[6] === gameBoard[7] && gameBoard[6] === gameBoard[8]) {
        gamePlaying = false;
      } else if (!gameBoard.includes('')) {
        gamePlaying = false;
      } else {
        gamePlaying = true;
      }

      return gamePlaying;
    },

    resetBoard() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
    },

    test() {
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

    clearBoard() {
      const cellArr = Array.from(dom.cell);
      cellArr.forEach((el) => (el.textContent = ''));
    },
  };
})();

/*
OVERALL APP CONTROLLER
*/

const appController = (function (gameCtrl, displayCtrl) {
  let gamePlaying;
  const dom = displayCtrl.dom;

  dom.board.addEventListener('click', (e) => {
    if (gamePlaying) {
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

        // Check if game has been won or tied
        gamePlaying = gameCtrl.checkWinner(gamePlaying);

        if (!gamePlaying) {
          gameCtrl.resetBoard();
          alert('Gameover!');
        }
      }
    }
  });

  window.addEventListener('load', (e) => {
    gamePlaying = true;
    displayCtrl.clearBoard();
  });
})(gameController, displayController);

/**
 * Get player marker
 * Store player marker in data structure
 * Display marker on clicked tile
 *
 */
