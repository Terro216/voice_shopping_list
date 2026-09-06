import type { Unit } from '../../shared/quantity.js';

const labels: Record<'ru' | 'en', Record<Unit, string>> = {
  ru: { pcs: 'шт.', g: 'г', kg: 'кг', ml: 'мл', l: 'л', pack: 'уп.' },
  en: { pcs: 'pcs', g: 'g', kg: 'kg', ml: 'ml', l: 'l', pack: 'packs' },
};
export const unitLabel = (unit: Unit, lang: 'ru' | 'en') => labels[lang][unit];
export const formatQuantity = (item: { count: number; unit?: Unit | null }, lang: 'ru' | 'en') => {
  const number = new Intl.NumberFormat(lang, { maximumFractionDigits: 3 }).format(item.count);
  return item.unit ? `${number} ${unitLabel(item.unit, lang)}` : `×${number}`;
};
