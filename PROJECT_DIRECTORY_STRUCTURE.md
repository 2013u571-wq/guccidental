# Guccidental Project Directory Structure

This document lists the files that should be placed into the new Guccidental rebuild project directory before asking Codex to start implementation.

## 1. Recommended Root Directory

Recommended local project folder:

```text
guccidental-rebuild/
```

Recommended structure:

```text
guccidental-rebuild/
├── AGENTS.md
├── README.md
├── TASKS.md
├── docs/
│   ├── DESIGN_SYSTEM.md
│   ├── TECH_STACK.md
│   ├── CONTENT_MODEL.md
│   ├── CLIENT_CONTENT_STRUCTURE.md
│   ├── IMPLEMENTATION_PHASES.md
│   └── deferred/
│       ├── SEO_MIGRATION.md
│       ├── PRODUCT_DATA_STANDARD.md
│       ├── CONVERSION_STRATEGY.md
│       └── CONTENT_WORKFLOW.md
├── references/
│   ├── current-site/
│   ├── alibaba/
│   ├── client/
│   └── competitor-references/
├── assets/
│   ├── brand/
│   ├── product/
│   ├── factory/
│   ├── certificates/
│   ├── cases/
│   └── downloads/
├── app/
├── sanity/
└── scripts/
```

## 2. Files To Copy Immediately

Copy these existing planning documents into `docs/`:

```text
outputs/DESIGN_SYSTEM.md
outputs/TECH_STACK.md
outputs/CONTENT_MODEL.md
outputs/CLIENT_CONTENT_STRUCTURE.md
```

Target paths:

```text
docs/DESIGN_SYSTEM.md
docs/TECH_STACK.md
docs/CONTENT_MODEL.md
docs/CLIENT_CONTENT_STRUCTURE.md
```

These are the core source-of-truth documents for the first implementation phase.

## 3. Root Instruction Files

Create these files in the project root.

```text
AGENTS.md
README.md
TASKS.md
```

### AGENTS.md

Purpose:

```text
Instructions for Codex and future AI agents.
```

Recommended content:

```text
# Guccidental Rebuild - Agent Instructions

Read these documents before implementation:

- docs/DESIGN_SYSTEM.md
- docs/TECH_STACK.md
- docs/CONTENT_MODEL.md
- docs/CLIENT_CONTENT_STRUCTURE.md

Project priorities:

1. Follow the design system.
2. Build English-first pages with multilingual-ready routing.
3. Use Astro, TypeScript, Tailwind CSS, Sanity, Cloudflare Pages, and Wufoo API.
4. Build station-side form UI first; connect Wufoo API later.
5. Use current official website and Alibaba International storefront only as material sources, not as visual design references.
6. Keep code maintainable and content-model driven.
7. Do not hardcode page content that should come from Sanity later unless building a temporary prototype.
8. Prioritize homepage, navigation, product category page, product detail page, and inquiry form UI first.

Current phase:

Phase 1 - Design Framework & Core Page Structure.

Do not start Phase 2 documents until the homepage, content blocks, and product templates are confirmed.
```

### README.md

Purpose:

```text
Human-facing project overview.
```

Recommended content:

```text
# Guccidental Website Rebuild

Guccidental is being rebuilt into a modern international B2B dental equipment website.

Core stack:

- Astro
- TypeScript
- Tailwind CSS
- Sanity
- Cloudflare Pages
- Cloudflare Functions / Workers
- Wufoo API

Primary design direction:

- Clean
- Clinical
- Precise
- Trustworthy
- International B2B
- Conversion-focused

Primary color:

- #0057B7

Primary font:

- Inter, "Helvetica Neue", Arial, sans-serif
```

### TASKS.md

Purpose:

```text
Codex implementation checklist.
```

Recommended first task list:

```text
# Tasks

## Phase 1 - Design Framework & Core Page Structure

- [ ] Create Astro project structure
- [ ] Add TypeScript
- [ ] Add Tailwind CSS
- [ ] Configure design tokens from docs/DESIGN_SYSTEM.md
- [ ] Create base layout
- [ ] Create responsive header and navigation
- [ ] Create footer
- [ ] Create homepage structure
- [ ] Create reusable section components
- [ ] Create product category page template
- [ ] Create product detail page template
- [ ] Create inquiry form UI components
- [ ] Create static mock content based on docs/CLIENT_CONTENT_STRUCTURE.md
- [ ] Prepare Sanity schema draft based on docs/CONTENT_MODEL.md
- [ ] Add multilingual-ready route structure
- [ ] Verify mobile layout
- [ ] Verify accessibility basics
- [ ] Verify build
```

## 4. Reference Folders

Create these folders for source materials.

```text
references/current-site/
references/alibaba/
references/client/
references/competitor-references/
```

### references/current-site/

Use for:

```text
Old official website screenshots
Old sitemap
Old page HTML snapshots
Old product images
Old certificates
Old downloads
```

Known source:

```text
https://www.guccidental.com/
```

### references/alibaba/

Use for:

```text
Alibaba product screenshots
Product model references
Product image references
Product parameter references
Application scenario references
```

Known source:

```text
https://guccident.en.alibaba.com/index.html
```

Important rule:

```text
Alibaba is a material source, not the design direction.
```

### references/client/

Use for:

```text
Client-provided PDFs
Client-provided content structure
Client-provided brand files
Client-provided product catalogs
Client-provided images and videos
```

Current known client file:

```text
/Users/gaosong/Desktop/古旗医疗网站重构/内容结构.pdf
```

### references/competitor-references/

Use for:

```text
A-dec
Takara Belmont Dental
Planmeca
Other international dental equipment references
```

Use competitors for quality benchmark and structure reference only. Do not copy assets, wording, layouts, or identity.

## 5. Asset Folders

Create these folders for final selected assets.

```text
assets/brand/
assets/product/
assets/factory/
assets/certificates/
assets/cases/
assets/downloads/
```

Rules:

- Only place cleaned, approved, final-use assets here.
- Keep raw screenshots and unreviewed files in `references/`.
- Do not hotlink old website or Alibaba images.
- Final assets should later be uploaded into Sanity.

## 6. Deferred Documents

These documents should exist as placeholders, but do not need to be fully written until after homepage and product templates are confirmed.

```text
docs/deferred/SEO_MIGRATION.md
docs/deferred/PRODUCT_DATA_STANDARD.md
docs/deferred/CONVERSION_STRATEGY.md
docs/deferred/CONTENT_WORKFLOW.md
```

Placeholder content for each:

```text
# Deferred

This document will be completed in Phase 2 after the homepage, content blocks, and product page templates are confirmed.
```

## 7. First Codex Terminal Prompt

Use this prompt after creating the directory and copying the documents:

```text
Read AGENTS.md and all files in docs/.

This is the Guccidental website rebuild project.

Current phase:
Phase 1 - Design Framework & Core Page Structure.

Do not implement Wufoo API integration yet.
Build station-side form UI first.

Please inspect the project directory, then create an implementation plan for:

1. Astro + TypeScript + Tailwind setup
2. Design tokens
3. Layout components
4. Homepage structure
5. Product category template
6. Product detail template
7. Inquiry form UI
8. Sanity schema draft
9. Multilingual-ready routing

After the plan, begin implementation step by step.
```

## 8. Recommended Implementation Order

```text
01 Create project scaffold
02 Add Tailwind and design tokens
03 Build base layout
04 Build header / navigation
05 Build footer
06 Build homepage sections
07 Build product category template
08 Build product detail template
09 Build form UI components
10 Add mock content from client structure
11 Draft Sanity schemas
12 Add multilingual route helpers
13 Build and verify
```

## 9. Minimum Files Before Starting Codex

At minimum, the project should contain:

```text
AGENTS.md
README.md
TASKS.md
docs/DESIGN_SYSTEM.md
docs/TECH_STACK.md
docs/CONTENT_MODEL.md
docs/CLIENT_CONTENT_STRUCTURE.md
```

These eight files are enough for Codex to start meaningful implementation.
