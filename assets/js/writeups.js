/* ═══════════════════════════════════════════
   WRITEUPS.JS — Load writeups from JSON
═══════════════════════════════════════════ */

export async function initWriteups() {
  const grid = document.getElementById('writeupsGrid');
  if (!grid) return;

  let writeups = [];

  try {
    const res = await fetch('data/writeups.json');
    writeups = await res.json();
  } catch (e) {
    writeups = [];
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  let activeFilter = 'all';

  function getDiffClass(diff) {
    const d = diff.toLowerCase();
    if (d === 'easy')   return 'diff-easy';
    if (d === 'medium') return 'diff-medium';
    if (d === 'hard')   return 'diff-hard';
    if (d === 'insane') return 'diff-insane';
    return 'diff-easy';
  }

  function getCatClass(cat) {
    const c = cat.toLowerCase();
    if (c === 'web')      return 'cat-web';
    if (c === 'pwn')      return 'cat-pwn';
    if (c === 'rev')      return 'cat-rev';
    if (c === 'forensics') return 'cat-forensics';
    if (c === 'ctf')      return 'cat-ctf';
    return 'cat-misc';
  }

  function renderWriteups(list) {
    grid.innerHTML = '';

    if (!list.length) {
      grid.innerHTML = `
        <div class="coming-soon-card reveal">
          <div class="cs-icon"><i class="fas fa-terminal"></i></div>
          <h3>// Coming Soon...</h3>
          <p>Writeups are loading into the system. Stay tuned.</p>
        </div>`;
      return;
    }

    // Sort by date desc
    const sorted = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));

    sorted.forEach((wu, i) => {
      const card = document.createElement('div');
      card.className = 'writeup-card reveal';
      card.style.transitionDelay = `${i * 0.08}s`;

      const tags = (wu.tags || []).map(t =>
        `<span class="card-tag">${t}</span>`
      ).join('');

      card.innerHTML = `
        <div class="card-top">
          <span class="card-category ${getCatClass(wu.category)}">${wu.category}</span>
          <span class="diff-badge ${getDiffClass(wu.difficulty)}">${wu.difficulty}</span>
        </div>
        <h3 class="card-title">${wu.title}</h3>
        <p class="card-excerpt">${wu.excerpt}</p>
        <div class="card-tags">${tags}</div>
        <div class="card-footer">
          <span class="card-date">${formatDate(wu.date)}</span>
          <span class="card-read-more">${wu.coming_soon ? 'Coming Soon...' : 'Read More →'}</span>
        </div>`;

      if (!wu.coming_soon && wu.link) {
        card.addEventListener('click', () => { window.location.href = wu.link; });
      }

      grid.appendChild(card);
    });

    // Re-trigger reveal observer for new cards
    observeReveal();
  }

  function formatDate(dateStr) {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
    } catch { return dateStr; }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      const filtered = activeFilter === 'all'
        ? writeups
        : writeups.filter(w => w.category === activeFilter);
      renderWriteups(filtered);
    });
  });

  renderWriteups(writeups);
}

function observeReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}