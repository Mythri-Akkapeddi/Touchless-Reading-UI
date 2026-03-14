const feedback = document.getElementById("gesture-feedback");
const label = document.getElementById("active-gesture-label");

function showGesture(name) {

  label.textContent = name;

  feedback.style.opacity = 1;

  clearTimeout(showGesture.timeout);

  showGesture.timeout = setTimeout(() => {
    feedback.style.opacity = 0;
  }, 800);
}