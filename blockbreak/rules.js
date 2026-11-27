// BlockBreak's rules: the whole game state and how it changes.
// No browser APIs here, so the rules run in Node's tests as well as on the page.
// A plain script (not a module) so the game still works when opened straight from its folder.
// Everything is measured in play-area units; drawing scales them to the screen.

const BlockBreakRules = (() => {
  const STARTING_LIVES = 3;
  const AREA = { width: 100, height: 200 }; // tall, to fill a phone held upright
  const PADDLE = { width: 20, height: 3, y: 188 };
  const BALL_RADIUS = 2;
  const BALL_SPEED = 90; // play-area units per second
  const LAUNCH_DIRECTION = { x: 0.6, y: -0.8 }; // up and to the right, one unit long

  function createGame() {
    const paddle = { ...PADDLE, x: AREA.width / 2 };
    return {
      phase: 'waiting',
      lives: STARTING_LIVES,
      score: 0,
      area: { ...AREA },
      paddle,
      ball: restingOn(paddle),
    };
  }

  // A ball sitting still on top of the paddle, ready to launch.
  function restingOn(paddle) {
    return { x: paddle.x, y: paddle.y - BALL_RADIUS, radius: BALL_RADIUS, vx: 0, vy: 0 };
  }

  // Moves the paddle's centre to `position` along its axis.
  function movePaddle(game, position) {
    const halfWidth = game.paddle.width / 2;
    const x = Math.min(game.area.width - halfWidth, Math.max(halfWidth, position));
    const paddle = { ...game.paddle, x };
    const ball = game.phase === 'waiting' ? restingOn(paddle) : game.ball;
    return { ...game, paddle, ball };
  }

  // Sends a waiting ball up and away, at an angle, and starts play.
  function launch(game) {
    if (game.phase !== 'waiting') return game;
    const ball = {
      ...game.ball,
      vx: BALL_SPEED * LAUNCH_DIRECTION.x,
      vy: BALL_SPEED * LAUNCH_DIRECTION.y,
    };
    return { ...game, phase: 'playing', ball };
  }

  // Turns the ball back into the play area if it has gone past a side wall or the top.
  function bounceOffWalls(ball, area) {
    let { x, y, vx, vy } = ball;
    if (x - ball.radius < 0) {
      x = ball.radius;
      vx = Math.abs(vx);
    } else if (x + ball.radius > area.width) {
      x = area.width - ball.radius;
      vx = -Math.abs(vx);
    }
    if (y - ball.radius < 0) {
      y = ball.radius;
      vy = Math.abs(vy);
    }
    return { ...ball, x, y, vx, vy };
  }

  // Sends the ball back up if, on its way down, it crossed the top of the paddle.
  function bounceOffPaddle(before, after, paddle) {
    const crossedTop = after.vy > 0
      && before.y + before.radius <= paddle.y
      && after.y + after.radius >= paddle.y;
    // Where the ball was along the paddle at the moment its bottom reached the paddle's top.
    const travelled = (paddle.y - (before.y + before.radius)) / (after.y - before.y);
    const crossingX = before.x + (after.x - before.x) * travelled;
    const overPaddle = Math.abs(crossingX - paddle.x) <= paddle.width / 2 + after.radius;
    if (!crossedTop || !overPaddle) return after;
    return { ...after, y: paddle.y - after.radius, vy: -Math.abs(after.vy) };
  }

  // Moves time forward by `seconds`.
  function step(game, seconds) {
    if (game.phase !== 'playing') return game;
    const { ball } = game;
    let moved = { ...ball, x: ball.x + ball.vx * seconds, y: ball.y + ball.vy * seconds };
    moved = bounceOffWalls(moved, game.area);
    moved = bounceOffPaddle(ball, moved, game.paddle);
    if (moved.y - moved.radius > game.area.height) {
      // Missed: the ball goes back onto the paddle. Losing a life comes later (#14).
      return { ...game, phase: 'waiting', ball: restingOn(game.paddle) };
    }
    return { ...game, ball: moved };
  }

  return { createGame, movePaddle, launch, step };
})();

if (typeof module !== 'undefined') {
  module.exports = BlockBreakRules;
}
