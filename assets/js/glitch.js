/* ═══════════════════════════════════════════
   GLITCH.JS — Random glitch trigger
═══════════════════════════════════════════ */

export function initGlitch() {
  const glitchEls = document.querySelectorAll('.glitch');
  if (!glitchEls.length) return;

  glitchEls.forEach(el => {
    // Random glitch intensification intervals
    setInterval(() => {
      const duration = Math.random() * 300 + 100;
      el.style.setProperty('--glitch-active', '1');
      setTimeout(() => el.style.setProperty('--glitch-active', '0'), duration);
    }, Math.random() * 4000 + 2000);
  });
}