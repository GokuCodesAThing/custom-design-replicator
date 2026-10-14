import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NAV = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#products", label: "Products" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Our Work" },
  { href: "/team", label: "Our Team" },
  { href: "/#contact", label: "Contact" },
];

const isAnchor = (href: string) => href.startsWith("/#");
const navClass = "text-sm font-medium text-primary-foreground/80 transition-colors hover:text-accent";

export function Logo() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="Vikas Engineering Works home">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
        <Zap className="h-5 w-5" fill="currentColor" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate font-display text-base font-black tracking-tight">VIKAS ENGINEERING</span>
        <span className="block text-[0.65rem] font-semibold tracking-[0.3em] text-accent">WORKS</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-primary-foreground/10 bg-primary/95 text-primary-foreground backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:flex lg:justify-between">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-accent">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="cta" className="hidden sm:inline-flex">
            <a href="/#quote">Get a Quote</a>
          </Button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md hover:bg-primary-foreground/10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-primary-foreground/10 px-4 pb-4 lg:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block border-b border-primary-foreground/10 py-3 font-medium">
              {n.label}
            </a>
          ))}
          <Button asChild variant="cta" className="mt-4 w-full">
            <a href="/#quote" onClick={() => setOpen(false)}>Get a Quote</a>
          </Button>
        </nav>
      )}
    </header>
  );
}
