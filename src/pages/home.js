import { DONORS } from "../data/donors.js";
import { BLOOD_GROUPS, KERALA_DISTRICTS } from "../data/districts.js";

function stat(value, label) {
  return `
    <div class="stat">
      <strong>${value}</strong>
      <span>${label}</span>
    </div>
  `;
}

export function renderHome() {
  const availableCount = DONORS.filter((d) => d.available).length;
  const districtsCovered = new Set(DONORS.map((d) => d.district)).size;

  return `
    <section class="hero">
      <div class="shell hero__inner">
        <div class="hero__copy">
          <span class="eyebrow">Coordinator-verified · 14 districts · Kerala</span>
          <h1>Find the right blood, from people who already checked.</h1>
          <p class="hero__lede">
            Raktha connects patients and hospitals to a trusted network of verified donors
            through local coordinators — so during an emergency, you are calling someone
            real, not guessing from an open list.
          </p>
          <div class="hero__actions">
            <a href="#/find" class="btn btn-primary" data-nav-link>Find Blood Now</a>
            <a href="#/emergency" class="btn" data-nav-link>Raise Emergency Request</a>
          </div>
          <div class="hero__stats">
            ${stat(DONORS.length, "verified donors")}
            ${stat(availableCount, "available today")}
            ${stat(districtsCovered, "districts covered")}
          </div>
        </div>
        <aside class="hero__panel card" aria-label="Quick blood group reference">
          <h2 class="hero__panel-title">Blood group quick reference</h2>
          <div class="chip-grid">
            ${BLOOD_GROUPS.map(
              (g) => `<span class="blood-chip blood-chip-sm" title="${g}">${g}</span>`
            ).join("")}
          </div>
          <p class="hero__panel-note">
            O− donors are universal — the network currently holds
            <strong>${DONORS.filter((d) => d.bloodGroup === "O-").length}</strong> verified O− records.
          </p>
        </aside>
      </div>
    </section>

    <section class="shell actions-grid">
      <a class="action-card" href="#/find" data-nav-link>
        <span class="action-card__icon" aria-hidden="true">&#128269;</span>
        <h3>Find Blood</h3>
        <p>Search verified donors by blood group, district, and urgency.</p>
      </a>
      <a class="action-card" href="#/register" data-nav-link>
        <span class="action-card__icon" aria-hidden="true">&#128221;</span>
        <h3>Donor Registration</h3>
        <p>Register as a donor — your coordinator verifies and activates your profile.</p>
      </a>
      <a class="action-card" href="#/coordinator" data-nav-link>
        <span class="action-card__icon" aria-hidden="true">&#128100;</span>
        <h3>Coordinator Login</h3>
        <p>Manage your district's donor records and respond to active requests.</p>
      </a>
      <a class="action-card action-card--urgent" href="#/emergency" data-nav-link>
        <span class="action-card__icon" aria-hidden="true">&#9888;</span>
        <h3>Emergency Request</h3>
        <p>Hospitals and patients: submit urgent requirements for immediate matching.</p>
      </a>
    </section>

    <section class="shell availability-strip">
      <div class="availability-strip__head">
        <h2>Live Blood Availability</h2>
        <a href="#/find" data-nav-link class="link-arrow">View full list &rarr;</a>
      </div>
      <div class="table-wrap card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Group</th>
              <th>District</th>
              <th>Verified donors</th>
              <th>Available now</th>
            </tr>
          </thead>
          <tbody>
            ${BLOOD_GROUPS.map((group) => {
              const inGroup = DONORS.filter((d) => d.bloodGroup === group);
              const available = inGroup.filter((d) => d.available).length;
              const districts = new Set(inGroup.map((d) => d.district));
              return `
                <tr>
                  <td><span class="blood-chip blood-chip-sm">${group}</span></td>
                  <td>${districts.size ? Array.from(districts).slice(0, 2).join(", ") + (districts.size > 2 ? ` +${districts.size - 2}` : "") : "—"}</td>
                  <td>${inGroup.length}</td>
                  <td>${
                    available > 0
                      ? `<span class="badge badge-available">${available} ready</span>`
                      : `<span class="badge badge-unavailable">None free</span>`
                  }</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </section>

    <section class="shell how-it-works">
      <h2>How the coordinator network works</h2>
      <ol class="steps">
        <li>
          <span class="steps__index">01</span>
          <h3>District coordinators verify donors</h3>
          <p>Each of Kerala's ${KERALA_DISTRICTS.length} districts has coordinators who personally confirm donor identity, blood group, and availability.</p>
        </li>
        <li>
          <span class="steps__index">02</span>
          <h3>Requests route to the right people</h3>
          <p>An emergency request is matched against verified records in that district first, then nearby districts through the coordinator network.</p>
        </li>
        <li>
          <span class="steps__index">03</span>
          <h3>Coordinators make the call</h3>
          <p>Instead of patients cold-calling strangers, coordinators reach out to confirmed donors directly — faster and more reliable.</p>
        </li>
      </ol>
    </section>
  `;
}
