import type { Metadata } from "next";
import Link from "next/link";
import { YouTubeCta } from "@/components/FollowCta";
import { Section } from "@/components/Section";
import { ShowCard } from "@/components/ShowCard";
import { keyShows, programmes } from "@/lib/channel";

export const metadata: Metadata = {
  title: "Shows",
  description: "Key shows and programmes on Nation Plus News — Podcast with Vashishth, Top 10, Live Debate and more.",
};

export default function ShowsPage() {
  const others = programmes.filter((p) => !keyShows.includes(p));
  return (
    <>
      <Section title="Key shows">
        <div className="grid grid-shows">
          {keyShows.map((s) => (
            <ShowCard key={s.name} show={s} />
          ))}
        </div>
      </Section>

      <Section title="All programmes" href="/schedule" linkLabel="See timings →">
        <ul className="programme-list">
          {others.map((s) => (
            <li key={s.name}>
              <strong>{s.name}</strong>
              <span>{s.about}</span>
            </li>
          ))}
        </ul>
      </Section>

      <p className="note">
        Missed a show? Catch up on <Link href="/videos">recent videos</Link>.
      </p>
      <YouTubeCta />
    </>
  );
}
