// Controls: turn a finger, the mouse and the keys into "move the paddle along its axis to here"
// and "launch".
// They hold no rules: the rules decide where the paddle can go.

const BlockBreakControls = (() => {
  const KEY_SPEED = 90; // play-area units per second while an arrow key is held
  const KEY_DIRECTIONS = { ArrowLeft: -1, ArrowRight: 1 }; // -1 and 1 are the two ways along the paddle's axis
  const LAUNCH_KEYS = [' ', 'Enter', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];

  function attach(canvas, view, { onMovePaddle, onLaunch }) {
    const held = new Set();

    function moveTo(event) {
      onMovePaddle(view.toPaddleAxis(event));
    }

    canvas.addEventListener('pointerdown', (event) => {
      canvas.setPointerCapture(event.pointerId);
      moveTo(event);
      onLaunch();
    });
    // On the window, so a fast mouse that leaves the canvas still takes the paddle to the edge.
    window.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'mouse' || event.buttons > 0) moveTo(event);
    });

    window.addEventListener('keydown', (event) => {
      if (event.key in KEY_DIRECTIONS) held.add(event.key);
      if (LAUNCH_KEYS.includes(event.key)) {
        event.preventDefault(); // stops Space and the arrows scrolling the page
        onLaunch();
      }
    });
    window.addEventListener('keyup', (event) => {
      held.delete(event.key);
    });

    // How far the arrow keys move the paddle in `seconds`, along its axis.
    function keyMovement(seconds) {
      let direction = 0;
      for (const key of held) direction += KEY_DIRECTIONS[key];
      return direction * KEY_SPEED * seconds;
    }

    return { keyMovement };
  }

  return { attach };
})();
