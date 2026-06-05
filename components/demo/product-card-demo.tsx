"use client";

import { ProductHighlightCard } from "@/components/ui/product-card";

export default function ProductHighlightCardDemo() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#F0F2F7] p-8">
      <ProductHighlightCard
        title="Trusted"
        description="We bring years of combined experience to every move, ensuring your belongings are handled with absolute care and delivered safely to your destination."
        imageSrc="/assets/trust-trusted.png"
        imageAlt="Trusted — shield with checkmark"
      />
    </div>
  );
}
