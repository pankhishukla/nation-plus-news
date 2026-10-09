"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { formatSlot, schedule, slotAt } from "@/lib/channel";

/** Current IST minute of the day, re-checked every 30 seconds. -1 on the server. */
export function useIstMinute() {
  return useSyncExternalStore(
    (onChange) => {
      const id = setInterval(onChange, 30_000);
      return () => clearInterval(id);
    },
    () => {
      const ist = new Date(Date.now() + 330 * 60_000);
      return ist.getUTCHours() * 60 + ist.getUTCMinutes();
    },
    () => -1,
  );
}

/** "On air now" strip for the 24/7 channel. */
export function OnAir() {
  const minute = useIstMinute();
  const now = minute < 0 ? null : slotAt(minute);
  const next = now === null ? null : schedule[(now + 1) % schedule.length];

  return (
    <Link href="/schedule" className="onair">
      <span className="onair-live">ON AIR</span>
      <span className="onair-now">{now === null ? "Nation Plus News · 24/7" : schedule[now][1]}</span>
      {next && (
        <span className="onair-next">
          Next at {formatSlot(next[0])}: {next[1]}
        </span>
      )}
      <span className="onair-link">Full schedule →</span>
    </Link>
  );
}
