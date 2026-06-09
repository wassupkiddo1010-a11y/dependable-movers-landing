export type BasicContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export type ContentBlock =
  | BasicContentBlock
  | {
      type: "testimonial";
      quote: string;
      author: string;
      headline?: string;
    }
  | { type: "quoteForm" }
  | { type: "serviceRail" }
  | { type: "prose"; blocks: BasicContentBlock[] }
  | { type: "contactForm" }
  | { type: "areasGlobe" };

export type MigratedPage = {
  title: string;
  description: string;
  blocks: ContentBlock[];
};
