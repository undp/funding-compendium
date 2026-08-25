// Shared semantic chart palette. Resource colors must never be reassigned to
// another meaning; use SECONDARY_COLORS for categorical series instead.
export const RESOURCE_COLORS = Object.freeze({
  regular: '#C3D51F',
  other: '#0069B3'
});

export const SECONDARY_COLORS = Object.freeze([
  '#3D9999',
  '#8964BC',
  '#E86B2E',
  '#AD7F00'
]);

// The supplied hues followed by lighter and darker shades for charts that
// need more than four distinct categorical colors.
export const CATEGORY_COLORS = Object.freeze([
  '#3D9999', '#8964BC', '#E86B2E', '#AD7F00',
  '#6EB3B3', '#A58ACB', '#EE8C5B', '#C69E2D',
  '#267878', '#694596', '#B94E1C', '#805E00'
]);

// Keep geographic labels visually consistent wherever regional breakdowns recur.
export const REGION_COLORS = Object.freeze({
  africa: '#C69E2D',
  asia: '#E86B2E',
  arab: '#8964BC',
  lac: '#3D9999',
  europe: '#C3D51F',
  global: '#0069B3'
});

// Shared across the two IFI direct/indirect comparison charts.
export const IFI_COLORS = Object.freeze({
  direct: '#E86B2E',
  indirect: '#3D9999'
});

export default {
  RESOURCE_COLORS,
  SECONDARY_COLORS,
  CATEGORY_COLORS,
  REGION_COLORS,
  IFI_COLORS
};
