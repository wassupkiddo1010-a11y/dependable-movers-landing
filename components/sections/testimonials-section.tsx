import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import {
  GLOBAL_VAN_LINES_TESTIMONIALS,
  TESTIMONIALS_TRUSTED_LOCATIONS,
} from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <AnimatedTestimonials
      title="We've Helped Relocate More Than 200,000 Customers"
      subtitle="At Global Van Lines, we are committed to your complete satisfaction. With our extensive network of professional service providers, we can move you across town, coast to coast, or around the world with personalized moving services."
      badgeText="Trusted by families nationwide"
      testimonials={GLOBAL_VAN_LINES_TESTIMONIALS}
      autoRotateInterval={6000}
      trustedCompanies={TESTIMONIALS_TRUSTED_LOCATIONS}
      trustedCompaniesTitle="Moves completed across the United States"
    />
  );
}
