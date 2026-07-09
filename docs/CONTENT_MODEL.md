# Guccidental Content Model

## 1. Purpose

This document defines how Guccidental content should be structured in Sanity and consumed by the Astro frontend.

The content model must support:

- English-first content creation
- AI machine translation into Spanish, French, Portuguese, German, Italian, Arabic, Russian, and Romanian
- Product management
- Page management
- Article / news management
- Case management
- Media and download management
- SEO metadata
- Structured data
- Google Ads landing pages
- Long-term maintainability

## 2. Language Strategy

English is the source language.

Supported languages:

```text
English: en
Spanish: es
French: fr
Portuguese: pt
German: de
Italian: it
Arabic: ar
Russian: ru
Romanian: ro
```

Recommended URL structure:

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

Arabic must support RTL.

Portuguese should use `pt` as the default locale unless the project later decides to target Brazil specifically, in which case `pt-BR` can be added as a separate locale.

## 3. Translation Workflow

```text
01 Create English source content
02 Review English source content
03 Generate es / fr / pt / de / it / ar / ru / ro machine translations
04 Store translations as Sanity draft documents
05 Mark translated documents as machine-translated
06 Manually review key pages
07 Publish approved translations
```

Translation status values:

```text
not-translated
machine-translated
needs-review
reviewed
published
outdated
```

When English source content changes, related translated documents should be marked as `outdated` or `needs-review`.

## 4. Translation Metadata

Every translated document should include:

```text
language
sourceLanguage
sourceDocument
translationStatus
lastTranslatedAt
reviewedBy
reviewedAt
machineTranslationProvider
```

Example:

```ts
{
  language: "es",
  sourceLanguage: "en",
  sourceDocument: reference("productTranslation"),
  translationStatus: "machine-translated",
  lastTranslatedAt: "2026-06-21T00:00:00Z"
}
```

## 5. Translation Lock Rules

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

Can translate:

```text
Product title
Summary
Features
Applications
FAQ
Body content
SEO title
SEO description
Button labels
Form helper text
Case descriptions
Article body
```

## 6. Core Sanity Document Types

Recommended document types:

```text
siteSettings
navigation
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
solution
solutionTranslation
redirect
```

## 7. Site Settings

`siteSettings` stores global brand and contact data.

Fields:

```text
siteName
defaultLanguage
supportedLanguages
logo
favicon
primaryColor
companyName
email
phone
whatsapp
address
socialLinks
defaultSeo
organizationSchema
```

This content should usually not be translated except for company description and address display text where needed.

## 8. Navigation

`navigation` controls menu structure.

Fields:

```text
title
language
items[]
```

Navigation item fields:

```text
label
linkType
internalReference
externalUrl
children[]
order
```

Navigation must support longer translated labels and Arabic RTL rendering.

## 9. Page

Use `page` for language-neutral page identity and routing.

Fields:

```text
slug
pageType
template
status
parentPage
order
createdAt
updatedAt
```

Page types:

```text
home
about
factory
contact
landing
resourceIndex
solutionIndex
solutionDetail
caseIndex
newsIndex
service
dealer
technicalService
buildingMaterialsFurniture
custom
```

## 10. Page Translation

Use `pageTranslation` for language-specific page content.

Fields:

```text
page
language
sourceLanguage
sourceDocument
translationStatus
title
summary
sections
seo
lastTranslatedAt
reviewedBy
reviewedAt
```

`sections` should be page-builder style but controlled by approved block types.

Approved page section blocks:

```text
hero
trustBar
productCategoryGrid
featuredProducts
textImage
factoryProof
certificateGrid
caseStudyGrid
faq
resourceGrid
ctaBand
contactForm
solutionGrid
serviceCards
dealerForm
productTierTabs
```

Avoid allowing unlimited free-form layout blocks in the CMS.

## 11. Solution

Use `solution` for reusable solution landing pages.

Fields:

```text
slug
solutionType
featuredImage
relatedProducts
relatedCategories
relatedResources
order
status
```

Allowed `solutionType` values:

```text
new-clinic
clinic-renovation
dealer
```

Use `solutionTranslation` for language-specific solution content.

Fields:

```text
solution
language
sourceLanguage
sourceDocument
translationStatus
title
summary
body
benefits
processSteps
faq
cta
seo
lastTranslatedAt
reviewedBy
reviewedAt
```

Recommended solution URLs:

```text
/en/solutions/new-clinic/
/en/solutions/clinic-renovation/
/en/solutions/dealer/
```

## 12. Product Category

`productCategory` stores category identity and hierarchy.

Fields:

```text
slug
parentCategory
order
icon
featuredImage
status
```

Translatable category fields should be stored separately:

```text
name
summary
seo
language
translationStatus
```

Categories:

```text
dental-chair
dental-chair/economic
dental-chair/mid-range
dental-chair/high-end
dental-cabinet
dental-cabinet/metal
dental-cabinet/wood
ultrasonic-scaler-light-cure
ultrasonic-scaler-light-cure/ultrasonic-scaler
ultrasonic-scaler-light-cure/light-cure
dental-handpiece
air-equipment
air-equipment/air-compressor
air-equipment/vacuum-pump
imaging-system
imaging-system/x-ray
imaging-system/cbct
imaging-system/intraoral-scanner
imaging-system/intraoral-camera
surgical-instruments
whitening-machine
endo-motor
orthodontics
disposable-consumables
teaching-model
laboratory
building-materials-furniture
building-materials-furniture/decoration
building-materials-furniture/decoration/flooring
building-materials-furniture/decoration/ceiling
building-materials-furniture/decoration/doors-windows
building-materials-furniture/furniture
building-materials-furniture/furniture/reception-desk
building-materials-furniture/furniture/sofa
building-materials-furniture/furniture/chair
```

## 13. Product

Use `product` for language-neutral product data.

Fields:

```text
model
sku
slug
category
chairTier
featured
order
images
specs
certificates
downloads
relatedProducts
status
```

`chairTier` only applies to dental chair products.

Allowed `chairTier` values:

```text
economic
mid-range
high-end
```

Do not duplicate specs across languages.

Product specs:

```text
key
value
unit
group
order
```

Example:

```ts
{
  key: "voltage",
  value: "110/220",
  unit: "V",
  group: "Electrical",
  order: 10
}
```

Spec label translation should be handled by a shared dictionary, not repeated in every product.

## 14. Product Translation

Use `productTranslation` for language-specific product copy.

Fields:

```text
product
language
sourceLanguage
sourceDocument
translationStatus
title
summary
body
features
applications
faq
seo
lastTranslatedAt
reviewedBy
reviewedAt
```

Feature fields:

```text
title
detail
icon
order
```

FAQ fields:

```text
question
answer
order
```

Product translation is used for:

- Product card text
- Product detail page
- Product SEO fields
- FAQPage schema

## 15. Case Study

Use `caseStudy` for language-neutral case data.

Fields:

```text
slug
caseType
country
region
clinicType
products
images
publishDate
featured
status
```

Allowed `caseType` values:

```text
clinic
dental-chair
dental-cabinet
```

Use `caseStudyTranslation` for language-specific content.

Fields:

```text
caseStudy
language
sourceLanguage
sourceDocument
translationStatus
title
summary
challenge
solution
result
body
seo
lastTranslatedAt
reviewedBy
reviewedAt
```

Case pages should clearly show:

```text
Country
Clinic type
Products used
Customer need
Guccidental solution
Project result
Images
CTA
```

## 16. Post / News

Use `post` for language-neutral article identity.

Fields:

```text
slug
category
coverImage
author
publishDate
updatedDate
featured
status
```

Use `postTranslation` for language-specific article content.

Fields:

```text
post
language
sourceLanguage
sourceDocument
translationStatus
title
excerpt
body
seo
lastTranslatedAt
reviewedBy
reviewedAt
```

Post categories:

```text
company-news
exhibition
product-guide
buying-guide
maintenance
case-update
```

## 17. Resource

Use `resource` for catalogs, manuals, installation guides, certificates, and spec sheets.

Fields:

```text
title
language
resourceType
file
relatedProducts
relatedCategories
description
sourceUrl
sourceType
usageRights
seo
status
```

`sourceUrl` and `sourceType` are recommended when the asset or file is collected from the current official website, Alibaba International storefront, or a client-provided archive.

Allowed `sourceType` values:

```text
official-site
alibaba-international
client-upload
catalog
photoshoot
unknown
```

`usageRights` should record whether the asset is approved for the rebuilt official website.

Resource types:

```text
design-solution
catalog
color-selection
technical-support
manual
spec-sheet
certificate
installation-guide
brochure
video
```

## 18. Downloads

Downloads may be linked to products or categories.

Fields:

```text
label
file
language
fileType
relatedProduct
relatedCategory
requiresLeadCapture
status
```

For Google Ads landing pages, important downloads can optionally be connected to inquiry forms.

## 19. Media Asset Governance

Use Sanity assets for final website media, but keep origin metadata for traceability.

Asset source references:

```text
Current official website: https://www.guccidental.com/
Alibaba International storefront: https://guccident.en.alibaba.com/index.html
Client-provided source files
```

Recommended media metadata:

```text
altText
caption
sourceUrl
sourceType
usageRights
relatedProduct
relatedCategory
relatedCase
language
reviewStatus
```

Allowed `reviewStatus` values:

```text
pending
approved
rejected
needs-replacement
```

Rules:

- Final website images must be uploaded into Sanity instead of hotlinking from Alibaba or the old website.
- Product model names and technical labels from Alibaba can be used for reference, but should be checked against client-approved product data.
- Marketplace-style images should be redesigned or replaced when they weaken the premium B2B brand feel.
- Low-resolution, watermarked, duplicated, or visibly compressed images should be marked as `needs-replacement`.
- Keep source metadata so the team can trace where each image or file came from.

## 20. SEO Object

Every major content type should include an SEO object.

Fields:

```text
metaTitle
metaDescription
canonicalUrl
ogTitle
ogDescription
ogImage
noindex
schemaType
```

SEO rules:

- `metaTitle` should be editable.
- `metaDescription` should be editable.
- If empty, code can fall back to title and summary.
- `noindex` should be available but used carefully.
- Canonical should be generated by default, with manual override only when needed.

## 21. Structured Data Mapping

Homepage:

```text
Organization
WebSite
WebPage
```

Product page:

```text
Product
FAQPage
BreadcrumbList
WebPage
```

Article page:

```text
Article
BreadcrumbList
WebPage
```

Case page:

```text
WebPage
BreadcrumbList
```

All pages:

```text
BreadcrumbList where applicable
```

## 22. Redirect

Use `redirect` to help manage migration from old URLs.

Fields:

```text
from
to
statusCode
reason
priority
isActive
```

Usually:

```text
statusCode: 301
```

Migration mapping should also be maintained in `MIGRATION_MAP.md`.

## 23. Inquiry-Related Content

Inquiry data itself should remain in Wufoo.

Sanity can store:

```text
Form display settings
CTA labels
Product interest options
Thank-you message
Inquiry dashboard configuration
```

Do not store full raw inquiry records in Sanity unless required.

## 24. Content Publishing Status

Recommended status values:

```text
draft
review
published
archived
```

For translated documents, combine with `translationStatus`.

Example:

```text
status: published
translationStatus: reviewed
```

## 25. Machine Translation QA Rules

Pages that must be manually reviewed before publishing:

```text
Homepage
Product category pages
Core product pages
Google Ads landing pages
Contact page
About page
Factory page
SEO title / description for top pages
```

Lower-risk pages may publish after quick review:

```text
News posts
Long-tail products
Older case studies
Resource descriptions
```

## 26. Frontend Rendering Rules

Astro should query Sanity content by:

```text
language
slug
content type
status
```

Fallback behavior:

- If translated page exists and is published, render it.
- If translated page is missing, either show English fallback or return 404 depending on SEO strategy.
- Do not silently show English content under a non-English URL unless explicitly configured.

Recommended:

```text
For launch: only render translated URLs that have actual translated content.
```

## 27. Content Ownership

English source content:

```text
Owned by content / SEO team
```

Machine translation:

```text
Generated by AI workflow
```

Core translation review:

```text
Owned by project manager or native-language reviewer
```

Technical schema:

```text
Owned by developer / Codex
```

## 28. Initial Build Priority

Phase 1 content types:

```text
siteSettings
page
pageTranslation
productCategory
product
productTranslation
seo
redirect
```

Phase 2 content types:

```text
caseStudy
caseStudyTranslation
post
postTranslation
resource
download
navigation
```

Phase 3 enhancements:

```text
Sanity custom inquiry dashboard
Machine translation automation
Visual preview
Bulk translation tools
Content audit tools
```
