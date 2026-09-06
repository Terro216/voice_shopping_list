export const UNITS = ["pcs", "g", "kg", "ml", "l", "pack"];
export const isValidUnit = (unit) => unit === null || UNITS.includes(unit);
export const roundQuantity = (value) => Math.round(value * 1000) / 1000;
export const quantityLimit = (unit) => unit === "g" || unit === "ml" ? 999999 : 999;
export const isValidQuantity = (value, unit = null) =>
  isValidUnit(unit) && typeof value === "number" && Number.isFinite(value) &&
  value > 0 && value <= quantityLimit(unit) &&
  value === roundQuantity(value) &&
  (unit === null || unit === "pcs" || unit === "pack" ? Number.isInteger(value) : true);

const dimensions = { pcs: "count", pack: "pack", g: "mass", kg: "mass", ml: "volume", l: "volume" };
const factors = { pcs: 1, pack: 1, g: 1, kg: 1000, ml: 1, l: 1000 };

/** Null means incompatible units or a conversion that would lose precision. */
export const convertQuantity = (value, from = null, to = null) => {
  const a = from ?? "pcs";
  const b = to ?? "pcs";
  if (!isValidUnit(from) || !isValidUnit(to) || dimensions[a] !== dimensions[b]) return null;
  const converted = value * factors[a] / factors[b];
  const rounded = roundQuantity(converted);
  return Math.abs(converted - rounded) < 1e-9 ? rounded : null;
};

export const quantityStep = (unit) => unit === "g" || unit === "ml" ? 100 : unit === "kg" || unit === "l" ? 0.1 : 1;
