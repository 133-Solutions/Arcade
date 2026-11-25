// BlockBreak's rules: the whole game state and how it changes.
// No browser APIs here, so the rules run in Node's tests as well as on the page.
// A plain script (not a module) so the game still works when opened straight from its folder.
// Everything is measured in play-area units; drawing scales them to the screen.

const BlockBreakRules = (() => {
  const STARTING_LIVES = 3;
  const AREA = { width: 100, height: 200 }; // tall, to fill a phone held upright
  const PADDLE = { width: 20, height: 3, y: 188 };

  function createGame() {
    return {
      phase: 'waiting',
      lives: STARTING_LIVES,
      score: 0,
      area: { ...AREA },
      paddle: { ...PADDLE, x: AREA.width / 2 },
    };
  }

  // Moves the paddle's centre to `position` along its axis.
  function movePaddle(game, position) {
    const halfWidth = game.paddle.width / 2;
    const x = Math.min(game.area.width - halfWidth, Math.max(halfWidth, position));
    return { ...game, paddle: { ...game.paddle, x } };
  }

  return { createGame, movePaddle };
})();

if (typeof module !== 'undefined') {
  module.exports = BlockBreakRules;
}
