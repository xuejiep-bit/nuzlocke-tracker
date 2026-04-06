/* ============================================
   SVG ICON REPLACER - Nuzlocke Tracker
   Replaces emojis with professional Lucide-style SVG icons
   Add to any page: <script src="svg-icons.js"></script>
   ============================================ */
(function(){
  'use strict';

  var icons = {
    gear: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:4px"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
    trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:3px"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    clipboard: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:4px"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
    trophy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:4px"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    warning: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:4px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    book: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:3px"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    pin: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:2px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    gamepad: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:4px"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>',
    check: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:0"><polyline points="20 6 9 17 4 12"/></svg>',
    box: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:0"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    skull: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:0"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="M12.5 17l-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/></svg>'
  };

  function replaceInEl(el, emoji, svg) {
    if (!el) return;
    if (el.innerHTML && el.innerHTML.indexOf(emoji) !== -1) {
      el.innerHTML = el.innerHTML.split(emoji).join(svg);
    }
  }

  function replaceText(root, emoji, replacement) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [];
    while (walker.nextNode()) {
      if (walker.currentNode.textContent.indexOf(emoji) !== -1) {
        nodes.push(walker.currentNode);
      }
    }
    nodes.forEach(function(node) {
      var span = document.createElement('span');
      span.innerHTML = node.textContent.split(emoji).join(replacement);
      node.parentNode.replaceChild(span, node);
    });
  }

  function run() {
    // Replace h2 headings with emojis
    var h2s = document.querySelectorAll('h2, h3');
    h2s.forEach(function(h) {
      var t = h.innerHTML;
      if (t.indexOf('\u2699\uFE0F') !== -1) h.innerHTML = t.replace('\u2699\uFE0F', icons.gear);
      if (t.indexOf('\uD83D\uDCCB') !== -1) h.innerHTML = h.innerHTML.replace('\uD83D\uDCCB', icons.clipboard);
      if (t.indexOf('\uD83C\uDFC6') !== -1) h.innerHTML = h.innerHTML.replace('\uD83C\uDFC6', icons.trophy);
      if (t.indexOf('\u26A0\uFE0F') !== -1) h.innerHTML = h.innerHTML.replace('\u26A0\uFE0F', icons.warning);
    });

    // Replace button emojis
    var btns = document.querySelectorAll('button');
    btns.forEach(function(b) {
      var t = b.innerHTML;
      if (t.indexOf('\uD83D\uDDD1\uFE0F') !== -1) b.innerHTML = t.replace('\uD83D\uDDD1\uFE0F', icons.trash);
    });

    // Replace gym link emojis
    var links = document.querySelectorAll('a');
    links.forEach(function(a) {
      if (a.innerHTML.indexOf('\uD83D\uDCD6') !== -1) {
        a.innerHTML = a.innerHTML.replace('\uD83D\uDCD6', icons.book);
      }
    });

    // Replace select option emojis (these can't have HTML, so use text)
    var opts = document.querySelectorAll('option');
    opts.forEach(function(o) {
      o.textContent = o.textContent
        .replace('\u2705 ', '\u2713 ')
        .replace('\uD83D\uDCE6 ', '')
        .replace('\uD83D\uDC80 ', '\u2717 ');
    });

    // Replace empty state emoji
    var empty = document.getElementById('emptyState');
    if (empty && empty.innerHTML.indexOf('\uD83C\uDFAE') !== -1) {
      empty.innerHTML = empty.innerHTML.replace('\uD83C\uDFAE', icons.gamepad);
    }

    // Override renderEnc to use SVG pin instead of emoji
    if (typeof window.origRenderEnc === 'undefined' && typeof renderEnc === 'function') {
      window.origRenderEnc = renderEnc;
    }

    // Patch the encounter rendering to replace emojis in dynamic content
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(m) {
        m.addedNodes.forEach(function(node) {
          if (node.nodeType !== 1) return;
          // Replace pin emoji in encounter details
          var details = node.querySelectorAll ? node.querySelectorAll('.enc-detail') : [];
          details.forEach(function(d) {
            if (d.innerHTML.indexOf('\uD83D\uDCCD') !== -1) {
              d.innerHTML = d.innerHTML.replace('\uD83D\uDCCD', icons.pin);
            }
          });
          // Replace status button emojis
          var sbtns = node.querySelectorAll ? node.querySelectorAll('.sbtn') : [];
          sbtns.forEach(function(s) {
            if (s.innerHTML === '\uD83D\uDCE6') s.innerHTML = icons.box;
            if (s.innerHTML === '\uD83D\uDC80') s.innerHTML = icons.skull;
          });
          // Replace empty state
          if (node.classList && node.classList.contains('empty')) {
            if (node.innerHTML.indexOf('\uD83C\uDFAE') !== -1) {
              node.innerHTML = node.innerHTML.replace('\uD83C\uDFAE', icons.gamepad);
            }
          }
          // Replace weakness panel header
          var wh = node.querySelectorAll ? node.querySelectorAll('.weakness-panel h3') : [];
          wh.forEach(function(h) {
            if (h.innerHTML.indexOf('\u26A0\uFE0F') !== -1) {
              h.innerHTML = h.innerHTML.replace('\u26A0\uFE0F', icons.warning);
            }
          });
        });
      });
    });

    var app = document.getElementById('tracker');
    if (app) {
      observer.observe(app, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
