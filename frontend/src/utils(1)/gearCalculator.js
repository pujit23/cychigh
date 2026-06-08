export const calculateGearRatio = (chainringTeeth, cassetteTeeth, wheelSizeInches = 29) => {
    if (!chainringTeeth || !cassetteTeeth) return 0;
    
    // Gear Ratio
    const ratio = chainringTeeth / cassetteTeeth;
    
    // Gear Inches (Development)
    const gearInches = ratio * wheelSizeInches;
    
    return {
        ratio: ratio.toFixed(2),
        inches: gearInches.toFixed(1)
    };
};

export const getSpeedAtCadence = (gearInches, cadenceRPM = 90) => {
    // Speed (mph) = (Gear Inches * Cadence) / 336
    const mph = (gearInches * cadenceRPM) / 336;
    const kmh = mph * 1.60934;
    return kmh.toFixed(1);
};
