import { BLOOD_GROUPS, KERALA_DISTRICTS, URGENCY_LEVELS } from "../data/districts.js";
import { findDonors, daysSince } from "../data/donors.js";

function donorRow(donor) {
  const days = daysSince(donor.lastDonation);
  return `
    <tr>
      <td><span class="blood-chip blood-chip-sm">${donor.bloodGroup}</span></td>
      <td>
        <strong>${donor.name}</strong>
        <div class="cell-sub">${donor.id}</div>
      </td>
      <td>${donor.district}</td>
      <td>${days} days ago</td>
      <td>
        ${
          donor.available
            ? `<span class="badge badge-available">Available</span>`
            : `<span class="badge badge-unavailable">Resting</span>`
        }
      </td>
      <td>
        <a class="btn btn-sm ${donor.available ? "btn-primary" : ""}" href="tel:${donor.phone.replace(/\s/g, "")}">
          ${donor.available ? "Call donor" : "Contact coordinator"}
        </a>
      </td>
    </tr>
  `;
}

export function renderFind() {
  return `
    <section class="shell page-head">
      <span class="eyebrow">Find Blood</span>
      <h1>Search the verified donor network</h1>
      <p>Filter by blood group, district, and urgency to see matching donors, confirmed by local coordinators.</p>
    </section>

    <section class="shell">
      <form class="search-panel card" id="find-form">
        <div class="field-row">
          <div class="field">
            <label for="bloodGroup">Blood group</label>
            <select id="bloodGroup" name="bloodGroup">
              <option value="">Any group</option>
              ${BLOOD_GROUPS.map((g) => `<option value="${g}">${g}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="district">District</label>
            <select id="district" name="district">
              <option value="">All Kerala</option>
              ${KERALA_DISTRICTS.map((d) => `<option value="${d}">${d}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="urgency">Urgency</label>
            <select id="urgency" name="urgency">
              ${URGENCY_LEVELS.map((u) => `<option value="${u.value}">${u.label}</option>`).join("")}
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Search donors</button>
      </form>

      <div id="results-summary" class="results-summary" role="status"></div>

      <div class="table-wrap card">
        <table class="data-table" id="results-table">
          <thead>
            <tr>
              <th>Group</th>
              <th>Donor</th>
              <th>District</th>
              <th>Last donation</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="results-body"></tbody>
        </table>
      </div>
    </section>
  `;
}

export function bindFindEvents(root) {
  const form = root.querySelector("#find-form");
  const body = root.querySelector("#results-body");
  const summary = root.querySelector("#results-summary");

  function runSearch() {
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const results = findDonors({ bloodGroup, district });

    if (results.length === 0) {
      body.innerHTML = `<tr><td colspan="6" class="empty-row">No verified donors match this filter yet. Try widening your search or raise an <a href="#/emergency" data-nav-link>emergency request</a>.</td></tr>`;
    } else {
      body.innerHTML = results.map(donorRow).join("");
    }

    const availableNow = results.filter((d) => d.available).length;
    summary.textContent = `${results.length} donor${results.length === 1 ? "" : "s"} found · ${availableNow} available now`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    runSearch();
  });
  form.addEventListener("change", runSearch);
  runSearch();
}
