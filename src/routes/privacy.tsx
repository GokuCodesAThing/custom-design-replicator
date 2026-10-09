import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Vikas Engineering Works" },
      { name: "description", content: "How Vikas Engineering Works handles information submitted through enquiry forms." },
      { property: "og:title", content: "Privacy Policy — Vikas Engineering Works" },
      { property: "og:description", content: "How we handle information submitted through our enquiry forms." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl space-y-5 px-4 py-16 text-muted-foreground">
        <h1 className="text-4xl font-black text-foreground">Privacy Policy</h1>
        <p>When you submit an enquiry, we collect the details you provide — such as your name, phone number, email, company, project location and requirements.</p>
        <p>We use this information only to respond to your enquiry and prepare quotations. We do not sell or share your information with third parties for marketing.</p>
        <p>To ask us to update or delete your details, email <a className="font-semibold text-primary underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </main>
      <SiteFooter />
    </>
  );
}
