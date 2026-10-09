import Link from "next/link";
import type { ReactNode } from "react";

export function Section({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: ReactNode;
}) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        {href && (
          <Link href={href} className="more">
            See all →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
