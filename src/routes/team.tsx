import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Vikas Engineering Works, Aligarh" },
      { name: "description", content: "Meet the team behind Vikas Engineering Works — electrical panel manufacturer and supplier in Aligarh, Uttar Pradesh." },
      { property: "og:title", content: "Our Team — Vikas Engineering Works" },
      { property: "og:description", content: "Meet the team behind Vikas Engineering Works, Aligarh." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Team,
});

const TEAM = ["Aditya Kumar", "Gopal Sharma", "Aman Bhardwaj", "Himanshu Deopa"];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function Team() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4">
            <p className="inline-block rounded bg-accent px-2 py-1 text-xs font-bold uppercase tracking-[0.25em] text-accent-foreground">Our Team</p>
            <h1 className="mt-4 text-4xl font-black sm:text-5xl">Meet the team</h1>
            <p className="mt-4 max-w-2xl text-primary-foreground/80">
              The people behind {SITE.name} — working together on the manufacturing, supply, installation and maintenance of electrical panels in Aligarh, Uttar Pradesh.
            </p>
          </div>
        </section>

        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((name) => (
                <article key={name} className="rounded-2xl bg-card p-8 text-center shadow-card">
                  <span aria-hidden="true" className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-2xl font-black text-accent">
                    {initials(name)}
                  </span>
                  <h2 className="mt-5 font-display text-lg font-black text-primary">{name}</h2>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h2 className="text-2xl font-black text-primary sm:text-3xl">Need a panel or a service?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Send us your requirement and we will get back to you with a quotation.</p>
          <Button asChild variant="cta" size="lg" className="mt-6">
            <a href="/#quote">Get a Free Quote <ArrowRight /></a>
          </Button>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
