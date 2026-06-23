/** Matches homepage hero form options (index.html). */
import { SITE_NAME } from "@/lib/site-config";

export const MOVE_SIZE_OPTIONS = [
  "Studio",
  "1 Bedroom",
  "2 Bedrooms",
  "3 Bedrooms",
  "4 Bedrooms",
  "5+ Bedrooms",
] as const;

export const MOVE_TYPE_OPTIONS = ["House", "Apartment", "Businesses"] as const;

export const SMS_MARKETING_CONSENT_LABEL =
  "I consent to receive marketing text messages, about special offers, discounts, and service updates, from Dependable Movers at the phone number provided. Message frequency may vary. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out.";

export const SMS_ACCOUNT_CONSENT_LABEL =
  "I consent to receive non-marketing text messages from Dependable Movers about account updates, service alerts, and support-related communications. Message frequency may vary, message and data rates may apply. Text HELP for assistance, reply STOP to opt out.";

export const QUOTE_CONTACT_CONSENT_LABEL =
  "By submitting this form, I consent to be contacted by Dependable Movers at the phone number provided, including via automated telephone calls and AI-generated voice messages, regarding my move request. I understand I can opt out at any time by saying 'stop' during any call. Message and data rates may apply.";

/** 8x8 / carrier SMS disclosure — shown on the contact form before submit. */
export const CONTACT_SMS_DISCLOSURE_PREFIX = `By providing my phone number to ${SITE_NAME}, I agree and acknowledge that ${SITE_NAME} may send text messages to my wireless phone number for any purpose. Message and data rates may apply. Message frequency will vary, and you will be able to opt out by replying "STOP". Assistance can be found by texting "HELP". For more information on how your data will be handled please visit:`;
