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