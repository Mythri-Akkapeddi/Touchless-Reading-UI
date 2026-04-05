const video = document.getElementById("camera");
const canvas = document.getElementById("debug-canvas");
const ctx = canvas.getContext("2d");

const hands = new Hands({
  locateFile: (file) =>
    `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.6, // slightly lowered for real-world use
  minTrackingConfidence: 0.6
});

hands.onResults(onResults);

function onResults(results) {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const hasHand =
    results.multiHandLandmarks &&
    results.multiHandLandmarks.length > 0;

  updateHealthDot(hasHand ? 1 : 0);

  if (hasHand) {
    for (const landmarks of results.multiHandLandmarks) {

      drawConnectors(ctx, landmarks, HAND_CONNECTIONS);
      drawLandmarks(ctx, landmarks);

      const smoothed = smoothLandmarks(landmarks);

      detectGestures(smoothed);
    }
  }

  ctx.restore();
}

const camera = new Camera(video, {
  onFrame: async () => {
    await hands.send({ image: video });
  },
  width: 640,
  height: 480
});

camera.start();