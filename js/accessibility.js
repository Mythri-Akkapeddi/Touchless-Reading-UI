let brightnessLevel = 0;

function adjustBrightness(delta) {

  brightnessLevel += delta;

  if (brightnessLevel < 0) brightnessLevel = 0;
  if (brightnessLevel > 0.6) brightnessLevel = 0.6;

  document.documentElement.style.setProperty(
    "--brightness-level",
    brightnessLevel
  );

}