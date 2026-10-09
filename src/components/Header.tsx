import Image from "next/image";
import Link from "next/link";
import { links, site } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/videos", label: "Videos" },
  { href: "/shorts", label: "Shorts & Reels" },
  { href: "/shows", label: "Shows" },
  { href: "/schedule", label: "Schedule" },
  { href: "/watch", label: "Where to Watch" },
  { href: "/instagram", label: "Instagram" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="header">
      <div className="wrap header-row">
        <Link href="/" className="logo" aria-label={`${site.name} home`}>
          <Image className="logo-mark" src="/images/logo-mark.png" alt="" width={44} height={44} priority />
          <span className="logo-text">
            <b>NATION PLUS</b> NEWS
            <small>{site.tagline} · Vadodara</small>
          </span>
        </Link>
        <a className="btn-subscribe" href={links.youtubeSubscribe} target="_blank" rel="noopener">
          Subscribe
        </a>
      </div>
      <nav className="nav">
        <div className="wrap nav-row">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
