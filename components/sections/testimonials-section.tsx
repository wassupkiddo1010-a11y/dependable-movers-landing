import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { DEPENDABLE_MOVERS_TESTIMONIALS } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <AnimatedTestimonials
      title="We've Helped Relocate More Than 200,000 Customers"
      subtitle="At Dependable Movers, we are committed to your complete satisfaction. With our extensive network of professional service providers, we can move you across town, coast to coast, or around the world with personalized moving services."
      badgeText="Trusted by families nationwide"
      testimonials={DEPENDABLE_MOVERS_TESTIMONIALS}
      autoRotateInterval={6000}
      trustedCompanies={[]}
    />
  );
}
