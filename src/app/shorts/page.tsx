import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { InstagramCta } from "@/components/FollowCta";
import { Section } from "@/components/Section";
import { getFeed } from "@/lib/feed";
import { instagramConnected } from "@/lib/instagram";

export const metadata: Metadata = { title: "Shorts & Reels" };

export default async function ShortsPage() {
  const { shorts } = await getFeed();
  return (
    <Section title="Shorts & Reels">
      {shorts.length ? (
        <div className="grid grid-vertical">
          {shorts.map((s, i) => (
            <Card key={s.id} item={s} priority={i < 6} />
          ))}
        </div>
      ) : (
        <p className="empty">No shorts in the latest uploads.</p>
      )}
      {!instagramConnected() && <InstagramCta />}
    </Section>
  );
}
