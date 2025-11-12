const round = (value: number, decimals = 2) => {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

function cleanNumber(n: number) {
  return Number.isInteger(n) ? n : n;
}

export function scaleValue(value: number | undefined, scale: number) {
  return cleanNumber(round((value || 0) * scale));
}

const DEFAULT_SERVING_SIZE = 100;
export function extractQuantity(query: string): { cleanQuery: string; quantity: number } {
  // Match something like "230g", "230 g", "1kg", "0.5kg"
  const match = query.match(/(\d+(?:\.\d+)?)\s*(kg|g)\b/i);

  if (!match) {
    return { cleanQuery: query.trim(), quantity: DEFAULT_SERVING_SIZE };
  }

  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  // normalize to grams
  const quantity = unit === "kg" ? value * 1000 : value;

  // remove the matched substring from the query for cleaner search terms
  const cleanQuery = query.replace(match[0], "").trim();

  return { cleanQuery, quantity };
}