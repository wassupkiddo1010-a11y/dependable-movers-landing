import { notFound } from "next/navigation";
import { PageBlocks } from "@/components/layout/page-blocks";
import { InnerPageShell } from "@/components/layout/inner-page-shell";
import { withQuotePipeline } from "@/data/pages/shared-blocks";
import { SERVICE_CONTENT } from "@/data/pages/service-content";
import { getServiceBySlug } from "@/data/services";
import { createPageMetadata } from "@/lib/page-metadata";
import { ROUTES, SERVICE_SLUGS } from "@/lib/routes";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return createPageMetadata({
    title: service.title,
    description: service.shortDescription,
    path: ROUTES.service(slug),
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const contentBlocks = SERVICE_CONTENT[slug as keyof typeof SERVICE_CONTENT];

  if (!service || !contentBlocks) {
    notFound();
  }

  const blocks = withQuotePipeline(contentBlocks);

  return (
    <InnerPageShell title={service.title} description={service.shortDescription}>
      <PageBlocks blocks={blocks} />
    </InnerPageShell>
  );
}
