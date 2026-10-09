import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { enquirySchema } from "@/lib/enquiry";
import { PRODUCTS } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "error"; msg: string };

const field = "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/40";
const label = "text-sm font-semibold text-foreground";

export function EnquiryForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = enquirySchema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      setStatus({ kind: "error", msg: "Please fix the highlighted fields." });
      return;
    }
    setErrors({});
    setStatus({ kind: "sending" });
    const v = parsed.data;
    const { error } = await supabase.from("enquiries").insert({
      name: v.name,
      company: v.company || null,
      phone: v.phone,
      email: v.email || null,
      product: v.product,
      location: v.location,
      quantity: v.quantity || null,
      message: v.message,
    });
    if (error) {
      setStatus({ kind: "error", msg: "Sorry, your enquiry could not be sent. Please try again or email us." });
      return;
    }
    form.reset();
    setStatus({ kind: "ok" });
  }

  const err = (k: string) =>
    errors[k] ? <p id={`${k}-err`} className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;
  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={label}>Customer Name *</label>
        <input id="name" name="name" autoComplete="name" className={field} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="company" className={label}>Company Name</label>
        <input id="company" name="company" autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor="phone" className={label}>Phone Number *</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} {...aria("phone")} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="email" className={label}>Email Address</label>
        <input id="email" name="email" type="email" autoComplete="email" className={field} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="product" className={label}>Product or Service Required *</label>
        <select id="product" name="product" defaultValue={defaultProduct} key={defaultProduct} className={field} {...aria("product")}>
          <option value="">Select…</option>
          {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
        </select>
        {err("product")}
      </div>
      <div>
        <label htmlFor="location" className={label}>Project Location *</label>
        <input id="location" name="location" className={field} {...aria("location")} />
        {err("location")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="quantity" className={label}>Quantity</label>
        <input id="quantity" name="quantity" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>Message / Requirements *</label>
        <textarea id="message" name="message" rows={4} className={field} {...aria("message")} />
        {err("message")}
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" variant="cta" size="lg" disabled={status.kind === "sending"} className="w-full sm:w-auto">
          {status.kind === "sending" && <Loader2 className="animate-spin" />}
          Submit Enquiry
        </Button>
        <div aria-live="polite">
          {status.kind === "ok" && (
            <p className="mt-4 flex items-center gap-2 rounded-lg bg-success/10 p-3 text-sm font-medium text-success">
              <CheckCircle2 className="h-5 w-5 shrink-0" /> Thank you! Your enquiry has been received. We'll get back to you soon.
            </p>
          )}
          {status.kind === "error" && (
            <p className="mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
              <AlertCircle className="h-5 w-5 shrink-0" /> {status.msg}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
