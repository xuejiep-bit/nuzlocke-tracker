/* ============================================
   GAME POSTER HERO v2 - Nuzlocke Tracker
   - Pikachu center + size hierarchy
   - Game link cards replacing tiny starters
   ============================================ */
(function(){
  'use strict';

  var SP = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  var HERO_MONS = [
    { id: 25,  name: 'Pikachu',   size: 150, x: '42%', y: '5%',  z: 5, op: '.45' },
    { id: 6,   name: 'Charizard', size: 120, x: '8%',  y: '8%',  z: 3, op: '.3' },
    { id: 130, name: 'Gyarados',  size: 110, x: '78%', y: '3%',  z: 3, op: '.3' },
    { id: 445, name: 'Garchomp',  size: 100, x: '68%', y: '38%', z: 2, op: '.25' },
    { id: 248, name: 'Tyranitar', size: 100, x: '85%', y: '20%', z: 2, op: '.25' },
    { id: 376, name: 'Metagross', size: 80,  x: '2%',  y: '42%', z: 1, op: '.2' },
    { id: 635, name: 'Hydreigon', size: 90,  x: '20%', y: '38%', z: 2, op: '.25' },
    { id: 373, name: 'Salamence', size: 85,  x: '55%', y: '42%', z: 1, op: '.2' },
  ];

  var GAME_LINKS = [
    { id: 260, name: 'Emerald',    url: '/emerald-nuzlocke-tracker.html' },
    { id: 6,   name: 'FireRed',    url: '/firered-nuzlocke-tracker.html' },
    { id: 392, name: 'Platinum',   url: '/platinum-nuzlocke-tracker.html' },
    { id: 553, name: 'Black',      url: '/pokemon-black-nuzlocke-tracker.html' },
    { id: 508, name: 'White',      url: '/pokemon-white-nuzlocke-tracker.html' },
    { id: 658, name: 'X / Y',      url: '/pokemon-x-nuzlocke-tracker.html' },
    { id: 724, name: 'Moon',       url: '/pokemon-moon-nuzlocke-tracker.html' },
    { id: 445, name: 'Unbound',    url: '/pokemon-unbound-nuzlocke-tracker.html' },
    { id: 150, name: 'Inf. Fusion',url: '/pokemon-infinite-fusion-nuzlocke-tracker.html' },
  ];

  var css = document.createElement('style');
  css.textContent = '\
.hero-poster{position:relative;z-index:1;overflow:hidden;min-height:520px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px 30px;margin-bottom:8px}\
.hero-poster::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,rgba(231,76,60,.12) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(52,152,219,.08) 0%,transparent 50%),radial-gradient(ellipse at 80% 70%,rgba(241,196,15,.06) 0%,transparent 50%);z-index:0}\
.hero-poster::after{content:"";position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(to top,var(--bg,#0f0f17) 0%,transparent 100%);z-index:5}\
\
.poster-mons{position:absolute;inset:0;z-index:1}\
.poster-mon{position:absolute;image-rendering:pixelated;filter:drop-shadow(0 0 20px rgba(231,76,60,.25));transition:transform .4s,filter .4s,opacity .4s;animation:posterIn .8s forwards;cursor:default}\
.poster-mon:hover{transform:scale(1.2)!important;filter:drop-shadow(0 0 40px rgba(241,196,15,.6))!important;opacity:.7!important;z-index:10!important}\
@keyframes posterIn{from{opacity:0;transform:scale(.6) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}\
\
.poster-content{position:relative;z-index:4;text-align:center;max-width:700px}\
.poster-tag{display:inline-block;background:rgba(231,76,60,.15);border:1px solid rgba(231,76,60,.4);border-radius:20px;padding:4px 16px;font-size:.75rem;color:var(--red,#e74c3c);text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;font-weight:600;animation:fadeUp .6s .2s both}\
.poster-title{font-family:"Chakra Petch",sans-serif;font-size:clamp(2.4rem,6vw,4rem);font-weight:700;line-height:1.1;margin-bottom:12px;animation:fadeUp .6s .3s both}\
.poster-title .hl{background:linear-gradient(135deg,#e74c3c,#f39c12);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;display:inline}\
.poster-sub{color:var(--text2,#95a5a6);font-size:1rem;max-width:500px;margin:0 auto 24px;line-height:1.6;animation:fadeUp .6s .4s both}\
.poster-cta{display:inline-flex;align-items:center;gap:8px;background:var(--red,#e74c3c);color:#fff;border:none;padding:12px 32px;border-radius:8px;font-family:"Outfit",sans-serif;font-size:1rem;font-weight:600;cursor:pointer;transition:all .3s;box-shadow:0 4px 20px rgba(231,76,60,.4);animation:fadeUp .6s .5s both;text-decoration:none}\
.poster-cta:hover{transform:translateY(-2px);box-shadow:0 6px 28px rgba(231,76,60,.5);background:#c0392b}\
.poster-cta svg{width:18px;height:18px}\
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}\
\
.game-cards{position:relative;z-index:6;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;max-width:800px;margin:0 auto;padding:0 16px;animation:fadeUp .6s .7s both}\
.game-card{display:flex;align-items:center;gap:6px;background:rgba(26,26,46,.85);border:1px solid var(--border,#2c3e50);border-radius:12px;padding:8px 16px 8px 8px;text-decoration:none;color:var(--text2,#95a5a6);font-size:.82rem;font-weight:500;transition:all .3s;cursor:pointer}\
.game-card:hover{border-color:var(--red,#e74c3c);color:var(--text,#ecf0f1);background:rgba(231,76,60,.1);box-shadow:0 4px 20px rgba(231,76,60,.2);transform:translateY(-3px)}\
.game-card img{width:40px;height:40px;image-rendering:pixelated;transition:transform .3s}\
.game-card:hover img{transform:scale(1.15)}\
.game-card span{white-space:nowrap}\
\
.poster-stats{position:relative;z-index:6;display:flex;justify-content:center;gap:24px;margin-top:20px;animation:fadeUp .6s .8s both}\
.poster-stat{text-align:center}\
.poster-stat-n{font-family:"Chakra Petch",sans-serif;font-size:1.5rem;font-weight:700;color:var(--text,#ecf0f1)}\
.poster-stat-l{font-size:.65rem;color:var(--text3,#636e72);text-transform:uppercase;letter-spacing:1px}\
\
.scan-line{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(231,76,60,.3),transparent);z-index:3;animation:scanMove 4s linear infinite}\
@keyframes scanMove{0%{top:0}100%{top:100%}}\
\
@media(max-width:768px){.hero-poster{min-height:400px;padding:30px 16px 20px}.poster-mon{opacity:.2!important}.poster-title{font-size:clamp(1.8rem,5vw,2.8rem)}.game-card{padding:6px 10px 6px 6px;font-size:.75rem;border-radius:8px}.game-card img{width:32px;height:32px}.poster-stats{gap:16px}.poster-stat-n{font-size:1.2rem}}\
';
  document.head.appendChild(css);

  function run() {
    var oldHero = document.querySelector('.hero');
    if (!oldHero) return;

    // Create poster
    var poster = document.createElement('section');
    poster.className = 'hero-poster';
    poster.innerHTML = '<div class="scan-line" aria-hidden="true"></div>';

    // Pokemon background with size hierarchy
    var monsLayer = document.createElement('div');
    monsLayer.className = 'poster-mons';
    monsLayer.setAttribute('aria-hidden', 'true');

    HERO_MONS.forEach(function(mon, i) {
      var img = document.createElement('img');
      img.className = 'poster-mon';
      img.src = SP + mon.id + '.png';
      img.alt = mon.name;
      img.title = mon.name;
      img.loading = 'eager';
      img.style.cssText = 'width:' + mon.size + 'px;height:' + mon.size + 'px;left:' + mon.x + ';top:' + mon.y + ';z-index:' + mon.z + ';animation-delay:' + (i * 0.12) + 's;opacity:' + mon.op + ';';
      img.onerror = function() { this.style.display = 'none'; };
      monsLayer.appendChild(img);
    });
    poster.appendChild(monsLayer);

    // Content
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

    oldHero.parentNode.replaceChild(poster, oldHero);

    // Game link cards - bigger sprites, clickable
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
