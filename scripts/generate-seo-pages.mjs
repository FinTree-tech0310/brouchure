import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || "https://www.fintreeindia.com").replace(/\/$/, "");
const shareImage = `${siteUrl}/og-image.jpg`;
const pages = [
  ["/", "FinTree Education | CFA, FRM & Financial Modelling Courses", "Learn CFA, FRM and Financial Modelling with FinTree's expert-led classroom, live online and self-paced programmes, practical training and career support.", "website"],
  ["/cfa", "CFA Coaching in Pune & Online | FinTree Education", "Prepare for CFA Levels I, II and III with FinTree through classroom coaching in Pune, live online classes, mock tests, Juice Notes and mentor support.", "course"],
  ["/frm", "FRM Coaching in Pune & Online | FinTree Education", "Prepare for FRM Parts I and II with FinTree's concept-led classroom, live online and self-paced training, practice tests and expert mentor support.", "course"],
  ["/fm", "Financial Modelling Course | FinTree Education", "Build practical financial modelling, valuation, forecasting and scenario-analysis skills with real-company projects and expert instruction from FinTree.", "course"],
  ["/demo", "Free CFA, FRM & Financial Modelling Demo Lectures | FinTree", "Watch free FinTree demo lectures for CFA, FRM and Financial Modelling, and preview Juice Notes, mock tests, the LMS and doubt-solving support.", "website"],
];

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const organization = {
  "@type": "EducationalOrganization",
  "@id": `${siteUrl}/#organization`,
  name: "FinTree Education",
  url: siteUrl,
  logo: `${siteUrl}/brand/fintree-logo-tab.png`,
  telephone: "+91 8888733330",
  email: "enquire@fintreeindia.com",
  address: { "@type": "PostalAddress", streetAddress: "Ashok Sankul-2, 207, Second Floor, above ICICI Bank, Bhoslenagar", addressLocality: "Pune", addressRegion: "Maharashtra", postalCode: "411020", addressCountry: "IN" },
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+91 8888733330", contactType: "customer support" },
    { "@type": "ContactPoint", telephone: "+91 8888077722", contactType: "WhatsApp support", url: "https://wa.me/918888077722" },
  ],
  sameAs: ["https://www.instagram.com/fintreeeducation/", "https://www.facebook.com/FinTree", "https://www.youtube.com/@FintreeIndia", "https://www.linkedin.com/company/fintree-education"],
};

const template = await readFile(resolve(dist, "index.html"), "utf8");
const marker = /<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/;

for (const [path, title, description, type] of pages) {
  const url = `${siteUrl}${path === "/" ? "/" : path}`;
  const pageEntity = type === "course"
    ? { "@type": "Course", name: title.split(" | ")[0], description, url, provider: { "@id": `${siteUrl}/#organization` } }
    : { "@type": path === "/" ? "WebSite" : "WebPage", name: title, description, url };
  const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@graph": [organization, pageEntity] }).replaceAll("<", "\\u003c");
  const seo = `<!-- SEO:START -->
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${url}" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="FinTree Education" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${shareImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="FinTree Education — an educator to the financial markets" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${shareImage}" />
    <script id="seo-structured-data" type="application/ld+json">${jsonLd}</script>
    <!-- SEO:END -->`;
  const html = template.replace(marker, seo);
  const output = path === "/" ? resolve(dist, "index.html") : resolve(dist, `${path.slice(1)}.html`);
  await writeFile(output, html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([path], index) => `  <url><loc>${siteUrl}${path === "/" ? "/" : path}</loc><priority>${index === 0 ? "1.0" : index === pages.length - 1 ? "0.8" : "0.9"}</priority></url>`).join("\n")}
</urlset>\n`;
await mkdir(dist, { recursive: true });
await writeFile(resolve(dist, "sitemap.xml"), sitemap);
await writeFile(resolve(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(`Generated SEO pages for ${pages.length} routes using ${siteUrl}`);
