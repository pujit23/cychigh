// cycleDataEnricher.js
// Transforms flat MOCK_CYCLES data into the nested
// structure expected by CyclePage accordion sections.

const BRAND_SPEC_DB = {
  Trek: {
    frameType: 'Alpha Aluminum',
    forkBrand: 'SR Suntour',
    rimBrand: 'Bontrager',
    tireBrand: 'Bontrager',
    handlebarBrand: 'Bontrager',
    saddleBrand: 'Bontrager Arvada',
    seatpostDia: '31.6mm',
    gripsBrand: 'Bontrager Satellite',
    stemLength: '90mm',
    availableAt: ['Trek Store India', 'Amazon.in', 'Flipkart', 'Local Trek Dealers'],
  },
  Giant: {
    frameType: 'ALUXX Aluminum',
    forkBrand: 'SR Suntour',
    rimBrand: 'Giant S-R2',
    tireBrand: 'Giant',
    handlebarBrand: 'Giant Connect',
    saddleBrand: 'Giant Sport',
    seatpostDia: '30.9mm',
    gripsBrand: 'Giant Sport',
    stemLength: '80mm',
    availableAt: ['Giant India Store', 'Amazon.in', 'Giant Authorized Dealers'],
  },
  Specialized: {
    frameType: 'Specialized A1 Aluminum',
    forkBrand: 'SR Suntour',
    rimBrand: 'Specialized',
    tireBrand: 'Specialized',
    handlebarBrand: 'Specialized',
    saddleBrand: 'Body Geometry Bridge',
    seatpostDia: '27.2mm',
    gripsBrand: 'Specialized Body Geometry',
    stemLength: '75mm',
    availableAt: ['Specialized India Dealers', 'Amazon.in', 'Cycling Boutiques'],
  },
  Hero: {
    frameType: 'Hi-Ten Steel',
    forkBrand: 'Zoom',
    rimBrand: 'Hero Alloy',
    tireBrand: 'Ralson',
    handlebarBrand: 'Hero',
    saddleBrand: 'Hero Comfort',
    seatpostDia: '25.4mm',
    gripsBrand: 'Hero Rubber',
    stemLength: '60mm',
    availableAt: ['Hero Cycles Showrooms', 'Amazon.in', 'Flipkart', 'Local Bike Shops'],
  },
  Hercules: {
    frameType: 'Hi-Ten Steel',
    forkBrand: 'Zoom',
    rimBrand: 'Hercules Alloy',
    tireBrand: 'Ralson',
    handlebarBrand: 'Hercules',
    saddleBrand: 'Hercules Comfort',
    seatpostDia: '25.4mm',
    gripsBrand: 'Hercules Rubber',
    stemLength: '60mm',
    availableAt: ['Hercules Showrooms', 'Amazon.in', 'Flipkart', 'Local Bike Shops'],
  },
  Firefox: {
    frameType: '6061 Aluminum',
    forkBrand: 'Zoom',
    rimBrand: 'Firefox Alloy',
    tireBrand: 'Kenda',
    handlebarBrand: 'Firefox',
    saddleBrand: 'Velo',
    seatpostDia: '27.2mm',
    gripsBrand: 'Firefox Ergonomic',
    stemLength: '70mm',
    availableAt: ['Firefox Stores', 'Amazon.in', 'Flipkart', 'Track & Trail Stores'],
  },
  Montra: {
    frameType: '6061 Aluminum',
    forkBrand: 'Zoom',
    rimBrand: 'Montra Alloy',
    tireBrand: 'Kenda',
    handlebarBrand: 'Montra',
    saddleBrand: 'Velo',
    seatpostDia: '27.2mm',
    gripsBrand: 'Montra Ergonomic',
    stemLength: '70mm',
    availableAt: ['Track & Trail Stores', 'Amazon.in', 'Flipkart'],
  },
  Cannondale: {
    frameType: 'SmartForm C2 Aluminum',
    forkBrand: 'SR Suntour',
    rimBrand: 'Cannondale',
    tireBrand: 'WTB',
    handlebarBrand: 'Cannondale C3',
    saddleBrand: 'Cannondale Stage',
    seatpostDia: '31.6mm',
    gripsBrand: 'Cannondale Dual',
    stemLength: '80mm',
    availableAt: ['Cannondale Dealers', 'Amazon.in', 'Cycling Specialist Stores'],
  },
  Scott: {
    frameType: '6061 Alloy',
    forkBrand: 'SR Suntour',
    rimBrand: 'Syncros X-20',
    tireBrand: 'Impac Ridgepac',
    handlebarBrand: 'Syncros',
    saddleBrand: 'Syncros',
    seatpostDia: '31.6mm',
    gripsBrand: 'Syncros',
    stemLength: '90mm',
    availableAt: ['Scott Sports India', 'Amazon.in', 'Authorized Scott Dealers'],
  },
  Merida: {
    frameType: 'Merida Aluminum',
    forkBrand: 'SR Suntour',
    rimBrand: 'Merida Comp',
    tireBrand: 'Maxxis',
    handlebarBrand: 'Merida Expert',
    saddleBrand: 'Merida Sport',
    seatpostDia: '30.9mm',
    gripsBrand: 'Merida Expert',
    stemLength: '80mm',
    availableAt: ['Merida India Dealers', 'Amazon.in', 'Cycling Boutiques'],
  },
  Marin: {
    frameType: 'Series 2 6061 Aluminum',
    forkBrand: 'SR Suntour',
    rimBrand: 'Marin Aluminum',
    tireBrand: 'Schwalbe',
    handlebarBrand: 'Marin',
    saddleBrand: 'Marin Speed',
    seatpostDia: '31.6mm',
    gripsBrand: 'Marin Dual-Density',
    stemLength: '80mm',
    availableAt: ['Marin India Dealers', 'Amazon.in', 'Cycle Specialty Shops'],
  },
  Polygon: {
    frameType: 'ALX Aluminum',
    forkBrand: 'SR Suntour',
    rimBrand: 'Araya',
    tireBrand: 'Kenda',
    handlebarBrand: 'Entity Sport',
    saddleBrand: 'Entity Sport',
    seatpostDia: '27.2mm',
    gripsBrand: 'Entity Comfort',
    stemLength: '80mm',
    availableAt: ['Polygon India', 'Rodalink', 'Amazon.in'],
  },
  Btwin: {
    frameType: '6061 Aluminum',
    forkBrand: 'Zoom/Rigid',
    rimBrand: 'Btwin Alloy',
    tireBrand: 'Btwin',
    handlebarBrand: 'Btwin',
    saddleBrand: 'Btwin Sport',
    seatpostDia: '27.2mm',
    gripsBrand: 'Btwin Ergonomic',
    stemLength: '70mm',
    availableAt: ['Decathlon India Stores', 'Decathlon.in'],
  },
  Cradiac: {
    frameType: '6061 Aluminum',
    forkBrand: 'Zoom',
    rimBrand: 'Cradiac Alloy',
    tireBrand: 'Kenda',
    handlebarBrand: 'Cradiac',
    saddleBrand: 'Cradiac Comfort',
    seatpostDia: '27.2mm',
    gripsBrand: 'Cradiac Dual',
    stemLength: '70mm',
    availableAt: ['Cradiac.com', 'Amazon.in', 'Flipkart'],
  },
  Leader: {
    frameType: 'Hi-Ten Steel',
    forkBrand: 'Rigid Steel',
    rimBrand: 'Leader Alloy',
    tireBrand: 'Leader',
    handlebarBrand: 'Leader',
    saddleBrand: 'Leader Comfort',
    seatpostDia: '25.4mm',
    gripsBrand: 'Leader',
    stemLength: '55mm',
    availableAt: ['Leader Cycles Website', 'Amazon.in', 'Flipkart'],
  },
  Java: {
    frameType: '6061 Aluminum',
    forkBrand: 'Java Carbon',
    rimBrand: 'Java Alloy',
    tireBrand: 'Continental',
    handlebarBrand: 'Java',
    saddleBrand: 'Java Sport',
    seatpostDia: '27.2mm',
    gripsBrand: 'Java Ergonomic',
    stemLength: '80mm',
    availableAt: ['Java Bikes India', 'Amazon.in', 'Cycling Boutiques'],
  },
  OMO: {
    frameType: '6061 Aluminum',
    forkBrand: 'Rigid Aluminum',
    rimBrand: 'OMO Alloy',
    tireBrand: 'Kenda',
    handlebarBrand: 'OMO',
    saddleBrand: 'OMO Comfort',
    seatpostDia: '27.2mm',
    gripsBrand: 'OMO Ergonomic',
    stemLength: '70mm',
    availableAt: ['OMOBikes.com', 'Amazon.in'],
  },
  Kross: {
    frameType: '6061 Aluminum',
    forkBrand: 'Zoom',
    rimBrand: 'Kross Alloy',
    tireBrand: 'Kenda',
    handlebarBrand: 'Kross',
    saddleBrand: 'Selle Royal',
    seatpostDia: '27.2mm',
    gripsBrand: 'Kross Ergonomic',
    stemLength: '80mm',
    availableAt: ['Kross India Dealers', 'Amazon.in', 'Flipkart'],
  },
}

const CATEGORY_TERRAIN = {
  MTB: ['trail', 'dirt', 'gravel', 'mountain'],
  Road: ['road', 'pavement', 'tarmac'],
  Hybrid: ['city', 'trail', 'pavement'],
  Gravel: ['gravel', 'dirt', 'road'],
  City: ['city', 'pavement', 'urban'],
  Electric: ['city', 'road', 'trail'],
  BMX: ['skateparks', 'dirt jumps', 'street'],
  Touring: ['road', 'gravel', 'mixed terrain'],
  Urban: ['city', 'pavement', 'urban'],
}

const CATEGORY_SKILLS = {
  MTB: { low: 'beginner', mid: 'intermediate', high: 'advanced' },
  Road: { low: 'beginner', mid: 'intermediate', high: 'advanced' },
  Hybrid: { low: 'beginner', mid: 'beginner', high: 'intermediate' },
  Gravel: { low: 'intermediate', mid: 'intermediate', high: 'advanced' },
  City: { low: 'beginner', mid: 'beginner', high: 'beginner' },
  Electric: { low: 'beginner', mid: 'beginner', high: 'intermediate' },
  BMX: { low: 'intermediate', mid: 'advanced', high: 'expert' },
  Touring: { low: 'intermediate', mid: 'intermediate', high: 'advanced' },
  Urban: { low: 'beginner', mid: 'beginner', high: 'beginner' },
}

function priceToNumber(p) {
  if (!p) return 0
  return parseInt(String(p).replace(/[₹$,\s]/g, ''), 10) || 0
}

function priceTier(priceInr) {
  const n = priceToNumber(priceInr)
  if (n < 15000) return 'low'
  if (n < 60000) return 'mid'
  return 'high'
}

function getGroupset(cycle) {
  const g = cycle.groupset || 'Shimano Tourney'
  return g
}

function getSpeeds(cycle) {
  const s = cycle.speeds
  if (typeof s === 'number') return s
  if (typeof s === 'string') return parseInt(s, 10) || 21
  return 21
}

function getWheelSize(cycle) {
  return cycle.wheelSize || '27.5"'
}

function getForkTravel(category, priceTierVal) {
  if (category === 'Road' || category === 'City' || category === 'Urban') return 'Rigid'
  if (category === 'Gravel') return priceTierVal === 'high' ? '40mm' : 'Rigid'
  if (priceTierVal === 'low') return '80mm'
  if (priceTierVal === 'mid') return '100mm'
  return '120mm'
}

function getForkType(category) {
  if (category === 'Road' || category === 'City' || category === 'Urban') return 'Rigid'
  return 'Suspension'
}

function getForkModel(forkBrand, category, priceTierVal) {
  if (category === 'Road' || category === 'City') return 'Rigid Fork'
  if (forkBrand === 'SR Suntour') {
    if (priceTierVal === 'low') return 'XCT 30'
    if (priceTierVal === 'mid') return 'XCE 28'
    return 'XCR 32'
  }
  if (forkBrand === 'Zoom') {
    if (priceTierVal === 'low') return 'Zoom CH-386'
    return 'Zoom CH-565'
  }
  return `${forkBrand} Standard`
}

function getBrakeType(cycle) {
  const b = cycle.brakes || 'Mechanical Disc'
  return b
}

function getBrakeBrand(brakeType, brand, priceTierVal) {
  if (brakeType.includes('Hydraulic')) {
    if (priceTierVal === 'high') return 'Shimano Deore'
    return 'Tektro HD-M275'
  }
  if (brakeType.includes('Mechanical Disc')) {
    if (priceTierVal === 'mid') return 'Tektro MD-M280'
    return 'Shimano BR-MT200'
  }
  return 'Promax V-Brake'
}

function enrichCycle(c) {
  if (c.frame && typeof c.frame === 'object' && c.frame.material) {
    return c // already enriched (from API)
  }

  const brand = c.brand || 'Unknown'
  const specs = BRAND_SPEC_DB[brand] || BRAND_SPEC_DB['Hero']
  const category = c.category || 'MTB'
  const tier = priceTier(c.price_inr)
  const groupset = getGroupset(c)
  const speeds = getSpeeds(c)
  const wheelSize = getWheelSize(c)
  const forkBrandName = (typeof c.fork === 'string' && c.fork) ? c.fork.split(' ')[0] : specs.forkBrand
  const forkFullName = (typeof c.fork === 'string' && c.fork) ? c.fork : `${specs.forkBrand} XCT`
  const brakeType = getBrakeType(c)
  const brakeBrand = getBrakeBrand(brakeType, brand, tier)
  const terrain = c.terrain || CATEGORY_TERRAIN[category] || ['trail', 'city']
  const skillMap = CATEGORY_SKILLS[category] || CATEGORY_SKILLS['MTB']
  const skillLevel = c.skillLevel || skillMap[tier] || 'beginner'

  const primaryUseMap = {
    MTB: 'Mountain trail riding and off-road adventures',
    Road: 'Road cycling, fitness rides and long-distance touring',
    Hybrid: 'City commuting with light trail capability',
    Gravel: 'Mixed-surface riding on gravel roads and trails',
    City: 'Urban commuting and casual city rides',
    Electric: 'Assisted riding for commute and recreation',
    BMX: 'Freestyle riding and BMX racing',
    Touring: 'Long-distance touring and bikepacking',
    Urban: 'Daily urban commuting and short rides',
  }

  const idealForMap = {
    MTB: tier === 'low' ? 'Beginners looking to explore trails on a budget' : tier === 'mid' ? 'Intermediate riders wanting a reliable trail companion' : 'Serious trail riders and competitive racers',
    Road: tier === 'low' ? 'Fitness riders and weekend warriors' : tier === 'mid' ? 'Club riders and century-distance enthusiasts' : 'Competitive racers and dedicated road cyclists',
    Hybrid: 'Commuters who want versatility for city roads and light trails',
    Gravel: 'Adventure riders exploring unpaved roads and mixed terrain',
    City: 'Daily commuters and leisure riders in urban environments',
    Electric: 'Commuters wanting assisted pedaling for longer distances',
    BMX: 'Freestyle riders and BMX enthusiasts',
    Touring: 'Long-distance tourers and bikepackers',
    Urban: 'City dwellers needing reliable daily transportation',
  }

  const notForMap = {
    MTB: tier === 'low' ? 'Extreme downhill or technical enduro riding' : tier === 'mid' ? 'Professional DH racing or extreme freeride' : 'Casual city commuting (overkill)',
    Road: 'Off-road trails, gravel paths or mountain biking',
    Hybrid: 'Serious mountain biking or competitive road racing',
    Gravel: 'Technical mountain trails or velodrome racing',
    City: 'Mountain trails, racing, or off-road cycling',
    Electric: 'Professional racing or extreme mountain biking',
    BMX: 'Long-distance touring or road racing',
    Touring: 'Competitive racing or technical mountain biking',
    Urban: 'Trail riding, racing, or off-road adventures',
  }

  const prosDB = {
    MTB: {
      low: [
        'Excellent entry-level price point for beginners',
        'Durable frame that handles everyday trail abuse',
        'Reliable Shimano drivetrain for smooth shifting',
        'Mechanical disc brakes for confident stopping',
        'Wide tire clearance for various terrain types',
      ],
      mid: [
        'Responsive handling on technical trail sections',
        'Quality suspension fork absorbs bumps effectively',
        'Shimano drivetrain offers precise gear changes',
        'Hydraulic disc brakes provide powerful stopping',
        'Lightweight aluminum frame for efficient climbing',
      ],
      high: [
        'Premium components rival bikes costing much more',
        'Advanced suspension technology smooths rough terrain',
        'Carbon-level stiffness with aluminum weight savings',
        'Top-tier drivetrain ensures flawless shifting under load',
        'Race-ready geometry for competitive trail events',
      ],
    },
    Road: {
      low: [
        'Lightweight frame makes climbing easier',
        'Drop-bar ergonomics for multiple hand positions',
        'Reliable Shimano groupset for consistent shifting',
        'Great introduction to road cycling',
        'Aerodynamic frame design cuts through wind',
      ],
      mid: [
        'Endurance geometry for all-day comfort',
        'Quality components from respected brands',
        'Versatile enough for club rides and sportives',
        'Carbon fork dampens road vibration effectively',
        'Smooth-rolling tires for speed on tarmac',
      ],
      high: [
        'Professional-grade components throughout',
        'Ultra-lightweight frame for explosive acceleration',
        'Aero-optimized design for racing performance',
        'Electronic-ready frame for future upgrades',
        'Premium carbon fork absorbs all road chatter',
      ],
    },
    Hybrid: {
      low: [
        'Versatile design handles roads and light trails',
        'Upright riding position for comfortable commuting',
        'Durable construction for daily use',
        'Budget-friendly price with quality components',
        'Wide gear range covers flats and hills',
      ],
      mid: [
        'Perfect balance of speed and comfort',
        'Quality hydraulic brakes for safe stopping',
        'Lightweight frame responds well to pedaling',
        'Mounts for racks and fenders add utility',
        'Smooth-rolling tires on pavement with trail grip',
      ],
      high: [
        'Premium fitness hybrid for serious commuters',
        'Carbon fork reduces weight and road vibration',
        'Internal cable routing for clean aesthetics',
        'High-end drivetrain with wide gear range',
        'Confident handling at speed on varied surfaces',
      ],
    },
  }

  const consDB = {
    MTB: {
      low: [
        'Basic suspension lacks adjustment options',
        'Heavy compared to higher-tier models',
        'Components may need earlier replacement with heavy use',
      ],
      mid: [
        'Heavier than carbon alternatives',
        'Fork may bottom out on aggressive descents',
        'Contact points could benefit from upgrades',
      ],
      high: [
        'High price limits accessibility',
        'Overkill for casual riders and commuters',
        'Premium parts require specialized service',
      ],
    },
    Road: {
      low: [
        'Narrow tires limit off-road capability',
        'Basic groupset may struggle on steep climbs',
        'Aggressive geometry not suited for leisure riding',
      ],
      mid: [
        'Not suitable for unpaved roads or trails',
        'Rim brakes less powerful in wet conditions',
        'Position may cause back strain for beginners',
      ],
      high: [
        'Extremely expensive for recreational use',
        'Fragile components vulnerable to crash damage',
        'Requires premium maintenance and specialized tools',
      ],
    },
    Hybrid: {
      low: [
        'Not fast enough for serious road cycling',
        'Limited suspension for rough off-road trails',
        'Basic components wear faster under heavy use',
      ],
      mid: [
        'Jack of all trades, master of none',
        'Heavier than dedicated road bikes',
        'Not capable on technical mountain trails',
      ],
      high: [
        'Premium price for a non-specialized bike',
        'Cannot replace a dedicated MTB or road bike',
        'Limited aftermarket upgrade options',
      ],
    },
  }

  function getCyclePros(cat, t) {
    const catPros = prosDB[cat] || prosDB['Hybrid']
    return catPros[t] || catPros['mid'] || [
      'Reliable build quality',
      'Good value for money',
      'Suitable for its intended purpose',
      'Backed by brand warranty',
    ]
  }

  function getCycleCons(cat, t) {
    const catCons = consDB[cat] || consDB['Hybrid']
    return catCons[t] || catCons['mid'] || [
      'Limited advanced features',
      'Heavy compared to premium models',
      'Basic component specification',
    ]
  }

  const priceNum = priceToNumber(c.price_inr)

  return {
    ...c,
    skillLevel,
    terrain,
    overview: {
      history: `The ${c.fullName || `${brand} ${c.name}`} is a ${category.toLowerCase()} bicycle by ${brand}, designed for ${primaryUseMap[category] || 'versatile riding'}. Known for ${brand}'s commitment to quality and innovation, this model offers excellent value in the ${tier === 'low' ? 'entry-level' : tier === 'mid' ? 'mid-range' : 'premium'} segment.`,
      primaryUse: primaryUseMap[category] || 'Versatile riding',
      skillLevel: skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1),
      idealFor: idealForMap[category] || 'Riders looking for quality cycling',
      notFor: notForMap[category] || 'Extreme specialized disciplines',
      terrain,
    },
    frame: {
      material: (typeof c.frame === 'string' ? c.frame : 'Aluminum') || 'Aluminum',
      type: specs.frameType,
      geometry: category === 'Road' ? 'Endurance' : category === 'MTB' ? 'Trail' : 'Upright Comfort',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      internalCableRouting: tier === 'high',
      dropperPostReady: category === 'MTB' && tier !== 'low',
    },
    fork: {
      type: getForkType(category),
      brand: forkBrandName,
      model: getForkModel(forkBrandName, category, tier),
      travel: getForkTravel(category, tier),
      material: tier === 'high' ? 'Aluminum Stanchions / Magnesium Lowers' : 'Steel / Aluminum',
    },
    wheels: {
      size: wheelSize,
      front: {
        rimBrand: specs.rimBrand,
        tireSize: wheelSize.replace('"', '') + ' x ' + (category === 'Road' ? '28c' : category === 'MTB' ? '2.25"' : '1.75"'),
        tireBrand: specs.tireBrand,
        tireModel: `${specs.tireBrand} ${category === 'MTB' ? 'XR2' : category === 'Road' ? 'R1' : 'H2'}`,
        tubelessReady: tier === 'high',
        valveType: tier === 'high' ? 'Presta' : 'Schrader',
      },
      rear: {
        rimBrand: specs.rimBrand,
        tireSize: wheelSize.replace('"', '') + ' x ' + (category === 'Road' ? '28c' : category === 'MTB' ? '2.25"' : '1.75"'),
        tireBrand: specs.tireBrand,
        tubelessReady: tier === 'high',
        valveType: tier === 'high' ? 'Presta' : 'Schrader',
      },
    },
    drivetrain: {
      groupset,
      speeds,
      shifterBrand: groupset.split(' ')[0] || 'Shimano',
      shifterModel: groupset,
      frontDerailleur: speeds > 9 ? groupset : 'N/A (1x drivetrain)',
      rearDerailleur: groupset,
      cranksetBrand: groupset.split(' ')[0] || 'Shimano',
      cranksetModel: `${groupset} ${speeds > 18 ? '3x' : speeds > 9 ? '2x' : '1x'} Crankset`,
      chainringSize: speeds > 18 ? '48/38/28T' : speeds > 9 ? '36/22T' : '32T',
      cassetteRange: speeds > 18 ? '11-34T' : speeds > 9 ? '11-42T' : '11-46T',
      chainBrand: 'KMC',
      pedalIncluded: tier !== 'high',
    },
    brakes: {
      type: brakeType,
      front: `${brakeBrand} ${brakeType}`,
      rear: `${brakeBrand} ${brakeType}`,
      rotorSizeFront: brakeType.includes('Disc') ? (tier === 'high' ? '180mm' : '160mm') : 'N/A',
      rotorSizeRear: brakeType.includes('Disc') ? '160mm' : 'N/A',
      padType: brakeType.includes('Disc') ? (brakeType.includes('Hydraulic') ? 'Resin' : 'Semi-Metallic') : 'Rubber',
    },
    cockpit: {
      handlebarBrand: specs.handlebarBrand,
      handlebarWidth: category === 'MTB' ? '720mm' : category === 'Road' ? '420mm' : '620mm',
      stemLength: specs.stemLength,
      gripsBrand: specs.gripsBrand,
      saddleBrand: specs.saddleBrand.split(' ')[0],
      saddleModel: specs.saddleBrand,
      seatpostDiameter: specs.seatpostDia,
      dropperPost: category === 'MTB' && tier === 'high',
      dropperTravel: '125mm',
    },
    pricing: {
      mrp_inr: c.price_inr || '₹32,000',
      mrp_usd: c.price_usd || '$385',
      street_inr: `₹${Math.round(priceNum * 0.9).toLocaleString('en-IN')}`,
      segment: tier === 'low' ? 'Budget' : tier === 'mid' ? 'Mid-Range' : 'Premium',
      availableAt: specs.availableAt,
    },
    maintenance: {
      serviceInterval: tier === 'high' ? 'Every 500km or 3 months' : 'Every 1000km or 6 months',
      chainLubeFreq: 'Every 200km or after wet rides',
      annualCost_inr: tier === 'low' ? '₹2,000 - ₹3,500' : tier === 'mid' ? '₹3,500 - ₹6,000' : '₹6,000 - ₹12,000',
      spareAvailability: brand === 'Hero' || brand === 'Hercules' ? 'Excellent — widely available' : brand === 'Trek' || brand === 'Giant' || brand === 'Specialized' ? 'Good — through authorized dealers' : 'Moderate — may need to order online',
      commonIssues: category === 'MTB' ? [
        'Suspension fork requires periodic servicing',
        'Chain stretch after heavy trail use',
        'Brake pads wear faster on muddy trails',
      ] : category === 'Road' ? [
        'Tire punctures from road debris',
        'Cable stretch requiring re-indexing',
        'Brake pad contamination in wet weather',
      ] : [
        'Tire pressure loss over time',
        'Brake cable stretch requiring adjustment',
        'Chain wear from daily commuting',
      ],
    },
    upgrades: [
      {
        part: 'Tires',
        priority: 'high',
        suggestion: category === 'MTB' ? 'Maxxis Minion DHF / Ardent Race' : category === 'Road' ? 'Continental Grand Prix 5000' : 'Schwalbe Marathon Plus',
        reason: 'Better grip, lower rolling resistance, and improved durability',
        cost_inr: category === 'MTB' ? '₹3,500 - ₹5,500 per tire' : '₹4,000 - ₹7,000 per tire',
      },
      {
        part: 'Saddle',
        priority: 'medium',
        suggestion: 'Selle Italia X1 or WTB Volt',
        reason: 'Improved comfort for longer rides with better padding and shape',
        cost_inr: '₹2,500 - ₹5,000',
      },
      {
        part: 'Grips / Bar Tape',
        priority: 'medium',
        suggestion: category === 'Road' ? 'Lizard Skins DSP Bar Tape' : 'Ergon GA2 Lock-On Grips',
        reason: 'Better vibration damping and hand comfort on long rides',
        cost_inr: '₹1,200 - ₹2,800',
      },
      ...(category === 'MTB' ? [{
        part: 'Pedals',
        priority: 'high',
        suggestion: 'Shimano M520 SPD or RaceFace Chester',
        reason: 'Better foot retention and power transfer on trails',
        cost_inr: '₹2,000 - ₹4,500',
      }] : []),
    ],
    versions: [
      {
        year: '2024',
        price_inr: c.price_inr || '₹32,000',
        changes: [
          'Updated color schemes and graphics',
          'Revised geometry for improved handling',
          `${tier === 'high' ? 'Upgraded drivetrain components' : 'Minor component spec updates'}`,
        ],
      },
      {
        year: '2023',
        price_inr: `₹${Math.round(priceNum * 0.95).toLocaleString('en-IN')}`,
        changes: [
          'Initial release of this generation',
          'New frame design with updated tubing',
          'Refreshed component specification',
        ],
      },
      {
        year: '2022',
        price_inr: `₹${Math.round(priceNum * 0.88).toLocaleString('en-IN')}`,
        changes: [
          'Previous generation model',
          'Different frame geometry',
          'Older component spec throughout',
        ],
      },
    ],
    pros: getCyclePros(category, tier),
    cons: getCycleCons(category, tier),
  }
}

export default enrichCycle
