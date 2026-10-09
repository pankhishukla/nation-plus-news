import Link from "next/link";
import { Card, hrefFor } from "@/components/Card";
import { InstagramCta, YouTubeCta } from "@/components/FollowCta";
import { OnAir } from "@/components/OnAir";
import { Platforms } from "@/components/Platforms";
import { Section } from "@/components/Section";
import { ShowCard } from "@/components/ShowCard";
import { keyShows } from "@/lib/channel";
import { formatDate, getFeed } from "@/lib/feed";

export default async function Home() {
  const { all, videos, shorts, instagram } = await getFeed();
  const [lead, ...rest] = videos.length ? videos : all;

  if (!lead) {
    return (
      <div className="empty">
        <p>Couldn&apos;t load the latest videos right now.</p>
        <YouTubeCta />
      </div>
    );
  }

  return (
    <>
      <OnAir />
      <section className="hero">
        <Card item={lead} size="lg" priority />
        <ol className="headlines">
          {rest.slice(0, 5).map((v) => (
            <li key={v.id}>
              <Link href={hrefFor(v)}>
                <span>{v.title}</span>
                <small>{formatDate(v.publishedAt)}</small>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {shorts.length > 0 && (
        <Section title="Shorts & Reels" href="/shorts">
          <div className="row-scroll">
            {shorts.slice(0, 10).map((s) => (
              <Card key={s.id} item={s} />
            ))}
          </div>
        </Section>
      )}

      <Section title="Key shows" href="/shows">
        <div className="grid grid-shows">
          {keyShows.map((s) => (
            <ShowCard key={s.name} show={s} />
          ))}
        </div>
      </Section>

      <Section title="Latest from Instagram" href={instagram.length ? "/instagram" : undefined}>
        {instagram.length ? (
          <div className="grid grid-square">
            {instagram.slice(0, 8).map((p) => (
              <Card key={p.id} item={p} />
            ))}
          </div>
        ) : (
          <InstagramCta />
        )}
      </Section>

      <Section title="More videos" href="/videos">
        <div className="grid">
          {rest.slice(5, 17).map((v) => (
            <Card key={v.id} item={v} />
          ))}
        </div>
      </Section>

      <Section title="Watch Nation Plus News on" href="/watch" linkLabel="Where to watch →">
        <Platforms />
      </Section>

      <YouTubeCta />
    </>
  );
}
