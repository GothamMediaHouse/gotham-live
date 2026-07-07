(function () {
  const config = window.GOTHAM_LIVE_CONFIG || {};
  const events = config.events || [];
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get("event") || cleanPathSlug();

  const homeHero = document.querySelector("[data-home-hero]");
  const infoGrid = document.querySelector("[data-info-grid]");
  const siteTitle = document.querySelector("[data-site-title]");
  const siteSubtitle = document.querySelector("[data-site-subtitle]");
  const contactLink = document.querySelector("[data-contact-link]");
  const eventList = document.querySelector("[data-event-list]");
  const eventPanel = document.querySelector("[data-event-panel]");
  const eventTitle = document.querySelector("[data-event-title]");
  const eventDate = document.querySelector("[data-event-date]");
  const eventDescription = document.querySelector("[data-event-description]");
  const passwordForm = document.querySelector("[data-password-form]");
  const passwordInput = document.querySelector("[data-password-input]");
  const error = document.querySelector("[data-error]");
  const playerWrap = document.querySelector("[data-player-wrap]");
  const player = document.querySelector("[data-player]");
  const backLink = document.querySelector("[data-back-link]");

  function cleanPathSlug() {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
    return path && path !== "index.html" ? path : "";
  }

  if (siteTitle) siteTitle.textContent = config.siteTitle || "Gotham Media House Live";
  if (siteSubtitle) siteSubtitle.textContent = config.siteSubtitle || "Private livestream access for clients and guests.";
  if (contactLink && config.contactEmail) contactLink.href = `mailto:${config.contactEmail}`;

  function renderList() {
    if (!eventList) return;
    eventList.innerHTML = "";

    events.forEach((event) => {
      const card = document.createElement("a");
      card.className = "event-card";
      card.href = `?event=${encodeURIComponent(event.slug)}`;
      card.innerHTML = `
        <div class="event-kicker">Private Event</div>
        <h2>${escapeHtml(event.title)}</h2>
        <p>${escapeHtml(event.date || "Date TBA")}</p>
        <span>Open event →</span>
      `;
      eventList.appendChild(card);
    });
  }

  function renderEvent(event) {
    if (!event) {
      if (eventPanel) {
        eventPanel.innerHTML = `<a class="back-link" href="/">← Back to events</a><div class="event-heading"><h1>Event not found</h1><p>Check the event link and try again.</p></div>`;
      }
      return;
    }

    document.title = `${event.title} | Gotham Media House Live`;
    if (eventTitle) eventTitle.textContent = event.title;
    if (eventDate) eventDate.textContent = event.date || "Private Event";
    if (eventDescription) eventDescription.textContent = event.description || "Enter the event password to access the private livestream.";
    if (backLink) backLink.href = "/";

    if (!passwordForm) return;
    passwordForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const entered = (passwordInput.value || "").trim();
      if (entered === event.password) {
        error.textContent = "";
        passwordForm.closest("[data-access-card]").classList.add("hidden");
        playerWrap.classList.remove("hidden");
        player.src = `https://www.youtube.com/embed/${encodeURIComponent(event.youtubeVideoId)}?autoplay=1&rel=0&modestbranding=1`;
      } else {
        error.textContent = "Incorrect password. Please try again.";
      }
    });
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  if (requestedSlug) {
    homeHero.classList.add("hidden");
    infoGrid.classList.add("hidden");
    eventList.classList.add("hidden");
    eventPanel.classList.remove("hidden");
    const event = events.find((item) => item.slug === requestedSlug);
    renderEvent(event);
  } else {
    eventPanel.classList.add("hidden");
    eventList.classList.remove("hidden");
    renderList();
  }
})();
