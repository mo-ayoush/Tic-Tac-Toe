export const HUMAN = 'X';
export const COMPUTER = 'O';
export const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function getWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { mark: board[a], line };
    }
  }
  return null;
}

export function isDraw(board) {
  return !getWinner(board) && board.every(Boolean);
}

function minimax(board, isMaximizing, depth = 0) {
  const winner = getWinner(board);
  if (winner?.mark === COMPUTER) return 10 - depth;
  if (winner?.mark === HUMAN) return depth - 10;
  if (board.every(Boolean)) return 0;

  let bestScore = isMaximizing ? -Infinity : Infinity;
  for (let i = 0; i < board.length; i += 1) {
    if (board[i]) continue;
    board[i] = isMaximizing ? COMPUTER : HUMAN;
    const score = minimax(board, !isMaximizing, depth + 1);
    board[i] = null;
    bestScore = isMaximizing ? Math.max(bestScore, score) : Math.min(bestScore, score);
  }
  return bestScore;
}

export function getBestComputerMove(board) {
  if (board.length !== 9 || getWinner(board) || board.every(Boolean)) return -1;
  let bestMove = -1;
  let bestScore = -Infinity;
  for (let i = 0; i < board.length; i += 1) {
    if (board[i]) continue;
    board[i] = COMPUTER;
    const score = minimax(board, false, 0);
    board[i] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }
  return bestMove;
}
