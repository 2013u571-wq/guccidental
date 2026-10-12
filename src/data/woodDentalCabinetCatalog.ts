import type { HighEndDentalChairDetail } from './highEndDentalChairDetails';
import models from './woodDentalCabinetModels.json';

export const woodDentalCabinets: Record<string, HighEndDentalChairDetail> = Object.fromEntries(
  models.map(model => [model.slug, model as HighEndDentalChairDetail]),
);
