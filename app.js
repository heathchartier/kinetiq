// ===== STORAGE =====
var DB = {
  get: function(k, d) {
    try { var v = localStorage.getItem('ls_' + k); return v !== null ? JSON.parse(v) : d; } catch(e) { return d; }
  },
  set: function(k, v) {
    try { localStorage.setItem('ls_' + k, JSON.stringify(v)); } catch(e) {}
  }
};

var uProgs    = DB.get('programs', []);
var hist      = DB.get('history', []);
var prs       = DB.get('prs', {});
var restDays  = DB.get('restDays', []);
var aw = null, wt = null, wst = null, curPid = null, curPhi = 0;
var rtIv = null, rtTot = 120, rtRem = 120, rtRun = false, rtLast = 120;

function isPremium() {
  return localStorage.getItem('ls_access_tier') === 'premium';
}

function allProgs() {
  var del = DB.get('del_bi', []);
  var list = [];
  var premium = isPremium();

  // All Kinetiq built-in programs — available to everyone
  var builtins = [
    {id:'kinetiq-foundation-builtin', prog:kinetiqFoundationData},
    {id:'kinetiq-strength-builtin', prog:kinetiqStrengthData},
    {id:'kinetiq-hypertrophy-builtin', prog:kinetiqHypertrophyData},
    {id:'kinetiq-balance-builtin', prog:kinetiqBalanceData},
    {id:'kinetiq-deload-builtin', prog:kinetiqDeloadData},
    {id:'kinetiq-mobility-builtin', prog:kinetiqMobilityData},
    {id:'kinetiq-hiit-builtin', prog:kinetiqHIITData},
    {id:'kinetiq-resilience-builtin', prog:kinetiqResilienceData},
    {id:'kinetiq-bodyweight-builtin', prog:kinetiqBodyweightData},
    {id:'kinetiq-5x5-builtin', prog:kinetiq5x5Data}
  ];

  builtins.forEach(function(b){
    if (del.indexOf(b.id) === -1) list.push(b.prog);
  });

  // Premium: add all MAPS built-in programs
  if (premium && typeof MAPS_ALL_PROGRAMS !== 'undefined') {
    MAPS_ALL_PROGRAMS.forEach(function(prog){
      if (del.indexOf(prog.id) === -1) list.push(prog);
    });
  }

  // Custom programs from Supabase/localStorage
  // Corrective programs are premium-only
  var filtered = premium
    ? uProgs
    : uProgs.filter(function(p){ return p.type !== 'corrective'; });

  return list.concat(filtered);
}

// ===== TOAST NOTIFICATIONS =====
function toast(msg, type) {
  var container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  var t = document.createElement('div');
  t.className = 'toast' + (type ? ' ' + type : '');
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(function() {
    t.classList.add('out');
    setTimeout(function() { if (t.parentNode) t.parentNode.removeChild(t); }, 350);
  }, 2500);
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

  // Recommended program card — visible only when onboarding gave a suggestion but no program is active yet
  var recCard = document.getElementById('recommended-card');
  var recBody = document.getElementById('recommended-body');
  if (recCard && recBody) {
    var recId = localStorage.getItem('ls_recommended_program');
    if (!currentProg && recId) {
      var recProg = allProgs().find(function(p) { return p.id === recId; });
      if (recProg) {
        recBody.innerHTML = '<div style="padding:14px 16px">'
          + '<div style="font-size:16px;font-weight:700;color:var(--t1);margin-bottom:4px">' + esc(recProg.name) + '</div>'
          + '<div style="font-size:13px;color:var(--t2);line-height:1.5;margin-bottom:14px">' + esc(recProg.description || '') + '</div>'
          + '<button class="btn-p" style="width:100%" onclick="activateProgram(\'' + recProg.id + '\')">&#9654; Start This Program</button>'
          + '</div>';
        recCard.style.display = 'block';
      } else {
        recCard.style.display = 'none';
      }
    } else {
      recCard.style.display = 'none';
    }
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
      var pc = p.phases && p.phases.length || 0;
      var phaseStr = p.type === 'corrective' ? 'Corrective' : (pc + ' phase' + (pc === 1 ? '' : 's'));
      return '<button class="row-item" onclick="openProg(\'' + p.id + '\')">'
        + '<div><div class="row-name">' + esc(p.name) + '</div>'
        + '<div class="row-meta">' + phaseStr + ' &middot; ' + (p.duration || '') + '</div></div>'
        + '<span class="chip cy">' + (p.difficulty || 'Int') + '</span>'
        + '</button>';
    }).join('');
  }
  
  // === ENHANCED DASHBOARD CARDS ===
  renderNextWorkout();
  renderRecentPRs();
  renderWeekPreview();
}

function renderNextWorkout() {
  var card = document.getElementById('next-workout-card');
  var body = document.getElementById('next-workout-body');
  if (!card || !body) return;
  
  var currentProg = localStorage.getItem('currentProgram');
  var currentWeek = parseInt(localStorage.getItem('currentWeek') || '1');
  var currentDay = parseInt(localStorage.getItem('currentDay') || '0');
  
  if (!currentProg) {
    card.style.display = 'none';
    return;
  }
  
  var prog = allProgs().find(function(p) { return p.id === currentProg; });
  if (!prog || !prog.phases || !prog.phases.length) {
    card.style.display = 'none';
    return;
  }
  
  // Find the current week and day
  var weekCount = 0;
  var targetPhase = null;
  var targetWeek = null;
  var targetDayIndex = currentDay;
  
  for (var i = 0; i < prog.phases.length; i++) {
    var phase = prog.phases[i];
    if (!phase.weeks) continue;
    for (var j = 0; j < phase.weeks.length; j++) {
      weekCount++;
      if (weekCount === currentWeek) {
        targetPhase = phase;
        targetWeek = phase.weeks[j];
        break;
      }
    }
    if (targetWeek) break;
  }
  
  if (!targetWeek || !targetWeek.days || targetDayIndex >= targetWeek.days.length) {
    card.style.display = 'none';
    return;
  }
  
  var nextDay = targetWeek.days[targetDayIndex];
  var exCount = nextDay.exercises ? nextDay.exercises.length : 0;
  
  body.innerHTML = '<div style="padding:14px">'
    + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">'
    + '<div style="flex:1;min-width:0">'
    + '<div style="font-size:15px;font-weight:700;color:var(--t1);margin-bottom:2px">' + esc(nextDay.name) + '</div>'
    + '<div style="font-size:12px;color:var(--t3)">' + esc(prog.name) + ' • Week ' + currentWeek + '</div>'
    + '</div>'
    + '<button class="btn-p btn-sm" onclick="startQuick(\'' + prog.id + '\',' + (weekCount - 1) + ',' + targetDayIndex + ')">Start &rarr;</button>'
    + '</div>'
    + '<div style="font-size:12px;color:var(--t2);margin-top:8px">'
    + '<span style="font-weight:600">' + exCount + ' exercises</span> • ' + esc(nextDay.focus || 'Full body')
    + '</div>'
    + '</div>';
  
  card.style.display = 'block';
}

function renderRecentPRs() {
  var card = document.getElementById('recent-prs-card');
  var body = document.getElementById('recent-prs-body');
  if (!card || !body) return;
  
  var prArray = Object.keys(prs).map(function(k) {
    return {name: k, data: prs[k]};
  }).sort(function(a, b) {
    return new Date(b.data.date) - new Date(a.data.date);
  }).slice(0, 3);
  
  if (prArray.length === 0) {
    card.style.display = 'none';
    return;
  }
  
  body.innerHTML = '<div style="padding:10px 14px">' + prArray.map(function(pr) {
    var daysAgo = Math.floor((Date.now() - new Date(pr.data.date)) / 86400000);
    var timeText = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : daysAgo + 'd ago';
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border)">'
      + '<div style="flex:1;min-width:0">'
      + '<div style="font-size:13px;font-weight:600;color:var(--t1);margin-bottom:2px">' + esc(pr.name) + '</div>'
      + '<div style="font-size:11px;color:var(--t3)">' + timeText + '</div>'
      + '</div>'
      + '<div style="font-size:14px;font-weight:700;color:var(--acc);font-family:monospace">' + esc(pr.data.weight) + 'x' + esc(pr.data.reps) + '</div>'
      + '</div>';
  }).join('') + '</div>';
  
  card.style.display = 'block';
}

function renderWeekPreview() {
  var card = document.getElementById('week-preview-card');
  var body = document.getElementById('week-preview-body');
  if (!card || !body) return;
  
  var currentProg = localStorage.getItem('currentProgram');
  if (!currentProg) {
    card.style.display = 'none';
    return;
  }
  
  var prog = allProgs().find(function(p) { return p.id === currentProg; });
  var currentWeek = parseInt(localStorage.getItem('currentWeek') || '1');
  
  if (!prog || !prog.phases || !prog.phases.length) {
    card.style.display = 'none';
    return;
  }
  
  // Find current week
  var weekCount = 0;
  var targetWeek = null;
  
  for (var i = 0; i < prog.phases.length; i++) {
    var phase = prog.phases[i];
    if (!phase.weeks) continue;
    for (var j = 0; j < phase.weeks.length; j++) {
      weekCount++;
      if (weekCount === currentWeek) {
        targetWeek = phase.weeks[j];
        break;
      }
    }
    if (targetWeek) break;
  }
  
  if (!targetWeek || !targetWeek.days) {
    card.style.display = 'none';
    return;
  }
  
  // Get this week's workout history
  var now = new Date();
  var weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);

  var thisWeekWorkouts = hist.filter(function(w) {
    return new Date(w.date) >= weekStart;
  });

  var todayStr = now.toISOString().split('T')[0];
  var thisWeekRestDays = restDays.filter(function(d) {
    return new Date(d + 'T12:00:00') >= weekStart;
  });

  var restRowsHtml = thisWeekRestDays.map(function(d) {
    var label = new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    return '<div style="display:flex;align-items:center;padding:6px 0;gap:10px">'
      + '<div style="width:20px;height:20px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:9px;color:#000;font-weight:700">R</div>'
      + '<div style="flex:1;min-width:0">'
      + '<div style="font-size:13px;color:var(--t3)">Rest — ' + esc(label) + '</div>'
      + '</div>'
      + '</div>';
  }).join('');

  var todayWorkedOut = thisWeekWorkouts.some(function(w) {
    return new Date(w.date).toISOString().split('T')[0] === todayStr;
  });
  var todayIsRest = restDays.indexOf(todayStr) !== -1;
  var restBtnHtml = (!todayWorkedOut && !todayIsRest)
    ? '<div style="padding:4px 14px 12px"><button class="btn-d btn-sm" onclick="logRestDay()" style="width:100%">Log Rest Day</button></div>'
    : '';

  body.innerHTML = '<div style="padding:10px 14px">'
    + '<div style="margin-bottom:8px;font-size:12px;color:var(--t2);font-weight:600">' + esc(targetWeek.name) + '</div>'
    + targetWeek.days.map(function(day, idx) {
      var completed = thisWeekWorkouts.some(function(w) {
        return w.name && w.name.toLowerCase().includes(day.name.toLowerCase());
      });

      return '<div style="display:flex;align-items:center;padding:6px 0;gap:10px">'
        + '<div style="width:20px;height:20px;border-radius:50%;background:' + (completed ? 'var(--ok)' : 'var(--bg3)') + ';display:flex;align-items:center;justify-content:center;font-size:10px">'
        + (completed ? '✓' : (idx + 1))
        + '</div>'
        + '<div style="flex:1;min-width:0">'
        + '<div style="font-size:13px;color:' + (completed ? 'var(--t2)' : 'var(--t1)') + ';' + (completed ? 'text-decoration:line-through' : '') + '">' + esc(day.name) + '</div>'
        + '</div>'
        + '</div>';
    }).join('')
    + restRowsHtml
    + '</div>'
    + restBtnHtml;

  card.style.display = 'block';
}

function logRestDay() {
  var today = new Date().toISOString().split('T')[0];
  if (restDays.indexOf(today) === -1) {
    restDays.push(today);
    DB.set('restDays', restDays);
  }
  renderWeekPreview();
}

function startQuick(progId, weekIdx, dayIdx) {
  var prog = allProgs().find(function(p) { return p.id === progId; });
  if (!prog) return;
  
  var weekCount = 0;
  var targetWeek = null;
  var targetDay = null;
  
  for (var i = 0; i < prog.phases.length; i++) {
    var phase = prog.phases[i];
    if (!phase.weeks) continue;
    for (var j = 0; j < phase.weeks.length; j++) {
      if (weekCount === weekIdx) {
        targetWeek = phase.weeks[j];
        targetDay = targetWeek.days[dayIdx];
        break;
      }
      weekCount++;
    }
    if (targetDay) break;
  }
  
  if (!targetDay) return;

  maybeOpenFocusPicker(targetDay, function(extraEx) {
    // Start workout
    aw = {
      name: targetDay.name,
      exercises: (targetDay.exercises || []).concat(extraEx).map(function(e) {
        return {
          id: uid(),
          name: e.name,
          notes: e.notes || '',
          tS: e.sets || '',
          tR: e.reps || '',
          tW: e.weight || '',
          sets: Array.from({length: parseInt(e.sets) || 3}, function(_, i) {
            return {num: i + 1, w: '', r: '', done: false};
          }),
          workoutNotes: ''
        };
      })
    };

    // Tag as active-program workout so finishW() can auto-advance
    if (localStorage.getItem('currentProgram') === progId) {
      aw.apProgId = progId;
      aw.apWeek   = parseInt(localStorage.getItem('currentWeek') || '1');
      aw.apDay    = dayIdx;
      aw.apDaysInWeek = targetWeek ? targetWeek.days.length : 0;
    }

    wst = Date.now();
    document.getElementById('pill').classList.add('show');
    startWT();
    renderAW();
    showView('dashboard');
    document.getElementById('pill').scrollIntoView({behavior: 'smooth'});
  });
}

// ===== PROGRAMS LIST =====
// Format a release date string into a human-readable label
function fmtRelease(dateStr) {
  var parts = dateStr.split('-');
  var release = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  var now = new Date();
  now.setHours(0, 0, 0, 0);
  var diffDays = Math.floor((release - now) / (1000 * 60 * 60 * 24));
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var shortMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  if (diffDays < 0)  return 'Coming Soon';
  if (diffDays === 0) return 'Available Today';
  if (diffDays < 35) return 'Available ' + shortMonths[release.getMonth()] + ' ' + release.getDate();
  return 'Coming ' + months[release.getMonth()] + ' ' + release.getFullYear();
}

// ===== EXERCISE LIBRARY =====
var exLibFilter = 'All';

function openExLib() {
  showView('exercises');
  rExLib();
}

function exSetFilter(cat) {
  exLibFilter = cat;
  rExLib();
}

function collectExercises() {
  // Only the curated database — every entry here has an accurate muscle
  // group, equipment tag, and a real how-to description. Program-derived
  // exercise text used to be merged in as a fallback, but every program
  // author writes exercise names differently (numbering, "(heavy)",
  // "— SUPERSET" style suffixes, etc.), which produced dozens of near-
  // duplicate entries that could never have a real description. The
  // curated list already covers standard gym equipment and bodyweight
  // movements, so it stays the single source of truth for the library.
  if (typeof EXERCISE_DB === 'undefined') return [];
  return EXERCISE_DB.slice().sort(function(a, b) { return a.name.localeCompare(b.name); });
}

function rExLib() {
  var cats = ['All', 'Legs', 'Back', 'Chest', 'Shoulders', 'Arms', 'Core', 'Mobility', 'Cardio'];
  var filterEl = document.getElementById('ex-filters');
  var listEl   = document.getElementById('ex-list');
  if (!filterEl || !listEl) return;

  var query = (document.getElementById('ex-search') || {}).value || '';

  filterEl.innerHTML = cats.map(function(c) {
    return '<button class="ex-filter-chip' + (exLibFilter === c ? ' active' : '') + '" onclick="exSetFilter(\'' + c + '\')">' + c + '</button>';
  }).join('');

  var muscleColor = {
    Legs:'#22c55e', Back:'#00e5b8', Chest:'#f59e0b',
    Shoulders:'#a855f7', Arms:'#ec4899', Core:'#ef4444',
    Mobility:'#06b6d4', Cardio:'#f97316', Other:'#888'
  };

  var exercises = collectExercises().filter(function(ex) {
    return (exLibFilter === 'All' || ex.muscle === exLibFilter)
        && (!query || ex.name.toLowerCase().includes(query.toLowerCase()));
  });

  if (!exercises.length) {
    listEl.innerHTML = '<div class="empty" style="min-height:200px;padding:40px 20px"><div class="esub">No exercises found</div></div>';
    return;
  }

  var grouped = {};
  exercises.forEach(function(ex) {
    var k = ex.name[0].toUpperCase();
    if (!grouped[k]) grouped[k] = [];
    grouped[k].push(ex);
  });

  listEl.innerHTML = Object.keys(grouped).sort().map(function(letter) {
    return '<div class="sec-lbl" style="margin-top:14px">' + letter + '</div>'
      + grouped[letter].map(function(ex) {
        var col = muscleColor[ex.muscle] || '#888';
        return '<div class="ex-lib-row" onclick="openExDetail(\'' + esc(ex.name.replace(/'/g, "\\'")) + '\')">'
          + '<div class="ex-lib-name">' + esc(ex.name) + '</div>'
          + '<div class="ex-lib-meta">'
          + '<span class="ex-lib-badge" style="color:' + col + ';background:' + col + '20;border-color:' + col + '40">' + esc(ex.muscle || 'Other') + '</span>'
          + (ex.equipment ? '<span class="ex-lib-sep">·</span><span class="ex-lib-equip">' + esc(ex.equipment) + '</span>' : '')
          + '</div>'
          + '</div>';
      }).join('');
  }).join('');
}

function openExDetail(name) {
  var ex = collectExercises().filter(function(e) { return e.name === name; })[0];
  if (!ex) return;

  var muscleColor = {
    Legs:'#22c55e', Back:'#00e5b8', Chest:'#f59e0b',
    Shoulders:'#a855f7', Arms:'#ec4899', Core:'#ef4444',
    Mobility:'#06b6d4', Cardio:'#f97316', Other:'#888'
  };
  var col = muscleColor[ex.muscle] || '#888';

  document.getElementById('ex-detail-name').textContent = ex.name;
  document.getElementById('ex-detail-badges').innerHTML =
    '<span class="ex-lib-badge" style="color:' + col + ';background:' + col + '20;border-color:' + col + '40">' + esc(ex.muscle || 'Other') + '</span>'
    + (ex.equipment ? '<span class="ex-lib-sep">·</span><span class="ex-lib-equip">' + esc(ex.equipment) + '</span>' : '');
  document.getElementById('ex-detail-desc').textContent = ex.desc || 'No description available yet for this exercise.';

  openM('ex-detail-modal');
}

function rProgs() {
  var pl = document.getElementById('prog-list');
  var pg = allProgs();
  var q = (document.getElementById('prog-search') && document.getElementById('prog-search').value || '').toLowerCase().trim();
  if (q) pg = pg.filter(function(p){ return p.name.toLowerCase().indexOf(q) !== -1 || (p.description || '').toLowerCase().indexOf(q) !== -1; });

  // Filter upcoming programs by search query too
  var upcoming = (typeof upcomingPrograms !== 'undefined' ? upcomingPrograms : []).filter(function(u) {
    if (!q) return true;
    return u.name.toLowerCase().indexOf(q) !== -1 || (u.tagline || '').toLowerCase().indexOf(q) !== -1;
  });

  var empty = document.getElementById('prog-empty');
  var totalVisible = pg.length + upcoming.length;
  empty.style.display = totalVisible ? 'none' : 'flex';
  empty.querySelector && (empty.querySelector('.esub') || {}).textContent && (empty.querySelector('.esub').textContent = q ? 'No programs match "' + q + '"' : 'Upload a PDF or create a program manually');
  if (!totalVisible) { pl.innerHTML = ''; return; }

  // Render available programs
  var availableHtml = pg.map(function(p) {
    var pc = p.phases && p.phases.length || 0;
    var dots = '';
    for (var i = 0; i < Math.max(pc, 4); i++) dots += '<span class="pdot' + (i < pc ? ' on' : '') + '"></span>';
    var ban = p.source === 'builtin' ? 'bm' : p.source === 'ai' ? 'bai' : 'bdef';

    var progClass = '';
    if (p.name.includes('Strong') || p.name.includes('Strength')) progClass = ' prog-strong';
    else if (p.name.includes('Hypertrophy')) progClass = ' prog-hypertrophy';
    else if (p.name.includes('Balance')) progClass = ' prog-balance';
    else if (p.name.includes('Deload')) progClass = ' prog-deload';
    else if (p.name.includes('Mobility')) progClass = ' prog-mobility';
    else if (p.name.includes('HIIT')) progClass = ' prog-hiit';
    else if (p.name.includes('Resilience')) progClass = ' prog-resilience';

    var categoryBadge = '';
    var isCoreProgram = p.name.includes('Strength') || p.name.includes('Strong') || p.name.includes('Hypertrophy') || p.name.includes('Balance') || p.name.includes('Deload');
    if (isCoreProgram) {
      categoryBadge = '<span class="prog-category core-cycle">&#128260; Core Cycle</span>';
    } else {
      categoryBadge = '<span class="prog-category standalone">&#11088; Standalone</span>';
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

  // Render coming soon cards
  var upcomingHtml = upcoming.length
    ? '<div class="cs-section-label">Coming Soon</div>'
      + upcoming.map(function(u) {
          var label = fmtRelease(u.releaseDate);
          var accent = u.accentColor || '#888';
          return '<div class="prog-card prog-card-cs">'
            + '<span class="prog-banner" style="background:linear-gradient(90deg,' + accent + '22,' + accent + '55,' + accent + '22);"></span>'
            + '<div class="prog-body">'
            + '<div class="prog-title-row"><span class="prog-category prog-cat-cs">&#128274; ' + esc(label) + '</span></div>'
            + '<div class="prog-title prog-title-cs">' + esc(u.name) + '</div>'
            + '<div class="prog-desc">' + esc(u.tagline || '') + '</div>'
            + '<div class="prog-tags">'
            + (u.difficulty ? '<span class="prog-tag">' + esc(u.difficulty) + '</span>' : '')
            + (u.duration ? '<span class="prog-tag">' + esc(u.duration) + '</span>' : '')
            + '</div></div>'
            + '<div class="prog-foot prog-foot-cs">'
            + '<span class="cs-unlock-label" style="color:' + accent + '">&#128336; ' + esc(label) + '</span>'
            + '<span class="cs-notify-hint">Check back soon</span>'
            + '</div>'
            + '</div>';
        }).join('')
    : '';

  pl.innerHTML = availableHtml + upcomingHtml;
}

// ===== PROGRAM DETAIL =====
function openProg(id) {
  curPid = id;
  var p = allProgs().filter(function(x){ return x.id === id; })[0];
  if (!p) return;
  document.getElementById('pd-title').textContent = p.name;
  document.getElementById('pd-desc').textContent = p.description || '';
  document.getElementById('pd-bc').textContent = p.name;

  // Show activate button for non-corrective programs
  var activateBtn = document.getElementById('pd-activate-btn');
  if (activateBtn && p.type !== 'corrective') {
    var isActive = localStorage.getItem('currentProgram') === id;
    activateBtn.textContent = isActive ? '↺ Restart from Week 1' : '► Start Program';
    activateBtn.style.display = 'inline-flex';
  } else if (activateBtn) {
    activateBtn.style.display = 'none';
  }

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

function activateProgram(progId) {
  var p = allProgs().find(function(x){ return x.id === progId; });
  if (!p) return;
  localStorage.setItem('currentProgram', progId);
  localStorage.setItem('currentWeek', '1');
  localStorage.setItem('currentDay', '0');
  if (typeof saveActiveProgramToCloud === 'function') {
    saveActiveProgramToCloud(progId, 1, 0).catch(function(){});
  }
  // Update button to reflect active state
  var activateBtn = document.getElementById('pd-activate-btn');
  if (activateBtn) activateBtn.textContent = '↺ Restart from Week 1';
  showView('dashboard');
  rDash();
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

// ===== FOCUS AREA PICKER =====
// Some program days (e.g. Kinetiq Balance Phase 3) let the user pick one body
// part to add 2 extra exercises for. day.focusOptions holds the menu; if a
// day has no focusOptions, onProceed fires immediately with an empty list.
var pendingFocusPicker = null;

function maybeOpenFocusPicker(day, onProceed) {
  if (!day.focusOptions || !day.focusOptions.length) { onProceed([]); return; }
  pendingFocusPicker = { options: day.focusOptions, onProceed: onProceed };
  var list = document.getElementById('focus-picker-list');
  if (list) {
    list.innerHTML = day.focusOptions.map(function(opt) {
      var exNames = opt.exercises.map(function(e) { return e.name; }).join(' + ');
      return '<button class="focus-pick-btn" onclick="pickFocusArea(\'' + esc(opt.area.replace(/'/g, "\\'")) + '\')">'
        + '<span class="focus-pick-area">' + esc(opt.area) + '</span>'
        + '<span class="focus-pick-ex">' + esc(exNames) + '</span>'
        + '</button>';
    }).join('');
  }
  openM('focus-picker-modal');
}

function pickFocusArea(areaName) {
  if (!pendingFocusPicker) return;
  var opt = pendingFocusPicker.options.filter(function(o) { return o.area === areaName; })[0];
  var onProceed = pendingFocusPicker.onProceed;
  pendingFocusPicker = null;
  closeM('focus-picker-modal');
  onProceed(opt ? opt.exercises : []);
}

// ===== ACTIVE WORKOUT =====
function startPW(pid, phi, wi, di) {
  var p = allProgs().filter(function(x){ return x.id === pid; })[0];
  if (!p) return;
  var wk = p.phases && p.phases[phi] && p.phases[phi].weeks && p.phases[phi].weeks[wi];
  var day = wk && wk.days && wk.days[di];
  if (!day) return;

  maybeOpenFocusPicker(day, function(extraEx) {
    var exercises = (day.exercises || []).filter(function(e) {
      return e.notes !== 'separator' && e.name.indexOf('—') !== 0;
    }).concat(extraEx).map(function(e) {
      var s = Math.max(parseInt(e.sets) || 2, 1);
      return {
        id: uid(), name: e.name, tS: s, tR: e.reps || '—', tW: e.weight || '', notes: e.notes || '',
        sets: Array.from({length: s}, function(_, i) { return {num: i+1, w: '', r: '', done: false}; })
      };
    });
    launch({name: day.name, meta: p.name + ' · ' + p.phases[phi].name, exercises: exercises});
  });
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
  if (!exercises.length) { toast('Add at least one exercise', 'error'); return; }
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
      + '<div class="ex-notes-section" id="notes-' + e.id + '" style="display:none;margin-top:8px;padding:8px;background:var(--bg2);border-radius:6px">'
      + '<textarea class="fi" id="notes-input-' + e.id + '" placeholder="Add notes... (e.g., Left shoulder tight, Felt easy, Struggled on last set)" style="min-height:60px;font-size:13px;resize:vertical">' + esc(e.workoutNotes || '') + '</textarea>'
      + '<div style="display:flex;gap:6px;margin-top:6px">'
      + '<button class="btn-p btn-sm" onclick="saveExNotes(\'' + e.id + '\')" style="flex:1">Save Note</button>'
      + '<button class="btn-s btn-sm" onclick="toggleExNotes(\'' + e.id + '\')">Cancel</button>'
      + '</div></div>'
      + '<button class="btn-s btn-sm" onclick="toggleExNotes(\'' + e.id + '\')" style="width:100%;margin-top:6px;font-size:12px">'
      + (e.workoutNotes ? '📝 Edit Note' : '📝 Add Note')
      + '</button>'
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
    if (b) {
      b.classList.toggle('done', s.done);
      b.innerHTML = s.done ? '&#10003;' : 'Done';
      if (s.done) { b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); }
    }
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

function toggleExNotes(eid) {
  var section = document.getElementById('notes-' + eid);
  if (section) {
    var isVisible = section.style.display !== 'none';
    section.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
      // Focus on textarea when opening
      var input = document.getElementById('notes-input-' + eid);
      if (input) setTimeout(function() { input.focus(); }, 100);
    }
  }
}

function saveExNotes(eid) {
  var e = aw && aw.exercises.filter(function(x){ return x.id === eid; })[0];
  if (!e) return;
  var input = document.getElementById('notes-input-' + eid);
  if (input) {
    e.workoutNotes = input.value.trim();
    toggleExNotes(eid);
    renderAW(); // Re-render to update button text
  }
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
      return {
        name: e.name, 
        sets: e.sets.filter(function(s){ return s.done; }).map(function(s){ return {weight: s.w, reps: s.r}; }),
        notes: e.workoutNotes || ''
      };
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
  
  // Check for achievement unlocks
  if (typeof checkAchievements === 'function') {
    setTimeout(function() {
      checkAchievements();
    }, 500); // Small delay so notification appears after workout finishes
  }
  
  // Advance active program position
  if (aw.apProgId) {
    var nextDay  = aw.apDay + 1;
    var nextWeek = aw.apWeek;
    if (aw.apDaysInWeek > 0 && nextDay >= aw.apDaysInWeek) {
      nextDay  = 0;
      nextWeek = nextWeek + 1;
    }
    localStorage.setItem('currentDay',  String(nextDay));
    localStorage.setItem('currentWeek', String(nextWeek));
    if (typeof saveActiveProgramToCloud === 'function') {
      saveActiveProgramToCloud(aw.apProgId, nextWeek, nextDay).catch(function(){});
    }
  }

  // Auto-sync to cloud if logged in
  if (typeof syncDataToCloud === 'function') {
    syncDataToCloud().catch(function(err) {
      console.error('Auto-sync failed:', err);
    });
  }

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
      var notesHtml = e.notes ? '<div class="h-ex-notes">📝 ' + esc(e.notes) + '</div>' : '';
      return '<div class="h-ex"><div class="h-ex-n">' + esc(e.name) + '</div><div class="h-ex-s">' + esc(ss) + '</div>' + notesHtml + '</div>';
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
  drawBars(c, s.map(function(w){ return w.volume||0; }), s.map(function(w){ return fd(w.date); }), '#00e5b8');
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
  var W = cv.width, H = cv.height, pt = 12, pr = 12, pb = 32, pl = 42; // Increased pb from 28 to 32
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
    
    // Labels - HORIZONTAL, no rotation
    if (data.length <= 12) {
      ctx.fillStyle = '#8888a8'; 
      ctx.font = '10px sans-serif'; 
      ctx.textAlign = 'center';
      ctx.fillText(labels[i] || '', x + bw/2, H-12); // More space from bottom
    }
  });
}
function drawLine(cv, data, labels, color) {
  cv.width = cv.offsetWidth || 300; cv.height = 200;
  var ctx = cv.getContext('2d');
  var W = cv.width, H = cv.height, pt = 12, pr = 12, pb = 32, pl = 46; // Increased pb from 28 to 32
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
  
  // Labels - HORIZONTAL, no rotation
  if (data.length <= 12) {
    pts.forEach(function(p, i){ 
      ctx.fillStyle='#8888a8'; 
      ctx.font='10px sans-serif'; 
      ctx.textAlign='center';
      ctx.fillText(labels[i]||'', p.x, H-12); // More space from bottom
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
    toast('Upload error: ' + err.message, 'error');
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
  var dl = document.getElementById('ex-name-list');
  if (dl) dl.innerHTML = collectExercises().map(function(e) { return '<option value="' + esc(e.name) + '">'; }).join('');
  addER(); addER();
  openM('ql-modal');
}
function addER() {
  var d = document.createElement('div');
  d.className = 'erb-row';
  d.innerHTML = '<input class="fi en" list="ex-name-list" placeholder="Exercise name" autocomplete="off" style="font-size:15px">'
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
  if (!name) { toast('Enter a program name', 'error'); return; }
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
    toast('Please fill in all fields', 'error');
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
    toast('Enter valid weight and reps', 'error');
    return;
  }
  
  if (reps > 12) {
    toast('Most accurate for 1-12 reps', 'info');
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
    toast('Enter at least your weight', 'error');
    return;
  }
  
  var measurement = {
    id: uid(),
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
  if (typeof syncBodyMeasurementsToCloud === 'function') syncBodyMeasurementsToCloud().catch(function(){});

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

// ===== EXPORT DATA =====
function downloadCSV(filename, rows) {
  var csv = rows.map(function(r) {
    return r.map(function(cell) {
      var s = String(cell == null ? '' : cell);
      return (s.indexOf(',') >= 0 || s.indexOf('"') >= 0 || s.indexOf('\n') >= 0)
        ? '"' + s.replace(/"/g, '""') + '"' : s;
    }).join(',');
  }).join('\n');
  var blob = new Blob([csv], {type: 'text/csv'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

function exportWorkouts() {
  if (!hist.length) { toast('No workout history to export', 'error'); return; }
  var rows = [['Date', 'Workout', 'Duration (min)', 'Volume (lbs)', 'Exercises']];
  hist.forEach(function(w) {
    var exStr = (w.exercises || []).map(function(e) {
      var sets = (e.sets || []).map(function(s) { return s.weight + 'x' + s.reps; }).join(', ');
      return e.name + ': ' + sets;
    }).join(' | ');
    rows.push([
      new Date(w.date).toLocaleDateString(),
      w.name,
      w.duration ? Math.round(w.duration / 60) : '',
      w.volume || 0,
      exStr
    ]);
  });
  downloadCSV('kinetiq-workouts.csv', rows);
}

function exportPRs() {
  var keys = Object.keys(prs);
  if (!keys.length) { toast('No personal records to export', 'error'); return; }
  var rows = [['Exercise', 'Weight (lbs)', 'Reps', 'Volume (lbs)', 'Date']];
  keys.sort().forEach(function(k) {
    var p = prs[k];
    rows.push([k, p.weight, p.reps, p.volume, p.date ? new Date(p.date).toLocaleDateString() : '']);
  });
  downloadCSV('kinetiq-prs.csv', rows);
}

function exportMeasurements() {
  if (!measurements.length) { toast('No measurements to export', 'error'); return; }
  var rows = [['Date', 'Weight (lbs)', 'Body Fat (%)', 'Waist (in)', 'Chest (in)', 'Arms (in)', 'Thighs (in)']];
  measurements.forEach(function(m) {
    rows.push([
      m.date ? new Date(m.date).toLocaleDateString() : '',
      m.weight || '',
      m.bodyFat || '',
      m.waist || '',
      m.chest || '',
      m.arms || '',
      m.thighs || ''
    ]);
  });
  downloadCSV('kinetiq-measurements.csv', rows);
}

function exportNutrition() {
  var rows = [['Date', 'Meal', 'Food', 'Calories', 'Protein (g)', 'Carbs (g)', 'Fat (g)', 'Servings']];
  var today = new Date();
  var found = false;
  for (var i = 0; i < 30; i++) {
    var d = new Date(today);
    d.setDate(d.getDate() - i);
    var dateStr = d.toISOString().split('T')[0];
    var log = JSON.parse(localStorage.getItem('foodLog_' + dateStr) || '[]');
    log.forEach(function(e) {
      if (!e.name) return;
      found = true;
      rows.push([
        new Date(dateStr).toLocaleDateString(),
        e.meal || '',
        e.name,
        e.calories || 0,
        e.protein || 0,
        e.carbs || 0,
        e.fat || 0,
        e.servings || 1
      ]);
    });
  }
  if (!found) { toast('No nutrition logs to export', 'error'); return; }
  downloadCSV('kinetiq-nutrition.csv', rows);
}

// Render measurements when progress tab loads - called from main DOMContentLoaded below
function initNutritionTracking() {
  renderMeasurements();
  loadNutritionGoals();
  renderFoodLog();
  renderFrequentFoods();
  renderFavorites();
  renderMealTemplates();
  loadWaterGoal();
  renderWaterProgress();
  renderSavedRecipes();
}

// kinetiqFoods is defined in foods-db.js (loaded before app.js)

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
    toast('Enter a recipe name', 'error');
    return;
  }
  
  if (!currentRecipe.ingredients.length) {
    toast('Add at least one ingredient', 'error');
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
  toast('Recipe saved!', 'success');
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
  toast('Recipe logged!', 'success');
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
  if (typeof syncWaterLogsToCloud === 'function') syncWaterLogsToCloud().catch(function(){});
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
    toast('Goal must be 8-300 oz', 'error');
    return;
  }
  
  waterGoal = newGoal;
  localStorage.setItem('waterGoal', waterGoal);
  renderWaterProgress();
  if (typeof syncWaterLogsToCloud === 'function') syncWaterLogsToCloud().catch(function(){});
  toast('Water goal saved!', 'success');
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
    toast('Enter a search term', 'error');
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
  if (typeof syncNutritionGoalsToCloud === 'function') syncNutritionGoalsToCloud().catch(function(){});
  toast('Goals saved!', 'success');
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
  if (typeof syncTodaysFoodLogToCloud === 'function') syncTodaysFoodLogToCloud().catch(function(){});
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
  if (typeof syncFavoriteFoodsToCloud === 'function') syncFavoriteFoodsToCloud().catch(function(){});
}

function isFavorite(foodName) {
  return favoriteFoods.some(function(f) { return f.name === foodName; });
}

function getFrequentFoods() {
  var counts = {};
  var today = new Date();
  for (var i = 0; i < 30; i++) {
    var d = new Date(today);
    d.setDate(d.getDate() - i);
    var dateStr = d.toISOString().split('T')[0];
    var log = JSON.parse(localStorage.getItem('foodLog_' + dateStr) || '[]');
    log.forEach(function(f) {
      if (!f.name) return;
      var key = f.name.toLowerCase();
      if (!counts[key]) counts[key] = { name: f.name, cals: f.cals, protein: f.protein, carbs: f.carbs, fat: f.fat, count: 0 };
      counts[key].count++;
    });
  }
  return Object.keys(counts).map(function(k) { return counts[k]; })
    .filter(function(f) { return f.count >= 2; })
    .sort(function(a, b) { return b.count - a.count; })
    .slice(0, 8);
}

function renderFrequentFoods() {
  var card = document.getElementById('frequent-foods-card');
  var list = document.getElementById('frequent-foods-list');
  if (!card || !list) return;

  var frequent = getFrequentFoods();
  if (!frequent.length) {
    card.style.display = 'none';
    return;
  }

  card.style.display = 'block';
  list.innerHTML = frequent.map(function(f) {
    return '<div class="food-result-item">'
      + '<div style="flex: 1;"><div class="food-result-name">' + esc(f.name) + '</div>'
      + '<div class="food-result-macros">' + f.cals + ' cal • P: ' + f.protein + 'g C: ' + f.carbs + 'g F: ' + f.fat + 'g</div></div>'
      + '<button class="food-result-add" onclick="addFrequentFood(\'' + esc(f.name.replace(/'/g, "\\'")) + '\',' + f.cals + ',' + f.protein + ',' + f.carbs + ',' + f.fat + ')">+ Add</button>'
      + '</div>';
  }).join('');
}

function addFrequentFood(name, cals, protein, carbs, fat) {
  var entry = { id: uid(), name: name, cals: cals, protein: protein, carbs: carbs, fat: fat, time: new Date().toISOString() };
  foodLog.push(entry);
  saveFoodLog();
  renderFoodLog();
  updateNutritionSummary();
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
    toast('Log some foods first', 'error');
    return;
  }
  document.getElementById('save-meal-modal').classList.add('show');
  document.getElementById('meal-name-input').value = '';
}

function saveMealTemplate() {
  var name = document.getElementById('meal-name-input').value.trim();
  if (!name) {
    toast('Enter a meal name', 'error');
    return;
  }
  
  if (!foodLog.length) {
    toast('No foods to save', 'error');
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
  toast('Meal template saved!', 'success');
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
  toast('Meal logged!', 'success');
}

function deleteMealTemplate(templateId) {
  if (!confirm('Delete this meal template?')) return;
  
  mealTemplates = mealTemplates.filter(function(t) { return t.id !== templateId; });
  localStorage.setItem('mealTemplates', JSON.stringify(mealTemplates));
  renderMealTemplates();
}
