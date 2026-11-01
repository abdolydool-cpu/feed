const gameButtons = document.querySelectorAll('.game-btn');
const gameTitle = document.getElementById('gameTitle');
const gameContent = document.getElementById('gameContent');
const newRoundBtn = document.getElementById('newRoundBtn');
const randomGameBtn = document.getElementById('randomGameBtn');
const resetScoresBtn = document.getElementById('resetScoresBtn');
const installBtn = document.getElementById('installBtn');

const gameNames = {
  memory: 'Memory Match',
  tictactoe: 'Tic-Tac-Toe',
  reaction: 'Reaction Rush',
  guess: 'Number Guess',
  rps: 'Rock Paper Scissors',
  simon: 'Simon Says'
};

const state = {
  currentGame: 'memory',
  scores: {
    memory: 0,
    tictactoe: 0,
    reaction: 0,
    guess: 0,
    rps: 0,
    simon: 0
  },
  deferredPrompt: null
};

function updateScore(gameKey, value) {
  state.scores[gameKey] = value;
  const scoreEl = document.getElementById(`score-${gameKey}`);
  if (scoreEl) scoreEl.textContent = value;
}

function setActiveGame(gameKey) {
  state.currentGame = gameKey;
  gameTitle.textContent = gameNames[gameKey];
  gameButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.game === gameKey);
  });
  renderGame();
}

function renderGame() {
  switch (state.currentGame) {
    case 'memory':
      renderMemoryGame();
      break;
    case 'tictactoe':
      renderTicTacToe();
      break;
    case 'reaction':
      renderReactionGame();
      break;
    case 'guess':
      renderGuessGame();
      break;
    case 'rps':
      renderRPSGame();
      break;
    case 'simon':
      renderSimonGame();
      break;
    default:
      renderMemoryGame();
  }
}

function randomGame() {
  const keys = Object.keys(gameNames);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  setActiveGame(randomKey);
}

function newRound() {
  renderGame();
}

function resetAllScores() {
  Object.keys(state.scores).forEach((key) => updateScore(key, 0));
}

function renderMemoryGame() {
  const emojis = ['🍉', '🍋', '🍇', '🍒', '🍓', '🍊', '🐶', '🦄'];
  const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

  gameContent.innerHTML = `
    <div class="game-panel">
      <h3>Flip and match</h3>
      <p>Match all pairs to win the round.</p>
      <div class="memory-grid">
        ${cards.map((emoji, index) => `
          <button class="memory-card" data-index="${index}" data-emoji="${emoji}" aria-label="Memory card ${index + 1}">
            <span>${emoji}</span>
          </button>
        `).join('')}
      </div>
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
        <span>Wins: <strong id="ticScore">${state.scores.tictactoe}</strong></span>
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
      <button class="tic-cell" data-index="${index}" aria-label="Cell ${index + 1}">${cell}</button>
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
          ticScore.textContent = state.scores.tictactoe;
          return;
        }

        if (board.every(Boolean)) {
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
  const guessBestEl = document.getElementById('guessBest');

  function updateBest() {
    guessBestEl.textContent = state.scores.guess;
  }

  input.focus();

  guessBtn.addEventListener('click', () => {
    const value = Number(input.value);
    if (!value || value < 1 || value > 100) {
      notice.textContent = 'Enter a valid number between 1 and 100.';
      return;
    }

    remainingGuesses -= 1;
    triesLeftEl.textContent = String(remainingGuesses);

    if (value === randomTarget) {
      const bonus = remainingGuesses * 10 + 25;
      updateScore('guess', Math.max(state.scores.guess, bonus));
      updateBest();
      notice.textContent = `🎉 Correct! ${randomTarget} was the number. +${bonus} score`;
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
}

function renderRPSGame() {
  const choices = ['✊', '✋', '✌️'];
  const names = ['Rock', 'Paper', 'Scissors'];

  gameContent.innerHTML = `
    <div class="game-panel">
      <h3>Rock, Paper, Scissors</h3>
      <p>Pick a move and beat the computer.</p>
      <div class="rps-grid">
        ${choices.map((icon, index) => `
          <button class="choice-btn" data-choice="${index}">${icon} ${names[index]}</button>
        `).join('')}
      </div>
      <div class="status-row">
        <span id="rpsStatus">Make your move!</span>
        <span>Wins: <strong id="rpsScore">${state.scores.rps}</strong></span>
      </div>
    </div>
  `;

  const status = document.getElementById('rpsStatus');
  const scoreEl = document.getElementById('rpsScore');

  document.querySelectorAll('.choice-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const userChoice = Number(button.dataset.choice);
      const computerChoice = Math.floor(Math.random() * 3);
      const result = (userChoice - computerChoice + 3) % 3;

      if (result === 0) {
        status.textContent = `It’s a draw! You both picked ${names[userChoice]}.`;
      } else if (result === 1) {
        status.textContent = `You win! ${names[userChoice]} beats ${names[computerChoice]}.`;
        updateScore('rps', state.scores.rps + 1);
        scoreEl.textContent = state.scores.rps;
      } else {
        status.textContent = `Computer wins! ${names[computerChoice]} beats ${names[userChoice]}.`;
      }
    });
  });
}

function renderSimonGame() {
  const colors = ['red', 'blue', 'green', 'yellow'];
  const labels = ['🔴', '🔵', '🟢', '🟡'];
  const stateRef = {
    sequence: [],
    userIndex: 0,
    locked: false,
    round: 0
  };

  gameContent.innerHTML = `
    <div class="game-panel">
      <h3>Simon Says</h3>
      <p>Repeat the pattern in the same order.</p>
      <div class="simon-grid">
        ${colors.map((color, index) => `
          <button class="simon-btn ${color}" data-color="${color}" aria-label="Simon color ${labels[index]}">${labels[index]}</button>
        `).join('')}
      </div>
      <div class="status-row">
        <span id="simonStatus">Level 1</span>
        <span>Best: <strong id="simonScore">${state.scores.simon}</strong></span>
      </div>
    </div>
  `;

  const statusEl = document.getElementById('simonStatus');
  const scoreEl = document.getElementById('simonScore');
  const buttons = document.querySelectorAll('.simon-btn');

  function flashButton(color) {
    const button = document.querySelector(`.simon-btn.${color}`);
    if (!button) return;
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 350);
  }

  function playSequence() {
    stateRef.locked = true;
    stateRef.userIndex = 0;

    let delay = 0;
    stateRef.sequence.forEach((color) => {
      delay += 450;
      setTimeout(() => flashButton(color), delay);
    });

    setTimeout(() => {
      stateRef.locked = false;
      statusEl.textContent = `Your turn · Level ${stateRef.round}`;
    }, delay + 400);
  }

  function addStep() {
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    stateRef.sequence.push(nextColor);
    stateRef.round += 1;
    statusEl.textContent = `Watch closely · Level ${stateRef.round}`;
    playSequence();
  }

  function handleGuess(color) {
    if (stateRef.locked) return;

    flashButton(color);

    if (stateRef.sequence[stateRef.userIndex] !== color) {
      const newBest = Math.max(state.scores.simon, stateRef.round - 1);
      updateScore('simon', newBest);
      scoreEl.textContent = state.scores.simon;
      statusEl.textContent = `Wrong! Final level: ${stateRef.round - 1}. Try again.`;
      stateRef.sequence = [];
      stateRef.userIndex = 0;
      stateRef.round = 0;
      setTimeout(() => {
        addStep();
      }, 1200);
      return;
    }

    stateRef.userIndex += 1;

    if (stateRef.userIndex === stateRef.sequence.length) {
      const levelValue = stateRef.round;
      updateScore('simon', Math.max(state.scores.simon, levelValue));
      scoreEl.textContent = state.scores.simon;
      setTimeout(() => {
        addStep();
      }, 800);
    }
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => handleGuess(button.dataset.color));
  });

  addStep();
}

function handleInstallPrompt(event) {
  event.preventDefault();
  state.deferredPrompt = event;
  installBtn.classList.remove('hidden');
}

async function installApp() {
  if (!state.deferredPrompt) return;
  state.deferredPrompt.prompt();
  await state.deferredPrompt.userChoice;
  state.deferredPrompt = null;
  installBtn.classList.add('hidden');
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch((error) => {
      console.error('Service worker registration failed:', error);
    });
  });
}

window.addEventListener('beforeinstallprompt', handleInstallPrompt);
installBtn.addEventListener('click', installApp);

gameButtons.forEach((button) => {
  button.addEventListener('click', () => setActiveGame(button.dataset.game));
});

newRoundBtn.addEventListener('click', newRound);
randomGameBtn.addEventListener('click', randomGame);
resetScoresBtn.addEventListener('click', resetAllScores);

setActiveGame(state.currentGame);
