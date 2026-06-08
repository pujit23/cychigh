export const formatPrice = (inr) => {
  return "₹" + inr.toLocaleString('en-IN');
};

export const formatWeight = (val) => {
  if (val < 100) return `${val} kg`; // if passing kg already
  return `${(val / 1000).toFixed(1)} kg`;
};

export const formatSpeed = (kmh) => {
  return `${kmh.toFixed(1)} km/h`;
};
