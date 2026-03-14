let previousY = null;
let previousPinch = null;

function detectGestures(landmarks) {

  detectScroll(landmarks);
  detectPinch(landmarks);
  detectBrightness(landmarks);

}

function detectScroll(landmarks) {

  const wrist = landmarks[0];
  const currentY = wrist.y;

  if (previousY !== null) {

    const delta = currentY - previousY;

    if (Math.abs(delta) > 0.01) {

      const scrollAmount = delta * 600;

      scrollReader(scrollAmount);

      showGesture("Scroll");

    }
  }

  previousY = currentY;
}

function detectPinch(landmarks) {

  const thumb = landmarks[4];
  const index = landmarks[8];

  const dx = thumb.x - index.x;
  const dy = thumb.y - index.y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (previousPinch !== null) {

    const delta = distance - previousPinch;

    if (Math.abs(delta) > 0.01) {

      zoomReader(delta * 3);

      showGesture("Zoom");

    }
  }

  previousPinch = distance;
}

let previousThumbY = null;

function detectBrightness(landmarks) {

  const thumb = landmarks[4];
  const currentY = thumb.y;

  if (previousThumbY !== null) {

    const delta = previousThumbY - currentY;

    if (Math.abs(delta) > 0.01) {

      adjustBrightness(delta * 0.5);

      showGesture("Brightness");

    }
  }

  previousThumbY = currentY;
}