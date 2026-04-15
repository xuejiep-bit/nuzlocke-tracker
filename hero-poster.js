/* ============================================
   HERO POSTER v5 - Nuzlocke Tracker
   - Full-width background glow (no box)
   - Remove header border line
   - Pikachu large + title same height, centered
   - Legendary Pokemon game cards
   ============================================ */
(function(){
  'use strict';

  var SP = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  var GAME_LINKS = [
    { id: 384, name: 'Emerald',     url: '/emerald-nuzlocke-tracker.html' },
    { id: 6,   name: 'FireRed',     url: '/firered-nuzlocke-tracker.html' },
    { id: 487, name: 'Platinum',    url: '/platinum-nuzlocke-tracker.html' },
    { id: 644, name: 'Black',       url: '/pokemon-black-nuzlocke-tracker.html' },
    { id: 643, name: 'White',       url: '/pokemon-white-nuzlocke-tracker.html' },
    { id: 646, name: 'Black 2',     url: '/pokemon-black-2-nuzlocke-tracker.html' },
    { id: 716, name: 'X',           url: '/pokemon-x-nuzlocke-tracker.html' },
    { id: 717, name: 'Y',           url: '/pokemon-y-nuzlocke-tracker.html' },
    { id: 792, name: 'Moon',        url: '/pokemon-moon-nuzlocke-tracker.html' },
    { id: 720, name: 'Unbound',     url: '/pokemon-unbound-nuzlocke-tracker.html' },
    { id: 150, name: 'Inf. Fusion', url: '/pokemon-infinite-fusion-nuzlocke-tracker.html' },
  ];

  var css = document.createElement('style');
  css.textContent = '\
.header{border-bottom:none!important}\
\
.hero-poster{position:relative;z-index:1;width:100%;padding:50px 24px 30px;overflow:visible}\
.hero-poster::before{content:"";position:absolute;inset:0;width:100%;background:radial-gradient(ellipse at 35% 50%,rgba(241,196,15,.1) 0%,transparent 55%),radial-gradient(ellipse at 65% 30%,rgba(231,76,60,.07) 0%,transparent 50%),radial-gradient(ellipse at 50% 80%,rgba(52,152,219,.05) 0%,transparent 50%);z-index:0;pointer-events:none}\
\
.hero-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:40px}\
\
.hero-pikachu{flex-shrink:0;position:relative;z-index:2;animation:pikaIn .8s both}\
.hero-pikachu img{width:280px;height:280px;image-rendering:pixelated;filter:drop-shadow(0 0 40px rgba(241,196,15,.3));transition:transform .4s,filter .4s}\
.hero-pikachu img:hover{transform:scale(1.06) rotate(-3deg);filter:drop-shadow(0 0 60px rgba(241,196,15,.5))}\
@keyframes pikaIn{from{opacity:0;transform:translateX(-30px) scale(.7)}to{opacity:1;transform:translateX(0) scale(1)}}\
\
.hero-text{position:relative;z-index:2;max-width:540px;animation:textIn .8s .15s both}\
@keyframes textIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}\
.hero-tag{display:inline-block;background:rgba(231,76,60,.12);border:1px solid rgba(231,76,60,.35);border-radius:20px;padding:4px 16px;font-size:.72rem;color:var(--red,#e74c3c);text-transform:uppercase;letter-spacing:2px;margin-bottom:14px;font-weight:600}\
.hero-title{font-family:"Chakra Petch",sans-serif;font-size:clamp(2.4rem,5.5vw,3.8rem);font-weight:700;line-height:1.08;margin-bottom:14px}\
.hero-title .hl{background:linear-gradient(135deg,#e74c3c,#f39c12);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}\
.hero-sub{color:var(--text2,#95a5a6);font-size:.95rem;line-height:1.65;margin-bottom:22px}\
.hero-cta{display:inline-flex;align-items:center;gap:8px;background:var(--red,#e74c3c);color:#fff;border:none;padding:13px 34px;border-radius:8px;font-family:"Outfit",sans-serif;font-size:1rem;font-weight:600;cursor:pointer;transition:all .3s;box-shadow:0 4px 24px rgba(231,76,60,.35);text-decoration:none}\
.hero-cta:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(231,76,60,.45);background:#c0392b}\
.hero-cta svg{width:18px;height:18px}\
\
.game-cards{position:relative;z-index:2;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;max-width:1200px;margin:20px auto 0;padding:0 24px;animation:fadeUp .6s .5s both}\
.game-card{display:flex;align-items:center;gap:6px;background:var(--bg2,#1a1a2e);border:1px solid var(--border,#2c3e50);border-radius:12px;padding:8px 14px 8px 6px;text-decoration:none;color:var(--text2,#95a5a6);font-size:.82rem;font-weight:500;transition:all .3s}\
.game-card:hover{border-color:var(--red,#e74c3c);color:var(--text,#ecf0f1);background:rgba(231,76,60,.08);box-shadow:0 4px 20px rgba(231,76,60,.15);transform:translateY(-3px)}\
.game-card img{width:40px;height:40px;image-rendering:pixelated;transition:transform .3s}\
.game-card:hover img{transform:scale(1.15)}\
\
.poster-stats{position:relative;z-index:2;display:flex;justify-content:center;gap:28px;margin:22px auto 10px;padding:0 24px;max-width:1200px;animation:fadeUp .6s .7s both}\
.poster-stat{text-align:center}\
.poster-stat-n{font-family:"Chakra Petch",sans-serif;font-size:1.4rem;font-weight:700;color:var(--text,#ecf0f1)}\
.poster-stat-l{font-size:.65rem;color:var(--text3,#636e72);text-transform:uppercase;letter-spacing:1px}\
\
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}\
\
@media(max-width:768px){\
.hero-inner{flex-direction:column;text-align:center;gap:16px}\
.hero-pikachu img{width:180px;height:180px}\
.hero-title{font-size:clamp(1.8rem,5vw,2.6rem)}\
.hero-sub{font-size:.88rem}\
.game-card{padding:6px 10px 6px 4px;font-size:.75rem}\
.game-card img{width:32px;height:32px}\
.poster-stats{gap:16px}\
.poster-stat-n{font-size:1.1rem}\
}\
';
  document.head.appendChild(css);

  function run() {
    var oldHero = document.querySelector('.hero');
    if (!oldHero) return;

    // Full-width poster
    var poster = document.createElement('section');
    poster.className = 'hero-poster';

    // Inner container (1200px centered)
    var inner = document.createElement('div');
    inner.className = 'hero-inner';

    // Pikachu (left, large)
    var pika = document.createElement('div');
    pika.className = 'hero-pikachu';
    pika.innerHTML = '<img src="' + SP + '25.png" alt="Pikachu" loading="eager" onerror="this.style.display=\'none\'">';
    inner.appendChild(pika);

    // Text (right)
    var text = document.createElement('div');
    text.className = 'hero-text';
    text.innerHTML = '\
<div class="hero-tag">Free Online Tool</div>\
<h1 class="hero-title">Track Your <span class="hl">Nuzlocke</span> Run</h1>\
<p class="hero-sub">Record encounters, build your team, analyze type weaknesses, and survive every gym battle. The ultimate Nuzlocke companion.</p>\
<a href="#tracker" class="hero-cta">\
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>\
Start Tracking\
</a>';
    inner.appendChild(text);

    poster.appendChild(inner);
    oldHero.parentNode.replaceChild(poster, oldHero);

    // Game cards
    var cards = document.createElement('div');
    cards.className = 'game-cards';
    GAME_LINKS.forEach(function(g) {
      var a = document.createElement('a');
      a.className = 'game-card';
      a.href = g.url;
      a.innerHTML = '<img src="' + SP + g.id + '.png" alt="' + g.name + '" loading="lazy" onerror="this.style.display=\'none\'">' +
        '<span>' + g.name + '</span>';
      cards.appendChild(a);
    });
    poster.parentNode.insertBefore(cards, poster.nextSibling);

    // Stats bar
    var stats = document.createElement('div');
    stats.className = 'poster-stats';
    stats.innerHTML = '\
<div class="poster-stat"><div class="poster-stat-n">700+</div><div class="poster-stat-l">Pokemon</div></div>\
<div class="poster-stat"><div class="poster-stat-n">29</div><div class="poster-stat-l">Game Guides</div></div>\
<div class="poster-stat"><div class="poster-stat-n">Gen 1-9</div><div class="poster-stat-l">All Games</div></div>\
<div class="poster-stat"><div class="poster-stat-n">100%</div><div class="poster-stat-l">Free</div></div>';
    cards.parentNode.insertBefore(stats, cards.nextSibling);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
