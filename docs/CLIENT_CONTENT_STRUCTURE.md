# Guccidental Client Content Structure

## English page expansion — 2026-09-07

- Created all 38 active English URLs from the pending-URL workbook. This supersedes the missing-page status in the earlier snapshot below.
- New pages cover Solutions and fit-out subpages, nine product subcategories, Resources, About, News, Cases indexes and three contact/service pages.
- English page content is maintained in `src/data/englishPages.ts` and rendered by `src/pages/en/[...page].astro` using the existing site header, footer, buttons and typography.
- English routes now total 103; the full static build totals 616 pages. Existing routes remain present.
- Download pages use existing local PDFs. New contact actions open email or WhatsApp; no backend form integration was added.
- News has an honest empty state. Product subcategories provide selection guidance, without inventing model specifications. Cases link to existing case/product materials.
- New pages advertise only English hreflang. Switching to another language from these pages opens that language's homepage.
- The historical Metal and Solutions Dealer paths remain excluded. The exported pending workbook is a pre-implementation snapshot.
- Local implementation and build verified; remote deployment is not part of this update.

Source file:

```text
/Users/gaosong/Desktop/古旗医疗网站重构/内容结构.pdf
```

The PDF is an image-based mind map. This document converts the client-provided structure into a usable website information architecture.

## Metal Cabinet 批量接入更新 — 2026-09-07

本次在 G-A3 基础上新增 36 个型号，Metal Cabinet 共 37 个产品详情。保留 `/en/products/dental-cabinet/metal-dental-cabinet/{model-slug}/` 层级；每个详情生成 9 个语言前缀，非英文仍为英文回退。

- Features、Color and material 与 Product resources 统一沿用 G-A3 的共享内容；涉及型号的文案按当前产品替换。
- 共导入 206 张新增主图。TJ-SC04 缺少主图，首屏图片位置暂留空。
- G-A111、G-A112、G-A9、MQ-Y032 使用各自提供的 Case 图片；其他新增型号的 Case 图片位留空，仅展示产品相关文字。
- 客户资料中未确认的规格保持待确认；没有将 G-A3 的尺寸、抽屉数等独有参数复制为其他型号的已确认规格。
- 之前的 Excel 是批量接入前快照，不包含本次新增型号。最新型号映射如下，资料缺口记录于 `METAL_CABINET_IMPORT.json`。

| 型号 | 新增主图数 | Case 图片 | 实际英文详情路径 |
|---|---:|---|---|
| G-A111 | 7 | 已提供 | /en/products/dental-cabinet/metal-dental-cabinet/g-a111/ |
| G-A112 | 2 | 已提供 | /en/products/dental-cabinet/metal-dental-cabinet/g-a112/ |
| G-A113 | 5 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-a113/ |
| G-A114 | 3 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-a114/ |
| G-A115 | 6 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-a115/ |
| G-A9 | 4 | 已提供 | /en/products/dental-cabinet/metal-dental-cabinet/g-a9/ |
| G-Y002A | 8 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-y002a/ |
| G-Y003C | 7 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-y003c/ |
| G-Y006A | 5 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-y006a/ |
| G-Y006D | 6 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-y006d/ |
| G-Y007A | 5 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-y007a/ |
| G-Y007C | 5 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-y007c/ |
| G-Y009 | 2 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-y009/ |
| G-Y009D | 9 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-y009d/ |
| G-Y010C | 9 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-y010c/ |
| G-Y013 | 5 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-y013/ |
| G-Y018A | 6 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-y018a/ |
| G-Y024A | 8 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-y024a/ |
| G-Y028A | 6 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-y028a/ |
| G-Y107B | 10 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/g-y107b/ |
| MQ-Y001A | 9 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/mq-y001a/ |
| MQ-Y009B | 8 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/mq-y009b/ |
| MQ-Y01 | 3 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/mq-y01/ |
| MQ-Y013B | 4 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/mq-y013b/ |
| MQ-Y023 | 8 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/mq-y023/ |
| MQ-Y024 | 7 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/mq-y024/ |
| MQ-Y032 | 4 | 已提供 | /en/products/dental-cabinet/metal-dental-cabinet/mq-y032/ |
| TJ-SC01 | 4 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/tj-sc01/ |
| TJ-SC02 | 10 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/tj-sc02/ |
| TJ-SC03 | 9 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/tj-sc03/ |
| TJ-SC04 | 0 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/tj-sc04/ |
| TJ-XY08 | 1 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/tj-xy08/ |
| TJ-XY09 | 2 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/tj-xy09/ |
| XY07 | 7 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/xy07/ |
| XY08 | 9 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/xy08/ |
| Y031C | 3 | 留空 | /en/products/dental-cabinet/metal-dental-cabinet/y031c/ |

## Current implementation and content progress — 2026-09-07

本节以当前 `src/pages`、`src/data/products.ts`、详情数据、导航和最新 `dist` 为准。后文历史规划不代表页面已经上线。

- **Dental Chair 本阶段产品内容：已完成（用户确认）。** 当前型号目录为 43 项：Economic 10、Mid-range 16、High-end 17；已有独立详情页 40 个，分别为 7、16、17 个。
- Economic 的 H3、BZ636、TJ-SA1 目前只在目录中展示，没有 `detailSlug` 或独立详情页。本阶段完成状态不把这 3 项记作已有详情；如后续增加，另列新增内容范围。
- Dental Chair 层级：`Products > Dental Chair > Economic / Mid-range / High-end > Product`。实际路径使用 `/en/products/dental-chair/{tier}/{product}/`。
- 原始规划曾列出 48 个型号；当前目录已合并 SL8500 部分命名，且没有 YD-S6 / YD-S6 Implant 项。下文型号清单已同步为当前 43 项。
- **Dental Cabinet 正在制作。** 已完成 `Dental Cabinet > Metal Cabinet > G-A3`，Metal 分类的实际路径为 `/en/products/dental-cabinet/metal-dental-cabinet/`，产品路径为其下 `g-a3/`。原规划 `/metal/` 尚未生成，不是现有分类路径。
- G-A3 沿用 Dental Chair 详情排版；颜色区为 6 张常用色卡、可展开的 84 个 PDF 色号和独立色卡 PDF 下载。英文说明与下载入口居中。资料下载区只保留客户 `07_资料下载_PDF` 的两份目录 PDF；Case 为左右结构：左侧展示客户最新提供的场景图，右侧合并原两个案例的标题和文案；手机端上下排列。
- 其他 11 个产品大类已有分类框架，尚未接入独立产品详情。Wood Cabinet 及其他规划子类不应标为已完成。
- 本次构建共生成 **578 个页面 URL**：英文 65 个，其余 8 个语种各 64 个，加根路径跳转 1 个。肯尼亚案例仅生成英文页。
- 9 个语言前缀为 `en / es / fr / pt / de / it / ar / ru / ro`。非英文路径目前展示英文回退内容，不能视作已完成翻译。
- 当前分支尚未生成 Solutions、Resources、About、News、Cases 栏目首页和部分服务页，虽然导航或旧规划包含其 URL。唯一已生成的独立案例是 `/en/cases/kenya-clinic-fitout/`，Contact 首页已生成。
- 当前还有 3 个旧版 Dental Chair 通用详情路径：`/en/products/dental-chair/h5/`、`/en/products/dental-chair/p6/`、`/en/products/dental-chair/g5-implant/`。它们不是新增型号，后续应统一至含档次的完整详情路径。
- URL 清单采用代码配置域名 `https://design.guccidental.com`，同时提供 `http://localhost:4385` 本地预览地址；本次只验证项目构建与文件，未验证远程部署。

交付清单按「总览、英文层级、全部已生成 URL、待建与历史规划、Dental Chair 型号、已链接 PDF」组织。页面 URL 不把图片、脚本、锚点或询盘参数重复计为独立页面。规划路径与已有页面分别标记，避免把缺页当成可访问页面。

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

Historical URL plan (these pages are not generated by the current checkout):

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
  The planned destination titles are `New Clinic`, `Replace Old Chairs`, `Clinic Renovation`; destination pages are absent from the current build.
- URL/title mismatch to be aware of: `Replace Old Chairs` navigation targets
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
SL8500 Standard
SL8500 without box
B100L Ultra
B100L Premium
B100L Galaxy
M100(L)
M200(L)
V3 Implant
V3 Luxury
V3-Black
A6800
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

### 4.4 Current model-to-page mapping

本阶段内容已完成；独立详情状态以代码中的 `detailSlug` 为准。无 URL 的目录项不构造猜测链接。

| 档次 | 型号 | 当前详情路径 | 页面状态 |
|---|---|---|---|
| economic | H3 | — | 仅目录项，无独立详情 |
| economic | H5 | /en/products/dental-chair/economic/h5/ | 独立详情已完成 |
| economic | QL2024 | /en/products/dental-chair/economic/ql2024/ | 独立详情已完成 |
| economic | QL2028 (2019) | /en/products/dental-chair/economic/ql2028-2019/ | 独立详情已完成 |
| economic | QL2028 I | /en/products/dental-chair/economic/ql2028-i/ | 独立详情已完成 |
| economic | BZ636 | — | 仅目录项，无独立详情 |
| economic | B6 | /en/products/dental-chair/economic/b6/ | 独立详情已完成 |
| economic | TJ2028 Comfort | /en/products/dental-chair/economic/tj2028-comfort/ | 独立详情已完成 |
| economic | TJ2688 A1 | /en/products/dental-chair/economic/tj2688-a1/ | 独立详情已完成 |
| economic | TJ-SA1 | — | 仅目录项，无独立详情 |
| mid-range | P2 | /en/products/dental-chair/mid-range/p2/ | 独立详情已完成 |
| mid-range | P3 | /en/products/dental-chair/mid-range/p3/ | 独立详情已完成 |
| mid-range | P6 | /en/products/dental-chair/mid-range/p6/ | 独立详情已完成 |
| mid-range | G3 | /en/products/dental-chair/mid-range/g3/ | 独立详情已完成 |
| mid-range | G7 | /en/products/dental-chair/mid-range/g7/ | 独立详情已完成 |
| mid-range | S610 | /en/products/dental-chair/mid-range/s610/ | 独立详情已完成 |
| mid-range | S620 | /en/products/dental-chair/mid-range/s620/ | 独立详情已完成 |
| mid-range | S630 | /en/products/dental-chair/mid-range/s630/ | 独立详情已完成 |
| mid-range | S640 | /en/products/dental-chair/mid-range/s640/ | 独立详情已完成 |
| mid-range | S650 | /en/products/dental-chair/mid-range/s650/ | 独立详情已完成 |
| mid-range | S660 | /en/products/dental-chair/mid-range/s660/ | 独立详情已完成 |
| mid-range | S690 | /en/products/dental-chair/mid-range/s690/ | 独立详情已完成 |
| mid-range | TJ2028I Elite | /en/products/dental-chair/mid-range/tj2028i-elite/ | 独立详情已完成 |
| mid-range | TJ2028II Prime | /en/products/dental-chair/mid-range/tj2028ii-prime/ | 独立详情已完成 |
| mid-range | QL-2028IV | /en/products/dental-chair/mid-range/ql-2028iv/ | 独立详情已完成 |
| mid-range | V2 Pro | /en/products/dental-chair/mid-range/v2-pro/ | 独立详情已完成 |
| high-end | G1 | /en/products/dental-chair/high-end/g1/ | 独立详情已完成 |
| high-end | G5 | /en/products/dental-chair/high-end/g5/ | 独立详情已完成 |
| high-end | G5 Implant | /en/products/dental-chair/high-end/g5-implant/ | 独立详情已完成 |
| high-end | S670 | /en/products/dental-chair/high-end/s670/ | 独立详情已完成 |
| high-end | S680 | /en/products/dental-chair/high-end/s680/ | 独立详情已完成 |
| high-end | SL8500 Standard | /en/products/dental-chair/high-end/sl8500-standard/ | 独立详情已完成 |
| high-end | SL8500 without box | /en/products/dental-chair/high-end/sl8500-without-box/ | 独立详情已完成 |
| high-end | B100L Ultra | /en/products/dental-chair/high-end/b100-ultra/ | 独立详情已完成 |
| high-end | B100L Premium | /en/products/dental-chair/high-end/b100l-premium/ | 独立详情已完成 |
| high-end | B100L Galaxy | /en/products/dental-chair/high-end/b100l-galaxy/ | 独立详情已完成 |
| high-end | M100(L) | /en/products/dental-chair/high-end/m100/ | 独立详情已完成 |
| high-end | M200(L) | /en/products/dental-chair/high-end/m200/ | 独立详情已完成 |
| high-end | V3 Implant | /en/products/dental-chair/high-end/v3-implant/ | 独立详情已完成 |
| high-end | V3 Luxury | /en/products/dental-chair/high-end/v3-luxury/ | 独立详情已完成 |
| high-end | V3-Black | /en/products/dental-chair/high-end/v3-black/ | 独立详情已完成 |
| high-end | A6800 | /en/products/dental-chair/high-end/a6800/ | 独立详情已完成 |
| high-end | TJ-70 | /en/products/dental-chair/high-end/tj-70/ | 独立详情已完成 |

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

Current implemented Metal Cabinet URLs (2026-09-07):

```text
/en/products/dental-cabinet/metal-dental-cabinet/
/en/products/dental-cabinet/metal-dental-cabinet/g-a3/
```

`/metal/` is the historical proposed path, not a generated page or configured redirect. Wood Cabinet remains planned.

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

### Current next steps (2026-09-07)

1. Dental Chair：本阶段内容已完成；保留型号映射和实际路由记录。旧通用详情路径的整理另列技术收尾。
2. Dental Cabinet：G-A3 已完成；继续 Metal Cabinet 后续型号，再推进 Wood Cabinet。
3. 其余产品类目：已有一级分类框架，按客户提供资料接入子分类与详情。
4. Solutions / Resources / About / Cases 栏目与服务页：按 URL 清单逐项补齐，核对现有导航入口。
5. 全站多语言：路由已准备，翻译和语言验收尚未完成。

The following phases are the original planning reference, not a current completion checklist.

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
