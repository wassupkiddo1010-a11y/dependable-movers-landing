import { copyFileSync, cpSync, mkdirSync } from "node:fs";

mkdirSync("public/assets", { recursive: true });
copyFileSync("index.html", "public/index.html");
cpSync("assets", "public/assets", { recursive: true });
copyFileSync("assets/favicon.png", "public/favicon.png");
copyFileSync("assets/logo.png", "public/logo.png");
console.log("Synced index.html and assets → public/");
