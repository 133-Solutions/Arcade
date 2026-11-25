// Drawing: reads the game state and paints it on the canvas. It holds no rules.

const BlockBreakDraw = (() => {
  const COLOURS = {
    background: '#1d2030',
    paddle: '#4fc3f7',
  };

  // Sizes the canvas to the biggest play area that fits the screen,
  // and paints the state at that size.
  function createView(canvas, area) {
    const context = canvas.getContext('2d');
    let scale = 1;

    function fit() {
      scale = Math.min(window.innerWidth / area.width, window.innerHeight / area.height);
      const ratio = window.devicePixelRatio || 1;
      canvas.style.width = `${area.width * scale}px`;
      canvas.style.height = `${area.height * scale}px`;
      canvas.width = Math.round(area.width * scale * ratio);
      canvas.height = Math.round(area.height * scale * ratio);
      context.setTransform(scale * ratio, 0, 0, scale * ratio, 0, 0);
    }

    // Turns a point on the screen into a position along the paddle's axis, in play-area units.
    // The paddle's axis runs across the screen for now; this is the one place that knows that.
    function toPaddleAxis(point) {
      return (point.clientX - canvas.getBoundingClientRect().left) / scale;
    }

    function draw(game) {
      context.fillStyle = COLOURS.background;
      context.fillRect(0, 0, game.area.width, game.area.height);

      const { paddle } = game;
      context.fillStyle = COLOURS.paddle;
      context.fillRect(paddle.x - paddle.width / 2, paddle.y, paddle.width, paddle.height);
    }

    fit();
    return { fit, draw, toPaddleAxis };
  }

  return { createView };
})();
