# TRAINER DASHBOARD — Complete Feature Specification

**Phase:** Phase 2 (Community & Monetization)
**Subscription Tier:** Trainer Tier ($29–49/month)
**Max Clients:** 20 per trainer
**Status:** Database table exists in Supabase. Implementation waiting for go-ahead.

> Recovered/rebuilt 2026-05-23 from prior chat history during the move to Claude Code.

---

## 📋 FEATURE OVERVIEW

The Trainer Dashboard lets fitness trainers:
- Manage up to 20 clients
- Assign Kinetiq programs to clients
- View client workout history and progress
- Monitor client PRs and streaks
- Track client compliance/consistency
- Send check-ins or encouragement (Phase 3)

**Key differentiator:** This is NOT a full coaching platform (like TrueCoach). It's a lightweight add-on for trainers who want their clients using Kinetiq with some oversight.

---

## 🗄️ DATABASE STRUCTURE

### Table: `trainer_clients` (already created in Supabase, RLS configured)
Tracks the trainer ↔ client relationship.

Fields (as used by the queries below):
- `trainer_id` — the trainer's user id
- `client_id` — the client's user id
- `status` — `pending` | `active` | `cancelled`
- (timestamps as standard)

Related tables read by the dashboard: `profiles`, `workouts`, `personal_records`, `streaks`, `active_programs`, `programs`.

---

## 🔌 CORE FUNCTIONS (reference implementation)

```javascript
// Fetch a single client's detail bundle
async function getClientDetails(clientId) {
  const profile = await supabaseClient
    .from('profiles').select('*').eq('id', clientId).single();

  const workouts = await supabaseClient
    .from('workouts').select('*')
    .eq('user_id', clientId)
    .order('completed_at', { ascending: false })
    .limit(10);

  const prs = await supabaseClient
    .from('personal_records').select('*')
    .eq('user_id', clientId)
    .order('achieved_at', { ascending: false })
    .limit(10);

  const streak = await supabaseClient
    .from('streaks').select('*').eq('user_id', clientId).single();

  const activeProgram = await supabaseClient
    .from('active_programs')
    .select('*, program:programs(*)')
    .eq('user_id', clientId)
    .eq('is_active', true)
    .single();

  return {
    profile: profile.data,
    workouts: workouts.data,
    prs: prs.data,
    streak: streak.data,
    activeProgram: activeProgram.data
  };
}

// Assign a program to a client
async function assignProgramToClient(clientId, programId) {
  // Deactivate current program(s)
  await supabaseClient
    .from('active_programs')
    .update({ is_active: false })
    .eq('user_id', clientId)
    .eq('is_active', true);

  // Create the new active program (starts from the beginning)
  const { error } = await supabaseClient
    .from('active_programs')
    .insert({
      user_id: clientId,
      program_id: programId,
      current_week: 1,
      current_day: 1,
      is_active: true
    });

  if (!error) {
    // TODO: notify client (Phase 3)
    alert('Program assigned successfully!');
  }
}

// Invite a client by email
async function inviteClient(email) {
  const { data: profile } = await supabaseClient
    .from('profiles').select('id').eq('email', email).single();

  if (!profile) {
    alert('Client not found. Send them an invite to join Kinetiq first.');
    return;
  }

  const { error } = await supabaseClient
    .from('trainer_clients')
    .insert({
      trainer_id: (await supabaseClient.auth.getUser()).data.user.id,
      client_id: profile.id,
      status: 'pending'
    });

  if (!error) {
    // TODO: notify client to accept (Phase 3)
    alert('Invitation sent! Client must accept to appear in your list.');
  }
}

// Remove a client
async function removeClient(clientId) {
  if (!confirm('Remove this client from your dashboard?')) return;

  const { error } = await supabaseClient
    .from('trainer_clients')
    .update({ status: 'cancelled' })
    .eq('trainer_id', (await supabaseClient.auth.getUser()).data.user.id)
    .eq('client_id', clientId);

  if (!error) {
    alert('Client removed.');
    renderClientsTab(); // refresh
  }
}

// Subscription / limit gate
function canAddClient() {
  const user = getCurrentUser();
  if (user.subscription_tier !== 'trainer') return false;

  const clientCount = getCurrentClientCount();
  if (clientCount >= 20) {
    alert("You've reached the 20-client limit. Contact us for Enterprise pricing.");
    return false;
  }
  return true;
}
```

---

## 🖥️ UI / HTML

```html
<!-- Bottom Nav Bar -->
<div id="bot-nav">
  <button onclick="navTo('dash')">Dashboard</button>
  <button onclick="navTo('progs')">Programs</button>
  <button onclick="navTo('hist')">History</button>
  <button onclick="navTo('prof')">Profile</button>
  <!-- Only shown if user is a trainer -->
  <button id="clients-tab-btn" onclick="navTo('clients')" style="display:none;">Clients</button>
</div>

<!-- Clients Tab -->
<div id="v-clients" style="display:none;">
  <div class="top-bar">
    <h2>My Clients (<span id="client-count">0</span>/20)</h2>
    <button onclick="showAddClientModal()">+ Add Client</button>
  </div>
  <input type="text" id="client-search" placeholder="🔍 Search clients..."
         oninput="filterClients(this.value)">
  <div id="clients-list"><!-- client cards --></div>
</div>

<!-- Client Detail View (rendered dynamically) -->
<div id="v-client-detail" style="display:none;"></div>

<!-- Add Client Modal -->
<div id="add-client-modal" class="modal" style="display:none;">
  <div class="modal-content">
    <h3>Add Client</h3>
    <input type="email" id="new-client-email" placeholder="client@email.com">
    <button onclick="inviteClient(document.getElementById('new-client-email').value)">Send Invitation</button>
    <button onclick="closeAddClientModal()">Cancel</button>
  </div>
</div>
```

**Client detail view** shows: profile header, recent PRs, progress charts (volume over time, workout frequency), current program, plus "Assign Different Program", "Send Check-In Message" (Phase 3), and "Remove Client".

**Assign Program flow:** modal lists Kinetiq programs as radio options with the current one marked; on confirm → updates `active_programs` (week 1 / day 1), client sees it immediately, toast: "Your trainer assigned you {program}!"

**Add Client flow:** trainer enters client email → system checks `profiles` → if found, creates a `pending` `trainer_clients` row → client must accept (consent required).

---

## 📊 DATA FLOW

```
TRAINER
  │ 1. Opens Clients tab
  ▼
Fetch trainer_clients JOIN profiles (info) JOIN streaks (stats)
  │ 2. Display client list
  ▼
Click client
  │ 3. Fetch detail: workouts(10), personal_records(10), active_programs, streaks
  ▼
Render detail view
  │ 4. Assign Program
  ▼
Update active_programs  → client sees new program in their Programs tab
```

---

## 🚀 IMPLEMENTATION PHASES

### Phase 2A — Basic Dashboard (MVP)
- [x] Database table exists (`trainer_clients`)
- [ ] Show "Clients" tab for trainers only
- [ ] List active clients
- [ ] View client stats (workouts, streak, PRs)
- [ ] Assign programs to clients
- [ ] Add/remove clients

### Phase 2B — Enhanced
- [ ] Client search/filter
- [ ] Sort clients (streak, last workout, name)
- [ ] Bulk actions (assign same program to many)
- [ ] Export client data (CSV)

### Phase 3 — Notifications
- [ ] In-app notification when trainer assigns program
- [ ] Email notifications (optional)
- [ ] "Send Check-In" messaging
- [ ] Client invitation accept/decline flow

---

## 💰 BUSINESS LOGIC

**Upgrade path:**
1. Free user → no Clients tab
2. Paid user ($12–15/mo) → no Clients tab
3. Trainer user ($29–49/mo) → Clients tab appears

**Client limit:** max 20. Show "Clients (12/20)". Disable "+ Add Client" at 20. Over-limit → Enterprise pricing.

**Revenue framing:** each trainer w/ 20 clients = $29–49 MRR; 100 trainers ≈ $2,900–4,900 MRR and ~2,000 users in the ecosystem (sticky network effect — trainers won't leave with 20 clients onboard).

---

## 🔒 PRIVACY

- Trainers CAN see: workouts, PRs, streaks, current program.
- Trainers CANNOT see: nutrition data, body measurements (too personal).
- Clients must accept the trainer invitation (consent required).
- Design philosophy: supportive oversight, not surveillance — clients shouldn't feel "watched."

---

## ✅ TESTING CHECKLIST

**As a trainer:**
- [ ] "Clients" tab appears in bottom nav
- [ ] View client list; click into client detail
- [ ] See client workout history, PRs, current program
- [ ] Assign a different program
- [ ] Add a client by email; remove a client
- [ ] Cannot exceed 20 clients
- [ ] Cannot see client nutrition data

**As a client:**
- [ ] Cannot see "Clients" tab
- [ ] Receives notification when trainer assigns a program
- [ ] New program appears immediately in Programs tab
- [ ] Can accept/decline trainer invitation (Phase 3)

---

## 🎯 FUTURE ENHANCEMENTS (Phase 3+)

Group messaging (trainer → all clients), scheduled/dated program assignments, custom program builder for trainers, auto-generated weekly/monthly progress reports, client-side trainer portal, multi-trainer support, video form reviews, calendar integration for check-ins.

---

**This feature is Phase 2 (after Phase 1 is stable). Database table is ready. Implementation is waiting for go-ahead.**
