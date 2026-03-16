let activeGesture = null;
let gestureCooldown = false;

let previousY = null;
let previousPinch = null;

function canTriggerGesture(name) {

  if (gestureCooldown) return false;

  if (activeGesture && activeGesture !== name) return false;

  return true;
}

function lockGesture(name) {

  activeGesture = name;

  gestureCooldown = true;

  setTimeout(() => {
    gestureCooldown = false;
  }, 400);

}

function releaseGesture() {
  activeGesture = null;
}

function detectGestures(landmarks) {

  detectScroll(landmarks);
  detectPinch(landmarks);
  detectBrightness(landmarks);
  detectHighlight(landmarks);


}

// function detectScroll(landmarks) {

//   const wrist = landmarks[0];
//   const currentY = wrist.y;

//   if (previousY !== null) {

//     const delta = currentY - previousY;

//     if (Math.abs(delta) > 0.01) {

//       const scrollAmount = delta * 600;

//       scrollReader(scrollAmount);

//       showGesture("Scroll");

//     }
//   }

//   previousY = currentY;
// }

function detectScroll(landmarks) {

  const wrist = landmarks[0];
  const currentY = wrist.y;

  if (previousY !== null) {

    const delta = currentY - previousY;

    if (Math.abs(delta) > 0.02 && canTriggerGesture("scroll")) {

      lockGesture("scroll");

      const scrollAmount = delta * 600;

      scrollReader(scrollAmount);

      showGesture("Scroll");

      setTimeout(releaseGesture, 200);

    }
  }

  previousY = currentY;
}


// function detectPinch(landmarks) {

//   const thumb = landmarks[4];
//   const index = landmarks[8];

//   const dx = thumb.x - index.x;
//   const dy = thumb.y - index.y;

//   const distance = Math.sqrt(dx * dx + dy * dy);

//   if (previousPinch !== null) {

//     const delta = distance - previousPinch;

//     if (Math.abs(delta) > 0.01) {

//       zoomReader(delta * 3);

//       showGesture("Zoom");

//     }
//   }

//   previousPinch = distance;
// }

function detectPinch(landmarks) {

  const thumb = landmarks[4];
  const index = landmarks[8];

  const dx = thumb.x - index.x;
  const dy = thumb.y - index.y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (previousPinch !== null) {

    const delta = distance - previousPinch;

    if (Math.abs(delta) > 0.015 && canTriggerGesture("zoom")) {

      lockGesture("zoom");

      zoomReader(delta * 3);

      showGesture("Zoom");

      setTimeout(releaseGesture, 200);

    }
  }

  previousPinch = distance;
}




let previousThumbY = null;

// function detectBrightness(landmarks) {

//   const thumb = landmarks[4];
//   const currentY = thumb.y;

//   if (previousThumbY !== null) {

//     const delta = previousThumbY - currentY;

//     if (Math.abs(delta) > 0.01) {

//       adjustBrightness(delta * 0.5);

//       showGesture("Brightness");

//     }
//   }

//   previousThumbY = currentY;
// }

function detectBrightness(landmarks) {

  const thumb = landmarks[4];
  const index = landmarks[8];

  const thumbExtended = thumb.y < index.y;

  const currentY = thumb.y;

  if (previousThumbY !== null && thumbExtended) {

    const delta = previousThumbY - currentY;

    if (Math.abs(delta) > 0.02 && canTriggerGesture("brightness")) {

      lockGesture("brightness");

      adjustBrightness(delta * 0.5);

      showGesture("Brightness");

      setTimeout(releaseGesture, 300);

    }
  }

  previousThumbY = currentY;
}




let pointHoldStart = null;

// function detectHighlight(landmarks) {

//   const index = landmarks[8];
//   const middle = landmarks[12];

//   const distance = Math.abs(index.y - middle.y);

//   const pointing = distance > 0.1;

//   if (pointing) {

//     if (!pointHoldStart) {
//       pointHoldStart = Date.now();
//     }

//     const heldTime = Date.now() - pointHoldStart;

//     if (heldTime > 800) {

//       highlightSentence();

//       showGesture("Highlight");

//       pointHoldStart = null;
//     }

//   } else {

//     pointHoldStart = null;

//   }

// }

let lastIndexY = null;
let stillStart = null;

function detectHighlight(landmarks) {

  const index = landmarks[8];

  if (lastIndexY !== null) {

    const movement = Math.abs(index.y - lastIndexY);

    if (movement < 0.002) {

      if (!stillStart) {
        stillStart = Date.now();
      }

      const holdTime = Date.now() - stillStart;

      if (holdTime > 1200 && canTriggerGesture("highlight")) {

        lockGesture("highlight");

        highlightSentence();

        showGesture("Highlight");

        stillStart = null;

        setTimeout(releaseGesture, 600);

      }

    } else {

      stillStart = null;

    }
  }

  lastIndexY = index.y;
}