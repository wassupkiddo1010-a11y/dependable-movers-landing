import type { ServiceSlug } from "@/lib/routes";
import { ROUTES } from "@/lib/routes";

export type ServicePage = {
  slug: ServiceSlug;
  title: string;
  shortDescription: string;
  href: string;
};

export const SERVICES: ServicePage[] = [
  {
    slug: "local-moving",
    title: "Local Moving",
    shortDescription:
      "Need to pack your stuff up and move it across the city at an affordable price? We've got your back.",
    href: ROUTES.service("local-moving"),
  },
  {
    slug: "long-distance-moving",
    title: "Long Distance Moving",
    shortDescription:
      "Move across long distances without any hassle or worries with the help of our experienced long distance movers.",
    href: ROUTES.service("long-distance-moving"),
  },
  {
    slug: "furniture-moving",
    title: "Furniture Moving",
    shortDescription:
      "Move your furniture across the state safely and efficiently with the help of our professional movers.",
    href: ROUTES.service("furniture-moving"),
  },
  {
    slug: "piano-moving",
    title: "Piano Moving",
    shortDescription:
      "Our qualified movers can keep your beautiful piano safe as it travels across the state.",
    href: ROUTES.service("piano-moving"),
  },
  {
    slug: "commercial-moving",
    title: "Commercial Moving",
    shortDescription:
      "Coordinate a timely relocation for your business with the help of our smooth, professional moving services.",
    href: ROUTES.service("commercial-moving"),
  },
  {
    slug: "last-second-moves",
    title: "Last-Second Moves",
    shortDescription:
      "Need to move at the last second? Don't worry about extra charges — we've got you covered.",
    href: ROUTES.service("last-second-moves"),
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
