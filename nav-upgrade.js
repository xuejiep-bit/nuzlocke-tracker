/* ============================================
   NAV UPGRADE - Nuzlocke Tracker
   Dropdown navigation with all 29 pages
   Add to every page: <script src="nav-upgrade.js"></script>
   ============================================ */
(function(){
  'use strict';

  var NAV = {
    trackers: [
      { name: 'Main Tracker', url: '/' },
      { name: 'Emerald', url: '/emerald-nuzlocke-tracker.html' },
      { name: 'FireRed', url: '/firered-nuzlocke-tracker.html' },
      { name: 'Platinum', url: '/platinum-nuzlocke-tracker.html' },
      { name: 'HeartGold', url: '/pokemon-heartgold-nuzlocke-tracker.html' },
      { name: 'SoulSilver', url: '/pokemon-soulsilver-nuzlocke-tracker.html' },
      { name: 'Black', url: '/pokemon-black-nuzlocke-tracker.html' },
      { name: 'White', url: '/pokemon-white-nuzlocke-tracker.html' },
      { name: 'Black 2', url: '/pokemon-black-2-nuzlocke-tracker.html' },
      { name: 'X', url: '/pokemon-x-nuzlocke-tracker.html' },
      { name: 'Y', url: '/pokemon-y-nuzlocke-tracker.html' },
      { name: 'Moon', url: '/pokemon-moon-nuzlocke-tracker.html' },
      { name: 'Unbound', url: '/pokemon-unbound-nuzlocke-tracker.html' },
      { name: 'Infinite Fusion', url: '/pokemon-infinite-fusion-nuzlocke-tracker.html' },
    ],
    guides: [
      { name: 'Emerald Gym Leaders', url: '/emerald-gym-leaders.html' },
      { name: 'FireRed Gym Leaders', url: '/firered-gym-leaders.html' },
      { name: 'Platinum Gym Leaders', url: '/platinum-gym-leaders.html' },
      { name: 'HGSS Gym Leaders', url: '/heartgold-soulsilver-gym-leaders.html' },
      { name: 'Emerald Tier List', url: '/emerald-nuzlocke-tier-list.html' },
      { name: 'FireRed Tier List', url: '/firered-nuzlocke-tier-list.html' },
      { name: 'Platinum Tier List', url: '/platinum-nuzlocke-tier-list.html' },
      { name: 'HGSS Tier List', url: '/heartgold-soulsilver-nuzlocke-tier-list.html' },
      { name: 'Emerald Guide', url: '/nuzlocke-guide-emerald.html' },
      { name: 'FireRed Guide', url: '/nuzlocke-guide-firered.html' },
      { name: 'Platinum Guide', url: '/nuzlocke-guide-platinum.html' },
    ],
    tools: [
  { name: 'Nuzlocke Pokedex', url: '/nuzlocke-pokedex.html' },
  { name: 'Type Chart', url: '/type-chart.html' },
  ],
    blog: [
      { name: 'Nuzlocke Rules', url: '/nuzlocke-rules.html' },
      { name: 'Nuzlocke Tips', url: '/nuzlocke-tips.html' },
      { name: 'Best Pokemon', url: '/best-pokemon-for-nuzlocke.html' },
      { name: 'Best First Game', url: '/best-game-for-first-nuzlocke.html' },
      { name: 'Hardcore Rules', url: '/hardcore-nuzlocke-rules.html' },
      { name: 'Dupes Clause', url: '/nuzlocke-dupes-clause.html' },
      { name: 'Rare Candies', url: '/can-you-use-rare-candies-nuzlocke.html' },
      { name: 'Black Out Rules', url: '/nuzlocke-black-out-rules.html' },
    ]
  };

  var css = document.createElement('style');
  css.textContent = '\
.nav-new{display:flex;gap:4px;list-style:none;align-items:center}\
.nav-item{position:relative}\
.nav-btn{background:none;border:none;color:var(--text2,#95a5a6);font-family:"Outfit",sans-serif;font-size:.85rem;font-weight:500;padding:8px 12px;cursor:pointer;transition:color .2s;display:flex;align-items:center;gap:4px;text-decoration:none;border-radius:6px}\
.nav-btn:hover,.nav-btn.active{color:var(--red,#e74c3c)}\
.nav-arrow{font-size:.6rem;transition:transform .2s}\
.nav-item:hover .nav-arrow{transform:rotate(180deg)}\
\
.nav-drop{position:absolute;top:100%;left:0;min-width:200px;background:var(--bg2,#1a1a2e);border:1px solid var(--border,#2c3e50);border-radius:8px;padding:6px 0;opacity:0;visibility:hidden;transform:translateY(4px);transition:all .2s;z-index:100;box-shadow:0 8px 32px rgba(0,0,0,.3)}\
.nav-item:hover .nav-drop{opacity:1;visibility:visible;transform:translateY(0)}\
.nav-drop a{display:block;padding:8px 16px;color:var(--text2,#95a5a6);text-decoration:none;font-size:.82rem;transition:all .15s}\
.nav-drop a:hover{background:rgba(231,76,60,.1);color:var(--text,#ecf0f1);padding-left:20px}\
.nav-drop a.current{color:var(--red,#e74c3c);font-weight:600}\
\
.nav-mobile-btn{display:none;background:none;border:1px solid var(--border,#2c3e50);border-radius:6px;padding:6px 10px;cursor:pointer;color:var(--text,#ecf0f1)}\
.nav-mobile-btn svg{width:20px;height:20px}\
\
.nav-mobile-menu{display:none;position:fixed;top:64px;left:0;right:0;bottom:0;background:var(--bg,#0f0f17);z-index:99;padding:16px;overflow-y:auto}\
.nav-mobile-menu.show{display:block}\
.nav-mobile-menu .nm-cat{font-family:"Chakra Petch",sans-serif;font-size:.8rem;color:var(--red,#e74c3c);text-transform:uppercase;letter-spacing:1px;padding:12px 0 6px;border-bottom:1px solid var(--border,#2c3e50);margin-top:8px}\
.nav-mobile-menu .nm-cat:first-child{margin-top:0}\
.nav-mobile-menu a{display:block;padding:10px 12px;color:var(--text2,#95a5a6);text-decoration:none;font-size:.9rem;border-radius:6px;transition:all .15s}\
.nav-mobile-menu a:hover,.nav-mobile-menu a.current{background:rgba(231,76,60,.1);color:var(--text,#ecf0f1)}\
\
@media(max-width:768px){\
.nav-new{display:none}\
.nav-mobile-btn{display:flex}\
}\
';
  document.head.appendChild(css);

  function isCurrentPage(url) {
    var path = window.location.pathname;
    if (url === '/') return path === '/' || path === '/index.html' || path === '';
    return path === url || path.endsWith(url);
  }

  function buildDropdown(label, items) {
    var hasActive = items.some(function(i) { return isCurrentPage(i.url); });
    return '<li class="nav-item">' +
      '<button class="nav-btn' + (hasActive ? ' active' : '') + '">' + label + ' <span class="nav-arrow">\u25BC</span></button>' +
      '<div class="nav-drop">' +
      items.map(function(i) {
        return '<a href="' + i.url + '"' + (isCurrentPage(i.url) ? ' class="current"' : '') + '>' + i.name + '</a>';
      }).join('') +
      '</div></li>';
  }

  function buildDirectLink(label, url) {
    return '<li class="nav-item"><a class="nav-btn' + (isCurrentPage(url) ? ' active' : '') + '" href="' + url + '">' + label + '</a></li>';
  }

  function run() {
    var oldNav = document.querySelector('.nav-links');
    if (!oldNav) return;

    // Desktop nav
    var newNav = document.createElement('ul');
    newNav.className = 'nav-new';
    newNav.innerHTML =
      buildDropdown('Trackers', NAV.trackers) +
      buildDropdown('Guides', NAV.guides) +
      buildDropdown('Tools', NAV.tools) +
      buildDropdown('Blog', NAV.blog);

    oldNav.parentNode.replaceChild(newNav, oldNav);

    // Mobile hamburger button
    var header = document.querySelector('.header-inner');
    if (!header) return;

    var mobileBtn = document.createElement('button');
    mobileBtn.className = 'nav-mobile-btn';
    mobileBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    header.appendChild(mobileBtn);

    // Mobile menu
    var mobileMenu = document.createElement('div');
    mobileMenu.className = 'nav-mobile-menu';

    function buildMobileSection(title, items) {
      var h = '<div class="nm-cat">' + title + '</div>';
      items.forEach(function(i) {
        h += '<a href="' + i.url + '"' + (isCurrentPage(i.url) ? ' class="current"' : '') + '>' + i.name + '</a>';
      });
      return h;
    }

    mobileMenu.innerHTML =
      buildMobileSection('Trackers', NAV.trackers) +
      buildMobileSection('Guides', NAV.guides) +
      buildMobileSection('Tools', NAV.tools) +
      buildMobileSection('Blog', NAV.blog);

    document.body.appendChild(mobileMenu);

    // Toggle mobile menu
    mobileBtn.addEventListener('click', function() {
      var isOpen = mobileMenu.classList.toggle('show');
      this.innerHTML = isOpen
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
