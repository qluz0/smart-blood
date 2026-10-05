export function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="shell site-footer__inner">
        <div>
          <strong class="site-footer__brand">Raktha — Smart Blood Availability System</strong>
          <p>A coordinator-verified donor network serving all 14 districts of Kerala.</p>
        </div>
        <div class="site-footer__links">
          <a href="#/find" data-nav-link>Find Blood</a>
          <a href="#/register" data-nav-link>Become a Donor</a>
          <a href="#/coordinator" data-nav-link>Coordinator Login</a>
        </div>
        <p class="site-footer__meta">&copy; ${year} Raktha Network. Built for emergencies, maintained by trust.</p>
      </div>
    </footer>
  `;
}
