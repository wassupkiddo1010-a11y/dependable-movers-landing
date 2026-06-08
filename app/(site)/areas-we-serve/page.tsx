import { MigratedPageView } from "@/components/layout/migrated-page-view";
import { areasWeServePage } from "@/data/pages/areas-we-serve";
import { createPageMetadata } from "@/lib/page-metadata";
import { ROUTES } from "@/lib/routes";

export const metadata = createPageMetadata({
  title: areasWeServePage.title,
  description: areasWeServePage.description,
  path: ROUTES.areasWeServe,
});

export default function AreasWeServePage() {
  return <MigratedPageView page={areasWeServePage} />;
}
