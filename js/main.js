/* =====================================================================
   UKGhar — site logic
   You normally don't need to edit this file. Content lives in js/data.js
   ===================================================================== */
(function () {
  "use strict";

  const D = window.UKGHAR;
  const C = D.company;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const page = document.body.dataset.page || "home";

  /* ---------------- Helpers ---------------- */
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const price = (n) => `${C.currency}${Number(n).toLocaleString("en-GB")}`;
  const initials = (name) => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const fmtDate = (iso) => {
    const d = new Date(iso + "T00:00:00");
    return {
      day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
      mon: d.toLocaleDateString("en-GB", { month: "short" }),
      full: d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" })
    };
  };
  const mount = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
    return el;
  };
  const allRoomTypes = () => D.roomTypes.map((r) => r.name);
  /* "per month" or "per person / month" depending on the room type */
  const roomUnit = (r) => (r && r.perPerson ? "per person / month" : C.priceUnit);
  /* unit for the cheapest room type in a list of room-type names */
  const cheapestUnit = (names) => {
    const types = D.roomTypes.filter((r) => names.includes(r.name));
    if (!types.length) return C.priceUnit;
    return roomUnit(types.reduce((a, b) => (b.priceFrom < a.priceFrom ? b : a)));
  };

  /* ---------------- Icons (stroke SVG) ---------------- */
  const ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
    wifi: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.86a10 10 0 0 1 14 0"/><path d="M8.5 16.43a5 5 0 0 1 7 0"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
    play: '<polygon points="7 4 20 12 7 20 7 4" fill="currentColor"/>',
    menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    bed: '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
    dumbbell: '<path d="M6 7v10M18 7v10M3 9.5v5M21 9.5v5M6 12h12"/>',
    washing: '<rect x="3" y="2" width="18" height="20" rx="2"/><circle cx="12" cy="13" r="5"/><path d="M7 6h.01M10 6h.01"/>',
    camera: '<path d="m22 8-6 4 6 4V8z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    bus: '<rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16M8 19v2M16 19v2"/><path d="M8 15h.01M16 15h.01"/>',
    sparkles: '<path d="M12 3l1.9 5.8L20 10.7l-6.1 1.9L12 18.5l-1.9-5.9L4 10.7l6.1-1.9z"/><path d="M19 3v4M17 5h4"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    chevron: '<polyline points="6 9 12 15 18 9"/>',
    left: '<polyline points="15 18 9 12 15 6"/>',
    right: '<polyline points="9 18 15 12 9 6"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    quote: '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2H4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .01-1 1.03V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2h-4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
    whatsapp: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>'
  };
  const icon = (name, cls = "") =>
    `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ICONS.check}</svg>`;
  window.RS_ICON = icon;

  const LOGO = `<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="var(--brand)"/><path d="M10 19.5 20 11l10 8.5V29a1.5 1.5 0 0 1-1.5 1.5H11.5A1.5 1.5 0 0 1 10 29z" fill="#fff"/><path d="M20 27.5s-4.5-2.7-4.5-5.6a2.3 2.3 0 0 1 4.5-.8 2.3 2.3 0 0 1 4.5.8c0 2.9-4.5 5.6-4.5 5.6z" fill="var(--brand)"/></svg>`;

  /* ---------------- Header & footer ---------------- */
  const NAV = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "about.html", label: "About us", key: "about" },
    { href: "locations.html", label: "Universities", key: "locations" },
    { href: "facilities.html", label: "Rooms & facilities", key: "facilities" },
    { href: "community.html", label: "Student life", key: "community" },
    { href: "contact.html", label: "Contact", key: "contact" }
  ];

  function renderHeader() {
    const links = NAV.map(
      (n) => `<li><a href="${n.href}"${n.key === page ? ' aria-current="page"' : ""}>${n.label}</a></li>`
    ).join("");
    mount(
      "site-header",
      `
      <a class="skip-link" href="#main">Skip to main content</a>
      ${C.announcement ? `<div class="announce"><div class="container">${icon("sparkles")}<span>${esc(C.announcement)}</span><a href="contact.html">Book a viewing ${icon("arrow")}</a></div></div>` : ""}
      <header class="header">
        <div class="container header-inner">
          <a class="logo" href="index.html" aria-label="${esc(C.name)} home">${LOGO}<span>UK<b>Ghar</b></span></a>
          <nav class="nav" aria-label="Main">
            <ul id="nav-list">${links}</ul>
          </nav>
          <div class="header-actions">
            <a class="header-phone" href="tel:${C.phone.replace(/[^+\d]/g, "")}">${icon("phone")}<span>${esc(C.phone)}</span></a>
            <a class="btn btn-primary btn-sm" href="contact.html">Enquire now</a>
            <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">${icon("menu")}</button>
          </div>
        </div>
        <div class="mobile-nav" id="mobile-nav" hidden>
          <ul>${links}</ul>
          <a class="btn btn-primary btn-block" href="contact.html">Enquire now</a>
          <a class="btn btn-ghost btn-block" href="tel:${C.phone.replace(/[^+\d]/g, "")}">${icon("phone")} Call ${esc(C.phone)}</a>
        </div>
      </header>`
    );

    const toggle = $(".menu-toggle");
    const mnav = $("#mobile-nav");
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      toggle.innerHTML = icon(open ? "menu" : "x");
      mnav.hidden = open;
      document.body.classList.toggle("nav-open", !open);
    });

    const header = $(".header");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function renderFooter() {
    const year = new Date().getFullYear();
    const uniLinks = D.universities.slice(0, 6).map((u) => `<li><a href="locations.html?uni=${u.id}">${esc(u.name)}</a></li>`).join("");
    mount(
      "site-footer",
      `
      <section class="cta-band">
        <div class="container cta-inner">
          <div>
            <h2>Ready to find your student home?</h2>
            <p>Book a free viewing in person or by video. It takes less than two minutes.</p>
          </div>
          <div class="cta-actions">
            <a class="btn btn-primary btn-lg" href="contact.html">Book a viewing</a>
            <a class="btn btn-light btn-lg" href="https://wa.me/${C.whatsapp}" target="_blank" rel="noopener">${icon("whatsapp")} Chat on WhatsApp</a>
          </div>
        </div>
      </section>
      <footer class="footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <a class="logo logo-light" href="index.html">${LOGO}<span>UK<b>Ghar</b></span></a>
            <p>${esc(C.tagline)} Safe, furnished, bills-included rooms near London's top universities.</p>
            <div class="social">
              ${Object.entries(C.social).map(([k, v]) => `<a href="${v}" target="_blank" rel="noopener" aria-label="${k}">${icon(k)}</a>`).join("")}
            </div>
          </div>
          <div>
            <h3>Explore</h3>
            <ul>${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h3>Universities</h3>
            <ul>${uniLinks}<li><a href="locations.html">View all ${icon("arrow")}</a></li></ul>
          </div>
          <div>
            <h3>Get in touch</h3>
            <ul class="footer-contact">
              <li>${icon("phone")}<a href="tel:${C.phone.replace(/[^+\d]/g, "")}">${esc(C.phone)}</a></li>
              <li>${icon("mail")}<a href="mailto:${C.email}">${esc(C.email)}</a></li>
              <li>${icon("pin")}<span>${esc(C.address)}</span></li>
            </ul>
            <form class="newsletter" novalidate>
              <label for="nl-email">Get room alerts &amp; event news</label>
              <div class="newsletter-row">
                <input id="nl-email" type="email" placeholder="Your email" autocomplete="email" required>
                <button class="btn btn-primary btn-sm" type="submit">Sign up</button>
              </div>
              <p class="newsletter-msg" role="status"></p>
            </form>
          </div>
        </div>
        <div class="container footer-bottom">
          <p>&copy; ${year} ${esc(C.name)}. All rights reserved.</p>
          <ul>
            <li><a href="#" data-open-cookies>Cookie settings</a></li>
            <li><a href="contact.html">Privacy</a></li>
            <li><a href="contact.html">Terms</a></li>
          </ul>
        </div>
      </footer>
      <a class="whatsapp-float" href="https://wa.me/${C.whatsapp}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${icon("whatsapp")}</a>`
    );

    const nl = $(".newsletter");
    nl.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("#nl-email");
      const msg = $(".newsletter-msg");
      if (!input.checkValidity() || !input.value) {
        msg.textContent = "Please enter a valid email address.";
        msg.className = "newsletter-msg is-error";
        return;
      }
      msg.textContent = "Thanks! You're on the list.";
      msg.className = "newsletter-msg is-ok";
      input.value = "";
    });
  }

  /* ---------------- Cookie banner (UK-style consent) ---------------- */
  function cookieBanner() {
    let saved = null;
    try { saved = localStorage.getItem("rs-cookies"); } catch (e) {}
    const el = document.createElement("div");
    el.className = "cookie";
    el.setAttribute("role", "region");
    el.setAttribute("aria-label", "Cookie consent");
    el.innerHTML = `
      <div class="cookie-inner">
        <p><strong>We use cookies</strong> to make this site work and to understand how it's used. You can accept all, or keep only the essential ones.</p>
        <div class="cookie-actions">
          <button class="btn btn-primary btn-sm" data-c="all">Accept all</button>
          <button class="btn btn-ghost btn-sm" data-c="essential">Essential only</button>
        </div>
      </div>`;
    document.body.appendChild(el);
    if (!saved) requestAnimationFrame(() => el.classList.add("is-visible"));
    el.addEventListener("click", (e) => {
      const b = e.target.closest("[data-c]");
      if (!b) return;
      try { localStorage.setItem("rs-cookies", b.dataset.c); } catch (err) {}
      el.classList.remove("is-visible");
    });
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-open-cookies]")) {
        e.preventDefault();
        el.classList.add("is-visible");
      }
    });
  }

  /* ---------------- Reusable components ---------------- */
  const img = (src, alt, extra = "") =>
    src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" ${extra}>` : "";

  const sectionHead = (eyebrow, title, sub, link) => `
    <div class="section-head">
      <div>
        ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
        <h2>${title}</h2>
        ${sub ? `<p class="lead">${sub}</p>` : ""}
      </div>
      ${link ? `<a class="link-arrow" href="${link.href}">${link.label} ${icon("arrow")}</a>` : ""}
    </div>`;

  const statsHTML = () =>
    `<dl class="stats">${D.stats.map((s) => `<div><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`).join("")}</dl>`;

  const serviceCards = (list) =>
    list.map((s) => `
      <article class="card feature">
        <span class="feature-icon">${icon(s.icon)}</span>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
      </article>`).join("");

  function uniCard(u) {
    const from = Math.min(...u.properties.map((p) => p.priceFrom));
    return `
      <a class="card uni-card" href="locations.html?uni=${u.id}">
        <div class="media ratio-16x10">${img(u.image, u.name)}<span class="chip chip-float">${icon("pin")} ${esc(u.area)}, ${esc(u.city)}</span></div>
        <div class="card-body">
          <h3>${esc(u.name)}</h3>
          <p class="muted">${u.properties.length} ${u.properties.length === 1 ? "property" : "properties"} · ${esc(u.properties[0].distance)}</p>
          <p class="price">From <strong>${price(from)}</strong> <span>${cheapestUnit(u.properties.flatMap((p) => p.rooms))}</span></p>
        </div>
      </a>`;
  }

  const mediaCount = (r) => {
    const ph = (r.photos || []).length, vd = (r.videos || []).length;
    const parts = [];
    if (ph) parts.push(`${ph} photo${ph === 1 ? "" : "s"}`);
    if (vd) parts.push(`${vd} video${vd === 1 ? "" : "s"}`);
    return parts.join(" · ");
  };

  const roomCard = (r) => {
    const i = D.roomTypes.indexOf(r);
    const count = mediaCount(r);
    const hasVid = (r.videos || []).length > 0;
    return `
    <article class="card room-card">
      <button type="button" class="media ratio-4x3 room-open" data-room="${i}" aria-label="View photos${hasVid ? " and videos" : ""} of the ${esc(r.name)}">
        ${img(r.image, r.name + " room")}${r.bestFor ? `<span class="badge">${esc(r.bestFor)}</span>` : ""}
        ${count ? `<span class="chip chip-float media-count">${icon(hasVid ? "camera" : "image")} ${count}</span>` : ""}
        <span class="room-open-hint">${icon("image")} View photos${hasVid ? " &amp; videos" : ""}</span>
      </button>
      <div class="card-body">
        <h3><button type="button" class="room-open room-title" data-room="${i}">${esc(r.name)}</button></h3>
        <ul class="ticks">${r.features.map((f) => `<li>${icon("check")}${esc(f)}</li>`).join("")}</ul>
        <div class="room-foot">
          <p class="price">From <strong>${price(r.priceFrom)}</strong> <span>${roomUnit(r)}</span></p>
          <a class="btn btn-outline btn-sm" href="contact.html?room=${encodeURIComponent(r.name)}">Enquire</a>
        </div>
      </div>
    </article>`;
  };

  const videoCard = (v, i) => `
    <article class="card video-card">
      <button class="media ratio-4x5 video-trigger" data-video="${i}" aria-label="Play video: ${esc(v.name)}">
        ${img(v.poster, "")}
        <span class="video-shade"></span>
        <span class="play">${icon("play")}</span>
        <span class="chip chip-float">${esc(v.type)}</span>
        <span class="video-meta">
          <span class="video-quote">“${esc(v.quote)}”</span>
          <span class="video-name"><strong>${esc(v.name)}</strong><span>${esc(v.course)}</span></span>
        </span>
      </button>
    </article>`;

  function eventCard(ev) {
    const d = fmtDate(ev.date);
    return `
      <article class="card event-card${ev.status === "past" ? " is-past" : ""}">
        <div class="media ratio-16x10">${img(ev.image, ev.title)}
          <span class="date-badge"><b>${d.day}</b>${d.mon}</span>
          <span class="chip chip-float">${esc(ev.category)}</span>
        </div>
        <div class="card-body">
          <h3>${esc(ev.title)}</h3>
          <p class="meta">${icon("calendar")} <time datetime="${ev.date}">${d.full}</time></p>
          <p class="meta">${icon("pin")} ${esc(ev.location)}</p>
          <p>${esc(ev.text)}</p>
        </div>
      </article>`;
  }

  const reviewCard = (r) => `
    <figure class="card review">
      <div class="stars" aria-label="${r.rating} out of 5 stars">${Array.from({ length: 5 }, (_, i) => `<span class="${i < r.rating ? "on" : ""}">${icon("star")}</span>`).join("")}</div>
      <blockquote>“${esc(r.text)}”</blockquote>
      <figcaption><span class="avatar">${initials(r.name)}</span><span><strong>${esc(r.name)}</strong><br><span class="muted">${esc(r.course)}</span></span></figcaption>
    </figure>`;

  const faqHTML = () =>
    `<div class="faq">${D.faqs.map((f) => `
      <details>
        <summary>${esc(f.q)} ${icon("chevron")}</summary>
        <p>${esc(f.a)}</p>
      </details>`).join("")}</div>`;

  const stepsHTML = () =>
    `<ol class="steps">${D.steps.map((s, i) => `
      <li><span class="step-num">${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join("")}</ol>`;

  const upcoming = () => D.events.filter((e) => e.status === "upcoming").sort((a, b) => a.date.localeCompare(b.date));
  const past = () => D.events.filter((e) => e.status === "past").sort((a, b) => b.date.localeCompare(a.date));

  /* ---------------- Video modal ---------------- */
  function setupVideoModal() {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Video");
    modal.hidden = true;
    modal.innerHTML = `<div class="modal-backdrop" data-close></div>
      <div class="modal-box"><button class="modal-close" data-close aria-label="Close video">${icon("x")}</button><div class="modal-content"></div></div>`;
    document.body.appendChild(modal);
    const content = $(".modal-content", modal);
    let lastFocus = null;

    const close = () => {
      modal.hidden = true;
      content.innerHTML = "";
      document.body.classList.remove("modal-open");
      if (lastFocus) lastFocus.focus();
    };

    document.addEventListener("click", (e) => {
      const t = e.target.closest(".video-trigger");
      if (t) {
        const v = D.videoTestimonials[Number(t.dataset.video)];
        lastFocus = t;
        if (v.youtube) {
          content.innerHTML = `<div class="ratio-16x9"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.youtube)}?autoplay=1&rel=0" title="${esc(v.name)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
        } else if (v.video) {
          content.innerHTML = `<video controls autoplay playsinline poster="${esc(v.poster)}" src="${esc(v.video)}"></video>
            <div class="video-missing" hidden>${icon("camera")}<h3>Video coming soon</h3><p>Add the file <code>${esc(v.video)}</code> to show this video, or set a YouTube ID in <code>js/data.js</code>.</p></div>`;
          const vid = $("video", content);
          vid.addEventListener("error", () => { vid.remove(); $(".video-missing", content).hidden = false; });
        }
        content.insertAdjacentHTML("beforeend", `<div class="modal-caption"><p>“${esc(v.quote)}”</p><strong>${esc(v.name)}</strong> · <span>${esc(v.course)}</span></div>`);
        modal.hidden = false;
        document.body.classList.add("modal-open");
        $(".modal-close", modal).focus();
        return;
      }
      if (e.target.closest("[data-close]") && !modal.hidden) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) close();
    });
  }

  /* ---------------- Room gallery (photos + videos) ---------------- */
  function setupRoomGallery() {
    const modal = document.createElement("div");
    modal.className = "modal gallery-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "gallery-title");
    modal.hidden = true;
    modal.innerHTML = `<div class="modal-backdrop" data-gclose></div>
      <div class="gallery-box">
        <button class="modal-close" data-gclose aria-label="Close gallery">${icon("x")}</button>
        <div class="gallery-stage">
          <div class="gallery-view"></div>
          <button class="gallery-nav prev" type="button" aria-label="Previous">${icon("left")}</button>
          <button class="gallery-nav next" type="button" aria-label="Next">${icon("right")}</button>
          <span class="gallery-counter"></span>
        </div>
        <div class="gallery-thumbs"></div>
        <div class="gallery-info">
          <div>
            <h3 id="gallery-title"></h3>
            <p class="gallery-caption muted"></p>
            <ul class="ticks gallery-features"></ul>
          </div>
          <div class="gallery-cta">
            <p class="price"></p>
            <a class="btn btn-primary" href="#">Enquire about this room</a>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    const view = $(".gallery-view", modal);
    const thumbs = $(".gallery-thumbs", modal);
    let items = [], idx = 0, room = null, lastFocus = null;

    const mediaHTML = (it) => {
      if (it.type === "photo") return `<img src="${esc(it.src)}" alt="${esc(room.name + (it.caption ? " – " + it.caption : ""))}">`;
      if (it.youtube) return `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(it.youtube)}?rel=0" title="${esc(it.caption || room.name + " video")}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      return `<video controls playsinline preload="metadata" ${it.poster ? `poster="${esc(it.poster)}"` : ""} src="${esc(it.src)}"></video>
        <div class="video-missing" hidden>${icon("camera")}<h3>Video coming soon</h3><p>Add the file <code>${esc(it.src)}</code> to show this video.</p></div>`;
    };

    const show = (n) => {
      idx = (n + items.length) % items.length;
      const it = items[idx];
      view.innerHTML = mediaHTML(it);
      const vid = $("video", view);
      if (vid) vid.addEventListener("error", () => { vid.remove(); $(".video-missing", view).hidden = false; });
      $(".gallery-caption", modal).textContent = it.caption || "";
      $(".gallery-counter", modal).textContent = `${idx + 1} / ${items.length}`;
      $$(".gallery-thumb", thumbs).forEach((t, i) => {
        t.classList.toggle("is-active", i === idx);
        if (i === idx) t.setAttribute("aria-current", "true"); else t.removeAttribute("aria-current");
      });
      const active = thumbs.children[idx];
      if (active) active.scrollIntoView({ block: "nearest", inline: "nearest" });
      const multi = items.length > 1;
      $$(".gallery-nav", modal).forEach((b) => (b.hidden = !multi));
      thumbs.hidden = !multi;
    };

    const open = (r, trigger) => {
      room = r;
      lastFocus = trigger;
      const photos = r.photos && r.photos.length ? r.photos : [{ src: r.image, caption: "" }];
      items = [
        ...photos.map((p) => ({ ...p, type: "photo" })),
        ...(r.videos || []).map((v) => ({ ...v, type: "video" }))
      ];
      thumbs.innerHTML = items.map((it, i) => {
        const thumbSrc = it.type === "photo" ? it.src : it.poster || (it.youtube ? `https://img.youtube.com/vi/${encodeURIComponent(it.youtube)}/mqdefault.jpg` : "");
        return `<button type="button" class="gallery-thumb${it.type === "video" ? " is-video" : ""}" data-i="${i}" aria-label="${it.type === "video" ? "Video" : "Photo"} ${i + 1}${it.caption ? ": " + esc(it.caption) : ""}">${thumbSrc ? img(thumbSrc, "") : ""}${it.type === "video" ? `<span class="thumb-play">${icon("play")}</span>` : ""}</button>`;
      }).join("");
      $("#gallery-title", modal).textContent = r.name;
      $(".gallery-features", modal).innerHTML = r.features.map((f) => `<li>${icon("check")}${esc(f)}</li>`).join("");
      $(".gallery-cta .price", modal).innerHTML = `From <strong>${price(r.priceFrom)}</strong> <span>${roomUnit(r)}</span>`;
      $(".gallery-cta a", modal).href = `contact.html?room=${encodeURIComponent(r.name)}`;
      modal.hidden = false;
      show(0);
      document.body.classList.add("modal-open");
      $(".modal-close", modal).focus();
    };

    const close = () => {
      modal.hidden = true;
      view.innerHTML = "";
      document.body.classList.remove("modal-open");
      if (lastFocus) lastFocus.focus();
    };

    document.addEventListener("click", (e) => {
      const t = e.target.closest(".room-open");
      if (t) { open(D.roomTypes[Number(t.dataset.room)], t); return; }
      if (modal.hidden) return;
      if (e.target.closest("[data-gclose]")) return close();
      if (e.target.closest(".gallery-nav.prev")) return show(idx - 1);
      if (e.target.closest(".gallery-nav.next")) return show(idx + 1);
      const th = e.target.closest(".gallery-thumb");
      if (th) show(Number(th.dataset.i));
    });
    document.addEventListener("keydown", (e) => {
      if (modal.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft" && items.length > 1) show(idx - 1);
      else if (e.key === "ArrowRight" && items.length > 1) show(idx + 1);
    });

    /* swipe left/right on touch screens */
    let x0 = null;
    view.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    view.addEventListener("touchend", (e) => {
      if (x0 === null || items.length < 2) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ---------------- Search form (hero) ---------------- */
  function heroSearch() {
    const form = $("#hero-search");
    if (!form) return;
    $("#hs-uni", form).innerHTML =
      `<option value="">Any university</option>` + D.universities.map((u) => `<option value="${u.id}">${esc(u.name)}</option>`).join("");
    $("#hs-room", form).innerHTML =
      `<option value="">Any room type</option>` + allRoomTypes().map((r) => `<option>${esc(r)}</option>`).join("");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const p = new URLSearchParams();
      const u = $("#hs-uni", form).value;
      const r = $("#hs-room", form).value;
      if (u) p.set("uni", u);
      if (r) p.set("room", r);
      location.href = "locations.html" + (p.toString() ? "?" + p : "");
    });
  }

  /* ================= PAGES ================= */
  const pages = {
    home() {
      heroSearch();
      mount("home-stats", statsHTML());
      mount("home-services", serviceCards(D.services));
      mount("home-unis", D.universities.slice(0, 6).map(uniCard).join(""));
      mount("home-rooms", D.roomTypes.map(roomCard).join(""));
      const flat = D.facilities.flatMap((g) => g.items);
      const seen = new Set();
      const top = flat.filter((f) => !seen.has(f.title) && seen.add(f.title)).slice(0, 8);
      mount("home-facilities", top.map((f) => `<li>${icon(f.icon)}<span><strong>${esc(f.title)}</strong>${esc(f.text)}</span></li>`).join(""));
      mount("home-videos", D.videoTestimonials.slice(0, 4).map(videoCard).join(""));
      mount("home-events", upcoming().slice(0, 3).map(eventCard).join(""));
      mount("home-steps", stepsHTML());
      mount("home-faq", faqHTML());
      mount("home-reviews", D.reviews.slice(0, 3).map(reviewCard).join(""));
    },

    about() {
      const A = D.about;
      mount("about-intro", `<p class="lead">${esc(A.intro)}</p>`);
      mount("about-mission", esc(A.mission));
      mount("about-vision", esc(A.vision));
      mount("about-values", serviceCards(A.values));
      mount("about-services", serviceCards(D.services));
      mount("about-stats", statsHTML());
      mount("about-timeline", A.timeline.map((t) => `<li><span class="tl-year">${esc(t.year)}</span><p>${esc(t.text)}</p></li>`).join(""));
      mount("about-team", A.team.map((m) => `
        <figure class="team-card">
          <div class="team-photo">${m.image ? img(m.image, m.name) : `<span>${initials(m.name)}</span>`}</div>
          <figcaption><strong>${esc(m.name)}</strong>${m.role ? `<span>${esc(m.role)}</span>` : ""}</figcaption>
        </figure>`).join(""));
      mount("about-steps", stepsHTML());
    },

    locations() {
      const params = new URLSearchParams(location.search);
      const state = { city: "All", q: "", uni: params.get("uni") || "", room: params.get("room") || "" };
      const cities = ["All", ...new Set(D.universities.map((u) => u.city))];

      mount("loc-cities", cities.map((c) => `<button class="pill" type="button" data-city="${esc(c)}" aria-pressed="${c === "All"}">${esc(c)}</button>`).join(""));
      const roomSel = $("#loc-room");
      roomSel.innerHTML = `<option value="">Any room type</option>` + allRoomTypes().map((r) => `<option${r === state.room ? " selected" : ""}>${esc(r)}</option>`).join("");

      const list = $("#loc-list");
      const count = $("#loc-count");

      function propertyRow(p, u) {
        const avClass = /left/i.test(p.availability) ? "warn" : /wait|coming/i.test(p.availability) ? "muted" : "ok";
        return `
          <li class="property">
            <div class="property-main">
              <h4>${esc(p.name)}</h4>
              <p class="meta">${icon("clock")} ${esc(p.distance)} to campus${p.nearest ? ` <span class="dot"></span> ${icon("pin")} ${esc(p.nearest)}` : ""}${p.gender ? ` <span class="dot"></span> ${icon("users")} ${esc(p.gender)}` : ""}</p>
              <div class="tags">${p.rooms.map((r) => `<span class="tag">${esc(r)}</span>`).join("")}</div>
            </div>
            <div class="property-side">
              <span class="status status-${avClass}">${esc(p.availability)}</span>
              <p class="price">From <strong>${price(p.priceFrom)}</strong> <span>${cheapestUnit(p.rooms)}</span></p>
              <a class="btn btn-primary btn-sm" href="contact.html?uni=${u.id}&property=${encodeURIComponent(p.name)}">Book a viewing</a>
            </div>
          </li>`;
      }

      function render() {
        const q = state.q.trim().toLowerCase();
        const results = D.universities
          .filter((u) => state.city === "All" || u.city === state.city)
          .filter((u) => !state.uni || u.id === state.uni)
          .filter((u) => !q || [u.name, u.short, u.city, u.area, ...u.properties.map((p) => p.name)].join(" ").toLowerCase().includes(q))
          .map((u) => ({ ...u, properties: u.properties.filter((p) => !state.room || p.rooms.includes(state.room)) }))
          .filter((u) => u.properties.length);

        const n = results.reduce((a, u) => a + u.properties.length, 0);
        count.textContent = `${n} ${n === 1 ? "property" : "properties"} near ${results.length} ${results.length === 1 ? "university" : "universities"}`;

        const activeUni = state.uni && D.universities.find((u) => u.id === state.uni);
        $("#loc-active").innerHTML = activeUni
          ? `<span class="pill is-on">${esc(activeUni.name)} <button type="button" aria-label="Clear university filter" data-clear-uni>${icon("x")}</button></span>`
          : "";

        list.innerHTML = results.length
          ? results.map((u) => `
            <article class="card loc-card" id="uni-${u.id}">
              <div class="media loc-media">${img(u.image, u.name)}</div>
              <div class="card-body">
                <div class="loc-head">
                  <div>
                    <p class="eyebrow">${icon("pin")} ${esc(u.area)}, ${esc(u.city)}</p>
                    <h3>${esc(u.name)}</h3>
                  </div>
                  <span class="chip">${icon("cap")} ${esc(u.short)}</span>
                </div>
                <ul class="properties">${u.properties.map((p) => propertyRow(p, u)).join("")}</ul>
              </div>
            </article>`).join("")
          : `<div class="empty">${icon("search")}<h3>No rooms match those filters</h3><p>Try a different city or room type, or <a href="contact.html">tell us what you need</a> and we'll help you find something.</p><button class="btn btn-outline" type="button" data-reset>Clear all filters</button></div>`;
      }

      document.addEventListener("click", (e) => {
        const c = e.target.closest("[data-city]");
        if (c) {
          state.city = c.dataset.city;
          $$("[data-city]").forEach((b) => b.setAttribute("aria-pressed", String(b === c)));
          render();
        }
        if (e.target.closest("[data-clear-uni]")) {
          state.uni = "";
          history.replaceState(null, "", "locations.html");
          render();
        }
        if (e.target.closest("[data-reset]")) {
          Object.assign(state, { city: "All", q: "", uni: "", room: "" });
          $("#loc-q").value = "";
          roomSel.value = "";
          $$("[data-city]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.city === "All")));
          history.replaceState(null, "", "locations.html");
          render();
        }
      });
      $("#loc-q").addEventListener("input", (e) => { state.q = e.target.value; render(); });
      roomSel.addEventListener("change", (e) => { state.room = e.target.value; render(); });
      render();
    },

    facilities() {
      mount("fac-rooms", D.roomTypes.map(roomCard).join(""));
      mount("fac-groups", D.facilities.map((g) => `
        <section class="fac-group">
          <h3>${esc(g.group)}</h3>
          <div class="grid grid-4">${g.items.map((f) => `
            <div class="fac-item">
              <span class="feature-icon">${icon(f.icon)}</span>
              <h4>${esc(f.title)}</h4>
              <p>${esc(f.text)}</p>
            </div>`).join("")}</div>
        </section>`).join(""));
      mount("fac-included", D.included.map((i) => `
        <li class="${i.included ? "yes" : "no"}">
          <span class="inc-icon">${icon(i.included ? "check" : "x")}</span>
          <span>${esc(i.item)}${i.note ? `<small>${esc(i.note)}</small>` : ""}</span>
          <span class="inc-label">${i.included ? "Included" : "Optional"}</span>
        </li>`).join(""));
    },

    community() {
      mount("com-videos", D.videoTestimonials.map(videoCard).join(""));
      mount("com-reviews", D.reviews.map(reviewCard).join(""));
      mount("com-upcoming", upcoming().map(eventCard).join("") || `<p class="muted">New events will be announced soon.</p>`);
      mount("com-past", past().map(eventCard).join(""));
    },

    contact() {
      const params = new URLSearchParams(location.search);
      const form = $("#enquiry");
      $("#f-uni").innerHTML = `<option value="">Select a university</option>` +
        D.universities.map((u) => `<option value="${u.id}"${u.id === params.get("uni") ? " selected" : ""}>${esc(u.name)}</option>`).join("") +
        `<option value="other">Other / not sure yet</option>`;
      $("#f-room").innerHTML = `<option value="">No preference</option>` +
        allRoomTypes().map((r) => `<option${r === params.get("room") ? " selected" : ""}>${esc(r)}</option>`).join("");
      if (params.get("property")) $("#f-msg").value = `I'd like to book a viewing at ${params.get("property")}.`;

      mount("contact-details", `
        <li>${icon("phone")}<div><strong>Call us</strong><a href="tel:${C.phone.replace(/[^+\d]/g, "")}">${esc(C.phone)}</a></div></li>
        <li>${icon("whatsapp")}<div><strong>WhatsApp</strong><a href="https://wa.me/${C.whatsapp}" target="_blank" rel="noopener">Message us</a></div></li>
        <li>${icon("mail")}<div><strong>Email</strong><a href="mailto:${C.email}">${esc(C.email)}</a></div></li>
        <li>${icon("pin")}<div><strong>Office</strong><span>${esc(C.address)}</span></div></li>`);
      mount("contact-hours", C.officeHours.map((h) => `<li><span>${esc(h.days)}</span><span>${esc(h.time)}</span></li>`).join(""));
      const map = $("#contact-map");
      if (map && C.mapEmbed) map.innerHTML = `<iframe src="${esc(C.mapEmbed)}" title="Map of our office" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
      mount("contact-faq", faqHTML());

      // Date: earliest is today
      const dateInput = $("#f-date");
      dateInput.min = new Date().toISOString().slice(0, 10);

      const showError = (field, msg) => {
        const wrap = field.closest(".field");
        wrap.classList.toggle("has-error", !!msg);
        $(".field-error", wrap).textContent = msg || "";
        field.setAttribute("aria-invalid", msg ? "true" : "false");
      };
      const validate = (field) => {
        let msg = "";
        const v = field.value.trim();
        if (field.required && field.type === "checkbox" && !field.checked) msg = "Please agree so we can contact you.";
        else if (field.required && !v) msg = `${field.tagName === "SELECT" ? "Select" : "Enter"} your ${field.dataset.label || "details"}.`;
        else if (field.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = "Enter an email address in the correct format, like name@example.com";
        else if (field.type === "tel" && v && v.replace(/\D/g, "").length < 7) msg = "Enter a valid phone number.";
        showError(field, msg);
        return !msg;
      };
      $$("[data-validate]", form).forEach((f) => f.addEventListener("blur", () => validate(f)));

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const fields = $$("[data-validate]", form);
        const bad = fields.filter((f) => !validate(f));
        const summary = $("#error-summary");
        if (bad.length) {
          summary.hidden = false;
          $("ul", summary).innerHTML = bad.map((f) => `<li><a href="#${f.id}">${esc($(".field-error", f.closest(".field")).textContent)}</a></li>`).join("");
          summary.focus();
          return;
        }
        summary.hidden = true;
        const btn = $("button[type=submit]", form);
        btn.disabled = true;
        btn.textContent = "Sending…";
        try {
          if (C.formEndpoint) {
            const res = await fetch(C.formEndpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || String(data.success) === "false") throw new Error(data.message || "Request failed");
          } else {
            await new Promise((r) => setTimeout(r, 600)); // demo mode
          }
          const name = $("#f-name").value.trim().split(" ")[0];
          form.hidden = true;
          const ok = $("#enquiry-success");
          $("#success-name").textContent = name;
          ok.hidden = false;
          ok.focus();
        } catch (err) {
          btn.disabled = false;
          btn.textContent = "Send enquiry";
          summary.hidden = false;
          $("ul", summary).innerHTML = `<li>Sorry, something went wrong. Please try again or call us on ${esc(C.phone)}.</li>`;
          summary.focus();
        }
      });
    }
  };

  /* ---------------- Reveal on scroll ---------------- */
  function reveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -60px 0px" });
    els.forEach((el) => io.observe(el));
  }

  /* Broken images fall back to the branded gradient behind them */
  document.addEventListener("error", (e) => {
    if (e.target.tagName === "IMG") e.target.classList.add("is-broken");
  }, true);

  /* ---------------- Boot ---------------- */
  renderHeader();
  renderFooter();
  if (pages[page]) pages[page]();
  setupVideoModal();
  setupRoomGallery();
  cookieBanner();
  reveal();
})();
