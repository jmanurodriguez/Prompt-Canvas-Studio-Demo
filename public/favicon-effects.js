(function() {
  const favicon = document.querySelector('link[rel="shortcut icon"]');
  if (!favicon) return;

  // Efecto de rotación suave
  let angle = 0;
  setInterval(() => {
    angle = (angle + 1) % 360;
    favicon.style.transform = `rotate(${angle}deg)`;
  }, 50);

  // Efecto de pulso
  let scale = 1;
  let growing = true;
  setInterval(() => {
    if (growing) {
      scale += 0.05;
      if (scale >= 1.2) growing = false;
    } else {
      scale -= 0.05;
      if (scale <= 1) growing = true;
    }
    favicon.style.transform = `scale(${scale})`;
  }, 100);
})(); 