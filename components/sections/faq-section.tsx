import { FaqAccordion } from "@/components/ui/faq-accordion";
import { MOVING_FAQS } from "@/data/faqs";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="bg-[#f9f9f9] py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <FaqAccordion
          items={MOVING_FAQS}
          title="Frequently Asked Questions"
          centered
        />
      </div>
    </section>
  );
}
