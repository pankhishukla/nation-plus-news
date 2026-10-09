import Link from "next/link";

export default function NotFound() {
  return (
    <div className="empty">
      <h1>Page not found</h1>
      <p>
        This video or page isn&apos;t available. <Link href="/">Back to the latest news →</Link>
      </p>
    </div>
  );
}
