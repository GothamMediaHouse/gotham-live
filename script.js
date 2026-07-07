const config = window.GOTHAM_LIVE_CONFIG || {};

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("eventTitle").textContent = config.eventTitle || "Client Live Event";
document.getElementById("eventDescription").textContent = config.eventDescription || "Enter the event password to access the private livestream.";

function setPlayer() {
  const videoId = config.youtubeVideoId || "REPLACE_VIDEO_ID";
  document.getElementById("youtubePlayer").src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`;
}

function checkPassword() {
  const input = document.getElementById("passwordInput").value.trim();
  const error = document.getElementById("errorMessage");
  if (input === (config.password || "gothamlive")) {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("playerBox").classList.remove("hidden");
    error.textContent = "";
    setPlayer();
  } else {
    error.textContent = "Incorrect password. Please try again.";
  }
}

document.getElementById("passwordInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") checkPassword();
});
