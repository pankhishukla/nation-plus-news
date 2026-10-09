import Link from "next/link";
import { getYouTubeVideos } from "@/lib/youtube";

/** "Latest" headline strip built from the newest uploads. */
export async function Ticker() {
  const latest = (await getYouTubeVideos()).slice(0, 8);
  if (!latest.length) return null;

  return (
    <div className="ticker">
      <div className="wrap ticker-row">
        <span className="ticker-label">LATEST</span>
        <div className="ticker-track">
          <div className="ticker-items">
            {[...latest, ...latest].map((v, i) => (
              <Link key={i} href={`/video/${v.id}`} tabIndex={i >= latest.length ? -1 : undefined}>
                {v.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
