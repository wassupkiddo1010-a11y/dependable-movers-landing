/** Formspree endpoint for the /contact/ page form. Set NEXT_PUBLIC_FORMSPREE_CONTACT_URL in production. */
export const FORMSPREE_CONTACT_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_URL?.trim() ?? "";
