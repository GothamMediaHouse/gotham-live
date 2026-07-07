# Gotham Media House Live Portal — Vercel Version

This is a static, Vercel-ready private livestream portal for `live.gothammediahouse.com`.

## What this does

- Hosts a Gotham Media House branded live page
- Uses a simple event password screen
- Embeds a YouTube Live video
- Works on Vercel free hosting
- Does not affect your Squarespace main website

## Files

- `index.html` — main page
- `styles.css` — design
- `script.js` — password/player logic
- `config.js` — change event title, password, and YouTube video ID here

## Edit your event

Open `config.js` and change:

```js
window.GOTHAM_LIVE_CONFIG = {
  eventTitle: "Client Live Event",
  eventDescription: "Enter the event password to access the private livestream.",
  password: "gothamlive",
  youtubeVideoId: "REPLACE_VIDEO_ID"
};
```

Example:

```js
window.GOTHAM_LIVE_CONFIG = {
  eventTitle: "ACME Annual Meeting",
  eventDescription: "Private livestream for ACME guests.",
  password: "acme2026",
  youtubeVideoId: "AbCdEf12345"
};
```

The YouTube video ID is the part after `v=` in a YouTube watch URL.

Example:

`https://www.youtube.com/watch?v=AbCdEf12345`

Video ID:

`AbCdEf12345`

## Deploy to GitHub

1. Create a GitHub repo called `gotham-live`.
2. Upload these files to the repo.
3. Commit the changes.

## Deploy to Vercel

1. Go to Vercel.
2. Add New Project.
3. Import your GitHub repo.
4. Framework preset: Other.
5. Build command: leave blank.
6. Output directory: leave blank.
7. Deploy.

## Add custom domain

In Vercel:

1. Project Settings.
2. Domains.
3. Add `live.gothammediahouse.com`.
4. Vercel will show the DNS record needed.

In Squarespace DNS:

1. Add the record Vercel tells you to add.
2. Usually it is:

Type: CNAME  
Host: live  
Value: cname.vercel-dns.com

3. Save.
4. Wait for Vercel to verify.

## Important security note

This is lightweight client-side password protection. It is useful for casual/private client viewing, but it is not true enterprise-grade authentication. For high-security events, use Vercel password protection, YouTube private restrictions, or a server-side login system.
