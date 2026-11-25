// Controls: turn a finger, the mouse and the keys into "move the paddle along its axis to here".
// They hold no rules: the rules decide where the paddle can go.

const BlockBreakControls = (() => {
  const KEY_SPEED = 90; // play-area units per second while an arrow key is held

  function attach(canvas, view, onMovePaddle) {
    const held = { left: false, right: false };

    function followPointer(event) {
      if (event.pointerType === 'mouse' || event.buttons > 0) {
        onMovePaddle(view.toPaddleAxis(event.clientX));
      }
    }

    canvas.addEventListener('pointerdown', (event) => {
      canvas.setPointerCapture(event.pointerId);
      onMovePaddle(view.toPaddleAxis(event.clientX));
    });
    canvas.addEventListener('pointermove', followPointer);

    window.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') held.left = true;
      if (event.key === 'ArrowRight') held.right = true;
    });
    window.addEventListener('keyup', (event) => {
      if (event.key === 'ArrowLeft') held.left = false;
      if (event.key === 'ArrowRight') held.right = false;
    });

    // How far the arrow keys move the paddle in `seconds`, along its axis.
    function keyMovement(seconds) {
      return ((held.right ? 1 : 0) - (held.left ? 1 : 0)) * KEY_SPEED * seconds;
    }

    return { keyMovement };
  }

  return { attach };
})();
