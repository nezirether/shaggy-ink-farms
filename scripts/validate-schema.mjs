// One-off validator: extracts every JSON-LD block from built HTML and checks
// each against Google Rich Results Test required-field rules. Not part of the
// app build. Run: node scripts/validate-schema.mjs
import { readFileSync } from "node:fs";

const PAGES = [
  { label: "/ (home)", file: ".next/server/app/index.html" },
  { label: "/eggs", file: ".next/server/app/eggs.html" },
  {
    label: "/learn/growing-guides/growing-strawberries-northern-california",
    file: ".next/server/app/learn/growing-guides/growing-strawberries-northern-california.html",
  },
  {
    label: "/learn/growing-guides/companion-planting",
    file: ".next/server/app/learn/growing-guides/companion-planting.html",
  },
];

const LD_RE = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;

function decode(s) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

let failures = 0;
const ok = (m) => console.log(`    ✓ ${m}`);
const bad = (m) => {
  failures++;
  console.log(`    ✗ ${m}`);
};

// Walk the whole JSON tree and collect every @type value, at any depth.
// Google reads nested nodes (e.g. makesOffer.itemOffered) as their own items,
// so a nested Product/Offer must be caught here, not just at the top level.
function collectTypes(node, acc = []) {
  if (Array.isArray(node)) {
    node.forEach((n) => collectTypes(n, acc));
  } else if (node && typeof node === "object") {
    if (node["@type"]) acc.push(...[].concat(node["@type"]));
    Object.values(node).forEach((v) => collectTypes(v, acc));
  }
  return acc;
}

function isHttpUrl(v) {
  return typeof v === "string" && /^https?:\/\//.test(v);
}
function isIsoDate(v) {
  return typeof v === "string" && /^\d{4}-\d{2}-\d{2}/.test(v);
}

function validate(type, node) {
  switch (type) {
    case "FAQPage": {
      if (!Array.isArray(node.mainEntity) || node.mainEntity.length === 0)
        return bad("FAQPage.mainEntity must be a non-empty array");
      let good = true;
      node.mainEntity.forEach((q, i) => {
        if (q["@type"] !== "Question") { good = false; bad(`Q${i}: @type must be Question`); }
        if (!q.name || typeof q.name !== "string") { good = false; bad(`Q${i}: missing name`); }
        const a = q.acceptedAnswer;
        if (!a || a["@type"] !== "Answer" || !a.text) { good = false; bad(`Q${i}: acceptedAnswer/text invalid`); }
      });
      if (good) ok(`FAQPage valid — ${node.mainEntity.length} questions, all with name + acceptedAnswer.text`);
      break;
    }
    case "Article":
    case "BlogPosting":
    case "NewsArticle": {
      if (!node.headline) bad("Article missing headline"); else ok("Article.headline present");
      if (node.headline && node.headline.length > 110) bad("Article.headline > 110 chars"); else ok("Article.headline length OK (<=110)");
      if (!isHttpUrl(node.image)) bad("Article.image must be absolute URL"); else ok("Article.image absolute URL");
      if (!isIsoDate(node.datePublished)) bad("Article.datePublished invalid"); else ok("Article.datePublished ISO date");
      if (!isIsoDate(node.dateModified)) bad("Article.dateModified invalid"); else ok("Article.dateModified ISO date");
      if (!node.author || !node.author.name) bad("Article.author.name missing"); else ok(`Article.author.name = "${node.author.name}"`);
      if (!node.publisher || !node.publisher.name) bad("Article.publisher.name missing"); else ok("Article.publisher.name present");
      break;
    }
    case "BreadcrumbList": {
      if (!Array.isArray(node.itemListElement) || node.itemListElement.length === 0)
        return bad("BreadcrumbList.itemListElement empty");
      let good = true;
      node.itemListElement.forEach((li, i) => {
        if (li["@type"] !== "ListItem") { good = false; bad(`crumb ${i}: @type must be ListItem`); }
        if (li.position !== i + 1) { good = false; bad(`crumb ${i}: position must be ${i + 1}, got ${li.position}`); }
        if (!li.name) { good = false; bad(`crumb ${i}: missing name`); }
        if (!isHttpUrl(li.item)) { good = false; bad(`crumb ${i}: item must be absolute URL`); }
      });
      if (good) ok(`BreadcrumbList valid — ${node.itemListElement.length} items, 1-based positions, absolute URLs`);
      break;
    }
    case "Product": {
      bad("Product schema present — implies ecommerce; should NOT appear on a no-online-sales farm page");
      break;
    }
    case "Offer": {
      if (node.price !== undefined || node.priceCurrency !== undefined)
        bad("Offer carries price/priceCurrency — implies a transaction");
      else ok("Offer present without price/priceCurrency (no transaction implied)");
      break;
    }
    default:
      ok(`${type} present (not a targeted rich-result type; parsed OK)`);
  }
}

for (const page of PAGES) {
  console.log(`\n=== ${page.label} ===`);
  let html;
  try {
    html = readFileSync(page.file, "utf8");
  } catch {
    bad(`could not read ${page.file}`);
    continue;
  }
  const blocks = [...html.matchAll(LD_RE)];
  if (blocks.length === 0) bad("no JSON-LD blocks found");
  const types = [];
  const allNestedTypes = [];
  for (const [, raw] of blocks) {
    let node;
    try {
      node = JSON.parse(decode(raw));
    } catch (e) {
      bad(`JSON.parse failed: ${e.message}`);
      continue;
    }
    const type = Array.isArray(node["@type"]) ? node["@type"].join("+") : node["@type"];
    types.push(type);
    allNestedTypes.push(...collectTypes(node));
    console.log(`  [${type}]`);
    const primary = Array.isArray(node["@type"]) ? node["@type"][0] : node["@type"];
    validate(primary, node);
  }
  // Catch ecommerce-implying types anywhere in the tree, including nested nodes.
  if (allNestedTypes.includes("Product"))
    bad("Product type found in the JSON tree (nested or top-level) — implies a sellable product");
  else ok("no Product type anywhere in the page's JSON-LD");
  if (allNestedTypes.includes("Offer"))
    bad("Offer type found in the JSON tree — implies a transaction");
  else ok("no Offer type anywhere in the page's JSON-LD");
  console.log(`  types on page: ${types.join(", ")}`);
}

console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : failures + " CHECK(S) FAILED"}`);
process.exit(failures === 0 ? 0 : 1);
