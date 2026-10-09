import { getInstagramPosts } from "./instagram";
import type { FeedItem } from "./types";
import { getYouTubeVideos } from "./youtube";

export async function getFeed() {
  const [youtube, instagram] = await Promise.all([getYouTubeVideos(), getInstagramPosts()]);
  const all = [...youtube, ...instagram].sort(byNewest);
  return {
    all,
    videos: youtube.filter((v) => v.kind === "video"),
    shorts: [...youtube.filter((v) => v.kind === "short"), ...instagram.filter((v) => v.kind === "reel")].sort(byNewest),
    instagram,
  };
}

const byNewest = (a: FeedItem, b: FeedItem) => b.publishedAt.localeCompare(a.publishedAt);

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

export const formatDate = (iso: string) => (iso ? dateFmt.format(new Date(iso)) : "");

export const formatViews = (n?: number) =>
  n === undefined ? "" : `${new Intl.NumberFormat("en-IN", { notation: "compact" }).format(n)} views`;
