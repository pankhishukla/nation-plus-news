import type { Metadata } from "next";
import { Hind_Vadodara } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Ticker } from "@/components/Ticker";
import { links, site } from "@/lib/site";
import "./globals.css";

// Hind Vadodara covers both Gujarati and Latin script.
const hind = Hind_Vadodara({
  variable: "--font-hind",
  subsets: ["gujarati", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline} | Vadodara & Gujarat News`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "gu_IN" },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: site.name,
  slogan: site.tagline,
  url: site.url,
  logo: `${site.url}/images/logo.png`,
  email: site.email,
  telephone: site.phone,
  parentOrganization: { "@type": "Organization", name: site.company },
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address[0]}, ${site.address[1]}`,
    addressLocality: "Vadodara",
    addressRegion: "Gujarat",
    postalCode: "390012",
    addressCountry: "IN",
  },
  sameAs: [links.youtube, links.instagram, links.facebook, links.x],
};

const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="gu" className={hind.variable}>
      <body>
        <Header />
        <Ticker />
        <main className="wrap main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
        />
        {adsense && (
          <Script
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense}`}
          />
        )}
      </body>
    </html>
  );
}
