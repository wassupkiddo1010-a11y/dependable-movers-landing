import { MigratedPageView } from "@/components/layout/migrated-page-view";
import { termsPage } from "@/data/pages/terms-and-conditions";
import { createPageMetadata } from "@/lib/page-metadata";
import { ROUTES } from "@/lib/routes";

export const metadata = createPageMetadata({
  title: termsPage.title,
  description: termsPage.description,
  path: ROUTES.termsAndConditions,
});

export default function TermsPage() {
  return <MigratedPageView page={termsPage} />;
}
