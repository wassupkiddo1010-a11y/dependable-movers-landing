import type { MigratedPage } from "@/data/pages/types";
import { SITE_EMAIL, SITE_NAME } from "@/lib/site-config";

/** Exact wording required for SMS carrier / 8x8 campaign compliance. */
const MOBILE_INFO_SHARING_STATEMENT =
  "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.";

export const privacyPolicyPage: MigratedPage = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects your personal information.`,
  blocks: [
    {
      type: "prose",
      blocks: [
        {
          type: "h2",
          text: "Personal Data processed for the following purposes and using the following services",
        },
        {
          type: "p",
          text: "Advertising — Microsoft Advertising — Personal Data: Cookies; Usage Data.",
        },
        {
          type: "p",
          text: "Content performance and features testing (A/B testing) — Google Optimize and Google Optimize 360.",
        },
        {
          type: "p",
          text: "Displaying content from external platforms — Google Fonts; Google Maps widget — Personal Data: Cookies; Usage Data.",
        },
        {
          type: "p",
          text: "Interaction with data collection platforms — ActiveCampaign widget — Personal Data: email address; first name; last name; phone number.",
        },
        {
          type: "p",
          text: "Analytics — Google Analytics, Facebook Ads conversion tracking, Google Ads conversion tracking — Personal Data: Cookies; Usage Data; unique device identifiers.",
        },
        {
          type: "p",
          text: "Contacting the User — Phone contact; Contact form; Mailing list or newsletter — Personal Data: phone number; email address; first name; last name; ZIP/Postal code; Usage Data.",
        },
        {
          type: "p",
          text: "Hosting and backend infrastructure — Amazon Web Services (AWS) and related providers.",
        },
        {
          type: "p",
          text: "All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
        },
        { type: "h2", text: "SMS/Text Messaging Privacy" },
        {
          type: "p",
          text: MOBILE_INFO_SHARING_STATEMENT,
        },
        {
          type: "p",
          text: `When you opt in to receive SMS messages from ${SITE_NAME} by checking the SMS consent checkbox on our website forms, we collect your mobile phone number, your consent and opt-in records (including the method and timestamp of consent), and message interaction data (delivery status, responses).`,
        },
        {
          type: "p",
          text: "We use this information solely to deliver SMS messages related to your moving inquiry, including verification codes, appointment confirmations, and service updates you have requested. Message frequency varies based on your activity.",
        },
        {
          type: "p",
          text: `We do not sell, rent, or share your SMS opt-in data or consent with any third parties for their marketing or promotional purposes. We may share your information with trusted service providers who are contractually obligated to protect your data and use it solely to provide messaging services on our behalf.`,
        },
        {
          type: "p",
          text: `You can opt out of SMS messages at any time by replying STOP to any message. For help, reply HELP or contact us at ${SITE_EMAIL}. Message and data rates may apply.`,
        },
        {
          type: "p",
          text: `Consent to receive SMS messages is not a condition of purchase or use of any ${SITE_NAME} service.`,
        },
        { type: "h2", text: "Information on opting out of interest-based advertising" },
        {
          type: "p",
          text: "In addition to any opt-out feature provided by any of the services listed in this document, Users may learn more on how to generally opt out of interest-based advertising within the dedicated section of the Cookie Policy.",
        },
        { type: "h2", text: "Further information about the processing of Personal Data" },
        {
          type: "p",
          text: "CCPA: We do not knowingly collect personal information of consumers who are below the age of 16.",
        },
        {
          type: "p",
          text: "The Service is not directed to children under the age of 13. Users declare themselves to be adult according to their applicable legislation. Minors may use this Website only with the assistance of a parent or guardian.",
        },
        {
          type: "p",
          text: MOBILE_INFO_SHARING_STATEMENT,
        },
      ],
    },
  ],
};
