import { MOCK_CYCLES } from './constants';

export const calculateMatches = (answers) => {
  // answers: [experience, terrain, budget, goal, height] indices (0-3)
  const experienceVal = answers[0];
  const terrainVal = answers[1];
  const budgetVal = answers[2];
  const goalVal = answers[3];
  // heightVal = answers[4]; // Optional for exact size calculation

  // Map answers to logic
  const targetSkill = experienceVal === 0 ? 'beginner' : experienceVal === 1 ? 'beginner' : experienceVal === 2 ? 'intermediate' : 'advanced';
  const targetTerrain = terrainVal === 0 ? 'city' : terrainVal === 1 ? 'trail' : terrainVal === 2 ? 'road' : 'mixed';
  
  // Budget approximations
  const maxPriceInr = budgetVal === 0 ? 15000 : budgetVal === 1 ? 30000 : budgetVal === 2 ? 60000 : 9999999;
  const minPriceInr = budgetVal === 0 ? 0 : budgetVal === 1 ? 15000 : budgetVal === 2 ? 30000 : 60000;

  const targetCategory = 
    goalVal === 0 ? ['Hybrid', 'City'] :
    goalVal === 1 ? ['City', 'Hybrid', 'Urban'] :
    goalVal === 2 ? ['MTB', 'Gravel', 'Touring'] :
    ['Road', 'Track'];

  const results = MOCK_CYCLES.map(cycle => {
    let score = 0;
    
    // Skill Level (30 points)
    const cSkill = (cycle.skillLevel || 'beginner').toLowerCase();
    if (cSkill === targetSkill) score += 30;
    else if ((cSkill === 'intermediate' && targetSkill === 'advanced') || (cSkill === 'beginner' && targetSkill === 'intermediate')) score += 15;

    // Terrain (25 points)
    const cTerrainStr = (cycle.terrain || []).join(' ').toLowerCase();
    if (targetTerrain === 'trail' && cTerrainStr.includes('trail')) score += 25;
    else if (targetTerrain === 'city' && cTerrainStr.includes('city')) score += 25;
    else if (targetTerrain === 'road' && (cTerrainStr.includes('road') || cycle.category === 'Road')) score += 25;
    else if (targetTerrain === 'mixed') score += 15; // Mixed gives baseline score

    // Budget (25 points)
    const price = parseInt(cycle.price_inr.replace(/[^\d]/g, ''));
    if (price >= minPriceInr && price <= maxPriceInr) score += 25;
    else if (price < minPriceInr) score += 15; // Under budget is okay, but not ideal match
    else score += 0; // Over budget

    // Goal (20 points)
    if (targetCategory.includes(cycle.category)) score += 20;

    return { ...cycle, matchScore: score };
  });

  return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
};
