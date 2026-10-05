import { COORDINATORS, DONORS, daysSince } from "../data/donors.js";

const MOCK_REQUESTS = [
  { id: "R-3301", patient: "K. Suresh Babu", bloodGroup: "O-", hospital: "Govt. Medical College, Ernakulam", district: "Ernakulam", units: 2, urgency: "critical", receivedAgo: "12 min ago" },
  { id: "R-3302", patient: "Meera S.", bloodGroup: "B+", hospital: "KIMS, Thiruvananthapuram", district: "Thiruvananthapuram", units: 1, urgency: "urgent", receivedAgo: "47 min ago" },
  { id: "R-3303", patient: "Thomas Jacob", bloodGroup: "A+", hospital: "Aster MIMS, Kozhikode", district: "Kozhikode", units: 3, urgency: "scheduled", receivedAgo: "2 hr ago" },
];

function urgencyBadge(level) {
  if (level === "critical") return `<span class="badge badge-urgent">Critical</span>`;
  if (level === "urgent") return `<span class="badge badge-warn">Urgent</span>`;
  return `<span class="badge badge-available">Scheduled</span>`;
}

function requestRow(req) {
  return `
    <tr>
      <td><span class="blood-chip blood-chip-sm">${req.bloodGroup}</span></td>
      <td>
        <strong>${req.patient}</strong>
        <div class="cell-sub">${req.hospital}</div>
      </td>
      <td>${req.district}</td>
      <td>${req.units}</td>
      <td>${urgencyBadge(req.urgency)}</td>
      <td class="cell-sub">${req.receivedAgo}</td>
      <td><button class="btn btn-sm btn-primary" type="button">Assign donor</button></td>
    </tr>
  `;
}

function donorRow(donor) {
  return `
    <tr>
      <td><span class="blood-chip blood-chip-sm">${donor.bloodGroup}</span></td>
      <td><strong>${donor.name}</strong><div class="cell-sub">${donor.id}</div></td>
      <td>${donor.district}</td>
      <td>${donor.phone}</td>
      <td>${daysSince(donor.lastDonation)} days ago</td>
      <td>
        <label class="switch">
          <input type="checkbox" ${donor.available ? "checked" : ""} data-donor-id="${donor.id}" />
          <span>${donor.available ? "Available" : "Resting"}</span>
        </label>
      </td>
    </tr>
  `;
}

function renderLoginForm() {
  return `
    <section class="shell login-shell">
      <form class="card login-form" id="coordinator-login">
        <span class="eyebrow">Coordinator Login</span>
        <h1>Sign in to your district dashboard</h1>
        <div class="field">
          <label for="coordinatorId">Coordinator ID</label>
          <input id="coordinatorId" name="coordinatorId" type="text" placeholder="e.g. C-EKM-01" required />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input id="password" name="password" type="password" placeholder="••••••••" required />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Sign in</button>
        <p class="login-hint">Demo access &mdash; use any ID from the list below, any password.</p>
        <ul class="login-demo-list">
          ${COORDINATORS.map((c) => `<li><code>${c.id}</code> &middot; ${c.name} (${c.district})</li>`).join("")}
        </ul>
      </form>
    </section>
  `;
}

function renderDashboard(coordinator) {
  const myDonors = DONORS.filter((d) => d.verifiedBy === coordinator.id);
  const networkNames = coordinator.network
    .map((id) => COORDINATORS.find((c) => c.id === id))
    .filter(Boolean);

  return `
    <section class="shell coordinator-head">
      <div>
        <span class="eyebrow">Coordinator Dashboard</span>
        <h1>${coordinator.name} <span class="coordinator-head__district">· ${coordinator.district}</span></h1>
      </div>
      <button class="btn" id="coordinator-logout" type="button">Sign out</button>
    </section>

    <section class="shell coordinator-stats">
      <div class="card stat-card">
        <strong>${myDonors.length}</strong>
        <span>Donors you manage</span>
      </div>
      <div class="card stat-card">
        <strong>${myDonors.filter((d) => d.available).length}</strong>
        <span>Available right now</span>
      </div>
      <div class="card stat-card">
        <strong>${MOCK_REQUESTS.length}</strong>
        <span>Active emergency requests</span>
      </div>
      <div class="card stat-card">
        <strong>${networkNames.length}</strong>
        <span>Connected coordinators</span>
      </div>
    </section>

    <section class="shell coordinator-section">
      <div class="coordinator-section__head">
        <h2>Active emergency requests</h2>
      </div>
      <div class="table-wrap card">
        <table class="data-table">
          <thead>
            <tr><th>Group</th><th>Patient / Hospital</th><th>District</th><th>Units</th><th>Urgency</th><th>Received</th><th></th></tr>
          </thead>
          <tbody>${MOCK_REQUESTS.map(requestRow).join("")}</tbody>
        </table>
      </div>
    </section>

    <section class="shell coordinator-section">
      <div class="coordinator-section__head">
        <h2>Your verified donors</h2>
        <span class="cell-sub">Toggle availability as donors update you</span>
      </div>
      <div class="table-wrap card">
        <table class="data-table">
          <thead>
            <tr><th>Group</th><th>Donor</th><th>District</th><th>Contact</th><th>Last donation</th><th>Status</th></tr>
          </thead>
          <tbody>${myDonors.length ? myDonors.map(donorRow).join("") : `<tr><td colspan="6" class="empty-row">No donors assigned to this coordinator yet.</td></tr>`}</tbody>
        </table>
      </div>
    </section>

    <section class="shell coordinator-section">
      <div class="coordinator-section__head">
        <h2>Nearby coordinator network</h2>
        <span class="cell-sub">Reach out when your district can't fulfil a request</span>
      </div>
      <div class="coordinator-network">
        ${
          networkNames.length
            ? networkNames
                .map(
                  (c) => `
            <div class="card network-card">
              <strong>${c.name}</strong>
              <span class="cell-sub">${c.district} · ${c.id}</span>
              <a class="btn btn-sm" href="tel:${c.phone.replace(/\s/g, "")}">Call coordinator</a>
            </div>
          `
                )
                .join("")
            : `<p class="cell-sub">No linked coordinators yet.</p>`
        }
      </div>
    </section>
  `;
}

export function renderCoordinator() {
  return `<div id="coordinator-root">${renderLoginForm()}</div>`;
}

export function bindCoordinatorEvents(root) {
  const mount = root.querySelector("#coordinator-root");

  function showLogin() {
    mount.innerHTML = renderLoginForm();
    bindLogin();
  }

  function bindLogin() {
    const form = mount.querySelector("#coordinator-login");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = form.coordinatorId.value.trim().toUpperCase();
      const coordinator = COORDINATORS.find((c) => c.id === id);
      if (!coordinator) {
        form.coordinatorId.setCustomValidity("Unknown coordinator ID — try one from the demo list below.");
        form.coordinatorId.reportValidity();
        return;
      }
      form.coordinatorId.setCustomValidity("");
      mount.innerHTML = renderDashboard(coordinator);
      bindDashboard();
    });
  }

  function bindDashboard() {
    const logout = mount.querySelector("#coordinator-logout");
    logout.addEventListener("click", showLogin);
    mount.querySelectorAll(".switch input[type=checkbox]").forEach((input) => {
      input.addEventListener("change", () => {
        const label = input.nextElementSibling;
        label.textContent = input.checked ? "Available" : "Resting";
      });
    });
  }

  bindLogin();
}
