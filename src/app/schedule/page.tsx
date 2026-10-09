import type { Metadata } from "next";
import { OnAir } from "@/components/OnAir";
import { ScheduleTable } from "@/components/ScheduleTable";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Nation Plus News 24/7 programme schedule (fix point chart), in Indian Standard Time.",
};

export default function SchedulePage() {
  return (
    <>
      <div className="page-head">
        <h1>Programme schedule</h1>
        <p>Weekday fix point chart. All times are Indian Standard Time (IST).</p>
      </div>
      <OnAir />
      <ScheduleTable />
    </>
  );
}
