import { gA3 } from './metalDentalCabinetDetails';
import type { HighEndDentalChairDetail, ProductImage } from './highEndDentalChairDetails';
import models from './metalDentalCabinetModels.json';

export type MetalCabinetDetail = HighEndDentalChairDetail & { caseImage?: ProductImage };
const forModel = <T>(value: T, model: string): T => JSON.parse(JSON.stringify(value).replaceAll('G-A3', model));
export const metalDentalCabinets: Record<string, MetalCabinetDetail> = {
  'g-a3': { ...gA3, caseImage: { src: 'https://media.guccidental.com/images/products/dental-cabinet/g-a3/case-clinic-reference.png', width: 1030, height: 946, label: 'G-A3 clinic reference', alt: 'G-A3 mobile dental cabinet beside a dental chair' } },
  ...Object.fromEntries(models.map(({ caseImage, ...model }) => [model.slug, {
    ...gA3,
    ...model,
    // Preview the newly supplied asset locally until the media deployment syncs it to R2.
    gallery: model.gallery.map(image => ({
      ...image,
      src: import.meta.env.DEV && ['/g-a114/product-size-2600.webp', '/g-a115/cabinet-drawer-detail.webp', '/mq-y024/product-size-2200.webp', '/tj-sc04/trolley-additional.webp', ...[1, 2].map(number => `/y031c/gallery-${number}-replacement.webp`), ...[1, 6, 7].map(number => `/tj-sc03/gallery-${number}-no-logo.webp`), ...[1, 2, 3, 4, 5].map(number => `/tj-sc02/gallery-${number}-replacement.webp`), ...[1, 2, 3, 4].map(number => `/tj-sc01/gallery-${number}-no-logo.webp`), ...[2, 3, 4, 6, 7].map(number => `/mq-y001a/gallery-${number}-replacement.webp`)].some(path => image.src.endsWith(path))
        ? image.src.replace('https://media.guccidental.com', '')
        : image.src,
    })),
    features: forModel(gA3.features, model.model),
    featureHeading: gA3.featureHeading,
    colors: gA3.colors,
    colorIntroduction: forModel(gA3.colorIntroduction, model.model),
    resources: gA3.resources,
    caseImage: caseImage ?? undefined,
    relatedProducts: [],
  }])),
};
