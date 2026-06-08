const fs = require('fs');
const path = require('path');

const TREK = ["Marlin 4", "Marlin 5", "Marlin 6", "Marlin 7", "Marlin 8", "FX 1", "FX 2", "FX 3", "Verve 1", "Verve 2", "Domane AL 2", "Domane AL 3", "Dual Sport 1", "Dual Sport 2", "Dual Sport 3", "X-Caliber 7", "X-Caliber 8", "Roscoe 7", "Roscoe 8", "Slash 9.8"];
const GIANT = ["Talon 1", "Talon 2", "Talon 3", "ATX", "ATX 1", "ATX 2", "Escape 2", "Escape 3", "Contend 3", "Contend AR", "Revolt 2", "Roam 3", "Roam 2", "Fathom 1", "Fathom 2", "Trance X", "Stance 2", "Propel Advanced", "Defy Advanced", "FastRoad SL"];
const SPECIALIZED = ["Rockhopper", "Rockhopper Comp", "Rockhopper Elite", "Hardrock", "Pitch", "Sirrus 2.0", "Sirrus X", "Allez", "Allez Elite", "Diverge", "Roubaix", "Stumpjumper", "Turbo Vado", "Turbo Como", "Epic Hardtail", "Epic Evo", "Fuse", "Enduro", "Demo", "Tarmac"];
const HERO = ["Sprint Pro", "Sprint Compass", "Octane Bonito", "Octane Salamander", "Octane Parkour"];
const HERCULES = ["Roadeo A50", "Roadeo A75", "Roadeo Turnkey", "Top Gear", "Street Rider"];
const FIREFOX = ["Mountana 29", "Road Runner", "Bad Attitude 7", "Voya", "Rapide"];
const MONTRA = ["Madrock", "Downtown", "Blues", "Chord", "Trance"];
const CANNONDALE = ["Trail 5", "Trail 6", "Trail 7", "Quick 3", "Quick CX 4"];
const SCOTT = ["Aspect 940", "Aspect 950", "Scale 970", "Contessa Active"];
const MERIDA = ["Big Nine 100", "Big Nine 200", "Big Seven 100", "Scultura 200", "Crossway 20"];
const MARIN = ["Fairfax 1", "Fairfax 2", "Bobcat Trail", "Gestalt", "Rift Zone", "DSX"];
const POLYGON = ["Path 2", "Strattos S2", "Cascade 3", "Xtrada 6", "Heist X2"];
const BTWIN = ["Rockrider ST100", "ST120", "ST520", "Riverside 120", "Riverside 500"];
const CRADIAC = ["Gunner Pro", "Squad", "Alpha Pro"];
const LEADER = ["Beast 26T", "Scout"];
const OTHERS = ["Java Fuoco", "OMO Hybrid 700C", "Kross Maximus", "Kross Xceed", "Kross Viper"];

const cycleMap = {
    'Trek': TREK, 'Giant': GIANT, 'Specialized': SPECIALIZED, 'Hero': HERO,
    'Hercules': HERCULES, 'Firefox': FIREFOX, 'Montra': MONTRA,
    'Cannondale': CANNONDALE, 'Scott': SCOTT, 'Merida': MERIDA,
    'Marin': MARIN, 'Polygon': POLYGON, 'Btwin': BTWIN,
    'Cradiac': CRADIAC, 'Leader': LEADER, 'Others': OTHERS
};

const TERRAINS = ["Trail", "Light Off-road", "Urban", "Road", "Mixed"];
const SKILLS = ["Beginner", "Intermediate", "Expert"];
const MATS = ["Alpha Silver Aluminum", "Carbon", "Steel", "Alloy"];
const SUSPENSIONS = ["SR Suntour XCT", "Rigid", "RockShox Judy", "Fox 34"];
const BRAKETYPES = ["Mechanical Disc", "Hydraulic Disc", "V-Brake"];

let _idCounter = 1;
const MOCK_CYCLES = [];

for (const [brand, names] of Object.entries(cycleMap)) {
    for (const name of names) {
        const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        let cat = 'MTB';
        if (name.toLowerCase().includes('road') || name.includes('Allez') || name.includes('Contend')) cat = 'Road';
        if (name.includes('FX') || name.includes('Escape') || name.includes('Sirrus') || name.includes('Verve')) cat = 'Hybrid';

        const priceBase = cat === 'Road' ? 50000 : 35000;
        const randSeed = (name.length * brand.length) % 10;
        
        const tags = [cat.toLowerCase(), SKILLS[randSeed % 3].toLowerCase(), "shimano"];
        if (cat === "MTB") tags.push("hardtail", "29er");

        MOCK_CYCLES.push({
            id: id,
            name: name,
            brand: brand==='Others' ? name.split(' ')[0] : brand,
            fullName: brand==='Others' ? name : `${brand} ${name}`,
            category: cat,
            year: 2024,
            skillLevel: SKILLS[randSeed % 3],
            terrain: [TERRAINS[randSeed % 5], TERRAINS[(randSeed+1) % 5]],
            frameMaterial: MATS[randSeed % 4],
            frameType: cat === "MTB" ? "Hardtail" : "Rigid",
            suspension: SUSPENSIONS[randSeed % 4],
            suspensionTravel: cat === "MTB" ? "100mm" : "-",
            weight: 12 + (randSeed * 0.5),
            maxLoad: 120 + (randSeed * 2),
            wheelSize: '29"',
            frontTire: "29×2.2",
            rearTire: "29×2.2",
            tireType: "Wire bead",
            tirePSI: "40-65",
            rimType: "Alloy double-wall",
            spokeCount: 32,
            valveType: randSeed % 2 === 0 ? "Schrader" : "Presta",
            gears: 21,
            shifters: "Shimano Altus M2000 3×7",
            frontDerailleur: "Shimano Tourney TX",
            rearDerailleur: "Shimano Altus M2000",
            crankset: "Shimano 42/34/24T",
            chain: "KMC Z7",
            cassette: "Shimano 11-28T 7sp",
            pedals: "Platform",
            brakeType: BRAKETYPES[randSeed % 3],
            frontBrake: "Tektro MD-M300",
            rearBrake: "Tektro MD-M300",
            rotorSize: "160mm",
            handlebar: "Alloy, 31.8mm, 680mm",
            stem: "Alloy, 60mm",
            saddle: "Sport Saddle",
            seatpost: "Alloy, 31.6mm",
            ridingPosture: cat === "Road" ? "Aggressive" : "Upright",
            price_inr: `₹${priceBase + (randSeed * 5000)}`,
            price_usd: `$${Math.floor((priceBase + (randSeed * 5000))/82)}`,
            pros: [
                "Excellent value for money",
                "Reliable drivetrain",
                "Sturdy frame",
                "Great looks"
            ],
            cons: [
                "A bit heavy",
                "Basic component spec",
                "Stock pedals"
            ],
            whoIsItFor: `Perfect for ${SKILLS[randSeed % 3].toLowerCase()} riders looking for a ${cat.toLowerCase()} bike.`,
            bestFor: ["Weekend riding", "Fitness", "Commuting"],
            notFor: ["Professional racing"],
            maintenanceCost: "₹2,000–4,000/year",
            serviceInterval: "Every 500km",
            availableAt: ["Local Dealers", "Online"],
            alternatives: ["Similar Model A", "Similar Model B"],
            tags: tags,
            _id: id
        });
    }
}

const fileContent = `export const API_BASE_URL = '/api';

export const BRANDS = [
    'All', 'Trek', 'Giant', 'Specialized',
    'Hero', 'Hercules', 'Firefox', 'Montra',
    'Cannondale', 'Scott', 'Merida', 'Marin',
    'Polygon', 'Btwin', 'Cradiac', 'Leader',
    'Others'
];

export const CATEGORIES = [
    'All', 'MTB', 'Road', 'Hybrid', 'Gravel',
    'City', 'Folding', 'Electric', 'BMX'
];

export const TERRAIN_TYPES = ['Road', 'Trail', 'Off-road', 'Urban', 'Mixed'];
export const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Expert'];
export const BRAKE_TYPES = ['Hydraulic Disc', 'Mechanical Disc', 'V-brake', 'Rim'];
export const FRAME_MATERIALS = ['Carbon', 'Aluminum', 'Steel', 'Chromoly'];
export const SUSPENSION_TYPES = ['Rigid', 'Hardtail', 'Full Suspension'];

export const MOCK_CYCLES = ${JSON.stringify(MOCK_CYCLES, null, 4)};
`;

fs.writeFileSync(path.join(__dirname, 'frontend/src/utils/constants.js'), fileContent);
console.log('constants.js generated with 120 full mock cycles!');
