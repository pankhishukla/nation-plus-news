import { devices, platforms } from "@/lib/channel";

export function Platforms({ withDevices = true }: { withDevices?: boolean }) {
  return (
    <div className="platforms">
      <ul className="chips">
        {platforms.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      {withDevices && (
        <>
          <p className="platforms-label">On your TV</p>
          <ul className="chips chips-dark">
            {devices.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
