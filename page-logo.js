/* ============================================
   PAGE LOGO SPRITE - Nuzlocke Tracker
   Auto-detects game page and replaces logo icon
   with the game's representative Pokemon sprite
   Add to any page: <script src="page-logo.js"></script>
   ============================================ */
(function(){
  'use strict';

  var SP = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  // Map page URL keywords to representative Pokemon
  var PAGE_MONS = {
    'emerald':   { id: 384, name: 'Rayquaza' },
    'firered':   { id: 6,   name: 'Charizard' },
    'platinum':  { id: 487, name: 'Giratina' },
    'black-2':   { id: 646, name: 'Kyurem' },
    'black':     { id: 644, name: 'Zekrom' },
    'white':     { id: 643, name: 'Reshiram' },
    'moon':      { id: 792, name: 'Lunala' },
    'pokemon-x': { id: 716, name: 'Xerneas' },
    'pokemon-y': { id: 717, name: 'Yveltal' },
    'unbound':   { id: 720, name: 'Hoopa' },
    'infinite-fusion': { id: 150, name: 'Mewtwo' },
    'type-chart':{ id: 25,  name: 'Pikachu' },
    'gym-leaders':{ id: 68, name: 'Machamp' },
    'tier-list': { id: 149, name: 'Dragonite' },
    'rules':     { id: 143, name: 'Snorlax' },
    'tips':      { id: 133, name: 'Eevee' },
    'best-pokemon': { id: 376, name: 'Metagross' },
    'best-game': { id: 258, name: 'Mudkip' },
    'hardcore':  { id: 248, name: 'Tyranitar' },
    'dupes':     { id: 132, name: 'Ditto' },
    'rare-cand': { id: 113, name: 'Chansey' },
    'black-out': { id: 94,  name: 'Gengar' },
    'guide-emerald': { id: 260, name: 'Swampert' },
    'guide-firered': { id: 9, name: 'Blastoise' },
  };

  // Homepage gets Pikachu
  var HOME_MON = { id: 25, name: 'Pikachu' };

  var css = document.createElement('style');
  css.textContent = '\
.logo-sprite{width:36px;height:36px;image-rendering:pixelated;transition:transform .3s;filter:drop-shadow(0 0 8px rgba(231,76,60,.3))}\
.logo:hover .logo-sprite{transform:scale(1.2) rotate(-5deg);filter:drop-shadow(0 0 12px rgba(241,196,15,.5))}\
.hero-game-sprite{display:block;margin:0 auto 12px;image-rendering:pixelated;filter:drop-shadow(0 0 20px rgba(231,76,60,.4));animation:heroSpriteIn .6s both}\
@keyframes heroSpriteIn{from{opacity:0;transform:scale(.5) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}\
';
  document.head.appendChild(css);

  function detectPage() {
    var path = window.location.pathname.toLowerCase();
    
    // Check each page keyword - order matters (check more specific first)
    var keys = Object.keys(PAGE_MONS).sort(function(a,b){ return b.length - a.length; });
    for (var i = 0; i < keys.length; i++) {
      if (path.indexOf(keys[i]) !== -1) {
        return PAGE_MONS[keys[i]];
      }
    }
    
    // Homepage
    if (path === '/' || path === '/index.html' || path === '') {
      return HOME_MON;
    }
    
    return HOME_MON; // fallback
  }

  function run() {
    var mon = detectPage();
    if (!mon) return;

    // 1. Replace logo icon with Pokemon sprite
    var logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
      var img = document.createElement('img');
      img.className = 'logo-sprite';
      img.src = SP + mon.id + '.png';
      img.alt = mon.name;
      img.loading = 'eager';
      img.onerror = function() { this.style.display = 'none'; logoIcon.style.display = ''; };
      logoIcon.style.display = 'none';
      logoIcon.parentNode.insertBefore(img, logoIcon);
    }

    // 2. Add large sprite to hero section (game-specific pages only, not homepage)
    var path = window.location.pathname.toLowerCase();
    var isHome = (path === '/' || path === '/index.html' || path === '');
    
    if (!isHome) {
      var hero = document.querySelector('.hero');
      if (hero) {
        var h1 = hero.querySelector('h1');
        if (h1 && !hero.querySelector('.hero-game-sprite')) {
          var heroImg = document.createElement('img');
          heroImg.className = 'hero-game-sprite';
          heroImg.src = SP + mon.id + '.png';
          heroImg.alt = mon.name;
          heroImg.width = 96;
          heroImg.height = 96;
          heroImg.loading = 'eager';
          heroImg.onerror = function() { this.style.display = 'none'; };
          h1.parentNode.insertBefore(heroImg, h1);
        }
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
