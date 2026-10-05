import { BLOOD_GROUPS, KERALA_DISTRICTS } from "../data/districts.js";
import { findDonors } from "../data/donors.js";

export function renderEmergency() {
  return `
    <section class="shell page-head page-head--urgent">
      <span class="eyebrow eyebrow--urgent">Emergency Request</span>
      <h1>Submit urgent blood requirement</h1>
      <p>Hospitals and patients can submit a request here. It is immediately matched against verified donors and routed to your district coordinator.</p>
    </section>

    <section class="shell emergency-grid">
      <form class="card emergency-form" id="emergency-form" novalidate>
        <div class="field-row">
          <div class="field">
            <label for="patientName">Patient name</label>
            <input id="patientName" name="patientName" type="text" required placeholder="Full name" />
          </div>
          <div class="field">
            <label for="bloodGroup">Required blood group</label>
            <select id="bloodGroup" name="bloodGroup" required>
              <option value="" disabled selected>Select group</option>
              ${BLOOD_GROUPS.map((g) => `<option value="${g}">${g}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="hospital">Hospital</label>
            <input id="hospital" name="hospital" type="text" required placeholder="e.g. Govt. Medical College" />
          </div>
          <div class="field">
            <label for="district">District / location</label>
            <select id="district" name="district" required>
              <option value="" disabled selected>Select district</option>
              ${KERALA_DISTRICTS.map((d) => `<option value="${d}">${d}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="units">Units required</label>
            <input id="units" name="units" type="number" min="1" max="20" required value="1" />
          </div>
          <div class="field">
            <label for="contact">Emergency contact number</label>
            <input id="contact" name="contact" type="tel" required placeholder="+91" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Find matching donors now</button>
      </form>

      <aside class="emergency-results" aria-live="polite">
        <div id="emergency-placeholder" class="card emergency-placeholder">
          <span class="eyebrow">Matches appear here</span>
          <p>Fill the form and submit to see verified donors in that district, sorted by availability.</p>
        </div>
        <div id="emergency-matches" class="emergency-matches" hidden></div>
      </aside>
    </section>
  `;
}

function matchCard(donor) {
  return `
    <div class="card match-card ${donor.available ? "" : "match-card--dim"}">
      <span class="blood-chip">${donor.bloodGroup}</span>
      <div class="match-card__body">
        <strong>${donor.name}</strong>
        <span class="cell-sub">${donor.district} · Verified by ${donor.verifiedBy}</span>
      </div>
      ${
        donor.available
          ? `<a class="btn btn-sm btn-primary" href="tel:${donor.phone.replace(/\s/g, "")}">Call now</a>`
          : `<span class="badge badge-unavailable">Resting</span>`
      }
    </div>
  `;
}

export function bindEmergencyEvents(root) {
  const form = root.querySelector("#emergency-form");
  const placeholder = root.querySelector("#emergency-placeholder");
  const matches = root.querySelector("#emergency-matches");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const bloodGroup = data.get("bloodGroup");
    const district = data.get("district");
    const results = findDonors({ bloodGroup, district });

    placeholder.hidden = true;
    matches.hidden = false;

    const availableCount = results.filter((d) => d.available).length;
    const heading = `
      <div class="emergency-matches__head">
        <h2>${results.length} verified ${bloodGroup} donor${results.length === 1 ? "" : "s"} in ${district}</h2>
        <span class="badge ${availableCount ? "badge-available" : "badge-unavailable"}">${availableCount} available now</span>
      </div>
    `;

    if (results.length === 0) {
      matches.innerHTML = `
        ${heading}
        <div class="card emergency-placeholder">
          <p>No direct match in ${district} yet. Your request has been flagged as <strong>high priority</strong> and routed to the nearest coordinator network for cross-district matching.</p>
        </div>
      `;
      return;
    }

    matches.innerHTML = `${heading}${results.map(matchCard).join("")}`;
  });
}
