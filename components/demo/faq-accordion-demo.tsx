import { FaqAccordion } from "@/components/ui/faq-accordion";
import { MOVING_FAQS } from "@/data/faqs";

export function FaqAccordionDemo() {
  return (
    <section className="border-t border-gray-100 bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <FaqAccordion
          items={MOVING_FAQS}
          title="Frequently asked questions"
          centered
        />
      </div>
    </section>
  );
}

export default function DemoOne() {
  return <FaqAccordionDemo />;
}
