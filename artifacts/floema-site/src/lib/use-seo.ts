import { useEffect } from "react";

export const SITE_URL = "https://gasosaautoagro.com";
const SITE_NAME = "Gasosa Auto Agro";
const DEFAULT_OG = `${SITE_URL}/opengraph.jpg`;

// ─── Shared schemas ──────────────────────────────────────────────────────────

export const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gasosa Auto Agro",
  legalName: "CFA GASOSA SU LDA",
  foundingDate: "2016",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: "geral@cfagasosa.com",
  description:
    "Empresa angolana especializada em peças, lubrificantes, ferramentas agrícolas e serviços de manutenção para os sectores automóvel, industrial e agrícola. Presente em Luanda, Lubango e Huambo.",
  areaServed: "Angola",
  foundingLocation: "Luanda, Angola",
  brand: [
    { "@type": "Brand", name: "Pangulino" },
    { "@type": "Brand", name: "Nergytech" },
  ],
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+244951025435", contactType: "customer service", areaServed: "AO", availableLanguage: "Portuguese" },
    { "@type": "ContactPoint", telephone: "+244926445508", contactType: "customer service", areaServed: "AO", availableLanguage: "Portuguese" },
    { "@type": "ContactPoint", telephone: "+244941066420", contactType: "customer service", areaServed: "AO", availableLanguage: "Portuguese" },
  ],
};

const lbBase = (name: string, street: string, city: string, tel: string, desc: string) => ({
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  name: `Gasosa Auto Agro — ${name}`,
  image: DEFAULT_OG,
  description: desc,
  address: { "@type": "PostalAddress", streetAddress: street, addressLocality: city, addressCountry: "AO" },
  telephone: tel,
  email: "geral@cfagasosa.com",
  url: `${SITE_URL}/contactos`,
  priceRange: "$$",
  currenciesAccepted: "AOA",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
});

export const LOCAL_BUSINESS_LUANDA = lbBase(
  "Luanda", "Avenida 21 de Janeiro", "Luanda", "+244951025435",
  "Loja principal da Gasosa Auto Agro em Luanda, com mais de 2.000 m² incluindo showroom, armazém e oficina de serviços rápidos."
);
export const LOCAL_BUSINESS_LUBANGO = lbBase(
  "Lubango", "Rua Aníbal de Melo", "Lubango", "+244926445508",
  "Instalações da Gasosa Auto Agro no Lubango, com mais de 10.000 m² de área construída, incluindo lojas, armazéns e oficinas."
);
export const LOCAL_BUSINESS_HUAMBO = lbBase(
  "Huambo", "Cidade Baixa", "Huambo", "+244941066420",
  "Loja da Gasosa Auto Agro no Huambo, com mais de 1.200 m² com loja e armazém."
);

export const PANGULINO_PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Ferramentas Agrícolas Pangulino",
  brand: { "@type": "Brand", name: "Pangulino" },
  description:
    "Linha de ferramentas agrícolas de alta durabilidade para uso no campo angolano. Inclui enxadas, pás, ancas, carrinhos de mão e ancinho. A Pangulino é a principal marca angolana de ferramentas agrícolas, disponível nas lojas Gasosa em Luanda, Lubango e Huambo.",
  manufacturer: { "@type": "Organization", name: "Gasosa Auto Agro" },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "AOA",
    seller: { "@type": "Organization", name: "Gasosa Auto Agro" },
  },
};

export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é a Pangulino?",
      acceptedAnswer: { "@type": "Answer", text: "A Pangulino é uma marca angolana de ferramentas agrícolas criada em 2019 pela Gasosa Auto Agro. Oferece enxadas, pás, ancas, carrinhos de mão e outros equipamentos para o campo, reconhecida pela durabilidade e qualidade no mercado angolano." },
    },
    {
      "@type": "Question",
      name: "A Nergytech está disponível em Angola?",
      acceptedAnswer: { "@type": "Answer", text: "Sim. A Gasosa Auto Agro é o representante exclusivo da Nergytech em Angola, oferecendo lubrificantes premium para veículos, máquinas agrícolas e equipamentos industriais." },
    },
    {
      "@type": "Question",
      name: "A Gasosa tem loja fora de Luanda?",
      acceptedAnswer: { "@type": "Answer", text: "Sim. A Gasosa Auto Agro tem instalações em três cidades: Luanda (Av. 21 de Janeiro), Lubango (Rua Aníbal de Melo) e Huambo (Cidade Baixa), cobrindo o norte, centro e sul de Angola." },
    },
    {
      "@type": "Question",
      name: "Que lubrificantes a Gasosa vende?",
      acceptedAnswer: { "@type": "Answer", text: "A Gasosa vende lubrificantes das marcas Nergytech (representação exclusiva em Angola), Petronas, Castrol, Galp e Puma, para automóveis, tractores, máquinas agrícolas e equipamentos industriais." },
    },
    {
      "@type": "Question",
      name: "A Gasosa trabalha com empresas e fazendas?",
      acceptedAnswer: { "@type": "Answer", text: "Sim. A Gasosa é parceira estratégica de mais de 30 empresas e fazendas em Angola, incluindo Sonangol, Governo de Angola, Fazenda Tchissola, Fazenda Boi Verde, entre muitas outras." },
    },
  ],
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  schema?: object | object[];
  breadcrumb?: { name: string; path: string };
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function injectLD(id: string, data: object) {
  document.getElementById(id)?.remove();
  const s = document.createElement("script");
  s.id = id;
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(data);
  document.head.appendChild(s);
}

export function useSEO({
  title,
  description,
  path = "/",
  ogImage = DEFAULT_OG,
  ogType = "website",
  schema,
  breadcrumb,
}: SEOProps) {
  const canonical = `${SITE_URL}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  useEffect(() => {
    document.title = fullTitle;

    setMeta("name",     "description",         description);
    setMeta("name",     "robots",              "index, follow");
    setMeta("property", "og:title",            fullTitle);
    setMeta("property", "og:description",      description);
    setMeta("property", "og:url",              canonical);
    setMeta("property", "og:image",            ogImage);
    setMeta("property", "og:type",             ogType);
    setMeta("property", "og:site_name",        SITE_NAME);
    setMeta("property", "og:locale",           "pt_AO");
    setMeta("name",     "twitter:card",        "summary_large_image");
    setMeta("name",     "twitter:title",       fullTitle);
    setMeta("name",     "twitter:description", description);
    setMeta("name",     "twitter:image",       ogImage);

    setLink("canonical", canonical);

    injectLD("ld-org", ORG_SCHEMA);

    if (breadcrumb) {
      injectLD("ld-bc", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: breadcrumb.name, item: `${SITE_URL}${breadcrumb.path}` },
        ],
      });
    }

    const pageSchemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
    pageSchemas.forEach((s, i) => injectLD(`ld-p${i}`, s));

    return () => {
      ["ld-org", "ld-bc", ...pageSchemas.map((_, i) => `ld-p${i}`)].forEach(
        id => document.getElementById(id)?.remove()
      );
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullTitle, description, canonical, ogImage]);
}
