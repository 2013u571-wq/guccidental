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

### Final Font Stack

```css
font-family: Inter, "Helvetica Neue", Arial, sans-serif;
```

Use `Inter` as the primary brand typeface across the website.

Fallbacks:

- `Helvetica Neue`: system fallback only
- `Arial`: universal fallback
- `sans-serif`: final fallback

Do not use `PlayStation SST`. The provided screenshot is only a reference for typography hierarchy and spacing.

### Secondary Display Typeface Exception

The website may use a secondary display serif only for large, non-body emphasis numerals, especially homepage trust statistics.

Approved secondary display stack:

```css
font-family: Newsreader, Georgia, "Times New Roman", serif;
```

Usage rules:

- Use Newsreader only for large statistic numerals such as `130+`, `36,000+`, `100,000+`, and `150+`.
- Do not use Newsreader for navigation, body copy, buttons, form labels, product cards, or paragraphs.
- Do not use Newsreader for the homepage hero headline; the hero should remain Inter for a more clinical, engineering-led tone.
- Pair serif numerals with Inter labels underneath to keep the interface professional and readable.
- This exception exists to add controlled typographic character without making the site feel editorial or decorative.

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
| display-xl | Homepage hero headline | 54px | 300 | 1.25 | -0.1px |
| display-xl-strong | Homepage video hero headline | 54px | 600 | 1.18 | -0.018em |
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
| stats-lg | Homepage statistic numerals | 52px | 700 | 1 | -0.2px |
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

- Header, navigation, buttons, body copy, and product content: Inter.
- Hero headline: Inter SemiBold, large, direct, and centered when used over video.
- Trust statistics numerals: Newsreader Bold, large, brand blue, paired with Inter labels.
- Do not add additional decorative fonts.
- Avoid using Light 300 for the video hero if the headline loses authority over a busy background.
- Do not change the entire site to a serif typeface. Serif is reserved for large trust numerals only.
- Use uppercase navigation sparingly and precisely: small size, medium weight, positive letter spacing, and clear hover/active states.

### Typography Character Rules

The desired typographic feeling is:

```text
Clinical precision from Inter
Measured authority from SemiBold display headlines
Editorial trust only in large Newsreader numerals
```

Rules:

- Prefer fewer font styles over many expressive styles.
- Hero headlines should be short and strong; avoid long multi-clause marketing sentences.
- Navigation should feel engineered: uppercase, compact, evenly spaced, and not bold.
- Statistics should use strong size contrast: large serif numerals plus small Inter labels.
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
