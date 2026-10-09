import Image from "next/image";
import Link from "next/link";
import { formatDate, formatViews } from "@/lib/feed";
import type { FeedItem } from "@/lib/types";

const badge = { youtube: "YouTube", instagram: "Instagram" } as const;

/** YouTube items open on our own watch page; Instagram items open on Instagram. */
export function hrefFor(item: FeedItem) {
  return item.source === "youtube" ? `/video/${item.id}` : item.url;
}

export function Card({ item, size = "md", priority }: { item: FeedItem; size?: "lg" | "md"; priority?: boolean }) {
  const vertical = item.kind === "short" || item.kind === "reel";
  const external = item.source === "instagram";
  const meta = [formatDate(item.publishedAt), formatViews(item.views)].filter(Boolean).join(" · ");

  return (
    <Link
      href={hrefFor(item)}
      className={`card card-${size} ${vertical ? "card-vertical" : ""}`}
      {...(external && { target: "_blank", rel: "noopener" })}
    >
      <div className="thumb">
        <Image
          src={item.thumbnail}
          alt=""
          fill
          sizes={size === "lg" ? "(max-width: 900px) 100vw, 60vw" : vertical ? "200px" : "(max-width: 600px) 100vw, 320px"}
          priority={priority}
        />
        <span className={`badge badge-${item.source}`}>{item.kind === "short" ? "Shorts" : badge[item.source]}</span>
        {(item.kind === "video" || item.kind === "short" || item.kind === "reel") && <span className="play" aria-hidden />}
      </div>
      <div className="card-body">
        <h3 className="card-title">{item.title}</h3>
        {meta && <p className="card-meta">{meta}</p>}
      </div>
    </Link>
  );
}
