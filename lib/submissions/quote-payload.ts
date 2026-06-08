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
  source: string;
  submitted_at: string;
};

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
    source: "dependablemovers.com",
    submitted_at: new Date().toISOString(),
  };
}

export function validateQuotePayload(
  payload: QuoteFormPayload
): string | null {
  if (!payload.moving_from || !payload.moving_to) {
    return "Origin and destination are required.";
  }
  if (!payload.move_date || !payload.move_size || !payload.move_type) {
    return "Move details are required.";
  }
  if (!payload.first_name || !payload.last_name) {
    return "Name is required.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "A valid email is required.";
  }
  if (payload.phone.replace(/\D/g, "").length < 10) {
    return "A valid phone number is required.";
  }
  return null;
}
