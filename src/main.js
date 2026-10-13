import { COMPUTER, HUMAN, getBestComputerMove, getWinner, isDraw } from './game.js';
import './style.css';

const boardElement = document.querySelector('#board');
const cells = [...document.querySelectorAll('.cell')];
const statusMessage = document.querySelector('#status-message');
const statusIcon = document.querySelector('#status-icon');
const humanPlayer = document.querySelector('#human-player');
const computerPlayer = document.querySelector('#computer-player');
const resetButton = document.querySelector('#reset-button');

let board = Array(9).fill(null);
let gameOver = false;
let computerThinking = false;
let computerTimer = null;

function setTurn(turn) {
  humanPlayer.classList.toggle('active', turn === HUMAN);
  computerPlayer.classList.toggle('active', turn === COMPUTER);
}

function setStatus(message, icon = '✳') {
  statusMessage.textContent = message;
  statusIcon.textContent = icon;
}

function renderCell(index) {
  const cell = cells[index];
  const mark = board[index];
  cell.textContent = mark === HUMAN ? '×' : mark === COMPUTER ? '○' : '';
  cell.classList.toggle('x-mark', mark === HUMAN);
  cell.classList.toggle('o-mark', mark === COMPUTER);
  cell.classList.toggle('is-filled', Boolean(mark));
  cell.disabled = Boolean(mark) || gameOver || computerThinking;
  const positions = ['Top left', 'Top center', 'Top right', 'Middle left', 'Center', 'Middle right', 'Bottom left', 'Bottom center', 'Bottom right'];
  cell.setAttribute('aria-label', `${positions[index]}, ${mark ? (mark === HUMAN ? 'you' : 'computer') + ' played ' + mark : 'empty'}`);
}

function finishIfNeeded() {
  const winner = getWinner(board);
  if (winner) {
    gameOver = true;
    winner.line.forEach((index) => cells[index].classList.add('winning-cell'));
    if (winner.mark === HUMAN) {
      setStatus('You got it! A lovely win.', '✦');
      humanPlayer.classList.add('winner');
    } else {
      setStatus('The computer got this one.', '○');
      computerPlayer.classList.add('winner');
    }
    cells.forEach((_, index) => renderCell(index));
    return true;
  }
  if (isDraw(board)) {
    gameOver = true;
    setStatus("It's a draw. Nicely played!", '↔');
    cells.forEach((_, index) => renderCell(index));
    return true;
  }
  return false;
}

function computerTurn() {
  computerThinking = true;
  setTurn(COMPUTER);
  setStatus('Computer is thinking…', '…');
  cells.forEach((_, index) => renderCell(index));
  computerTimer = window.setTimeout(() => {
    computerTimer = null;
    const move = getBestComputerMove(board);
    if (move >= 0 && !gameOver) {
      board[move] = COMPUTER;
      computerThinking = false;
      cells.forEach((_, index) => renderCell(index));
      if (!finishIfNeeded()) {
        setTurn(HUMAN);
        setStatus('Your turn — pick a square');
      }
    }
  }, 420);
}

function play(index) {
  if (gameOver || computerThinking || board[index]) return;
  board[index] = HUMAN;
  renderCell(index);
  if (finishIfNeeded()) return;
  computerTurn();
}

function resetGame() {
  if (computerTimer !== null) window.clearTimeout(computerTimer);
  computerTimer = null;
  board = Array(9).fill(null);
  gameOver = false;
  computerThinking = false;
  setTurn(HUMAN);
  humanPlayer.classList.remove('winner');
  computerPlayer.classList.remove('winner');
  cells.forEach((cell, index) => {
    cell.classList.remove('winning-cell');
    renderCell(index);
  });
  setStatus('Your turn — pick a square');
}

boardElement.addEventListener('click', (event) => {
  const cell = event.target.closest('.cell');
  if (cell) play(Number(cell.dataset.index));
});
resetButton.addEventListener('click', resetGame);
