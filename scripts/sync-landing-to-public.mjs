import { copyFileSync, cpSync, mkdirSync } from "node:fs";

mkdirSync("public/assets", { recursive: true });
mkdirSync("public/js", { recursive: true });
copyFileSync("index.html", "public/index.html");
cpSync("assets", "public/assets", { recursive: true });
copyFileSync("assets/favicon.png", "public/favicon.png");
copyFileSync("assets/logo.png", "public/logo.png");
mkdirSync("js", { recursive: true });
copyFileSync(
  "scripts/animated-testimonials.js",
  "public/js/animated-testimonials.js"
);
copyFileSync(
  "scripts/animated-testimonials.js",
  "js/animated-testimonials.js"
);
console.log("Synced index.html, assets, and js → public/ + js/");
