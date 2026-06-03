import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync("dist", { recursive: true });
copyFileSync("index.html", "dist/index.html");
console.log("Static site copied to dist/index.html");
