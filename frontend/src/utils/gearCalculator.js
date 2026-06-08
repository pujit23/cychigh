export const calculateGearRatio = (chainring, cog) => {
  return (chainring / cog).toFixed(2);
};

export const calculateSpeed = (gearRatio, cadence, wheelInches = 27) => {
  const mph = (gearRatio * wheelInches * cadence * Math.PI * 60) / 63360;
  return (mph * 1.60934).toFixed(1);
};

export const generateGearTable = (chainrings, cogs) => {
  return chainrings.map(cr => {
    return cogs.map(cog => ({
      chainring: cr,
      cog,
      ratio: calculateGearRatio(cr, cog)
    }));
  });
};
