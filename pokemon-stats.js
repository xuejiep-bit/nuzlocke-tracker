/* Nuzlocke Tracker — Base Stats enhancement (v2, dark theme)
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

  function statColor(v) {
    if (v >= 120) return '#06b6d4'; // cyan - elite
    if (v >= 90)  return '#22c55e'; // green - strong
    if (v >= 60)  return '#eab308'; // yellow - mid
    return '#f87171';               // soft red - low
  }

  function bstColor(total) {
    if (total >= 600) return '#06b6d4'; // cyan - legendary/pseudo
    if (total >= 500) return '#22c55e'; // green - strong
    if (total >= 400) return '#f1f5f9'; // near-white - average
    return '#94a3b8';                   // muted - weak
  }

  function statsHTML(stats) {
    if (!stats) return '';
    var rows = [
      ['HP', 'hp'], ['Atk', 'atk'], ['Def', 'def'],
      ['SpA', 'spa'], ['SpD', 'spd'], ['Spe', 'spe']
    ].map(function (pair) {
      var label = pair[0], key = pair[1];
      var v = stats[key] || 0;
      var pct = Math.min(100, Math.round(v / 150 * 100));
      var color = statColor(v);
      return '<div class="nzt-ps-row">' +
        '<span class="nzt-ps-lbl">' + label + '</span>' +
        '<div class="nzt-ps-bar"><div class="nzt-ps-fill" style="width:' + pct + '%;background:' + color + '"></div></div>' +
        '<span class="nzt-ps-val">' + v + '</span>' +
        '</div>';
    }).join('');
    return '<div class="nzt-poke-stats" data-nzt-stats="1">' +
      '<div class="nzt-ps-total"><span class="nzt-ps-tlbl">BST</span>' +
      '<b style="color:' + bstColor(stats.total) + '">' + stats.total + '</b></div>' +
      rows +
      '</div>';
  }

  function injectCSS() {
    if (document.getElementById('nzt-poke-stats-css')) return;
    var s = document.createElement('style');
    s.id = 'nzt-poke-stats-css';
    s.textContent =
      '.nzt-poke-stats{display:block;width:100%;clear:both;box-sizing:border-box;' +
      'margin-top:8px;padding:8px 10px;' +
      'background:rgba(255,255,255,0.04);' +
      'border:1px solid rgba(255,255,255,0.08);' +
      'border-radius:6px;font-size:10px;line-height:1.35;' +
      'font-family:"SF Mono",Menlo,Consolas,"Liberation Mono",monospace}' +
      '.nzt-ps-total{display:flex;align-items:baseline;gap:6px;' +
      'margin-bottom:6px;padding-bottom:5px;' +
      'border-bottom:1px solid rgba(255,255,255,0.06)}' +
      '.nzt-ps-tlbl{font-size:10px;color:rgba(255,255,255,0.5);' +
      'font-weight:600;letter-spacing:0.6px}' +
      '.nzt-ps-total b{font-size:13px;font-weight:800;letter-spacing:0.3px}' +
      '.nzt-ps-row{display:flex;align-items:center;gap:7px;margin-bottom:2px;width:100%}' +
      '.nzt-ps-row:last-child{margin-bottom:0}' +
      '.nzt-ps-lbl{flex:0 0 26px;width:26px;color:rgba(255,255,255,0.55);' +
      'text-align:right;font-weight:600}' +
      '.nzt-ps-bar{flex:1 1 auto;min-width:80px;height:6px;' +
      'background:rgba(255,255,255,0.09);' +
      'border-radius:3px;overflow:hidden}' +
      '.nzt-ps-fill{height:100%;border-radius:3px;' +
      'transition:width .4s ease;box-shadow:0 0 6px rgba(255,255,255,0.05)}' +
      '.nzt-ps-val{flex:0 0 28px;width:28px;color:rgba(255,255,255,0.92);' +
      'font-weight:700;text-align:right}';
    document.head.appendChild(s);
  }

  function extractName(el) {
    var txt = (el.textContent || '').trim();
    if (!txt) return null;
    var m = txt.match(/\(([^()]+)\)\s*$/);
    if (m) return m[1].trim();
    return txt;
  }

  function enhanceCard(enc) {
    var nameEl = enc.querySelector('.enc-name') ||
                 (enc.querySelector('.info') && enc.querySelector('.info .name')) ||
                 enc.querySelector('.name');
    if (!nameEl) return;

    var infoEl = enc.querySelector('.enc-info') ||
                 enc.querySelector('.info') ||
                 nameEl.parentElement;
    if (!infoEl) return;

    if (infoEl.querySelector('[data-nzt-stats]')) return;

    var pokeName = extractName(nameEl);
    if (!pokeName) return;

    infoEl.setAttribute('data-nzt-pending', pokeName);

    fetchStats(pokeName).then(function (stats) {
      if (!document.body.contains(infoEl)) return;
      if (infoEl.getAttribute('data-nzt-pending') !== pokeName) return;
      infoEl.removeAttribute('data-nzt-pending');
      if (infoEl.querySelector('[data-nzt-stats]')) return;
      if (!stats) return;
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
