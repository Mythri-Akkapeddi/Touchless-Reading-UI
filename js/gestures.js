// =========================================================
// gestures.js — FINAL (conflict-free + smooth + zoom-out fix)
// =========================================================

let activeGesture = null;

// Per-gesture cooldowns (instead of one global lock)
const gestureCooldowns = {};

// State trackers
let previousWristY   = null;
let previousPinch    = null;
let previousThumbY   = null;
let lastIndexY       = null;
let stillStart       = null;

// NEW: pinch hysteresis state (fixes zoom-out)
let isPinchActive = false;

// ── Cooldown helpers ─────────────────────────────────────

function canTriggerGesture(name) {
  if (gestureCooldowns[name]) return false;

  // Only block conflicting gestures
  if (name === "scroll" && activeGesture === "zoom") return false;
  if (name === "zoom" && activeGesture === "scroll") return false;

  return true;
}

function lockGesture(name, ms = 400) {
  activeGesture = name;
  gestureCooldowns[name] = true;

  setTimeout(() => {
    gestureCooldowns[name] = false;
  }, ms);
}

function releaseGesture() {
  activeGesture = null;
}

// ── Pose classifier (single source of truth) ─────────────

function classifyPose(lm) {
  const thumbTip  = lm[4];
  const indexTip  = lm[8];
  const middleTip = lm[12];
  const ringTip   = lm[16];
  const pinkyTip  = lm[20];

  const indexMcp  = lm[5];
  const middleMcp = lm[9];
  const ringMcp   = lm[13];
  const pinkyMcp  = lm[17];
  const wrist     = lm[0];

  // Finger extension detection
  const indexExt  = indexTip.y  < indexMcp.y  - 0.04;
  const middleExt = middleTip.y < middleMcp.y - 0.04;
  const ringExt   = ringTip.y   < ringMcp.y   - 0.04;
  const pinkyExt  = pinkyTip.y  < pinkyMcp.y  - 0.04;

  // Pinch distance
  const dx = thumbTip.x - indexTip.x;
  const dy = thumbTip.y - indexTip.y;
  const pinchDist = Math.sqrt(dx * dx + dy * dy);

  // HYSTERESIS (KEY FIX)
  // Enter pinch at 0.08, exit only after 0.18
  if (pinchDist < 0.08) isPinchActive = true;
  if (pinchDist > 0.18) isPinchActive = false;

  // Thumb-only detection
  const thumbExtendedUp = thumbTip.y < wrist.y - 0.1;
  const fingersAllCurled = !indexExt && !middleExt && !ringExt && !pinkyExt;

  if (isPinchActive) return "pinch";
  if (thumbExtendedUp && fingersAllCurled) return "thumbOnly";
  if (indexExt && !middleExt && !ringExt && !pinkyExt) return "point";
  return "open";
}

// ── Main entry ───────────────────────────────────────────

function detectGestures(landmarks) {
  const pose = classifyPose(landmarks);

  // Reset pose-specific state when pose changes
  if (pose !== "point")     { stillStart = null; lastIndexY = null; }
  if (pose !== "thumbOnly") { previousThumbY = null; }
  if (pose !== "open")      { previousWristY = null; }
  if (pose !== "pinch")     { previousPinch = null; }

  switch (pose) {
    case "open":      detectScroll(landmarks);     break;
    case "pinch":     detectPinch(landmarks);      break;
    case "thumbOnly": detectBrightness(landmarks); break;
    case "point":     detectHighlight(landmarks);  break;
  }
}

// ── Scroll (smoothed + no lag) ───────────────────────────

function detectScroll(landmarks) {
  const wrist = landmarks[0];
  const currentY = wrist.y;

  if (previousWristY !== null) {
    const delta = currentY - previousWristY;

    // Better threshold
    if (Math.abs(delta) > 0.03 && canTriggerGesture("scroll")) {
      lockGesture("scroll", 200);

      // Direct scroll (no smooth stacking lag)
      window.scrollBy(0, delta * 600);

      showGesture("Scroll");
      setTimeout(releaseGesture, 100);
    }
  }

  previousWristY = currentY;
}

// ── Zoom (pinch in + pinch out both work now) ────────────

function detectPinch(landmarks) {
  const thumb = landmarks[4];
  const index = landmarks[8];

  const dx = thumb.x - index.x;
  const dy = thumb.y - index.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (previousPinch !== null) {
    const delta = distance - previousPinch;

    if (Math.abs(delta) > 0.015 && canTriggerGesture("zoom")) {
      lockGesture("zoom", 250);

      zoomReader(delta * 3);

      showGesture("Zoom");
      setTimeout(releaseGesture, 120);
    }
  }

  previousPinch = distance;
}

// ── Brightness ───────────────────────────────────────────

function detectBrightness(landmarks) {
  const thumb = landmarks[4];
  const currentY = thumb.y;

  if (previousThumbY !== null) {
    const delta = previousThumbY - currentY;

    if (Math.abs(delta) > 0.025 && canTriggerGesture("brightness")) {
      lockGesture("brightness", 250);

      adjustBrightness(delta * 0.5);

      showGesture("Brightness");
      setTimeout(releaseGesture, 200);
    }
  }

  previousThumbY = currentY;
}

// ── Highlight (stable hold) ──────────────────────────────

function detectHighlight(landmarks) {
  const index = landmarks[8];
  const currentY = index.y;

  if (lastIndexY !== null) {
    const movement = Math.abs(currentY - lastIndexY);

    if (movement < 0.012) {
      if (!stillStart) stillStart = Date.now();

      const held = Date.now() - stillStart;

      if (held > 1000 && canTriggerGesture("highlight")) {
        lockGesture("highlight", 800);

        highlightSentence();

        showGesture("Highlight ✓");

        stillStart = null;
        setTimeout(releaseGesture, 600);
      }
    } else {
      stillStart = null;
    }
  }

  lastIndexY = currentY;
}