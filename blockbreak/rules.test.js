const test = require('node:test');
const assert = require('node:assert/strict');
const { createGame, movePaddle } = require('./rules.js');

test('a new game waits for launch, with three lives and no score', () => {
  const game = createGame();

  assert.equal(game.phase, 'waiting');
  assert.equal(game.lives, 3);
  assert.equal(game.score, 0);
});

test('the paddle goes where it is sent', () => {
  const game = movePaddle(createGame(), 30);

  assert.equal(game.paddle.x, 30);
});

test('the paddle stops at the left edge of the play area', () => {
  const { paddle } = movePaddle(createGame(), -500);

  assert.equal(paddle.x - paddle.width / 2, 0);
});

test('the paddle stops at the right edge of the play area', () => {
  const { paddle, area } = movePaddle(createGame(), 500);

  assert.equal(paddle.x + paddle.width / 2, area.width);
});
