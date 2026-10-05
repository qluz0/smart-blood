import "./style.css";
import { registerRoute, setNotFound, initRouter } from "./utils/router.js";
import { renderHeader, bindHeaderEvents } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { renderHome } from "./pages/home.js";
import { renderFind, bindFindEvents } from "./pages/find.js";
import { renderEmergency, bindEmergencyEvents } from "./pages/emergency.js";
import { renderRegister, bindRegisterEvents } from "./pages/register.js";
import { renderCoordinator, bindCoordinatorEvents } from "./pages/coordinator.js";

const app = document.querySelector("#app");

app.innerHTML = `
  ${renderHeader()}
  <main id="main-content"></main>
  ${renderFooter()}
`;
bindHeaderEvents(app);

const main = app.querySelector("#main-content");

registerRoute("/", () => {
  main.innerHTML = renderHome();
});

registerRoute("/find", () => {
  main.innerHTML = renderFind();
  bindFindEvents(main);
});

registerRoute("/emergency", () => {
  main.innerHTML = renderEmergency();
  bindEmergencyEvents(main);
});

registerRoute("/register", () => {
  main.innerHTML = renderRegister();
  bindRegisterEvents(main);
});

registerRoute("/coordinator", () => {
  main.innerHTML = renderCoordinator();
  bindCoordinatorEvents(main);
});

setNotFound(() => {
  main.innerHTML = `
    <section class="shell page-head">
      <span class="eyebrow">404</span>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist. <a href="#/" data-nav-link>Return to dashboard</a>.</p>
    </section>
  `;
});

initRouter(main);
