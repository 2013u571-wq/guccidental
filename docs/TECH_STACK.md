# Guccidental Website Rebuild - Tech Stack

## 1. Project Context

Guccidental is being rebuilt from the current WordPress website into a modern international B2B dental equipment website.

The new website must support:

- Fast static pages for SEO and Google Ads landing pages
- Product, page, article, case, and media management
- Multilingual content generated from English source content
- Strong SEO metadata and structured data
- Inquiry forms and inquiry statistics through Wufoo API
- A maintainable foundation for future foreign trade website templates

## 2. Final Tech Stack

```text
Frontend Framework: Astro
Language: TypeScript
Styling: Tailwind CSS
CMS: Sanity
Hosting: Cloudflare Pages
Serverless Runtime: Cloudflare Pages Functions / Cloudflare Workers
Form Provider: Wufoo API
Analytics: GA4 + Google Search Console
SEO: Astro SEO components + JSON-LD structured data
i18n: Subdirectory routing, such as /en/ /es/ /fr/ /pt/ /de/ /it/ /ar/ /ru/ /ro/
Translation Workflow: English source content + AI machine translation drafts
```

## 3. Technology Responsibilities

| Area | Technology | Responsibility |
|---|---|---|
| Frontend rendering | Astro | Build fast SEO-friendly pages |
| Type safety | TypeScript | Keep content, routes, and components predictable |
| Styling | Tailwind CSS | Implement the design system with reusable tokens |
| CMS backend | Sanity Studio | Manage pages, products, posts, cases, media, SEO fields |
| Content API | Sanity Content Lake | Provide structured content to Astro |
| Hosting | Cloudflare Pages | Deploy the public website |
| Dynamic API | Cloudflare Functions / Workers | Handle inquiry form proxy and Wufoo statistics |
| Forms | Wufoo API | Store inquiry submissions |
| Analytics | GA4 + GSC | Track traffic, landing pages, keywords, and SEO health |
| SEO schema | Astro + TypeScript | Generate Product, FAQPage, Organization, Article, BreadcrumbList |
| Translation | AI workflow + Sanity fields | Generate and track multilingual drafts |

## 4. Frontend Framework

Use Astro as the main frontend framework.

Why:

- Excellent for static and content-heavy websites
- Strong SEO performance
- Low JavaScript by default
- Good fit for B2B product pages and Google Ads landing pages
- Can integrate with Sanity
- Can use interactive islands only when needed

Astro should render:

- Home page
- Product category pages
- Product detail pages
- Case pages
- News / article pages
- About page
- Factory page
- Contact page
- Resource pages
- SEO landing pages

## 5. Language

Use TypeScript.

Why:

- Product data, SEO fields, multilingual content, and structured data need strict contracts
- Prevents field name mistakes when consuming Sanity data
- Helps Codex / Claude maintain the code safely
- Makes the site easier to turn into a reusable template later

TypeScript should be used for:

- Component props
- Sanity query result types
- SEO metadata objects
- Product and category models
- i18n route helpers
- Wufoo API response types
- Structured data generators
- Translation status models

## 6. Styling

Use Tailwind CSS as the styling system.

Why:

- Converts the design system into reusable tokens
- Keeps spacing, colors, typography, and responsive behavior consistent
- Works well with Astro components
- Easier for AI-assisted development than scattered custom CSS
- Helps future site templates reuse the same layout system

Core design tokens:

```text
Primary Blue: #0057B7
Primary Blue Dark: #003F87
Primary Blue Light: #EAF3FF
Accent Green: #7CBF00
Accent Green Light: #EEF8DD
Text Primary: #111827
Text Secondary: #4B5563
Text Muted: #6B7280
Background: #FFFFFF
Background Soft: #F6F9FC
Border: #DCE7F2
```

Typography:

```css
font-family: Inter, "Helvetica Neue", Arial, sans-serif;
```

Use Inter as the only primary brand typeface.

## 7. CMS

Use Sanity as the main CMS.

Why:

- Better fit than Decap CMS for a real business backend
- Supports structured content modeling
- Suitable for product data, SEO fields, pages, posts, cases, and media
- Provides APIs and SDKs for Astro integration
- Can be extended with custom Studio tools
- Can support preview and content workflows
- Better for multilingual and long-term content operations

Do not use Decap CMS as the primary CMS for this project.

Decap CMS is Git-based and is better for simple static content editing. Guccidental needs a stronger backend for page management, media management, SEO fields, product content, and inquiry statistics.

## 8. Sanity Content Types

Recommended Sanity document types:

```text
siteSettings
page
pageTranslation
productCategory
product
productTranslation
caseStudy
caseStudyTranslation
post
postTranslation
resource
download
seo
redirect
```

Content model details belong in `CONTENT_MODEL.md`.

## 9. Backend / Dynamic Functions

Use Cloudflare Pages Functions or Cloudflare Workers for dynamic features.

Dynamic functions should handle:

- Inquiry form proxy
- Wufoo API calls
- Wufoo inquiry statistics
- Server-side secret handling
- Future webhook processing

Never call Wufoo API directly from the browser.

Correct flow:

```text
Frontend form
  -> Cloudflare Function / Worker
  -> Wufoo API
  -> Wufoo stores inquiry
  -> Frontend receives success / error response
```

Inquiry statistics flow:

```text
Sanity Studio custom tool or private admin route
  -> Cloudflare Function / Worker
  -> Wufoo API
  -> Aggregated inquiry statistics
```

## 10. Inquiry Statistics

Inquiry statistics should be lightweight.

Recommended dashboard metrics:

```text
Today inquiries
This week inquiries
This month inquiries
Inquiry list
Source page
Product interest
Country
Form type
Submission date
```

Do not build a full CRM inside the website.

Wufoo should remain the source of truth for raw inquiry data. The website should only fetch and display useful statistics.

## 11. SEO Stack

SEO must be first-class.

Use Astro + TypeScript helpers to generate:

```text
title
meta description
canonical
Open Graph
Twitter card
hreflang
robots
sitemap.xml
structured data JSON-LD
```

Structured data types:

```text
Organization
Product
FAQPage
BreadcrumbList
Article
WebPage
```

Important rule:

SEO fields should be editable in Sanity, but rendering and validation should be handled in code.

## 12. Internationalization

Use subdirectory routing.

Recommended structure:

```text
/en/
/es/
/fr/
/pt/
/de/
/it/
/ar/
/ru/
/ro/
```

English is the source language.

Spanish, French, Portuguese, German, Italian, Arabic, Russian, and Romanian are generated from English by AI machine translation, then stored as draft translations in Sanity.

Arabic must support RTL from the beginning.

Portuguese should use `pt` by default. If Guccidental later needs a Brazil-specific version, add `pt-BR` as a separate locale instead of overloading the generic Portuguese site.

Requirements:

- hreflang tags
- language switcher
- locale-aware routes
- locale-aware Sanity content
- translation status tracking
- source document references
- RTL layout support for Arabic

Do not add multilingual support as an afterthought.

## 13. Machine Translation

Translation workflow:

```text
01 English source content is created and reviewed
02 AI machine translation generates es / fr / pt / de / it / ar / ru / ro drafts
03 Translation documents are marked as machine-translated
04 Core pages are reviewed manually
05 Reviewed pages are published
```

Fields to track:

```text
sourceLanguage
language
sourceDocument
translationStatus
lastTranslatedAt
reviewedBy
reviewedAt
```

Do not translate:

```text
Product model
SKU
Voltage
Power
Dimensions
Weight
Certificate names
Brand name
Company name
Email
Phone
WhatsApp
PDF file names
Image paths
URL slugs unless explicitly approved
```

## 14. Hosting and Deployment

Use Cloudflare Pages for the public website.

Why:

- Fast global CDN
- Good fit for Astro static output
- Supports Pages Functions
- Good performance for international traffic
- Easy environment variable management

Use environment variables for:

```text
SANITY_PROJECT_ID
SANITY_DATASET
SANITY_API_VERSION
SANITY_READ_TOKEN
WUFOO_API_KEY
WUFOO_SUBDOMAIN
WUFOO_FORM_ID
GA_MEASUREMENT_ID
```

Actual variable names can be finalized during implementation.

## 15. Media Management

Use Sanity for managed media assets.

Approved source references:

```text
Current official website: https://www.guccidental.com/
Alibaba International storefront: https://guccident.en.alibaba.com/index.html
Client-provided original files
```

Media rules:

- Use descriptive file names
- Use image alt text
- Use responsive image rendering
- Use WebP / optimized formats where possible
- Avoid uploading huge uncompressed images
- Separate product, factory, case, team, blog, and resource assets logically
- Download, review, optimize, and re-upload final assets into Sanity
- Do not hotlink images from Alibaba or the old official website
- Record source URL, source type, usage rights, and review status where possible
- Treat Alibaba assets as product reference material, not as final brand design direction

For downloadable files:

```text
catalogs
manuals
spec sheets
certificates
installation guides
```

## 16. Performance Standards

Targets:

```text
LCP: under 2.5s where possible
CLS: near 0
INP: good range
Mobile Lighthouse Performance: 85+
Desktop Lighthouse Performance: 90+
```

Implementation rules:

- Keep JavaScript minimal
- Use Astro static rendering for most pages
- Lazy-load below-the-fold images
- Use optimized images
- Avoid heavy animation on SEO landing pages
- Use video only where it improves trust or conversion
- Provide poster images for videos
- Respect reduced motion preference

## 17. Animation Rules

Allowed:

```text
CSS transitions
IntersectionObserver reveal
Light GSAP / ScrollTrigger where justified
Small interactive islands
Video hero with poster fallback
```

Use carefully:

```text
Three.js
Canvas
WebGL
Lenis smooth scrolling
```

Not recommended for the main B2B site:

```text
Heavy WebGL campaign-page effects
Full-screen scroll hijacking
Animation that hides HTML content from crawlers
Large JavaScript animation bundles on product SEO pages
```

Guccidental should feel modern and premium, but it must remain fast, crawlable, and conversion-focused.

## 18. Prohibited Technologies

Do not use:

```text
WordPress
Elementor
jQuery
Bootstrap
Decap CMS as the main CMS
Client-side Wufoo API calls
Hardcoded SEO metadata without CMS override
Unstructured product Markdown as the long-term source of truth
Heavy WebGL as the default page architecture
```

## 19. Repository Documentation

The project should include:

```text
PROJECT_BRIEF.md
TECH_STACK.md
DESIGN_SYSTEM.md
CONTENT_MODEL.md
ARCHITECTURE.md
SEO_MIGRATION.md
AI_RULES.md
MIGRATION_MAP.md
```

`TECH_STACK.md` is the source of truth for technology choices.

## 20. Recommended Development Order

```text
01 Confirm site structure, URL strategy, and SEO migration priorities
02 Define content model and Sanity schema draft
03 Design core frontend pages
04 Confirm design system and tokens
05 Build Astro + Tailwind + TypeScript foundation
06 Build Sanity Studio schema
07 Connect Astro to Sanity
08 Build product, article, case, and page templates
09 Build machine translation workflow
10 Build Wufoo form proxy and inquiry statistics
11 Add SEO, schema, sitemap, hreflang, and redirects
12 QA desktop, mobile, performance, SEO, forms, and multilingual pages
13 Deploy to Cloudflare Pages
```

## 21. Final Decision

Final approved stack:

```text
Astro + TypeScript + Tailwind CSS + Sanity + Cloudflare Pages + Cloudflare Functions/Workers + Wufoo API
```

This stack balances:

- SEO performance
- Editorial management
- Product content structure
- Internationalization
- Machine translation workflow
- Google Ads landing page needs
- Inquiry conversion
- Long-term maintainability
- Future foreign trade website template reuse
