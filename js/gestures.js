// =========================================================
// gestures.js — fixed conflict + threshold version
// =========================================================

let activeGesture = null;
let gestureCooldown = false;

let previousWristY   = null;
let previousPinch    = null;
let previousThumbY   = null;
let lastIndexY       = null;
let stillStart       = null;

// ── Cooldown helpers ─────────────────────────────────────

function canTriggerGesture(name) {
  if (gestureCooldown) return false;
  if (activeGesture && activeGesture !== name) return false;
  return true;
}

function lockGesture(name, ms = 400) {
  activeGesture = name;
  gestureCooldown = true;
  setTimeout(() => { gestureCooldown = false; }, ms);
}

function releaseGesture() {
  activeGesture = null;
}

// ── Pose classifier ──────────────────────────────────────
// Returns: "open" | "pinch" | "thumbOnly" | "point" | "unknown"
// This is the KEY addition — only one detector runs per frame.

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

  // Finger "extended" = tip is above (lower y) its MCP knuckle
  const indexExt  = indexTip.y  < indexMcp.y  - 0.04;
  const middleExt = middleTip.y < middleMcp.y - 0.04;
  const ringExt   = ringTip.y   < ringMcp.y   - 0.04;
  const pinkyExt  = pinkyTip.y  < pinkyMcp.y  - 0.04;

  // Pinch = thumb & index close together, others relaxed
  const dx = thumbTip.x - indexTip.x;
  const dy = thumbTip.y - indexTip.y;
  const pinchDist = Math.sqrt(dx*dx + dy*dy);
  const isPinching = pinchDist < 0.08;

  // Thumb-only = thumb extended upward, fingers curled
  const thumbExtendedUp = thumbTip.y < wrist.y - 0.1;
  const fingersAllCurled = !indexExt && !middleExt && !ringExt && !pinkyExt;

  if (isPinching && !indexExt) return "pinch";
  if (thumbExtendedUp && fingersAllCurled) return "thumbOnly";
  if (indexExt && !middleExt && !ringExt && !pinkyExt) return "point";
  return "open"; // default: treat as scroll/open-hand
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

// ── Scroll ───────────────────────────────────────────────

function detectScroll(landmarks) {
  const wrist = landmarks[0];
  const currentY = wrist.y;

  if (previousWristY !== null) {
    const delta = currentY - previousWristY;

    // Raised to 0.05 — arm-drop is usually 0.02–0.04, intentional scroll > 0.05
    if (Math.abs(delta) > 0.05 && canTriggerGesture("scroll")) {
      lockGesture("scroll", 300);
      scrollReader(delta * 500);
      showGesture("Scroll");
      setTimeout(releaseGesture, 150);
    }
  }

  previousWristY = currentY;
}

// ── Zoom (pinch) ─────────────────────────────────────────

function detectPinch(landmarks) {
  const thumb = landmarks[4];
  const index = landmarks[8];

  const dx = thumb.x - index.x;
  const dy = thumb.y - index.y;
  const distance = Math.sqrt(dx*dx + dy*dy);

  if (previousPinch !== null) {
    const delta = distance - previousPinch;

    if (Math.abs(delta) > 0.015 && canTriggerGesture("zoom")) {
      lockGesture("zoom", 300);
      zoomReader(delta * 3);
      showGesture("Zoom");
      setTimeout(releaseGesture, 150);
    }
  }

  previousPinch = distance;
}

// ── Brightness (thumb up = brighter, thumb down = dimmer) ─

function detectBrightness(landmarks) {
  const thumb = landmarks[4];
  const currentY = thumb.y;

  if (previousThumbY !== null) {
    const delta = previousThumbY - currentY; // negative = thumb moving down

    if (Math.abs(delta) > 0.025 && canTriggerGesture("brightness")) {
      lockGesture("brightness", 250);
      adjustBrightness(delta * 0.5);
      showGesture("Brightness");
      setTimeout(releaseGesture, 200);
    }
  }

  previousThumbY = currentY;
}

// ── Highlight (point & hold) ─────────────────────────────

function detectHighlight(landmarks) {
  const index = landmarks[8];
  const currentY = index.y;

  if (lastIndexY !== null) {
    const movement = Math.abs(currentY - lastIndexY);

    // Raised from 0.002 to 0.012 — smoothing still leaves small drift at 0.002
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