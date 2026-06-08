import { MigratedPageView } from "@/components/layout/migrated-page-view";
import { contactPage } from "@/data/pages/contact";
import { createPageMetadata } from "@/lib/page-metadata";
import { ROUTES } from "@/lib/routes";

export const metadata = createPageMetadata({
  title: contactPage.title,
  description: contactPage.description,
  path: ROUTES.contact,
});

export default function ContactPage() {
  return <MigratedPageView page={contactPage} />;
}
