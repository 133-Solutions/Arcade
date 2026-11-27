// Wires the rules, drawing and controls together and runs the game loop.

(() => {
  const { createGame, movePaddle, launch, step } = BlockBreakRules;
  const LONGEST_STEP = 0.05; // seconds; a slow frame never moves the ball further than this allows
  const canvas = document.getElementById('game');

  let game = createGame();
  const view = BlockBreakDraw.createView(canvas, game.area);
  const controls = BlockBreakControls.attach(canvas, view, {
    onMovePaddle: (position) => {
      game = movePaddle(game, position);
    },
    onLaunch: () => {
      game = launch(game);
    },
  });

  window.addEventListener('resize', () => {
    view.fit();
    view.draw(game);
  });

  let lastTime = null;
  function frame(time) {
    const seconds = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, LONGEST_STEP);
    lastTime = time;

    const keyMovement = controls.keyMovement(seconds);
    if (keyMovement !== 0) {
      game = movePaddle(game, game.paddle.x + keyMovement);
    }
    game = step(game, seconds);

    view.draw(game);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
