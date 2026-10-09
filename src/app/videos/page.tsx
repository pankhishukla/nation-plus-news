import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { YouTubeCta } from "@/components/FollowCta";
import { Section } from "@/components/Section";
import { getFeed } from "@/lib/feed";

export const metadata: Metadata = { title: "Videos" };

export default async function VideosPage() {
  const { videos } = await getFeed();
  return (
    <Section title="All videos">
      <div className="grid">
        {videos.map((v, i) => (
          <Card key={v.id} item={v} priority={i < 4} />
        ))}
      </div>
      <YouTubeCta />
    </Section>
  );
}
