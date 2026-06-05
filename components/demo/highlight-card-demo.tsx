"use client";

import HighlightCard from "@/components/ui/highlight-card";
import Image from "next/image";

export default function HighlightCardDemo() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F0F2F7] p-8">
      <HighlightCard
        title="Trusted"
        description={[
          "We bring years of combined experience to every move,",
          "ensuring your belongings are handled with absolute care,",
          "and delivered safely to your destination.",
        ]}
        icon={
          <Image
            src="/assets/trust-trusted.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
        }
      />
    </div>
  );
}
