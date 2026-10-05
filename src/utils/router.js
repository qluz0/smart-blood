const routes = new Map();
let rootEl = null;
let notFoundHandler = () => "<p>Page not found.</p>";

export function registerRoute(path, renderFn) {
  routes.set(path, renderFn);
}

export function setNotFound(renderFn) {
  notFoundHandler = renderFn;
}

export function initRouter(root) {
  rootEl = root;
  window.addEventListener("hashchange", render);
  render();
}

export function navigate(path) {
  window.location.hash = path;
}

function currentPath() {
  const hash = window.location.hash.replace(/^#/, "");
  return hash || "/";
}

async function render() {
  const path = currentPath();
  const handler = routes.get(path) || notFoundHandler;
  rootEl.innerHTML = "";
  window.scrollTo(0, 0);
  const result = await handler(rootEl);
  if (typeof result === "string") {
    rootEl.innerHTML = result;
  }
  document.querySelectorAll("header [data-nav-link]").forEach((el) => {
    el.classList.toggle("is-active", el.getAttribute("href") === `#${path}`);
  });
}
