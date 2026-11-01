const gameButtons = document.querySelectorAll('.game-btn');
const gameTitle = document.getElementById('gameTitle');
const gameContent = document.getElementById('gameContent');
const newRoundBtn = document.getElementById('newRoundBtn');
const randomGameBtn = document.getElementById('randomGameBtn');
const resetScoresBtn = document.getElementById('resetScoresBtn');

const gameNames = {
  memory: 'Memory Match',
  tictactoe: 'Tic-Tac-Toe',
  reaction: 'Reaction Rush',
  guess: 'Number Guess'
};

const state = {
  currentGame: 'memory',
  scores: {
    memory: 0,
    tictactoe: 0,
    reaction: 0,
    guess: 0
  }
};

function setActiveGame(gameKey) {
  state.currentGame = gameKey;
  gameTitle.textContent = gameNames[gameKey];
  gameButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.game === gameKey);
  });
  renderGame();
}

function updateScore(gameKey, value) {
  state.scores[gameKey] = value;
  const scoreEl = document.getElementById(`score-${gameKey}`);
  if (scoreEl) scoreEl.textContent = value;
}

function renderGame() {
  if (state.currentGame === 'memory') {
    renderMemoryGame();
  } else if (state.currentGame === 'tictactoe') {
    renderTicTacToe();
  } else if (state.currentGame === 'reaction') {
    renderReactionGame();
  } else {
    renderGuessGame();
  }
}

function randomGame() {
  const keys = Object.keys(gameNames);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  setActiveGame(randomKey);
}

function roundReset() {
  if (state.currentGame === 'memory') {
    startMemoryGame();
  } else if (state.currentGame === 'tictactoe') {
    startTicTacToe();
  } else if (state.currentGame === 'reaction') {
    resetReactionGame();
  } else {
    startGuessGame();
  }
}

function resetAllScores() {
  Object.keys(state.scores).forEach((key) => updateScore(key, 0));
}

gameButtons.forEach((button) => {
  button.addEventListener('click', () => setActiveGame(button.dataset.game));
});

newRoundBtn.addEventListener('click', roundReset);
randomGameBtn.addEventListener('click', randomGame);
resetScoresBtn.addEventListener('click', resetAllScores);

function renderMemoryGame() {
  const emojis = ['🍉', '🍋', '🍇', '🍒', '🍓', '🍊', '🐶', '🦄'];
  let cards = [];

  const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
  shuffled.forEach((emoji, index) => {
    cards.push(`
      <button class="memory-card" data-index="${index}" data-emoji="${emoji}">
        <span>${emoji}</span>
      </button>
    `);
  });

  gameContent.innerHTML = `
    <div class="game-panel memory-panel">
      <h3>Flip and match</h3>
      <p>Match all pairs to win the round.</p>
      <div class="memory-grid">${cards.join('')}</div>
      <div class="status-row">
        <span id="memoryStatus">Moves: 0</span>
        <span id="memoryBadge">Pairs found: 0/8</span>
      </div>
    </div>
  `;

  const memoryState = {
    flipped: [],
    matched: 0,
    moves: 0,
    locked: false,
    cards: [...document.querySelectorAll('.memory-card')]
  };

  const status = document.getElementById('memoryStatus');
  const badge = document.getElementById('memoryBadge');

  function handleFlip(card) {
    if (card.classList.contains('revealed') || card.classList.contains('matched') || memoryState.locked) return;

    card.classList.add('revealed');
    memoryState.flipped.push(card);

    if (memoryState.flipped.length === 2) {
      memoryState.moves += 1;
      status.textContent = `Moves: ${memoryState.moves}`;
      const [first, second] = memoryState.flipped;

      if (first.dataset.emoji === second.dataset.emoji) {
        first.classList.add('matched');
        second.classList.add('matched');
        memoryState.matched += 1;
        badge.textContent = `Pairs found: ${memoryState.matched}/8`;
        memoryState.flipped = [];

        if (memoryState.matched === 8) {
          const points = Math.max(20 - memoryState.moves, 5);
          updateScore('memory', state.scores.memory + points);
          badge.textContent = `Pairs found: 8/8 · +${points} pts`;
          status.textContent = `Moves: ${memoryState.moves} · You win!`;
        }
      } else {
        memoryState.locked = true;
        setTimeout(() => {
          first.classList.remove('revealed');
          second.classList.remove('revealed');
          memoryState.flipped = [];
          memoryState.locked = false;
        }, 700);
      }
    }
  }

  memoryState.cards.forEach((card) => {
    card.addEventListener('click', () => handleFlip(card));
  });
}

function renderTicTacToe() {
  const board = Array(9).fill('');
  let currentTurn = 'X';
  let gameOver = false;

  gameContent.innerHTML = `
    <div class="game-panel">
      <h3>First to three in a row</h3>
      <p>Player X vs Player O</p>
      <div class="tic-grid" id="ticBoard"></div>
      <div class="status-row">
        <span id="ticStatus">Player X's turn</span>
        <span id="ticScore">Wins: ${state.scores.tictactoe}</span>
      </div>
    </div>
  `;

  const ticBoard = document.getElementById('ticBoard');
  const ticStatus = document.getElementById('ticStatus');
  const ticScore = document.getElementById('ticScore');

  function checkWinner(arr) {
    const patterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of patterns) {
      if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) return arr[a];
    }
    return null;
  }

  function renderBoard() {
    ticBoard.innerHTML = board.map((cell, index) => `
      <button class="tic-cell" data-index="${index}">${cell}</button>
    `).join('');

    ticBoard.querySelectorAll('.tic-cell').forEach((cell) => {
      cell.addEventListener('click', () => {
        if (gameOver) return;
        const index = Number(cell.dataset.index);
        if (board[index]) return;

        board[index] = currentTurn;
        cell.textContent = currentTurn;

        const winner = checkWinner(board);
        if (winner) {
          gameOver = true;
          ticStatus.textContent = `Player ${winner} wins!`;
          updateScore('tictactoe', state.scores.tictactoe + 1);
          ticScore.textContent = `Wins: ${state.scores.tictactoe}`;
          return;
        }

        const isDraw = board.every(Boolean);
        if (isDraw) {
          gameOver = true;
          ticStatus.textContent = "It's a draw!";
          return;
        }

        currentTurn = currentTurn === 'X' ? 'O' : 'X';
        ticStatus.textContent = `Player ${currentTurn}'s turn`;
      });
    });
  }

  renderBoard();
}

function renderReactionGame() {
  let isWaiting = false;
  let startTime = 0;
  let timeoutId = null;

  gameContent.innerHTML = `
    <div class="game-panel">
      <h3>Tap when the color flips</h3>
      <p>Wait for green, then click as fast as you can.</p>
      <div class="reaction-area">
        <button id="reactionButton" class="reaction-btn waiting">Wait for green...</button>
      </div>
      <div class="status-row">
        <span id="reactionStatus">Ready?</span>
      </div>
    </div>
  `;

  const button = document.getElementById('reactionButton');
  const reactionStatus = document.getElementById('reactionStatus');

  function resetReactionGame() {
    clearTimeout(timeoutId);
    isWaiting = false;
    button.className = 'reaction-btn waiting';
    button.textContent = 'Wait for green...';
    reactionStatus.textContent = 'Ready?';
  }

  function startRound() {
    resetReactionGame();
    const delay = 1500 + Math.random() * 2600;
    timeoutId = setTimeout(() => {
      isWaiting = true;
      button.className = 'reaction-btn ready';
      button.textContent = 'CLICK!';
      reactionStatus.textContent = 'Now!';
      startTime = performance.now();
    }, delay);
  }

  button.addEventListener('click', () => {
    if (!isWaiting) {
      reactionStatus.textContent = 'Too soon! Try again.';
      button.className = 'reaction-btn waiting';
      button.textContent = 'Wait for green...';
      clearTimeout(timeoutId);
      setTimeout(startRound, 700);
      return;
    }

    const reactionTime = Math.round(performance.now() - startTime);
    reactionStatus.textContent = `Your reaction: ${reactionTime}ms`;
    updateScore('reaction', Math.max(state.scores.reaction, 1000 - reactionTime));
    button.className = 'reaction-btn waiting';
    button.textContent = 'Play again';
    isWaiting = false;
    setTimeout(startRound, 900);
  });

  startRound();
}

function renderGuessGame() {
  let randomTarget = Math.floor(Math.random() * 100) + 1;
  let remainingGuesses = 7;

  gameContent.innerHTML = `
    <div class="game-panel">
      <h3>Guess the hidden number</h3>
      <p>Pick a number from 1 to 100. You have 7 tries.</p>
      <div class="guess-box">
        <input id="guessInput" type="number" min="1" max="100" placeholder="Type a number" />
        <button id="guessBtn" class="primary-btn">Guess</button>
      </div>
      <div class="notice" id="guessNotice">Make your first guess!</div>
      <div class="status-row">
        <span>Tries left: <strong id="triesLeft">7</strong></span>
        <span>Best score: <strong id="guessBest">${state.scores.guess}</strong></span>
      </div>
    </div>
  `;

  const input = document.getElementById('guessInput');
  const notice = document.getElementById('guessNotice');
  const triesLeftEl = document.getElementById('triesLeft');
  const guessBtn = document.getElementById('guessBtn');

  function startGuessGame() {
    randomTarget = Math.floor(Math.random() * 100) + 1;
    remainingGuesses = 7;
    notice.textContent = 'Make your first guess!';
    triesLeftEl.textContent = '7';
    input.value = '';
    input.focus();
  }

  guessBtn.addEventListener('click', () => {
    const value = Number(input.value);
    if (!value || value < 1 || value > 100) {
      notice.textContent = 'Enter a valid number between 1 and 100.';
      return;
    }

    remainingGuesses -= 1;
    triesLeftEl.textContent = String(remainingGuesses);

    if (value === randomTarget) {
      notice.textContent = `🎉 Correct! ${randomTarget} was the number.`;
      const bonus = remainingGuesses * 10 + 25;
      updateScore('guess', Math.max(state.scores.guess, bonus));
      document.getElementById('guessBest').textContent = state.scores.guess;
      guessBtn.disabled = true;
      return;
    }

    if (remainingGuesses <= 0) {
      notice.textContent = `💥 Out of tries! The number was ${randomTarget}.`;
      guessBtn.disabled = true;
      return;
    }

    notice.textContent = value < randomTarget ? 'Too low — aim higher!' : 'Too high — go lower!';
    input.value = '';
    input.focus();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') guessBtn.click();
  });

  startGuessGame();
}

function startMemoryGame() {
  renderMemoryGame();
}

function startTicTacToe() {
  renderTicTacToe();
}

function startGuessGame() {
  renderGuessGame();
}

function resetReactionGame() {
  renderReactionGame();
}

setActiveGame(state.currentGame);

window.addEventListener('beforeunload', () => {
  Object.keys(state.scores).forEach((key) => state.scores[key] = Number(document.getElementById(`score-${key}`)?.textContent || 0));
});
