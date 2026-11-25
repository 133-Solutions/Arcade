// BlockBreak's rules: the whole game state and how it changes.
// No browser APIs here, so the rules run in Node's tests as well as on the page.
// A plain script (not a module) so the game still works when opened straight from its folder.

const BlockBreakRules = (() => {
  const STARTING_LIVES = 3;

  function createGame() {
    return {
      phase: 'waiting',
      lives: STARTING_LIVES,
      score: 0,
    };
  }

  return { createGame };
})();

if (typeof module !== 'undefined') {
  module.exports = BlockBreakRules;
}
