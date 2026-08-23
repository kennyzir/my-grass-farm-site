import Link from "next/link";
import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro">
      <span className="mini-label">{eyebrow}</span>
      <h1 className="mt-3 text-4xl font-extrabold leading-tight text-white md:text-6xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-white/72">{description}</p>
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div>
      <span className="mini-label">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-4xl">{title}</h2>
      {copy ? <p className="mt-3 max-w-3xl text-base leading-7 text-white/64">{copy}</p> : null}
    </div>
  );
}

export function ContentPanel({ children }: { children: ReactNode }) {
  return <section className="content-card">{children}</section>;
}

export function TrustNote({ title, body }: { title: string; body: string }) {
  return (
    <article className="content-card">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/66">{body}</p>
    </article>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav className="mb-6 flex flex-wrap gap-2 text-sm text-white/55" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-white">Home</Link>
      {items.map((item) => (
        <span key={item.href} className="flex items-center gap-2">
          <span aria-hidden="true">/</span>
          <Link href={item.href} className="hover:text-white">{item.label}</Link>
        </span>
      ))}
    </nav>
  );
}
