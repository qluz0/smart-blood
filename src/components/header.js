const NAV_ITEMS = [
  { href: "#/", label: "Dashboard" },
  { href: "#/find", label: "Find Blood" },
  { href: "#/emergency", label: "Emergency Request" },
  { href: "#/register", label: "Donor Registration" },
  { href: "#/coordinator", label: "Coordinator Login" },
];

export function renderHeader() {
  return `
    <header class="site-header">
      <div class="shell site-header__inner">
        <a href="#/" class="brand" data-nav-link>
          <span class="brand__mark" aria-hidden="true">+</span>
          <span class="brand__text">
            <strong>Raktha</strong>
            <small>Kerala Blood Network</small>
          </span>
        </a>
        <nav class="site-nav" aria-label="Primary">
          <ul>
            ${NAV_ITEMS.map(
              (item) => `
              <li><a href="${item.href}" data-nav-link>${item.label}</a></li>
            `
            ).join("")}
          </ul>
        </nav>
        <a href="#/emergency" class="btn btn-primary site-header__cta">Emergency Request</a>
        <button class="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav class="site-nav-mobile" aria-label="Primary mobile" hidden>
        <ul>
          ${NAV_ITEMS.map(
            (item) => `
            <li><a href="${item.href}" data-nav-link>${item.label}</a></li>
          `
          ).join("")}
        </ul>
      </nav>
    </header>
  `;
}

export function bindHeaderEvents(root) {
  const toggle = root.querySelector(".nav-toggle");
  const mobileNav = root.querySelector(".site-nav-mobile");
  if (!toggle || !mobileNav) return;
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    mobileNav.hidden = isOpen;
  });
  mobileNav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
    })
  );
}
