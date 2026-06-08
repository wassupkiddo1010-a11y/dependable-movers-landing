import type { QuoteFormPayload } from "@/lib/submissions/quote-payload";
import { buildN8nLeadPayload } from "@/lib/submissions/quote-payload";

type SubmitResult = { ok: true } | { ok: false; error: string };

const DEFAULT_N8N_QUOTE_WEBHOOK =
  "https://jralexis18.app.n8n.cloud/webhook/lead-intake";

export async function submitQuoteLead(
  payload: QuoteFormPayload
): Promise<SubmitResult> {
  const n8nUrl =
    process.env.N8N_QUOTE_WEBHOOK_URL ?? DEFAULT_N8N_QUOTE_WEBHOOK;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const tableName = process.env.SUPABASE_QUOTE_TABLE ?? "quote_leads";
  const testRun = process.env.N8N_TEST_RUN === "true";

  const n8nPayload = buildN8nLeadPayload(payload, { testRun });

  const errors: string[] = [];

  try {
    const response = await fetch(n8nUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(n8nPayload),
    });
    if (!response.ok) {
      errors.push(`n8n webhook failed (${response.status})`);
    }
  } catch {
    errors.push("n8n webhook unreachable");
  }

  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ ...n8nPayload, ...payload }),
      });
      if (!response.ok) {
        errors.push(`Supabase insert failed (${response.status})`);
      }
    } catch {
      errors.push("Supabase unreachable");
    }
  }

  if (errors.length > 0) {
    console.error("[submitQuoteLead]", errors.join("; "));
    return {
      ok: false,
      error: "We could not submit your request. Please try again or call us.",
    };
  }

  return { ok: true };
}

export async function submitSubscribeEmail(email: string): Promise<SubmitResult> {
  const n8nUrl = process.env.N8N_SUBSCRIBE_WEBHOOK_URL;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const tableName = process.env.SUPABASE_SUBSCRIBE_TABLE ?? "newsletter_subscribers";

  const subscribePayload = {
    email: email.trim(),
    source: "Website",
    subscribed_at: new Date().toISOString(),
  };

  if (!n8nUrl && !(supabaseUrl && supabaseKey)) {
    return { ok: true };
  }

  const errors: string[] = [];

  if (n8nUrl) {
    try {
      const response = await fetch(n8nUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscribePayload),
      });
      if (!response.ok) errors.push(`n8n subscribe failed (${response.status})`);
    } catch {
      errors.push("n8n subscribe unreachable");
    }
  }

  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(subscribePayload),
      });
      if (!response.ok) {
        errors.push(`Supabase subscribe failed (${response.status})`);
      }
    } catch {
      errors.push("Supabase subscribe unreachable");
    }
  }

  if (errors.length > 0) {
    console.error("[submitSubscribeEmail]", errors.join("; "));
    return { ok: false, error: "Subscription failed. Please try again." };
  }

  return { ok: true };
}
