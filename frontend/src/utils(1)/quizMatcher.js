export const matchCycle = (answers, cycles) => {
    if (!cycles || cycles.length === 0) return null;

    let scores = cycles.map(cycle => ({ cycle, score: 0 }));

    scores.forEach(item => {
        const c = item.cycle;
        
        // Match Terrain
        if (answers.terrain === 'Off-road/Trails' && c.category.includes('Mountain')) item.score += 5;
        if (answers.terrain === 'Paved Roads' && c.category.includes('Road')) item.score += 5;
        if (answers.terrain === 'Mixed/City' && c.category.includes('Hybrid')) item.score += 5;

        // Match Budget
        const price = parseInt(c.pricing?.street_inr?.replace(/,/g, '')) || 0;
        if (answers.budget === 'Under ₹20,000' && price < 20000) item.score += 4;
        if (answers.budget === '₹20,000 - ₹50,000' && price >= 20000 && price <= 50000) item.score += 4;
        if (answers.budget === 'Over ₹50,000' && price > 50000) item.score += 4;

        // Match Experience
        if (answers.experience === 'Beginner' && c.tags.includes('entry')) item.score += 2;
        if (answers.experience === 'Intermediate' && c.tags.includes('mid')) item.score += 2;
        if (answers.experience === 'Pro/Racer' && (c.tags.includes('premium') || c.tags.includes('ultra'))) item.score += 3;
    });

    scores.sort((a, b) => b.score - a.score);
    return scores.slice(0, 3).map(s => s.cycle);
};
