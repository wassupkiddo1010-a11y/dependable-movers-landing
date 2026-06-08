import { MigratedPageView } from "@/components/layout/migrated-page-view";
import { privacyPolicyPage } from "@/data/pages/privacy-policy";
import { createPageMetadata } from "@/lib/page-metadata";
import { ROUTES } from "@/lib/routes";

export const metadata = createPageMetadata({
  title: privacyPolicyPage.title,
  description: privacyPolicyPage.description,
  path: ROUTES.privacyPolicy,
});

export default function PrivacyPolicyPage() {
  return <MigratedPageView page={privacyPolicyPage} />;
}
