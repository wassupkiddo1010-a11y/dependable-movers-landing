import { SiteNav } from "@/components/layout/site-nav";
import { Footer } from "@/components/ui/footer-section";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh flex-col bg-white font-sans">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <div className="bg-[#f9f9f9]">
        <Footer />
      </div>
    </div>
  );
}
