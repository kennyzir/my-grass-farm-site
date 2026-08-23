/**
 * PlayQuickRules + VideoGuide — Evomon-style Search-Job blocks (evomon-style-ia.md).
 *   PlayQuickRules: a tight "what you actually do" 30-second-answer strip right under
 *     the H1 (the "Quick rules" block Evomon leads every decision page with).
 *   VideoGuide: a titled, lazy-loaded YouTube explainer embed (Evomon embeds one on
 *     essentially every decision/tier/guide page).
 * Both are locale-aware via the page's own `T` dict (pass localized strings in).
 */
export function PlayQuickRules({
  label,
  rules,
}: {
  label: string;
  rules: string[];
}) {
  return (
    <section className="mt-10">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--accent)]">{label}</p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-white/80 sm:grid-cols-2">
          {rules.map((r, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[color:var(--accent)]">▸</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function VideoGuide({
  eyebrow,
  title,
  description,
  embedId,
  entity,
}: {
  eyebrow: string;
  title: string;
  description: string;
  embedId: string;
  entity?: string;
}) {
  return (
    <section className="mt-10">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-bold text-white">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-white/65">{description}</p>
      <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${embedId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          data-entity={entity ?? ""}
        />
      </div>
    </section>
  );
}

/**
 * DataTable — the Evomon "lookup table-first" pattern for an entity database hub.
 * Rows are keyed data (name/columns); locale strings come from the page's own `T`.
 * Use this where a page needs a searchable/structured dataset rather than prose cards
 * (evomon's items/map hubs use tables first).
 */
export function DataTable({
  eyebrow,
  title,
  description,
  columns,
  rows,
  emptyLabel,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  columns: string[];
  rows: string[][];
  emptyLabel?: string;
}) {
  return (
    <section className="mt-10">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-bold text-white">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm leading-6 text-white/65">{description}</p>
      ) : null}
      <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-black/30 text-white/60">
              {columns.map((c, i) => (
                <th key={i} className="px-4 py-2.5 font-semibold">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && emptyLabel ? (
              <tr><td colSpan={columns.length} className="px-4 py-4 text-white/50">{emptyLabel}</td></tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i} className="border-b border-white/5 even:bg-white/[0.02]">
                  {r.map((cell, j) => (
                    <td key={j} className="px-4 py-2.5 text-white/80">{cell}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
