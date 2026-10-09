import { Link } from "@tanstack/react-router";
import { Logo, NAV } from "./SiteHeader";
import { SITE } from "@/lib/site-config";

const PRODUCT_LINKS = ["PCC Panel", "MCC Panel", "APFC Panel", "Feeder Panel", "Distribution Board", "Control & Automation Panel"];

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-primary-foreground/70">
            Manufacturing, supply, installation and maintenance of electrical panels in Aligarh, Uttar Pradesh.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            {NAV.map((n) => <li key={n.href}><a href={n.href} className="hover:text-accent">{n.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent">Products</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            {PRODUCT_LINKS.map((p) => <li key={p}><a href="/#products" className="hover:text-accent">{p}</a></li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent">Contact</h3>
          <address className="mt-4 space-y-2 text-sm not-italic text-primary-foreground/80">
            <p>{SITE.address}</p>
            <p><a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a></p>
            {SITE.phone && <p><a href={`tel:+${SITE.phone}`} className="hover:text-accent">{SITE.phoneDisplay || SITE.phone}</a></p>}
          </address>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <Link to="/privacy" className="hover:text-accent">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
