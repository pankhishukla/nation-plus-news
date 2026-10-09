import { links, site } from "@/lib/site";

export function InstagramCta() {
  return (
    <a className="cta cta-instagram" href={links.instagram} target="_blank" rel="noopener">
      <strong>Follow @{site.instagramUsername} on Instagram</strong>
      <span>Daily reels and updates from across Vadodara.</span>
    </a>
  );
}

export function YouTubeCta() {
  return (
    <a className="cta cta-youtube" href={links.youtubeSubscribe} target="_blank" rel="noopener">
      <strong>Subscribe on YouTube</strong>
      <span>New videos every day from Vadodara and Central Gujarat.</span>
    </a>
  );
}
