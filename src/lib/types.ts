export type Source = "youtube" | "instagram";
export type Kind = "video" | "short" | "reel" | "post";

export interface FeedItem {
  id: string;
  source: Source;
  kind: Kind;
  title: string;
  description: string;
  thumbnail: string;
  /** Link to the original post on YouTube / Instagram. */
  url: string;
  /** ISO timestamp. */
  publishedAt: string;
  views?: number;
}
