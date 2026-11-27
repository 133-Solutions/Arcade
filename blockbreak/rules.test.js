const test = require('node:test');
const assert = require('node:assert/strict');
const { createGame, movePaddle, launch, step } = require('./rules.js');

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

test('before launch, the ball sits on the paddle and goes with it', () => {
  const { ball, paddle } = movePaddle(createGame(), 30);

  assert.equal(ball.x, 30);
  assert.equal(ball.y + ball.radius, paddle.y);
});

test('launching sends the ball upward and starts play', () => {
  const launched = launch(createGame());
  const later = step(launched, 0.1);

  assert.equal(launched.phase, 'playing');
  assert.ok(later.ball.y < launched.ball.y);
});

// A game in play with the ball placed and moving as given.
function playingWith(ball) {
  const game = launch(createGame());
  return { ...game, ball: { ...game.ball, ...ball } };
}

test('the ball bounces off the left wall', () => {
  const { ball } = step(playingWith({ x: 3, y: 100, vx: -50, vy: 0 }), 0.1);

  assert.ok(ball.vx > 0);
  assert.ok(ball.x - ball.radius >= 0);
});

test('the ball bounces off the right wall', () => {
  const { ball, area } = step(playingWith({ x: 97, y: 100, vx: 50, vy: 0 }), 0.1);

  assert.ok(ball.vx < 0);
  assert.ok(ball.x + ball.radius <= area.width);
});

test('the ball bounces off the top', () => {
  const { ball } = step(playingWith({ x: 50, y: 3, vx: 0, vy: -50 }), 0.1);

  assert.ok(ball.vy > 0);
  assert.ok(ball.y - ball.radius >= 0);
});

test('the ball bounces up off the paddle', () => {
  const game = playingWith({ x: 50, y: 185, vx: 0, vy: 50 });
  const { ball, paddle } = step(game, 0.1);

  assert.ok(ball.vy < 0);
  assert.ok(ball.y + ball.radius <= paddle.y);
});

test('a ball that gets past the paddle goes back onto it and waits', () => {
  const game = playingWith({ x: 10, y: 199, vx: 0, vy: 50 });
  const { phase, ball, paddle } = step(game, 0.1);

  assert.equal(phase, 'waiting');
  assert.equal(ball.x, paddle.x);
  assert.equal(ball.y + ball.radius, paddle.y);
});

test('the ball bounces off the end of the paddle as it moves past it', () => {
  // Crosses the paddle's top right at its right-hand end, then would carry on past it.
  const game = playingWith({ x: 58, y: 184, vx: 90, vy: 90 });
  const { ball } = step(game, 0.05);

  assert.ok(ball.vy < 0);
});
