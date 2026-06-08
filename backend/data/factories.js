export const generateCycle = (brand, name, category, tier) => {
    // tier: 'budget', 'entry', 'mid', 'premium', 'ultra'
    
    // Logic to select realistic parts based on tier and category
    const isMTB = category.toLowerCase().includes('mountain') || category.toLowerCase().includes('mtb') || category.toLowerCase().includes('trail');
    const isRoad = category.toLowerCase().includes('road') || category.toLowerCase().includes('race');
    const isGravel = category.toLowerCase().includes('gravel') || category.toLowerCase().includes('adventure');
    const isHybrid = category.toLowerCase().includes('hybrid') || category.toLowerCase().includes('city');

    const type = isMTB ? (tier === 'ultra' ? 'Full Suspension' : 'Hardtail') : category;
    const year = 2024;
    
    let basePriceUsd = 0;
    if (tier === 'budget') basePriceUsd = 300;
    if (tier === 'entry') basePriceUsd = 600;
    if (tier === 'mid') basePriceUsd = 1200;
    if (tier === 'premium') basePriceUsd = 3500;
    if (tier === 'ultra') basePriceUsd = 8000;

    // Fuzz price slightly
    const mrp_usd = basePriceUsd + Math.floor(Math.random() * (basePriceUsd * 0.15));
    const street_usd = Math.floor(mrp_usd * 0.9);
    const mrp_inr = mrp_usd * 83;
    const street_inr = street_usd * 83;

    // Drivetrain picking
    let groupset = "Shimano Tourney";
    let speeds = 7;
    if (isRoad) {
        if (tier === 'budget') { groupset = "Shimano Claris"; speeds = 8; }
        if (tier === 'entry') { groupset = "Shimano Sora"; speeds = 9; }
        if (tier === 'mid') { groupset = "Shimano 105"; speeds = 11; }
        if (tier === 'premium') { groupset = "Shimano Ultegra Di2"; speeds = 12; }
        if (tier === 'ultra') { groupset = "Shimano Dura-Ace Di2"; speeds = 12; }
    } else if (isMTB) {
        if (tier === 'budget') { groupset = "Shimano Tourney"; speeds = 7; }
        if (tier === 'entry') { groupset = "Shimano Deore"; speeds = 10; }
        if (tier === 'mid') { groupset = "SRAM NX Eagle"; speeds = 12; }
        if (tier === 'premium') { groupset = "SRAM GX Eagle AXS"; speeds = 12; }
        if (tier === 'ultra') { groupset = "SRAM XX1 Eagle AXS"; speeds = 12; }
    } else {
        if (tier === 'budget') { groupset = "Shimano Altus"; speeds = 8; }
        if (tier === 'entry') { groupset = "Shimano Acera"; speeds = 9; }
        if (tier === 'mid') { groupset = "Shimano Deore"; speeds = 10; }
        if (tier === 'premium') { groupset = "Shimano GRX 800"; speeds = 11; }
        if (tier === 'ultra') { groupset = "SRAM Force eTap AXS"; speeds = 12; }
    }

    const frameMaterial = ['premium', 'ultra'].includes(tier) ? "Carbon Fiber" : "Alpha Aluminum";
    const forkBrand = isMTB ? (tier === 'budget' || tier === 'entry' ? 'SR Suntour' : (tier === 'mid' ? 'RockShox' : 'Fox')) : brand;
    const forkTravel = isMTB ? (tier === 'ultra' ? '140mm' : '100mm') : 'Rigid';
    
    const wheelSize = isMTB ? "29\"" : "700c";
    const tireSize = isMTB ? "29x2.20\"" : (isRoad ? "700x25c" : "700x35c");
    const brakesType = (tier === 'budget' && isRoad) ? "Rim Brakes" : (tier === 'budget' ? "Mechanical Disc" : "Hydraulic Disc");
    
    // Extract base brand slug
    const slug = `${brand.toLowerCase()}-${name.toLowerCase().replace(/[\s\.]+/g, '-')}`;

    return {
        id: slug,
        name: name,
        brand: brand,
        fullName: `${brand} ${name} ${year}`,
        category: category,
        type: type,
        year: year,
        image: `/images/cycles/${slug}.jpg`,
        tags: [tier, category, frameMaterial.split(' ')[0]],
        
        overview: {
            history: `The ${name} represents ${brand}'s commitment to ${category.toLowerCase()} excellence.`,
            primaryUse: isMTB ? "Trail riding and off-road" : (isRoad ? "Tarmac and racing" : "Commuting and fitness"),
            skillLevel: tier === 'budget' ? 'Beginner' : (tier === 'ultra' ? 'Expert' : 'Intermediate'),
            terrain: isMTB ? ["Trails", "Gravel", "Off-road"] : (isRoad ? ["Tarmac", "Paved Roads"] : ["City Streets", "Light Gravel"]),
            idealFor: `Riders looking for a reliable ${category.toLowerCase()} platform.`,
            notFor: isMTB ? "Paved road racing" : "Aggressive trail riding"
        },

        frame: {
            material: frameMaterial,
            type: type,
            geometry: isMTB ? "Trail Geometry" : "Endurance Geometry",
            sizes: ["S", "M", "L", "XL"],
            weight: isMTB ? (tier === 'premium' ? 12.5 : 14.5) : (tier === 'premium' ? 7.8 : 9.5),
            maxLoad: 125,
            internalCableRouting: tier !== 'budget',
            dropperpPostReady: isMTB
        },

        fork: {
            type: forkTravel === 'Rigid' ? 'Rigid' : 'Suspension',
            material: forkTravel === 'Rigid' ? frameMaterial : 'Alloy/Magnesium',
            travel: forkTravel,
            brand: forkBrand,
            model: isMTB ? (forkBrand === 'RockShox' ? 'Recon Silver RL' : '34 Step-Cast Factory') : `${brand} Carbon`
        },

        wheels: {
            size: wheelSize,
            front: {
                rimBrand: brand === 'Trek' ? 'Bontrager' : (brand === 'Giant' ? 'Giant' : 'AlexRims'),
                rimType: 'Double Wall Alloy',
                rimWidth: isMTB ? '25mm' : '19mm',
                hubBrand: 'Formula',
                hubType: 'Sealed Bearing',
                spokeCount: isMTB ? 32 : 24,
                tireSize: tireSize,
                tireBrand: isMTB ? 'Maxxis' : 'Schwalbe',
                tireModel: isMTB ? 'Ikon' : 'Lugano',
                tireType: 'Clincher',
                tubeType: 'Presta',
                tubelessReady: tier !== 'budget',
                psi: isMTB ? '35-50' : '90-110',
                valveType: 'Presta'
            },
            rear: {
                rimBrand: brand === 'Trek' ? 'Bontrager' : (brand === 'Giant' ? 'Giant' : 'AlexRims'),
                rimType: 'Double Wall Alloy',
                rimWidth: isMTB ? '25mm' : '19mm',
                hubBrand: 'Formula',
                hubType: 'Sealed Bearing',
                spokeCount: isMTB ? 32 : 28,
                tireSize: tireSize,
                tireBrand: isMTB ? 'Maxxis' : 'Schwalbe',
                tireModel: isMTB ? 'Ikon' : 'Lugano',
                tireType: 'Clincher',
                tubeType: 'Presta',
                tubelessReady: tier !== 'budget',
                psi: isMTB ? '35-50' : '90-110',
                valveType: 'Presta'
            }
        },

        drivetrain: {
            groupset: groupset,
            speeds: speeds,
            shifterBrand: groupset.split(' ')[0],
            shifterModel: groupset.split(' ').slice(1).join(' '),
            frontDerailleur: isMTB && speeds >= 10 ? 'None' : groupset,
            rearDerailleur: groupset,
            cranksetBrand: groupset.split(' ')[0],
            cranksetModel: 'Alloy Forged',
            chainringSize: isMTB ? '32T' : '50/34T',
            bbType: 'Hollowtech II / Threaded',
            cassetteBrand: groupset.split(' ')[0],
            cassetteModel: 'HG Series',
            cassetteRange: isMTB ? `11-${speeds===12 ? '50' : '42'}T` : '11-32T',
            chainBrand: 'KMC',
            chainModel: `X${speeds}`,
            pedalType: isRoad && tier !== 'budget' ? 'None' : 'Resin Platform',
            pedalIncluded: !(isRoad && tier !== 'budget')
        },

        brakes: {
            type: brakesType,
            front: brakesType === 'Hydraulic Disc' ? '160mm Rotor' : 'Standard',
            rear: brakesType === 'Hydraulic Disc' ? '160mm Rotor' : 'Standard',
            leverBrand: groupset.split(' ')[0],
            leverModel: brakesType.includes('Disc') ? 'MT200 / Level' : 'Standard',
            rotorSizeFront: brakesType.includes('Disc') ? '160mm' : 'N/A',
            rotorSizeRear: brakesType.includes('Disc') ? '160mm' : 'N/A',
            padType: 'Resin'
        },

        cockpit: {
            handlebarBrand: brand === 'Trek' ? 'Bontrager' : 'Alloy Comp',
            handlebarType: isRoad ? 'Drop Bar' : 'Riser Bar',
            handlebarWidth: isMTB ? '720mm' : '420mm',
            stemBrand: brand === 'Trek' ? 'Bontrager' : 'Alloy',
            stemLength: isMTB ? '60mm' : '100mm',
            gripsBrand: brand === 'Trek' ? 'Bontrager' : 'Velo',
            gripsType: isRoad ? 'Bar Tape' : 'Lock-on',
            saddleBrand: brand === 'Trek' ? 'Bontrager' : 'Selle Royal',
            saddleModel: 'Comfort / Sport',
            seatpostBrand: brand === 'Trek' ? 'Bontrager' : 'Alloy',
            seatpostDiameter: '31.6mm',
            seatpostLength: '400mm',
            headsetBrand: 'FSA',
            headsetType: 'Integrated Sealed',
            dropperPost: isMTB && ['mid', 'premium', 'ultra'].includes(tier),
            dropperTravel: isMTB && ['mid', 'premium', 'ultra'].includes(tier) ? '125mm' : 'N/A'
        },

        ergonomics: {
            ridingPosture: isRoad ? 'Aggressive / Aero' : 'Upright / Relaxed',
            seatHeightMin: '650mm',
            seatHeightMax: '850mm',
            reachRange: isRoad ? '380-410mm' : '420-460mm',
            stackRange: isRoad ? '540-580mm' : '600-640mm'
        },

        pricing: {
            mrp_inr: Math.floor(mrp_inr).toString(),
            mrp_usd: Math.floor(mrp_usd).toString(),
            street_inr: Math.floor(street_inr).toString(),
            street_usd: Math.floor(street_usd).toString(),
            segment: tier.toUpperCase(),
            availableAt: ["Official Stores", "Premium Dealers"],
            alternatives: [] // To be linked dynamically if needed
        },

        maintenance: {
            serviceInterval: isMTB ? "Every 50 hours of riding" : "Every 1000 km",
            chainLubeFreq: "Every 150 km or after wet rides",
            tirePressureCheck: "Before every ride",
            commonIssues: ["Cable stretch during break-in", "Brake pad wear"],
            annualCost_inr: isMTB ? "4500" : "3000",
            spareAvailability: "High"
        },

        pros: [
            `Excellent value in the ${tier} segment`,
            `Reliable ${groupset} shifting`,
            `${frameMaterial} provides great ride quality`
        ],
        cons: [
            tier === 'budget' ? "Heavier components" : "Premium price point",
            !isRoad && tier === 'budget' ? "Coil fork lacks adjustability" : "Stock saddle might need replacement"
        ],
        versions: [{
            year: 2024,
            changes: ["New colorways", "Updated geometry"],
            price_inr: Math.floor(mrp_inr).toString()
        }],
        upgrades: [{
            part: "Tires",
            suggestion: "Tubeless Setup",
            reason: "Better puncture protection and lower pressure capable",
            cost_inr: "4000",
            priority: "High Impact"
        }, {
            part: "Pedals",
            suggestion: "Clipless Pedals",
            reason: "Improved power transfer",
            cost_inr: "3500",
            priority: "Medium Impact"
        }],
        parts: [],
        compatible: {
            tires: isMTB ? ["29x2.30\"", "29x2.40\""] : ["700x28c", "700x30c"],
            racks: ["Rear Rack Mounts Compatible"],
            fenders: ["Full Coverage Fenders"],
            lights: ["Any standard bar/post mount"]
        },
        isCustom: false,
    };
};
