import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, BadgeCheck, Clock, Cog, Factory, HardHat, Headset, Mail, MapPin, MessageCircle,
  Phone, ShieldCheck, Truck, Users, Wrench, Cpu, PackageCheck, Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SITE } from "@/lib/site-config";
import hero from "@/assets/hero.jpg";
import pcc from "@/assets/pcc.jpg";
import mcc from "@/assets/mcc.jpg";
import apfc from "@/assets/apfc.jpg";
import feeder from "@/assets/feeder.jpg";
import db from "@/assets/db.jpg";
import automation from "@/assets/automation.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Electrical Panel Manufacturer in Aligarh | Vikas Engineering Works" },
      { name: "description", content: "PCC, MCC, APFC panel manufacturer and supplier in Aligarh. Distribution boards, feeder panels, control & automation panels, installation and maintenance." },
      { property: "og:title", content: "Vikas Engineering Works — Electrical Panel Solutions, Aligarh" },
      { property: "og:description", content: "Manufacturer and supplier of PCC, MCC, APFC, feeder panels, distribution boards and automation panels." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: SITE.name,
          email: SITE.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Anupshahr Road, Bhatauti C.D.F.",
            addressLocality: "Aligarh",
            addressRegion: "Uttar Pradesh",
            postalCode: "202001",
            addressCountry: "IN",
          },
          description: "Manufacturer and supplier of PCC, MCC, APFC, feeder panels, distribution boards and control & automation panels in Aligarh.",
        }),
      },
    ],
  }),
  component: Index,
});

const PRODUCTS = [
  { name: "PCC Panel", img: pcc, short: "Power Control Centre panels for main incoming power and distribution.", detail: "PCC panels receive incoming supply and distribute power to downstream loads, typically using air or moulded case circuit breakers with metering and protection." },
  { name: "MCC Panel", img: mcc, short: "Motor Control Centre panels to start, stop and protect motors.", detail: "MCC panels group motor starters, overload protection and control switches for multiple motors in one organised enclosure." },
  { name: "APFC Panel", img: apfc, short: "Automatic Power Factor Correction to improve power factor.", detail: "APFC panels switch capacitor banks automatically via a power factor controller to help maintain a healthy power factor." },
  { name: "Feeder Panel", img: feeder, short: "Feeder and power distribution panels for multiple outgoing circuits.", detail: "Feeder panels distribute power from a main source to several outgoing feeders, each with its own protective breaker." },
  { name: "Distribution Board", img: db, short: "Electrical power distribution boards for buildings and facilities.", detail: "Distribution boards house MCBs/RCCBs that divide supply into final circuits for lighting, sockets and small loads." },
  { name: "Control & Automation Panel", img: automation, short: "Panels for control and automation applications.", detail: "Control panels bring together control devices such as relays, drives and controllers for process and machine applications, built as per requirement." },
];

const SERVICES = [
  { icon: Factory, title: "Electrical Panel Manufacturing", text: "Fabrication and wiring of LT electrical panels built to your requirement." },
  { icon: PackageCheck, title: "Panel Supply & Customization", text: "Panels supplied and configured to suit your site and load needs." },
  { icon: HardHat, title: "Installation & Commissioning", text: "On-site installation, connection and commissioning of panels." },
  { icon: Wrench, title: "Panel Maintenance", text: "Routine maintenance to keep your panels running reliably." },
  { icon: Cpu, title: "Control & Automation Solutions", text: "Control panels for automation applications as per your needs." },
  { icon: Headset, title: "Technical Support & Troubleshooting", text: "Help to identify and resolve electrical panel issues." },
];

const WHY = [
  { icon: ShieldCheck, title: "Quality and Reliability", text: "Careful workmanship focused on safe, dependable panels." },
  { icon: Lightbulb, title: "Practical Engineering Solutions", text: "Solutions designed around your actual site requirement." },
  { icon: Users, title: "Customer-Focused Approach", text: "Clear communication from enquiry to handover." },
  { icon: Truck, title: "Timely Delivery", text: "We plan work to meet agreed project timelines." },
  { icon: Cog, title: "Installation & Maintenance Support", text: "Support beyond supply — on site when you need it." },
];

const CATS = ["All", "PCC Panels", "MCC Panels", "APFC Panels", "Distribution Boards", "Automation Panels", "Installation Work"] as const;
const GALLERY = [
  { img: pcc, cat: "PCC Panels", alt: "Sample image of a PCC panel" },
  { img: mcc, cat: "MCC Panels", alt: "Sample image of an MCC panel" },
  { img: apfc, cat: "APFC Panels", alt: "Sample image of an APFC panel with capacitors" },
  { img: db, cat: "Distribution Boards", alt: "Sample image of a distribution board" },
  { img: automation, cat: "Automation Panels", alt: "Sample image of a control and automation panel" },
  { img: hero, cat: "Installation Work", alt: "Sample image of panels in a workshop" },
];

function SectionHead({ eyebrow, title, sub, light }: { eyebrow: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.25em]">
        <span className={light ? "text-accent" : "rounded bg-accent px-2 py-1 text-accent-foreground"}>{eyebrow}</span>
      </p>
      <h2 className={`mt-4 text-3xl font-black sm:text-4xl ${light ? "text-primary-foreground" : "text-primary"}`}>{title}</h2>
      {sub && <p className={`mt-3 ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{sub}</p>}
    </div>
  );
}

function Index() {
  const [product, setProduct] = useState("");
  const [openDetail, setOpenDetail] = useState<string | null>(null);
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");

  const quote = (p: string) => {
    setProduct(p);
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };
  const wa = SITE.phone ? `https://wa.me/${SITE.phone}?text=${encodeURIComponent("Hello Vikas Engineering Works, I would like a quote for an electrical panel.")}` : "";

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section id="home" className="relative overflow-hidden bg-primary text-primary-foreground">
          <img src={hero} alt="Electrical control panels being manufactured in a workshop" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hero" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:py-40">
            <div className="max-w-2xl animate-rise">
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                <MapPin className="h-3.5 w-3.5" /> Electrical Panel Manufacturer · Aligarh
              </p>
              <h1 className="mt-6 text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
                Reliable Electrical Panel Solutions for <span className="text-accent">Your Industry</span>
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80">
                Manufacturer and Supplier of PCC, MCC, APFC, Feeder Panels, Distribution Boards and Control &amp; Automation Panels.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="cta" size="lg"><a href="#products">Explore Our Products <ArrowRight /></a></Button>
                <Button asChild variant="heroOutline" size="lg"><a href="#quote">Get a Free Quote</a></Button>
              </div>
            </div>
          </div>
        </section>

        {/* Strengths strip */}
        <section className="bg-accent text-accent-foreground">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 text-sm font-bold lg:grid-cols-4">
            {[["Manufacturing", Factory], ["Supply", PackageCheck], ["Installation", HardHat], ["Maintenance", Wrench]].map(([t, I]) => {
              const Icon = I as typeof Factory;
              return <div key={t as string} className="flex items-center gap-2"><Icon className="h-5 w-5 shrink-0" />{t as string}</div>;
            })}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em]"><span className="rounded bg-accent px-2 py-1 text-accent-foreground">About Us</span></p>
            <h2 className="mt-4 text-3xl font-black text-primary sm:text-4xl">Electrical engineering you can rely on</h2>
            <p className="mt-5 text-muted-foreground">
              VIKAS ENGINEERING WORKS is an electrical engineering business based in Aligarh, Uttar Pradesh, focused on the manufacturing, supply, installation and maintenance of electrical panels for industrial and commercial use.
            </p>
            <p className="mt-3 text-muted-foreground">
              From power control and motor control centres to distribution boards and automation panels, we work with customers to deliver panels that suit their site and load requirements.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [BadgeCheck, "Quality-focused workmanship"],
              [Cog, "Reliable engineering solutions"],
              [Users, "Customer-oriented service"],
              [Clock, "Timely project execution"],
            ].map(([I, t]) => {
              const Icon = I as typeof Cog;
              return (
                <div key={t as string} className="rounded-2xl border bg-card p-6 shadow-card">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-accent"><Icon className="h-5 w-5" /></span>
                  <p className="mt-4 font-display font-bold text-primary">{t as string}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Products */}
        <section id="products" className="bg-secondary py-20">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHead eyebrow="Products" title="Electrical panels we manufacture & supply" sub="PCC, MCC and APFC panel manufacturer in Aligarh — plus feeder panels, distribution boards and control & automation panels." />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.map((p) => (
                <article key={p.name} className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-card transition hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img src={p.img} alt={`${p.name} — electrical panel`} loading="lazy" width={944} height={704} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-black text-primary">{p.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.short}</p>
                    {openDetail === p.name && <p className="mt-3 rounded-lg bg-secondary p-3 text-sm text-foreground">{p.detail}</p>}
                    <div className="mt-auto flex gap-2 pt-5">
                      <Button variant="outline" className="flex-1" aria-expanded={openDetail === p.name} onClick={() => setOpenDetail(openDetail === p.name ? null : p.name)}>
                        {openDetail === p.name ? "Hide Details" : "View Details"}
                      </Button>
                      <Button className="flex-1" onClick={() => quote(p.name)}>Request a Quote</Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="bg-primary py-20 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHead light eyebrow="Services" title="Electrical panel installation & maintenance" sub="Support across the life of your panels." />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 transition hover:border-accent/60">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-5 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-primary-foreground/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="work" className="mx-auto max-w-7xl px-4 py-20">
          <SectionHead eyebrow="Our Work" title="Project gallery" sub="Sample images shown — genuine company project photos will be added soon." />
          <div role="tablist" aria-label="Gallery categories" className="mb-8 flex flex-wrap justify-center gap-2">
            {CATS.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.filter((g) => cat === "All" || g.cat === cat).map((g) => (
              <figure key={g.alt} className="relative overflow-hidden rounded-2xl shadow-card">
                <img src={g.img} alt={g.alt} loading="lazy" width={944} height={704} className="aspect-[4/3] w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 flex justify-between bg-primary/85 px-4 py-2 text-xs font-semibold text-primary-foreground">
                  <span>{g.cat}</span><span className="text-accent">Sample image</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Why */}
        <section className="bg-secondary py-20">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHead eyebrow="Why Choose Us" title="Built on quality, delivered with care" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {WHY.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl bg-card p-6 text-center shadow-card">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground"><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-4 font-bold text-primary">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section id="quote" className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em]"><span className="rounded bg-accent px-2 py-1 text-accent-foreground">Request a Quote</span></p>
              <h2 className="mt-4 text-3xl font-black text-primary sm:text-4xl">Tell us about your requirement</h2>
              <p className="mt-4 text-muted-foreground">Share your panel or service needs and we'll get back to you with a quotation.</p>
              {wa && (
                <Button asChild variant="cta" size="lg" className="mt-6">
                  <a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle /> Enquire on WhatsApp</a>
                </Button>
              )}
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-card sm:p-8">
              <EnquiryForm defaultProduct={product} />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-primary py-20 text-primary-foreground">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2">
            <div>
              <SectionHead light eyebrow="Contact Us" title="Visit or reach out" />
              <ul className="space-y-5">
                <li className="flex gap-4"><MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" /><div><p className="font-bold">{SITE.name}</p><p className="text-primary-foreground/75">{SITE.address}</p></div></li>
                <li className="flex gap-4"><Mail className="mt-1 h-5 w-5 shrink-0 text-accent" /><a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a></li>
                {SITE.phone && <li className="flex gap-4"><Phone className="mt-1 h-5 w-5 shrink-0 text-accent" /><a href={`tel:+${SITE.phone}`} className="hover:text-accent">{SITE.phoneDisplay || SITE.phone}</a></li>}
                {SITE.hours && <li className="flex gap-4"><Clock className="mt-1 h-5 w-5 shrink-0 text-accent" /><span>{SITE.hours}</span></li>}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="cta"><a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapQuery)}`} target="_blank" rel="noopener noreferrer">Get Directions</a></Button>
                <Button asChild variant="heroOutline"><a href="#quote">Send an Enquiry</a></Button>
              </div>
            </div>
            <iframe
              title="Map showing Vikas Engineering Works location in Aligarh"
              src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`}
              className="h-80 w-full rounded-2xl border-0 lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
