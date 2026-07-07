(function () {
  const app = document.getElementById("app");
  const cfg = window.GOTHAM_LIVE_CONFIG || { events: [] };

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function findEventBySlug(slug) {
    return cfg.events.find(e => normalize(e.slug) === normalize(slug));
  }

  function findEventByAccess(accessCode, password) {
    return cfg.events.find(e =>
      normalize(e.accessCode) === normalize(accessCode) &&
      String(e.password || "") === String(password || "")
    );
  }

  function youtubeSrc(videoId) {
    if (!videoId || videoId.includes("REPLACE")) {
      return "";
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  }

  function renderLogin(message) {
    app.innerHTML = `
      <section class="login-shell">
        <div class="brand-card">
          <div class="eyebrow">Private Access</div>
          <h1>${cfg.brandName || "Gotham Media House"}</h1>
          <p>${cfg.brandLine || "Private Live Event Portal"}</p>
        </div>

        <form id="accessForm" class="access-card">
          <div class="lock-icon">LOCK</div>
          <h2>Enter Your Event</h2>
          <p class="muted">Use the access code and password provided by Gotham Media House.</p>

          ${message ? `<div class="error-box">${message}</div>` : ""}

          <label for="accessCode">Event Access Code</label>
          <input id="accessCode" name="accessCode" type="text" placeholder="Example: DEMO2026" autocomplete="off" required />

          <label for="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Enter password" required />

          <button type="submit">Enter Event</button>
          <p class="help-text">Need access? Contact ${cfg.supportEmail || "Gotham Media House"}.</p>
        </form>
      </section>
    `;

    document.getElementById("accessForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const accessCode = document.getElementById("accessCode").value;
      const password = document.getElementById("password").value;
      const event = findEventByAccess(accessCode, password);

      if (!event) {
        renderLogin("Invalid access code or password. Please try again.");
        return;
      }

      sessionStorage.setItem(`gotham_event_${event.slug}`, "authorized");
      window.location.href = `/?event=${encodeURIComponent(event.slug)}`;
    });
  }

  function renderEvent(event) {
    const src = youtubeSrc(event.youtubeVideoId);
    app.innerHTML = `
      <section class="event-shell">
        <header class="event-header">
          <div>
            <div class="eyebrow">${event.status || "Private Event"}</div>
            <h1>${event.title}</h1>
            <p class="client-name">${event.client || cfg.brandName}</p>
          </div>
          <button id="logoutButton" class="ghost-button">Exit</button>
        </header>

        <div class="event-meta">
          <span>${event.date || "Live Event"}</span>
          <span>Presented by ${cfg.brandName || "Gotham Media House"}</span>
        </div>

        <div class="video-frame">
          ${src ? `
            <iframe
              src="${src}"
              title="${event.title}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          ` : `
            <div class="placeholder-video">
              <h2>YouTube video ID needed</h2>
              <p>Edit <strong>config.js</strong> and replace <strong>${event.youtubeVideoId}</strong> with your YouTube video ID.</p>
            </div>
          `}
        </div>

        <section class="event-info">
          <h2>Private Livestream</h2>
          <p>${event.description || "This event is private and intended only for approved viewers."}</p>
        </section>
      </section>
    `;

    document.getElementById("logoutButton").addEventListener("click", function () {
      sessionStorage.removeItem(`gotham_event_${event.slug}`);
      window.location.href = "/";
    });
  }

  function init() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("event");

    if (!slug) {
      renderLogin();
      return;
    }

    const event = findEventBySlug(slug);
    if (!event) {
      renderLogin("Event not found. Please enter your access code and password.");
      return;
    }

    if (sessionStorage.getItem(`gotham_event_${event.slug}`) !== "authorized") {
      renderLogin("Please enter your access code and password to view this private event.");
      return;
    }

    renderEvent(event);
  }

  init();
})();
