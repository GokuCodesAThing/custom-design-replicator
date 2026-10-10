import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { oauthReturnPath } from "@/lib/oauth-return-path";

export const Route = createFileRoute("/login")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s["next"] === "string" ? s["next"] : "",
  }),
  component: Login,
});

function Login() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const returnPath = oauthReturnPath(next);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setBusy(false);
        setError(error.message);
        return;
      }
      navigate({ to: returnPath });
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: new URL(returnPath, window.location.origin).href },
    });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setNotice("Account created. Check your email to confirm, then sign in.");
    setMode("signin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-card">
        <h1 className="font-display text-2xl font-bold text-foreground">
          {mode === "signin" ? "Sign in" : "Create an account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to connect an assistant to Vikas Engineering Works.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
            />
          </div>
          {error && (
            <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          {notice && (
            <p className="rounded-lg bg-accent px-4 py-2 text-sm text-accent-foreground">{notice}</p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground disabled:opacity-50"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}
          </button>
        </form>
        <button
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
            setNotice(null);
          }}
          className="mt-4 w-full text-center text-sm text-muted-foreground underline"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}
