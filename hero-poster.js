/* ============================================
   GAME POSTER HERO - Nuzlocke Tracker
   Cinematic game poster-style hero with large Pokemon sprites
   Add to page: <script src="hero-poster.js"></script>
   ============================================ */
(function(){
  'use strict';

  var SPRITE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  var SPRITE_PIXEL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  // Featured Pokemon for the poster - iconic Nuzlocke mons
  var POSTER_MONS = [
    { id: 6, name: 'Charizard', size: 120, x: '5%', y: '10%', z: 3 },
    { id: 130, name: 'Gyarados', size: 140, x: '72%', y: '0%', z: 2 },
    { id: 445, name: 'Garchomp', size: 120, x: '40%', y: '15%', z: 4 },
    { id: 248, name: 'Tyranitar', size: 110, x: '82%', y: '35%', z: 1 },
    { id: 376, name: 'Metagross', size: 100, x: '0%', y: '45%', z: 2 },
    { id: 635, name: 'Hydreigon', size: 120, x: '62%', y: '40%', z: 3 },
  ];

  // Pixel sprites for the bottom row / game select
  var STARTER_ROWS = [
    { id: 1, name: 'Bulbasaur' }, { id: 4, name: 'Charmander' }, { id: 7, name: 'Squirtle' },
    { id: 252, name: 'Treecko' }, { id: 255, name: 'Torchic' }, { id: 258, name: 'Mudkip' },
    { id: 387, name: 'Turtwig' }, { id: 390, name: 'Chimchar' }, { id: 393, name: 'Piplup' },
    { id: 495, name: 'Snivy' }, { id: 498, name: 'Tepig' }, { id: 501, name: 'Oshawott' },
    { id: 650, name: 'Chespin' }, { id: 653, name: 'Fennekin' }, { id: 656, name: 'Froakie' },
    { id: 722, name: 'Rowlet' }, { id: 725, name: 'Litten' }, { id: 728, name: 'Popplio' },
  ];

  var css = document.createElement('style');
  css.textContent = '\
.hero-poster{position:relative;z-index:1;overflow:hidden;min-height:520px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px 30px;margin-bottom:8px}\
.hero-poster::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,rgba(231,76,60,.12) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(52,152,219,.08) 0%,transparent 50%),radial-gradient(ellipse at 80% 70%,rgba(241,196,15,.06) 0%,transparent 50%);z-index:0}\
.hero-poster::after{content:"";position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(to top,var(--bg,#0f0f17) 0%,transparent 100%);z-index:5}\
\
.poster-mons{position:absolute;inset:0;z-index:1}\
.poster-mon{position:absolute;image-rendering:pixelated;opacity:0;filter:drop-shadow(0 0 30px rgba(231,76,60,.3));transition:transform .4s,filter .4s;animation:posterIn .8s forwards}\
.poster-mon:hover{transform:scale(1.08)!important;filter:drop-shadow(0 0 40px rgba(231,76,60,.5))!important;z-index:10!important}\
@keyframes posterIn{from{opacity:0;transform:scale(.7) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}\
\
.poster-content{position:relative;z-index:4;text-align:center;max-width:700px}\
.poster-tag{display:inline-block;background:rgba(231,76,60,.15);border:1px solid rgba(231,76,60,.4);border-radius:20px;padding:4px 16px;font-size:.75rem;color:var(--red,#e74c3c);text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;font-weight:600;animation:fadeUp .6s .2s both}\
.poster-title{font-family:"Chakra Petch",sans-serif;font-size:clamp(2.4rem,6vw,4rem);font-weight:700;line-height:1.1;margin-bottom:12px;animation:fadeUp .6s .3s both}\
.poster-title .hl{background:linear-gradient(135deg,#e74c3c,#f39c12);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;display:inline}\
.poster-sub{color:var(--text2,#95a5a6);font-size:1rem;max-width:500px;margin:0 auto 24px;line-height:1.6;animation:fadeUp .6s .4s both}\
.poster-cta{display:inline-flex;align-items:center;gap:8px;background:var(--red,#e74c3c);color:#fff;border:none;padding:12px 32px;border-radius:8px;font-family:"Outfit",sans-serif;font-size:1rem;font-weight:600;cursor:pointer;transition:all .3s;box-shadow:0 4px 20px rgba(231,76,60,.4);animation:fadeUp .6s .5s both;text-decoration:none}\
.poster-cta:hover{transform:translateY(-2px);box-shadow:0 6px 28px rgba(231,76,60,.5);background:#c0392b}\
.poster-cta svg{width:18px;height:18px}\
\
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}\
\
.starter-belt{position:relative;z-index:6;display:flex;justify-content:center;gap:2px;flex-wrap:wrap;max-width:650px;margin:0 auto;padding:0 16px;animation:fadeUp .6s .7s both}\
.starter-chip{width:40px;height:40px;background:rgba(26,26,46,.8);border:1px solid var(--border,#2c3e50);border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s;position:relative}\
.starter-chip:hover{transform:translateY(-4px) scale(1.15);border-color:var(--red,#e74c3c);background:rgba(231,76,60,.1);box-shadow:0 4px 16px rgba(231,76,60,.2);z-index:2}\
.starter-chip img{width:32px;height:32px;image-rendering:pixelated}\
.starter-chip .chip-tip{position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);font-size:.6rem;color:var(--text2,#95a5a6);white-space:nowrap;opacity:0;transition:opacity .2s;pointer-events:none}\
.starter-chip:hover .chip-tip{opacity:1}\
\
.poster-stats{position:relative;z-index:6;display:flex;justify-content:center;gap:24px;margin-top:20px;animation:fadeUp .6s .8s both}\
.poster-stat{text-align:center}\
.poster-stat-n{font-family:"Chakra Petch",sans-serif;font-size:1.5rem;font-weight:700;color:var(--text,#ecf0f1)}\
.poster-stat-l{font-size:.65rem;color:var(--text3,#636e72);text-transform:uppercase;letter-spacing:1px}\
\
.scan-line{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(231,76,60,.3),transparent);z-index:3;animation:scanMove 4s linear infinite}\
@keyframes scanMove{0%{top:0}100%{top:100%}}\
\
@media(max-width:768px){.hero-poster{min-height:420px;padding:30px 16px 20px}.poster-mon{opacity:.4!important}.poster-title{font-size:clamp(1.8rem,5vw,2.8rem)}.starter-chip{width:34px;height:34px}.starter-chip img{width:26px;height:26px}.poster-stats{gap:16px}.poster-stat-n{font-size:1.2rem}}\
';
  document.head.appendChild(css);

  function run() {
    var oldHero = document.querySelector('.hero');
    if (!oldHero) return;

    // Create new poster hero
    var poster = document.createElement('section');
    poster.className = 'hero-poster';

    // Scan line effect
    poster.innerHTML = '<div class="scan-line" aria-hidden="true"></div>';

    // Pokemon background layer
    var monsLayer = document.createElement('div');
    monsLayer.className = 'poster-mons';
    monsLayer.setAttribute('aria-hidden', 'true');

    POSTER_MONS.forEach(function(mon, i) {
      var img = document.createElement('img');
      img.className = 'poster-mon';
      img.src = SPRITE + mon.id + '.png';
      img.alt = mon.name;
      img.title = mon.name;
      img.loading = 'eager';
      img.style.cssText = 'width:' + mon.size + 'px;height:' + mon.size + 'px;left:' + mon.x + ';top:' + mon.y + ';z-index:' + mon.z + ';animation-delay:' + (i * 0.15) + 's;opacity:0.25;';
      img.onerror = function() { this.style.display = 'none'; };
      monsLayer.appendChild(img);
    });
    poster.appendChild(monsLayer);

    // Content layer
    var content = document.createElement('div');
    content.className = 'poster-content';
    content.innerHTML = '\
<div class="poster-tag">Free Online Tool</div>\
<h1 class="poster-title">Track Your <span class="hl">Nuzlocke</span> Run</h1>\
<p class="poster-sub">Record encounters, build your team, analyze type weaknesses, and survive every gym battle. The ultimate companion for your Nuzlocke challenge.</p>\
<a href="#tracker" class="poster-cta">\
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>\
Start Tracking\
</a>';
    poster.appendChild(content);

    // Replace old hero
    oldHero.parentNode.replaceChild(poster, oldHero);

    // Add starter belt after poster
    var belt = document.createElement('div');
    belt.className = 'starter-belt';
    belt.setAttribute('aria-label', 'Popular starter Pokemon');

    STARTER_ROWS.forEach(function(mon) {
      var chip = document.createElement('div');
      chip.className = 'starter-chip';
      chip.innerHTML = '<img src="' + SPRITE_PIXEL + mon.id + '.png" alt="' + mon.name + '" loading="lazy" onerror="this.parentElement.style.display=\'none\'">' +
        '<span class="chip-tip">' + mon.name + '</span>';
      belt.appendChild(chip);
    });

    // Insert belt after poster
    poster.parentNode.insertBefore(belt, poster.nextSibling);

    // Add quick stats under belt
    var stats = document.createElement('div');
    stats.className = 'poster-stats';
    stats.innerHTML = '\
<div class="poster-stat"><div class="poster-stat-n">700+</div><div class="poster-stat-l">Pokemon</div></div>\
<div class="poster-stat"><div class="poster-stat-n">29</div><div class="poster-stat-l">Game Guides</div></div>\
<div class="poster-stat"><div class="poster-stat-n">Gen 1-9</div><div class="poster-stat-l">All Games</div></div>\
<div class="poster-stat"><div class="poster-stat-n">100%</div><div class="poster-stat-l">Free</div></div>';
    belt.parentNode.insertBefore(stats, belt.nextSibling);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
