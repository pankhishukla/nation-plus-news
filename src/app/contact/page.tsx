import type { Metadata } from "next";
import { links, site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Contact ${site.name}, Vadodara — phone, email, office address and social media.`,
};

export default function ContactPage() {
  return (
    <>
      <div className="page-head">
        <h1>Contact us</h1>
        <p>
          News tips, advertising, partnerships or feedback — we&apos;d like to hear from you. We invite partners,
          investors and media executives to explore collaboration opportunities.
        </p>
      </div>

      <ul className="tiles tiles-contact">
        <li>
          <a href={links.phone}>
            <small>Call us</small>
            <strong>{site.phone}</strong>
          </a>
        </li>
        <li>
          <a href={links.email}>
            <small>Email</small>
            <strong>{site.email}</strong>
          </a>
        </li>
        <li>
          <a href={links.map} target="_blank" rel="noopener">
            <small>Office</small>
            <strong>
              {site.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </strong>
            <span className="more">Open in Google Maps →</span>
          </a>
        </li>
      </ul>

      <h2 className="subhead">Follow us</h2>
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
        {site.name} is a unit of {site.company}.
      </p>
    </>
  );
}
