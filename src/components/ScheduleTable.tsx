"use client";

import { formatSlot, schedule, slotAt } from "@/lib/channel";
import { useIstMinute } from "./OnAir";

const parts = [
  { title: "Morning", from: 0, to: 11 },
  { title: "Afternoon", from: 11, to: 21 },
  { title: "Evening", from: 21, to: 29 },
  { title: "Night", from: 29, to: schedule.length },
];

export function ScheduleTable() {
  const minute = useIstMinute();
  const current = minute < 0 ? -1 : slotAt(minute);

  return (
    <div className="schedule">
      {parts.map((p) => (
        <section key={p.title}>
          <h2>{p.title}</h2>
          <ol>
            {schedule.slice(p.from, p.to).map(([time, show], i) => {
              const live = p.from + i === current;
              return (
                <li key={time} className={live ? "is-live" : undefined} aria-current={live ? "true" : undefined}>
                  <time>{formatSlot(time)}</time>
                  <span>{show}</span>
                  {live && <b>LIVE</b>}
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
