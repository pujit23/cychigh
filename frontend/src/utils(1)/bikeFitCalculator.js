export const calculateSaddleHeight = (inseamCm) => {
    if (!inseamCm) return 0;
    // LeMond Formula
    return (inseamCm * 0.883).toFixed(1);
};

export const calculateFrameSize = (heightCm, category) => {
    if (!heightCm) return "Unknown";
    
    if (category.toLowerCase().includes('mountain')) {
        if (heightCm < 158) return "XS";
        if (heightCm < 168) return "S";
        if (heightCm < 178) return "M";
        if (heightCm < 188) return "L";
        return "XL";
    } else {
        // Road / Hybrid
        if (heightCm < 160) return "49cm-50cm";
        if (heightCm < 168) return "52cm-54cm";
        if (heightCm < 178) return "55cm-56cm";
        if (heightCm < 188) return "58cm-60cm";
        return "61cm+";
    }
};

export const calculateReachEstimate = (heightCm, apeIndexCm = 0) => {
    // Very rough estimate based on height and ape index (wingspan - height)
    let baseReach = (heightCm * 0.22);
    if (apeIndexCm > 0) baseReach += 1;
    if (apeIndexCm < 0) baseReach -= 1;
    return baseReach.toFixed(1);
};
