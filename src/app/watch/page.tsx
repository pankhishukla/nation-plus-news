import type { Metadata } from "next";
import { InstagramCta, YouTubeCta } from "@/components/FollowCta";
import { Platforms } from "@/components/Platforms";
import { Section } from "@/components/Section";
import { socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Where to watch",
  description: "Watch Nation Plus News on OTT apps, smart TVs, YouTube and social media.",
};

export default function WatchPage() {
  return (
    <>
      <div className="page-head">
        <h1>Where to watch</h1>
        <p>
          Nation Plus News is the first channel in Gujarat to be available on an OTT application. Watch us on OTT and
          streaming apps, on your smart TV, on this website and across social media.
        </p>
      </div>

      <Section title="OTT & streaming apps">
        <Platforms />
      </Section>

      <Section title="Online & social">
        <ul className="tiles">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener">
                <strong>{s.label}</strong>
                <span>{s.handle}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="note">
          Also on WhatsApp, and in our mobile app with the news in 60 words.
        </p>
      </Section>

      <div className="cta-row">
        <YouTubeCta />
        <InstagramCta />
      </div>
    </>
  );
}
