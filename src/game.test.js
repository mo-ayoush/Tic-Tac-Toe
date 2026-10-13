import { COMPUTER, HUMAN, getBestComputerMove, getWinner, isDraw } from './game.js';

describe('tic-tac-toe game rules', () => {
  test.each([
    [[HUMAN, HUMAN, HUMAN, null, COMPUTER, null, null, null, null], HUMAN],
    [[COMPUTER, null, HUMAN, null, COMPUTER, HUMAN, null, null, COMPUTER], COMPUTER],
  ])('detects a winning row or diagonal', (board, mark) => {
    expect(getWinner(board)?.mark).toBe(mark);
  });

  test('returns no winner for an unfinished board', () => {
    expect(getWinner([HUMAN, COMPUTER, null, null, HUMAN, null, null, null, COMPUTER])).toBeNull();
  });

  test('recognizes a full board with no winner as a draw', () => {
    expect(isDraw([HUMAN, COMPUTER, HUMAN, HUMAN, COMPUTER, COMPUTER, COMPUTER, HUMAN, HUMAN])).toBe(true);
  });

  test('does not call an unfinished board a draw', () => {
    expect(isDraw([HUMAN, COMPUTER, null, null, HUMAN, null, null, null, COMPUTER])).toBe(false);
  });
});

describe('computer strategy', () => {
  test('takes a winning move when it is available', () => {
    const board = [COMPUTER, COMPUTER, null, HUMAN, HUMAN, null, null, null, null];
    expect(getBestComputerMove(board)).toBe(2);
  });

  test('blocks an immediate human win', () => {
    const board = [HUMAN, HUMAN, null, COMPUTER, null, null, null, COMPUTER, null];
    expect(getBestComputerMove(board)).toBe(2);
  });

  test('returns -1 when the board is already complete', () => {
    expect(getBestComputerMove([HUMAN, COMPUTER, HUMAN, HUMAN, COMPUTER, COMPUTER, COMPUTER, HUMAN, HUMAN])).toBe(-1);
  });

  test('does not mutate the supplied board', () => {
    const board = [HUMAN, null, null, null, COMPUTER, null, null, null, null];
    const original = [...board];
    getBestComputerMove(board);
    expect(board).toEqual(original);
  });
});
