import { BLOOD_GROUPS, KERALA_DISTRICTS } from "../data/districts.js";

export function renderRegister() {
  return `
    <section class="shell page-head">
      <span class="eyebrow">Donor Registration</span>
      <h1>Join the verified donor network</h1>
      <p>Your details go to your district coordinator for verification before appearing in search results. Nothing is public until a coordinator confirms it.</p>
    </section>

    <section class="shell register-grid">
      <form class="card register-form" id="register-form" novalidate>
        <div class="field-row">
          <div class="field">
            <label for="fullName">Full name</label>
            <input id="fullName" name="fullName" type="text" required placeholder="As per ID" />
          </div>
          <div class="field">
            <label for="bloodGroup">Blood group</label>
            <select id="bloodGroup" name="bloodGroup" required>
              <option value="" disabled selected>Select group</option>
              ${BLOOD_GROUPS.map((g) => `<option value="${g}">${g}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="district">District</label>
            <select id="district" name="district" required>
              <option value="" disabled selected>Select district</option>
              ${KERALA_DISTRICTS.map((d) => `<option value="${d}">${d}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="phone">Contact number</label>
            <input id="phone" name="phone" type="tel" required placeholder="+91" />
          </div>
        </div>
        <div class="field">
          <label for="lastDonation">Last donation date (if any)</label>
          <input id="lastDonation" name="lastDonation" type="date" />
        </div>
        <label class="checkbox-field">
          <input type="checkbox" required />
          <span>I confirm this information is accurate and consent to a coordinator verifying it before activation.</span>
        </label>
        <button type="submit" class="btn btn-primary btn-block">Submit for verification</button>
      </form>

      <aside class="card register-info">
        <h2>What happens next</h2>
        <ol class="mini-steps">
          <li>Your local district coordinator reviews your submission.</li>
          <li>They verify your identity and blood group, typically within 48 hours.</li>
          <li>Once verified, your status becomes <strong>active</strong> and visible to emergency searches in your district.</li>
          <li>You stay in control — mark yourself unavailable any time by contacting your coordinator.</li>
        </ol>
        <div class="register-info__note">
          <strong>Why coordinator verification?</strong>
          <p>It keeps the network reliable — every number a patient calls has already been confirmed as a real, willing donor.</p>
        </div>
      </aside>
    </section>

    <div class="toast" id="register-toast" role="status" hidden>
      Thank you. Your registration has been sent to your district coordinator for verification.
    </div>
  `;
}

export function bindRegisterEvents(root) {
  const form = root.querySelector("#register-form");
  const toast = root.querySelector("#register-toast");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    toast.hidden = false;
    form.reset();
    setTimeout(() => {
      toast.hidden = true;
    }, 4000);
  });
}
