import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Card } from "@/components/Card";
import { YouTubeCta } from "@/components/FollowCta";
import { Section } from "@/components/Section";
import { formatDate, formatViews } from "@/lib/feed";
import { site } from "@/lib/site";
import { getYouTubeVideo, getYouTubeVideos } from "@/lib/youtube";

export async function generateStaticParams() {
  const videos = await getYouTubeVideos();
  // Cache Components requires at least one entry; other ids render on first visit.
  return videos.length ? videos.slice(0, 20).map((v) => ({ id: v.id })) : [{ id: "latest" }];
}

export async function generateMetadata({ params }: PageProps<"/video/[id]">): Promise<Metadata> {
  const video = await getYouTubeVideo((await params).id);
  if (!video) return {};
  return {
    title: video.title,
    description: video.description.slice(0, 160) || site.description,
    openGraph: { title: video.title, images: [video.thumbnail], type: "video.other" },
  };
}

export default function VideoPage({ params }: PageProps<"/video/[id]">) {
  return (
    <Suspense fallback={<div className="player player-loading" />}>
      {params.then(({ id }) => (
        <Watch id={id} />
      ))}
    </Suspense>
  );
}

async function Watch({ id }: { id: string }) {
  const [video, all] = await Promise.all([getYouTubeVideo(id), getYouTubeVideos()]);
  if (!video) notFound();

  const vertical = video.kind === "short";
  const share = encodeURIComponent(`${video.title}\n${site.url}/video/${video.id}`);
  const meta = [formatDate(video.publishedAt), formatViews(video.views)].filter(Boolean).join(" · ");

  return (
    <>
      <div className="watch">
        <div className={`player ${vertical ? "player-vertical" : ""}`}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="watch-info">
          <h1>{video.title}</h1>
          {meta && <p className="card-meta">{meta}</p>}
          <div className="share">
            <a className="btn btn-whatsapp" href={`https://wa.me/?text=${share}`} target="_blank" rel="noopener">
              Share on WhatsApp
            </a>
            <a className="btn" href={video.url} target="_blank" rel="noopener">
              Watch on YouTube
            </a>
          </div>
          {video.description && <p className="description">{video.description}</p>}
        </div>
      </div>

      <Section title="More videos">
        <div className="grid">
          {all
            .filter((v) => v.id !== video.id && v.kind === "video")
            .slice(0, 8)
            .map((v) => (
              <Card key={v.id} item={v} />
            ))}
        </div>
      </Section>
      <YouTubeCta />
    </>
  );
}
