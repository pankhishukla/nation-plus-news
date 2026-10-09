import { cacheLife, cacheTag } from "next/cache";
import { site } from "./site";
import type { FeedItem } from "./types";

const API = "https://www.googleapis.com/youtube/v3";

/**
 * Latest uploads from the channel. Tries, in order: the Data API (when a key is set),
 * the public RSS feed, then the channel's public Videos/Shorts pages.
 */
export async function getYouTubeVideos(): Promise<FeedItem[]> {
  "use cache";
  cacheLife("feed");
  cacheTag("youtube");

  const key = process.env.YOUTUBE_API_KEY;
  const dataApi = () => fromApi(key!);
  const sources = [...(key ? [dataApi] : []), fromRss, fromChannelPage];
  for (const source of sources) {
    try {
      const items = await source();
      if (items.length) return items;
    } catch (err) {
      console.error(`[youtube] ${source.name} failed:`, err instanceof Error ? err.message : err);
    }
  }
  return [];
}

/** A single video by id. Falls back to oEmbed for videos older than the feed window. */
export async function getYouTubeVideo(id: string): Promise<FeedItem | null> {
  "use cache";
  cacheLife("feed");

  if (!/^[\w-]{11}$/.test(id)) return null;
  const fromFeed = (await getYouTubeVideos()).find((v) => v.id === id);
  if (fromFeed) return fromFeed;

  try {
    const key = process.env.YOUTUBE_API_KEY;
    if (key) {
      const items = await videoDetails(key, [id]);
      return items[0]?.channelId === site.youtubeChannelId ? toItem(items[0]) : null;
    }
    const res = await fetch(
      `https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${id}`,
    );
    if (!res.ok) return null;
    const o = await res.json();
    // Only show videos from our own channel.
    if (!String(o.author_url).toLowerCase().includes(site.youtubeHandle)) return null;
    return {
      id,
      source: "youtube",
      kind: "video",
      title: o.title,
      description: "",
      thumbnail: thumb(id),
      url: `https://www.youtube.com/watch?v=${id}`,
      publishedAt: "",
    };
  } catch {
    return null;
  }
}

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

async function fromRss(): Promise<FeedItem[]> {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${site.youtubeChannelId}`);
  if (!res.ok) throw new Error(`RSS ${res.status}`);
  const xml = await res.text();

  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => {
    const tag = (name: string) => decode(e.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1] ?? "");
    const id = tag("yt:videoId");
    const link = e.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? "";
    const views = e.match(/<media:statistics views="(\d+)"/)?.[1];
    return {
      id,
      source: "youtube",
      kind: link.includes("/shorts/") ? "short" : "video",
      title: tag("title"),
      description: tag("media:description"),
      thumbnail: thumb(id),
      url: link || `https://www.youtube.com/watch?v=${id}`,
      publishedAt: tag("published"),
      views: views ? Number(views) : undefined,
    } satisfies FeedItem;
  });
}

// The channel page embeds its data as `ytInitialData`. This has no exact upload
// dates ("13 hr ago"), so they are approximated. Set YOUTUBE_API_KEY for exact data.
async function fromChannelPage(): Promise<FeedItem[]> {
  const [videos, shorts] = await Promise.all([channelTab("videos"), channelTab("shorts")]);
  const now = Date.now();

  const longForm = collect(videos, "lockupViewModel").map((v): FeedItem => {
    const id = v.contentId;
    const parts = v.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel?.metadataRows?.[0]?.metadataParts ?? [];
    const label = (i: number): string => parts[i]?.accessibilityLabel ?? parts[i]?.text?.content ?? "";
    return {
      id,
      source: "youtube",
      kind: "video",
      title: v.metadata?.lockupMetadataViewModel?.title?.content ?? "",
      description: "",
      thumbnail: thumb(id),
      url: `https://www.youtube.com/watch?v=${id}`,
      publishedAt: new Date(now - ago(label(1))).toISOString(),
      views: Number(label(0).replace(/\D/g, "")) || undefined,
    };
  });

  const shortForm = collect(shorts, "shortsLockupViewModel").map((s): FeedItem => {
    const id = s.onTap?.innertubeCommand?.reelWatchEndpoint?.videoId ?? "";
    const views = s.overlayMetadata?.secondaryText?.content ?? "";
    return {
      id,
      source: "youtube",
      kind: "short",
      title: s.overlayMetadata?.primaryText?.content ?? String(s.accessibilityText).split(", ")[0],
      description: "",
      thumbnail: thumb(id),
      url: `https://www.youtube.com/shorts/${id}`,
      publishedAt: "",
      views: compact(views),
    };
  });

  return [...longForm, ...shortForm].filter((v) => /^[\w-]{11}$/.test(v.id) && v.title);
}

async function channelTab(tab: "videos" | "shorts") {
  const res = await fetch(`https://www.youtube.com/channel/${site.youtubeChannelId}/${tab}`, {
    headers: { "User-Agent": "Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/130 Safari/537.36", "Accept-Language": "en" },
  });
  if (!res.ok) throw new Error(`channel ${tab} ${res.status}`);
  const json = (await res.text()).match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/)?.[1];
  if (!json) throw new Error(`channel ${tab}: no ytInitialData`);
  return JSON.parse(json);
}

/* eslint-disable @typescript-eslint/no-explicit-any -- untyped YouTube page data */
function collect(node: any, key: string, out: any[] = []): any[] {
  if (Array.isArray(node)) node.forEach((n) => collect(n, key, out));
  else if (node && typeof node === "object") {
    if (key in node) out.push(node[key]);
    Object.values(node).forEach((n) => collect(n, key, out));
  }
  return out;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/** "13 hours ago" → milliseconds. */
function ago(text: string) {
  const m = text.match(/(\d+)\s*(second|minute|min|hour|hr|day|week|month|year)/);
  if (!m) return 0;
  const unit = { second: 1, minute: 60, min: 60, hour: 3600, hr: 3600, day: 86400, week: 604800, month: 2592000, year: 31536000 }[m[2]]!;
  return Number(m[1]) * unit * 1000;
}

/** "1.2K views" → 1200. */
function compact(text: string) {
  const m = text.match(/([\d.]+)\s*([KMB])?/i);
  if (!m) return undefined;
  return Math.round(Number(m[1]) * ({ K: 1e3, M: 1e6, B: 1e9 }[m[2]?.toUpperCase() as "K"] ?? 1));
}

interface ApiVideo {
  id: string;
  channelId: string;
  snippet: { title: string; description: string; publishedAt: string; channelId: string };
  contentDetails: { duration: string };
  statistics?: { viewCount?: string };
}

async function fromApi(key: string): Promise<FeedItem[]> {
  // Every channel's uploads playlist is its id with "UC" swapped for "UU".
  const playlist = "UU" + site.youtubeChannelId.slice(2);
  const res = await fetch(`${API}/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlist}&key=${key}`);
  if (!res.ok) throw new Error(`playlistItems ${res.status}`);
  const ids: string[] = (await res.json()).items.map((i: { contentDetails: { videoId: string } }) => i.contentDetails.videoId);
  return (await videoDetails(key, ids)).map(toItem);
}

async function videoDetails(key: string, ids: string[]) {
  const res = await fetch(`${API}/videos?part=snippet,contentDetails,statistics&id=${ids.join(",")}&key=${key}`);
  if (!res.ok) throw new Error(`videos ${res.status}`);
  const items: ApiVideo[] = (await res.json()).items;
  return items.map((v) => ({ ...v, channelId: v.snippet.channelId }));
}

function toItem(v: ApiVideo): FeedItem {
  return {
    id: v.id,
    source: "youtube",
    // YouTube Shorts are vertical uploads of up to 3 minutes.
    kind: seconds(v.contentDetails.duration) <= 180 ? "short" : "video",
    title: v.snippet.title,
    description: v.snippet.description,
    thumbnail: thumb(v.id),
    url: `https://www.youtube.com/watch?v=${v.id}`,
    publishedAt: v.snippet.publishedAt,
    views: v.statistics?.viewCount ? Number(v.statistics.viewCount) : undefined,
  };
}

function seconds(iso: string) {
  const [, h = 0, m = 0, s = 0] = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)?.map(Number) ?? [];
  return h * 3600 + m * 60 + s;
}

function decode(s: string) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}
