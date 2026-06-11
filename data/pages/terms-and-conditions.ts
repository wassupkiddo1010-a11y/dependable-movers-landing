import type { MigratedPage } from "@/data/pages/types";
import { SITE_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site-config";

export const termsPage: MigratedPage = {
  title: "Terms & Conditions",
  description: `Terms governing use of the ${SITE_NAME} website and services.`,
  blocks: [
    {
      type: "prose",
      blocks: [
        {
          type: "p",
          text: "These Terms govern the use of this Website, and any other related Agreement or legal relationship with the Owner in a legally binding way. Capitalized words are defined in the relevant dedicated section of this document. The User must read this document carefully.",
        },
        {
          type: "p",
          text: `This Website is provided by ${SITE_URL.replace(/^https?:\/\//, "")}. Owner contact email: ${SITE_EMAIL}`,
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
          text: "Unless otherwise specified, the terms of use detailed in this section apply generally when using this Website. By using this Website, Users confirm they meet the applicable requirements.",
        },
        { type: "h2", text: "Account registration" },
        {
          type: "p",
          text: "To use the Service Users may register or create a User account, providing all required data in a complete and truthful manner. Users are responsible for keeping their login credentials confidential and safe.",
        },
        { type: "h2", text: "Content on this Website" },
        {
          type: "p",
          text: "Unless where otherwise specified or clearly recognizable, all content available on this Website is owned or provided by the Owner or its licensors. Users may not use such content in any way that is not necessary or implicit in the proper use of the Service.",
        },
        { type: "h2", text: "SMS Terms of Service" },
        {
          type: "p",
          text: `${SITE_NAME} provides moving and relocation coordination services across the United States. Customers who request a moving quote or interact with our services may opt in to receive SMS messages related to their request.`,
        },
        {
          type: "p",
          text: `By checking the SMS consent checkbox on our website forms and submitting your phone number, you expressly consent to receive SMS text messages from ${SITE_NAME}. These messages may include service reminders, dispatch notifications, special offers, discounts, and service updates. Message frequency varies. Reply STOP to opt out or HELP for assistance. Carriers are not liable for delayed or undelivered messages. Consent is not a condition of purchase.`,
        },
        { type: "h2", text: "Liability and indemnification" },
        {
          type: "p",
          text: "This Website is provided strictly on an as-is and as-available basis. To the maximum extent permitted by applicable law, the Owner expressly disclaims all conditions, representations, and warranties — whether express, implied, statutory or otherwise.",
        },
        {
          type: "p",
          text: "Users agree to defend, indemnify and hold the Owner harmless from claims arising from misuse of the Website or violation of these Terms.",
        },
        { type: "h2", text: "Changes to these Terms" },
        {
          type: "p",
          text: "The Owner reserves the right to amend or otherwise modify these Terms at any time. The continued use of the Service will signify the User's acceptance of the revised Terms.",
        },
        { type: "h2", text: "Contacts" },
        {
          type: "p",
          text: `All communications relating to the use of this Website must be sent using the contact information stated in this document. For questions about these Terms, contact ${SITE_EMAIL}.`,
        },
      ],
    },
  ],
};
