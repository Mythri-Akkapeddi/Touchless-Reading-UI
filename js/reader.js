const reader = document.getElementById("reader");

let currentFontSize = 1;

function scrollReader(amount) {
  window.scrollBy({
    top: amount,
    behavior: "smooth"
  });
}

function zoomReader(scaleDelta) {

  currentFontSize += scaleDelta;

  if (currentFontSize < 0.8) currentFontSize = 0.8;
  if (currentFontSize > 2) currentFontSize = 2;

  reader.style.transform = `scale(${currentFontSize})`;
  reader.style.transformOrigin = "top center";
}

function highlightSentence() {

  const paragraphs = document.querySelectorAll("#reader p");

  if (paragraphs.length === 0) return;

  const random = Math.floor(Math.random() * paragraphs.length);

  paragraphs[random].style.background = "rgba(255,230,120,0.6)";
}