import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const SITES = [
  { code: "bh", label: "BH", domain: "coroafloresbelohorizonte.com.br" },
  { code: "rj", label: "RJ", domain: "coroafloresriodejaneiro.com.br" },
  { code: "sp", label: "SP", domain: "coroafloressaopaulo.com.br" },
];

const lines = [];
lines.push("# Índice de Locais");
lines.push("");
lines.push("**Gerado automaticamente.** Não editar à mão.");
lines.push("");
lines.push("Para regenerar: `node scripts/build-locations-index.mjs`");
lines.push("");

const summary = [];
const sectionBlocks = [];

for (const site of SITES) {
  const path = resolve(root, "src/data/cities", site.code, "locations.json");
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.sort((a, b) => {
    const c = a.city.localeCompare(b.city, "pt-BR");
    return c !== 0 ? c : a.name.localeCompare(b.name, "pt-BR");
  });

  summary.push(`- **${site.label}** (${site.domain}): ${data.length} locais`);

  const block = [];
  block.push(`## ${site.label} — ${site.domain} (${data.length} locais)`);
  block.push("");
  block.push("| Slug | Nome | Cidade |");
  block.push("|---|---|---|");
  for (const loc of data) {
    block.push(`| \`${loc.slug}\` | ${loc.name} | ${loc.city} |`);
  }
  block.push("");
  sectionBlocks.push(block.join("\n"));
}

lines.push("## Resumo");
lines.push("");
lines.push(...summary);
lines.push("");
lines.push("## URL");
lines.push("");
lines.push("Cada slug vira `https://{domínio do site}/{slug}`.");
lines.push("");
lines.push(...sectionBlocks);

const out = resolve(root, "src/data/locations-index.md");
writeFileSync(out, lines.join("\n"));

const total = SITES.reduce((acc, s) => {
  const data = JSON.parse(readFileSync(resolve(root, "src/data/cities", s.code, "locations.json"), "utf8"));
  return acc + data.length;
}, 0);

console.log(`✓ ${out}`);
console.log(`  Total: ${total} locais`);
