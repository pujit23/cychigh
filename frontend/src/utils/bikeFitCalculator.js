export const calculateBikeFit = (inseam, shoulders) => {
  return {
    frameSize: (inseam * 0.65).toFixed(1) + ' cm',
    saddleHeight: (inseam * 0.883).toFixed(1) + ' cm',
    handlebarWidth: shoulders + ' cm'
  };
};
