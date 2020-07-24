/*
GAME CONTROLLER
*/

const gameController = (function () {
  let gameBoard = ['', '', '', '', '', '', '', '', ''];

  return {
    gameBoard,

    checkCell(id) {
      return gameBoard[id] === '';
    },

    storeMarker(id, marker) {
      if (gameBoard[id] === '') {
        gameBoard[id] = marker;
      }
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
    container: document.querySelector('.container'),
    cell: document.querySelectorAll('.cell'),
    board: document.querySelector('.board'),
    newBtn: document.querySelector('.newBtn'),
    startBtn: document.querySelector('.startBtn'),
    notif: document.querySelector('.notif'),
    popup: document.querySelector('.game'),
    marker: document.querySelector('.marker__input'),
    player1: document.querySelector('.player__1'),
    player2: document.querySelector('.player__2'),
  };

  return {
    dom,
    getPlayers() {
      let marker, player1, player2;
      dom.marker.value ? (marker = dom.marker.value) : (marker = 'O');
      player1 = dom.player1.value;

      dom.player2.value === '0' ? (player2 = 'Computer') : (player2 = dom.player2.value);

      return { marker, player1, player2 };
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

    togglePlayer(player1, player2) {
      dom.notif.textContent === player1 ? (dom.notif.textContent = player2) : (dom.notif.textContent = player1);
    },

    clearBoard() {
      const cellArr = Array.from(dom.cell);
      cellArr.forEach((el) => (el.textContent = ''));
    },

    clearInput() {
      dom.marker.value = '';
      dom.player1.value = '';
      dom.player2.value = '';
    },
  };
})();

/*
OVERALL APP CONTROLLER
*/

const appController = (function (gameCtrl, displayCtrl) {
  let board, marker, initialMarker, player1, player2, gamePlaying, winner;
  const dom = displayCtrl.dom;
  board = gameCtrl.gameBoard;

  dom.board.addEventListener('click', (e) => {
    if (gamePlaying) {
      if (e.target.matches('.cell')) {
        const cell = e.target;
        const id = parseInt(e.target.dataset.id);
        const emptyCell = gameCtrl.checkCell(id);

        // Get marker and change player
        if (emptyCell) {
          marker = displayCtrl.changePlayer(marker);
        }

        // Store marker in clicked position in data structure
        if (emptyCell) {
          gameCtrl.storeMarker(id, marker);
        }

        // Render cells on board
        displayCtrl.renderCells(board, cell, id);

        // Toggle notification panel
        if (emptyCell) {
          if (player1 && player2) {
            displayCtrl.togglePlayer(player1, player2);
          } else if (player1 && !player2) {
            displayCtrl.togglePlayer(player1, 'Player 2');
          } else if (player2 && !player1) {
            displayCtrl.togglePlayer('Player 1', player2);
          } else {
            displayCtrl.togglePlayer('Player 1', 'Player 2');
          }
        }

        // Check if game has been won or tied
        gamePlaying = gameCtrl.checkWinner(gamePlaying).gamePlaying;
        winner = gameCtrl.checkWinner(gamePlaying).winner;

        if (!gamePlaying) {
          gameCtrl.resetBoard();

          if (winner) {
            if (initialMarker === winner) {
              player2 ? (dom.notif.textContent = `${player2} wins!`) : (dom.notif.textContent = 'Player 2 wins!');
            } else {
              player1 ? (dom.notif.textContent = `${player1} wins!`) : (dom.notif.textContent = 'Player 1 wins!');
            }

            dom.container.classList.add('green');
          } else {
            dom.notif.textContent = 'Tie! Try again!';
            dom.container.classList.add('red');
          }
        }
      }
    }
  });

  // Event listener for new game button
  dom.newBtn.addEventListener('click', () => {
    // Reset game board and markers and stop game
    board = gameCtrl.resetBoard();
    displayCtrl.clearBoard();
    gamePlaying = false;

    // Set css properties to display popup
    dom.popup.style.opacity = '1';
    dom.popup.style.visibility = 'visible';
    dom.popup.style.zIndex = '200000';

    // Set css properties to hide gameboard
    dom.container.style.opacity = '0';
    dom.notif.style.opacity = '0';
    dom.newBtn.style.opacity = '0';
    dom.container.style.visibility = 'hidden';
    dom.notif.style.visibility = 'hidden';
    dom.newBtn.style.visibility = 'hidden';

    try {
      dom.container.classList.remove('red');
      dom.container.classList.remove('green');
    } catch (error) {}
  });

  // Event listener for start button
  dom.startBtn.addEventListener('click', () => {
    // Start game
    gamePlaying = true;
    const players = displayCtrl.getPlayers();
    marker = players.marker;
    player1 = players.player1;
    player2 = players.player2;

    initialMarker = marker;

    // Set css properties to display game board
    dom.container.style.opacity = '1';
    dom.notif.style.opacity = '1';
    dom.newBtn.style.opacity = '1';
    dom.container.style.visibility = 'visible';
    dom.notif.style.visibility = 'visible';
    dom.newBtn.style.visibility = 'visible';

    // Set css properties to hide popup
    dom.popup.style.opacity = '0';
    dom.popup.style.visibility = 'hidden';
    dom.popup.style.zIndex = '10';

    // First player name display and clear input fields
    player1 ? (dom.notif.textContent = player1) : (dom.notif.textContent = 'Player 1');
    displayCtrl.clearInput();
  });

  // Event listener for window object(page load)
  window.addEventListener('load', (e) => {
    gamePlaying = false;
    displayCtrl.clearBoard();
  });
})(gameController, displayController);

const computerMove = () => {
  /**
   * Assign available marker to computer
   * Change player to comp after player move
   * Check if comp position is empty
   * Save comp marker in board
   * Display marker
   * Change player
   */

  if (!player2) {
  }
};
