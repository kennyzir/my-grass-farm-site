import Link from "next/link";
import { AdsterraSmartLinkAnchor } from "@/components/ads";
import { officialLinks, siteConfig } from "@/data/site";
import { topicClusters } from "@/data/topic-clusters";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0c0f]">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <h2 className="text-xl font-extrabold text-white">{siteConfig.name}</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/62">{siteConfig.shortDisclosure}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Core pages</h3>
            <div className="mt-3 grid gap-2 text-sm text-white/62">
              <Link href="/en/codes" className="hover:text-white">Codes</Link>
              <Link href="/en/how-to-play" className="hover:text-white">How to Play</Link>
              <Link href="/trello" className="hover:text-white">Trello/Discord</Link>
              <Link href="/wiki" className="hover:text-white">Wiki</Link>
              <Link href="/guides" className="hover:text-white">Guides</Link>
              {topicClusters.slice(0, 14).map((cluster) => (
                <Link key={cluster.route} href={cluster.route} className="hover:text-white">
                  {cluster.navTitle}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Sources</h3>
            <div className="mt-3 grid gap-2 text-sm text-white/62">
              {officialLinks.map((link) => (
                link.href.startsWith("/") ? (
                  <Link key={link.href} href={link.href} className="hover:text-white">
                    {link.title}
                  </Link>
                ) : (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="hover:text-white">
                    {link.title}
                  </a>
                )
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Site info</h3>
            <div className="mt-3 grid gap-2 text-sm text-white/62">
              <Link href="/sources" className="hover:text-white">Sources</Link>
              <Link href="/trello" className="hover:text-white">Community status</Link>
              <Link href="/about" className="hover:text-white">About Us</Link>
              <Link href="/contact" className="hover:text-white">Contact Us</Link>
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
              <Link href="/disclosure" className="hover:text-white">Fan-made disclosure</Link>
              <AdsterraSmartLinkAnchor className="hover:text-white">Sponsored</AdsterraSmartLinkAnchor>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-5 text-sm text-white/42">
          {siteConfig.domain.replace("https://", "")} is an unofficial fan-made Roblox resource.
        </div>
      </div>
    </footer>
  );
}
