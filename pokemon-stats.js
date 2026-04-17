/* Nuzlocke Tracker — Base Stats enhancement
 * Fetches Pokemon base stats from PokeAPI and injects compact stat bars
 * into each encounter card. Works on all 11 tracker pages.
 * Cached in localStorage so each Pokemon is only fetched once per device.
 */
(function () {
  'use strict';

  var CACHE_KEY = 'nzt_pokemon_stats_v1';
  var API = 'https://pokeapi.co/api/v2/pokemon/';
  var cache = {};
  try { cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); } catch (e) {}
  var pending = {};

  function saveCache() {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch (e) {}
  }

  function normalize(name) {
    return String(name || '')
      .toLowerCase()
      .trim()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\u2640/g, '-f').replace(/\u2642/g, '-m')
      .replace(/['.:]/g, '')
      .replace(/\s+/g, '-');
  }

  function fetchStats(name) {
    var key = normalize(name);
    if (!key) return Promise.resolve(null);
    if (Object.prototype.hasOwnProperty.call(cache, key)) {
      return Promise.resolve(cache[key]);
    }
    if (pending[key]) return pending[key];

    pending[key] = fetch(API + key)
      .then(function (res) {
        if (!res.ok) { cache[key] = null; saveCache(); return null; }
        return res.json();
      })
      .then(function (data) {
        if (!data) return null;
        var map = {
          'hp': 'hp', 'attack': 'atk', 'defense': 'def',
          'special-attack': 'spa', 'special-defense': 'spd', 'speed': 'spe'
        };
        var s = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
        (data.stats || []).forEach(function (st) {
          var k = map[st.stat.name];
          if (k) s[k] = st.base_stat;
        });
        s.total = s.hp + s.atk + s.def + s.spa + s.spd + s.spe;
        cache[key] = s;
        saveCache();
        return s;
      })
      .catch(function () { return null; })
      .then(function (result) { delete pending[key]; return result; });

    return pending[key];
  }

  function statsHTML(stats) {
    if (!stats) return '';
    var rows = [
      ['HP', 'hp'], ['Atk', 'atk'], ['Def', 'def'],
      ['SpA', 'spa'], ['SpD', 'spd'], ['Spe', 'spe']
    ].map(function (pair) {
      var label = pair[0], key = pair[1];
      var v = stats[key] || 0;
      var pct = Math.min(100, Math.round(v / 180 * 100));
      var color = v >= 100 ? '#22c55e' : v >= 70 ? '#eab308' : '#ef4444';
      return '<div class="nzt-ps-row">' +
        '<span class="nzt-ps-lbl">' + label + '</span>' +
        '<div class="nzt-ps-bar"><div class="nzt-ps-fill" style="width:' + pct + '%;background:' + color + '"></div></div>' +
        '<span class="nzt-ps-val">' + v + '</span>' +
        '</div>';
    }).join('');
    return '<div class="nzt-poke-stats" data-nzt-stats="1">' +
      '<div class="nzt-ps-total">BST <b>' + stats.total + '</b></div>' +
      rows +
      '</div>';
  }

  function injectCSS() {
    if (document.getElementById('nzt-poke-stats-css')) return;
    var s = document.createElement('style');
    s.id = 'nzt-poke-stats-css';
    s.textContent =
      '.nzt-poke-stats{margin-top:8px;padding:7px 9px;background:rgba(0,0,0,0.04);' +
      'border-radius:6px;font-size:10px;line-height:1.3;' +
      'font-family:"SF Mono",Menlo,Consolas,"Liberation Mono",monospace}' +
      '.nzt-ps-total{font-size:10px;color:#666;margin-bottom:4px;letter-spacing:0.5px}' +
      '.nzt-ps-total b{color:#111;font-size:11px;margin-left:4px}' +
      '.nzt-ps-row{display:flex;align-items:center;gap:6px;margin-bottom:2px}' +
      '.nzt-ps-lbl{width:26px;color:#888;text-align:right;font-weight:600}' +
      '.nzt-ps-bar{flex:1;height:6px;background:rgba(0,0,0,0.09);border-radius:3px;overflow:hidden}' +
      '.nzt-ps-fill{height:100%;transition:width .4s ease}' +
      '.nzt-ps-val{width:26px;color:#222;font-weight:700;text-align:right}';
    document.head.appendChild(s);
  }

  function extractName(el) {
    var txt = (el.textContent || '').trim();
    if (!txt) return null;
    // "Nickname (Name)" pattern - prefer the parenthesized species name
    var m = txt.match(/\(([^()]+)\)\s*$/);
    if (m) return m[1].trim();
    return txt;
  }

  function enhanceCard(enc) {
    // Find name element (handle both DOM variants across trackers)
    var nameEl = enc.querySelector('.enc-name') ||
                 (enc.querySelector('.info') && enc.querySelector('.info .name')) ||
                 enc.querySelector('.name');
    if (!nameEl) return;

    // Find info container to append stats to
    var infoEl = enc.querySelector('.enc-info') ||
                 enc.querySelector('.info') ||
                 nameEl.parentElement;
    if (!infoEl) return;

    // Already enhanced?
    if (infoEl.querySelector('[data-nzt-stats]')) return;

    var pokeName = extractName(nameEl);
    if (!pokeName) return;

    // Mark as in-progress to prevent double fetching on rapid re-renders
    infoEl.setAttribute('data-nzt-pending', pokeName);

    fetchStats(pokeName).then(function (stats) {
      // Verify the card still exists and still wants this name
      if (!document.body.contains(infoEl)) return;
      if (infoEl.getAttribute('data-nzt-pending') !== pokeName) return;
      infoEl.removeAttribute('data-nzt-pending');
      if (infoEl.querySelector('[data-nzt-stats]')) return;
      if (!stats) return; // Pokemon not found in API, skip silently
      var tmp = document.createElement('div');
      tmp.innerHTML = statsHTML(stats);
      if (tmp.firstChild) infoEl.appendChild(tmp.firstChild);
    });
  }

  function enhanceAll() {
    injectCSS();
    var cards = document.querySelectorAll('#encList .enc');
    for (var i = 0; i < cards.length; i++) enhanceCard(cards[i]);
  }

  var timer = null;
  function schedule() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(enhanceAll, 120);
  }

  function init() {
    enhanceAll();
    var encList = document.getElementById('encList');
    if (encList && window.MutationObserver) {
      new MutationObserver(schedule).observe(encList, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
