(function () {
  const config = window.GOTHAM_LIVE_CONFIG || { events: [] };
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("event");
  const event = config.events.find((item) => item.slug === slug);

  const accessPanel = document.getElementById("access-panel");
  const eventPanel = document.getElementById("event-panel");
  const form = document.getElementById("password-form");
  const input = document.getElementById("password-input");
  const error = document.getElementById("access-error");

  const accessTitle = document.getElementById("access-title");
  const accessCopy = document.getElementById("access-copy");

  const eventDate = document.getElementById("event-date");
  const eventTitle = document.getElementById("event-title");
  const eventDescription = document.getElementById("event-description");
  const player = document.getElementById("youtube-player");

  if (!slug || !event) {
    accessTitle.textContent = "Private Event Access";
    accessCopy.textContent = "Please use the private event link provided by Gotham Media House.";
    form.hidden = true;
    return;
  }

  accessTitle.textContent = event.title;
  accessCopy.textContent = "Enter the password provided for this private event.";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const entered = input.value.trim();

    if (entered !== event.password) {
      error.hidden = false;
      input.value = "";
      input.focus();
      return;
    }

    error.hidden = true;
    accessPanel.hidden = true;
    eventPanel.hidden = false;

    eventDate.textContent = event.date || "Private Event";
    eventTitle.textContent = event.title;
    eventDescription.textContent = event.description || "Private livestream event hosted by Gotham Media House.";
    player.src = "https://www.youtube.com/embed/" + event.youtubeVideoId + "?autoplay=1&rel=0&modestbranding=1";
  });
})();
