/* ============================================
   HOMEPAGE VISUAL ENHANCEMENT - Nuzlocke Tracker
   Adds Pokemon sprite decorations to make the page more engaging
   Add to page: <script src="homepage-enhance.js"></script>
   ============================================ */
(function(){
  'use strict';

  var SPRITE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  // Popular Nuzlocke Pokemon for showcase
  var SHOWCASE_MONS = [
    {id:6,name:'Charizard'},{id:130,name:'Gyarados'},{id:282,name:'Gardevoir'},
    {id:445,name:'Garchomp'},{id:373,name:'Salamence'},{id:448,name:'Lucario'},
    {id:260,name:'Swampert'},{id:286,name:'Breloom'},{id:306,name:'Aggron'},
    {id:149,name:'Dragonite'},{id:376,name:'Metagross'},{id:248,name:'Tyranitar'},
    {id:398,name:'Staraptor'},{id:530,name:'Excadrill'},{id:553,name:'Krookodile'},
    {id:609,name:'Chandelure'},{id:635,name:'Hydreigon'},{id:658,name:'Greninja'}
  ];

  // Random starter trios for the hero
  var STARTERS = [
    {id:1,name:'Bulbasaur'},{id:4,name:'Charmander'},{id:7,name:'Squirtle'},
    {id:252,name:'Treecko'},{id:255,name:'Torchic'},{id:258,name:'Mudkip'},
    {id:387,name:'Turtwig'},{id:390,name:'Chimchar'},{id:393,name:'Piplup'},
    {id:495,name:'Snivy'},{id:498,name:'Tepig'},{id:501,name:'Oshawott'},
    {id:650,name:'Chespin'},{id:653,name:'Fennekin'},{id:656,name:'Froakie'},
    {id:722,name:'Rowlet'},{id:725,name:'Litten'},{id:728,name:'Popplio'}
  ];

  var css = document.createElement('style');
  css.textContent = '\
.hero-sprites{display:flex;justify-content:center;gap:4px;margin-top:20px;flex-wrap:wrap;max-width:600px;margin-left:auto;margin-right:auto}\
.hero-sprite{width:48px;height:48px;image-rendering:pixelated;opacity:0;animation:heroSpriteIn .5s forwards;filter:drop-shadow(0 2px 8px rgba(231,76,60,.3));transition:transform .3s,filter .3s;cursor:default}\
.hero-sprite:hover{transform:scale(1.3) translateY(-4px);filter:drop-shadow(0 4px 12px rgba(231,76,60,.5))}\
@keyframes heroSpriteIn{from{opacity:0;transform:translateY(10px) scale(.8)}to{opacity:1;transform:translateY(0) scale(1)}}\
.showcase-section{position:relative;z-index:1;max-width:800px;margin:0 auto 32px;padding:0 24px}\
.showcase-box{background:var(--bg2,#1a1a2e);border:1px solid var(--border,#2c3e50);border-radius:var(--radius,12px);padding:24px;text-align:center}\
.showcase-box h3{font-family:"Chakra Petch",sans-serif;font-size:1.1rem;margin-bottom:6px;color:var(--text,#ecf0f1)}\
.showcase-box p{font-size:.85rem;color:var(--text2,#95a5a6);margin-bottom:16px}\
.showcase-grid{display:flex;justify-content:center;flex-wrap:wrap;gap:6px}\
.showcase-mon{width:56px;height:56px;background:var(--card,#16213e);border:1px solid var(--border,#2c3e50);border-radius:8px;display:flex;align-items:center;justify-content:center;transition:all .3s;cursor:default;position:relative}\
.showcase-mon:hover{transform:translateY(-4px);border-color:var(--red,#e74c3c);box-shadow:0 4px 16px rgba(231,76,60,.2)}\
.showcase-mon img{width:44px;height:44px;image-rendering:pixelated}\
.showcase-mon .mon-name{position:absolute;bottom:-18px;left:50%;transform:translateX(-50%);font-size:.6rem;color:var(--text2,#95a5a6);white-space:nowrap;opacity:0;transition:opacity .2s}\
.showcase-mon:hover .mon-name{opacity:1}\
.stat-sprite{position:absolute;top:6px;right:8px;width:28px;height:28px;opacity:.15;image-rendering:pixelated}\
.stat{position:relative;overflow:hidden}\
.game-chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:16px}\
.game-chip{display:flex;align-items:center;gap:4px;background:var(--card,#16213e);border:1px solid var(--border,#2c3e50);border-radius:20px;padding:4px 12px 4px 4px;font-size:.75rem;color:var(--text2,#95a5a6);transition:all .2s;cursor:default;text-decoration:none}\
.game-chip:hover{border-color:var(--red,#e74c3c);color:var(--text,#ecf0f1)}\
.game-chip img{width:24px;height:24px;image-rendering:pixelated}\
';
  document.head.appendChild(css);

  function run() {
    addHeroSprites();
    addShowcaseSection();
    addGameChips();
    addStatDecorations();
  }

  // 1. Add starter sprite row under hero text
  function addHeroSprites() {
    var hero = document.querySelector('.hero');
    if (!hero || hero.querySelector('.hero-sprites')) return;

    // Pick a random starter trio
    var triIdx = Math.floor(Math.random() * 6) * 3;
    var trio = STARTERS.slice(triIdx, triIdx + 3);
    
    // Also add some popular mons
    var shuffled = SHOWCASE_MONS.slice().sort(function(){return Math.random()-.5}).slice(0,9);
    var allMons = trio.concat(shuffled);

    var row = document.createElement('div');
    row.className = 'hero-sprites';
    row.setAttribute('aria-hidden','true');
    
    allMons.forEach(function(mon, i) {
      var img = document.createElement('img');
      img.className = 'hero-sprite';
      img.src = SPRITE + mon.id + '.png';
      img.alt = mon.name;
      img.title = mon.name;
      img.loading = 'lazy';
      img.style.animationDelay = (i * 0.08) + 's';
      img.onerror = function(){ this.style.display='none'; };
      row.appendChild(img);
    });

    hero.appendChild(row);
  }

  // 2. Add showcase section before SEO content
  function addShowcaseSection() {
    var seo = document.querySelector('.seo');
    if (!seo || document.querySelector('.showcase-section')) return;

    var section = document.createElement('div');
    section.className = 'showcase-section';
    
    var shuffled = SHOWCASE_MONS.slice().sort(function(){return Math.random()-.5}).slice(0,12);
    
    section.innerHTML = '<div class="showcase-box">' +
      '<h3>Track 700+ Pokemon Across All Generations</h3>' +
      '<p>From Kanto to Alola — every encounter, every route, every team member tracked.</p>' +
      '<div class="showcase-grid">' +
      shuffled.map(function(mon) {
        return '<div class="showcase-mon">' +
          '<img src="' + SPRITE + mon.id + '.png" alt="' + mon.name + '" loading="lazy" onerror="this.parentElement.style.display=\'none\'">' +
          '<span class="mon-name">' + mon.name + '</span>' +
          '</div>';
      }).join('') +
      '</div></div>';

    seo.parentNode.insertBefore(section, seo);
  }

  // 3. Add game version chips with starter sprites
  function addGameChips() {
    var showcase = document.querySelector('.showcase-box');
    if (!showcase || showcase.querySelector('.game-chips')) return;

    var games = [
      {name:'Emerald',id:260,url:'/emerald-nuzlocke-tracker.html'},
      {name:'FireRed',id:6,url:'/firered-nuzlocke-tracker.html'},
      {name:'Platinum',id:392,url:'/platinum-nuzlocke-tracker.html'},
      {name:'Black',id:553,url:'/pokemon-black-nuzlocke-tracker.html'},
      {name:'White',id:508,url:'/pokemon-white-nuzlocke-tracker.html'},
      {name:'X',id:658,url:'/pokemon-x-nuzlocke-tracker.html'},
      {name:'Y',id:655,url:'/pokemon-y-nuzlocke-tracker.html'},
      {name:'Moon',id:724,url:'/pokemon-moon-nuzlocke-tracker.html'},
      {name:'Unbound',id:445,url:'/pokemon-unbound-nuzlocke-tracker.html'},
      {name:'Inf. Fusion',id:150,url:'/pokemon-infinite-fusion-nuzlocke-tracker.html'}
    ];

    var chips = document.createElement('div');
    chips.className = 'game-chips';
    chips.innerHTML = games.map(function(g) {
      return '<a href="' + g.url + '" class="game-chip">' +
        '<img src="' + SPRITE + g.id + '.png" alt="' + g.name + '" loading="lazy" onerror="this.style.display=\'none\'">' +
        g.name + '</a>';
    }).join('');

    showcase.appendChild(chips);
  }

  // 4. Add subtle sprite decorations to stat cards
  function addStatDecorations() {
    var stats = document.querySelectorAll('.stat');
    var decorMons = [25, 133, 175, 147]; // Pikachu, Eevee, Togepi, Dratini
    
    stats.forEach(function(stat, i) {
      if (stat.querySelector('.stat-sprite')) return;
      if (i >= decorMons.length) return;
      var img = document.createElement('img');
      img.className = 'stat-sprite';
      img.src = SPRITE + decorMons[i] + '.png';
      img.alt = '';
      img.loading = 'lazy';
      img.setAttribute('aria-hidden','true');
      img.onerror = function(){ this.style.display='none'; };
      stat.appendChild(img);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
