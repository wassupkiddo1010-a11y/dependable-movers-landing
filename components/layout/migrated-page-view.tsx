import { InnerPageShell } from "@/components/layout/inner-page-shell";
import { PageBlocks } from "@/components/layout/page-blocks";
import type { MigratedPage } from "@/data/pages/types";

export function MigratedPageView({ page }: { page: MigratedPage }) {
  return (
    <InnerPageShell title={page.title} description={page.description}>
      <PageBlocks blocks={page.blocks} />
    </InnerPageShell>
  );
}
