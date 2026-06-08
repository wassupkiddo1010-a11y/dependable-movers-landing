import { MigratedPageView } from "@/components/layout/migrated-page-view";
import { servicesIndexPage } from "@/data/pages/services-index";
import { createPageMetadata } from "@/lib/page-metadata";
import { ROUTES } from "@/lib/routes";

export const metadata = createPageMetadata({
  title: servicesIndexPage.title,
  description: servicesIndexPage.description,
  path: ROUTES.services,
});

export default function ServicesPage() {
  return <MigratedPageView page={servicesIndexPage} />;
}
