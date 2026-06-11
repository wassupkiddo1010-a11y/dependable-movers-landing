export type QuoteFormPayload = {
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
  source: string;
  submitted_at: string;
};

/** Payload shape expected by the n8n lead-intake webhook. */
export type N8nLeadPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  delivery_city: string;
  delivery_state: string;
  pick_up_zip: string;
  delivery_zip: string;
  move_date: string;
  move_size: string;
  source: "Website";
  test_run?: boolean;
};

export function parseLocationLabel(label: string): {
  city: string;
  state: string;
  zip: string;
} {
  const trimmed = label.trim();
  const match = trimmed.match(/^(.+?),\s*([A-Za-z]{2})\s*(\d{5})?/);
  if (match) {
    return {
      city: match[1].trim(),
      state: match[2].toUpperCase(),
      zip: match[3] ?? "",
    };
  }

  const zipOnly = trimmed.match(/\b(\d{5})\b/);
  return {
    city: trimmed.replace(/\b\d{5}\b/, "").replace(/,\s*[A-Za-z]{2}\s*$/, "").trim(),
    state: "",
    zip: zipOnly?.[1] ?? "",
  };
}

export function formatMoveDateForN8n(isoDate: string): string {
  const parts = isoDate.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!parts) return isoDate.trim();
  return `${parts[2]}/${parts[3]}/${parts[1]}`;
}

export function buildQuotePayload(input: {
  movingFrom: string;
  movingTo: string;
  moveDate: string;
  moveSize: string;
  moveType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  smsMarketingConsent: boolean;
  smsAccountConsent: boolean;
  contactConsent: boolean;
}): QuoteFormPayload {
  return {
    moving_from: input.movingFrom.trim(),
    moving_to: input.movingTo.trim(),
    move_date: input.moveDate.trim(),
    move_size: input.moveSize.trim(),
    move_type: input.moveType.trim(),
    first_name: input.firstName.trim(),
    last_name: input.lastName.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    sms_marketing_consent: input.smsMarketingConsent,
    sms_account_consent: input.smsAccountConsent,
    contact_consent: input.contactConsent,
    source: "dependablemovers.com",
    submitted_at: new Date().toISOString(),
  };
}

export function buildN8nLeadPayload(
  payload: QuoteFormPayload,
  options?: { testRun?: boolean }
): N8nLeadPayload {
  const origin = parseLocationLabel(payload.moving_from);
  const destination = parseLocationLabel(payload.moving_to);

  const n8nPayload: N8nLeadPayload = {
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    phone: payload.phone,
    city: origin.city,
    state: origin.state,
    delivery_city: destination.city,
    delivery_state: destination.state,
    pick_up_zip: origin.zip,
    delivery_zip: destination.zip,
    move_date: formatMoveDateForN8n(payload.move_date),
    move_size: payload.move_size,
    source: "Website",
  };

  if (options?.testRun) {
    n8nPayload.test_run = true;
  }

  return n8nPayload;
}

export function validateQuotePayload(
  payload: QuoteFormPayload
): string | null {
  if (!payload.moving_from || !payload.moving_to) {
    return "Please fill in both origin and destination.";
  }
  if (!payload.move_date) {
    return "Please select your moving date.";
  }
  if (!payload.move_size) {
    return "Please select your move size.";
  }
  if (!payload.move_type) {
    return "Please select your move type.";
  }
  if (!payload.first_name || !payload.last_name) {
    return "Please enter your first and last name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "Please enter a valid email address.";
  }
  if (payload.phone.replace(/\D/g, "").length < 10) {
    return "Please enter a valid phone number.";
  }
  if (!payload.sms_marketing_consent) {
    return "Please agree to the marketing text message consent to continue.";
  }
  if (!payload.sms_account_consent) {
    return "Please agree to the account text message consent to continue.";
  }
  if (!payload.contact_consent) {
    return "Please agree to the contact consent to continue.";
  }
  return null;
}
