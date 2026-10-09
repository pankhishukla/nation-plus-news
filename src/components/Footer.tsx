import Link from "next/link";
import { links, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <div>
          <p className="footer-name">{site.name}</p>
          <p>{site.description}</p>
        </div>
        <div className="footer-links">
          <a href={links.youtube} target="_blank" rel="noopener">YouTube</a>
          <a href={links.instagram} target="_blank" rel="noopener">Instagram</a>
          <Link href="/about">About us</Link>
        </div>
      </div>
      <p className="wrap footer-copy">© {site.name}, Vadodara, Gujarat</p>
    </footer>
  );
}
