import { FORMSPREE_CONTACT_ENDPOINT } from "@/lib/formspree-config";

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
  contact_consent: boolean;
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
    const response = await fetch(FORMSPREE_CONTACT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        full_name: values.full_name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        sms_marketing_consent: values.sms_marketing_consent ? "Yes" : "No",
        sms_account_consent: values.sms_account_consent ? "Yes" : "No",
        _subject: "Dependable Movers — Website Contact",
      }),
    });

    const data = (await response.json()) as {
      error?: string;
      errors?: Array<{ message: string }>;
    };

    if (!response.ok) {
      return {
        ok: false,
        error:
          data.error ??
          data.errors?.[0]?.message ??
          "Unable to submit your message. Please try again.",
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
