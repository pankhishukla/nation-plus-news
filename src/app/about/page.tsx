import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Platforms } from "@/components/Platforms";
import { Section } from "@/components/Section";
import { coverage, edges, infrastructure, team, vision, workflow } from "@/lib/channel";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.name}, a unit of ${site.company}, Vadodara — a technology-first news channel. Meet our leadership, coverage and vision.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div>
          <p className="eyebrow">Company overview</p>
          <h1>Redefining news media through technology</h1>
          <p>
            {site.name} operates under <strong>{site.company}</strong>, headquartered in Vadodara, Gujarat. We
            represent a fundamental shift in how news organisations operate — built from the ground up as a
            technology-first media platform.
          </p>
          <p>
            Our approach combines credible journalism with advanced digital infrastructure, making us one of
            Gujarat&apos;s first media organisations to adopt a deeply integrated AI and automation-driven operating model.
          </p>
        </div>
        <Image src="/images/logo.png" alt={site.name} width={437} height={474} sizes="240px" className="about-logo" />
      </section>

      <ol className="steps">
        {workflow.map((w, i) => (
          <li key={w.title}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <strong>{w.title}</strong>
            {w.text}
          </li>
        ))}
      </ol>

      <Section title="Leadership">
        {team.map((m) => (
          <article key={m.name} className="editor">
            <Image
              src={m.photo.src}
              alt={`${m.name}, ${m.role} of ${site.name}`}
              width={m.photo.width}
              height={m.photo.height}
              sizes="(max-width: 600px) 260px, 220px"
            />
            <div>
              <p className="editor-role">{m.role}</p>
              <h2>{m.name}</h2>
              <p>{m.summary}</p>
              <ul>
                {m.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </Section>

      <Section title="What we cover">
        <div className="grid grid-coverage">
          {coverage.map((c) => (
            <article key={c.slug} className="show-card">
              <div className="show-thumb">
                <Image src={`/images/coverage/${c.slug}.jpg`} alt="" fill sizes="(max-width: 600px) 100vw, 300px" />
              </div>
              <div className="show-body">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Our vision: digital-first news media">
        <ul className="features">
          {vision.map((v) => (
            <li key={v.title}>
              <strong>{v.title}</strong>
              {v.text}
            </li>
          ))}
        </ul>
        <p className="note">
          We use AI across content processing, news monitoring and production, resource optimisation and decision
          support — making us faster and more consistent while editors keep full control. Our AI-driven approach
          ensures operational efficiency without compromising journalistic integrity.
        </p>
      </Section>

      <Section title="Our competitive edge">
        <ol className="features features-numbered">
          {edges.map((e) => (
            <li key={e.title}>
              <strong>{e.title}</strong>
              {e.text}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Infrastructure & broadcast">
        <ul className="features">
          {infrastructure.map((v) => (
            <li key={v.title}>
              <strong>{v.title}</strong>
              {v.text}
            </li>
          ))}
        </ul>
        <div className="stats">
          <div>
            <b>100%</b>
            <span>Digital native — born in the cloud, with AI from day one</span>
          </div>
          <div>
            <b>24/7</b>
            <span>Always on — uninterrupted operations on redundant infrastructure</span>
          </div>
        </div>
      </Section>

      <Section title="Where to watch" href="/watch" linkLabel="More →">
        <Platforms withDevices={false} />
      </Section>

      <section className="partner">
        <h2>The future of news media</h2>
        <p>
          {site.name} represents a new paradigm in journalism, where technology amplifies human insight, automation
          sharpens editorial focus, and infrastructure lets us scale without limits. We invite partners, investors and
          media executives to explore collaboration as we shape the future of credible, technology-driven news.
        </p>
        <Link href="/contact" className="btn-subscribe">
          Partner with us
        </Link>
      </section>
    </>
  );
}
