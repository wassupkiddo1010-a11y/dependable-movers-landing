import { copyFileSync, cpSync, mkdirSync } from "node:fs";

mkdirSync("public/data", { recursive: true });
mkdirSync("public/assets", { recursive: true });
mkdirSync("public/js", { recursive: true });
mkdirSync("js", { recursive: true });

copyFileSync("index.html", "public/index.html");
cpSync("assets", "public/assets", { recursive: true });
copyFileSync("assets/favicon.png", "public/favicon.png");
copyFileSync("assets/logo.png", "public/logo.png");

cpSync("data/zips", "public/data/zips", { recursive: true });

const jsFiles = [
  "text-roll-nav.js",
  "about-section-scroll.js",
  "quote-form-scroll.js",
  "trust-cards-scroll.js",
  "animated-testimonials.js",
  "svc-overlap-reveal.js",
  "areas-globe.js",
];

for (const file of jsFiles) {
  copyFileSync(`scripts/${file}`, `public/js/${file}`);
  copyFileSync(`scripts/${file}`, `js/${file}`);
}

console.log("Synced index.html, assets, and js → public/ + js/");
