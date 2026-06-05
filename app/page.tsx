import { FaqAccordionDemo } from "@/components/demo/faq-accordion-demo";
import { TestimonialDemo } from "@/components/demo/testimonial-demo";

export default function Home() {
  return (
    <main>
      <div className="border-b border-border bg-[#16335B] px-6 py-4 text-center text-sm text-white">
        React component preview — production landing page is{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5">index.html</code>
      </div>
      <TestimonialDemo />
      <FaqAccordionDemo />
    </main>
  );
}
