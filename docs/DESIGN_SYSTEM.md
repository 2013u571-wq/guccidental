# Guccidental Design System

## 1. Design Direction

Guccidental should become a modern international B2B dental equipment brand website.

The design should feel:

- Clean
- Clinical
- Precise
- Trustworthy
- Factory-backed
- International
- Conversion-focused

The site should not feel:

- Like an old WordPress export template
- Like a low-price marketplace supplier page
- Like a decorative medical technology concept page
- Like a heavy WebGL campaign microsite

## 2. Brand References

Primary references:

- A-dec: product system, trust building, professional navigation
- Takara Belmont Dental: modern dental equipment page rhythm, SEO-friendly content structure
- Planmeca: clean high-end medical technology feeling

Additional non-medical design-system references may be used only for abstract layout and typography principles, not for visual copying:

- IBM / Carbon-style enterprise systems: structured blue palette, precise hierarchy, restrained UI rhythm
- HP-style product catalog systems: white canvas, electric blue anchor color, angular brand motifs
- Apple-style premium product pages: generous whitespace and cinematic product imagery
- Vercel-style precision systems: high-contrast type hierarchy and minimal interface chrome
- Coinbase-style institutional product pages: trustworthy blue, calm white surfaces, and restrained financial-grade UI confidence

Use these references for structure, tone, and quality level. Do not copy their visual assets, wording, or proprietary identity.

Reference intake rule:

- External references, including getdesign.md DESIGN.md files, may inform principles such as hierarchy, spacing, contrast, motion restraint, and palette discipline.
- Do not copy competitor or reference-site layouts one-to-one.
- Do not import reference-site fonts, icons, illustrations, gradients, slogans, or proprietary graphic devices unless independently licensed and intentionally approved.
- Convert every reference into a Guccidental-specific rule using Guccidental colors, type tokens, and assets.

## 3. Brand Color

### Primary Color

```text
Primary Blue: #0057B7
```

This is the main Guccidental brand color for the rebuilt website. It is more premium, stable, and international than the current site blue.

### Color Palette

```text
Primary Blue:        #0057B7
Primary Blue Dark:   #003F87
Primary Blue Light:  #EAF3FF

Accent Green:        #7CBF00
Accent Green Light:  #EEF8DD

Text Primary:        #111827
Text Secondary:      #4B5563
Text Muted:          #6B7280

Background:          #FFFFFF
Background Soft:     #F6F9FC
Border:              #DCE7F2
Warning:             #F59E0B
Error:               #DC2626
Success:             #16A34A
```

### Color Usage Rules

- Use `#0057B7` as the primary visual anchor.
- Use green only as a supporting accent from the logo.
- Use white and soft blue-gray backgrounds for most sections.
- Avoid large areas of saturated green.
- Avoid heavy gradients.
- Avoid dark blue full-page backgrounds unless used for a specific high-impact section.
- Primary CTA buttons should use `#0057B7`.
- Secondary CTA buttons should use outline or light-blue styles.

### Color Composition Rules

Use a disciplined medical-equipment palette rather than a decorative marketing palette:

```text
White / Surface White:        dominant canvas
Soft Blue-Gray:               section separation and trust bands
Primary Blue:                 CTA, navigation state, key numbers, technical emphasis
Accent Green:                 small brand accent only
Dark Blue-Gray Overlays:      video/image readability only
```

Recommended visual ratio on homepage:

```text
White and near-white surfaces: 70-80%
Soft blue-gray surfaces:       12-18%
Primary blue:                  5-8%
Accent green:                  under 3%
```

Rules:

- Keep the homepage mostly white, soft blue-gray, and clinical neutral.
- Use `brand.blue` for intentional anchors: CTA, active navigation, key statistics, and selected link states.
- Use `brand.green` only for small identity moments such as logo echo, headline highlight, or the top brand rhythm bar.
- Avoid large saturated blue or green backgrounds unless the section is intentionally high-impact and short.
- Use cool dark blue-gray overlays such as `rgba(8,18,32,...)` over video or photography instead of warm black/brown overlays.

## 4. Typography

### Final Typeface System

```css
:root {
  --font-body: "IBM Plex Sans", "Helvetica Neue", Arial, sans-serif;
  --font-display-serif: Newsreader, Georgia, "Times New Roman", serif;
}
```

Use IBM Plex Sans as the base UI and body typeface across every page template.

Applies to:

- Header and navigation
- Buttons and links
- Body copy
- Card titles and descriptions
- Forms and filters
- Footer text
- Breadcrumbs and metadata

Fallbacks:

- `Helvetica Neue`: system fallback only
- `Arial`: universal fallback
- `sans-serif`: final fallback

Do not use `PlayStation SST`. The provided screenshot is only a reference for typography hierarchy and spacing.

### Display Serif Exceptions

Newsreader is reserved for exactly two uses:

1. Main Hero headlines, such as `Better Build Your Dream Clinic`.
2. Large stat numerals, including homepage trust statistics, entity-band statistics, Factory & Quality QC numbers, and future big-metric displays.

Approved secondary display stack:

```css
font-family: Newsreader, Georgia, "Times New Roman", serif;
```

Usage rules:

- Use Newsreader for Hero headline typography to create intentional contrast against the IBM Plex Sans interface.
- Use Newsreader for large numerals that convey scale, proof, or credibility.
- Do not use Newsreader for navigation, body copy, buttons, form labels, product cards, card titles, regular section headings, or paragraphs.
- Pair serif numerals with IBM Plex Sans labels underneath to keep the interface professional and readable.
- Do not switch Hero headlines or large stat numerals back to a sans-serif font without explicit confirmation.

### Required Font Weights

```text
300 Light
400 Regular
500 Medium
600 SemiBold
700 Bold
```

### Typography Scale

| Token | Usage | Size | Weight | Line Height | Letter Spacing |
|---|---|---:|---:|---:|---:|
| display-xl | Homepage hero headline | 54px | 600 | 1.18 | 0 |
| display-xl-strong | Homepage video hero headline | 54px | 600 | 1.18 | 0 |
| display-lg | Major landing page headline | 44px | 300 | 1.25 | 0.1px |
| display-md | Section hero / mid-page headline | 35px | 300 | 1.25 | 0 |
| heading-xl | Main section heading | 28px | 300 | 1.25 | 0.1px |
| heading-lg | Card title / content block title | 22px | 300 | 1.25 | 0.1px |
| heading-md | Strong card label / compact title | 18px | 600 | 1 | 0 |
| body-md | Main paragraph body | 18px | 400 | 1.5 | 0.1px |
| body-strong | Inline emphasis / primary nav link | 18px | 500 | 1.25 | 0.4px |
| nav-main-caps | Desktop main navigation | 13px | 500 | 1.25 | 0.07em |
| nav-utility-caps | Utility navigation | 11.5px | 500 | 1.5 | 0.06em |
| body-sm | Card description / secondary body | 16px | 400 | 1.5 | 0 |
| stats-lg | Homepage statistic numerals | 52px | 700 | 1 | 0 |
| caption-md | Footer link / metadata / sub-nav | 14px | 400 | 1.5 | 0 |
| caption-sm | Badge label / smallest utility text | 12px | 500 | 1.5 | 0 |
| link-md | Inline body anchor | 18px | 400 | 1.5 | 0 |
| button-lg | Primary CTA button | 18px | 700 | 1.25 | 0.45px |
| button-md | Compact CTA button | 14px | 700 | 1.25 | 0.32px |

### Mobile Typography

| Token | Desktop | Mobile |
|---|---:|---:|
| display-xl | 54px | 38px |
| display-xl-strong | 54px | 38px |
| display-lg | 44px | 34px |
| display-md | 35px | 28px |
| heading-xl | 28px | 24px |
| heading-lg | 22px | 20px |
| body-md | 18px | 17px |
| body-sm | 16px | 16px |

Do not scale font sizes continuously with viewport width. Use defined breakpoints.

### Homepage Typography Direction

The homepage should avoid a generic AI/SaaS look by using a clear typographic division:

- Header, navigation, buttons, body copy, and product content: IBM Plex Sans.
- Hero headline: Newsreader SemiBold, large, direct, and centered when used over video.
- Trust statistics numerals: Newsreader Bold, large, brand blue, paired with IBM Plex Sans labels.
- Do not add additional decorative fonts.
- Do not change the entire site to a serif typeface. Serif is reserved for the Hero headline and large trust numerals only.
- Use uppercase navigation sparingly and precisely: small size, medium weight, positive letter spacing, and clear hover/active states.

### Typography Character Rules

The desired typographic feeling is:

```text
Functional clarity from IBM Plex Sans
Editorial premium emphasis from Newsreader Hero typography
Measured authority from large Newsreader numerals
```

Rules:

- Prefer fewer font styles over many expressive styles.
- Hero headlines should be short and strong; avoid long multi-clause marketing sentences.
- Navigation should feel engineered: uppercase, compact, evenly spaced, and not bold.
- Statistics should use strong size contrast: large serif numerals plus small IBM Plex Sans labels.
- Body copy must stay readable and functional; do not make body text light or decorative.

## 5. Layout System

### Container

```text
Max width: 1200px / 1280px depending on page type
Desktop horizontal padding: 32px
Tablet horizontal padding: 24px
Mobile horizontal padding: 16px
```

### Spacing Scale

```text
4px
8px
12px
16px
24px
32px
48px
64px
80px
96px
128px
```

Use consistent vertical rhythm. Avoid arbitrary spacing.

### First-Screen Rhythm

The homepage first screen should follow a restrained B2B medical-equipment rhythm:

```text
Sticky white header
Hero video banner
Soft gradient transition
Trust statistics band
Solutions content
```

Rules:

- The header is separate from the hero; do not overlay navigation on video by default.
- Hero height should be a controlled banner, not a full-screen takeover.
- Desktop hero height target: `clamp(560px, 70vh, 760px)`.
- Mobile hero height target: `clamp(460px, 62vh, 580px)`.
- Use a subtle bottom gradient from hero media into `surface.soft` when the next section is the trust statistics band.
- Avoid large empty white gaps between hero and statistics.
- Use a minimal scroll cue only when needed: small uppercase label plus a thin animated line, not a large arrow button.

### Border Radius

```text
Small controls: 6px
Cards: 8px
Large media blocks: 12px
Modal / large panels: 16px
```

Do not overuse pill-shaped UI unless it is a badge or filter chip.

## 6. Components

### Buttons

Primary button:

```text
Background: #0057B7
Text: #FFFFFF
Hover: #003F87
Radius: 6px or 8px
Typography: button-lg or button-md
```

Secondary button:

```text
Background: transparent
Border: #0057B7
Text: #0057B7
Hover background: #EAF3FF
```

Text button:

```text
Text: #0057B7
Hover: #003F87
Use for low-priority inline actions
```

### Cards

```text
Background: #FFFFFF
Border: 1px solid #DCE7F2
Radius: 8px
Shadow: subtle only
Hover: border or slight elevation
```

Avoid putting cards inside cards.

### Motion

Motion should support orientation and trust, not entertain.

Approved homepage motion:

- Video poster-to-video fade once the video is ready.
- Hero scroll cue with a subtle 1px line movement.
- Statistics count-up triggered once when the stats band enters the viewport.
- Hover transitions for navigation, buttons, cards, and links.

Motion rules:

- Do not loop statistic count-up animations.
- Respect `prefers-reduced-motion`.
- Keep durations in the `180ms-1200ms` range depending on interaction type.
- Avoid bounce, elastic, spinning, parallax-heavy, or gaming-style motion.
- Prevent layout shift during motion, especially with changing numerals.

### Forms

Form fields:

```text
Height: 44px or 48px
Border: #DCE7F2
Focus border: #0057B7
Radius: 6px
Label: caption-md or body-sm
```

Inquiry forms should be short:

```text
Name
Email
WhatsApp / Phone
Country
Product Interest
Message
```

### Product Cards

Each product card should include:

```text
Product image
Product category
Product title
Short summary
Primary CTA
Optional secondary link
```

Product cards should prioritize scanability and real product images.

### Tables

Use tables for product specs.

Mobile behavior:

- Convert to stacked rows
- Keep labels visible
- Avoid horizontal overflow where possible

## 7. Page-Level Design Rules

### Asset Source Rules

Approved source references for product and company materials:

```text
Current official website: https://www.guccidental.com/
Alibaba International storefront: https://guccident.en.alibaba.com/index.html
Client-provided product photos, catalogs, certificates, videos, and case materials
```

Usage principles:

- Use these sources to collect product images, model names, category information, factory proof, certificates, product videos, and application scenarios.
- The rebuilt website should not visually copy the old official site or Alibaba storefront layout.
- Alibaba images may be useful for product coverage, but they often feel marketplace-oriented; retouch, crop, and select them carefully for an international brand website.
- Prefer clean product images, real clinic/factory images, quality-control images, certificates, and installation/application photos.
- Avoid low-resolution, heavily watermarked, compressed, cluttered, or marketplace-style collage images.
- Do not use third-party customer, platform, or competitor assets unless the client confirms usage rights.
- Every final image should have a clear page purpose: trust building, product explanation, conversion support, or SEO content enrichment.

### Homepage

Homepage should clearly communicate:

```text
Dental Equipment Manufacturer
One-stop Dental Clinic Solution
Factory Direct Supply
OEM / ODM
CE / ISO
Exported to international markets
```

Recommended homepage modules:

```text
Hero
Trust bar
Featured product categories
Dental chair highlight
Factory / quality control
OEM / ODM solution
Case studies
Certificates
Resources
Final inquiry CTA
```

### Product Category Page

Category pages must work for both SEO and Google Ads.

Required sections:

```text
Category hero
Category intro
Product grid
Why choose Guccidental
Factory / QC proof
FAQ
Inquiry CTA
```

### Product Detail Page

Required sections:

```text
Product hero
Image gallery
Key selling points
Technical specifications
Applications
Features
Downloads
FAQ
Related products
Inquiry CTA
```

### Case Page

Case studies should include:

```text
Country / region
Clinic type
Products used
Customer need
Guccidental solution
Result
Images
CTA
```

## 8. Multilingual Design

The website will be English-first and machine-translated into other languages.

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

Design requirements:

- Text containers must allow longer translated strings.
- CTA buttons must handle longer labels.
- German, Portuguese, Russian, and Romanian copy may be significantly longer than English.
- Cards must not depend on fixed text height unless explicitly clamped.
- Navigation must support translated labels.
- Arabic must support RTL.

### Arabic RTL

Arabic pages must support:

```text
dir="rtl"
Mirrored layout where appropriate
Right-aligned text defaults
Icon direction adjustments
Form label alignment
Breadcrumb direction
Menu direction
```

Do not add RTL support after launch. It must be part of the first implementation.

## 9. Motion and Interaction

Allowed:

```text
Subtle hover states
Fade / slide reveal
Sticky product media
Small count-up statistics
Video hero with poster fallback
Light image parallax
Menu transitions
```

Use carefully:

```text
GSAP ScrollTrigger
Lenis smooth scrolling
Canvas
Three.js
WebGL
```

Avoid:

```text
Full-screen scroll hijacking
Heavy WebGL on SEO landing pages
Animations that hide HTML content
Large JavaScript-only content sections
Motion that hurts mobile usability
```

Respect `prefers-reduced-motion`.

## 10. Google Ads Landing Page Rules

Google Ads landing pages must be direct and fast.

Required:

```text
Keyword-matched H1
Clear product image
Visible CTA above the fold
Trust proof
Short inquiry form or CTA to form
Technical details
FAQ
Fast mobile loading
```

Avoid:

```text
Overly artistic hero copy
Hidden CTA
Heavy video-only first screen
Slow animation
Generic category content
```

## 11. Tailwind Token Direction

Recommended Tailwind color tokens:

```js
colors: {
  brand: {
    blue: "#0057B7",
    blueDark: "#003F87",
    blueLight: "#EAF3FF",
    green: "#7CBF00",
    greenLight: "#EEF8DD",
  },
  ink: {
    primary: "#111827",
    secondary: "#4B5563",
    muted: "#6B7280",
  },
  surface: {
    white: "#FFFFFF",
    soft: "#F6F9FC",
    border: "#DCE7F2",
  },
}
```

## 12. Design Quality Checklist

Before approval, each page must pass:

- Clear hierarchy
- Mobile text does not overflow
- CTA is visible and understandable
- Real product or factory visuals are used
- Layout remains clean in translated languages
- Arabic layout works in RTL
- Color use follows the palette
- Typography follows the scale
- No decorative clutter
- No unnecessary heavy animation

## 13. Cross-Section Visual Consistency Rules

**Why this exists:** as of 2026-07-07 the homepage has ~8 sections that were each designed somewhat independently (numbered cards, dark color-block cards, photo cards with gradient overlays, plain white cards, placeholder boxes). Individually each section is fine; stacked together they read as built by different people rather than one coherent brand. This addendum defines a small set of rules so every *future* section — and every section added going forward — follows one system instead of inventing its own.

Codex should treat this as binding for all new/edited homepage and page-detail sections, not just a one-time cleanup pass.

---

### UPDATE (2026-07-08): Manus reference alignment

The client has provided a Manus-generated reference build of the full homepage and asked for every section **except Hero** to be realigned toward it. This update supersedes specific earlier rules where they conflict — see inline superseded-notes on Sections 7 and 10 below. Two things from the Manus reference are explicitly **not** to be copied — see Section 14.

---

### 1. Numbering system (01 / 02 / 03…)

**Where it IS used:** exactly two contexts, and only these two:
- **Process/sequence content** — steps that happen in a defined order over time (e.g. "How it works": 01 Tell us your plan → 02 Receive a solution → 03 Ship and install).
- **Enumerated service/capability lists** where the count itself is part of the message (e.g. "One-stop Service": 01–07, because "everything in one package" is stronger when the reader can see it's seven distinct things).

**Where it is NOT used:** anywhere content is a *category selection*, not a sequence or count — e.g. Product Scope cards (Dental Chair / Cabinet / Imaging…), Solutions cards (New Clinic / Replace Old Chairs / Clinic Renovation), Case Study cards. These are parallel options, not steps 1-2-3, and numbering them implies a false order or ranking.

**Visual treatment when used:**
```css
.step-num, .badge-num{
  font-family:'Newsreader', Georgia, serif;
  font-weight:600;
  font-size:13px;
  letter-spacing:0.04em;
  color:var(--brand-blue);
}
```
Numbers are always two-digit (`01` not `1`), always the serif numeral font (matching the homepage trust-stat numerals and the entity-band stat bar — this is the one numeral treatment used sitewide), never inside a colored badge/circle unless the section is explicitly a "capability list" type (see One-stop Service precedent).

---

### 2. Card system — one shared spec, all card types inherit from it

Every card-shaped element on the site (Solutions cards, Product Scope cards, One-stop Service cards, Case cards, Download cards, Related-product cards, Step cards) must share these base values. A section may vary *content* inside a card, never the card shell mechanics:

```css
:root{
  --card-radius: 8px;
  --card-border: 1px solid var(--surface-border);
  --card-padding: 24px;
  --card-image-radius: 8px; /* image radius = 0 at the card edge it touches, 8px on the two outer corners it doesn't share with card padding — i.e. image sits flush at the top of the card, only the top two corners rounded to match the card's own radius */
}
.card-base{
  border-radius:var(--card-radius);
  border:var(--card-border);
  padding:var(--card-padding);
  background:var(--surface-white);
}
```

- **Radius is always 8px.** Not 6, not 12, not "rounded-xl" — one number, everywhere, including image containers inside cards.
- **One shadow rule, used sparingly:** default card = no shadow, just the 1px border. A card only gets `box-shadow` on `:hover` (subtle lift, `0 4px 12px rgba(17,24,39,0.06)`), never a resting-state shadow. Resting shadows are how templated builders make everything look "designed" by default; restraint here is part of what separates this from a template.
- **Image aspect ratios inside cards:** 4:3 for product/category cards, 16:10 for case-study cards, 1:1 for related-product thumbnails. Do not introduce a new ratio without checking this list first.

---

### 3. Dark / color-block cards — restricted to ONE section per page

The "Solutions" section's dark card-with-blueprint-texture treatment is good and should stay — but **it is now the site's one designated "hero-weight" card treatment.** Rule: **no more than one section per page may use a full dark/colored card background.** If a second section also goes dark, the effect that made Solutions feel special disappears — everything competing for the same visual weight cancels itself out.

Practical guidance for Codex when a new section is requested:
- Default to white card / white section background with the standard card-base spec above.
- Only reach for the dark/color-block treatment if the person picking sections explicitly says "make this the emphasis point of the page" — and if another section already has it, ask before adding a second one rather than assuming it's fine.

---

### 4. Photography treatment — consistency across every photo on the site

- **Every real photo (not placeholder) gets the same color grade**: slightly desaturated, cool/blue-leaning white balance. Implement as a shared CSS filter applied at the image-container level so it's centrally controlled:
```css
.photo-card img, .card-base img{
  filter: saturate(0.92) brightness(1.02) contrast(1.02);
}
```
This is what makes photos shot at different times, by different people, in different lighting, read as "one photographer, one shoot" instead of "stock photo grab-bag." Apply retroactively to any photo already placed (factory photo, product photos, case-study photos).
- **Gradient overlays on photos** (used in Product Scope cards) stay bottom-anchored only, covering at most the bottom 35–40% of the image, transitioning to transparent — never a full-image dark wash. This is already how Product Scope is implemented; carry the same rule forward to any future photo-with-text-label card.
- **No full-bleed photo backgrounds behind body text anywhere on the site** — this was tried and reverted for the entity-band; treat it as a settled decision, not something to revisit per-section.

---

### 5. Section background rhythm

Sections should alternate between exactly two background states, in sequence, with no more than two consecutive sections sharing the same one:
- **State A** — `var(--surface-white)`
- **State B** — `var(--surface-soft)` or the `.entity-zone` soft gradient wash

Do not introduce a third background treatment (e.g. a new tint, a new gradient direction) without checking whether State A or B already solves the problem. The alternating rhythm itself is a visual consistency signal — breaking it to introduce a one-off background undoes that signal even if the individual section looks fine in isolation.

---

---

### 7. Heading scale — SUPERSEDED 2026-07-08, see update below

~~The Solutions section's large, bold heading (~56–64px, with a pill-shaped eyebrow badge) is part of the same "single hero-weight section" allowance as its dark card treatment in Section 3 above.~~

**Superseded:** the Manus reference does not give Solutions an oversized heading — its heading matches every other section's standard size. The dark card + blueprint texture alone is enough to make Solutions read as the page's one emphasis point; an oversized heading on top of that was redundant escalation, not a necessary signal.

**New rule: every section's `<h2>` — including Solutions — uses the standard site-wide spec, no exceptions:**
```css
h2{
  font-weight:300;
  font-size:28px;
  line-height:1.25;
}
```
Roll Solutions' heading back down to this spec. Remove the pill-shaped eyebrow badge from Solutions too — eyebrow style is now plain small-caps text (`.eyebrow`) everywhere, no exceptions, matching the Manus reference.

### 9. Outer gutter scales with viewport — never a fixed pixel value at large widths

As of 2026-07-08, the homepage was reviewed at a wide browser window and the content edges felt like they were touching the viewport edges — no "breathing room." The cause: `.container` padding was a fixed pixel value that doesn't grow as the viewport grows past the container's max-width.

**Fix — use `clamp()` so the gutter scales proportionally instead of staying fixed:**
```css
.container{
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 80px);
}
```
This keeps normal laptop widths (~1440px) looking correctly proportioned (gutter stays modest) while wide desktop windows get a proportionally larger gutter instead of content pinned to the edges. Do not "fix" perceived tightness by bumping the fixed padding number up — that overcorrects at normal widths. Use the scaling gutter, not a bigger fixed one.

### 10. Heading COPY VOICE — SUPERSEDED 2026-07-08, see update below

~~Descriptive voice is the standard everywhere except Solutions; punchy two-fragment voice was flagged as unintended drift in One-stop Service, Case Studies, and FAQ.~~

**Superseded:** the punchy two-fragment headings in One-stop Service ("Seven services. One procurement path."), Case Studies ("Clinics equipped. Worldwide."), and FAQ ("Technical questions. Direct answers.") were not drift — they match the Manus reference build exactly. Keep them as-is; do not rewrite them back into single descriptive sentences.

**New rule: match the Manus reference build's copy per section, verbatim, for every section except Hero.** Where the Manus reference and the current live site disagree on wording, the Manus reference wins for this pass. If a future content update needs different wording, that's a separate content decision — not a "voice consistency" fix.

### 11. Regression check — Section 7/10 fixes must be re-verified, not assumed to stick

The One-stop Service section was corrected once already (single-column stacked header, standard heading size) and has since reverted to a two-column header with an oversized heading. When re-implementing a fix from this addendum, do not assume a prior fix is still in place just because it was confirmed once — re-check the live output against the current spec every time that section is touched again for any reason.


---

### 13. Section density — tighten vertical rhythm to match the Manus reference

The current build (as of 2026-07-08) uses noticeably more generous vertical spacing than the Manus reference — larger section padding, more gap between the title block and the content grid below it, wider gaps between cards. The Manus reference reads as tighter and more information-dense, which suits this site's audience (B2B buyers scanning quickly), not a slow editorial scroll.

**Tighten these values sitewide:**
```css
section{ padding: 64px 0; }              /* was 96px */
.section-head{ margin-bottom: 28px; }     /* was 40px */
.fitout-grid, .service-grid, .product-grid, .case-grid{ gap: 16px; } /* was 24px */
```
Apply this to every section below the Hero. Do not treat this as "more whitespace = more premium" — on this reference, tighter is the correct read given the density the Manus build demonstrates. Combine with Section 9's `clamp()` gutter fix — that one controls horizontal breathing room at wide viewports, this one controls vertical density; both apply together, they don't conflict.

### 14. Do NOT downgrade real assets to match a reference that used placeholders

The Manus reference is a static mockup and used placeholder blocks in places where the live site already has real, working assets. **Do not replace a real asset with a placeholder just to visually match the reference:**
- **Factory & Quality section:** the live site has a real embedded video (Guccidental's own YouTube channel, actual production-floor footage). The Manus reference shows two static placeholder blocks here instead. Keep the real video — it's already a stronger asset than what the reference shows.
- Apply this principle generally going forward: if a future reference mockup shows a placeholder where the live site has real content, keep the real content and only adopt the reference's *layout/spacing*, not its *content gaps*.

### 15. Stat-numeral typography — flag, don't silently override

The Manus reference uses a bold sans-serif for the large trust-stat numerals (130+ / 36,000+ / 100,000+ / 150+). The live site currently uses the Newsreader serif font for these numerals — this was a deliberate typographic decision documented in the client's own `DESIGN_SYSTEM.md`, not something introduced by this addendum. **Do not switch the numeral font to match the Manus reference without explicit confirmation from the client first** — this is a brand-tone decision (serif = a touch of premium/editorial distinctiveness vs. sans-serif = matches the rest of the UI more uniformly), not a visual-consistency bug. If asked to proceed, flag that this changes an established DESIGN_SYSTEM.md token and get a one-line confirmation before implementing.

---

### 17. Site-wide typeface system — FINALIZED 2026-07-10

This resolves and confirms the flag raised in Section 15: the client has now made a final, explicit decision on typography, expanding it into a full two-typeface system. This section is the source of truth going forward — if any other part of this addendum or `DESIGN_SYSTEM.md` conflicts with the values below, this section wins.

**Base UI font — IBM Plex Sans**, replacing Inter everywhere except the two exceptions below:
```css
body{
  font-family:'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
}
```
Applies to: all navigation, buttons, body copy, card titles/descriptions, form fields, footer text, breadcrumbs — every UI text element sitewide, on every page template (homepage, product detail, case study detail, any future page), not just the homepage.

**Exception 1 — Hero headline.** The main Hero heading (e.g. "Better Build Your Dream Clinic") stays in Newsreader serif. This is intentional: the serif Hero headline is meant to contrast against the sans-serif UI everywhere else, giving the Hero an editorial, premium feel. Do not change this to Plex Sans or any other sans-serif, on this or any future page that reuses the Hero component.

**Exception 2 — Large stat numerals.** Any large-scale numeral display (the homepage trust-stat band: 130+/36,000+/100,000+/150+, the entity-band stat bar numbers, the Factory & Quality QC numbers, and any future instance of this "big numeral" pattern) stays in Newsreader serif, per Section 15's original reasoning — now confirmed, not just flagged.

```css
:root{
  --font-body: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
  --font-display-serif: 'Newsreader', Georgia, serif;
}
h1.hero-heading,
.stat-value, .trust-stat-num, .qc-stat-num /* or whatever the actual numeral classes are named in the codebase */{
  font-family: var(--font-display-serif);
}
```

**Rule of thumb for any future component:** if it's a large number meant to convey scale/credibility (a stat, a count, a big metric), or it's the Hero's main headline — Newsreader. Everything else — IBM Plex Sans. Don't extend Newsreader to section `<h2>` headings, body copy, card titles, or button text; the serif treatment stays rare and reserved for these two specific uses, the same way brand-green is reserved for rare accent use (Section 3's "hero-weight" logic and this font logic follow the same restraint principle — a treatment stays meaningful because it stays scarce).

---

### 18. Before adding or re-touching any homepage section, Codex should check:

1. Does this need a number? → Only if it's a sequence or an enumerated capability list (Section 1 above).
2. Does this need a dark/color card? → Only if no other section on the page already has one (Section 3).
3. Are all cards using the shared 8px radius / border / padding spec? (Section 2).
4. Do all photos have the shared color-grade filter applied? (Section 4).
5. Does the section's background alternate correctly from the section above it? (Section 5).
6. Is every heading — including Solutions — at the standard 28px/weight-300 spec? (Section 7, superseded 2026-07-08: no section gets an oversized heading anymore.)
7. Does this section's copy match the Manus reference verbatim? (Section 10, superseded 2026-07-08: match the reference per-section, don't enforce a blanket voice rule.)
8. Does the outer gutter use `clamp()` scaling, not a fixed pixel padding? (Section 9).
9. Does vertical section padding/gaps match the tightened Section 13 values, not the older, more generous ones?
10. If this section has a real asset (photo/video) already in place, does the change accidentally replace it with a placeholder just to match a reference mockup? (Section 14 — don't let that happen.)
11. Does all UI text use IBM Plex Sans, with Newsreader reserved only for the Hero headline and large stat numerals? (Section 17 — do not let Newsreader creep into regular headings/body copy, and do not let Plex Sans creep into the Hero headline or stat numerals.)
11. If this section was fixed in a prior pass, has the fix actually persisted in the current live output? Re-verify, don't assume (Section 11).

If any answer requires deviating from this addendum, flag it back to the person before implementing rather than making a new one-off visual decision silently.
