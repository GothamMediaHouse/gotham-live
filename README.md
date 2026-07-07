# Gotham Live Access Portal

## How it works

Clients go to:

https://live.gothammediahouse.com

They enter:
- Event Access Code
- Password

If correct, they are sent to their private event page. They do not see a public list of events.

## Configure events

Edit `config.js`.

Example:

```js
{
  accessCode: "ACME2026",
  password: "acme123",
  slug: "acme-town-hall",
  title: "Annual Town Hall",
  client: "ACME Corporation",
  date: "July 15, 2026",
  description: "Private town hall livestream produced by Gotham Media House.",
  youtubeVideoId: "AbCdEf12345",
  status: "LIVE"
}
```

## YouTube video ID

If your YouTube URL is:

https://www.youtube.com/watch?v=AbCdEf12345

Use:

```js
youtubeVideoId: "AbCdEf12345"
```

## Deploy

Upload all extracted files to the root of your GitHub repo:

- index.html
- styles.css
- script.js
- config.js
- vercel.json
- README.md

Vercel will redeploy automatically.

## Important security note

This is a static website. It hides events from normal users and provides client-facing privacy, but passwords are stored in front-end code. For high-security events, use a backend authentication system.
