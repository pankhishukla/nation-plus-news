import { cacheLife, cacheTag } from "next/cache";
import type { FeedItem } from "./types";

interface Media {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_product_type?: "FEED" | "REELS" | "STORY" | "AD";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

export const instagramConnected = () => Boolean(process.env.INSTAGRAM_ACCESS_TOKEN);

/** Latest posts and reels via the Instagram API (with Instagram Login). Empty until a token is configured. */
export async function getInstagramPosts(): Promise<FeedItem[]> {
  "use cache";
  cacheLife("feed");
  cacheTag("instagram");

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const fields = "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp";
    const res = await fetch(`https://graph.instagram.com/me/media?fields=${fields}&limit=50&access_token=${token}`);
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    const { data }: { data: Media[] } = await res.json();

    return data
      .filter((m) => m.media_product_type !== "STORY")
      .map((m) => {
        const caption = m.caption ?? "";
        return {
          id: m.id,
          source: "instagram",
          kind: m.media_type === "VIDEO" ? "reel" : "post",
          title: caption.split("\n")[0].slice(0, 140) || "Instagram post",
          description: caption,
          thumbnail: (m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url) ?? "",
          url: m.permalink,
          publishedAt: m.timestamp,
        } satisfies FeedItem;
      })
      .filter((m) => m.thumbnail);
  } catch (err) {
    console.error("[instagram] feed failed:", err);
    return [];
  }
}
