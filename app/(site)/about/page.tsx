import { MigratedPageView } from "@/components/layout/migrated-page-view";
import { aboutPage } from "@/data/pages/about";
import { createPageMetadata } from "@/lib/page-metadata";
import { ROUTES } from "@/lib/routes";

export const metadata = createPageMetadata({
  title: aboutPage.title,
  description: aboutPage.description,
  path: ROUTES.about,
});

export default function AboutPage() {
  return <MigratedPageView page={aboutPage} />;
}
