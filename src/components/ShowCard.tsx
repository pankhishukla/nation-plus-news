import Image from "next/image";
import type { Show } from "@/lib/channel";

export function ShowCard({ show }: { show: Show }) {
  return (
    <article className="show-card">
      {show.image && (
        <div className="show-thumb">
          <Image src={show.image} alt="" fill sizes="(max-width: 600px) 100vw, 400px" />
        </div>
      )}
      <div className="show-body">
        <h3>{show.name}</h3>
        <p>{show.about}</p>
      </div>
    </article>
  );
}
