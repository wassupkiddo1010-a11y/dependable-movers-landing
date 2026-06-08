import { MigratedPageView } from "@/components/layout/migrated-page-view";
import { preferredCarriersPage } from "@/data/pages/preferred-carriers";
import { createPageMetadata } from "@/lib/page-metadata";
import { ROUTES } from "@/lib/routes";

export const metadata = createPageMetadata({
  title: preferredCarriersPage.title,
  description: preferredCarriersPage.description,
  path: ROUTES.preferredCarriers,
});

export default function PreferredCarriersPage() {
  return <MigratedPageView page={preferredCarriersPage} />;
}
