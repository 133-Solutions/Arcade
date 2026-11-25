// Wires the rules, drawing and controls together and runs the game loop.

(() => {
  const { createGame, movePaddle } = BlockBreakRules;
  const canvas = document.getElementById('game');

  let game = createGame();
  const view = BlockBreakDraw.createView(canvas, game.area);
  const controls = BlockBreakControls.attach(canvas, view, (position) => {
    game = movePaddle(game, position);
  });

  window.addEventListener('resize', () => {
    view.fit();
    view.draw(game);
  });

  let lastTime = null;
  function frame(time) {
    const seconds = lastTime === null ? 0 : (time - lastTime) / 1000;
    lastTime = time;

    const keyMovement = controls.keyMovement(seconds);
    if (keyMovement !== 0) {
      game = movePaddle(game, game.paddle.x + keyMovement);
    }

    view.draw(game);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
