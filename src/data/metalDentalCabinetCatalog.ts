import { gA3 } from './metalDentalCabinetDetails';
import type { HighEndDentalChairDetail, ProductImage } from './highEndDentalChairDetails';
import models from './metalDentalCabinetModels.json';

export type MetalCabinetDetail = HighEndDentalChairDetail & { caseImage?: ProductImage };
const forModel = <T>(value: T, model: string): T => JSON.parse(JSON.stringify(value).replaceAll('G-A3', model));
export const metalDentalCabinets: Record<string, MetalCabinetDetail> = {
  'g-a3': { ...gA3, caseImage: { src: '/images/products/dental-cabinet/g-a3/case-clinic-reference.png', width: 1030, height: 946, label: 'G-A3 clinic reference', alt: 'G-A3 mobile dental cabinet beside a dental chair' } },
  ...Object.fromEntries(models.map(({ caseImage, ...model }) => [model.slug, {
    ...gA3,
    ...model,
    features: forModel(gA3.features, model.model),
    featureHeading: gA3.featureHeading,
    colors: gA3.colors,
    colorIntroduction: forModel(gA3.colorIntroduction, model.model),
    resources: gA3.resources,
    caseImage: caseImage ?? undefined,
    relatedProducts: [],
  }])),
};
