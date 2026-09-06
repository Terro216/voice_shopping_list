export type Unit = 'pcs' | 'g' | 'kg' | 'ml' | 'l' | 'pack';
export const UNITS: Unit[];
export function isValidUnit(unit: unknown): unit is Unit | null;
export function roundQuantity(value: number): number;
export function quantityLimit(unit?: Unit | null): number;
export function isValidQuantity(value: unknown, unit?: Unit | null): value is number;
export function convertQuantity(value: number, from?: Unit | null, to?: Unit | null): number | null;
export function quantityStep(unit?: Unit | null): number;
