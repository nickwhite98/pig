'use strict';

const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');

let rollValue = 1;

let activePlayer = 0;
let p1CurrentScore = 0;
let p2CurrentScore = 0;

let player1Score = 0;
let player2Score = 0;

const player1Element = document.querySelector('.player--0');
const player2Element = document.querySelector('.player--1');

rollDiceBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdScore);
newGameBtn.addEventListener('click', newGame);

document.getElementsByClassName('dice')[0].classList.add('hidden');

function rollDice() {
  const diceSides = [1, 2, 3, 4, 5, 6];
  rollValue = diceSides[Math.floor(Math.random() * diceSides.length)];

  setCurrentScore(rollValue);
  reRenderDom();
}

function changePlayer() {
  if (activePlayer === 1) {
    activePlayer = 0;
  } else {
    activePlayer = 1;
  }
}

function setCurrentScore(rollValue) {
  if (rollValue === 1) {
    if (activePlayer === 0) {
      p1CurrentScore = 0;
    } else {
      p2CurrentScore = 0;
    }

    changePlayer();
  } else {
    if (activePlayer === 0) {
      p1CurrentScore += rollValue;
    } else {
      p2CurrentScore += rollValue;
    }
  }
}

function holdScore() {
  if (activePlayer === 0) {
    player1Score = p1CurrentScore + player1Score;

    if (player1Score >= 100) {
      endGame('Player 1', player1Score);
    }
  } else {
    player2Score = p2CurrentScore + player2Score;

    if (player2Score >= 100) {
      endGame('Player 2', player2Score);
    }
  }

  changePlayer();

  p1CurrentScore = 0;
  p2CurrentScore = 0;

  reRenderDom();
}

function newGame() {
  p1CurrentScore = 0;
  p2CurrentScore = 0;
  player1Score = 0;
  player2Score = 0;

  if (activePlayer == 1) {
    changePlayer();
  }
  reRenderDom();
  document.getElementsByClassName('dice')[0].classList.add('hidden');
}

function endGame(winner, winningScore) {
  alert(
    `${winner} wins the game with a score of ${winningScore}!!!  \n Game has been reset.`
  );
  newGame();
}

function reRenderDom() {
  document.getElementById('current--0').textContent = p1CurrentScore;
  document.getElementById('current--1').textContent = p2CurrentScore;

  document.getElementById('score--0').textContent = player1Score;
  document.getElementById('score--1').textContent = player2Score;

  const diceDisplaySource = `dice-${rollValue}.png`;
  document
    .getElementsByClassName('dice')[0]
    .setAttribute('src', diceDisplaySource);

  document.getElementsByClassName('dice')[0].classList.remove('hidden');

  if (activePlayer === 1) {
    player2Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
  } else {
    player1Element.classList.add('player--active');
    player2Element.classList.remove('player--active');
  }
}
