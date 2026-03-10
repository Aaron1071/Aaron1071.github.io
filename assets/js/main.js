/* ═══════════════════════════════════════════
   MAIN.JS — Entry point, init all modules
═══════════════════════════════════════════ */

import { initParticles }  from './particles.js';
import { initTypewriter } from './typewriter.js';
import { initGlitch }     from './glitch.js';
import { initNav }        from './nav.js';
import { initWriteups }   from './writeups.js';

/* ── Boot sequence ── */
const BOOT_LINES = [
  { text: 'INITIALIZING OPERATOR INTERFACE...', cls: '' },
  { text: '[OK] KERNEL MODULES LOADED',         cls: 'ok' },
  { text: '[OK] NETWORK INTERFACES UP',         cls: 'ok' },
  { text: '[OK] CRYPTOGRAPHIC ENGINE READY',    cls: 'ok' },
  { text: '[WARN] CLEARANCE: OPERATOR LEVEL',   cls: 'warn' },
  { text: '[OK] IDENTITY CONFIRMED → AARON',    cls: 'ok' },
  { text: '[OK] PET NAME → TYLER',              cls: 'ok' },
  { text: '[OK] BASE → NFSU, GANDHINAGAR',      cls: 'ok' },
  { text: 'BOOTING INTERFACE...',               cls: '' },
];

function runBoot() {
  const logEl = document.getElementById('boot-log');
  const bar   = document.getElementById('boot-bar');
  if (!logEl) return;
  BOOT_LINES.forEach(({ text, cls }, i) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.textContent = text;
      if (cls) line.classList.add(cls);
      logEl.appendChild(line);
    }, i * 200);
  });
  setTimeout(() => { if (bar) bar.style.width = '100%'; }, 200);
  setTimeout(() => {
    const boot = document.getElementById('boot');
    if (boot) boot.classList.add('hidden');
    initCounters();
  }, 2200);
}

/* ── Animated counters ── */
function animCounter(el, target, duration = 1800) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const prog = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.round(ease * target);
    if (prog < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const cw = document.getElementById('c-writeups');
  const cc = document.getElementById('c-ctf');
  const cv = document.getElementById('c-cve');
  if (cw) animCounter(cw, 5);
  if (cc) animCounter(cc, 8);
  if (cv) animCounter(cv, 3);
}

/* ── Ticker ── */
function initTicker() {
  const el = document.getElementById('ticker');
  if (!el) return;
  const items = [
    'WEB EXPLOITATION','REVERSE ENGINEERING','BINARY ANALYSIS',
    'NETWORK FORENSICS','MALWARE DETECTION','CTF COMPETITOR',
    'PACKET DISSECTION','STACK SMASHING','HEAP GROOMING',
    'NFSU CYBERSEC','GHIDRA','BURPSUITE','WIRESHARK',
    'PWNTOOLS','GOBUSTER','NMAP','METASPLOIT',
    'SQLi','XSS','LFI','RCE','SSRF','ROP CHAINS',
  ];
  const doubled = [...items, ...items];
  el.innerHTML = doubled.map(t => `<span>${t}</span>`).join('');
}

/* ── Custom cursor ── */
function initCursor() {
  const dot    = document.getElementById('c-dot');
  const ring   = document.getElementById('c-ring');
  const crossH = document.getElementById('c-cross-h');
  const crossV = document.getElementById('c-cross-v');
  if (!dot) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left    = mx + 'px';
    dot.style.top     = my + 'px';
    if (crossH) crossH.style.top  = my + 'px';
    if (crossV) crossV.style.left = mx + 'px';
  });

  const lerp = () => {
    rx += (mx - rx) * .1;
    ry += (my - ry) * .1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(lerp);
  };
  lerp();

  document.querySelectorAll('a, button, .writeup-card, .social-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform = 'translate(-50%,-50%) scale(3)';
      ring.style.width    = ring.style.height = '48px';
      ring.style.borderColor = 'rgba(173,255,47,.8)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.width    = ring.style.height = '28px';
      ring.style.borderColor = 'rgba(173,255,47,.5)';
    });
  });
}

/* ── Radar canvas ── */
function initRadar() {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;
  const ctx  = canvas.getContext('2d');
  const size = canvas.width = canvas.height = Math.min(window.innerWidth * .6, 700);
  const cx = size / 2, cy = size / 2, maxR = size / 2;
  let angle = 0;

  const draw = () => {
    ctx.clearRect(0, 0, size, size);
    for (let r = maxR / 5; r <= maxR; r += maxR / 5) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(173,255,47,${0.06 + (1 - (r / maxR)) * 0.08})`;
      ctx.lineWidth = .8;
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(173,255,47,.06)'; ctx.lineWidth = .6;
    [[cx,0,cx,size],[0,cy,size,cy]].forEach(([x1,y1,x2,y2]) => {
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    });
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle);
    const sweep = ctx.createRadialGradient(0,0,0,0,0,maxR);
    sweep.addColorStop(0,  'rgba(173,255,47,0.0)');
    sweep.addColorStop(0.9,'rgba(173,255,47,0.08)');
    sweep.addColorStop(1,  'rgba(173,255,47,0.0)');
    ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0,0,maxR,-Math.PI/8,0); ctx.closePath();
    ctx.fillStyle = sweep; ctx.fill();
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(maxR,0);
    ctx.strokeStyle = 'rgba(173,255,47,.4)'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.restore();
    const blips = [{a:.4,r:.6},{a:2.1,r:.35},{a:3.8,r:.7},{a:5.0,r:.5}];
    blips.forEach(b => {
      const bx = cx + Math.cos(b.a)*b.r*maxR;
      const by = cy + Math.sin(b.a)*b.r*maxR;
      const ad = ((angle - b.a) % (Math.PI*2) + Math.PI*2) % (Math.PI*2);
      const fade = ad < .3 ? 1 : Math.max(0, 1 - ad/(Math.PI*1.5));
      if (fade > 0) {
        ctx.beginPath(); ctx.arc(bx,by,3,0,Math.PI*2);
        ctx.fillStyle = `rgba(173,255,47,${fade*.8})`; ctx.fill();
        ctx.beginPath(); ctx.arc(bx,by,6,0,Math.PI*2);
        ctx.fillStyle = `rgba(173,255,47,${fade*.15})`; ctx.fill();
      }
    });
    angle += .008;
    requestAnimationFrame(draw);
  };
  draw();
}

/* ── Reading progress bar ── */
function initReadBar() {
  window.addEventListener('scroll', () => {
    const bar   = document.getElementById('read-bar');
    if (!bar) return;
    const total = document.body.scrollHeight - window.innerHeight;
    if (total > 0) bar.style.width = (window.scrollY / total * 100) + '%';
  });
}

document.addEventListener('DOMContentLoaded', async () => {

  /* Boot first */
  runBoot();
  initTicker();
  initCursor();
  initRadar();
  initReadBar();

  /* ── Particles ── */
  initParticles();

  /* ── Typewriter ── */
  initTypewriter('typewriter', [
    'CTF Player',
    'Bug Hunter',
    'Malware Analyst',
    'Pen Tester',
    'Reverse Engineer',
    'Packet Sniffer',
  ]);

  /* ── Glitch ── */
  initGlitch();

  /* ── Navigation ── */
  initNav();

  /* ── Writeups ── */
  await initWriteups();

  /* ── Scroll Reveal ── */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Skill bars animate on scroll ── */
  const skillObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

  /* ── Timeline line draw ── */
  const timelineObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  const timeline = document.querySelector('.timeline');
  if (timeline) timelineObserver.observe(timeline);

  /* ── Card tilt on hover ── */
  document.querySelectorAll('.writeup-card, .skill-card, .timeline-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ── Contact form submit ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'var(--lime2)';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

});
