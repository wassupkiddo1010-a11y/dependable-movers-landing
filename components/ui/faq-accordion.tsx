"use client";

import * as React from "react";
import { HelpCircle, MessageCircle, ChevronDown } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { MOVING_FAQS } from "@/data/faqs";

const CustomAccordion = AccordionPrimitive.Root;

const CustomAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
));
CustomAccordionItem.displayName = "CustomAccordionItem";

const CustomAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-4 rounded-2xl p-4 text-left",
        "bg-white transition-all hover:bg-gray-50/70 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED7D22]/40",
        "data-[state=open]:shadow-md",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <HelpCircle className="h-5 w-5 shrink-0 text-gray-600" />
        <span className="text-lg font-medium tracking-wide text-zinc-700">
          {children}
        </span>
      </div>
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 transition-transform group-hover:scale-105 group-data-[state=open]:rotate-180">
        <ChevronDown className="h-4 w-4 text-gray-800" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
CustomAccordionTrigger.displayName = "CustomAccordionTrigger";

const CustomAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-zinc-700",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="ml-14 mt-4 pb-2">
      <div className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-md transition-all">
        <span className="flex-1 text-base leading-relaxed">{children}</span>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-300/70 transition-transform hover:scale-105">
          <MessageCircle className="h-5 w-5 text-gray-700" />
        </div>
      </div>
    </div>
  </AccordionPrimitive.Content>
));
CustomAccordionContent.displayName = "CustomAccordionContent";

export type FaqAccordionItem = {
  question: string;
  answer: React.ReactNode;
};

export type FaqAccordionProps = {
  items: FaqAccordionItem[];
  title?: string;
  className?: string;
  defaultOpenIndex?: number;
  /** Centered stack: title on top, accordion below (default) */
  centered?: boolean;
};

export function FaqAccordion({
  items,
  title,
  className,
  defaultOpenIndex = 0,
  centered = true,
}: FaqAccordionProps) {
  const defaultValue =
    items.length > 0 ? `item-${defaultOpenIndex}` : undefined;

  return (
    <div
      className={cn(
        "w-full",
        centered && "mx-auto max-w-3xl",
        className
      )}
    >
      {title ? (
        <h2
          className={cn(
            "mb-8 font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#1A1A1A] md:text-3xl",
            centered && "text-center"
          )}
        >
          {title}
        </h2>
      ) : null}
      <CustomAccordion
        type="single"
        collapsible
        defaultValue={defaultValue}
        className="space-y-6"
      >
        {items.map((faq, index) => (
          <CustomAccordionItem key={index} value={`item-${index}`}>
            <CustomAccordionTrigger>{faq.question}</CustomAccordionTrigger>
            <CustomAccordionContent>{faq.answer}</CustomAccordionContent>
          </CustomAccordionItem>
        ))}
      </CustomAccordion>
    </div>
  );
}

/** Full-page demo layout from the design reference */
export function AccordionComponent() {
  return (
    <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center p-4 md:p-8">
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={MOVING_FAQS} title="" />
      </div>
    </main>
  );
}

export {
  CustomAccordion,
  CustomAccordionItem,
  CustomAccordionTrigger,
  CustomAccordionContent,
};
