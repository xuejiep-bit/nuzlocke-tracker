/* ============================================
   PIXEL DECORATIONS - Nuzlocke Tracker
   Original pixel art elements (no copyright)
   Add to any page: <script src="pixel-decorations.js"></script>
   ============================================ */

(function() {
  'use strict';

  // ===== INJECT CSS =====
  const css = document.createElement('style');
  css.textContent = `
    /* ===== Floating Pixel Particles ===== */
    .px-particles {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }
    .px-particle {
      position: absolute;
      image-rendering: pixelated;
      opacity: 0;
      animation: pxFloat linear infinite;
    }
    @keyframes pxFloat {
      0% { opacity: 0; transform: translateY(100vh) rotate(0deg); }
      10% { opacity: 0.6; }
      90% { opacity: 0.6; }
      100% { opacity: 0; transform: translateY(-20px) rotate(360deg); }
    }

    /* ===== Pixel Pokeball Divider ===== */
    .px-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin: 32px 0;
      opacity: 0.5;
    }
    .px-divider-line {
      flex: 1;
      height: 2px;
      background: repeating-linear-gradient(
        90deg,
        var(--accent-red, #e74c3c) 0px,
        var(--accent-red, #e74c3c) 4px,
        transparent 4px,
        transparent 8px
      );
      image-rendering: pixelated;
    }

    /* ===== Section Pixel Icons ===== */
    .px-icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-right: 8px;
      vertical-align: middle;
      image-rendering: pixelated;
    }

    /* ===== Pixel Corner Decorations ===== */
    .px-corner-tl, .px-corner-tr, .px-corner-bl, .px-corner-br {
      position: fixed;
      pointer-events: none;
      z-index: 1;
      opacity: 0.15;
      image-rendering: pixelated;
    }
    .px-corner-tl { top: 20px; left: 20px; }
    .px-corner-tr { top: 20px; right: 20px; }
    .px-corner-bl { bottom: 20px; left: 20px; }
    .px-corner-br { bottom: 20px; right: 20px; }

    /* ===== Hero Pixel Badge ===== */
    .px-hero-badge {
      display: inline-block;
      margin-bottom: 16px;
      animation: pxBadgePulse 3s ease-in-out infinite;
    }
    @keyframes pxBadgePulse {
      0%, 100% { filter: drop-shadow(0 0 8px rgba(231, 76, 60, 0.4)); }
      50% { filter: drop-shadow(0 0 16px rgba(231, 76, 60, 0.7)); }
    }

    /* ===== Pixel Grass Footer Decoration ===== */
    .px-grass-row {
      display: flex;
      justify-content: center;
      gap: 0;
      margin-top: 24px;
      opacity: 0.6;
      overflow: hidden;
    }

    /* ===== Pixel Star Sparkle Effect on Headings ===== */
    .px-sparkle {
      position: relative;
    }
    .px-sparkle::after {
      content: '';
      position: absolute;
      top: -4px;
      right: -20px;
      width: 16px;
      height: 16px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect x='7' y='0' width='2' height='16' fill='%23f1c40f'/%3E%3Crect x='0' y='7' width='16' height='2' fill='%23f1c40f'/%3E%3Crect x='3' y='3' width='2' height='2' fill='%23f1c40f'/%3E%3Crect x='11' y='3' width='2' height='2' fill='%23f1c40f'/%3E%3Crect x='3' y='11' width='2' height='2' fill='%23f1c40f'/%3E%3Crect x='11' y='11' width='2' height='2' fill='%23f1c40f'/%3E%3C/svg%3E");
      image-rendering: pixelated;
      animation: pxTwinkle 2s ease-in-out infinite;
    }
    @keyframes pxTwinkle {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(0.7); }
    }

    /* ===== Pixel Battle Border for Cards ===== */
    .px-battle-border {
      border-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Crect x='0' y='0' width='4' height='4' fill='%23e74c3c'/%3E%3Crect x='4' y='0' width='4' height='4' fill='%231a1a2e'/%3E%3Crect x='8' y='0' width='4' height='4' fill='%23e74c3c'/%3E%3Crect x='0' y='4' width='4' height='4' fill='%231a1a2e'/%3E%3Crect x='4' y='4' width='4' height='4' fill='transparent'/%3E%3Crect x='8' y='4' width='4' height='4' fill='%231a1a2e'/%3E%3Crect x='0' y='8' width='4' height='4' fill='%23e74c3c'/%3E%3Crect x='4' y='8' width='4' height='4' fill='%231a1a2e'/%3E%3Crect x='8' y='8' width='4' height='4' fill='%23e74c3c'/%3E%3C/svg%3E") 4 fill / 4px / 0 round;
    }

    @media (max-width: 768px) {
      .px-corner-tl, .px-corner-tr, .px-corner-bl, .px-corner-br {
        display: none;
      }
      .px-particles .px-particle {
        opacity: 0 !important;
      }
    }
  `;
  document.head.appendChild(css);

  // ===== SVG GENERATORS =====

  // Original Pixel Pokeball (generic capture ball - not trademarked design)
  function createPixelBall(size, color1, color2) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${size}" height="${size}" style="image-rendering:pixelated">
      <rect x="5" y="0" width="6" height="1" fill="${color1}"/>
      <rect x="3" y="1" width="2" height="1" fill="${color1}"/>
      <rect x="11" y="1" width="2" height="1" fill="${color1}"/>
      <rect x="2" y="2" width="1" height="1" fill="${color1}"/>
      <rect x="13" y="2" width="1" height="1" fill="${color1}"/>
      <rect x="3" y="2" width="10" height="1" fill="${color1}"/>
      <rect x="1" y="3" width="1" height="1" fill="${color1}"/>
      <rect x="14" y="3" width="1" height="1" fill="${color1}"/>
      <rect x="2" y="3" width="12" height="1" fill="${color1}"/>
      <rect x="1" y="4" width="14" height="1" fill="${color1}"/>
      <rect x="1" y="5" width="14" height="1" fill="${color1}"/>
      <rect x="0" y="6" width="16" height="1" fill="${color1}"/>
      <rect x="0" y="7" width="5" height="1" fill="#2c3e50"/>
      <rect x="11" y="7" width="5" height="1" fill="#2c3e50"/>
      <rect x="5" y="7" width="2" height="1" fill="#2c3e50"/>
      <rect x="9" y="7" width="2" height="1" fill="#2c3e50"/>
      <rect x="7" y="6" width="2" height="1" fill="#ecf0f1"/>
      <rect x="6" y="7" width="1" height="1" fill="#ecf0f1"/>
      <rect x="9" y="7" width="1" height="1" fill="#ecf0f1"/>
      <rect x="7" y="8" width="2" height="1" fill="#ecf0f1"/>
      <rect x="0" y="8" width="5" height="1" fill="#2c3e50"/>
      <rect x="11" y="8" width="5" height="1" fill="#2c3e50"/>
      <rect x="5" y="8" width="2" height="1" fill="#2c3e50"/>
      <rect x="9" y="8" width="2" height="1" fill="#2c3e50"/>
      <rect x="0" y="9" width="16" height="1" fill="${color2}"/>
      <rect x="1" y="10" width="14" height="1" fill="${color2}"/>
      <rect x="1" y="11" width="14" height="1" fill="${color2}"/>
      <rect x="2" y="12" width="12" height="1" fill="${color2}"/>
      <rect x="1" y="12" width="1" height="1" fill="${color2}"/>
      <rect x="14" y="12" width="1" height="1" fill="${color2}"/>
      <rect x="3" y="13" width="10" height="1" fill="${color2}"/>
      <rect x="2" y="13" width="1" height="1" fill="${color2}"/>
      <rect x="13" y="13" width="1" height="1" fill="${color2}"/>
      <rect x="5" y="14" width="6" height="1" fill="${color2}"/>
      <rect x="3" y="14" width="2" height="1" fill="${color2}"/>
      <rect x="11" y="14" width="2" height="1" fill="${color2}"/>
      <rect x="5" y="15" width="6" height="1" fill="${color2}"/>
    </svg>`;
  }

  // Pixel Star
  function createPixelStar(size, color) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="${size}" height="${size}" style="image-rendering:pixelated">
      <rect x="3" y="0" width="2" height="2" fill="${color}"/>
      <rect x="0" y="3" width="2" height="2" fill="${color}"/>
      <rect x="6" y="3" width="2" height="2" fill="${color}"/>
      <rect x="3" y="6" width="2" height="2" fill="${color}"/>
      <rect x="2" y="2" width="4" height="4" fill="${color}"/>
    </svg>`;
  }

  // Pixel Grass Tuft
  function createPixelGrass(size) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 12" width="${size}" height="${Math.floor(size*0.75)}" style="image-rendering:pixelated">
      <rect x="2" y="8" width="12" height="4" fill="#1a472a"/>
      <rect x="1" y="6" width="2" height="4" fill="#2ecc71"/>
      <rect x="4" y="4" width="2" height="6" fill="#27ae60"/>
      <rect x="7" y="2" width="2" height="8" fill="#2ecc71"/>
      <rect x="10" y="5" width="2" height="5" fill="#27ae60"/>
      <rect x="13" y="6" width="2" height="4" fill="#2ecc71"/>
      <rect x="3" y="3" width="1" height="1" fill="#2ecc71"/>
      <rect x="6" y="1" width="1" height="1" fill="#27ae60"/>
      <rect x="11" y="4" width="1" height="1" fill="#2ecc71"/>
    </svg>`;
  }

  // Pixel Heart (HP icon)
  function createPixelHeart(size, color) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 10" width="${size}" height="${Math.floor(size*0.83)}" style="image-rendering:pixelated">
      <rect x="1" y="0" width="4" height="2" fill="${color}"/>
      <rect x="7" y="0" width="4" height="2" fill="${color}"/>
      <rect x="0" y="1" width="6" height="2" fill="${color}"/>
      <rect x="6" y="1" width="6" height="2" fill="${color}"/>
      <rect x="0" y="2" width="12" height="2" fill="${color}"/>
      <rect x="1" y="4" width="10" height="2" fill="${color}"/>
      <rect x="2" y="6" width="8" height="1" fill="${color}"/>
      <rect x="3" y="7" width="6" height="1" fill="${color}"/>
      <rect x="4" y="8" width="4" height="1" fill="${color}"/>
      <rect x="5" y="9" width="2" height="1" fill="${color}"/>
      <rect x="2" y="1" width="2" height="1" fill="#ff8888" opacity="0.5"/>
    </svg>`;
  }

  // Pixel Shield / Badge
  function createPixelShield(size, color) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 14" width="${size}" height="${Math.floor(size*1.17)}" style="image-rendering:pixelated">
      <rect x="2" y="0" width="8" height="1" fill="${color}"/>
      <rect x="1" y="1" width="10" height="1" fill="${color}"/>
      <rect x="0" y="2" width="12" height="6" fill="${color}"/>
      <rect x="1" y="8" width="10" height="1" fill="${color}"/>
      <rect x="2" y="9" width="8" height="1" fill="${color}"/>
      <rect x="3" y="10" width="6" height="1" fill="${color}"/>
      <rect x="4" y="11" width="4" height="1" fill="${color}"/>
      <rect x="5" y="12" width="2" height="1" fill="${color}"/>
      <rect x="4" y="3" width="4" height="1" fill="#f1c40f"/>
      <rect x="5" y="4" width="2" height="3" fill="#f1c40f"/>
      <rect x="4" y="5" width="4" height="1" fill="#f1c40f"/>
    </svg>`;
  }

  // Pixel Sword
  function createPixelSword(size) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 16" width="${size}" height="${size*2}" style="image-rendering:pixelated">
      <rect x="3" y="0" width="2" height="1" fill="#bdc3c7"/>
      <rect x="3" y="1" width="2" height="8" fill="#ecf0f1"/>
      <rect x="4" y="1" width="1" height="6" fill="#bdc3c7"/>
      <rect x="1" y="9" width="6" height="1" fill="#f1c40f"/>
      <rect x="2" y="10" width="4" height="1" fill="#e67e22"/>
      <rect x="3" y="11" width="2" height="4" fill="#8b4513"/>
      <rect x="2" y="14" width="4" height="1" fill="#8b4513"/>
    </svg>`;
  }

  // ===== ADD FLOATING PARTICLES =====
  function addParticles() {
    const container = document.createElement('div');
    container.className = 'px-particles';
    container.setAttribute('aria-hidden', 'true');

    const types = [
      { svg: createPixelStar(8, '#f1c40f'), count: 6 },
      { svg: createPixelStar(6, '#e74c3c'), count: 4 },
      { svg: createPixelStar(5, '#3498db'), count: 3 },
      { svg: createPixelHeart(8, '#e74c3c'), count: 2 },
    ];

    types.forEach(type => {
      for (let i = 0; i < type.count; i++) {
        const p = document.createElement('div');
        p.className = 'px-particle';
        p.innerHTML = type.svg;
        p.style.left = (Math.random() * 100) + '%';
        p.style.animationDuration = (15 + Math.random() * 25) + 's';
        p.style.animationDelay = (Math.random() * 20) + 's';
        container.appendChild(p);
      }
    });

    document.body.appendChild(container);
  }

  // ===== ADD CORNER DECORATIONS =====
  function addCorners() {
    const corners = [
      { cls: 'px-corner-tl', svg: createPixelBall(48, '#e74c3c', '#ecf0f1'), rot: '-15deg' },
      { cls: 'px-corner-tr', svg: createPixelShield(40, '#3498db'), rot: '10deg' },
      { cls: 'px-corner-bl', svg: createPixelSword(20), rot: '-30deg' },
      { cls: 'px-corner-br', svg: createPixelBall(40, '#f39c12', '#ecf0f1'), rot: '20deg' },
    ];

    corners.forEach(c => {
      const el = document.createElement('div');
      el.className = c.cls;
      el.innerHTML = c.svg;
      el.style.transform = `rotate(${c.rot})`;
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);
    });
  }

  // ===== ADD HERO DECORATION =====
  function addHeroBadge() {
    const hero = document.querySelector('.hero, .hero-section, [class*="hero"]');
    if (!hero) return;

    const h1 = hero.querySelector('h1');
    if (!h1) return;

    // Add sparkle effect to h1
    const hlSpan = h1.querySelector('.hl, .highlight, span');
    if (hlSpan) {
      hlSpan.classList.add('px-sparkle');
    }

    // Add pixel ball above h1
    const badge = document.createElement('div');
    badge.className = 'px-hero-badge';
    badge.innerHTML = createPixelBall(48, '#e74c3c', '#ecf0f1');
    badge.setAttribute('aria-hidden', 'true');
    h1.parentNode.insertBefore(badge, h1);
  }

  // ===== ADD GRASS FOOTER =====
  function addGrassFooter() {
    const footer = document.querySelector('footer, .footer');
    if (!footer) return;

    const grassRow = document.createElement('div');
    grassRow.className = 'px-grass-row';
    grassRow.setAttribute('aria-hidden', 'true');

    const count = Math.floor(window.innerWidth / 20);
    for (let i = 0; i < count; i++) {
      const g = document.createElement('span');
      g.innerHTML = createPixelGrass(16 + Math.random() * 8);
      g.style.opacity = 0.4 + Math.random() * 0.6;
      g.style.transform = `scaleX(${Math.random() > 0.5 ? 1 : -1})`;
      grassRow.appendChild(g);
    }

    footer.parentNode.insertBefore(grassRow, footer);
  }

  // ===== ADD PIXEL DIVIDERS =====
  function addDividers() {
    const sections = document.querySelectorAll('section, .content-section, .faq-section, .guide-section, article');
    const ballColors = [
      ['#e74c3c', '#ecf0f1'],
      ['#3498db', '#ecf0f1'],
      ['#f39c12', '#ecf0f1'],
      ['#9b59b6', '#ecf0f1'],
      ['#2ecc71', '#ecf0f1'],
    ];

    sections.forEach((section, i) => {
      // Only add between sections, not before the first one
      if (i === 0) return;
      
      // Don't add if there's already a divider
      const prev = section.previousElementSibling;
      if (prev && prev.classList.contains('px-divider')) return;

      const colors = ballColors[i % ballColors.length];
      const divider = document.createElement('div');
      divider.className = 'px-divider';
      divider.setAttribute('aria-hidden', 'true');
      divider.innerHTML = `
        <span class="px-divider-line"></span>
        ${createPixelBall(20, colors[0], colors[1])}
        <span class="px-divider-line"></span>
      `;

      section.parentNode.insertBefore(divider, section);
    });
  }

  // ===== ADD PIXEL ICONS TO HEADINGS =====
  function addHeadingIcons() {
    const iconMap = {
      'rule': createPixelShield(20, '#e74c3c'),
      'guide': createPixelSword(10),
      'tip': createPixelStar(20, '#f1c40f'),
      'team': createPixelHeart(20, '#e74c3c'),
      'encounter': createPixelBall(20, '#e74c3c', '#ecf0f1'),
      'gym': createPixelShield(20, '#3498db'),
      'tier': createPixelStar(20, '#f1c40f'),
      'battle': createPixelSword(10),
      'faq': createPixelStar(20, '#9b59b6'),
      'tracker': createPixelBall(20, '#e74c3c', '#ecf0f1'),
      'pokémon': createPixelBall(20, '#3498db', '#ecf0f1'),
      'pokemon': createPixelBall(20, '#3498db', '#ecf0f1'),
      'type': createPixelShield(20, '#f39c12'),
      'chart': createPixelShield(20, '#2ecc71'),
      'blog': createPixelStar(20, '#e74c3c'),
      'resource': createPixelHeart(20, '#2ecc71'),
    };

    const headings = document.querySelectorAll('h2, h3');
    headings.forEach(h => {
      const text = h.textContent.toLowerCase();
      for (const [keyword, svg] of Object.entries(iconMap)) {
        if (text.includes(keyword)) {
          const icon = document.createElement('span');
          icon.className = 'px-icon';
          icon.innerHTML = svg;
          icon.setAttribute('aria-hidden', 'true');
          h.insertBefore(icon, h.firstChild);
          break;
        }
      }
    });
  }

  // ===== INITIALIZE =====
  function init() {
    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  }

  function run() {
    addParticles();
    addCorners();
    addHeroBadge();
    addDividers();
    addHeadingIcons();
    addGrassFooter();
  }

  init();
})();
