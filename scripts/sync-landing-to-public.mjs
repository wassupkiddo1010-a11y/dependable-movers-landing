import { copyFileSync } from "node:fs";

copyFileSync("index.html", "public/index.html");
console.log("Synced index.html → public/index.html for Netlify");
