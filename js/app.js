document.addEventListener("DOMContentLoaded", () => {
  const setupScreen = document.getElementById("setup-screen");
  const readerScreen = document.getElementById("reader-screen");
  const reader = document.getElementById("reader");

  const textInput = document.getElementById("text-input");
  const startButton = document.getElementById("start-reading");
  const sampleButtons = document.querySelectorAll(".sample-buttons button");

  /* -----------------------------------------
     MODE SWITCHING
     ----------------------------------------- */

  function enterReadingMode(text) {
    reader.innerHTML = formatText(text);

    setupScreen.style.display = "none";
    readerScreen.style.display = "block";

    window.scrollTo(0, 0);
  }

  /* -----------------------------------------
     TEXT FORMATTING
     ----------------------------------------- */

  function formatText(text) {
    const paragraphs = text
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    return paragraphs
      .map(p => `<p>${p}</p>`)
      .join("");
  }

  /* -----------------------------------------
     START READING (PASTED TEXT)
     ----------------------------------------- */

  startButton.addEventListener("click", () => {
    const text = textInput.value.trim();

    if (text.length === 0) {
      alert("Please paste some text or choose a sample.");
      return;
    }

    enterReadingMode(text);
  });

  /* -----------------------------------------
     SAMPLE CONTENT BUTTONS
     ----------------------------------------- */

  sampleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const sampleName = button.dataset.sample;
      loadSample(sampleName);
    });
  });

  function loadSample(name) {
    fetch(`data/samples/${name}.txt`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load sample content.");
        }
        return response.text();
      })
      .then(text => {
        enterReadingMode(text);
      })
      .catch(error => {
        console.error(error);
        alert("Could not load sample content.");
      });
  }
});
