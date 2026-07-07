(function () {
  const config = window.GOTHAM_LIVE_CONFIG || {};
  const events = config.events || [];
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get("event");

  const siteTitle = document.querySelector("[data-site-title]");
  const siteSubtitle = document.querySelector("[data-site-subtitle]");
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

  if (siteTitle) siteTitle.textContent = config.siteTitle || "Gotham Media House Live";
  if (siteSubtitle) siteSubtitle.textContent = config.siteSubtitle || "Private livestream access.";

  function eventUrl(slug) {
    return `${window.location.origin}${window.location.pathname}?event=${encodeURIComponent(slug)}`;
  }

  function renderList() {
    if (!eventList) return;
    eventList.innerHTML = "";
    events.forEach((event) => {
      const card = document.createElement("a");
      card.className = "event-card";
      card.href = `?event=${encodeURIComponent(event.slug)}`;
      card.innerHTML = `
        <div class="event-kicker">Private Event</div>
        <h2>${event.title}</h2>
        <p>${event.date || "Date TBA"}</p>
        <span>Open event page</span>
      `;
      eventList.appendChild(card);
    });
  }

  function renderEvent(event) {
    if (!event) {
      if (eventPanel) {
        eventPanel.innerHTML = `<h2>Event not found</h2><p>Check the event link and try again.</p><p><a href="/">Back to events</a></p>`;
      }
      return;
    }

    if (eventTitle) eventTitle.textContent = event.title;
    if (eventDate) eventDate.textContent = event.date || "Private event";
    if (eventDescription) eventDescription.textContent = event.description || "Enter the event password to access the private livestream.";

    if (backLink) backLink.href = window.location.pathname;

    passwordForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const entered = passwordInput.value.trim();
      if (entered === event.password) {
        error.textContent = "";
        passwordForm.classList.add("hidden");
        playerWrap.classList.remove("hidden");
        player.src = `https://www.youtube.com/embed/${event.youtubeVideoId}?autoplay=1&rel=0`;
      } else {
        error.textContent = "Incorrect password. Please try again.";
      }
    });
  }

  if (requestedSlug) {
    if (eventList) eventList.classList.add("hidden");
    if (eventPanel) eventPanel.classList.remove("hidden");
    const event = events.find((item) => item.slug === requestedSlug);
    renderEvent(event);
  } else {
    if (eventPanel) eventPanel.classList.add("hidden");
    if (eventList) eventList.classList.remove("hidden");
    renderList();
  }
})();
