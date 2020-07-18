/*
GAME CONTROLLER
*/

const gameController = (function () {
  let gameBoard = ['', '', '', '', '', '', '', '', ''];

  return {
    gameBoard,
    storeMarker(id, marker) {
      gameBoard[id] = marker;
      //console.log(gameBoard);
    },

    checkWinner(gamePlaying) {
      let winner;
      if (gameBoard[0] !== '' && gameBoard[0] === gameBoard[3] && gameBoard[0] === gameBoard[6]) {
        gamePlaying = false;
        winner = gameBoard[0];
      } else if (gameBoard[0] !== '' && gameBoard[0] === gameBoard[1] && gameBoard[0] === gameBoard[2]) {
        gamePlaying = false;
        winner = gameBoard[0];
      } else if (gameBoard[0] !== '' && gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8]) {
        gamePlaying = false;
        winner = gameBoard[0];
      } else if (gameBoard[1] !== '' && gameBoard[1] === gameBoard[4] && gameBoard[1] === gameBoard[7]) {
        gamePlaying = false;
        winner = gameBoard[1];
      } else if (gameBoard[2] !== '' && gameBoard[2] === gameBoard[5] && gameBoard[2] === gameBoard[8]) {
        gamePlaying = false;
        winner = gameBoard[2];
      } else if (gameBoard[2] !== '' && gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6]) {
        gamePlaying = false;
        winner = gameBoard[2];
      } else if (gameBoard[3] !== '' && gameBoard[3] === gameBoard[4] && gameBoard[3] === gameBoard[5]) {
        gamePlaying = false;
        winner = gameBoard[3];
      } else if (gameBoard[6] !== '' && gameBoard[6] === gameBoard[7] && gameBoard[6] === gameBoard[8]) {
        gamePlaying = false;
        winner = gameBoard[6];
      } else if (!gameBoard.includes('')) {
        gamePlaying = false;
        winner = '';
      } else {
        gamePlaying = true;
      }

      return { winner, gamePlaying };
    },

    resetBoard() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      return gameBoard;
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
    newBtn: document.querySelector('.btn'),
    notif: document.querySelector('.notif'),
  };

  return {
    dom,
    getMarker() {
      return currentPlayer;
    },

    changePlayer(marker) {
      if (marker === 'X') {
        marker = 'O';
      } else {
        marker = 'X';
      }
      return marker;
    },

    renderCells(board, cell, id) {
      cell.textContent = board[id];
    },

    clearBoard() {
      const cellArr = Array.from(dom.cell);
      cellArr.forEach((el) => (el.textContent = ''));
    },

    togglePlayer() {
      dom.notif.textContent === 'Player 1' ? (dom.notif.textContent = 'Player 2') : (dom.notif.textContent = 'Player 1');
    },
  };
})();

/*
OVERALL APP CONTROLLER
*/

const appController = (function (gameCtrl, displayCtrl) {
  let board, marker, gamePlaying, winner;
  const dom = displayCtrl.dom;
  board = gameCtrl.gameBoard;
  marker = 'O';

  dom.board.addEventListener('click', (e) => {
    if (gamePlaying) {
      if (e.target.matches('.cell')) {
        const cell = e.target;
        const id = parseInt(e.target.dataset.id);
        //console.log(cell);

        // Get marker
        //const marker = displayCtrl.getMarker();

        // Change Player
        marker = displayCtrl.changePlayer(marker);

        // Store marker in clicked position in data structure
        gameCtrl.storeMarker(id, marker);

        // Render cells on board
        displayCtrl.renderCells(board, cell, id);

        // Toggle notification panel
        displayCtrl.togglePlayer();

        // Check if game has been won or tied
        gamePlaying = gameCtrl.checkWinner(gamePlaying).gamePlaying;
        winner = gameCtrl.checkWinner(gamePlaying).winner;

        if (!gamePlaying) {
          gameCtrl.resetBoard();
          dom.notif.textContent = 'Game Over!';
        }
      }
    }
  });

  // Event listener for new game button
  dom.newBtn.addEventListener('click', () => {
    board = gameCtrl.resetBoard();
    displayCtrl.clearBoard();
    marker = 'O';

    gamePlaying = true;
    dom.notif.textContent = 'Player 1';
  });

  // Event listener for window object(page load)
  window.addEventListener('load', (e) => {
    gamePlaying = true;
    displayCtrl.clearBoard();

    dom.notif.textContent = 'Player 1';
  });
})(gameController, displayController);

/**
 * Get player marker
 * Store player marker in data structure
 * Display marker on clicked tile
 *
 */
