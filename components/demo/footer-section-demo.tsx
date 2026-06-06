import { Footer } from "@/components/ui/footer-section";

export function FooterSectionDemo() {
  return (
    <div className="bg-white">
      <Footer />
    </div>
  );
}

export default function DemoOne() {
  return (
    <div className="relative flex min-h-svh flex-col">
      <div className="flex min-h-screen items-center justify-center bg-[#16335B]">
        <h1 className="font-mono text-2xl font-bold text-white">Scroll Down!</h1>
      </div>
      <FooterSectionDemo />
    </div>
  );
}
