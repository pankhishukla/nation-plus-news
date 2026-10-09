import Image from "next/image";
import Link from "next/link";
import { links, site, socials } from "@/lib/site";

const explore = [
  { href: "/videos", label: "Videos" },
  { href: "/shows", label: "Shows" },
  { href: "/schedule", label: "Schedule" },
  { href: "/watch", label: "Where to watch" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <div className="footer-brand">
          <Image className="footer-logo" src="/images/logo.png" alt={site.name} width={88} height={95} />
          <div>
            <p className="footer-name">{site.name}</p>
            <p>{site.description}</p>
            <p>A unit of {site.company}</p>
          </div>
        </div>
        <nav className="footer-links" aria-label="Explore">
          <b>Explore</b>
          {explore.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <nav className="footer-links" aria-label="Follow us">
          <b>Follow us</b>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener">
              {s.label}
            </a>
          ))}
        </nav>
        <address className="footer-links">
          <b>Contact</b>
          <a href={links.phone}>{site.phone}</a>
          <a href={links.email}>{site.email}</a>
          <span>{site.address.join(", ")}</span>
        </address>
      </div>
      <p className="wrap footer-copy">
        © {site.name} · {site.company}, Vadodara, Gujarat
      </p>
    </footer>
  );
}
