const feedback   = document.getElementById("gesture-feedback");
const label      = document.getElementById("active-gesture-label");
const barFill    = document.getElementById("confidence-bar-fill");
const barPct     = document.getElementById("confidence-bar-pct");
const healthDot  = document.getElementById("health-dot");

function updateHealthDot(conf) {
  if (!healthDot) return;

  healthDot.style.background =
    conf > 0 ? "#4ade80" : "#ef4444";

  healthDot.title =
    conf > 0 ? "Hand detected" : "No hand detected";
}

function showGesture(name, conf = 0.85) {
  label.textContent = name;
  feedback.style.opacity = 1;

  if (barFill && barPct) {
    const pct = Math.round(conf * 100);

    barFill.style.width = pct + "%";
    barFill.style.background =
      conf > 0.75 ? "#4ade80" :
      conf > 0.5  ? "#facc15" :
                    "#f87171";

    barPct.textContent = pct + "%";

    document.getElementById("confidence-bar-wrap").style.display = "flex";
  }

  clearTimeout(showGesture._t);

  showGesture._t = setTimeout(() => {
    feedback.style.opacity = 0;
    document.getElementById("confidence-bar-wrap").style.display = "none";
  }, 900);
}