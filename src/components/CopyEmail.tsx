import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText("faaiz290302@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-fg transition hover:bg-card-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
      onClick={copy}
      type="button"
      aria-live="polite"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? "Email copied" : "Copy email address"}
    </button>
  );
}
