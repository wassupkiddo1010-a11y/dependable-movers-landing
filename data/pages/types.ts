export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "testimonial"; quote: string; author: string };

export type MigratedPage = {
  title: string;
  description: string;
  blocks: ContentBlock[];
};
