import type { Metadata } from "next";
import { InstagramCta, YouTubeCta } from "@/components/FollowCta";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About us" };

export default function AboutPage() {
  return (
    <article className="prose">
      <h1>About {site.name}</h1>
      <p>
        {site.name} is a hyperlocal channel that is highly acclaimed and viewed across Central Gujarat. The channel is a
        platform for citizen-centric issues and their solutions.
      </p>
      <p>
        {site.name} is headed by {site.editor}, a broadcast journalist with 28 years in broadcast media. He has worked
        with news agencies including UNI and PTI, and was with Aaj Tak for more than 15 years.
      </p>
      <p>
        The channel is a mirror of those who truly work for the betterment of society with utmost zeal and enthusiasm.
        <strong> {site.tagline}</strong> is our motto.
      </p>
      <div className="cta-row">
        <YouTubeCta />
        <InstagramCta />
      </div>
    </article>
  );
}
