---
name: SEO architecture
description: How SEO is implemented in the Gasosa Auto Agro site — hook, schemas, domain placeholder, and file locations.
---

## Pattern
Custom `useSEO` hook at `src/lib/use-seo.ts` — manipulates `document.head` directly (no react-helmet). Sets title, meta description, OG, Twitter, canonical, and injects JSON-LD `<script>` tags.

## Domain
Placeholder: `https://gasosaautoagro.com` — constant `SITE_URL` at top of `use-seo.ts`. Update this one constant when the real domain is known.

## Schemas exported from use-seo.ts
- `ORG_SCHEMA` — Organization (injected on every page as `ld-org`)
- `LOCAL_BUSINESS_LUANDA/LUBANGO/HUAMBO` — AutoPartsStore per city
- `PANGULINO_PRODUCT_SCHEMA` — Product schema for Pangulino page
- `FAQ_SCHEMA` — FAQPage schema, used on homepage

## Pages and their schemas
- HomePage: ORG + FAQ_SCHEMA; also has visible FAQ section + GEO text block before Footer
- PangulinoPage: ORG + PANGULINO_PRODUCT_SCHEMA + Breadcrumb
- InfraestrutrasPage: ORG + 3x LOCAL_BUSINESS + Breadcrumb
- NoticiasPage: ORG + Breadcrumb
- ContactosPage: ORG + 3x LOCAL_BUSINESS + Breadcrumb

## Public files
- `/public/sitemap.xml` — 5 pages, gasosaautoagro.com domain
- `/public/robots.txt` — Allow + Sitemap reference
- `/public/llms.txt` — AI/GEO optimisation file (new standard)

**Why:** react-helmet-async wasn't installed and adding a package for head management in a small SPA is overkill. DOM manipulation in useEffect is sufficient and avoids a dependency.
