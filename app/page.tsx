import { AboutSectionDemo } from "@/components/demo/about-section-demo";
import { AreasWeServeDemo } from "@/components/demo/areas-we-serve-demo";
import { InteractiveGlobeDemo } from "@/components/demo/interactive-globe-demo";
import { FaqAccordionDemo } from "@/components/demo/faq-accordion-demo";
import { FooterSectionDemo } from "@/components/demo/footer-section-demo";
import { TestimonialDemo } from "@/components/demo/testimonial-demo";

export default function Home() {
  return (
    <main>
      <div className="border-b border-border bg-[#16335B] px-6 py-4 text-center text-sm text-white">
        React component preview — production landing page is{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5">index.html</code>
      </div>
      {/* Spacer so About Us scroll-trigger animations are visible in preview */}
      <div className="flex min-h-[120vh] items-center justify-center bg-[#16335B] px-6 text-center text-white/80">
        <p className="max-w-md text-sm">
          Scroll down to the About Us section to see the timeline reveal and headline animation.
        </p>
      </div>
      <AboutSectionDemo />
      <TestimonialDemo />
      <AreasWeServeDemo />
      <InteractiveGlobeDemo />
      <FaqAccordionDemo />
      <FooterSectionDemo />
    </main>
  );
}
