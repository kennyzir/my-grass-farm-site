/**
 * FreshnessStamp — a tiny "last checked" signal, not a disclaimer.
 * Placed at the foot of a page, after the answer. Players see the answer
 * first; the date is a quiet trust cue, not front-and-center self-justification.
 */
import { checkedDate, siteConfig } from "@/data/site";

export function VerificationBox({
  lastChecked,
  note,
}: {
  lastChecked?: string;
  note?: string;
}) {
  return (
    <div className="mt-3 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-xs leading-5 text-white/55">
      <span className="font-semibold text-white/75">Updated {lastChecked ?? checkedDate}</span>
      {note ? <span> · {note}</span> : <span> · {siteConfig.gameName} on Roblox</span>}
    </div>
  );
}
