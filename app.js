// ===== STORAGE =====
var DB = {
  get: function(k, d) {
    try { var v = localStorage.getItem('ls_' + k); return v !== null ? JSON.parse(v) : d; } catch(e) { return d; }
  },
  set: function(k, v) {
    try { localStorage.setItem('ls_' + k, JSON.stringify(v)); } catch(e) {}
  }
};

var uProgs = DB.get('programs', []);
var hist   = DB.get('history', []);
var prs    = DB.get('prs', {});
var aw = null, wt = null, wst = null, curPid = null, curPhi = 0;
var rtIv = null, rtTot = 120, rtRem = 120, rtRun = false, rtLast = 120;

function allProgs() {
  var del = DB.get('del_bi', []);
  var list = [];
  var builtins = [
    {id:'kinetiq-strong-builtin', prog:kinetiqStrongData},
    {id:'kinetiq-hypertrophy-builtin', prog:kinetiqHypertrophyData},
    {id:'kinetiq-balance-builtin', prog:kinetiqBalanceData},
    {id:'kinetiq-deload-builtin', prog:kinetiqDeloadData},
    {id:'kinetiq-mobility-builtin', prog:kinetiqMobilityData},
    {id:'kinetiq-hiit-builtin', prog:kinetiqHIITData},
    {id:'kinetiq-resilience-builtin', prog:kinetiqResilienceData}
  ];
  builtins.forEach(function(b){
    if (del.indexOf(b.id) === -1) list.push(b.prog);
  });
  return list.concat(uProgs);
}

// ===== ROUTING =====
function showView(id) {
  var views = document.querySelectorAll('.view');
  for (var i = 0; i < views.length; i++) views[i].classList.remove('active');
  var el = document.getElementById('view-' + id);
  if (el) el.classList.add('active');

  // mobile tabs
  var tabs = document.querySelectorAll('.tab');
  for (var j = 0; j < tabs.length; j++) {
    tabs[j].classList.toggle('active', tabs[j].getAttribute('data-view') === id);
  }
  // desktop nav
  var nds = document.querySelectorAll('.nd');
  for (var k = 0; k < nds.length; k++) {
    nds[k].classList.toggle('active', nds[k].getAttribute('data-view') === id);
  }

  window.scrollTo(0, 0);
  if (id === 'dashboard') rDash();
  if (id === 'programs')  rProgs();
  if (id === 'history')   rHist();
  if (id === 'progress')  rProg();
}

// wire up tab buttons and desktop nav
document.addEventListener('DOMContentLoaded', function() {
  var tabs = document.querySelectorAll('.tab');
  for (var i = 0; i < tabs.length; i++) {
    (function(btn) {
      btn.addEventListener('click', function() { showView(btn.getAttribute('data-view')); });
    })(tabs[i]);
  }
  var nds = document.querySelectorAll('.nd');
  for (var j = 0; j < nds.length; j++) {
    (function(btn) {
      btn.addEventListener('click', function() { showView(btn.getAttribute('data-view')); });
    })(nds[j]);
  }
  rDash();
  
  // Initialize nutrition tracking
  if (typeof initNutritionTracking !== 'undefined') {
    initNutritionTracking();
  }
});

// ===== DASHBOARD =====
function rDash() {
  var h = new Date().getHours();
  var g = document.getElementById('greet');
  if (g) g.textContent = (h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening') + ', athlete';

  document.getElementById('st').textContent = hist.length;
  var now = new Date(), ws = new Date(now);
  ws.setDate(now.getDate() - now.getDay()); ws.setHours(0,0,0,0);
  document.getElementById('sw').textContent = hist.filter(function(w) { return new Date(w.date) >= ws; }).length;
  var tv = hist.reduce(function(s, w) { return s + (w.volume || 0); }, 0);
  document.getElementById('sv').textContent = tv >= 1000 ? (tv/1000).toFixed(1) + 'k' : '' + tv;

  // Volume trend (compare this week vs last week)
  var lastWeekStart = new Date(ws);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  var thisWeekVol = hist.filter(function(w) { return new Date(w.date) >= ws; }).reduce(function(s, w) { return s + (w.volume || 0); }, 0);
  var lastWeekVol = hist.filter(function(w) { var d = new Date(w.date); return d >= lastWeekStart && d < ws; }).reduce(function(s, w) { return s + (w.volume || 0); }, 0);
  var volTrendEl = document.getElementById('vol-trend');
  if (volTrendEl) {
    if (thisWeekVol > lastWeekVol && lastWeekVol > 0) {
      volTrendEl.innerHTML = '<span class="trend-up">trending up</span>';
    } else if (thisWeekVol < lastWeekVol && thisWeekVol > 0) {
      volTrendEl.innerHTML = '<span class="trend-down">trending down</span>';
    } else {
      volTrendEl.textContent = 'lbs lifted';
    }
  }

  var streak = 0, tod = new Date(); tod.setHours(0,0,0,0);
  var srt = hist.slice().sort(function(a,b) { return new Date(b.date) - new Date(a.date); });
  if (srt.length) {
    var ld = new Date(srt[0].date); ld.setHours(0,0,0,0);
    if ((tod - ld) / 86400000 <= 1) {
      streak = 1; var pv = ld;
      for (var i = 1; i < srt.length; i++) {
        var dd = new Date(srt[i].date); dd.setHours(0,0,0,0);
        if (Math.round((pv - dd) / 86400000) === 1) { streak++; pv = dd; } else break;
      }
    }
  }
  document.getElementById('ss').textContent = streak;
  
  // Streak milestone indicator
  var streakStatusEl = document.getElementById('streak-status');
  if (streakStatusEl) {
    if (streak >= 30) {
      streakStatusEl.innerHTML = '<span class="streak-milestone">🔥 On fire!</span>';
    } else if (streak >= 14) {
      streakStatusEl.innerHTML = '<span class="streak-milestone">💪 Crushing it!</span>';
    } else if (streak >= 7) {
      streakStatusEl.innerHTML = '<span class="streak-milestone">⭐ Week streak!</span>';
    } else {
      streakStatusEl.textContent = 'days';
    }
  }

  // Current program progress (if user has active program from localStorage)
  var currentProg = localStorage.getItem('currentProgram');
  var currentWeek = parseInt(localStorage.getItem('currentWeek') || '1');
  var progressCard = document.getElementById('current-progress-card');
  if (currentProg && progressCard) {
    var prog = allProgs().find(function(p) { return p.id === currentProg; });
    if (prog && prog.phases && prog.phases.length) {
      var totalWeeks = prog.phases.reduce(function(sum, phase) { 
        return sum + (phase.weeks ? phase.weeks.length : 0); 
      }, 0);
      var progressPct = totalWeeks > 0 ? Math.round((currentWeek / totalWeeks) * 100) : 0;
      
      document.getElementById('prog-progress-name').textContent = prog.name;
      document.getElementById('prog-progress-pct').textContent = progressPct + '%';
      document.getElementById('prog-progress-fill').style.width = progressPct + '%';
      document.getElementById('prog-progress-sub').textContent = 'Week ' + currentWeek + ' of ' + totalWeeks;
      progressCard.style.display = 'block';
    } else {
      progressCard.style.display = 'none';
    }
  } else if (progressCard) {
    progressCard.style.display = 'none';
  }

  var rl = document.getElementById('d-recent');
  if (!hist.length) {
    rl.innerHTML = '<div class="empty"><div class="eico">&#127947;</div><div class="esub">No workouts yet. Start a program below.</div></div>';
  } else {
    rl.innerHTML = hist.slice().sort(function(a,b){ return new Date(b.date)-new Date(a.date); }).slice(0,5).map(function(w) {
      return '<button class="row-item" onclick="showView(\'history\')">'
        + '<div><div class="row-name">' + esc(w.name) + '</div>'
        + '<div class="row-meta">' + (w.exercises && w.exercises.length || 0) + ' exercises &middot; ' + fv(w.volume) + ' lbs</div></div>'
        + '<div style="text-align:right;flex-shrink:0"><div style="font-size:11px;color:var(--t3)">' + fd(w.date) + '</div>'
        + '<div style="font-size:11px;color:var(--t2)">' + fdur(w.duration) + '</div></div>'
        + '</button>';
    }).join('');
  }

  var pl = document.getElementById('d-progs');
  var pg = allProgs();
  var dashQ = (document.getElementById('dash-search') && document.getElementById('dash-search').value || '').toLowerCase().trim();
  if (dashQ) pg = pg.filter(function(p){ return p.name.toLowerCase().indexOf(dashQ) !== -1 || (p.description || '').toLowerCase().indexOf(dashQ) !== -1; });
  if (!pg.length) {
    pl.innerHTML = '<div class="empty"><div class="esub">' + (dashQ ? 'No programs match "' + esc(dashQ) + '"' : 'No programs yet') + '</div></div>';
  } else {
    pl.innerHTML = pg.map(function(p) {
      var phaseStr = p.type === 'corrective' ? 'Corrective' : ((p.phases && p.phases.length || 0) + ' phases');
      return '<button class="row-item" onclick="openProg(\'' + p.id + '\')">'
        + '<div><div class="row-name">' + esc(p.name) + '</div>'
        + '<div class="row-meta">' + phaseStr + ' &middot; ' + (p.duration || '') + '</div></div>'
        + '<span class="chip cy">' + (p.difficulty || 'Int') + '</span>'
        + '</button>';
    }).join('');
  }
}

// ===== PROGRAMS LIST =====
function rProgs() {
  var pl = document.getElementById('prog-list');
  var pg = allProgs();
  var q = (document.getElementById('prog-search') && document.getElementById('prog-search').value || '').toLowerCase().trim();
  if (q) pg = pg.filter(function(p){ return p.name.toLowerCase().indexOf(q) !== -1 || (p.description || '').toLowerCase().indexOf(q) !== -1; });
  var empty = document.getElementById('prog-empty');
  empty.style.display = pg.length ? 'none' : 'flex';
  empty.querySelector && (empty.querySelector('.esub') || {}).textContent && (empty.querySelector('.esub').textContent = q ? 'No programs match "' + q + '"' : 'Upload a PDF or create a program manually');
  if (!pg.length) { pl.innerHTML = ''; return; }
  pl.innerHTML = pg.map(function(p) {
    var pc = p.phases && p.phases.length || 0;
    var dots = '';
    for (var i = 0; i < Math.max(pc, 4); i++) dots += '<span class="pdot' + (i < pc ? ' on' : '') + '"></span>';
    var ban = p.source === 'builtin' ? 'bm' : p.source === 'ai' ? 'bai' : 'bdef';
    
    // Add program-specific color class
    var progClass = '';
    if (p.name.includes('Strong')) progClass = ' prog-strong';
    else if (p.name.includes('Hypertrophy')) progClass = ' prog-hypertrophy';
    else if (p.name.includes('Balance')) progClass = ' prog-balance';
    else if (p.name.includes('Deload')) progClass = ' prog-deload';
    else if (p.name.includes('Mobility')) progClass = ' prog-mobility';
    else if (p.name.includes('HIIT')) progClass = ' prog-hiit';
    else if (p.name.includes('Resilience')) progClass = ' prog-resilience';
    
    // Category badge (Core Cycle vs Standalone)
    var categoryBadge = '';
    var isCoreProgram = p.name.includes('Strong') || p.name.includes('Hypertrophy') || p.name.includes('Balance') || p.name.includes('Deload');
    if (isCoreProgram) {
      categoryBadge = '<span class="prog-category core-cycle">🔄 Core Cycle</span>';
    } else {
      categoryBadge = '<span class="prog-category standalone">⭐ Standalone</span>';
    }
    
    var typeTag = p.type === 'corrective' ? '<span class="chip" style="background:rgba(125,200,255,.15);color:#7dc8ff;border:1px solid rgba(125,200,255,.25)">&#10039; Corrective</span>' : '';
    return '<button class="prog-card' + progClass + '" onclick="openProg(\'' + p.id + '\')">'
      + '<span class="prog-banner ' + ban + '"></span>'
      + '<div class="prog-body">'
      + '<div class="prog-title-row">' + categoryBadge + '</div>'
      + '<div class="prog-title">' + esc(p.name) + '</div>'
      + '<div class="prog-desc">' + esc(p.description || '') + '</div>'
      + '<div class="prog-tags">'
      + (p.difficulty ? '<span class="prog-tag">' + esc(p.difficulty) + '</span>' : '')
      + (p.duration ? '<span class="prog-tag">' + esc(p.duration) + '</span>' : '')
      + (pc ? '<span class="prog-tag">' + pc + ' Phase' + (pc > 1 ? 's' : '') + '</span>' : '')
      + typeTag
      + (p.source === 'builtin' ? '<span class="chip cg">&#10003; Built-in</span>' : '')
      + (p.source === 'ai' ? '<span class="chip cb">AI Import</span>' : '')
      + '</div></div>'
      + '<div class="prog-foot"><div class="pdots">' + dots + '</div><span class="prog-arrow">View &rarr;</span></div>'
      + '</button>';
  }).join('');
}

// ===== PROGRAM DETAIL =====
function openProg(id) {
  curPid = id;
  var p = allProgs().filter(function(x){ return x.id === id; })[0];
  if (!p) return;
  document.getElementById('pd-title').textContent = p.name;
  document.getElementById('pd-desc').textContent = p.description || '';
  document.getElementById('pd-bc').textContent = p.name;
  if (p.type === 'corrective') {
    document.getElementById('phase-scroll').innerHTML = '';
    document.getElementById('pd-body').innerHTML = renderCorrective(p);
    showView('program-detail');
    return;
  }
  var nav = document.getElementById('phase-scroll');
  nav.innerHTML = (p.phases || []).map(function(ph, i) {
    return '<button class="ptab' + (i === 0 ? ' active' : '') + '" onclick="selPh(' + i + ')">' + esc(ph.name) + '</button>';
  }).join('');
  
  // Add mouse wheel scroll support for phase navigation
  nav.addEventListener('wheel', function(e) {
    if (e.deltaY !== 0) {
      e.preventDefault();
      nav.scrollLeft += e.deltaY;
    }
  }, { passive: false });
  
  curPhi = 0;
  renderPh(p, 0);
  showView('program-detail');
}

function selPh(i) {
  curPhi = i;
  var tabs = document.querySelectorAll('.ptab');
  for (var j = 0; j < tabs.length; j++) tabs[j].classList.toggle('active', j === i);
  var p = allProgs().filter(function(x){ return x.id === curPid; })[0];
  if (p) renderPh(p, i);
}

function renderPh(p, pi) {
  var ph = p.phases && p.phases[pi];
  var body = document.getElementById('pd-body');
  if (!ph) { body.innerHTML = '<div class="empty"><div class="esub">No data</div></div>'; return; }
  var html = '';
  if (ph.objective || ph.length) {
    html += '<div class="phase-info">';
    if (ph.objective) html += '<div><div class="pi-l">Objective</div><div class="pi-v">' + esc(ph.objective) + '</div></div>';
    if (ph.length)    html += '<div><div class="pi-l">Length</div><div class="pi-v">' + esc(ph.length) + '</div></div>';
    if (ph.sets)      html += '<div><div class="pi-l">Volume</div><div class="pi-v">' + esc(ph.sets) + ' x ' + esc(ph.reps || '—') + '</div></div>';
    if (ph.rest)      html += '<div><div class="pi-l">Rest</div><div class="pi-v">' + esc(ph.rest) + '</div></div>';
    if (ph.frequency) html += '<div><div class="pi-l">Schedule</div><div class="pi-v">' + esc(ph.frequency) + '</div></div>';
    html += '</div>';
  }
  (ph.weeks || []).forEach(function(w, wi) {
    html += '<div class="week-block">'
      + '<button class="week-hd" onclick="togW(this)">'
      + '<span class="week-title">' + esc(w.name || 'Week ' + (wi+1)) + '</span>'
      + '<span style="display:flex;align-items:center;gap:8px">'
      + '<span class="week-badge">' + (w.days && w.days.length || 0) + ' days</span>'
      + '<span class="week-arr">&#9660;</span>'
      + '</span></button>'
      + '<div class="week-body" style="display:none">';
    (w.days || []).forEach(function(d, di) { html += renderDay(d, di, p.id, pi, wi); });
    html += '</div></div>';
  });
  body.innerHTML = html;
}

function renderDay(day, di, pid, phi, wi) {
  var ec = day.exercises && day.exercises.length || 0;
  var tc = day.type === 'mobility' ? 'var(--acc3)' : day.type === 'trigger' ? 'var(--acc2)' : day.type === 'focus' ? 'var(--ok)' : 'var(--acc)';
  var tl = {workout:'Workout',mobility:'Mobility',trigger:'Trigger',focus:'Focus'}[day.type] || 'Workout';
  var html = '<div class="day-card">'
    + '<div class="day-hd" onclick="togD(this)">'
    + '<div style="flex:1;min-width:0">'
    + '<div style="display:flex;align-items:center;gap:7px">'
    + '<span class="day-dot" style="background-color:' + tc + '"></span>'
    + '<span class="day-name-txt">' + esc(day.name) + '</span>'
    + '</div>'
    + '<div class="day-meta">' + ec + ' exercise' + (ec !== 1 ? 's' : '') + ' &middot; <span style="color:' + tc + '">' + tl + '</span>' + (day.focus ? ' &middot; ' + esc(day.focus) : '') + '</div>'
    + '</div>'
    + '<div style="display:flex;align-items:center;gap:6px;flex-shrink:0;margin-left:8px">'
    + '<button class="btn-p btn-xs" onclick="event.stopPropagation();startPW(\'' + pid + '\',' + phi + ',' + wi + ',' + di + ')">Start</button>'
    + '<span class="day-arr" style="color:var(--t3);font-size:11px">&#9660;</span>'
    + '</div></div>'
    + '<div class="day-body" style="display:none">';
  if (day.isFocus) {
    html += '<div class="focus-box"><div class="focus-lbl">&#127919; Choose Your Weak Point &mdash; 2-3 exercises x 15 reps</div><div class="focus-grid">';
    (day.focusCats || []).forEach(function(c) {
      html += '<div><div class="fc-n">' + esc(c.name) + '</div><div class="fc-i">' + esc(c.items) + '</div></div>';
    });
    html += '</div></div>';
  } else {
    (day.exercises || []).forEach(function(e) { html += renderER(e); });
  }
  html += '</div></div>';
  return html;
}

function renderER(e) {
  if (e.notes === 'separator') return '<div class="sep-row">' + esc(e.name) + '</div>';
  return '<div class="ex-row">'
    + '<div style="flex:1;min-width:0"><div class="ex-name">' + esc(e.name) + '</div>'
    + (e.notes && e.notes !== 'separator' ? '<div class="ex-note">' + esc(e.notes) + '</div>' : '')
    + '</div>'
    + '<div class="ex-badges"><span class="badge-s">' + esc(e.sets || '—') + 'x</span><span class="badge-r">' + esc(e.reps || '—') + '</span></div>'
    + '</div>';
}

// ===== CORRECTIVE PROGRAM RENDERING =====

// Storage keys for compass results
function cpKey(progId) { return 'compass_' + progId; }

function getCompassResults(progId) {
  return DB.get(cpKey(progId), {});
}
function setCompassResult(progId, zoneId, val) {
  var r = getCompassResults(progId);
  r[zoneId] = val; // 'pass', 'fail', or null
  DB.set(cpKey(progId), r);
}

function renderCorrective(p) {
  var c = p.corrective;
  if (!c) return '<div class="empty"><div class="esub">No corrective data</div></div>';
  if (c.program === 'prime') return renderPrime(p);
  if (c.program === 'prime-pro') return renderPrimePro(p);
  return '<div class="empty"><div class="esub">Unknown corrective type</div></div>';
}

// ---- MAPS PRIME ----
function renderPrime(p) {
  var c = p.corrective;
  var results = getCompassResults(p.id);
  var html = '<div class="corr-wrap">';

  // HOW TO USE banner
  html += '<div class="corr-banner">'
    + '<div class="corr-banner-title">&#127919; How This Program Works</div>'
    + '<div class="corr-banner-body">MAPS Prime is a movement prep program, not a workout. Each time you train: (1) do your <strong>Pre-Primer</strong> before your workout, (2) use <strong>Ignition Exercises</strong> before each major lift, and (3) do your <strong>Post-Primer</strong> after. On off days, add <strong>Fortification Sessions</strong> for any zones you failed. Start by taking the Compass Test below.</div>'
    + '</div>';

  // STEP 1: COMPASS TEST
  html += '<div class="corr-section">';
  html += '<div class="corr-sec-hd"><span class="corr-step">Step 1</span><span class="corr-sec-title">Compass Test — Pass/Fail Each Zone</span></div>';
  html += '<div class="corr-sec-body">';
  html += '<p class="corr-note">Watch the Zone Test coaching videos in your MAPS Prime portal before testing. Mark each zone Pass or Fail.</p>';

  c.compassZones.forEach(function(z) {
    var res = results[z.id] || null;
    html += '<div class="zone-card" id="zc-' + p.id + '-' + z.id + '">'
      + '<div class="zone-top">'
      + '<div class="zone-num">Zone ' + z.num + '</div>'
      + '<div class="zone-info"><div class="zone-name">' + esc(z.name) + '</div><div class="zone-area">' + esc(z.area) + '</div></div>'
      + '<div class="zone-pf">'
      + '<button class="pf-btn pf-pass' + (res === 'pass' ? ' active' : '') + '" onclick="setZone(\'' + p.id + '\',\'' + z.id + '\',\'pass\')">PASS</button>'
      + '<button class="pf-btn pf-fail' + (res === 'fail' ? ' active' : '') + '" onclick="setZone(\'' + p.id + '\',\'' + z.id + '\',\'fail\')">FAIL</button>'
      + '</div></div>'
      + '<div class="zone-detail">'
      + '<div class="zone-kp"><strong>Key Points:</strong> ' + esc(z.keyPoints) + '</div>'
      + (res === 'pass' ? '<div class="zone-result pass-result">&#10003; ' + esc(z.passDesc) + '</div>' : '')
      + (res === 'fail' ? '<div class="zone-result fail-result">&#9888; ' + esc(z.failDesc) + '</div>' : '')
      + '</div>'
      + '</div>';
  });
  html += '</div></div>';

  // STEP 2: PRE-PRIMER
  html += '<div class="corr-section">';
  html += '<div class="corr-sec-hd"><span class="corr-step">Step 2</span><span class="corr-sec-title">Pre-Primer Session <span class="corr-timing">8–15 min · Before your workout</span></span></div>';
  html += '<div class="corr-sec-body">';

  var anyResult = Object.keys(results).length > 0;
  if (!anyResult) {
    html += '<p class="corr-note corr-muted">Complete the Compass Test above to see your personalized Pre-Primer movements.</p>';
  } else {
    html += '<p class="corr-note">Perform 1–3 movements per zone. If you <strong>passed</strong> a zone: 1 movement. If you <strong>failed</strong>: 1–3 movements. Max 6 movements total. Spend 1–3 min each at low-to-moderate intensity.</p>';

    // Suggested sessions based on failures
    var failedZones = c.compassZones.filter(function(z){ return results[z.id] === 'fail'; });
    var passedZones = c.compassZones.filter(function(z){ return results[z.id] === 'pass'; });

    if (failedZones.length > 0) {
      html += '<div class="corr-subsec-lbl">&#128204; Suggested Sessions for Your Failed Zones</div>';
      failedZones.forEach(function(z) {
        var sugg = c.prePrimerSuggested['z' + z.num];
        if (!sugg) return;
        html += '<div class="prime-session-block">'
          + '<div class="prime-session-zone">Zone ' + z.num + ' — ' + esc(z.name) + '</div>';
        sugg.forEach(function(wk) {
          html += '<div class="prime-workout-row">'
            + '<span class="prime-wk-lbl">' + esc(wk.workout) + ':</span> '
            + wk.moves.map(function(m){ return '<span class="prime-move">' + esc(m) + '</span>'; }).join('');
          html += '</div>';
        });
        html += '</div>';
      });
    }

    if (passedZones.length > 0) {
      html += '<div class="corr-subsec-lbl" style="margin-top:12px">&#10003; Passed Zones — Pick 1 movement each</div>';
      passedZones.forEach(function(z) {
        var moves = c.prePrimerMovements['z' + z.num] || [];
        html += '<div class="prime-session-block">'
          + '<div class="prime-session-zone">Zone ' + z.num + ' — ' + esc(z.name) + '</div>'
          + '<div class="prime-move-grid">'
          + moves.map(function(m){ return '<span class="prime-move">' + esc(m) + '</span>'; }).join('')
          + '</div></div>';
      });
    }
  }
  html += '</div></div>';

  // STEP 3: IGNITION EXERCISES
  var allPass = c.compassZones.every(function(z){ return results[z.id] === 'pass'; });
  html += '<div class="corr-section">';
  html += '<div class="corr-sec-hd"><span class="corr-step">Step 3</span><span class="corr-sec-title">Ignition Exercises <span class="corr-timing">Before major lifts · Requires all 3 zones passed</span></span></div>';
  html += '<div class="corr-sec-body">';
  if (!anyResult) {
    html += '<p class="corr-note corr-muted">Complete the Compass Test to unlock Ignition Exercises.</p>';
  } else if (!allPass) {
    html += '<div class="corr-warning">&#9888; <strong>Not yet unlocked.</strong> Ignition Exercises require passing all 3 Compass Tests. Continue Pre-Primer and Fortification work until you pass all zones.</div>';
  } else {
    html += '<p class="corr-note">Perform 1–3 explosive reps before each major lift. Ramp up explosiveness each rep — do not max exert immediately. You are priming, not fatiguing.</p>';
    html += '<div class="ignition-grid">';
    c.ignitionExercises.forEach(function(ex) {
      html += '<div class="ignition-card">'
        + '<div class="ignition-name">' + esc(ex.name) + '</div>'
        + '<div class="ignition-when">' + esc(ex.when) + '</div>'
        + '</div>';
    });
    html += '</div>';
  }
  html += '</div></div>';

  // STEP 4: POST-PRIMER
  html += '<div class="corr-section">';
  html += '<div class="corr-sec-hd"><span class="corr-step">Step 4</span><span class="corr-sec-title">Post-Primer Session <span class="corr-timing">8–15 min · After your workout</span></span></div>';
  html += '<div class="corr-sec-body">';
  if (!anyResult) {
    html += '<p class="corr-note corr-muted">Complete the Compass Test above to see your Post-Primer movements.</p>';
  } else {
    html += '<p class="corr-note"><strong>Everyone:</strong> 1–3 Tension Poses total (not zone-specific). <strong>Failed zones:</strong> add 1–3 Foam Rolling and/or Static Stretches per failed zone (max 4 total). Hold Tension Poses 10–20 sec for 1–3 reps. Hold Foam Rolling / Static Stretches 20+ sec.</p>';

    // Tension poses - everyone
    html += '<div class="corr-subsec-lbl">Tension Poses (Everyone — 1–3 total)</div>';
    html += '<div class="prime-move-grid">';
    c.postPrimerMovements.tensionPoses.forEach(function(m){
      html += '<span class="prime-move">' + esc(m) + '</span>';
    });
    html += '</div>';

    // Foam rolling & static by zone
    var failedZ = c.compassZones.filter(function(z){ return results[z.id] === 'fail'; });
    if (failedZ.length > 0) {
      failedZ.forEach(function(z) {
        var zk = 'z' + z.num;
        var fr = c.postPrimerMovements.foamRolling[zk] || [];
        var ss = c.postPrimerMovements.staticStretching[zk] || [];
        html += '<div class="prime-session-block" style="margin-top:10px">'
          + '<div class="prime-session-zone">Zone ' + z.num + ' — ' + esc(z.name) + ' (Failed)</div>';
        if (fr.length) {
          html += '<div class="corr-subsec-lbl" style="margin:6px 0 4px">Foam Rolling</div>'
            + '<div class="prime-move-grid">' + fr.map(function(m){ return '<span class="prime-move">' + esc(m) + '</span>'; }).join('') + '</div>';
        }
        if (ss.length) {
          html += '<div class="corr-subsec-lbl" style="margin:6px 0 4px">Static Stretching</div>'
            + '<div class="prime-move-grid">' + ss.map(function(m){ return '<span class="prime-move">' + esc(m) + '</span>'; }).join('') + '</div>';
        }
        html += '</div>';
      });
    }
  }
  html += '</div></div>';

  // STEP 5: FORTIFICATION SESSIONS
  html += '<div class="corr-section">';
  html += '<div class="corr-sec-hd"><span class="corr-step">Step 5</span><span class="corr-sec-title">Fortification Sessions <span class="corr-timing">Off days · 1–3 sets · 8–12 reps</span></span></div>';
  html += '<div class="corr-sec-body">';
  if (!anyResult) {
    html += '<p class="corr-note corr-muted">Complete the Compass Test to see your Fortification Sessions.</p>';
  } else {
    var failedFort = c.compassZones.filter(function(z){ return results[z.id] === 'fail'; });
    if (failedFort.length === 0) {
      html += '<div class="corr-success">&#127881; You passed all zones! No Fortification Sessions needed. Keep checking in with the Compass Test periodically.</div>';
    } else {
      html += '<p class="corr-note">Add one Fortification Session per failed zone on your non-training days. Work only one zone per day. Form is paramount — go as light as needed. Once you pass a zone\'s Compass Test, drop that Fortification Session.</p>';
      failedFort.forEach(function(z) {
        var fs = c.fortificationSessions['z' + z.num];
        if (!fs) return;
        html += '<div class="fort-block">'
          + '<div class="fort-title">' + esc(fs.name) + '</div>'
          + '<div class="fort-spec">1–3 sets · 8–12 reps · 30–60 sec rest</div>';
        fs.exercises.forEach(function(ex) {
          html += renderER(ex);
        });
        html += '</div>';
      });
    }
  }
  html += '</div></div>';

  html += '</div>'; // corr-wrap
  return html;
}

// ---- MAPS PRIME PRO ----
function renderPrimePro(p) {
  var c = p.corrective;
  var results = getCompassResults(p.id);
  var html = '<div class="corr-wrap">';

  html += '<div class="corr-banner">'
    + '<div class="corr-banner-title">&#127919; How This Program Works</div>'
    + '<div class="corr-banner-body">MAPS Prime Pro targets 7 specific zones. For each zone you fail: do <strong>1 Repatterning Movement + 1 Tension Control Movement + 1 Active Control Movement</strong> per session. Sessions are <strong>1–10 minutes</strong> and should be done <strong>at least twice daily</strong> — frequency is the key to repatterning. Start with the Compass Test below.</div>'
    + '</div>';

  // COMPASS TEST
  html += '<div class="corr-section">';
  html += '<div class="corr-sec-hd"><span class="corr-step">Step 1</span><span class="corr-sec-title">Prime Pro Compass Test — 8 Tests, 7 Zones</span></div>';
  html += '<div class="corr-sec-body">';
  html += '<p class="corr-note">Watch all 8 coaching videos in your MAPS Prime Pro portal before testing. Mark each test Pass or Fail.</p>';

  c.compassZones.forEach(function(z) {
    var res = results[z.id] || null;
    html += '<div class="zone-card" id="zc-' + p.id + '-' + z.id + '">'
      + '<div class="zone-top">'
      + '<div class="zone-num">Zone ' + z.num + '</div>'
      + '<div class="zone-info"><div class="zone-name">' + esc(z.name) + '</div><div class="zone-area">' + esc(z.area) + '</div></div>'
      + '<div class="zone-pf">'
      + '<button class="pf-btn pf-pass' + (res === 'pass' ? ' active' : '') + '" onclick="setZone(\'' + p.id + '\',\'' + z.id + '\',\'pass\')">PASS</button>'
      + '<button class="pf-btn pf-fail' + (res === 'fail' ? ' active' : '') + '" onclick="setZone(\'' + p.id + '\',\'' + z.id + '\',\'fail\')">FAIL</button>'
      + '</div></div>'
      + '<div class="zone-detail">'
      + '<div class="zone-kp"><strong>Key Points:</strong> ' + esc(z.keyPoints) + '</div>'
      + (z.disclaimer ? '<div class="zone-disclaimer">&#9432; ' + esc(z.disclaimer) + '</div>' : '')
      + (res === 'pass' ? '<div class="zone-result pass-result">&#10003; ' + esc(z.passDesc) + '</div>' : '')
      + (res === 'fail' ? '<div class="zone-result fail-result">&#9888; ' + esc(z.failDesc) + '</div>' : '')
      + '</div>'
      + '</div>';
  });
  html += '</div></div>';

  // SESSION DESIGN
  html += '<div class="corr-section">';
  html += '<div class="corr-sec-hd"><span class="corr-step">Step 2</span><span class="corr-sec-title">Build Your Daily Sessions</span></div>';
  html += '<div class="corr-sec-body">';

  var anyResult = Object.keys(results).length > 0;
  if (!anyResult) {
    html += '<p class="corr-note corr-muted">Complete the Compass Test above to see your personalized session design.</p>';
  } else {
    var failedZones = c.compassZones.filter(function(z){ return results[z.id] === 'fail'; });
    if (failedZones.length === 0) {
      html += '<div class="corr-success">&#127881; Congratulations — you passed all 7 zones! Retest periodically to maintain your movement quality.</div>';
    } else {
      html += '<p class="corr-note">For each failed zone, perform <strong>1 Repatterning Movement + 1 Tension Control + 1 Active Control</strong>. Do this at least twice daily. Sessions should be 1–10 minutes. Focus on the most difficult movements first.</p>';

      failedZones.forEach(function(z) {
        var rp = c.repatterningMovements[z.id] || [];
        var cm = c.controlMovements[z.id] || {tension:[], active:[]};

        html += '<div class="pro-zone-block">'
          + '<div class="pro-zone-hd">Zone ' + z.num + ' — ' + esc(z.name) + ' <span class="pro-zone-area">(' + esc(z.area) + ')</span></div>'
          + '<div class="pro-zone-body">';

        // Repatterning
        html += '<div class="pro-move-group">'
          + '<div class="pro-move-type repat-type">&#128260; Repatterning Movement</div>'
          + '<div class="pro-move-type-sub">Choose 1 — practice the test movement pattern</div>';
        rp.forEach(function(m) {
          html += '<div class="pro-move-row"><span class="pro-move-name">' + esc(m.name) + '</span><span class="pro-move-reps">' + esc(m.reps) + '</span></div>';
        });
        html += '</div>';

        // Tension Control
        html += '<div class="pro-move-group">'
          + '<div class="pro-move-type tension-type">&#128247; Tension Control Movement</div>'
          + '<div class="pro-move-type-sub">Choose 1 — build strength in new ranges (hold 10–15 sec, 2–4 reps)</div>';
        cm.tension.forEach(function(m) {
          html += '<div class="pro-move-row"><span class="pro-move-name">' + esc(m) + '</span></div>';
        });
        html += '</div>';

        // Active Control
        html += '<div class="pro-move-group">'
          + '<div class="pro-move-type active-type">&#9654; Active Control Movement</div>'
          + '<div class="pro-move-type-sub">Choose 1 — increase range of motion (8–10 reps, slow & controlled)</div>';
        cm.active.forEach(function(m) {
          html += '<div class="pro-move-row"><span class="pro-move-name">' + esc(m) + '</span></div>';
        });
        html += '</div>';

        html += '</div></div>';
      });
    }
  }
  html += '</div></div>';

  html += '</div>'; // corr-wrap
  return html;
}

function setZone(progId, zoneId, val) {
  var results = getCompassResults(progId);
  // toggle off if clicking the same value
  var current = results[zoneId];
  var newVal = (current === val) ? null : val;
  setCompassResult(progId, zoneId, newVal);
  // re-render
  var p = allProgs().filter(function(x){ return x.id === progId; })[0];
  if (p) document.getElementById('pd-body').innerHTML = renderCorrective(p);
  // scroll to keep position roughly the same
  var zc = document.getElementById('zc-' + progId + '-' + zoneId);
  if (zc) zc.scrollIntoView({block:'nearest'});
}

function togW(el) {
  var b = el.nextElementSibling;
  var isOpen = b.style.display !== 'none';
  b.style.display = isOpen ? 'none' : 'flex';
  var arr = el.querySelector('.week-arr');
  if (arr) arr.innerHTML = isOpen ? '&#9660;' : '&#9650;';
}
function togD(el) {
  var card = el.parentElement;
  var b = card && card.querySelector('.day-body');
  if (!b) return;
  var isOpen = b.style.display !== 'none';
  b.style.display = isOpen ? 'none' : 'flex';
  var arr = el.querySelector('.day-arr');
  if (arr) arr.innerHTML = isOpen ? '&#9660;' : '&#9650;';
}

function delProg() {
  if (!curPid || !confirm('Delete this program? This cannot be undone.')) return;
  if (curPid.endsWith('-builtin')) {
    var d = DB.get('del_bi', []); d.push(curPid); DB.set('del_bi', d);
  } else {
    uProgs = uProgs.filter(function(p){ return p.id !== curPid; });
    DB.set('programs', uProgs);
  }
  showView('programs');
}

// ===== ACTIVE WORKOUT =====
function startPW(pid, phi, wi, di) {
  var p = allProgs().filter(function(x){ return x.id === pid; })[0];
  if (!p) return;
  var wk = p.phases && p.phases[phi] && p.phases[phi].weeks && p.phases[phi].weeks[wi];
  var day = wk && wk.days && wk.days[di];
  if (!day) return;
  var exercises = (day.exercises || []).filter(function(e) {
    return e.notes !== 'separator' && e.name.indexOf('—') !== 0;
  }).map(function(e) {
    var s = Math.max(parseInt(e.sets) || 2, 1);
    return {
      id: uid(), name: e.name, tS: s, tR: e.reps || '—', tW: e.weight || '', notes: e.notes || '',
      sets: Array.from({length: s}, function(_, i) { return {num: i+1, w: '', r: '', done: false}; })
    };
  });
  launch({name: day.name, meta: p.name + ' · ' + p.phases[phi].name, exercises: exercises});
}

function startQL() {
  var name = document.getElementById('ql-name').value.trim() || 'Quick Workout';
  var rows = document.querySelectorAll('.erb-row');
  var exercises = [];
  rows.forEach(function(r) {
    var n = r.querySelector('.en').value.trim(); if (!n) return;
    var s = Math.max(parseInt(r.querySelector('.es').value) || 3, 1);
    var rv = r.querySelector('.er').value || '10';
    exercises.push({
      id: uid(), name: n, tS: s, tR: rv, tW: '', notes: '',
      sets: Array.from({length: s}, function(_, i) { return {num: i+1, w: '', r: rv, done: false}; })
    });
  });
  if (!exercises.length) { alert('Add at least one exercise'); return; }
  closeM('ql-modal');
  launch({name: name, meta: '', exercises: exercises});
}

function launch(data) {
  aw = data; wst = Date.now(); rtLast = 120;
  document.getElementById('aw-name').textContent = data.name;
  document.getElementById('aw-meta').textContent = data.meta;
  renderAW();
  showView('active-workout');
  startWT();
  var pill = document.getElementById('pill');
  pill.classList.add('show');
}

function renderAW() {
  var body = document.getElementById('aw-body');
  if (!aw) return;
  body.innerHTML = aw.exercises.map(function(e) {
    var dn = e.sets.filter(function(s){ return s.done; }).length;
    var pct = e.sets.length ? Math.round(dn / e.sets.length * 100) : 0;
    var clr = dn === e.sets.length ? 'var(--ok)' : 'var(--t2)';
    var rows = e.sets.map(function(s, si) {
      var pv = getPrev(e.name, si);
      return '<tr id="sr-' + e.id + '-' + si + '" class="' + (s.done ? 'done-row' : '') + '">'
        + '<td style="font-weight:700;font-family:monospace;color:var(--t1)">' + s.num + '</td>'
        + '<td style="color:var(--t3);font-family:monospace;font-size:12px">' + pv + '</td>'
        + '<td><input class="set-inp" type="number" inputmode="decimal" placeholder="lbs" value="' + esc(s.w) + '" onchange="us(\'' + e.id + '\',' + si + ',\'w\',this.value)"></td>'
        + '<td><input class="set-inp" type="number" inputmode="numeric" placeholder="reps" value="' + esc(s.r) + '" onchange="us(\'' + e.id + '\',' + si + ',\'r\',this.value)"></td>'
        + '<td><button class="done-btn ' + (s.done ? 'done' : '') + '" onclick="cs(\'' + e.id + '\',' + si + ')">' + (s.done ? '&#10003;' : 'Done') + '</button></td>'
        + '</tr>';
    }).join('');
    return '<div class="aex-card" id="aex-' + e.id + '">'
      + '<div class="aex-hd">'
      + '<div style="flex:1;min-width:0">'
      + '<div class="aex-name">' + esc(e.name) + '</div>'
      + '<div class="aex-tgt">Target: ' + e.tS + ' x ' + esc(e.tR) + (e.tW ? ' @ ' + esc(e.tW) : '') + '</div>'
      + (e.notes ? '<div class="aex-note">&#128221; ' + esc(e.notes) + '</div>' : '')
      + '</div>'
      + '<div style="text-align:right;flex-shrink:0">'
      + '<div class="aex-ctr" id="ac-' + e.id + '" style="color:' + clr + '">' + dn + '/' + e.sets.length + '</div>'
      + '<div class="ex-pbar"><div class="ex-pfill" id="ap-' + e.id + '" style="width:' + pct + '%"></div></div>'
      + '</div></div>'
      + '<div class="st-scroll"><table class="st"><thead><tr><th>#</th><th>Prev</th><th>Weight</th><th>Reps</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div>'
      + '<button class="add-set-btn" onclick="addS(\'' + e.id + '\')">+ Add Set</button>'
      + '</div>';
  }).join('');
  updWP();
}

function us(eid, si, f, v) {
  var e = aw && aw.exercises.filter(function(x){ return x.id === eid; })[0];
  if (e && e.sets[si]) e.sets[si][f] = v;
}

function cs(eid, si) {
  var e = aw && aw.exercises.filter(function(x){ return x.id === eid; })[0];
  if (!e) return;
  var s = e.sets[si]; s.done = !s.done;
  var row = document.getElementById('sr-' + eid + '-' + si);
  if (row) {
    row.classList.toggle('done-row', s.done);
    var b = row.querySelector('.done-btn');
    if (b) { b.classList.toggle('done', s.done); b.innerHTML = s.done ? '&#10003;' : 'Done'; }
  }
  var dn = e.sets.filter(function(x){ return x.done; }).length;
  var fill = document.getElementById('ap-' + eid);
  if (fill) fill.style.width = (e.sets.length ? Math.round(dn / e.sets.length * 100) : 0) + '%';
  var ctr = document.getElementById('ac-' + eid);
  if (ctr) { ctr.textContent = dn + '/' + e.sets.length; ctr.style.color = dn === e.sets.length ? 'var(--ok)' : 'var(--t2)'; }
  updWP();
  if (s.done) showRT();
}

function addS(eid) {
  var e = aw && aw.exercises.filter(function(x){ return x.id === eid; })[0];
  if (!e) return;
  var l = e.sets[e.sets.length - 1] || {};
  e.sets.push({num: e.sets.length + 1, w: l.w || '', r: l.r || '', done: false});
  renderAW();
}

function updWP() {
  if (!aw) return;
  var dn = 0, tot = 0;
  aw.exercises.forEach(function(e) {
    dn += e.sets.filter(function(s){ return s.done; }).length;
    tot += e.sets.length;
  });
  document.getElementById('aw-prog').textContent = dn + ' / ' + tot + ' sets done';
}

function getPrev(name, si) {
  for (var i = hist.length - 1; i >= 0; i--) {
    var w = hist[i];
    var e = w.exercises && w.exercises.filter(function(x){ return x.name.toLowerCase() === name.toLowerCase(); })[0];
    if (e && e.sets && e.sets[si]) {
      var s = e.sets[si];
      return s.weight ? s.weight + 'x' + s.reps : s.reps ? s.reps : '—';
    }
  }
  return '—';
}

function startWT() {
  if (wt) clearInterval(wt);
  wt = setInterval(function() {
    var e = Math.floor((Date.now() - wst) / 1000);
    var t = Math.floor(e / 60) + ':' + String(e % 60).padStart(2, '0');
    document.getElementById('aw-elapsed').textContent = t;
    document.getElementById('pill-t').textContent = t;
  }, 1000);
}

function finishW() {
  if (!aw || !confirm('Finish this workout?')) return;
  clearInterval(wt);
  var dur = Math.floor((Date.now() - wst) / 1000);
  var vol = 0;
  aw.exercises.forEach(function(e) {
    e.sets.forEach(function(s) { if (s.done && s.w && s.r) vol += parseFloat(s.w) * parseInt(s.r); });
  });
  var entry = {
    id: uid(), name: aw.name, date: new Date().toISOString(), duration: dur, volume: Math.round(vol),
    exercises: aw.exercises.map(function(e) {
      return {name: e.name, sets: e.sets.filter(function(s){ return s.done; }).map(function(s){ return {weight: s.w, reps: s.r}; })};
    })
  };
  hist.unshift(entry); DB.set('history', hist);
  aw.exercises.forEach(function(e) {
    e.sets.forEach(function(s) {
      if (!s.done || !s.w || !s.r) return;
      var v = parseFloat(s.w) * parseInt(s.r);
      if (!prs[e.name] || v > prs[e.name].volume) prs[e.name] = {weight: s.w, reps: s.r, volume: v, date: new Date().toISOString()};
    });
  });
  DB.set('prs', prs);
  aw = null;
  document.getElementById('pill').classList.remove('show');
  showView('history');
}

function cancelW() {
  if (!confirm('Cancel? Progress will be lost.')) return;
  clearInterval(wt); aw = null;
  document.getElementById('pill').classList.remove('show');
  showView('dashboard');
}

// ===== REST TIMER =====
var _rtM = 2, _rtS = 0; // minutes and seconds — default 2:00

var RT_MINS = [0,1,2,3,4,5];
var RT_SECS = [0,5,10,15,20,25,30,35,40,45,50,55];

// Update the picker display labels
function _rtRender() {
  var dm = document.getElementById('rt-dmin');
  var ds = document.getElementById('rt-dsec');
  if (dm) dm.textContent = String(_rtM).padStart(2,'0');
  if (ds) ds.textContent = String(_rtS).padStart(2,'0');
}

// Adjust minutes or seconds via +/- buttons
function rtAdj(unit, dir) {
  if (unit === 'm') {
    _rtM = Math.max(0, Math.min(5, _rtM + dir));
    if (_rtM === 5) _rtS = 0;
  } else {
    if (_rtM === 5) { _rtS = 0; }
    else {
      var idx = RT_SECS.indexOf(_rtS);
      idx = Math.max(0, Math.min(RT_SECS.length - 1, idx + dir));
      _rtS = RT_SECS[idx];
    }
  }
  _rtApply();
}

function _rtApply() {
  var total = Math.max(5, _rtM * 60 + _rtS);
  rtLast = total;
  _rtRender();
  setRT(total);
}

function showRT() {
  // Restore last chosen time for this workout
  var s = rtLast;
  _rtM = Math.floor(s / 60);
  _rtS = Math.round((s % 60) / 5) * 5;
  if (_rtS >= 60) { _rtM++; _rtS = 0; }
  if (_rtM > 5)   { _rtM = 5; _rtS = 0; }
  _rtRender();
  setRT(s);
  document.getElementById('rt-ov').classList.add('show');
}
function setRT(s) {
  if (rtIv) clearInterval(rtIv);
  rtTot = s; rtRem = s; rtRun = true; updRT();
  rtIv = setInterval(tickRT, 1000);
}
function tickRT() { if (!rtRun) return; rtRem--; updRT(); if (rtRem <= 0) { clearInterval(rtIv); closeRT(); beep(); } }
function updRT() {
  var m = Math.floor(rtRem / 60), s = rtRem % 60;
  document.getElementById('rt-num').textContent = m + ':' + String(s).padStart(2, '0');
  
  // Update linear progress bar
  var pct = (rtTot > 0 ? Math.round(rtRem / rtTot * 100) : 0);
  document.getElementById('rt-fill').style.width = pct + '%';
  
  // Update circular progress ring
  var circle = document.getElementById('rt-circle-prog');
  if (circle) {
    var circumference = 339.292; // 2 * PI * r (r = 54)
    var offset = circumference * (1 - (rtRem / rtTot));
    circle.style.strokeDashoffset = offset;
  }
}
function togRT() { rtRun = !rtRun; document.getElementById('rt-pbtn').textContent = rtRun ? 'Pause' : 'Resume'; }
function closeRT() { clearInterval(rtIv); document.getElementById('rt-ov').classList.remove('show'); }
function beep() {
  try {
    var c = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.2, 0.4].forEach(function(t) {
      var o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.frequency.value = 880;
      g.gain.setValueAtTime(0.3, c.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.01, c.currentTime + t + 0.15);
      o.start(c.currentTime + t); o.stop(c.currentTime + t + 0.15);
    });
  } catch(e) {}
}

// ===== HISTORY =====
function rHist() {
  var list = document.getElementById('hist-list');
  if (!hist.length) {
    list.innerHTML = '<div class="empty"><div class="eico">&#128197;</div><div class="etitle">No history yet</div><div class="esub">Complete a workout to see it here</div></div>';
    return;
  }
  list.innerHTML = hist.slice().sort(function(a,b){ return new Date(b.date)-new Date(a.date); }).map(function(w) {
    var exRows = (w.exercises || []).map(function(e) {
      var ss = (e.sets || []).map(function(s){ return (s.weight || 'BW') + 'x' + s.reps; }).join(' ');
      return '<div class="h-ex"><div class="h-ex-n">' + esc(e.name) + '</div><div class="h-ex-s">' + esc(ss) + '</div></div>';
    }).join('');
    return '<button class="h-card" onclick="this.querySelector(\'.h-detail\').classList.toggle(\'open\')">'
      + '<div class="h-hd">'
      + '<div style="min-width:0;flex:1"><div class="h-title">' + esc(w.name) + '</div><div class="h-date">' + fda(w.date) + '</div></div>'
      + '<div class="h-stats">'
      + '<div class="hs"><div class="hs-v">' + fdur(w.duration) + '</div><div class="hs-l">Time</div></div>'
      + '<div class="hs"><div class="hs-v">' + fv(w.volume) + '</div><div class="hs-l">Vol</div></div>'
      + '<div class="hs"><div class="hs-v">' + (w.exercises && w.exercises.length || 0) + '</div><div class="hs-l">Exs</div></div>'
      + '</div></div>'
      + '<div class="h-detail"><div style="padding-top:8px">' + exRows + '</div></div>'
      + '</button>';
  }).join('');
}

// ===== PROGRESS =====
function rProg() {
  document.getElementById('pg-pr').textContent = Object.keys(prs).length;
  var vols = hist.map(function(w){ return w.volume || 0; });
  document.getElementById('pg-vol').textContent = fv(vols.length ? Math.max.apply(null, vols) : 0);
  var allEx = {};
  hist.forEach(function(w){ (w.exercises || []).forEach(function(e){ allEx[e.name] = 1; }); });
  document.getElementById('pg-ex').textContent = Object.keys(allEx).length;
  var durs = hist.filter(function(w){ return w.duration; }).map(function(w){ return w.duration; });
  document.getElementById('pg-dur').textContent = durs.length ? Math.round(durs.reduce(function(a,b){ return a+b; }, 0) / durs.length / 60) + 'm' : '—';

  var prl = document.getElementById('pr-list');
  var pe = Object.keys(prs).map(function(k){ return [k, prs[k]]; });
  if (pe.length) {
    pe.sort(function(a,b){ return new Date(b[1].date) - new Date(a[1].date); });
    prl.innerHTML = pe.map(function(kv) {
      return '<div class="pr-item"><div><div class="pr-name">' + esc(kv[0]) + '</div><div class="pr-date">' + fd(kv[1].date) + '</div></div><div class="pr-val">' + esc(kv[1].weight) + 'x' + esc(kv[1].reps) + '</div></div>';
    }).join('');
  } else {
    prl.innerHTML = '<div class="empty" style="padding:16px"><div class="esub">Log some heavy sets to set PRs!</div></div>';
  }

  var sel = document.getElementById('ex-sel'), cv = sel.value;
  sel.innerHTML = '<option value="">Select exercise...</option>' + Object.keys(allEx).sort().map(function(n){
    return '<option value="' + esc(n) + '">' + esc(n) + '</option>';
  }).join('');
  if (cv) sel.value = cv;
  drawVC(); drawFreqChart(); if (sel.value) drawEC();
}

function drawVC() {
  var c = document.getElementById('vc'); if (!c) return;
  var s = hist.slice().sort(function(a,b){ return new Date(a.date)-new Date(b.date); }).slice(-12);
  if (!s.length) { clrC(c, 'No data yet. Complete workouts to see your volume trend!'); return; }
  drawBars(c, s.map(function(w){ return w.volume||0; }), s.map(function(w){ return fd(w.date); }), '#d4f000');
}

function drawFreqChart() {
  var c = document.getElementById('freq-chart'); if (!c) return;
  
  // Get last 12 weeks of data
  var now = new Date();
  var weeks = [];
  for (var i = 11; i >= 0; i--) {
    var weekStart = new Date(now);
    weekStart.setDate(now.getDate() - (i * 7) - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
    var weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    var count = hist.filter(function(w) {
      var d = new Date(w.date);
      return d >= weekStart && d <= weekEnd;
    }).length;
    
    weeks.push({
      label: (weekStart.getMonth() + 1) + '/' + weekStart.getDate(),
      count: count
    });
  }
  
  if (!weeks.some(function(w) { return w.count > 0; })) {
    clrC(c, 'No workout data yet. Start training to see your frequency!');
    return;
  }
  
  drawBars(c, weeks.map(function(w){ return w.count; }), weeks.map(function(w){ return w.label; }), '#ff6030');
}

function drawEC() {
  var nm = document.getElementById('ex-sel').value;
  var c = document.getElementById('ec'); if (!c || !nm) return;
  var pts = [];
  hist.slice().sort(function(a,b){ return new Date(a.date)-new Date(b.date); }).forEach(function(w) {
    var e = (w.exercises || []).filter(function(x){ return x.name.toLowerCase() === nm.toLowerCase(); })[0];
    if (e && e.sets && e.sets.length) {
      var best = Math.max.apply(null, e.sets.map(function(s){ return parseFloat(s.weight) * parseInt(s.reps) || 0; }));
      if (best > 0) pts.push({val: best, date: w.date});
    }
  });
  if (!pts.length) { clrC(c, 'No data for this exercise yet'); return; }
  drawLine(c, pts.map(function(p){ return p.val; }), pts.map(function(p){ return fd(p.date); }), '#30b8ff');
}

function clrC(cv, msg) {
  cv.width = cv.offsetWidth || 300; cv.height = 180;
  var ctx = cv.getContext('2d');
  ctx.fillStyle = '#4a4a64'; ctx.font = '13px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText(msg, cv.width/2, 90);
}
function drawBars(cv, data, labels, color) {
  cv.width = cv.offsetWidth || 300; cv.height = 200;
  var ctx = cv.getContext('2d');
  var W = cv.width, H = cv.height, pt = 12, pr = 12, pb = 28, pl = 42;
  var w = W-pl-pr, h = H-pt-pb, max = Math.max.apply(null, data.concat([1]));
  ctx.clearRect(0, 0, W, H);
  
  // Grid lines
  for (var i = 0; i <= 4; i++) {
    var y = pt + h - (i/4)*h;
    ctx.strokeStyle = i === 0 ? '#3e3e4e' : '#2e2e3e';
    ctx.lineWidth = i === 0 ? 2 : 1;
    ctx.beginPath(); ctx.moveTo(pl, y); ctx.lineTo(pl+w, y); ctx.stroke();
    ctx.fillStyle = '#8888a8'; ctx.font = '10px monospace'; ctx.textAlign = 'right';
    ctx.fillText(Math.round(max*i/4), pl-4, y+4);
  }
  
  // Bars with gradients
  data.forEach(function(v, i) {
    var x = pl + (w/data.length)*i + w/data.length*0.15;
    var bw = w/data.length*0.7, bh = (v/max)*h, y = pt+h-bh;
    
    // Create gradient
    var gradient = ctx.createLinearGradient(0, y, 0, y + bh);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, color + '99'); // Add transparency at bottom
    
    ctx.fillStyle = gradient;
    rrc(ctx, x, y, bw, bh, 4); 
    ctx.fill();
    
    // Bar border
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Labels
    if (data.length <= 12) {
      ctx.fillStyle = '#8888a8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
      ctx.save();
      ctx.translate(x + bw/2, H-6);
      ctx.rotate(-Math.PI/4);
      ctx.fillText(labels[i] || '', 0, 0);
      ctx.restore();
    }
  });
}
function drawLine(cv, data, labels, color) {
  cv.width = cv.offsetWidth || 300; cv.height = 200;
  var ctx = cv.getContext('2d');
  var W = cv.width, H = cv.height, pt = 12, pr = 12, pb = 28, pl = 46;
  var w = W-pl-pr, h = H-pt-pb;
  var max = Math.max.apply(null, data.concat([1])), min = Math.min.apply(null, data), rng = max - min || 1;
  ctx.clearRect(0, 0, W, H);
  
  // Grid lines
  for (var i = 0; i <= 4; i++) {
    var y = pt + h - (i/4)*h;
    ctx.strokeStyle = i === 0 ? '#3e3e4e' : '#2e2e3e';
    ctx.lineWidth = i === 0 ? 2 : 1;
    ctx.beginPath(); ctx.moveTo(pl, y); ctx.lineTo(pl+w, y); ctx.stroke();
    ctx.fillStyle = '#8888a8'; ctx.font = '10px monospace'; ctx.textAlign = 'right';
    ctx.fillText(Math.round(min + rng*i/4), pl-4, y+4);
  }
  
  var pts = data.map(function(v, i) {
    return {x: pl + (w/(data.length-1||1))*i, y: pt + h - ((v-min)/rng)*h};
  });
  
  // Area under line with gradient
  var gradient = ctx.createLinearGradient(0, pt, 0, pt + h);
  gradient.addColorStop(0, color + '40');
  gradient.addColorStop(1, color + '05');
  
  ctx.beginPath(); 
  ctx.moveTo(pts[0].x, H-pb);
  pts.forEach(function(p){ ctx.lineTo(p.x, p.y); });
  ctx.lineTo(pts[pts.length-1].x, H-pb); 
  ctx.closePath();
  ctx.fillStyle = gradient; 
  ctx.fill();
  
  // Line
  ctx.beginPath(); 
  ctx.strokeStyle = color; 
  ctx.lineWidth = 3;
  ctx.shadowColor = color;
  ctx.shadowBlur = 4;
  pts.forEach(function(p, i){ 
    if (i === 0) ctx.moveTo(p.x, p.y); 
    else ctx.lineTo(p.x, p.y); 
  }); 
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  // Data points
  pts.forEach(function(p, i){ 
    ctx.beginPath(); 
    ctx.arc(p.x, p.y, 4, 0, Math.PI*2); 
    ctx.fillStyle = '#0d0d12'; 
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  
  // Labels
  if (data.length <= 12) {
    pts.forEach(function(p, i){ 
      ctx.fillStyle='#8888a8'; 
      ctx.font='9px sans-serif'; 
      ctx.textAlign='center';
      ctx.save();
      ctx.translate(p.x, H-6);
      ctx.rotate(-Math.PI/4);
      ctx.fillText(labels[i]||'', 0, 0); 
      ctx.restore();
    });
  }
}
function rrc(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h); ctx.lineTo(x, y+h); ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y, x+r, y); ctx.closePath();
}

// ===== FILE UPLOAD =====
function doDO(e) { e.preventDefault(); document.getElementById('uz').classList.add('dov'); }
function doDL() { document.getElementById('uz').classList.remove('dov'); }
function doDrop(e) { e.preventDefault(); document.getElementById('uz').classList.remove('dov'); var f = e.dataTransfer && e.dataTransfer.files[0]; if (f) processFile(f); }
function doFS(e) { var f = e.target && e.target.files[0]; if (f) processFile(f); e.target.value = ''; }

async function processFile(file) {
  var uz = document.getElementById('uz');
  uz.style.display = 'none';
  var al = document.getElementById('ai-load'); al.classList.add('show');
  document.getElementById('ai-sub').textContent = 'Reading file...';
  var content = '';
  if (file.name.toLowerCase().endsWith('.pdf')) {
    try { content = await extractPDF(file); } catch(e) { content = '[PDF: ' + file.name + ']'; }
  } else {
    content = await file.text();
  }
  document.getElementById('ai-sub').textContent = 'AI parsing program structure...';
  try {
    var prog = await parseAI(content, file.name);
    uProgs.push(prog); DB.set('programs', uProgs);
    al.classList.remove('show'); uz.style.display = '';
    var sb = document.getElementById('save-banner');
    sb.classList.add('show');
    setTimeout(function(){ sb.classList.remove('show'); }, 5000);
    rProgs(); openProg(prog.id);
  } catch(err) {
    al.classList.remove('show'); uz.style.display = '';
    alert('Error: ' + err.message + '\n\nTip: Text-based PDFs work best. If scanned, copy text into a .txt file first.');
  }
}

async function extractPDF(file) {
  return new Promise(function(res, rej) {
    var r = new FileReader();
    r.onload = function(e) {
      var b = new Uint8Array(e.target.result), t = '';
      for (var i = 0; i < b.length; i++) {
        var c = b[i];
        if (c >= 32 && c < 127) t += String.fromCharCode(c);
        else if (c === 10 || c === 13) t += '\n';
      }
      res(t.split('\n').map(function(l){ return l.trim(); }).filter(function(l){ return l.length > 2; }).join('\n').substring(0, 12000));
    };
    r.onerror = rej;
    r.readAsArrayBuffer(file);
  });
}

async function parseAI(content, filename) {
  var resp = await fetch('https://YOUR-WORKER-NAME.YOUR-USERNAME.workers.dev/api/claude', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{role: 'user', content: 'Parse this workout program. Return ONLY valid JSON, no markdown, no explanation. Schema:\n{"name":"","description":"","difficulty":"","duration":"","phases":[{"name":"","objective":"","length":"","sets":"","reps":"","rest":"","frequency":"","weeks":[{"name":"","days":[{"name":"","focus":"","type":"workout|mobility|trigger|focus","exercises":[{"name":"","sets":"","reps":"","notes":""}]}]}]}]}\nExtract ALL phases, weeks, days, exercises. Keep notes.\nFILENAME: ' + filename + '\nCONTENT:\n' + content.substring(0, 8000)}]
    })
  });
  if (!resp.ok) { var e = await resp.json(); throw new Error(e.error && e.error.message || 'API error ' + resp.status); }
  var data = await resp.json();
  var raw = (data.content || []).map(function(c){ return c.text || ''; }).join('').trim();
  var clean = raw.replace(/^```json\s*/i,'').replace(/^```\s*/,'').replace(/```\s*$/,'').trim();
  var parsed;
  try { parsed = JSON.parse(clean); } catch(e) { throw new Error('AI returned invalid JSON. Try a .txt file.'); }
  parsed.id = uid(); parsed.source = 'ai'; parsed.createdAt = new Date().toISOString();
  if (!parsed.phases) parsed.phases = [];
  parsed.phases.forEach(function(ph) {
    if (!ph.weeks) ph.weeks = [];
    ph.weeks.forEach(function(w) {
      if (!w.days) w.days = [];
      w.days.forEach(function(d){ if (!d.exercises) d.exercises = []; });
    });
  });
  return parsed;
}

// ===== QUICK LOG / CREATE =====
function openQL() {
  document.getElementById('ql-name').value = '';
  document.getElementById('ex-builder').innerHTML = '';
  addER(); addER();
  openM('ql-modal');
}
function addER() {
  var d = document.createElement('div');
  d.className = 'erb-row';
  d.innerHTML = '<input class="fi en" placeholder="Exercise name" autocomplete="off" style="font-size:15px">'
    + '<input class="fi es" type="number" inputmode="numeric" placeholder="Sets" value="3" min="1" style="font-size:15px;text-align:center;padding:11px 4px">'
    + '<input class="fi er" placeholder="Reps" value="10" autocomplete="off" style="font-size:15px;text-align:center;padding:11px 4px">'
    + '<button class="erb-del" onclick="this.parentElement.remove()">&#10005;</button>';
  document.getElementById('ex-builder').appendChild(d);
}
function openCP() {
  document.getElementById('cp-name').value = '';
  document.getElementById('cp-desc').value = '';
  document.getElementById('cp-dur').value = '';
  openM('cp-modal');
}
function createProg() {
  var name = document.getElementById('cp-name').value.trim();
  if (!name) { alert('Enter a program name'); return; }
  var p = {
    id: uid(), name: name,
    description: document.getElementById('cp-desc').value,
    duration: document.getElementById('cp-dur').value,
    difficulty: document.getElementById('cp-diff').value,
    source: 'manual',
    phases: [{name:'Phase 1', weeks:[{name:'Week 1', days:[{name:'Day 1', focus:'', type:'workout', exercises:[]}]}]}]
  };
  uProgs.push(p); DB.set('programs', uProgs);
  closeM('cp-modal'); rProgs(); openProg(p.id);
}

function openM(id) { document.getElementById(id).classList.add('show'); }
function closeM(id) { document.getElementById(id).classList.remove('show'); }

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.modal-ov').forEach(function(m) {
    m.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('show'); });
  });
});

// ===== UTILS =====
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function fv(v) { if (!v) return '0'; return v >= 1000 ? (v/1000).toFixed(1) + 'k' : '' + Math.round(v); }
function fd(iso) { if (!iso) return '—'; var d = new Date(iso); return (d.getMonth()+1) + '/' + d.getDate() + '/' + String(d.getFullYear()).slice(2); }
function fda(iso) { if (!iso) return '—'; return new Date(iso).toLocaleDateString('en-US', {weekday:'short', month:'short', day:'numeric', year:'numeric'}); }
function fdur(sec) { if (!sec) return '—'; var m = Math.floor(sec/60); return m >= 60 ? Math.floor(m/60) + 'h ' + (m%60) + 'm' : m + 'm'; }
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ===== CALCULATORS =====
var tdeeTargetCals = 0; // Store target calories for macro adjustments

function toggleCalc(id) {
  var body = document.getElementById(id);
  var chevron = document.getElementById(id.replace('-calc', '-chevron'));
  if (body) {
    var isOpen = body.style.display !== 'none';
    body.style.display = isOpen ? 'none' : 'block';
    if (chevron) chevron.classList.toggle('open', !isOpen);
  }
}

function calcTDEE() {
  var weight = parseFloat(document.getElementById('tdee-weight').value);
  var height = parseFloat(document.getElementById('tdee-height').value);
  var age = parseFloat(document.getElementById('tdee-age').value);
  var sex = document.getElementById('tdee-sex').value;
  var activity = parseFloat(document.getElementById('tdee-activity').value);
  var goal = document.getElementById('tdee-goal').value;
  
  if (!weight || !height || !age) {
    alert('Please fill in all fields');
    return;
  }
  
  // Mifflin-St Jeor Equation (more accurate than Harris-Benedict)
  var bmr;
  if (sex === 'male') {
    bmr = (10 * weight * 0.453592) + (6.25 * height * 2.54) - (5 * age) + 5;
  } else {
    bmr = (10 * weight * 0.453592) + (6.25 * height * 2.54) - (5 * age) - 161;
  }
  
  var tdee = bmr * activity;
  var target;
  
  if (goal === 'cut') {
    target = tdee - 500; // 500 cal deficit for ~1lb/week loss
  } else if (goal === 'bulk') {
    target = tdee + 300; // 300 cal surplus for lean gains
  } else {
    target = tdee;
  }
  
  tdeeTargetCals = target; // Store for macro adjustments
  
  // Set default macro percentages based on goal
  var proteinPct, carbPct, fatPct;
  if (goal === 'cut') {
    proteinPct = 30; carbPct = 45; fatPct = 25;
  } else if (goal === 'bulk') {
    proteinPct = 25; carbPct = 55; fatPct = 20;
  } else {
    proteinPct = 25; carbPct = 50; fatPct = 25;
  }
  
  // Set slider values
  document.getElementById('protein-slider').value = proteinPct;
  document.getElementById('carbs-slider').value = carbPct;
  document.getElementById('fat-slider').value = fatPct;
  
  // Update displays
  document.getElementById('tdee-bmr').textContent = Math.round(bmr) + ' cal';
  document.getElementById('tdee-tdee').textContent = Math.round(tdee) + ' cal';
  document.getElementById('tdee-target').textContent = Math.round(target) + ' cal';
  
  updateMacros(); // Calculate and display macros
  
  document.getElementById('tdee-results').style.display = 'block';
}

function updateMacros() {
  if (!tdeeTargetCals) return;
  
  var proteinPct = parseInt(document.getElementById('protein-slider').value);
  var carbPct = parseInt(document.getElementById('carbs-slider').value);
  var fatPct = parseInt(document.getElementById('fat-slider').value);
  
  // Update percentage displays
  document.getElementById('protein-pct-display').textContent = proteinPct + '%';
  document.getElementById('carbs-pct-display').textContent = carbPct + '%';
  document.getElementById('fat-pct-display').textContent = fatPct + '%';
  
  // Calculate total
  var total = proteinPct + carbPct + fatPct;
  var totalEl = document.getElementById('macro-total');
  totalEl.textContent = 'Total: ' + total + '%';
  
  // Highlight if not 100%
  if (total !== 100) {
    totalEl.classList.add('error');
  } else {
    totalEl.classList.remove('error');
  }
  
  // Calculate grams
  var proteinCals = tdeeTargetCals * (proteinPct / 100);
  var carbCals = tdeeTargetCals * (carbPct / 100);
  var fatCals = tdeeTargetCals * (fatPct / 100);
  
  var proteinGrams = Math.round(proteinCals / 4);
  var carbGrams = Math.round(carbCals / 4);
  var fatGrams = Math.round(fatCals / 9);
  
  // Update displays
  document.getElementById('tdee-protein').textContent = proteinGrams + 'g (' + proteinPct + '%)';
  document.getElementById('tdee-carbs').textContent = carbGrams + 'g (' + carbPct + '%)';
  document.getElementById('tdee-fat').textContent = fatGrams + 'g (' + fatPct + '%)';
}

function calcORM() {
  var weight = parseFloat(document.getElementById('orm-weight').value);
  var reps = parseInt(document.getElementById('orm-reps').value);
  
  if (!weight || !reps || reps < 1) {
    alert('Please enter valid weight and reps');
    return;
  }
  
  if (reps > 12) {
    alert('Formula is most accurate for 1-12 reps. Results may be less reliable.');
  }
  
  // Epley Formula: 1RM = weight × (1 + reps/30)
  var oneRM = weight * (1 + reps / 30);
  
  document.getElementById('orm-max').textContent = Math.round(oneRM) + ' lbs';
  document.getElementById('orm-results').style.display = 'block';
}

var measurements = JSON.parse(localStorage.getItem('bodyMeasurements') || '[]');

function saveMeasurement() {
  var weight = parseFloat(document.getElementById('measure-weight').value);
  var bf = parseFloat(document.getElementById('measure-bf').value) || null;
  var waist = parseFloat(document.getElementById('measure-waist').value) || null;
  var chest = parseFloat(document.getElementById('measure-chest').value) || null;
  var arms = parseFloat(document.getElementById('measure-arms').value) || null;
  var thighs = parseFloat(document.getElementById('measure-thighs').value) || null;
  
  if (!weight) {
    alert('Please enter at least your weight');
    return;
  }
  
  var measurement = {
    date: new Date().toISOString(),
    weight: weight,
    bodyFat: bf,
    waist: waist,
    chest: chest,
    arms: arms,
    thighs: thighs
  };
  
  measurements.unshift(measurement);
  localStorage.setItem('bodyMeasurements', JSON.stringify(measurements));
  renderMeasurements();
  
  // Clear form
  document.getElementById('measure-weight').value = '';
  document.getElementById('measure-bf').value = '';
  document.getElementById('measure-waist').value = '';
  document.getElementById('measure-chest').value = '';
  document.getElementById('measure-arms').value = '';
  document.getElementById('measure-thighs').value = '';
}

function renderMeasurements() {
  var list = document.getElementById('measurements-list');
  if (!measurements.length) {
    list.innerHTML = '<div class="empty" style="min-height: 120px; padding: 30px 20px;"><div class="esub">No measurements yet. Add your first one above!</div></div>';
    return;
  }
  
  list.innerHTML = measurements.slice(0, 5).map(function(m) {
    var stats = [];
    if (m.weight) stats.push('Weight: <strong>' + m.weight + ' lbs</strong>');
    if (m.bodyFat) stats.push('BF: <strong>' + m.bodyFat + '%</strong>');
    if (m.waist) stats.push('Waist: <strong>' + m.waist + '"</strong>');
    if (m.chest) stats.push('Chest: <strong>' + m.chest + '"</strong>');
    if (m.arms) stats.push('Arms: <strong>' + m.arms + '"</strong>');
    if (m.thighs) stats.push('Thighs: <strong>' + m.thighs + '"</strong>');
    
    return '<div class="measurement-item">'
      + '<div class="measurement-date">' + fda(m.date) + '</div>'
      + '<div class="measurement-grid">'
      + stats.map(function(s) { return '<div class="measurement-stat">' + s + '</div>'; }).join('')
      + '</div></div>';
  }).join('');
}

// Render measurements when progress tab loads - called from main DOMContentLoaded below
function initNutritionTracking() {
  renderMeasurements();
  loadNutritionGoals();
  renderFoodLog();
  renderFavorites();
  renderMealTemplates();
  loadWaterGoal();
  renderWaterProgress();
  renderSavedRecipes();
}

// ===== KINETIQ FOODS DATABASE =====
var kinetiqFoods = [
  // Proteins - Meats
  {name: 'Chicken Breast (4oz)', cals: 187, protein: 35, carbs: 0, fat: 4, serving: '4oz (113g)'},
  {name: 'Chicken Thigh (4oz)', cals: 232, protein: 28, carbs: 0, fat: 13, serving: '4oz (113g)'},
  {name: 'Ground Beef 90/10 (4oz)', cals: 200, protein: 23, carbs: 0, fat: 11, serving: '4oz (113g)'},
  {name: 'Ground Beef 80/20 (4oz)', cals: 287, protein: 19, carbs: 0, fat: 23, serving: '4oz (113g)'},
  {name: 'Steak (Sirloin, 6oz)', cals: 312, protein: 48, carbs: 0, fat: 12, serving: '6oz (170g)'},
  {name: 'Pork Chop (4oz)', cals: 190, protein: 26, carbs: 0, fat: 9, serving: '4oz (113g)'},
  {name: 'Turkey Breast (4oz)', cals: 153, protein: 34, carbs: 0, fat: 1, serving: '4oz (113g)'},
  {name: 'Bacon (3 slices)', cals: 161, protein: 12, carbs: 1, fat: 12, serving: '3 slices'},
  {name: 'Sausage Link (2 links)', cals: 180, protein: 7, carbs: 1, fat: 16, serving: '2 links'},
  
  // Proteins - Fish/Seafood
  {name: 'Salmon (5oz)', cals: 280, protein: 39, carbs: 0, fat: 13, serving: '5oz (142g)'},
  {name: 'Tuna (canned, 5oz)', cals: 191, protein: 42, carbs: 0, fat: 1, serving: '5oz (142g)'},
  {name: 'Tilapia (5oz)', cals: 145, protein: 30, carbs: 0, fat: 3, serving: '5oz (142g)'},
  {name: 'Shrimp (4oz)', cals: 112, protein: 23, carbs: 1, fat: 1, serving: '4oz (113g)'},
  
  // Proteins - Eggs/Dairy
  {name: 'Whole Egg (large)', cals: 72, protein: 6, carbs: 0, fat: 5, serving: '1 egg'},
  {name: 'Egg Whites (1 cup)', cals: 126, protein: 26, carbs: 2, fat: 0, serving: '1 cup'},
  {name: 'Greek Yogurt (plain, 1 cup)', cals: 100, protein: 17, carbs: 6, fat: 0, serving: '1 cup'},
  {name: 'Cottage Cheese (1 cup)', cals: 206, protein: 28, carbs: 8, fat: 9, serving: '1 cup'},
  {name: 'Whey Protein Powder (1 scoop)', cals: 120, protein: 24, carbs: 3, fat: 1, serving: '1 scoop (30g)'},
  {name: 'Milk (whole, 1 cup)', cals: 149, protein: 8, carbs: 12, fat: 8, serving: '1 cup'},
  {name: 'Milk (2%, 1 cup)', cals: 122, protein: 8, carbs: 12, fat: 5, serving: '1 cup'},
  {name: 'Cheddar Cheese (1oz)', cals: 114, protein: 7, carbs: 0, fat: 9, serving: '1oz (28g)'},
  
  // Carbs - Grains
  {name: 'White Rice (cooked, 1 cup)', cals: 205, protein: 4, carbs: 45, fat: 0, serving: '1 cup'},
  {name: 'Brown Rice (cooked, 1 cup)', cals: 218, protein: 5, carbs: 46, fat: 2, serving: '1 cup'},
  {name: 'Quinoa (cooked, 1 cup)', cals: 222, protein: 8, carbs: 39, fat: 4, serving: '1 cup'},
  {name: 'Oatmeal (cooked, 1 cup)', cals: 158, protein: 6, carbs: 28, fat: 3, serving: '1 cup'},
  {name: 'Pasta (cooked, 1 cup)', cals: 221, protein: 8, carbs: 43, fat: 1, serving: '1 cup'},
  {name: 'Bread (white, 2 slices)', cals: 160, protein: 5, carbs: 30, fat: 2, serving: '2 slices'},
  {name: 'Bread (wheat, 2 slices)', cals: 138, protein: 8, carbs: 24, fat: 2, serving: '2 slices'},
  {name: 'Bagel (plain)', cals: 289, protein: 11, carbs: 56, fat: 2, serving: '1 bagel'},
  {name: 'Tortilla (flour, 8")', cals: 146, protein: 4, carbs: 24, fat: 4, serving: '1 tortilla'},
  
  // Carbs - Potatoes
  {name: 'Sweet Potato (medium)', cals: 112, protein: 2, carbs: 26, fat: 0, serving: '1 medium'},
  {name: 'White Potato (medium)', cals: 163, protein: 4, carbs: 37, fat: 0, serving: '1 medium'},
  {name: 'French Fries (medium)', cals: 365, protein: 4, carbs: 48, fat: 17, serving: 'medium serving'},
  
  // Vegetables
  {name: 'Broccoli (1 cup)', cals: 55, protein: 4, carbs: 11, fat: 0, serving: '1 cup'},
  {name: 'Spinach (1 cup)', cals: 7, protein: 1, carbs: 1, fat: 0, serving: '1 cup raw'},
  {name: 'Carrots (1 cup)', cals: 52, protein: 1, carbs: 12, fat: 0, serving: '1 cup'},
  {name: 'Bell Pepper (1 cup)', cals: 39, protein: 1, carbs: 9, fat: 0, serving: '1 cup'},
  {name: 'Cucumber (1 cup)', cals: 16, protein: 1, carbs: 4, fat: 0, serving: '1 cup'},
  {name: 'Tomato (medium)', cals: 22, protein: 1, carbs: 5, fat: 0, serving: '1 medium'},
  {name: 'Lettuce (1 cup)', cals: 5, protein: 0, carbs: 1, fat: 0, serving: '1 cup'},
  {name: 'Green Beans (1 cup)', cals: 44, protein: 2, carbs: 10, fat: 0, serving: '1 cup'},
  {name: 'Asparagus (1 cup)', cals: 27, protein: 3, carbs: 5, fat: 0, serving: '1 cup'},
  
  // Fruits
  {name: 'Banana (medium)', cals: 105, protein: 1, carbs: 27, fat: 0, serving: '1 medium'},
  {name: 'Apple (medium)', cals: 95, protein: 0, carbs: 25, fat: 0, serving: '1 medium'},
  {name: 'Orange (medium)', cals: 62, protein: 1, carbs: 15, fat: 0, serving: '1 medium'},
  {name: 'Strawberries (1 cup)', cals: 49, protein: 1, carbs: 12, fat: 0, serving: '1 cup'},
  {name: 'Blueberries (1 cup)', cals: 84, protein: 1, carbs: 21, fat: 0, serving: '1 cup'},
  {name: 'Grapes (1 cup)', cals: 104, protein: 1, carbs: 27, fat: 0, serving: '1 cup'},
  {name: 'Watermelon (1 cup)', cals: 46, protein: 1, carbs: 12, fat: 0, serving: '1 cup'},
  
  // Fats - Nuts/Seeds
  {name: 'Almonds (1oz, 23 nuts)', cals: 164, protein: 6, carbs: 6, fat: 14, serving: '1oz (28g)'},
  {name: 'Peanuts (1oz)', cals: 161, protein: 7, carbs: 5, fat: 14, serving: '1oz (28g)'},
  {name: 'Peanut Butter (2 tbsp)', cals: 188, protein: 8, carbs: 7, fat: 16, serving: '2 tbsp'},
  {name: 'Almond Butter (2 tbsp)', cals: 196, protein: 7, carbs: 6, fat: 18, serving: '2 tbsp'},
  {name: 'Walnuts (1oz)', cals: 185, protein: 4, carbs: 4, fat: 18, serving: '1oz (28g)'},
  {name: 'Cashews (1oz)', cals: 157, protein: 5, carbs: 9, fat: 12, serving: '1oz (28g)'},
  
  // Fats - Oils/Spreads
  {name: 'Olive Oil (1 tbsp)', cals: 119, protein: 0, carbs: 0, fat: 14, serving: '1 tbsp'},
  {name: 'Coconut Oil (1 tbsp)', cals: 121, protein: 0, carbs: 0, fat: 14, serving: '1 tbsp'},
  {name: 'Butter (1 tbsp)', cals: 102, protein: 0, carbs: 0, fat: 12, serving: '1 tbsp'},
  {name: 'Avocado (half)', cals: 161, protein: 2, carbs: 9, fat: 15, serving: '1/2 avocado'},
  
  // Snacks/Common Foods
  {name: 'Protein Bar (typical)', cals: 200, protein: 20, carbs: 24, fat: 6, serving: '1 bar'},
  {name: 'Granola Bar', cals: 120, protein: 2, carbs: 20, fat: 4, serving: '1 bar'},
  {name: 'Chips (1oz)', cals: 152, protein: 2, carbs: 15, fat: 10, serving: '1oz (about 15 chips)'},
  {name: 'Popcorn (air-popped, 3 cups)', cals: 93, protein: 3, carbs: 19, fat: 1, serving: '3 cups'},
  {name: 'Pretzels (1oz)', cals: 108, protein: 3, carbs: 23, fat: 1, serving: '1oz'},
  
  // Fast Food (Common)
  {name: 'Big Mac', cals: 550, protein: 25, carbs: 45, fat: 30, serving: '1 sandwich'},
  {name: 'Whopper', cals: 660, protein: 28, carbs: 49, fat: 40, serving: '1 sandwich'},
  {name: 'Pizza (cheese, 1 slice)', cals: 285, protein: 12, carbs: 36, fat: 10, serving: '1 slice'},
  {name: 'Chipotle Chicken Bowl', cals: 630, protein: 42, carbs: 62, fat: 24, serving: '1 bowl (est.)'},
  {name: 'Subway 6" Turkey', cals: 280, protein: 18, carbs: 46, fat: 4, serving: '6" sub'}
];

// ===== NUTRITION TRACKING =====
var foodLog = JSON.parse(localStorage.getItem('foodLog_' + new Date().toISOString().split('T')[0]) || '[]');
var nutritionGoals = JSON.parse(localStorage.getItem('nutritionGoals') || '{"calories":2500,"protein":185,"carbs":280,"fat":80}');
var favoriteFoods = JSON.parse(localStorage.getItem('favoriteFoods') || '[]');
var mealTemplates = JSON.parse(localStorage.getItem('mealTemplates') || '[]');

// ===== WATER TRACKING =====
var today = new Date().toISOString().split('T')[0];
var waterLog = JSON.parse(localStorage.getItem('waterLog_' + today) || '{"total":0,"entries":[],"date":"' + today + '"}');
var waterGoal = parseInt(localStorage.getItem('waterGoal') || '64');

// ===== RECIPE BUILDER =====
var savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
var currentRecipe = {
  name: '',
  servings: 1,
  ingredients: []
};

function showRecipeBuilder() {
  document.getElementById('recipe-builder-section').style.display = 'block';
  document.getElementById('recipe-name').value = '';
  document.getElementById('recipe-servings').value = '1';
  document.getElementById('recipe-ingredient-search').value = '';
  document.getElementById('recipe-ingredient-results').innerHTML = '';
  currentRecipe = { name: '', servings: 1, ingredients: [] };
  renderRecipeIngredients();
}

function cancelRecipe() {
  document.getElementById('recipe-builder-section').style.display = 'none';
  currentRecipe = { name: '', servings: 1, ingredients: [] };
}

function searchRecipeIngredients() {
  var query = document.getElementById('recipe-ingredient-search').value.toLowerCase().trim();
  var results = document.getElementById('recipe-ingredient-results');
  
  if (!query) {
    results.innerHTML = '';
    return;
  }
  
  var matches = kinetiqFoods.filter(function(f) {
    return f.name.toLowerCase().indexOf(query) !== -1;
  }).slice(0, 5);
  
  if (!matches.length) {
    results.innerHTML = '<div style="padding: 8px; font-size: 12px; color: var(--t3);">No foods found</div>';
    return;
  }
  
  results.innerHTML = matches.map(function(food) {
    return '<div class="food-result-item" style="margin-bottom: 6px;">'
      + '<div style="flex: 1;"><div class="food-result-name" style="font-size: 13px;">' + esc(food.name) + '</div>'
      + '<div class="food-result-macros" style="font-size: 10px;">' + food.cals + ' cal • P: ' + food.protein + 'g</div></div>'
      + '<button class="btn-s btn-sm" style="font-size: 11px; padding: 4px 10px;" onclick="addRecipeIngredient(\'' + esc(food.name.replace(/'/g, "\\'")) + '\',' + food.cals + ',' + food.protein + ',' + food.carbs + ',' + food.fat + ')">+ Add</button>'
      + '</div>';
  }).join('');
}

function addRecipeIngredient(name, cals, protein, carbs, fat) {
  // Check if already added
  var exists = currentRecipe.ingredients.find(function(ing) { return ing.name === name; });
  if (exists) {
    exists.quantity += 1;
  } else {
    currentRecipe.ingredients.push({
      name: name,
      cals: cals,
      protein: protein,
      carbs: carbs,
      fat: fat,
      quantity: 1
    });
  }
  
  renderRecipeIngredients();
  document.getElementById('recipe-ingredient-search').value = '';
  document.getElementById('recipe-ingredient-results').innerHTML = '';
}

function updateRecipeIngredientQty(index, newQty) {
  var qty = parseFloat(newQty);
  if (qty > 0) {
    currentRecipe.ingredients[index].quantity = qty;
    renderRecipeIngredients();
  }
}

function removeRecipeIngredient(index) {
  currentRecipe.ingredients.splice(index, 1);
  renderRecipeIngredients();
}

function renderRecipeIngredients() {
  var list = document.getElementById('recipe-ingredients-list');
  var totals = document.getElementById('recipe-totals');
  var totalMacros = document.getElementById('recipe-total-macros');
  
  if (!currentRecipe.ingredients.length) {
    list.innerHTML = '<div style="padding: 16px; text-align: center; color: var(--t3); font-size: 13px;">No ingredients added yet</div>';
    totals.style.display = 'none';
    return;
  }
  
  list.innerHTML = '<div style="font-weight: 700; margin-bottom: 8px; font-size: 13px; color: var(--t1);">Ingredients:</div>'
    + currentRecipe.ingredients.map(function(ing, i) {
      return '<div class="recipe-ingredient-item">'
        + '<div class="recipe-ingredient-name">' + esc(ing.name) + '</div>'
        + '<input type="number" class="recipe-ingredient-qty" value="' + ing.quantity + '" min="0.1" step="0.1" onchange="updateRecipeIngredientQty(' + i + ', this.value)">'
        + '<button class="recipe-ingredient-remove" onclick="removeRecipeIngredient(' + i + ')">×</button>'
        + '</div>';
    }).join('');
  
  // Calculate totals
  var totalCals = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0;
  currentRecipe.ingredients.forEach(function(ing) {
    totalCals += ing.cals * ing.quantity;
    totalProtein += ing.protein * ing.quantity;
    totalCarbs += ing.carbs * ing.quantity;
    totalFat += ing.fat * ing.quantity;
  });
  
  var servings = parseInt(document.getElementById('recipe-servings').value) || 1;
  
  totals.style.display = 'block';
  totalMacros.innerHTML = Math.round(totalCals / servings) + ' cal • '
    + 'P: ' + Math.round(totalProtein / servings) + 'g • '
    + 'C: ' + Math.round(totalCarbs / servings) + 'g • '
    + 'F: ' + Math.round(totalFat / servings) + 'g';
}

function saveRecipe() {
  var name = document.getElementById('recipe-name').value.trim();
  var servings = parseInt(document.getElementById('recipe-servings').value) || 1;
  
  if (!name) {
    alert('Please enter a recipe name');
    return;
  }
  
  if (!currentRecipe.ingredients.length) {
    alert('Please add at least one ingredient');
    return;
  }
  
  // Calculate totals
  var totalCals = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0;
  currentRecipe.ingredients.forEach(function(ing) {
    totalCals += ing.cals * ing.quantity;
    totalProtein += ing.protein * ing.quantity;
    totalCarbs += ing.carbs * ing.quantity;
    totalFat += ing.fat * ing.quantity;
  });
  
  var recipe = {
    id: uid(),
    name: name,
    servings: servings,
    ingredients: currentRecipe.ingredients,
    totalCals: totalCals,
    totalProtein: totalProtein,
    totalCarbs: totalCarbs,
    totalFat: totalFat,
    perServingCals: Math.round(totalCals / servings),
    perServingProtein: Math.round(totalProtein / servings),
    perServingCarbs: Math.round(totalCarbs / servings),
    perServingFat: Math.round(totalFat / servings),
    created: new Date().toISOString()
  };
  
  savedRecipes.push(recipe);
  localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  
  cancelRecipe();
  renderSavedRecipes();
  alert('Recipe saved! 🍳');
}

function renderSavedRecipes() {
  var list = document.getElementById('saved-recipes-list');
  
  if (!savedRecipes.length) {
    list.innerHTML = '<div class="empty" style="min-height: 100px; padding: 30px 20px;"><div class="esub">No saved recipes yet. Click "+ New Recipe" to create one!</div></div>';
    return;
  }
  
  list.innerHTML = savedRecipes.map(function(r) {
    return '<div class="recipe-card">'
      + '<div class="recipe-card-header">'
      + '<div><div class="recipe-card-name">' + esc(r.name) + '</div>'
      + '<div class="recipe-card-meta">' + r.ingredients.length + ' ingredients • ' + r.servings + ' serving' + (r.servings > 1 ? 's' : '') + '</div></div>'
      + '</div>'
      + '<div class="recipe-card-macros">Per serving: ' + r.perServingCals + ' cal • P: ' + r.perServingProtein + 'g • C: ' + r.perServingCarbs + 'g • F: ' + r.perServingFat + 'g</div>'
      + '<div class="recipe-card-actions">'
      + '<button class="btn-p btn-sm" onclick="logRecipe(\'' + r.id + '\')" style="flex: 1; font-size: 11px;">+ Log 1 Serving</button>'
      + '<button class="btn-s btn-sm" onclick="viewRecipeDetails(\'' + r.id + '\')" style="font-size: 11px;">View</button>'
      + '<button class="food-log-delete" onclick="deleteRecipe(\'' + r.id + '\')" style="font-size: 11px;">Delete</button>'
      + '</div></div>';
  }).join('');
}

function logRecipe(recipeId) {
  var recipe = savedRecipes.find(function(r) { return r.id === recipeId; });
  if (!recipe) return;
  
  var entry = {
    id: uid(),
    name: recipe.name + ' (1 serving)',
    cals: recipe.perServingCals,
    protein: recipe.perServingProtein,
    carbs: recipe.perServingCarbs,
    fat: recipe.perServingFat,
    time: new Date().toISOString()
  };
  
  foodLog.push(entry);
  saveFoodLog();
  renderFoodLog();
  updateNutritionSummary();
  alert('Recipe logged! 🍳');
}

function viewRecipeDetails(recipeId) {
  var recipe = savedRecipes.find(function(r) { return r.id === recipeId; });
  if (!recipe) return;
  
  var details = 'Recipe: ' + recipe.name + '\n'
    + 'Servings: ' + recipe.servings + '\n\n'
    + 'Ingredients:\n'
    + recipe.ingredients.map(function(ing) {
      return '• ' + ing.quantity + 'x ' + ing.name;
    }).join('\n')
    + '\n\nPer Serving:\n'
    + recipe.perServingCals + ' cal | P: ' + recipe.perServingProtein + 'g | C: ' + recipe.perServingCarbs + 'g | F: ' + recipe.perServingFat + 'g';
  
  alert(details);
}

function deleteRecipe(recipeId) {
  if (!confirm('Delete this recipe?')) return;
  
  savedRecipes = savedRecipes.filter(function(r) { return r.id !== recipeId; });
  localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  renderSavedRecipes();
}

function logWater(amount) {
  waterLog.total += amount;
  waterLog.entries.push({
    time: new Date().toISOString(),
    amount: amount
  });
  saveWaterLog();
  renderWaterProgress();
  
  // Check if goal reached
  if (waterLog.total >= waterGoal && waterLog.total - amount < waterGoal) {
    celebrateWaterGoal();
  }
}

function saveWaterLog() {
  var today = new Date().toISOString().split('T')[0];
  waterLog.date = today;
  localStorage.setItem('waterLog_' + today, JSON.stringify(waterLog));
  updateWaterStreak();
}

function renderWaterProgress() {
  var circles = document.getElementById('water-circles');
  var total = document.getElementById('water-total');
  var goalDisplay = document.getElementById('water-goal-display');
  
  // Calculate glasses (8 oz each)
  var glasses = Math.ceil(waterGoal / 8);
  var filled = Math.floor(waterLog.total / 8);
  
  // Render circles
  var circleHTML = '';
  for (var i = 0; i < glasses; i++) {
    if (i < filled) {
      circleHTML += '<span style="color: #4facfe;">●</span>';
    } else {
      circleHTML += '<span style="color: var(--bg4);">○</span>';
    }
  }
  circles.innerHTML = circleHTML;
  
  // Update total
  total.textContent = waterLog.total + ' oz';
  goalDisplay.textContent = 'Goal: ' + waterGoal + ' oz (' + Math.round((waterLog.total / waterGoal) * 100) + '%)';
  
  // Update streak display
  updateWaterStreak();
}

function updateWaterStreak() {
  var streakEl = document.getElementById('water-streak');
  var streak = calculateWaterStreak();
  
  if (streak > 0) {
    streakEl.textContent = '🔥 ' + streak + ' day streak!';
    streakEl.style.display = 'block';
  } else {
    streakEl.style.display = 'none';
  }
}

function calculateWaterStreak() {
  var streak = 0;
  var checkDate = new Date();
  
  // Check if today's goal is met
  if (waterLog.total >= waterGoal) {
    streak = 1;
  } else {
    return 0; // Streak broken if today not complete
  }
  
  // Check previous days
  for (var i = 1; i < 365; i++) {
    checkDate.setDate(checkDate.getDate() - 1);
    var dateStr = checkDate.toISOString().split('T')[0];
    var dayLog = JSON.parse(localStorage.getItem('waterLog_' + dateStr) || 'null');
    
    if (dayLog && dayLog.total >= waterGoal) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

function celebrateWaterGoal() {
  // Simple celebration - could enhance with animation later
  var total = document.getElementById('water-total');
  total.style.transform = 'scale(1.2)';
  total.style.color = '#4facfe';
  setTimeout(function() {
    total.style.transform = 'scale(1)';
    total.style.color = 'var(--t1)';
  }, 300);
}

function saveWaterGoal() {
  var input = document.getElementById('water-goal-input');
  var newGoal = parseInt(input.value);
  
  if (!newGoal || newGoal < 8 || newGoal > 300) {
    alert('Please enter a valid goal between 8 and 300 oz');
    return;
  }
  
  waterGoal = newGoal;
  localStorage.setItem('waterGoal', waterGoal);
  renderWaterProgress();
  alert('Water goal saved! 💧');
}

function loadWaterGoal() {
  document.getElementById('water-goal-input').value = waterGoal;
}

// USDA FoodData Central API (free, no auth required, no CORS issues)
var USDA_API_KEY = 'rKv11ptpNXXk35XGWMqleUBkOk5nVhVAE3cBgbNv';
var USDA_API_URL = 'https://api.nal.usda.gov/fdc/v1';

function showQuickAdd() {
  document.getElementById('quick-add-section').style.display = 'block';
  document.getElementById('search-all-section').style.display = 'none';
  document.getElementById('quick-add-btn').classList.remove('btn-s');
  document.getElementById('quick-add-btn').classList.add('btn-p');
  document.getElementById('search-all-btn').classList.remove('btn-p');
  document.getElementById('search-all-btn').classList.add('btn-s');
}

function showSearchAll() {
  document.getElementById('quick-add-section').style.display = 'none';
  document.getElementById('search-all-section').style.display = 'block';
  document.getElementById('quick-add-btn').classList.remove('btn-p');
  document.getElementById('quick-add-btn').classList.add('btn-s');
  document.getElementById('search-all-btn').classList.remove('btn-s');
  document.getElementById('search-all-btn').classList.add('btn-p');
}

async function searchFatSecret() {
  var query = document.getElementById('fatsecret-search').value.trim();
  var resultsDiv = document.getElementById('fatsecret-results');
  
  if (!query) {
    alert('Please enter a search term');
    return;
  }
  
  resultsDiv.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--t2);">🔍 Searching 350,000+ foods...</div>';
  
  try {
    var response = await fetch(USDA_API_URL + '/foods/search?api_key=' + USDA_API_KEY + '&query=' + encodeURIComponent(query) + '&pageSize=20');
    
    if (response.status === 429) {
      resultsDiv.innerHTML = '<div class="empty" style="padding: 20px;"><div class="esub">⚠️ Rate limit hit. Please get a free API key at <a href="https://fdc.nal.usda.gov/api-key-signup.html" target="_blank" style="color: var(--acc);">fdc.nal.usda.gov</a> and replace DEMO_KEY in app.js</div></div>';
      return;
    }
    
    var data = await response.json();
    
    if (!data.foods || data.foods.length === 0) {
      resultsDiv.innerHTML = '<div class="empty" style="padding: 20px;"><div class="esub">No foods found for "' + esc(query) + '"</div></div>';
      return;
    }
    
    resultsDiv.innerHTML = data.foods.map(function(food) {
      // Get nutrients
      var nutrients = food.foodNutrients || [];
      var cals = 0, protein = 0, carbs = 0, fat = 0;
      
      nutrients.forEach(function(n) {
        if (n.nutrientName === 'Energy' || n.nutrientNumber === '208') cals = Math.round(n.value);
        if (n.nutrientName === 'Protein' || n.nutrientNumber === '203') protein = Math.round(n.value);
        if (n.nutrientName === 'Carbohydrate, by difference' || n.nutrientNumber === '205') carbs = Math.round(n.value);
        if (n.nutrientName === 'Total lipid (fat)' || n.nutrientNumber === '204') fat = Math.round(n.value);
      });
      
      var brandName = food.brandOwner || food.brandName || '';
      var displayName = food.description;
      if (brandName) displayName = brandName + ' - ' + displayName;
      
      var isFav = isFavorite(displayName);
      
      return '<div class="food-result-item">'
        + '<div style="flex: 1;"><div class="food-result-name">' + esc(displayName) + '</div>'
        + '<div class="food-result-macros">' + cals + ' cal • P: ' + protein + 'g C: ' + carbs + 'g F: ' + fat + 'g</div></div>'
        + '<div style="display: flex; gap: 8px;">'
        + '<button class="food-result-add" onclick="addUSDAFood(' + food.fdcId + ',\'' + esc(displayName.replace(/'/g, "\\'")) + '\',' + cals + ',' + protein + ',' + carbs + ',' + fat + ')">+ Add</button>'
        + '<button class="food-star' + (isFav ? ' favorited' : '') + '" onclick="toggleFavorite(\'' + esc(displayName.replace(/'/g, "\\'")) + '\',' + cals + ',' + protein + ',' + carbs + ',' + fat + '); searchFatSecret();">★</button>'
        + '</div></div>';
    }).join('');
    
  } catch (error) {
    console.error('USDA search error:', error);
    resultsDiv.innerHTML = '<div class="empty" style="padding: 20px;"><div class="esub">Search error. Please try again.</div></div>';
  }
}

function addUSDAFood(fdcId, name, cals, protein, carbs, fat) {
  var entry = {
    id: uid(),
    name: name,
    cals: cals,
    protein: protein,
    carbs: carbs,
    fat: fat,
    time: new Date().toISOString()
  };
  
  foodLog.push(entry);
  saveFoodLog();
  renderFoodLog();
  updateNutritionSummary();
  
  // Clear search and show success
  document.getElementById('fatsecret-search').value = '';
  document.getElementById('fatsecret-results').innerHTML = '<div style="text-align: center; padding: 20px; color: var(--ok);">✓ Added to log!</div>';
}

function loadNutritionGoals() {
  document.getElementById('goal-calories').value = nutritionGoals.calories;
  document.getElementById('goal-protein').value = nutritionGoals.protein;
  document.getElementById('goal-carbs').value = nutritionGoals.carbs;
  document.getElementById('goal-fat').value = nutritionGoals.fat;
  updateNutritionSummary();
}

function saveNutritionGoals() {
  nutritionGoals = {
    calories: parseInt(document.getElementById('goal-calories').value) || 2500,
    protein: parseInt(document.getElementById('goal-protein').value) || 185,
    carbs: parseInt(document.getElementById('goal-carbs').value) || 280,
    fat: parseInt(document.getElementById('goal-fat').value) || 80
  };
  localStorage.setItem('nutritionGoals', JSON.stringify(nutritionGoals));
  updateNutritionSummary();
  alert('Goals saved!');
}

function searchFoods() {
  var query = document.getElementById('food-search').value.toLowerCase().trim();
  var results = document.getElementById('food-results');
  
  if (!query) {
    results.innerHTML = '';
    return;
  }
  
  var matches = kinetiqFoods.filter(function(f) {
    return f.name.toLowerCase().indexOf(query) !== -1;
  }).slice(0, 10);
  
  if (!matches.length) {
    results.innerHTML = '<div class="empty" style="min-height: 100px; padding: 20px;"><div class="esub">No foods found. Try a different search.</div></div>';
    return;
  }
  
  results.innerHTML = matches.map(function(food) {
    var isFav = isFavorite(food.name);
    return '<div class="food-result-item">'
      + '<div style="flex: 1;"><div class="food-result-name">' + esc(food.name) + '</div>'
      + '<div class="food-result-macros">' + food.cals + ' cal • P: ' + food.protein + 'g C: ' + food.carbs + 'g F: ' + food.fat + 'g</div></div>'
      + '<div style="display: flex; gap: 8px;">'
      + '<button class="food-result-add" onclick="addFood(\'' + esc(food.name.replace(/'/g, "\\'")) + '\')">+ Add</button>'
      + '<button class="food-star' + (isFav ? ' favorited' : '') + '" onclick="toggleFavorite(\'' + esc(food.name.replace(/'/g, "\\'")) + '\',' + food.cals + ',' + food.protein + ',' + food.carbs + ',' + food.fat + '); searchFoods();">★</button>'
      + '</div></div>';
  }).join('');
}

function addFood(foodName) {
  var food = kinetiqFoods.find(function(f) { return f.name === foodName; });
  if (!food) return;
  
  var entry = {
    id: uid(),
    name: food.name,
    cals: food.cals,
    protein: food.protein,
    carbs: food.carbs,
    fat: food.fat,
    time: new Date().toISOString()
  };
  
  foodLog.push(entry);
  saveFoodLog();
  renderFoodLog();
  updateNutritionSummary();
  document.getElementById('food-search').value = '';
  document.getElementById('food-results').innerHTML = '';
}

function deleteFood(id) {
  foodLog = foodLog.filter(function(f) { return f.id !== id; });
  saveFoodLog();
  renderFoodLog();
  updateNutritionSummary();
}

function saveFoodLog() {
  var today = new Date().toISOString().split('T')[0];
  localStorage.setItem('foodLog_' + today, JSON.stringify(foodLog));
}

function renderFoodLog() {
  var list = document.getElementById('food-log-list');
  if (!foodLog.length) {
    list.innerHTML = '<div class="empty" style="min-height: 120px; padding: 30px 20px;"><div class="esub">No foods logged yet. Search and add foods above!</div></div>';
    return;
  }
  
  list.innerHTML = foodLog.map(function(f) {
    return '<div class="food-log-item">'
      + '<div><div class="food-log-name">' + esc(f.name) + '</div>'
      + '<div class="food-log-macros">' + f.cals + ' cal • P: ' + f.protein + 'g C: ' + f.carbs + 'g F: ' + f.fat + 'g</div></div>'
      + '<button class="food-log-delete" onclick="deleteFood(\'' + f.id + '\')">Delete</button>'
      + '</div>';
  }).join('');
}

function updateNutritionSummary() {
  var totals = foodLog.reduce(function(sum, f) {
    return {
      cals: sum.cals + f.cals,
      protein: sum.protein + f.protein,
      carbs: sum.carbs + f.carbs,
      fat: sum.fat + f.fat
    };
  }, {cals: 0, protein: 0, carbs: 0, fat: 0});
  
  document.getElementById('daily-cals').textContent = totals.cals;
  document.getElementById('daily-cals-goal').textContent = '/ ' + nutritionGoals.calories + ' cal';
  document.getElementById('daily-protein').textContent = totals.protein + 'g';
  document.getElementById('daily-protein-goal').textContent = '/ ' + nutritionGoals.protein + 'g';
  document.getElementById('daily-carbs').textContent = totals.carbs + 'g';
  document.getElementById('daily-carbs-goal').textContent = '/ ' + nutritionGoals.carbs + 'g';
  document.getElementById('daily-fat').textContent = totals.fat + 'g';
  document.getElementById('daily-fat-goal').textContent = '/ ' + nutritionGoals.fat + 'g';
  
  // Update progress bars
  var calsPct = Math.min(100, (totals.cals / nutritionGoals.calories) * 100);
  var proteinPct = Math.min(100, (totals.protein / nutritionGoals.protein) * 100);
  var carbsPct = Math.min(100, (totals.carbs / nutritionGoals.carbs) * 100);
  var fatPct = Math.min(100, (totals.fat / nutritionGoals.fat) * 100);
  
  document.getElementById('cals-progress').style.width = calsPct + '%';
  document.getElementById('protein-progress').style.width = proteinPct + '%';
  document.getElementById('carbs-progress').style.width = carbsPct + '%';
  document.getElementById('fat-progress').style.width = fatPct + '%';
}

// ===== FAVORITES =====
function toggleFavorite(foodName, cals, protein, carbs, fat) {
  var existingIndex = favoriteFoods.findIndex(function(f) { return f.name === foodName; });
  
  if (existingIndex !== -1) {
    // Remove from favorites
    favoriteFoods.splice(existingIndex, 1);
  } else {
    // Add to favorites
    favoriteFoods.push({
      name: foodName,
      cals: cals,
      protein: protein,
      carbs: carbs,
      fat: fat
    });
  }
  
  localStorage.setItem('favoriteFoods', JSON.stringify(favoriteFoods));
  renderFavorites();
}

function isFavorite(foodName) {
  return favoriteFoods.some(function(f) { return f.name === foodName; });
}

function renderFavorites() {
  var favCard = document.getElementById('favorites-card');
  var favList = document.getElementById('favorites-list');
  
  if (!favoriteFoods.length) {
    favCard.style.display = 'none';
    return;
  }
  
  favCard.style.display = 'block';
  favList.innerHTML = favoriteFoods.map(function(f) {
    return '<div class="food-result-item">'
      + '<div style="flex: 1;"><div class="food-result-name">' + esc(f.name) + '</div>'
      + '<div class="food-result-macros">' + f.cals + ' cal • P: ' + f.protein + 'g C: ' + f.carbs + 'g F: ' + f.fat + 'g</div></div>'
      + '<div style="display: flex; gap: 8px;">'
      + '<button class="food-result-add" onclick="addFavoriteFood(\'' + esc(f.name.replace(/'/g, "\\'")) + '\')" style="background: var(--acc);">+ Add</button>'
      + '<button class="food-star favorited" onclick="toggleFavorite(\'' + esc(f.name.replace(/'/g, "\\'")) + '\',' + f.cals + ',' + f.protein + ',' + f.carbs + ',' + f.fat + ')">★</button>'
      + '</div></div>';
  }).join('');
}

function addFavoriteFood(foodName) {
  var food = favoriteFoods.find(function(f) { return f.name === foodName; });
  if (!food) return;
  
  var entry = {
    id: uid(),
    name: food.name,
    cals: food.cals,
    protein: food.protein,
    carbs: food.carbs,
    fat: food.fat,
    time: new Date().toISOString()
  };
  
  foodLog.push(entry);
  saveFoodLog();
  renderFoodLog();
  updateNutritionSummary();
}

// ===== MEAL TEMPLATES =====
function showSaveMealModal() {
  if (!foodLog.length) {
    alert('Log some foods first before saving a meal template!');
    return;
  }
  document.getElementById('save-meal-modal').classList.add('show');
  document.getElementById('meal-name-input').value = '';
}

function saveMealTemplate() {
  var name = document.getElementById('meal-name-input').value.trim();
  if (!name) {
    alert('Please enter a meal name');
    return;
  }
  
  if (!foodLog.length) {
    alert('No foods to save!');
    return;
  }
  
  var template = {
    id: uid(),
    name: name,
    foods: foodLog.map(function(f) {
      return {
        name: f.name,
        cals: f.cals,
        protein: f.protein,
        carbs: f.carbs,
        fat: f.fat
      };
    }),
    totalCals: foodLog.reduce(function(sum, f) { return sum + f.cals; }, 0),
    totalProtein: foodLog.reduce(function(sum, f) { return sum + f.protein; }, 0),
    totalCarbs: foodLog.reduce(function(sum, f) { return sum + f.carbs; }, 0),
    totalFat: foodLog.reduce(function(sum, f) { return sum + f.fat; }, 0),
    created: new Date().toISOString()
  };
  
  mealTemplates.push(template);
  localStorage.setItem('mealTemplates', JSON.stringify(mealTemplates));
  
  closeM('save-meal-modal');
  renderMealTemplates();
  alert('Meal template saved! 🎉');
}

function renderMealTemplates() {
  var templatesCard = document.getElementById('meal-templates-card');
  var templatesList = document.getElementById('meal-templates-list');
  
  if (!mealTemplates.length) {
    templatesCard.style.display = 'none';
    return;
  }
  
  templatesCard.style.display = 'block';
  templatesList.innerHTML = mealTemplates.map(function(t) {
    return '<div class="food-result-item">'
      + '<div style="flex: 1;"><div class="food-result-name">' + esc(t.name) + '</div>'
      + '<div class="food-result-macros">' + t.foods.length + ' foods • ' + t.totalCals + ' cal • P: ' + t.totalProtein + 'g C: ' + t.totalCarbs + 'g F: ' + t.totalFat + 'g</div></div>'
      + '<div style="display: flex; gap: 8px;">'
      + '<button class="food-result-add" onclick="logMealTemplate(\'' + t.id + '\')">+ Log</button>'
      + '<button class="food-log-delete" onclick="deleteMealTemplate(\'' + t.id + '\')">Delete</button>'
      + '</div></div>';
  }).join('');
}

function logMealTemplate(templateId) {
  var template = mealTemplates.find(function(t) { return t.id === templateId; });
  if (!template) return;
  
  template.foods.forEach(function(food) {
    var entry = {
      id: uid(),
      name: food.name,
      cals: food.cals,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      time: new Date().toISOString()
    };
    foodLog.push(entry);
  });
  
  saveFoodLog();
  renderFoodLog();
  updateNutritionSummary();
  alert('Meal logged! 🍽️');
}

function deleteMealTemplate(templateId) {
  if (!confirm('Delete this meal template?')) return;
  
  mealTemplates = mealTemplates.filter(function(t) { return t.id !== templateId; });
  localStorage.setItem('mealTemplates', JSON.stringify(mealTemplates));
  renderMealTemplates();
}
