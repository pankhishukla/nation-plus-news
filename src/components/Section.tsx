import Link from "next/link";
import type { ReactNode } from "react";

export function Section({
  title,
  href,
  linkLabel = "See all →",
  children,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  children: ReactNode;
}) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        {href && (
          <Link href={href} className="more">
            {linkLabel}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
