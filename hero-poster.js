/* ============================================
   GAME POSTER HERO v3 - Pikachu Breaking Frame
   ============================================ */
(function(){
  'use strict';

  var SP = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  // Pikachu is HUGE and breaks the frame, others support
  var HERO_MONS = [
    { id: 25,  name: 'Pikachu',   size: 200, x: '35%', y: '-5%',  z: 8, op: '.55' },
    { id: 6,   name: 'Charizard', size: 110, x: '3%',  y: '5%',   z: 3, op: '.28' },
    { id: 130, name: 'Gyarados',  size: 105, x: '80%', y: '2%',   z: 3, op: '.25' },
    { id: 445, name: 'Garchomp',  size: 90,  x: '70%', y: '40%',  z: 2, op: '.22' },
    { id: 248, name: 'Tyranitar', size: 95,  x: '88%', y: '22%',  z: 2, op: '.22' },
    { id: 376, name: 'Metagross', size: 75,  x: '0%',  y: '45%',  z: 1, op: '.18' },
    { id: 635, name: 'Hydreigon', size: 85,  x: '15%', y: '40%',  z: 2, op: '.2' },
    { id: 373, name: 'Salamence', size: 80,  x: '58%', y: '45%',  z: 1, op: '.18' },
  ];

  var GAME_LINKS = [
    { id: 260, name: 'Emerald',     url: '/emerald-nuzlocke-tracker.html' },
    { id: 6,   name: 'FireRed',     url: '/firered-nuzlocke-tracker.html' },
    { id: 392, name: 'Platinum',    url: '/platinum-nuzlocke-tracker.html' },
    { id: 553, name: 'Black',       url: '/pokemon-black-nuzlocke-tracker.html' },
    { id: 508, name: 'White',       url: '/pokemon-white-nuzlocke-tracker.html' },
    { id: 658, name: 'X / Y',       url: '/pokemon-x-nuzlocke-tracker.html' },
    { id: 724, name: 'Moon',        url: '/pokemon-moon-nuzlocke-tracker.html' },
    { id: 445, name: 'Unbound',     url: '/pokemon-unbound-nuzlocke-tracker.html' },
    { id: 150, name: 'Inf. Fusion', url: '/pokemon-infinite-fusion-nuzlocke-tracker.html' },
  ];

  var css = document.createElement('style');
  css.textContent = '\
.hero-poster{position:relative;z-index:1;overflow:visible;min-height:540px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px 30px;margin-bottom:8px}\
.hero-poster::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 20%,rgba(241,196,15,.1) 0%,transparent 50%),radial-gradient(ellipse at 20% 80%,rgba(52,152,219,.08) 0%,transparent 50%),radial-gradient(ellipse at 80% 70%,rgba(231,76,60,.08) 0%,transparent 50%);z-index:0}\
.hero-poster::after{content:"";position:absolute;bottom:0;left:0;right:0;height:140px;background:linear-gradient(to top,var(--bg,#0f0f17) 0%,transparent 100%);z-index:5;pointer-events:none}\
\
.poster-mons{position:absolute;inset:0;z-index:1;overflow:visible}\
.poster-mon{position:absolute;image-rendering:pixelated;filter:drop-shadow(0 0 20px rgba(231,76,60,.25));transition:transform .4s,filter .4s,opacity .4s;animation:posterIn .8s forwards;cursor:default}\
.poster-mon:hover{transform:scale(1.2)!important;filter:drop-shadow(0 0 40px rgba(241,196,15,.6))!important;opacity:.7!important;z-index:10!important}\
.poster-mon.pikachu{filter:drop-shadow(0 0 40px rgba(241,196,15,.4));z-index:8!important}\
.poster-mon.pikachu:hover{transform:scale(1.15) translateY(-10px)!important;filter:drop-shadow(0 0 60px rgba(241,196,15,.7))!important;opacity:.75!important}\
@keyframes posterIn{from{opacity:0;transform:scale(.6) translateY(30px)}to{opacity:1;transform:scale(1) translateY(0)}}\
\
.poster-content{position:relative;z-index:6;text-align:center;max-width:700px;margin-top:60px}\
.poster-tag{display:inline-block;background:rgba(231,76,60,.15);border:1px solid rgba(231,76,60,.4);border-radius:20px;padding:4px 16px;font-size:.75rem;color:var(--red,#e74c3c);text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;font-weight:600;animation:fadeUp .6s .2s both}\
.poster-title{font-family:"Chakra Petch",sans-serif;font-size:clamp(2.6rem,7vw,4.2rem);font-weight:700;line-height:1.05;margin-bottom:14px;animation:fadeUp .6s .3s both;text-shadow:0 2px 30px rgba(0,0,0,.5)}\
.poster-title .hl{background:linear-gradient(135deg,#e74c3c,#f39c12);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;display:inline}\
.poster-sub{color:var(--text2,#95a5a6);font-size:1rem;max-width:480px;margin:0 auto 24px;line-height:1.6;animation:fadeUp .6s .4s both;text-shadow:0 1px 10px rgba(0,0,0,.3)}\
.poster-cta{display:inline-flex;align-items:center;gap:8px;background:var(--red,#e74c3c);color:#fff;border:none;padding:14px 36px;border-radius:8px;font-family:"Outfit",sans-serif;font-size:1.05rem;font-weight:600;cursor:pointer;transition:all .3s;box-shadow:0 4px 24px rgba(231,76,60,.4);animation:fadeUp .6s .5s both;text-decoration:none}\
.poster-cta:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(231,76,60,.5);background:#c0392b}\
.poster-cta svg{width:18px;height:18px}\
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}\
\
.game-cards{position:relative;z-index:6;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;max-width:820px;margin:0 auto;padding:0 16px;animation:fadeUp .6s .7s both}\
.game-card{display:flex;align-items:center;gap:6px;background:rgba(26,26,46,.85);border:1px solid var(--border,#2c3e50);border-radius:12px;padding:8px 16px 8px 8px;text-decoration:none;color:var(--text2,#95a5a6);font-size:.82rem;font-weight:500;transition:all .3s;cursor:pointer}\
.game-card:hover{border-color:var(--red,#e74c3c);color:var(--text,#ecf0f1);background:rgba(231,76,60,.1);box-shadow:0 4px 20px rgba(231,76,60,.2);transform:translateY(-3px)}\
.game-card img{width:40px;height:40px;image-rendering:pixelated;transition:transform .3s}\
.game-card:hover img{transform:scale(1.15)}\
.game-card span{white-space:nowrap}\
\
.poster-stats{position:relative;z-index:6;display:flex;justify-content:center;gap:28px;margin-top:22px;animation:fadeUp .6s .8s both}\
.poster-stat{text-align:center}\
.poster-stat-n{font-family:"Chakra Petch",sans-serif;font-size:1.5rem;font-weight:700;color:var(--text,#ecf0f1)}\
.poster-stat-l{font-size:.65rem;color:var(--text3,#636e72);text-transform:uppercase;letter-spacing:1px}\
\
.scan-line{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(241,196,15,.25),transparent);z-index:3;animation:scanMove 4s linear infinite;pointer-events:none}\
@keyframes scanMove{0%{top:0}100%{top:100%}}\
\
@media(max-width:768px){.hero-poster{min-height:420px;padding:30px 16px 20px;overflow:hidden}.poster-mon{opacity:.18!important}.poster-mon.pikachu{opacity:.3!important}.poster-content{margin-top:30px}.poster-title{font-size:clamp(2rem,5.5vw,3rem)}.game-card{padding:6px 10px 6px 6px;font-size:.75rem;border-radius:8px}.game-card img{width:32px;height:32px}.poster-stats{gap:16px}.poster-stat-n{font-size:1.2rem}}\
';
  document.head.appendChild(css);

  function run() {
    var oldHero = document.querySelector('.hero');
    if (!oldHero) return;

    var poster = document.createElement('section');
    poster.className = 'hero-poster';
    poster.innerHTML = '<div class="scan-line" aria-hidden="true"></div>';

    // Pokemon layer - Pikachu breaks the frame
    var monsLayer = document.createElement('div');
    monsLayer.className = 'poster-mons';
    monsLayer.setAttribute('aria-hidden', 'true');

    HERO_MONS.forEach(function(mon, i) {
      var img = document.createElement('img');
      img.className = 'poster-mon' + (mon.id === 25 ? ' pikachu' : '');
      img.src = SP + mon.id + '.png';
      img.alt = mon.name;
      img.title = mon.name;
      img.loading = 'eager';
      img.style.cssText = 'width:' + mon.size + 'px;height:' + mon.size + 'px;left:' + mon.x + ';top:' + mon.y + ';z-index:' + mon.z + ';animation-delay:' + (i * 0.12) + 's;opacity:' + mon.op + ';';
      img.onerror = function() { this.style.display = 'none'; };
      monsLayer.appendChild(img);
    });
    poster.appendChild(monsLayer);

    // Content - positioned below Pikachu so Pikachu overlaps
    var content = document.createElement('div');
    content.className = 'poster-content';
    content.innerHTML = '\
<div class="poster-tag">Free Online Tool</div>\
<h1 class="poster-title">Track Your <span class="hl">Nuzlocke</span> Run</h1>\
<p class="poster-sub">Record encounters, build your team, analyze type weaknesses, and survive every gym battle.</p>\
<a href="#tracker" class="poster-cta">\
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>\
Start Tracking\
</a>';
    poster.appendChild(content);

    oldHero.parentNode.replaceChild(poster, oldHero);

    // Game cards
    var cards = document.createElement('div');
    cards.className = 'game-cards';
    GAME_LINKS.forEach(function(game) {
      var a = document.createElement('a');
      a.className = 'game-card';
      a.href = game.url;
      a.innerHTML = '<img src="' + SP + game.id + '.png" alt="' + game.name + '" loading="lazy" onerror="this.style.display=\'none\'">' +
        '<span>' + game.name + '</span>';
      cards.appendChild(a);
    });
    poster.parentNode.insertBefore(cards, poster.nextSibling);

    // Stats
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
