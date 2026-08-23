import Link from "next/link";

/**
 * PerPageLinks — Evomon-style contextual "Keep reading" route block (seo-eeat-audit §D).
 * Every content page needs 6-10 contextually-placed internal links spanning:
 * parent hub / prerequisite / next-step / sibling / entity-db. The previous pattern
 * was just a fixed 3-card Next block (measured: pages had only 2 unique real links).
 * This component lets a page declare its own decision-route links with descriptive anchors.
 *
 * Props: items = [{ href, label, hint }] in the order you want them grouped;
 * groups = [ {title, items:[links]}, ... ] for named sections (Parent / Next / Related).
 */
export function PerPageLinks({
  eyebrow,
  title,
  description,
  groups,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  groups: { title: string; links: { href: string; label: string; hint?: string }[] }[];
}) {
  return (
    <section className="mt-12">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-bold text-white">{title}</h2>
      {description ? <p className="mt-1 text-sm leading-6 text-white/65">{description}</p> : null}
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="text-sm font-semibold text-[color:var(--accent)]">{g.title}</p>
            <ul className="mt-2 space-y-2.5 text-sm">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-semibold text-white hover:text-[color:var(--accent)]">
                    {l.label}
                  </Link>
                  {l.hint ? <span className="block text-xs text-white/50">{l.hint}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
