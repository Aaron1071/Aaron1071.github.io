/* ═══════════════════════════════════════════
   TYPEWRITER.JS
═══════════════════════════════════════════ */

export function initTypewriter(elementId, strings, options = {}) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const defaults = [
    'CTF Player',
    'Bug Hunter',
    'Malware Analyst',
    'Pen Tester',
    'Reverse Engineer',
    'Packet Sniffer',
  ];

  const list = (strings && strings.length) ? strings : defaults;

  const config = {
    typeSpeed:   65,
    deleteSpeed: 35,
    pauseAfter:  2000,
    pauseBefore: 400,
    ...options,
  };

  let current = 0;
  let charIdx = 0;
  let isDeleting = false;

  function tick() {
    const str = list[current % list.length];

    if (!isDeleting) {
      el.textContent = str.slice(0, ++charIdx);
      if (charIdx === str.length) {
        isDeleting = true;
        return setTimeout(tick, config.pauseAfter);
      }
      setTimeout(tick, config.typeSpeed);
    } else {
      el.textContent = str.slice(0, --charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        current++;
        return setTimeout(tick, config.pauseBefore);
      }
      setTimeout(tick, config.deleteSpeed);
    }
  }

  setTimeout(tick, 600);
}
