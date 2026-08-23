/**
 * VerificationBox — visible freshness + sourcing note (EEAT as facts).
 * SOP: every content page must show last-checked / game-version + what's
 * verified vs not. This is the freshness signal that separates "topical
 * expert that maintains it" from "scraped relic" (Freshness Engine F-classes,
 * stealanegg §8 dwell rule). Renders a compact, honest, no-opinion strip.
 */
import { checkedDate, siteConfig } from "@/data/site";

export function VerificationBox({
  verifiedLabel,
  lastChecked,
  note,
}: {
  verifiedLabel?: string;
  lastChecked?: string;
  note?: string;
}) {
  return (
    <div className="mt-3 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-xs leading-5 text-white/60">
      <span className="font-semibold text-white/80">{verifiedLabel ?? "How we verify"}:</span>{" "}
      {note ??
        "This is an unofficial fan resource. Nothing here is invented — every claim traces to a dated official game page, a dated creator video, or is labeled as unconfirmed. Codes are marked only when an official dated drop confirms them."}{" "}
      <span className="text-white/45">
        · Last checked {lastChecked ?? checkedDate} · {siteConfig.gameName} on Roblox
      </span>
    </div>
  );
}
