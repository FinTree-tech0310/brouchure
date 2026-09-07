import { useEffect } from "react";
import { useLocation } from "react-router";
import { SITE } from "../data/site";

type PageSeo = {
  title: string;
  description: string;
  type: "website" | "course";
  courseName?: string;
};

const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://www.fintreeindia.com").replace(/\/$/, "");
const SHARE_IMAGE = `${SITE_URL}/og-image.jpg`;

const PAGE_SEO: Record<string, PageSeo> = {
  "/": {
    title: "FinTree Education | CFA, FRM & Financial Modelling Courses",
    description:
      "Learn CFA, FRM and Financial Modelling with FinTree's expert-led classroom, live online and self-paced programmes, practical training and career support.",
    type: "website",
  },
  "/cfa": {
    title: "CFA Coaching in Pune & Online | FinTree Education",
    description:
      "Prepare for CFA Levels I, II and III with FinTree through classroom coaching in Pune, live online classes, mock tests, Juice Notes and mentor support.",
    type: "course",
    courseName: "CFA Prep Programme",
  },
  "/frm": {
    title: "FRM Coaching in Pune & Online | FinTree Education",
    description:
      "Prepare for FRM Parts I and II with FinTree's concept-led classroom, live online and self-paced training, practice tests and expert mentor support.",
    type: "course",
    courseName: "FRM Prep Programme",
  },
  "/fm": {
    title: "Financial Modelling Course | FinTree Education",
    description:
      "Build practical financial modelling, valuation, forecasting and scenario-analysis skills with real-company projects and expert instruction from FinTree.",
    type: "course",
    courseName: "Financial Modelling Programme",
  },
  "/demo": {
    title: "Free CFA, FRM & Financial Modelling Demo Lectures | FinTree",
    description:
      "Watch free FinTree demo lectures for CFA, FRM and Financial Modelling, and preview Juice Notes, mock tests, the LMS and doubt-solving support.",
    type: "website",
  },
};

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = PAGE_SEO[pathname] ?? PAGE_SEO["/"];
    const isKnownPage = pathname in PAGE_SEO;
    const canonicalUrl = `${SITE_URL}${isKnownPage && pathname !== "/" ? pathname : ""}`;

    document.title = page.title;
    setMeta('meta[name="description"]', "name", "description", page.description);
    setMeta('meta[name="robots"]', "name", "robots", isKnownPage ? "index, follow, max-image-preview:large" : "noindex, follow");
    setMeta('meta[property="og:title"]', "property", "og:title", page.title);
    setMeta('meta[property="og:description"]', "property", "og:description", page.description);
    setMeta('meta[property="og:type"]', "property", "og:type", "website");
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", SHARE_IMAGE);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", page.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", page.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", SHARE_IMAGE);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const organization = {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE.name,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/fintree-logo-tab.png`,
      description: PAGE_SEO["/"].description,
      founder: { "@type": "Person", name: "Utkarsh Jain" },
      foundingDate: String(SITE.founded),
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ashok Sankul-2, 207, Second Floor, above ICICI Bank, Bhoslenagar",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "411020",
        addressCountry: "IN",
      },
      contactPoint: [
        { "@type": "ContactPoint", telephone: SITE.phone, contactType: "customer support", availableLanguage: ["English", "Hindi"] },
        { "@type": "ContactPoint", telephone: SITE.support, contactType: "WhatsApp support", url: SITE.socials[0].url },
      ],
      sameAs: SITE.socials.slice(1).map((social) => social.url),
    };
    const pageEntity = page.type === "course"
      ? { "@type": "Course", name: page.courseName, description: page.description, url: canonicalUrl, provider: { "@id": `${SITE_URL}/#organization` } }
      : { "@type": "WebPage", name: page.title, description: page.description, url: canonicalUrl };
    const structuredData = { "@context": "https://schema.org", "@graph": [organization, pageEntity] };
    const script = document.getElementById("seo-structured-data") ?? document.createElement("script");
    script.id = "seo-structured-data";
    script.setAttribute("type", "application/ld+json");
    script.textContent = JSON.stringify(structuredData);
    if (!script.parentNode) document.head.appendChild(script);
  }, [pathname]);

  return null;
}
