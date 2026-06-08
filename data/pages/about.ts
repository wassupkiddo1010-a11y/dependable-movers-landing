import type { MigratedPage } from "@/data/pages/types";

export const aboutPage: MigratedPage = {
  title: "About Us",
  description:
    "Dependable Movers brings 50+ years of combined experience to every local and long-distance relocation.",
  blocks: [
    {
      type: "p",
      text: "Welcome to Dependable Movers! Our professional moving company has over 50 years of combined experience serving individuals and businesses across the USA. Our team of dependable, hardworking, and responsible workers has just one goal—to satisfy our customers!",
    },
    {
      type: "p",
      text: "Contact our local and long-distance movers to help you move in a safe, timely, and efficient manner.",
    },
    { type: "h2", text: "Our Services" },
    {
      type: "p",
      text: "Local Moving · Long Distance Moving · Furniture Moving · Piano Moving · Commercial Moving · Last-Second Moves",
    },
    { type: "h2", text: "How It Works" },
    {
      type: "p",
      text: "We aim to fulfill all your moving and storage-related needs through a wide variety of services that are available on a last-second basis. Our professional movers will help you organize, plan, and execute your move without any complications. Whether you're moving across the city or across the country, you can be confident that your possessions are in safe hands.",
    },
    {
      type: "p",
      text: "Our reputable and reliable local moving company specializes in providing smooth and professional moving services. We understand how stressful it can be to move to a new house or office—from making sure that everything's packed away safely to transporting it across long distances, it can be quite the hassle. Our friendly movers will make sure that you can relax and focus on more important things during the big move!",
    },
    {
      type: "p",
      text: "We have competitive prices based on the distance and size of your move. Don't worry about having to spend extra cash on hidden costs—our agents will give you a thorough and accurate estimate along with a full explanation of the relocation process.",
    },
    { type: "p", text: "Get in touch with us today!" },
    {
      type: "testimonial",
      quote:
        "Dependable Movers completed my move across the state without any problems, and they had a wonderful attitude throughout the move. It felt like I was getting help from family and friends! I would definitely recommend their moving services.",
      author: "Billy W.",
    },
  ],
};
