/* Ayesha Ysabelle Catolico — UI/UX portfolio
   Sections: 1. Sparkles · 2. Intro · 3. Toolbox · 4. Mobile nav · 5. Theme · 6. Resume */

/* 1. Sparkles -------------------------------------------------------------- */

/* Shared click feedback: a ring of stars pops out from behind the element. */

const SPARK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#spark"/></svg>';

function sparkleLayerFor(host) {
  let layer = document.querySelector("#page-sparkles");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "page-sparkles";
    layer.className = "sparkles";
    layer.setAttribute("aria-hidden", "true");
    document.body.append(layer);
  }

  return layer;
}

function burstSparkles(host, options = {}) {
  const {
    count = 8,
    travel = [30, 66],
    size = [10, 20],
    glyph = null,
  } = options;

  const layer = sparkleLayerFor(host);
  if (!layer) return;

  const hostRect = host.getBoundingClientRect();
  const layerRect = layer.getBoundingClientRect();
  const radius = Math.hypot(hostRect.width, hostRect.height) / 2;

  /* Center of the clicked element, in the sparkle layer's coordinates. */
  const centerX = Math.round(hostRect.left + hostRect.width / 2 - layerRect.left);
  const centerY = Math.round(hostRect.top + hostRect.height / 2 - layerRect.top);

  for (let i = 0; i < count; i += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = Math.random() < 0.3 ? "sparkle is-gold" : "sparkle";

    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const start = radius - 4 + Math.random() * 14;
    const end = start + travel[0] + Math.random() * (travel[1] - travel[0]);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    sparkle.style.setProperty("--ox", `${centerX}px`);
    sparkle.style.setProperty("--oy", `${centerY}px`);

    sparkle.style.setProperty("--sx", `${Math.round(cos * start)}px`);
    sparkle.style.setProperty("--sy", `${Math.round(sin * start)}px`);
    sparkle.style.setProperty("--dx", `${Math.round(cos * end)}px`);
    sparkle.style.setProperty("--dy", `${Math.round(sin * end)}px`);
    sparkle.style.setProperty("--s", `${Math.round(size[0] + Math.random() * (size[1] - size[0]))}px`);
    sparkle.style.setProperty("--rot", `${Math.round(Math.random() * 140 - 70)}deg`);

    if (glyph) {
      sparkle.classList.add("keycap-sparkle");
      sparkle.textContent = glyph;
    } else {
      sparkle.innerHTML = SPARK_SVG;
    }

    layer.append(sparkle);
    sparkle.addEventListener("animationend", () => sparkle.remove());
  }
}

const glowTimers = new WeakMap();

function sparkleFeedback(host, options) {
  if (!host) return;

  host.classList.remove("is-glowing");
  void host.offsetWidth;
  host.classList.add("is-glowing");
  window.clearTimeout(glowTimers.get(host));
  glowTimers.set(host, window.setTimeout(() => host.classList.remove("is-glowing"), 1200));

  burstSparkles(host, options);
}

/* 2. Cover clover ---------------------------------------------------------- */

const coverClover = document.querySelector("#cover-clover");
let pressedBy = null;

function beginCloverPress(source) {
  if (pressedBy) return;
  pressedBy = source;
  coverClover?.classList.add("is-pressed");
}

function endCloverPress(source) {
  if (!pressedBy || (source && source !== pressedBy)) return;
  pressedBy = null;
  coverClover?.classList.remove("is-pressed");
}

coverClover?.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  beginCloverPress(`pointer:${event.pointerId}`);
});

window.addEventListener("pointerup", (event) => endCloverPress(`pointer:${event.pointerId}`));
window.addEventListener("pointercancel", (event) => endCloverPress(`pointer:${event.pointerId}`));

coverClover?.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && !event.repeat) beginCloverPress("keyboard");
});

window.addEventListener("keyup", (event) => {
  if (event.key === "Enter" || event.key === " ") endCloverPress("keyboard");
});

coverClover?.addEventListener("blur", () => endCloverPress());

coverClover?.addEventListener("click", () => {
  coverClover.classList.remove("is-clicked");
  void coverClover.offsetWidth;
  coverClover.classList.add("is-clicked");
  sparkleFeedback(coverClover, { count: 10, travel: [22, 52], size: [10, 18] });
});

/* 3. Toolbox --------------------------------------------------------------- */

/* Each tool key is a little keycap: clicking pops a ring of sparkles. */
document.querySelectorAll(".tkey").forEach((key) => {
  key.addEventListener("click", () => burstSparkles(key, { count: 10, travel: [22, 52], size: [10, 18] }));
});

document.querySelectorAll(".say a").forEach((contactButton) => {
  contactButton.addEventListener("click", () => {
    sparkleFeedback(contactButton, { count: 10, travel: [22, 52], size: [10, 18] });
  });
});

/* 4. Mobile menu ----------------------------------------------------------- */

const navToggle = document.querySelector("#navtoggle");
const navMenu = document.querySelector("#navmenu");
const pageMain = document.querySelector("main");
const skipLink = document.querySelector(".skip");
const navToggleText = navToggle?.querySelector(".navtoggle-text");
const navToggleIcon = navToggle?.querySelector(".navtoggle-icon");
const mobileNav = window.matchMedia("(max-width: 820px)");

const menuIsOpen = () => navToggle?.getAttribute("aria-expanded") === "true";

let menuLockedScroll = false;

/* Background content is taken out of the tab order and the a11y tree while the
   overlay is up, so Tab stays between the bar and the menu. */
function setBackgroundInert(on) {
  if (pageMain) pageMain.inert = on;
  if (skipLink) skipLink.inert = on;
}

function setMenu(open, { returnFocus = false } = {}) {
  if (!navToggle || !navMenu) return;

  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  if (navToggleText) navToggleText.textContent = open ? "Close" : "Menu";
  if (navToggleIcon) navToggleIcon.textContent = open ? "\u00d7" : "+";

  navMenu.classList.toggle("is-open", open);

  if (open) {
    document.body.classList.add("is-locked");
    menuLockedScroll = true;
  } else if (menuLockedScroll) {
    document.body.classList.remove("is-locked");
    menuLockedScroll = false;
  }

  setBackgroundInert(open);

  /* The closed menu is inert on phones only — on desktop it is the real nav. */
  navMenu.inert = mobileNav.matches && !open;

  if (open) {
    const firstLink = navMenu.querySelector("a");
    if (firstLink) firstLink.focus({ preventScroll: true });
  } else if (returnFocus) {
    navToggle.focus({ preventScroll: true });
  }
}

if (navToggle && navMenu) {
  /* Closed by default on phones. */
  if (mobileNav.matches) navMenu.inert = true;

  navToggle.addEventListener("click", () => setMenu(!menuIsOpen()));

  navMenu.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    const onEmptySpace = event.target === navMenu;

    if (link) {
      setMenu(false);
      /* Let the browser follow the link, but keep focus predictable. */
      navToggle.focus({ preventScroll: true });
    } else if (onEmptySpace) {
      setMenu(false, { returnFocus: true });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !menuIsOpen()) return;
    event.preventDefault();
    setMenu(false, { returnFocus: true });
  });

  /* Leaving mobile width snaps the menu shut and hands the nav back to the bar. */
  mobileNav.addEventListener("change", (event) => {
    if (event.matches) {
      navMenu.inert = !menuIsOpen();
      return;
    }
    setMenu(false);
    setBackgroundInert(false);
    navMenu.inert = false;
  });
}

/* 5. Theme ----------------------------------------------------------------- */

const themeButton = document.querySelector("#theme");
const themeColor = document.querySelector('meta[name="theme-color"]');
const root = document.documentElement;

const moonIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>';
const sunIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

function isDark() {
  const chosen = root.getAttribute("data-theme");
  if (chosen) return chosen === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function paintTheme() {
  if (!themeButton) return;

  themeButton.innerHTML = isDark() ? sunIcon : moonIcon;
  themeButton.setAttribute("aria-pressed", String(isDark()));
  themeButton.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
  themeColor?.setAttribute("content", isDark() ? "#051F45" : "#FBE6E8");
}

try {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
} catch (_) {}

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const nextTheme = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (_) {}
    paintTheme();
  });

  paintTheme();
}

/* 6. Project cards --------------------------------------------------------- */

const projectGrid = document.querySelector("#work .grid");

if (projectGrid) {
  const projectCards = [...projectGrid.querySelectorAll(".proj")];
  projectGrid.classList.add("has-reveal");

  const revealVisibleCards = () => {
    projectCards.forEach((card) => {
      if (card.classList.contains("is-visible")) return;
      const rect = card.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        card.classList.add("is-visible");
      }
    });
  };

  if ("IntersectionObserver" in window) {
    const projectObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    projectCards.forEach((card) => projectObserver.observe(card));
  } else {
    projectCards.forEach((card) => card.classList.add("is-visible"));
  }

  window.addEventListener("scroll", revealVisibleCards, { passive: true });
  window.addEventListener("resize", revealVisibleCards, { passive: true });
  document.addEventListener("visibilitychange", revealVisibleCards);
  window.setTimeout(revealVisibleCards, 250);
}

const projectLightbox = document.querySelector("#project-lightbox");
const projectLightboxImage = projectLightbox?.querySelector("img");
const lightboxClose = projectLightbox?.querySelector(".lightbox-close");

document.querySelectorAll(".shot-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const image = trigger.querySelector("img");
    if (!projectLightbox || !projectLightboxImage || !image) return;

    projectLightboxImage.src = image.currentSrc || image.src;
    projectLightboxImage.alt = trigger.dataset.lightboxAlt || "";
    projectLightbox.showModal();
  });
});

lightboxClose?.addEventListener("click", () => projectLightbox?.close());

projectLightbox?.addEventListener("click", (event) => {
  if (event.target === projectLightbox) projectLightbox.close();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectLightbox?.open) {
    event.preventDefault();
    projectLightbox.close();
  }
});

projectLightbox?.addEventListener("close", () => {
  projectLightboxImage?.removeAttribute("src");
  if (projectLightboxImage) projectLightboxImage.alt = "";
});
