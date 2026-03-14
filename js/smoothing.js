const landmarkHistory = [];
const SMOOTHING_FRAMES = 5;

function smoothLandmarks(landmarks) {

  landmarkHistory.push(landmarks);

  if (landmarkHistory.length > SMOOTHING_FRAMES) {
    landmarkHistory.shift();
  }

  const smoothed = [];

  for (let i = 0; i < landmarks.length; i++) {

    let sumX = 0;
    let sumY = 0;
    let sumZ = 0;

    landmarkHistory.forEach(frame => {
      sumX += frame[i].x;
      sumY += frame[i].y;
      sumZ += frame[i].z;
    });

    smoothed.push({
      x: sumX / landmarkHistory.length,
      y: sumY / landmarkHistory.length,
      z: sumZ / landmarkHistory.length
    });
  }

  return smoothed;
}