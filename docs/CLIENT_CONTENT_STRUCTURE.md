# Guccidental Client Content Structure

Source file:

```text
/Users/gaosong/Desktop/古旗医疗网站重构/内容结构.pdf
```

The PDF is an image-based mind map. This document converts the client-provided structure into a usable website information architecture.

## 1. Top-Level Navigation

```text
Solutions
Products
Resources
About Us
Cases
Contact Us
```

Recommended English navigation labels:

| Chinese | Recommended English |
|---|---|
| 解决方案 | Solutions |
| 产品 | Products |
| 资源 | Resources |
| 关于我们 | About Us |
| 案例 | Cases |
| 联系我们 | Contact Us |

## 2. Solutions

```text
Solutions
- New Clinic
- Replace Old Chairs
- Clinic Renovation
- Building Materials & Furniture
  - Decoration
    - Flooring
    - Ceiling
    - Doors & Windows
  - Furniture
    - Reception Desk
    - Sofa
    - Chair
```

Actual URL structure (as implemented):

```text
/en/solutions/
/en/solutions/new-clinic/
/en/solutions/clinic-upgrade/
/en/solutions/clinic-renovation/
/en/solutions/building-materials-furniture/
```

Notes:

- The homepage Solutions section renders three cards with eyebrow labels
  PLANNING / UPGRADE / RENOVATION. These are visual labels only.
  The real page titles are `New Clinic`, `Replace Old Chairs`, `Clinic Renovation`.
- URL/title mismatch to be aware of: `Replace Old Chairs` lives at
  `/en/solutions/clinic-upgrade/`, not `/replace-old-chairs/`.
- `Building Materials & Furniture` has no page yet. Its nav entry currently
  points to `/en/solutions/` as a temporary placeholder.
- `Dealer` has been removed from Solutions. Distributor-facing content lives
  under `Contact Us > Become a Dealer`, which serves a different audience
  (distributors, not clinics).

## 3. Products

```text
Products
- Dental Chair
- Dental Cabinet
- Ultrasonic Scaler & Light Cure
- Dental Handpiece
- Air Equipment
- Imaging System
- Surgical Instruments
- Whitening Machine
- Endo Motor
- Orthodontics
- Disposable Consumables
- Teaching Model
- Laboratory
```

Recommended URL structure:

```text
/en/products/
/en/products/dental-chair/
/en/products/dental-cabinet/
/en/products/ultrasonic-scaler-light-cure/
/en/products/dental-handpiece/
/en/products/air-equipment/
/en/products/imaging-system/
/en/products/surgical-instruments/
/en/products/whitening-machine/
/en/products/endo-motor/
/en/products/orthodontics/
/en/products/disposable-consumables/
/en/products/teaching-model/
/en/products/laboratory/
```

## 4. Dental Chair Product Structure

The client separates dental chairs into three market tiers.

```text
Dental Chair
- Economic
- Mid-range
- High-end
```

### 4.1 Economic Dental Chairs

```text
H3
H5
QL2024
QL2028 (2019)
QL2028 I
BZ636
B6
TJ2028 Comfort
TJ2688 A1
TJ-SA1
```

### 4.2 Mid-Range Dental Chairs

```text
P2
P3
P6
G3
G7
QL-2028IV
TJ2028I Elite
TJ2028II Prime
V2 Pro
S610
S620
S630
S640
S650
S660
S690
```

### 4.3 High-End Dental Chairs

```text
G1
G5
G5 Implant
S670
S680
SL8500 without box A
SL8500 without box B
SL8500 Standard A
SL8500 Standard B
SL8500 B
B100L Premium
B100L Ultra
B100L Galaxy
M100(L)
M200(L)
V3 Implant
V3 Luxury
V3-Black
A6800
YD-S6
YD-S6 Implant
TJ-70
```

CMS recommendation:

- Store the product model exactly as provided.
- Do not translate product model names.
- Add a `chairTier` field for dental chair products:

```text
economic
mid-range
high-end
```

Frontend recommendation:

- Dental chair category page should support tier tabs or filters.
- Product cards should show model, tier, image, short selling point, and inquiry CTA.

## 5. Dental Cabinet

```text
Dental Cabinet
- Metal
- Wood
```

Recommended URL structure:

```text
/en/products/dental-cabinet/metal/
/en/products/dental-cabinet/wood/
```

## 6. Ultrasonic Scaler & Light Cure

```text
Ultrasonic Scaler & Light Cure
- Ultrasonic Scaler
- Light Cure
```

Recommended URL structure:

```text
/en/products/ultrasonic-scaler-light-cure/ultrasonic-scaler/
/en/products/ultrasonic-scaler-light-cure/light-cure/
```

## 7. Air Equipment

```text
Air Equipment
- Air Compressor
- Vacuum Pump
```

Recommended URL structure:

```text
/en/products/air-equipment/air-compressor/
/en/products/air-equipment/vacuum-pump/
```

## 8. Imaging System

```text
Imaging System
- X-ray
- CBCT
- Intraoral Scanner
- Intraoral Camera / Endoscope
```

Recommended URL structure:

```text
/en/products/imaging-system/x-ray/
/en/products/imaging-system/cbct/
/en/products/imaging-system/intraoral-scanner/
/en/products/imaging-system/intraoral-camera/
```

## 9. Resources

```text
Resources
- Design Solution
- Product Catalog
- Product Color Selection
- Technical Support
```

Recommended URL structure:

```text
/en/resources/
/en/resources/design-solution/
/en/resources/catalogs/
/en/resources/color-selection/
/en/resources/technical-support/
```

Notes:

- Product catalog and technical support pages can include downloadable files.
- Color selection may need visual swatches and product configuration images.
- Design solution can overlap with `Solutions`; define it as downloadable / educational resource content.

## 10. About Us

```text
About Us
- About Us
- Why Choose Us
- Visit Us
- News & Events
```

Recommended URL structure:

```text
/en/about/
/en/about/why-choose-us/
/en/about/visit-us/
/en/news/
```

Notes:

- `Visit Us` should include factory, showroom, exhibition, or company visit content if available.
- `News & Events` should be handled by the article system.

## 11. Cases

```text
Cases
- Clinic Cases
- Dental Chair Cases
- Dental Cabinet Cases
```

Recommended URL structure:

```text
/en/cases/
/en/cases/clinic/
/en/cases/dental-chair/
/en/cases/dental-cabinet/
```

CMS recommendation:

- Use one `caseStudy` content type.
- Add `caseType`:

```text
clinic
dental-chair
dental-cabinet
```

## 12. Contact Us

```text
Contact Us
- Contact Us
- Customer Service
- Become a Dealer
- Contact Local Technical Engineer
```

Recommended URL structure:

```text
/en/contact/
/en/contact/customer-service/
/en/contact/become-a-dealer/
/en/contact/local-technical-engineer/
```

Notes:

- `Contact Us` should be the general inquiry page.
- `Customer Service` should support after-sales and support requests.
- `Become a Dealer` should be a distributor application page.
- `Contact Local Technical Engineer` may require region selection if Guccidental has local service partners.

## 13. Content Model Impact

This client structure requires the following content model updates:

- Add `solution` pages or page templates.
- Add product category hierarchy exactly matching the client structure.
- Add `chairTier` for dental chair products.
- Add case type classification.
- Add resource type classification for catalogs, color selection, design resources, and technical support.
- Add service/contact page types for customer service, dealer application, and local technical engineer.
- Add `buildingMaterialsFurniture` as a solution subtype beneath `New Clinic` and `Clinic Renovation`.

## 14. Implementation Priority

Phase 1:

```text
Home
Products
Dental Chair
Main product detail pages
Solutions
Resources
About Us
Contact Us
```

Phase 2:

```text
Cases
Building Materials & Furniture solution pages
Full resource library
All product subcategories
Dealer application flow
Customer service flow
Local technical engineer flow
```

Phase 3:

```text
All language translations
Advanced product filters
Wufoo inquiry statistics dashboard
SEO landing pages by product category and market
```
