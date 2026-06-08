import type { MigratedPage } from "@/data/pages/types";
import { SITE_EMAIL, SITE_NAME } from "@/lib/site-config";

export const termsPage: MigratedPage = {
  title: "Terms & Conditions",
  description: `Terms governing use of the ${SITE_NAME} website and services.`,
  blocks: [
    {
      type: "p",
      text: "These Terms govern the use of this Website, and any other related Agreement or legal relationship with the Owner in a legally binding way. Capitalized words are defined in the relevant dedicated section of this document. The User must read this document carefully.",
    },
    {
      type: "p",
      text: `This Website is provided by dependablemovers.com. Owner contact email: ${SITE_EMAIL}`,
    },
    { type: "h2", text: "What the User should know at a glance" },
    {
      type: "ul",
      items: [
        "Some provisions may only apply to certain categories of Users.",
        "Usage of this Website and the Service is age restricted: User must be an adult under applicable law.",
      ],
    },
    { type: "h2", text: "Terms of Use" },
    {
      type: "p",
      text: "Users may use the Website and Services only in accordance with applicable laws and these Terms. Users must not misuse the Website, attempt unauthorized access, or interfere with the proper working of the Service.",
    },
    { type: "h2", text: "Account registration" },
    {
      type: "p",
      text: "Where account registration is required, Users must provide accurate information and keep credentials secure. Users are responsible for activity under their account.",
    },
    { type: "h2", text: "Content on this Website" },
    {
      type: "p",
      text: "Unless otherwise specified, all content on this Website is owned by or licensed to the Owner. Unauthorized reproduction or distribution is prohibited.",
    },
    { type: "h2", text: "SMS Terms of Service" },
    {
      type: "p",
      text: `By opting in to ${SITE_NAME} SMS programs, you agree to receive service reminders, dispatch notifications, and—if separately consented—marketing messages about special offers and service updates. Reply STOP to opt out or HELP for assistance. Carriers are not liable for delayed or undelivered messages. Consent is not a condition of purchase.`,
    },
    { type: "h2", text: "Liability and indemnification" },
    {
      type: "p",
      text: "To the maximum extent permitted by law, the Website and Services are provided as-is without warranties of any kind. The Owner shall not be liable for indirect, incidental, or consequential damages arising from use of the Website or Services.",
    },
    {
      type: "p",
      text: "Users agree to indemnify and hold harmless the Owner from claims arising from misuse of the Website or violation of these Terms.",
    },
    { type: "h2", text: "Changes to these Terms" },
    {
      type: "p",
      text: "The Owner reserves the right to modify these Terms at any time. Continued use of the Website after changes constitutes acceptance of the revised Terms.",
    },
    { type: "h2", text: "Contacts" },
    {
      type: "p",
      text: `For questions about these Terms, contact ${SITE_EMAIL}.`,
    },
  ],
};
