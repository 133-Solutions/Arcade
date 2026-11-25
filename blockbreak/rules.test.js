const test = require('node:test');
const assert = require('node:assert/strict');
const { createGame } = require('./rules.js');

test('a new game waits for launch, with three lives and no score', () => {
  const game = createGame();

  assert.equal(game.phase, 'waiting');
  assert.equal(game.lives, 3);
  assert.equal(game.score, 0);
});
