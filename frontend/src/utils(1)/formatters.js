export const formatCurrency = (value, currency = 'INR') => {
    if (!value) return 'N/A';
    const numericStr = String(value).replace(/,/g, '');
    const num = isNaN(numericStr) ? 0 : Number(numericStr);
    
    if (currency === 'INR') {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(num);
    }
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(num);
};

export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};
