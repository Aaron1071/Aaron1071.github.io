/* ═══════════════════════════════════════════
   MAIN.JS — Entry point, init all modules
═══════════════════════════════════════════ */

import { initParticles }  from './particles.js';
import { initTypewriter } from './typewriter.js';
import { initGlitch }     from './glitch.js';
import { initNav }        from './nav.js';
import { initWriteups }   from './writeups.js';

document.addEventListener('DOMContentLoaded', async () => {

  /* ── Particles ── */
  initParticles();

  /* ── Typewriter ── */
  initTypewriter('typewriter', [
    'Cybersecurity Student @ NFSU',
    'CTF Player',
    'Ethical Hacker',
    'Bug Hunter',
    'Breaking Things Legally',
    'Learning. Hacking. Grinding.',
  ]);

  /* ── Glitch ── */
  initGlitch();

  /* ── Navigation ── */
  initNav();

  /* ── Writeups ── */
  await initWriteups();

  /* ── Scroll Reveal (Intersection Observer) ── */
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
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── Contact form submit ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, var(--clr-green), #00aa55)';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

});