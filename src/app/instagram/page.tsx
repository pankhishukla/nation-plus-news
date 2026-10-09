import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { InstagramCta } from "@/components/FollowCta";
import { Section } from "@/components/Section";
import { getInstagramPosts } from "@/lib/instagram";

export const metadata: Metadata = { title: "Instagram" };

export default async function InstagramPage() {
  const posts = await getInstagramPosts();
  return (
    <Section title="Instagram">
      {posts.length > 0 && (
        <div className="grid grid-square">
          {posts.map((p, i) => (
            <Card key={p.id} item={p} priority={i < 4} />
          ))}
        </div>
      )}
      <InstagramCta />
    </Section>
  );
}
