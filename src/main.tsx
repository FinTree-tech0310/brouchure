// @ts-nocheck
window.addEventListener('error', function(){
  /* never leave content hidden: on any script error, reveal everything plainly */
  document.documentElement.classList.remove('js');
  document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
});
(function(){
  'use strict';
  try{
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS = 'http://www.w3.org/2000/svg';

  /* ================= editable configs ================= */

  /* Attempt simulator: study hours/day -> realistic first attempt window.
     Same mapping across all three levels for now — refine per level later. */
  var SIM_CONFIG = {
    attemptByHours: { '6-8': 'February 2027', '4-6': 'May 2027', '2-4': 'August 2027' },
    hoursLabel:     { '2-4': '2–4 hrs/day',   '4-6': '4–6 hrs/day', '6-8': '6–8 hrs/day' }
  };

  /* Demo lectures: subject lists per attempt. Level I slots now carry the real
     YouTube lectures from the CFA Level-I Demo playlist (9 subjects — no Ethics
     lecture exists, so that slot is gone). L2/L3 stay placeholders. */
  var DEMO_SUBJECTS = {
    'Level I':   [['QM','Quantitative Methods'],['ECO','Economics'],['FSA','Financial Statement Analysis'],['CI','Corporate Issuers'],['EQ','Equity Investments'],['FI','Fixed Income'],['DER','Derivatives'],['ALT','Alternative Investments'],['PM','Portfolio Management']],
    'Level II':  [['QM','Quantitative Methods'],['ECO','Economics'],['FSA','Financial Statement Analysis'],['CI','Corporate Issuers'],['EQ','Equity Investments'],['FI','Fixed Income'],['DER','Derivatives'],['ALT','Alternative Investments'],['PM','Portfolio Management'],['ETH','Ethical & Professional Standards']],
    'Level III': [['QM','Quantitative Methods'],['ECO','Economics'],['FSA','Financial Statement Analysis'],['CI','Corporate Issuers'],['EQ','Equity Investments'],['FI','Fixed Income'],['DER','Derivatives'],['ALT','Alternative Investments'],['PM','Portfolio Management'],['ETH','Ethical & Professional Standards']]
  };
  var LEVEL_CODE = { 'Level I':'L1', 'Level II':'L2', 'Level III':'L3' };

  /* real lecture per Level I subject: code -> [youtube id, topic label] */
  var DEMO_VIDEOS = {
    'L1': {
      QM:  ['uboV9HEj2gk', 'Normal Distribution · 13 mins'],
      ECO: ['0kiA1YJpKzA', 'Demand for Money · 9 mins'],
      FSA: ['C5dRcWtmgyM', 'FCFF · 33 mins'],
      CI:  ['7XzV6xgenug', 'Cash Conversion Cycle · 21 mins'],
      EQ:  ['6AUy8rJvytA', 'Equity Valuation · 35 mins'],
      FI:  ['XhYaEsbSuCk', 'Mod Duration · 35 mins'],
      DER: ['v6tq01bOE28', 'Put Call Parity · 23 mins'],
      ALT: ['RWGw9Zy5s2I', 'Hedge Funds · 29 mins'],
      PM:  ['UZJ61gIWHjY', 'Efficient Frontier · 43 mins']
    }
  };

  /* ================= nav ================= */
  var nav = document.getElementById('nav');
  function navScroll(){ nav.classList.toggle('scrolled', window.scrollY > 30); }

  /* ================= reveal on scroll ================= */
  var ioFired = false;
  var io = new IntersectionObserver(function(entries){
    ioFired = true;
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  /* init succeeded — only now is it safe to let CSS gate visibility */
  document.documentElement.classList.add('fx');
  /* watchdog: shortly after load, reveal everything unconditionally — the page
     must never depend on scroll or on the observer for content to be visible */
  setTimeout(function(){
    document.querySelectorAll('.reveal:not(.in)').forEach(function(el){ el.classList.add('in'); });
  }, 1400);

  /* ================= the seam (thread) ================= */
  var svg = document.getElementById('thread');
  var pathEl = null, pathLen = 0, treeY = 0, doodles = [];

  var DOODLES = [
    ['sec1','dd-sprout',170], ['compare','dd-chart',-46], ['sec2','dd-star',110],
    ['founder','dd-pencil',-16], ['sec3','dd-book',110], ['levels','dd-flag',-16],
    ['sec4','dd-compass',54], ['sec5','dd-play',110], ['demo','dd-film',-16],
    ['sec6','dd-brief',110], ['sec7','dd-chat',70]
  ];

  function gutterX(){
    return window.innerWidth < 720 ? 14 : Math.max(60, Math.min(120, window.innerWidth * 0.055));
  }
  function waveX(y, g){
    var a = window.innerWidth < 720 ? 0.55 : 1;
    return g + (Math.sin(y / 430) * 16 + Math.sin(y / 137) * 5) * a;
  }
  function threadX(y, g, tree){
    var x = waveX(y, g);
    if (tree){
      /* keep the final approach short and steep: the thread stays in the gutter
         until just above the tree, then hooks right into it — never crossing text */
      var start = tree.y - 90;
      if (y > start){
        var t = Math.min(1, (y - start) / 90);
        var s = t * t * t;
        x = x + (tree.x - x) * s;
      }
    }
    return x;
  }

  function buildThread(){
    /* body zoom (mobile 75%) shrinks the svg's used height — pre-compensate so the
       thread still spans the full page, while all other math stays in visual pixels */
    var ZF = parseFloat(getComputedStyle(document.body).zoom) || 1;
    var docH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    svg.setAttribute('viewBox', '0 0 ' + window.innerWidth + ' ' + docH);
    svg.setAttribute('height', String(Math.round(docH / ZF)));
    svg.innerHTML = '';
    doodles = [];

    var g = gutterX();
    var treeEl = document.getElementById('endTree');
    var tree = null;
    if (treeEl){
      var r = treeEl.getBoundingClientRect();
      tree = { x: r.left + window.scrollX + r.width / 2, y: r.top + window.scrollY + 14 };
    }
    var endY = tree ? tree.y : docH - 80;
    treeY = endY;

    /* path points */
    var pts = [], y, step = 130;
    for (y = -40; y < endY; y += step){ pts.push({ x: threadX(y, g, tree), y: y }); }
    pts.push({ x: threadX(endY, g, tree), y: endY });

    var d = 'M ' + pts[0].x.toFixed(1) + ' ' + pts[0].y.toFixed(1);
    for (var i = 1; i < pts.length - 1; i++){
      var mx = (pts[i].x + pts[i+1].x) / 2, my = (pts[i].y + pts[i+1].y) / 2;
      d += ' Q ' + pts[i].x.toFixed(1) + ' ' + pts[i].y.toFixed(1) + ' ' + mx.toFixed(1) + ' ' + my.toFixed(1);
    }
    d += ' L ' + pts[pts.length-1].x.toFixed(1) + ' ' + pts[pts.length-1].y.toFixed(1);

    pathEl = document.createElementNS(NS, 'path');
    pathEl.setAttribute('d', d);
    pathEl.setAttribute('class', 'threadline');
    svg.appendChild(pathEl);
    pathLen = pathEl.getTotalLength();

    if (!reduced){
      pathEl.style.strokeDasharray = pathLen;
      pathEl.style.strokeDashoffset = pathLen;
    }

    /* doodles */
    DOODLES.forEach(function(item){
      var anchor = document.getElementById(item[0]);
      var def = document.getElementById(item[1]);
      if (!anchor || !def) return;
      var dy = anchor.getBoundingClientRect().top + window.scrollY + item[2];
      if (dy > endY - 60) return;
      var dx = threadX(dy, g, tree);

      var stem = document.createElementNS(NS, 'path');
      stem.setAttribute('d', 'M ' + dx.toFixed(1) + ' ' + dy.toFixed(1) + ' q 12 -5 24 -2');
      stem.setAttribute('class', 'stem doodle');
      stem.dataset.y = dy;
      svg.appendChild(stem);

      var dg = document.createElementNS(NS, 'g');
      dg.setAttribute('class', 'doodle');
      dg.setAttribute('transform', 'translate(' + (dx + 20).toFixed(1) + ',' + (dy - 25).toFixed(1) + ') scale(0.95)');
      var use = document.createElementNS(NS, 'use');
      use.setAttribute('href', '#' + item[1]);
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + item[1]);
      dg.appendChild(use);
      dg.dataset.y = dy;
      svg.appendChild(dg);
      doodles.push(dg, stem);
    });

    updateThread();
  }

  var pShown = 0, threadRaf = null;
  function threadTarget(){
    if (reduced) return 1;
    return Math.min(1, (window.scrollY + window.innerHeight * 0.88) / Math.max(treeY, 1));
  }
  function drawThread(){
    pathEl.style.strokeDashoffset = pathLen * (1 - pShown);
    var drawnY = pShown * treeY;
    doodles.forEach(function(dg){
      dg.classList.toggle('on', reduced || parseFloat(dg.dataset.y) < drawnY + 40);
    });
  }
  function threadStep(){
    var t = threadTarget();
    pShown += (t - pShown) * 0.06;
    if (Math.abs(t - pShown) < 0.0004){ pShown = t; drawThread(); threadRaf = null; return; }
    drawThread();
    threadRaf = window.requestAnimationFrame(threadStep);
  }
  function updateThread(){
    if (!pathEl) return;
    if (reduced){ pShown = 1; drawThread(); return; }
    if (threadRaf === null) threadRaf = window.requestAnimationFrame(threadStep);
  }

  var ticking = false;
  function onScroll(){
    navScroll();
    if (!ticking){
      window.requestAnimationFrame(function(){ updateThread(); ticking = false; });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  var rsz;
  window.addEventListener('resize', function(){ clearTimeout(rsz); rsz = setTimeout(buildThread, 220); });
  window.addEventListener('load', buildThread);
  if (document.fonts && document.fonts.ready){ document.fonts.ready.then(function(){ buildThread(); }); }
  buildThread();
  navScroll();

  /* ================= tabs (shared) ================= */
  function wireTabs(listEl, onPick){
    var tabs = Array.prototype.slice.call(listEl.querySelectorAll('[role="tab"]'));
    function select(tab, focus){
      tabs.forEach(function(t){
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
      });
      if (focus) tab.focus();
      onPick(tab);
    }
    tabs.forEach(function(t, i){
      t.addEventListener('click', function(){ select(t, false); });
      t.addEventListener('keydown', function(e){
        var n = null;
        if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft')  n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') n = tabs[0];
        if (e.key === 'End')  n = tabs[tabs.length - 1];
        if (n){ e.preventDefault(); select(n, true); }
      });
    });
  }

  /* level tabs */
  var levelTabs = document.querySelector('.tabs .tablist');
  wireTabs(levelTabs, function(tab){
    var key = tab.dataset.tab;
    document.querySelectorAll('.tabpanel').forEach(function(p){
      p.hidden = p.id !== 'panel-' + key;
    });
  });

  /* ================= attempt simulator ================= */
  var sim = document.getElementById('sim');
  var state = { level: null, persona: null, hours: null };
  var step = 1;
  var resultEl = document.getElementById('simResult');
  var navEl = document.getElementById('simNav');

  function paintProgress(n, done){
    sim.querySelectorAll('.sim-dot').forEach(function(d){
      var k = parseInt(d.dataset.dot, 10);
      d.classList.toggle('done', done || k < n);
      d.classList.toggle('active', !done && k === n);
    });
    sim.querySelectorAll('.sim-link').forEach(function(l){
      l.classList.toggle('done', done || parseInt(l.dataset.link, 10) < n);
    });
  }
  function showStep(n){
    step = n;
    if (n === 3){
      /* hours options depend on persona: student -> 4-6 / 6-8, working -> 2-4 / 4-6 */
      var pk = state.persona === 'Student' ? 'student' : 'working';
      sim.querySelectorAll('.sim-opt[data-key="hours"]').forEach(function(b){
        var show = (b.dataset.personas || '').indexOf(pk) !== -1;
        b.hidden = !show;
        if (!show && b.classList.contains('picked')){ b.classList.remove('picked'); state.hours = null; }
      });
    }
    sim.querySelectorAll('.sim-step').forEach(function(s){ s.hidden = parseInt(s.dataset.step, 10) !== n; });
    resultEl.hidden = true;
    navEl.hidden = (n === 1);
    paintProgress(n, false);
  }
  function showResult(){
    sim.querySelectorAll('.sim-step').forEach(function(s){ s.hidden = true; });
    navEl.hidden = true;
    paintProgress(3, true);
    document.getElementById('simEcho').textContent =
      state.level + ' · ' + state.persona + ' · ' + SIM_CONFIG.hoursLabel[state.hours] + ' →';
    document.getElementById('simMonth').textContent = SIM_CONFIG.attemptByHours[state.hours];
    resultEl.hidden = false;
    buildThread();
  }

  sim.querySelectorAll('.sim-opt').forEach(function(btn){
    btn.addEventListener('click', function(){
      state[btn.dataset.key] = btn.dataset.value;
      btn.classList.add('picked');
      setTimeout(function(){
        if (step < 3) showStep(step + 1);
        else showResult();
      }, reduced ? 0 : 240);
    });
  });
  document.getElementById('simBack').addEventListener('click', function(){ if (step > 1) showStep(step - 1); });
  document.getElementById('simRestart').addEventListener('click', function(){
    state = { level: null, persona: null, hours: null };
    sim.querySelectorAll('.sim-opt').forEach(function(b){ b.classList.remove('picked'); });
    showStep(1);
    buildThread();
  });

  /* reviews: auto-scrolling strip, also draggable with the cursor */
  (function(){
    var track = document.querySelector('.review-track');
    if (!track) return;
    var off = 0, dragging = false, dragX = 0, dragOff = 0, hovering = false, lastT = 0;
    var SPEED = 72; /* px/s — same pace as the old CSS loop */
    function half(){ return track.scrollWidth / 2; }
    function wrap(){ var h = half(); while (h > 0 && off <= -h) off += h; while (h > 0 && off > 0) off -= h; }
    function loop(t){
      if (!lastT) lastT = t;
      var dt = Math.min(0.05, (t - lastT) / 1000); lastT = t;
      if (!dragging && !hovering && !reduced){ off -= SPEED * dt; wrap(); }
      track.style.transform = 'translateX(' + off.toFixed(1) + 'px)';
      window.requestAnimationFrame(loop);
    }
    track.addEventListener('pointerdown', function(e){
      dragging = true; dragX = e.clientX; dragOff = off;
      track.classList.add('dragging');
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', function(e){
      if (!dragging) return;
      off = dragOff + (e.clientX - dragX); wrap();
    });
    function endDrag(){ dragging = false; track.classList.remove('dragging'); }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    var car = track.closest('.review-carousel');
    if (car){
      car.addEventListener('mouseenter', function(){ hovering = true; });
      car.addEventListener('mouseleave', function(){ hovering = false; });
    }
    window.requestAnimationFrame(loop);
  })();

  /* ================= demo lectures ================= */
  var demoGrid = document.getElementById('demoGrid');
  function renderDemos(level){
    var code = LEVEL_CODE[level] || 'L1';
    var subs = DEMO_SUBJECTS[level] || [];
    var vids = DEMO_VIDEOS[code] || {};
    demoGrid.innerHTML = subs.map(function(s){
      var v = vids[s[0]];
      if (v){
        return '<figure class="yt-embed in" data-vid="' + v[0] + '" data-title="' + s[1] + ' — FinTree demo lecture">' +
          '<button class="yt-facade" type="button" aria-label="Play: ' + s[1] + ' demo lecture">' +
            '<img src="https://i.ytimg.com/vi/' + v[0] + '/hqdefault.jpg" alt="' + s[1] + ' demo lecture" loading="lazy">' +
            '<span class="play"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 3l13 7-13 7z"/></svg></span>' +
          '</button>' +
          '<figcaption><strong>' + s[1] + '</strong><span>' + v[1] + '</span></figcaption>' +
        '</figure>';
      }
      return '<div class="ph yt in">' +
        '<span class="play"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 3l13 7-13 7z"/></svg></span>' +
        '<span class="tag">[YT_DEMO_' + code + '_' + s[0] + ']</span>' +
        '<span class="sub-name">' + s[1] + '</span>' +
      '</div>';
    }).join('');
    buildThread();
  }
  var demoTabs = document.getElementById('demoTabs');
  wireTabs(demoTabs, function(tab){ renderDemos(tab.dataset.level); });
  renderDemos('Level I');

  /* level demo videos: click-to-play facades (thumbnail swaps to live embed).
     Delegated, so facades rendered later by renderDemos work too. */
  document.addEventListener('click', function(e){
    var btn = e.target && e.target.closest ? e.target.closest('.yt-embed .yt-facade') : null;
    if (!btn) return;
    var fig = btn.closest('.yt-embed');
    var ifr = document.createElement('iframe');
    ifr.src = 'https://www.youtube-nocookie.com/embed/' + fig.dataset.vid + '?autoplay=1&rel=0';
    ifr.title = fig.dataset.title || 'FinTree video';
    ifr.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    ifr.setAttribute('allowfullscreen', '');
    ifr.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    btn.replaceWith(ifr);
  });

  /* ================= plans & fees (mirrors the course-page system) ================= */
  /* fee matrix per level & exam window, in ₹ — order matches PLAN order in each level */
  var FEES = {
    'Level I': {
      attempts: ['Nov 2026', 'Feb 2027', 'May 2027', 'Aug 2027'],
      plans: ['classroom', 'live', 'home'],
      prices: {
        'Nov 2026': [64900, 54900, 44900],
        'Feb 2027': [69900, 59900, 49900],
        'May 2027': [74900, 64900, 54900],
        'Aug 2027': [79900, 69900, 59900]
      }
    },
    'Level II': {
      attempts: ['Nov 2026', 'May 2027', 'Aug 2027', 'Nov 2027'],
      plans: ['classroom', 'live', 'home'],
      prices: {
        'Nov 2026': [57000, 57000, 51000],
        'May 2027': [69000, 69000, 63000],
        'Aug 2027': [75000, 75000, 69000],
        'Nov 2027': [81000, 81000, 75000]
      }
    },
    'Level III': {
      attempts: ['Feb 2027', 'Aug 2027'],
      plans: ['live', 'home', 'essential'],
      specialisations: ['Portfolio Management', 'Private Wealth', 'Private Markets'],
      prices: {
        'Feb 2027': [54000, 48000, 42000],
        'Aug 2027': [66000, 60000, 54000]
      }
    }
  };
  var PLAN_META = {
    classroom: { mode: 'Instructor-led', name: 'Classroom',   blurb: 'In the room, in Pune.' },
    live:      { mode: 'Instructor-led', name: 'Live School', blurb: 'Real, live classes from anywhere.' },
    home:      { mode: 'Self-paced',     name: 'Home School', blurb: 'Full depth, on your own schedule.' },
    essential: { mode: 'Self-paced',     name: 'Essential',   blurb: 'The essentials, nothing diluted.' }
  };
  /* exact per-plan inclusions, per level (mirrors the course page) */
  function planFeatures(key, level){
    var l3 = (level === 'Level III');
    var base = ['Level Zero™ onboarding + study planner', 'Pre-Recorded Videos'];
    if (key === 'essential'){
      if (!l3) base.push('Question Bank');
      base.push('3 full-length mock exams');
      return base;
    }
    if (key === 'home'){
      base.push('Juice Notes™ (soft copy PDF)');
      if (!l3) base.push('Question Bank');
      base.push('7 full-length mock exams', 'Forum Access for Doubt Clearing', 'Lifetime Placement Support (India only)');
      return base;
    }
    /* instructor-led: classroom & live school */
    base.push(key === 'classroom' ? 'Live Session (offline & online)' : 'Live Session (online)');
    if (key === 'classroom' && level === 'Level I') base.push('Juice Notes™ (printed hard copy PDF)');
    else base.push('Juice Notes™ (soft copy PDF)');
    base.push('Question Bank', '7 full-length mock exams', 'Weekly Tests',
              'Archive of the Live Session (48 hours)', 'Forum Access for Doubt Clearing',
              'Lifetime Placement Support (India only)');
    return base;
  }
  var feesState = { level: 'Level I', attempt: null, spec: null };
  var feesLevels = document.getElementById('feesLevels');
  if (feesLevels){
    var feesAttempts = document.getElementById('feesAttempts');
    var feesSpecWrap = document.getElementById('feesSpecWrap');
    var feesSpecs = document.getElementById('feesSpecs');
    var feesPlans = document.getElementById('feesPlans');
    var fmtINR = function(n){ return '₹' + n.toLocaleString('en-IN'); };
    var fmtUSD = function(n){ return '($' + Math.round(n / 90).toLocaleString('en-US') + ')'; };

    function pick(container, attr, value){
      container.querySelectorAll('button').forEach(function(x){
        x.setAttribute('aria-selected', x.dataset[attr] === value ? 'true' : 'false');
      });
    }
    function renderFeeAttempts(){
      var cfg = FEES[feesState.level];
      if (cfg.attempts.indexOf(feesState.attempt) === -1) feesState.attempt = cfg.attempts[0];
      feesAttempts.innerHTML = cfg.attempts.map(function(a){
        return '<button class="tab" aria-selected="' + (a === feesState.attempt) + '" data-attempt="' + a + '">' + a + '</button>';
      }).join('');
    }
    function renderFeeSpecs(){
      var cfg = FEES[feesState.level];
      if (cfg.specialisations){
        if (cfg.specialisations.indexOf(feesState.spec) === -1) feesState.spec = cfg.specialisations[0];
        feesSpecWrap.hidden = false;
        feesSpecs.innerHTML = cfg.specialisations.map(function(s){
          return '<button class="tab" aria-selected="' + (s === feesState.spec) + '" data-spec="' + s + '">' + s + '</button>';
        }).join('');
      } else {
        feesSpecWrap.hidden = true;
        feesSpecs.innerHTML = '';
        feesState.spec = null;
      }
    }
    function renderFeePlans(){
      var cfg = FEES[feesState.level];
      var prices = cfg.prices[feesState.attempt];
      feesPlans.className = 'fees-plans' + (cfg.plans.length === 3 ? ' three' : '');
      feesPlans.innerHTML = cfg.plans.map(function(key, i){
        var m = PLAN_META[key];
        var specs = planFeatures(key, feesState.level).map(function(f){ return '<li>' + f + '</li>'; }).join('');
        return '<div class="fee-card">' +
          '<p class="mode">' + m.mode + '</p>' +
          '<p class="name">' + m.name + '</p>' +
          '<p class="price">' + fmtINR(prices[i]) + '</p>' +
          '<p class="usd">' + fmtUSD(prices[i]) + '</p>' +
          '<p class="blurb">' + m.blurb + '</p>' +
          '<ul class="specs">' + specs + '</ul>' +
        '</div>';
      }).join('');
    }
    function renderFees(){
      renderFeeAttempts();
      renderFeeSpecs();
      renderFeePlans();
      buildThread();
    }
    feesLevels.addEventListener('click', function(e){
      var b = e.target.closest('button[data-level]');
      if (!b) return;
      feesState.level = b.dataset.level;
      pick(feesLevels, 'level', feesState.level);
      renderFees();
    });
    feesAttempts.addEventListener('click', function(e){
      var b = e.target.closest('button[data-attempt]');
      if (!b) return;
      feesState.attempt = b.dataset.attempt;
      pick(feesAttempts, 'attempt', feesState.attempt);
      renderFeePlans();
      buildThread();
    });
    feesSpecs.addEventListener('click', function(e){
      var b = e.target.closest('button[data-spec]');
      if (!b) return;
      feesState.spec = b.dataset.spec;
      pick(feesSpecs, 'spec', feesState.spec);
    });
    renderFees();
  }
  /* ================= cursor companion (coffee sketch) ================= */
  if (window.matchMedia('(pointer: fine)').matches && !reduced){
    var CUP_SRC = 'data:image/png;base64,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';
    var cup = document.createElement('img');
    cup.src = CUP_SRC;
    cup.id = 'cursorCup';
    cup.alt = '';
    cup.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cup);

    var tx = 0, ty = 0, cx = 0, cy = 0, tiltC = 0, cupRaf = null, cupShown = false;
    function cupStep(){
      /* silky glide: small lerp on position, tilt eased through its own spring */
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      var tiltTarget = Math.max(-9, Math.min(9, (tx - cx) * 0.055));
      tiltC += (tiltTarget - tiltC) * 0.08;
      cup.style.transform = 'translate(' + (cx + 30).toFixed(1) + 'px,' + (cy + 20).toFixed(1) + 'px) rotate(' + tiltC.toFixed(2) + 'deg)';
      if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3 || Math.abs(tiltTarget - tiltC) > 0.05){
        cupRaf = requestAnimationFrame(cupStep);
      } else {
        cupRaf = null;
      }
    }
    document.addEventListener('mousemove', function(e){
      tx = e.clientX; ty = e.clientY;
      if (!cupShown){ cx = tx; cy = ty; cupShown = true; cup.style.opacity = '.92'; }
      if (!cupRaf) cupRaf = requestAnimationFrame(cupStep);
    }, { passive: true });
    document.addEventListener('mouseleave', function(){ cup.style.opacity = '0'; });
    document.addEventListener('mouseenter', function(){ if (cupShown) cup.style.opacity = '.92'; });
  }

  }catch(err){
    /* if anything fails, show the page plainly rather than hide it */
    document.documentElement.classList.remove('js');
    document.documentElement.classList.remove('fx');
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }
})();
