import Link from "next/link";
import { mainEngine } from "@/data/intent-ownership";

/**
 * MainEngineBacklink — every inner page ends by pointing back up to the
 * homepage's ONE irreducible answer ("what to upgrade first"). This is the
 * mechanical spine of Homepage-First: the whole site orbits one value prop.
 */
export function MainEngineBacklink({ isEs = false, prefix = "/en" }: { isEs?: boolean; prefix?: string }) {
  return (
    <section data-home-block-id="main-engine-backlink" className="mx-auto max-w-7xl px-4 py-8">
      <div className="rounded-lg border border-white/10 bg-black/20 p-5">
        <span className="mini-label">{isEs ? "La decisión clave" : "The one decision"}</span>
        <p className="mt-2 text-sm leading-7 text-white/75">
          {isEs ? (
            <>¿Todavía dudando entre <Link href="/" className="font-semibold text-[color:var(--accent)] hover:underline">cuchillas y trabajadores</Link>? Esa es la decisión que importa: {mainEngine.anchorEs}.</>
          ) : (
            <>Still deciding between <Link href="/" className="font-semibold text-[color:var(--accent)] hover:underline">blades and workers</Link>? That's the decision that matters — {mainEngine.anchorEn}.</>
          )}
        </p>
      </div>
    </section>
  );
}
