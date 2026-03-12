import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(import.meta.dirname, "..");
const distDir = resolve(rootDir, "dist");

const defaults = {
  supabaseUrl: "https://tseonpoefmpyzsrjklww.supabase.co",
  supabaseAnonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZW9ucG9lZm1weXpzcmprbHd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyODA0NDIsImV4cCI6MjA4ODg1NjQ0Mn0.z-8c9UzMwqjQsXbpevh5myHqbGKCVcVPkhBoD_d339s",
};

const config = {
  supabaseUrl: (process.env.SUPABASE_URL || defaults.supabaseUrl).trim(),
  supabaseAnonKey: (process.env.SUPABASE_ANON_KEY || defaults.supabaseAnonKey).trim(),
};

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

function copyPath(sourcePath, targetPath) {
  const stats = statSync(sourcePath);

  if (stats.isDirectory()) {
    mkdirSync(targetPath, { recursive: true });
    for (const entry of readdirSync(sourcePath)) {
      copyPath(resolve(sourcePath, entry), resolve(targetPath, entry));
    }
    return;
  }

  copyFileSync(sourcePath, targetPath);
}

for (const fileName of ["index.html", "app.js", "styles.css"]) {
  copyPath(resolve(rootDir, fileName), resolve(distDir, fileName));
}

if (existsSync(resolve(rootDir, "data"))) {
  copyPath(resolve(rootDir, "data"), resolve(distDir, "data"));
}

writeFileSync(
  resolve(distDir, "config.js"),
  `window.APP_CONFIG = ${JSON.stringify(config, null, 2)};\n`,
  "utf8"
);

const vercelConfigPath = resolve(rootDir, "vercel.json");
if (existsSync(vercelConfigPath)) {
  const vercelConfig = JSON.parse(readFileSync(vercelConfigPath, "utf8"));
  writeFileSync(resolve(distDir, "vercel.json"), JSON.stringify(vercelConfig, null, 2), "utf8");
}
