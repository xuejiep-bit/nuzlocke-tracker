/* ============================================
   VISUAL ENHANCE - Nuzlocke Tracker
   1. Vignette dark corners
   2. Type-colored encounter cards with glow
   3. Diagonal section dividers
   ============================================ */
(function(){
  'use strict';

  // Type -> color mapping
  var TYPE_COLORS = {
    'Normal':   '#a8a878', 'Fire':     '#f08030', 'Water':    '#6890f0',
    'Electric': '#f8d030', 'Grass':    '#78c850', 'Ice':      '#98d8d8',
    'Fighting': '#c03028', 'Poison':   '#a040a0', 'Ground':   '#e0c068',
    'Flying':   '#a890f0', 'Psychic':  '#f85888', 'Bug':      '#a8b820',
    'Rock':     '#b8a038', 'Ghost':    '#705898', 'Dragon':   '#7038f8',
    'Dark':     '#705848', 'Steel':    '#b8b8d0', 'Fairy':    '#ee99ac'
  };

  // Pokemon -> primary type (for card coloring)
  var POKE_TYPE = {
    'Bulbasaur':'Grass','Ivysaur':'Grass','Venusaur':'Grass','Charmander':'Fire','Charmeleon':'Fire','Charizard':'Fire',
    'Squirtle':'Water','Wartortle':'Water','Blastoise':'Water','Pikachu':'Electric','Raichu':'Electric',
    'Sandshrew':'Ground','Sandslash':'Ground','Nidoqueen':'Poison','Nidoking':'Poison','Vulpix':'Fire','Ninetales':'Fire',
    'Zubat':'Poison','Golbat':'Poison','Crobat':'Poison','Oddish':'Grass','Vileplume':'Grass',
    'Diglett':'Ground','Dugtrio':'Ground','Psyduck':'Water','Golduck':'Water','Growlithe':'Fire','Arcanine':'Fire',
    'Poliwag':'Water','Poliwrath':'Water','Abra':'Psychic','Kadabra':'Psychic','Alakazam':'Psychic',
    'Machop':'Fighting','Machoke':'Fighting','Machamp':'Fighting','Geodude':'Rock','Graveler':'Rock','Golem':'Rock',
    'Slowpoke':'Water','Slowbro':'Water','Magnemite':'Electric','Magneton':'Electric',
    'Gastly':'Ghost','Haunter':'Ghost','Gengar':'Ghost','Onix':'Rock','Steelix':'Steel',
    'Rhyhorn':'Ground','Rhydon':'Ground','Scyther':'Bug','Scizor':'Bug',
    'Magikarp':'Water','Gyarados':'Water','Lapras':'Water','Eevee':'Normal',
    'Vaporeon':'Water','Jolteon':'Electric','Flareon':'Fire','Espeon':'Psychic','Umbreon':'Dark',
    'Snorlax':'Normal','Dratini':'Dragon','Dragonair':'Dragon','Dragonite':'Dragon',
    'Crobat':'Poison','Ampharos':'Electric','Azumarill':'Water','Heracross':'Bug',
    'Sneasel':'Dark','Weavile':'Dark','Skarmory':'Steel','Houndoom':'Dark',
    'Tyranitar':'Rock','Sceptile':'Grass','Blaziken':'Fire','Swampert':'Water',
    'Mightyena':'Dark','Ludicolo':'Water','Gardevoir':'Psychic','Gallade':'Psychic',
    'Breloom':'Grass','Slaking':'Normal','Hariyama':'Fighting','Aggron':'Steel',
    'Manectric':'Electric','Flygon':'Ground','Altaria':'Dragon','Milotic':'Water',
    'Absol':'Dark','Salamence':'Dragon','Metagross':'Steel',
    'Torterra':'Grass','Infernape':'Fire','Empoleon':'Water','Staraptor':'Normal',
    'Luxray':'Electric','Roserade':'Grass','Garchomp':'Dragon','Lucario':'Fighting',
    'Togekiss':'Fairy','Magnezone':'Electric','Electivire':'Electric','Magmortar':'Fire',
    'Stoutland':'Normal','Excadrill':'Ground','Krookodile':'Ground','Darmanitan':'Fire',
    'Scrafty':'Dark','Chandelure':'Ghost','Haxorus':'Dragon','Hydreigon':'Dark',
    'Volcarona':'Bug','Greninja':'Water','Talonflame':'Fire','Aegislash':'Steel',
    'Goodra':'Dragon','Decidueye':'Grass','Primarina':'Water','Toxapex':'Poison',
    'Mudsdale':'Ground','Mimikyu':'Ghost','Kommo-o':'Dragon',
    'Pidgey':'Normal','Pidgeotto':'Normal','Pidgeot':'Normal','Rattata':'Normal',
    'Spearow':'Normal','Fearow':'Normal','Ekans':'Poison','Arbok':'Poison',
    'Nidoran\u2640':'Poison','Nidorina':'Poison','Nidoran\u2642':'Poison','Nidorino':'Poison',
    'Tentacool':'Water','Tentacruel':'Water','Ponyta':'Fire','Rapidash':'Fire',
    'Koffing':'Poison','Weezing':'Poison','Staryu':'Water','Starmie':'Water',
    'Magmar':'Fire','Electabuzz':'Electric','Pinsir':'Bug','Tauros':'Normal',
    'Shiftry':'Grass','Swellow':'Normal','Pelipper':'Water',
    'Torkoal':'Fire','Crawdaunt':'Water','Claydol':'Ground','Walrein':'Ice',
    'Glalie':'Ice','Froslass':'Ice',
    'Shinx':'Electric','Luxio':'Electric','Gastrodon':'Water','Hippowdon':'Ground',
    'Drapion':'Poison','Abomasnow':'Grass','Spiritomb':'Ghost',
    'Lillipup':'Normal','Herdier':'Normal','Roggenrola':'Rock','Boldore':'Rock',
    'Timburr':'Fighting','Gurdurr':'Fighting','Conkeldurr':'Fighting',
    'Sandile':'Ground','Krokorok':'Ground','Darumaka':'Fire',
    'Joltik':'Bug','Galvantula':'Bug','Ferrothorn':'Grass',
    'Axew':'Dragon','Fraxure':'Dragon','Cubchoo':'Ice','Beartic':'Ice',
    'Pawniard':'Dark','Bisharp':'Dark','Deino':'Dark','Zweilous':'Dark',
    'Fletchling':'Normal','Fletchinder':'Fire','Honedge':'Steel','Doublade':'Steel',
    'Goomy':'Dragon','Sliggoo':'Dragon','Noibat':'Flying','Noivern':'Flying',
    'Rowlet':'Grass','Litten':'Fire','Popplio':'Water','Mudbray':'Ground',
    'Mareanie':'Poison','Rockruff':'Rock','Salandit':'Poison','Salazzle':'Poison'
  };

  var css = document.createElement('style');
  css.textContent = '\
\
.vignette{position:fixed;inset:0;pointer-events:none;z-index:9999;\
box-shadow:inset 0 0 150px 60px rgba(0,0,0,.4);transition:box-shadow 1s}\
\
.enc[data-type-color]{transition:all .3s}\
.enc[data-type-color]:hover{box-shadow:0 0 20px var(--tc);border-left-width:4px}\
\
.seo::before{content:"";display:block;height:40px;background:linear-gradient(135deg,transparent 49.5%,var(--border,#2c3e50) 49.5%,var(--border,#2c3e50) 50.5%,transparent 50.5%);margin-bottom:20px;opacity:.3}\
\
.setup{border:1px solid var(--border,#2c3e50);transition:border-color .3s,box-shadow .3s}\
.setup:hover{border-color:rgba(231,76,60,.3);box-shadow:0 0 30px rgba(231,76,60,.08)}\
\
.panel{transition:border-color .3s,box-shadow .3s}\
.panel:hover{border-color:rgba(231,76,60,.2);box-shadow:0 0 24px rgba(231,76,60,.06)}\
\
.stat{transition:transform .3s,box-shadow .3s}\
.stat:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,.2)}\
\
.btn-red{position:relative;overflow:hidden}\
.btn-red::after{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent 40%,rgba(255,255,255,.1) 50%,transparent 60%);animation:btnShine 3s infinite}\
@keyframes btnShine{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}\
\
.poster-cta{position:relative;overflow:hidden}\
.poster-cta::after{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent 40%,rgba(255,255,255,.12) 50%,transparent 60%);animation:btnShine 3s infinite}\
';
  document.head.appendChild(css);

  function run() {
    addVignette();
    observeEncounters();
    enhanceExisting();
  }

  // 1. Vignette overlay
  function addVignette() {
    if (document.querySelector('.vignette')) return;
    var v = document.createElement('div');
    v.className = 'vignette';
    v.setAttribute('aria-hidden', 'true');
    document.body.appendChild(v);
  }

  // 2. Type-colored encounter cards
  function colorEncounters(root) {
    var encs = root.querySelectorAll('.enc');
    encs.forEach(function(enc) {
      if (enc.getAttribute('data-type-color')) return;

      var nameEl = enc.querySelector('.enc-name');
      if (!nameEl) return;

      var text = nameEl.textContent;
      var pokeName = text;
      var match = text.match(/\(([^)]+)\)/);
      if (match) pokeName = match[1].trim();

      var type = POKE_TYPE[pokeName];
      if (!type) return;

      var color = TYPE_COLORS[type];
      if (!color) return;

      enc.setAttribute('data-type-color', type);
      enc.style.setProperty('--tc', color);
      enc.style.borderLeftColor = color;

      // Subtle background tint
      enc.style.background = 'linear-gradient(90deg, ' + color + '10 0%, var(--card, #16213e) 30%)';
    });
  }

  function observeEncounters() {
    var list = document.getElementById('encList');
    if (!list) return;

    colorEncounters(list);

    var observer = new MutationObserver(function() {
      colorEncounters(list);
    });
    observer.observe(list, { childList: true, subtree: true });
  }

  // 3. Enhance existing elements
  function enhanceExisting() {
    // Add subtle hover glow to team slots when filled
    var observer2 = new MutationObserver(function() {
      var slots = document.querySelectorAll('.slot.filled');
      slots.forEach(function(slot) {
        if (slot.getAttribute('data-enhanced')) return;
        slot.setAttribute('data-enhanced', '1');
        slot.style.transition = 'all .3s';
        slot.addEventListener('mouseenter', function() {
          this.style.boxShadow = '0 0 16px rgba(46,204,113,.2)';
          this.style.transform = 'translateY(-2px)';
        });
        slot.addEventListener('mouseleave', function() {
          this.style.boxShadow = '';
          this.style.transform = '';
        });
      });
    });

    var teamSlots = document.getElementById('teamSlots');
    if (teamSlots) {
      observer2.observe(teamSlots, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
