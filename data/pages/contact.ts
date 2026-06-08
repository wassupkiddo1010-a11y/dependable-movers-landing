import type { MigratedPage } from "@/data/pages/types";
import {
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_PHONE,
} from "@/lib/site-config";

export const contactPage: MigratedPage = {
  title: "Contact Us",
  description:
    "Reach Dependable Movers for quotes, scheduling, and move support.",
  blocks: [
    {
      type: "p",
      text: "Do you need any help? We're here to answer any questions that you may have! Please fill in the quote form on our home page or call us directly so that we may get back to you with an answer or solution as soon as possible. Thank you!",
    },
    { type: "h2", text: "Company Information" },
    { type: "h3", text: "Company Address" },
    {
      type: "p",
      text: `${SITE_ADDRESS.line1}, ${SITE_ADDRESS.line2}`,
    },
    { type: "h3", text: "Phone" },
    { type: "p", text: SITE_PHONE },
    { type: "h3", text: "Email Address" },
    { type: "p", text: SITE_EMAIL },
    { type: "h3", text: "Working Hours" },
    { type: "p", text: "Mon–Sun: 9 AM–7 PM Eastern" },
  ],
};
