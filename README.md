# Nation Plus News — website

Website for [Nation Plus News](https://www.nationplusnews.co.in), the hyperlocal news channel from Vadodara.
It automatically shows everything posted to:

- **YouTube** — [@nationplusnewschannel](https://www.youtube.com/@nationplusnewschannel) (videos and Shorts)
- **Instagram** — [@nationplusnews_](https://www.instagram.com/nationplusnews_/) (posts and reels)

Nobody has to upload anything to the website. New posts appear within about 5 minutes.

## Pages

| Page | What it shows |
| --- | --- |
| `/` | Lead story, top 5 headlines, Shorts & Reels row, Instagram grid, more videos |
| `/videos` | All recent YouTube videos |
| `/shorts` | YouTube Shorts + Instagram reels |
| `/instagram` | Instagram posts |
| `/video/<id>` | Watch page: player, description, WhatsApp share, more videos |
| `/about` | About the channel |

Every page also has a scrolling **LATEST** headline ticker.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the keys below
npm run dev                  # http://localhost:3000
```

## Connecting the feeds

### YouTube (works without any setup)

With no key, the site reads the channel's public feed and pages (latest ~30 videos and ~48 Shorts,
with approximate upload times). **For production, add a free YouTube Data API key**: it gives exact
upload times, full descriptions and is more reliable.

1. Go to <https://console.cloud.google.com/>, create a project.
2. *APIs & Services → Library →* enable **YouTube Data API v3**.
3. *Credentials → Create credentials → API key*. Restrict it to the YouTube Data API.
4. Put it in `YOUTUBE_API_KEY`.

The free quota (10,000 units/day) is far more than the site needs (~2 units per refresh).

### Instagram (needs a one-time setup by the account owner)

Instagram only allows this through its official API:

1. In the Instagram app, switch **@nationplusnews_** to a **Professional** account
   (Settings → Account type and tools → Switch to professional → *Creator* or *Business*).
2. Go to <https://developers.facebook.com/apps>, create an app (type: *Business*).
3. Add the **Instagram** product → **API setup with Instagram login**.
4. Under *Generate access tokens*, add @nationplusnews_ and log in. Copy the token.
5. Put it in `INSTAGRAM_ACCESS_TOKEN`.

Until the token is set, Instagram sections show a "Follow us on Instagram" card instead.

> **The token lasts 60 days.** Refresh it before it expires (any time after 24 hours):
>
> ```bash
> curl "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=$INSTAGRAM_ACCESS_TOKEN"
> ```
>
> and update the environment variable with the returned `access_token`.

### Ads

To keep Google AdSense, set `NEXT_PUBLIC_ADSENSE_CLIENT` to the `ca-pub-…` id from the AdSense account.

## Deploying

Recommended: [Vercel](https://vercel.com) (free tier is enough to start).

1. Push this folder to a GitHub repo and import it in Vercel.
2. Add the environment variables from `.env.example` in *Project → Settings → Environment Variables*.
3. *Project → Settings → Domains*: add `nationplusnews.co.in` and `www.nationplusnews.co.in`, then update
   the DNS records at the domain registrar (GoDaddy) as Vercel instructs. This replaces the current site.

## How it works

- `src/lib/youtube.ts` — YouTube: Data API → RSS feed → channel page, whichever works first.
- `src/lib/instagram.ts` — Instagram API.
- `src/lib/feed.ts` — merges both, newest first.
- Data is cached with Next.js `use cache` using the `feed` profile in `next.config.ts`
  (served instantly, refreshed in the background every 5 minutes).
- Branding (name, handles, tagline) lives in `src/lib/site.ts`; colours in `src/app/globals.css`.
