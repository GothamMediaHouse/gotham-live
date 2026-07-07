# Gotham Media House Live — Premium Vercel Site

Upload these extracted files to your GitHub repo root:

- index.html
- styles.css
- script.js
- config.js
- vercel.json
- README.md

Do not upload the ZIP itself.

## Edit events

Open `config.js` and edit the `events` list.

Example:

```js
{
  slug: "acme-town-hall",
  title: "ACME Town Hall",
  date: "August 2026",
  description: "Private livestream for ACME guests.",
  password: "acme2026",
  youtubeVideoId: "YOUTUBE_VIDEO_ID"
}
```

The event URL will be:

`https://live.gothammediahouse.com/?event=acme-town-hall`

or:

`https://live.gothammediahouse.com/acme-town-hall`

## YouTube video ID

If your YouTube URL is:

`https://www.youtube.com/watch?v=AbCdEf12345`

Use:

`youtubeVideoId: "AbCdEf12345"`

## Deploy

Commit the files to GitHub. Vercel will automatically redeploy.
