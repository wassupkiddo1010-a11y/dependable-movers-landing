export type QuoteFormValues = {
  moving_from: string;
  moving_to: string;
  move_date: string;
  move_size: string;
  move_type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  sms_marketing_consent: boolean;
  sms_account_consent: boolean;
};

export type QuoteSubmitResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitQuoteForm(
  values: QuoteFormValues
): Promise<QuoteSubmitResult> {
  try {
    const response = await fetch("/api/quote/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      return {
        ok: false,
        error: data.error ?? "Unable to submit your request. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Unable to submit your request. Please try again.",
    };
  }
}

export type ContactFormValues = {
  full_name: string;
  phone: string;
  email: string;
  message: string;
  sms_marketing_consent: boolean;
  sms_account_consent: boolean;
};

export async function submitContactForm(
  values: ContactFormValues
): Promise<QuoteSubmitResult> {
  try {
    const response = await fetch("/api/contact/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      return {
        ok: false,
        error: data.error ?? "Unable to submit your message. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Unable to submit your message. Please try again.",
    };
  }
}
