const trekCycles = [
  {
    id: "trek-marlin-4",
    name: "Marlin 4",
    brand: "Trek",
    fullName: "Trek Marlin 4 Gen 3",
    category: "mountain",
    type: "hardtail",
    year: 2024,
    tags: ["entry-level", "trail", "hardtail", "aluminum"],
    overview: {
      history: "The Marlin series has been Trek's entry-level mountain bike line for over a decade, designed to introduce new riders to trail riding.",
      primaryUse: "Light trail riding and bike path cycling",
      skillLevel: "beginner",
      terrain: "packed dirt, gravel paths, light trails",
      idealFor: "New mountain bikers, fitness riders, daily commuters",
      notFor: "aggressive downhill riding, technical rock gardens"
    },
    frame: {
      material: "Alpha Silver Aluminum",
      type: "Hardtail",
      geometry: "Trail Geometry",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: false
    },
    fork: {
      type: "SR Suntour XCT 30",
      material: "Steel",
      travel: 100,
      brand: "SR Suntour",
      model: "XCT 30"
    },
    wheels: {
      size: "27.5\"/29\"",
      front: {
        rimBrand: "Alex MD-25",
        tireSize: "29x2.20",
        tireBrand: "Bontrager",
        tireModel: "XR2 Comp",
        tubelessReady: false,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Alex MD-25",
        tireSize: "29x2.20",
        tireBrand: "Bontrager",
        tireModel: "XR2 Comp",
        tubelessReady: false,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano CUES U4000",
      speeds: 9,
      shifterBrand: "Shimano",
      shifterModel: "CUES U4000",
      frontDerailleur: "Shimano CUES U4000",
      rearDerailleur: "Shimano CUES U4000",
      cranksetBrand: "Trek",
      chainringSize: "38T",
      cassetteRange: "11-36T",
      chainBrand: "KMC",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Tektro HD-M275",
      rear: "Tektro HD-M275",
      rotorSizeFront: 180,
      rotorSizeRear: 160,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 720,
      stemLength: 60,
      saddleBrand: "Bontrager",
      saddleModel: "Saddle",
      seatpostDiameter: 31.6,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 49999,
      mrp_usd: 549,
      street_inr: 47999,
      segment: "entry",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Talon 3", "Specialized Rockhopper Sport"]
    },
    maintenance: {
      serviceInterval: "6 months",
      chainLubeFreq: "100 km",
      commonIssues: "Fork damping issues, brake pad wear",
      annualCost_inr: 8000,
      spareAvailability: "High"
    },
    pros: [
      "Confidence-inspiring geometry for beginners",
      "Reliable Shimano drivetrain",
      "Hydraulic disc brakes for great stopping power",
      "Available in wide size range including XXL"
    ],
    cons: [
      "Basic fork with limited adjustment",
      "Non-tubeless ready wheels",
      "Heavy aluminum frame",
      "No dropper post compatibility"
    ],
    versions: [
      {
        year: 2024,
        changes: "Updated to CUES drivetrain, new color options",
        price: 49999
      },
      {
        year: 2023,
        changes: "Shimano Altus drivetrain, minor geometry tweaks",
        price: 47999
      },
      {
        year: 2022,
        changes: "Tektro mechanical disc brakes, 21-speed drivetrain",
        price: 44999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Upgrade to air fork for better suspension performance"
      },
      {
        priority: "medium",
        description: "Tubeless conversion for better puncture resistance"
      },
      {
        priority: "medium",
        description: "Dropper post for improved descending control"
      },
      {
        priority: "low",
        description: "Lighter components for reduced weight"
      }
    ],
    skillLevel: "beginner",
    terrain: "light trails, bike paths, gravel"
  },
  {
    id: "trek-marlin-5",
    name: "Marlin 5",
    brand: "Trek",
    fullName: "Trek Marlin 5 Gen 3",
    category: "mountain",
    type: "hardtail",
    year: 2024,
    tags: ["entry-level", "trail", "hardtail", "aluminum"],
    overview: {
      history: "Step-up model from Marlin 4 with better components and 2x drivetrain for more gear range.",
      primaryUse: "Trail riding and fitness cycling",
      skillLevel: "beginner to intermediate",
      terrain: "packed dirt, gravel paths, moderate trails",
      idealFor: "Progressing riders, fitness enthusiasts, light touring",
      notFor: "extreme technical terrain, aggressive downhill"
    },
    frame: {
      material: "Alpha Silver Aluminum",
      type: "Hardtail",
      geometry: "Trail Geometry",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: false
    },
    fork: {
      type: "SR Suntour XCT 30",
      material: "Steel",
      travel: 100,
      brand: "SR Suntour",
      model: "XCT 30"
    },
    wheels: {
      size: "27.5\"/29\"",
      front: {
        rimBrand: "Alex MD-25",
        tireSize: "29x2.20",
        tireBrand: "Bontrager",
        tireModel: "XR2 Comp",
        tubelessReady: false,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Alex MD-25",
        tireSize: "29x2.20",
        tireBrand: "Bontrager",
        tireModel: "XR2 Comp",
        tubelessReady: false,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano CUES U4000",
      speeds: 18,
      shifterBrand: "Shimano",
      shifterModel: "CUES U4000",
      frontDerailleur: "Shimano CUES U4000",
      rearDerailleur: "Shimano CUES U4000",
      cranksetBrand: "Trek",
      chainringSize: "48/38T",
      cassetteRange: "11-34T",
      chainBrand: "KMC",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Tektro HD-M275",
      rear: "Tektro HD-M275",
      rotorSizeFront: 180,
      rotorSizeRear: 160,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 720,
      stemLength: 60,
      saddleBrand: "Bontrager",
      saddleModel: "Saddle",
      seatpostDiameter: 31.6,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 59999,
      mrp_usd: 649,
      street_inr: 57999,
      segment: "entry",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Talon 2", "Specialized Rockhopper Comp"]
    },
    maintenance: {
      serviceInterval: "6 months",
      chainLubeFreq: "100 km",
      commonIssues: "Front derailleur adjustment, fork damping",
      annualCost_inr: 9000,
      spareAvailability: "High"
    },
    pros: [
      "2x drivetrain provides better gear range",
      "Same reliable frame as higher models",
      "Hydraulic disc brakes",
      "Good value for component level"
    ],
    cons: [
      "Still basic fork with limited adjustment",
      "Non-tubeless ready wheels",
      "Heavier due to 2x drivetrain",
      "No dropper post compatibility"
    ],
    versions: [
      {
        year: 2024,
        changes: "CUES drivetrain upgrade, new colors",
        price: 59999
      },
      {
        year: 2023,
        changes: "Shimano Altus 2x drivetrain",
        price: 56999
      },
      {
        year: 2022,
        changes: "Shimano 21-speed with front derailleur",
        price: 52999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Air fork upgrade for better suspension"
      },
      {
        priority: "medium",
        description: "Tubeless conversion"
      },
      {
        priority: "medium",
        description: "1x drivetrain conversion for simplicity"
      },
      {
        priority: "low",
        description: "Lighter wheelset"
      }
    ],
    skillLevel: "beginner",
    terrain: "light to moderate trails, bike paths"
  },
  {
    id: "trek-marlin-6",
    name: "Marlin 6",
    brand: "Trek",
    fullName: "Trek Marlin 6 Gen 3",
    category: "mountain",
    type: "hardtail",
    year: 2024,
    tags: ["intermediate", "trail", "hardtail", "aluminum"],
    overview: {
      history: "Mid-range Marlin with better fork and 1x drivetrain for simplified operation.",
      primaryUse: "Trail riding and singletrack adventures",
      skillLevel: "intermediate",
      terrain: "singletrack, forest trails, moderate technical sections",
      idealFor: "Trail riders seeking simplicity, bikepackers, all-terrain commuters",
      notFor: "extreme downhill, aggressive enduro racing"
    },
    frame: {
      material: "Alpha Silver Aluminum",
      type: "Hardtail",
      geometry: "Trail Geometry",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: true
    },
    fork: {
      type: "SR Suntour XCE",
      material: "Aluminum",
      travel: 100,
      brand: "SR Suntour",
      model: "XCE"
    },
    wheels: {
      size: "27.5\"/29\"",
      front: {
        rimBrand: "Bontrager Connection",
        tireSize: "29x2.20",
        tireBrand: "Bontrager",
        tireModel: "XR2 Comp",
        tubelessReady: true,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Connection",
        tireSize: "29x2.20",
        tireBrand: "Bontrager",
        tireModel: "XR2 Comp",
        tubelessReady: true,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano Deore",
      speeds: 10,
      shifterBrand: "Shimano",
      shifterModel: "Deore M4100",
      frontDerailleur: "None",
      rearDerailleur: "Shimano Deore M4100",
      cranksetBrand: "Praxis",
      chainringSize: "32T",
      cassetteRange: "11-46T",
      chainBrand: "KMC",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Shimano MT200",
      rear: "Shimano MT200",
      rotorSizeFront: 180,
      rotorSizeRear: 180,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 750,
      stemLength: 60,
      saddleBrand: "Bontrager",
      saddleModel: "Saddle",
      seatpostDiameter: 31.6,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 79999,
      mrp_usd: 849,
      street_inr: 77999,
      segment: "mid",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Talon 1", "Specialized Rockhopper Expert"]
    },
    maintenance: {
      serviceInterval: "6 months",
      chainLubeFreq: "150 km",
      commonIssues: "Fork seal leaks, brake bleeding",
      annualCost_inr: 12000,
      spareAvailability: "High"
    },
    pros: [
      "Simple and reliable 1x drivetrain",
      "Tubeless ready wheels",
      "Dropper post compatible",
      "Better quality fork than lower models"
    ],
    cons: [
      "Still entry-level fork performance",
      "Heavy aluminum frame",
      "Basic hydraulic brakes",
      "No included dropper post"
    ],
    versions: [
      {
        year: 2024,
        changes: "Deore 1x drivetrain, tubeless ready wheels",
        price: 79999
      },
      {
        year: 2023,
        changes: "Shimano 1x9 drivetrain, basic fork",
        price: 69999
      },
      {
        year: 2022,
        changes: "2x drivetrain, non-tubeless wheels",
        price: 64999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Upgrade to RockShox Judy air fork"
      },
      {
        priority: "medium",
        description: "Add dropper post for descending confidence"
      },
      {
        priority: "medium",
        description: "Upgrade to SLX brakes for better modulation"
      },
      {
        priority: "low",
        description: "Carbon handlebar for vibration damping"
      }
    ],
    skillLevel: "intermediate",
    terrain: "singletrack, forest trails, light technical"
  },
  {
    id: "trek-marlin-7",
    name: "Marlin 7",
    brand: "Trek",
    fullName: "Trek Marlin 7 Gen 3",
    category: "mountain",
    type: "hardtail",
    year: 2024,
    tags: ["intermediate", "trail", "hardtail", "aluminum"],
    overview: {
      history: "Higher-end Marlin with air fork and better components for serious trail riding.",
      primaryUse: "Technical trail riding and mountain bike adventures",
      skillLevel: "intermediate to advanced",
      terrain: "technical singletrack, forest trails, moderate rock gardens",
      idealFor: "Serious trail riders, bikepackers, all-mountain enthusiasts",
      notFor: "extreme enduro racing, aggressive downhill"
    },
    frame: {
      material: "Alpha Silver Aluminum",
      type: "Hardtail",
      geometry: "Trail Geometry",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: true
    },
    fork: {
      type: "SR Suntour Raidon",
      material: "Aluminum",
      travel: 100,
      brand: "SR Suntour",
      model: "Raidon"
    },
    wheels: {
      size: "27.5\"/29\"",
      front: {
        rimBrand: "Bontrager Line Comp",
        tireSize: "29x2.40",
        tireBrand: "Bontrager",
        tireModel: "XR3 Team Issue",
        tubelessReady: true,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Line Comp",
        tireSize: "29x2.40",
        tireBrand: "Bontrager",
        tireModel: "XR3 Team Issue",
        tubelessReady: true,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano Deore",
      speeds: 11,
      shifterBrand: "Shimano",
      shifterModel: "Deore M5100",
      frontDerailleur: "None",
      rearDerailleur: "Shimano Deore M5100",
      cranksetBrand: "Praxis",
      chainringSize: "32T",
      cassetteRange: "11-51T",
      chainBrand: "Shimano",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Shimano MT200",
      rear: "Shimano MT200",
      rotorSizeFront: 180,
      rotorSizeRear: 180,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 780,
      stemLength: 70,
      saddleBrand: "Bontrager",
      saddleModel: "Arvada",
      seatpostDiameter: 31.6,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 99999,
      mrp_usd: 1099,
      street_inr: 97999,
      segment: "mid",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Stance 1", "Specialized Stumpjumper ST Alloy"]
    },
    maintenance: {
      serviceInterval: "6 months",
      chainLubeFreq: "150 km",
      commonIssues: "Air fork maintenance, brake bleeding",
      annualCost_inr: 15000,
      spareAvailability: "High"
    },
    pros: [
      "Air fork for better suspension tuning",
      "Wide gear range with 11-51T cassette",
      "Tubeless ready with quality tires",
      "Dropper post compatible"
    ],
    cons: [
      "Still aluminum frame",
      "Basic hydraulic brakes",
      "No included dropper post",
      "Heavy compared to carbon alternatives"
    ],
    versions: [
      {
        year: 2024,
        changes: "Deore 11-speed, air fork, wider tires",
        price: 99999
      },
      {
        year: 2023,
        changes: "10-speed Deore, coil fork",
        price: 89999
      },
      {
        year: 2022,
        changes: "Shimano 1x10, basic fork",
        price: 79999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Add dropper post for descending performance"
      },
      {
        priority: "medium",
        description: "Upgrade to XT brakes for better power"
      },
      {
        priority: "medium",
        description: "Lighter wheelset upgrade"
      },
      {
        priority: "low",
        description: "Carbon cockpit components"
      }
    ],
    skillLevel: "intermediate",
    terrain: "technical trails, singletrack, forest paths"
  },
  {
    id: "trek-marlin-8",
    name: "Marlin 8",
    brand: "Trek",
    fullName: "Trek Marlin 8 Gen 3",
    category: "mountain",
    type: "hardtail",
    year: 2024,
    tags: ["advanced", "trail", "hardtail", "aluminum"],
    overview: {
      history: "Top-end Marlin with premium components and dropper post for serious trail performance.",
      primaryUse: "Aggressive trail riding and technical singletrack",
      skillLevel: "advanced",
      terrain: "technical trails, rock gardens, steep descents",
      idealFor: "Experienced trail riders, enduro beginners, aggressive all-mountain riders",
      notFor: "professional downhill racing, extreme freeride"
    },
    frame: {
      material: "Alpha Silver Aluminum",
      type: "Hardtail",
      geometry: "Trail Geometry",
      sizes: ["S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: true
    },
    fork: {
      type: "RockShox Judy",
      material: "Aluminum",
      travel: 100,
      brand: "RockShox",
      model: "Judy Silver TK"
    },
    wheels: {
      size: "27.5\"/29\"",
      front: {
        rimBrand: "Bontrager Line Comp",
        tireSize: "29x2.40",
        tireBrand: "Bontrager",
        tireModel: "XR4 Team Issue",
        tubelessReady: true,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Line Comp",
        tireSize: "29x2.40",
        tireBrand: "Bontrager",
        tireModel: "XR4 Team Issue",
        tubelessReady: true,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano SLX",
      speeds: 12,
      shifterBrand: "Shimano",
      shifterModel: "SLX M7100",
      frontDerailleur: "None",
      rearDerailleur: "Shimano SLX M7100",
      cranksetBrand: "Praxis",
      chainringSize: "32T",
      cassetteRange: "10-51T",
      chainBrand: "Shimano",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Shimano Deore",
      rear: "Shimano Deore",
      rotorSizeFront: 203,
      rotorSizeRear: 180,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 800,
      stemLength: 70,
      saddleBrand: "Bontrager",
      saddleModel: "Arvada",
      seatpostDiameter: 31.6,
      dropperPost: true
    },
    pricing: {
      mrp_inr: 129999,
      mrp_usd: 1399,
      street_inr: 127999,
      segment: "premium",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Stance 2", "Specialized Stumpjumper Comp Alloy"]
    },
    maintenance: {
      serviceInterval: "6 months",
      chainLubeFreq: "200 km",
      commonIssues: "Dropper post maintenance, fork servicing",
      annualCost_inr: 20000,
      spareAvailability: "High"
    },
    pros: [
      "RockShox Judy fork with better performance",
      "12-speed SLX drivetrain",
      "Included dropper post",
      "Wide, aggressive tires"
    ],
    cons: [
      "Still aluminum frame at premium price",
      "Basic Deore brakes for this price point",
      "Heavy compared to carbon bikes",
      "No internal cable routing"
    ],
    versions: [
      {
        year: 2024,
        changes: "SLX 12-speed, Judy fork, dropper post included",
        price: 129999
      },
      {
        year: 2023,
        changes: "11-speed Deore, Raidon fork, no dropper",
        price: 109999
      },
      {
        year: 2022,
        changes: "10-speed Deore, basic fork",
        price: 99999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Upgrade to XT brakes for better stopping power"
      },
      {
        priority: "medium",
        description: "Lighter carbon wheelset"
      },
      {
        priority: "medium",
        description: "Upgrade to Pike fork for premium performance"
      },
      {
        priority: "low",
        description: "Carbon handlebar and seatpost"
      }
    ],
    skillLevel: "advanced",
    terrain: "technical trails, aggressive singletrack, rock gardens"
  },
  {
    id: "trek-fx-1",
    name: "FX 1",
    brand: "Trek",
    fullName: "Trek FX 1",
    category: "hybrid",
    type: "fitness",
    year: 2024,
    tags: ["entry-level", "fitness", "hybrid", "aluminum"],
    overview: {
      history: "The FX series is Trek's best-selling fitness bike line, designed for efficient road riding with comfort features.",
      primaryUse: "Fitness riding and urban commuting",
      skillLevel: "beginner",
      terrain: "paved roads, bike paths, smooth gravel",
      idealFor: "Fitness enthusiasts, daily commuters, recreational riders",
      notFor: "off-road trails, technical terrain"
    },
    frame: {
      material: "Alpha Aluminum",
      type: "Fitness Hybrid",
      geometry: "Fitness Geometry",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: false
    },
    fork: {
      type: "Rigid",
      material: "Steel",
      travel: 0,
      brand: "Trek",
      model: "FX Fork"
    },
    wheels: {
      size: "700c",
      front: {
        rimBrand: "Bontrager Connection",
        tireSize: "700x35c",
        tireBrand: "Bontrager",
        tireModel: "H2 Hard-Case",
        tubelessReady: false,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Connection",
        tireSize: "700x35c",
        tireBrand: "Bontrager",
        tireModel: "H2 Hard-Case",
        tubelessReady: false,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano CUES",
      speeds: 9,
      shifterBrand: "Shimano",
      shifterModel: "CUES U4000",
      frontDerailleur: "Shimano CUES U4000",
      rearDerailleur: "Shimano CUES U4000",
      cranksetBrand: "Trek",
      chainringSize: "48/38T",
      cassetteRange: "11-36T",
      chainBrand: "KMC",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Tektro HD-M275",
      rear: "Tektro HD-M275",
      rotorSizeFront: 160,
      rotorSizeRear: 160,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 680,
      stemLength: 70,
      saddleBrand: "Bontrager",
      saddleModel: "Saddle",
      seatpostDiameter: 27.2,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 44999,
      mrp_usd: 499,
      street_inr: 42999,
      segment: "entry",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Escape 3", "Specialized Sirrus 2.0"]
    },
    maintenance: {
      serviceInterval: "12 months",
      chainLubeFreq: "200 km",
      commonIssues: "Brake pad wear, tire punctures",
      annualCost_inr: 6000,
      spareAvailability: "High"
    },
    pros: [
      "Comfortable upright riding position",
      "Reliable Shimano drivetrain",
      "Hydraulic disc brakes",
      "Available in wide size range"
    ],
    cons: [
      "Heavy steel fork",
      "Non-tubeless ready wheels",
      "Basic component level",
      "Limited gear range for steep hills"
    ],
    versions: [
      {
        year: 2024,
        changes: "CUES drivetrain, hydraulic disc brakes",
        price: 44999
      },
      {
        year: 2023,
        changes: "Shimano Altus, mechanical disc brakes",
        price: 39999
      },
      {
        year: 2022,
        changes: "21-speed drivetrain, V-brakes",
        price: 34999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Upgrade to carbon fork for weight reduction"
      },
      {
        priority: "medium",
        description: "Tubeless conversion for puncture resistance"
      },
      {
        priority: "medium",
        description: "Lighter wheelset upgrade"
      },
      {
        priority: "low",
        description: "Ergonomic grips and saddle upgrade"
      }
    ],
    skillLevel: "beginner",
    terrain: "paved roads, bike paths, smooth gravel"
  },
  {
    id: "trek-fx-2",
    name: "FX 2",
    brand: "Trek",
    fullName: "Trek FX 2",
    category: "hybrid",
    type: "fitness",
    year: 2024,
    tags: ["intermediate", "fitness", "hybrid", "aluminum"],
    overview: {
      history: "Step-up FX model with carbon fork and better components for serious fitness riding.",
      primaryUse: "Advanced fitness training and fast commuting",
      skillLevel: "intermediate",
      terrain: "paved roads, bike paths, light gravel",
      idealFor: "Fitness enthusiasts, serious commuters, recreational racers",
      notFor: "technical off-road trails"
    },
    frame: {
      material: "Alpha Aluminum",
      type: "Fitness Hybrid",
      geometry: "Fitness Geometry",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: false
    },
    fork: {
      type: "Rigid",
      material: "Carbon",
      travel: 0,
      brand: "Trek",
      model: "Carbon Fork"
    },
    wheels: {
      size: "700c",
      front: {
        rimBrand: "Bontrager Connection",
        tireSize: "700x35c",
        tireBrand: "Bontrager",
        tireModel: "H2 Hard-Case",
        tubelessReady: false,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Connection",
        tireSize: "700x35c",
        tireBrand: "Bontrager",
        tireModel: "H2 Hard-Case",
        tubelessReady: false,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano Acera",
      speeds: 16,
      shifterBrand: "Shimano",
      shifterModel: "Acera",
      frontDerailleur: "Shimano Acera",
      rearDerailleur: "Shimano Acera",
      cranksetBrand: "Trek",
      chainringSize: "48/38/28T",
      cassetteRange: "11-32T",
      chainBrand: "KMC",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Shimano MT200",
      rear: "Shimano MT200",
      rotorSizeFront: 160,
      rotorSizeRear: 160,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 700,
      stemLength: 70,
      saddleBrand: "Bontrager",
      saddleModel: "Saddle",
      seatpostDiameter: 27.2,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 64999,
      mrp_usd: 699,
      street_inr: 62999,
      segment: "mid",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Escape 2", "Specialized Sirrus 3.0"]
    },
    maintenance: {
      serviceInterval: "12 months",
      chainLubeFreq: "250 km",
      commonIssues: "Brake bleeding, tire wear",
      annualCost_inr: 8000,
      spareAvailability: "High"
    },
    pros: [
      "Lightweight carbon fork",
      "3x drivetrain for wide gear range",
      "Shimano hydraulic brakes",
      "Comfortable yet efficient geometry"
    ],
    cons: [
      "Still non-tubeless ready wheels",
      "Heavy aluminum frame",
      "Acera components are entry-level",
      "Basic cockpit components"
    ],
    versions: [
      {
        year: 2024,
        changes: "Carbon fork, hydraulic brakes, 3x drivetrain",
        price: 64999
      },
      {
        year: 2023,
        changes: "Acera 2x, mechanical disc brakes",
        price: 54999
      },
      {
        year: 2022,
        changes: "Shimano 21-speed, V-brakes",
        price: 49999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Tubeless ready wheelset upgrade"
      },
      {
        priority: "medium",
        description: "1x drivetrain conversion for simplicity"
      },
      {
        priority: "medium",
        description: "Lighter cockpit components"
      },
      {
        priority: "low",
        description: "Performance saddle upgrade"
      }
    ],
    skillLevel: "intermediate",
    terrain: "paved roads, bike paths, light gravel"
  },
  {
    id: "trek-fx-3",
    name: "FX 3",
    brand: "Trek",
    fullName: "Trek FX 3",
    category: "hybrid",
    type: "fitness",
    year: 2024,
    tags: ["advanced", "fitness", "hybrid", "aluminum"],
    overview: {
      history: "High-end FX with premium components and tubeless ready wheels for performance riding.",
      primaryUse: "Performance fitness riding and fast commuting",
      skillLevel: "advanced",
      terrain: "paved roads, bike paths, gravel roads",
      idealFor: "Performance riders, serious commuters, fitness enthusiasts",
      notFor: "technical mountain bike trails"
    },
    frame: {
      material: "Alpha Aluminum",
      type: "Fitness Hybrid",
      geometry: "Fitness Geometry",
      sizes: ["S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: false
    },
    fork: {
      type: "Rigid",
      material: "Carbon",
      travel: 0,
      brand: "Trek",
      model: "Carbon Fork"
    },
    wheels: {
      size: "700c",
      front: {
        rimBrand: "Bontrager Affinity",
        tireSize: "700x32c",
        tireBrand: "Bontrager",
        tireModel: "H5 Hard-Case Lite",
        tubelessReady: true,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Affinity",
        tireSize: "700x32c",
        tireBrand: "Bontrager",
        tireModel: "H5 Hard-Case Lite",
        tubelessReady: true,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano Deore",
      speeds: 10,
      shifterBrand: "Shimano",
      shifterModel: "Deore M4100",
      frontDerailleur: "None",
      rearDerailleur: "Shimano Deore M4100",
      cranksetBrand: "FSA",
      chainringSize: "46T",
      cassetteRange: "11-42T",
      chainBrand: "Shimano",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Shimano MT200",
      rear: "Shimano MT200",
      rotorSizeFront: 160,
      rotorSizeRear: 160,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 720,
      stemLength: 80,
      saddleBrand: "Bontrager",
      saddleModel: "Arvada",
      seatpostDiameter: 27.2,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 89999,
      mrp_usd: 999,
      street_inr: 87999,
      segment: "premium",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant FastRoad SL 2", "Specialized Sirrus X 4.0"]
    },
    maintenance: {
      serviceInterval: "12 months",
      chainLubeFreq: "300 km",
      commonIssues: "Tubeless setup, brake bleeding",
      annualCost_inr: 10000,
      spareAvailability: "High"
    },
    pros: [
      "Lightweight carbon fork",
      "Tubeless ready wheels",
      "Simple and reliable 1x drivetrain",
      "Performance-oriented geometry"
    ],
    cons: [
      "Premium price for aluminum frame",
      "Basic MT200 brakes",
      "27.2mm seatpost limits upgrade options",
      "No internal cable routing"
    ],
    versions: [
      {
        year: 2024,
        changes: "Deore 1x, tubeless ready wheels, carbon fork",
        price: 89999
      },
      {
        year: 2023,
        changes: "Shimano 2x, non-tubeless wheels",
        price: 74999
      },
      {
        year: 2022,
        changes: "Shimano 3x, basic wheels",
        price: 64999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Upgrade to XT brakes for better modulation"
      },
      {
        priority: "medium",
        description: "Lighter carbon wheelset"
      },
      {
        priority: "medium",
        description: "Carbon seatpost for vibration damping"
      },
      {
        priority: "low",
        description: "Aero cockpit components"
      }
    ],
    skillLevel: "advanced",
    terrain: "paved roads, bike paths, gravel roads"
  },
  {
    id: "trek-verve-1",
    name: "Verve 1",
    brand: "Trek",
    fullName: "Trek Verve 1",
    category: "hybrid",
    type: "comfort",
    year: 2024,
    tags: ["entry-level", "comfort", "hybrid", "aluminum"],
    overview: {
      history: "The Verve series focuses on comfort and ease of use for casual riders and commuters.",
      primaryUse: "Comfortable recreational riding and light commuting",
      skillLevel: "beginner",
      terrain: "paved roads, bike paths, smooth trails",
      idealFor: "Casual riders, older adults, comfort-focused commuters",
      notFor: "performance riding, technical trails"
    },
    frame: {
      material: "Alpha Aluminum",
      type: "Comfort Hybrid",
      geometry: "Comfort Geometry",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: false
    },
    fork: {
      type: "Rigid",
      material: "Steel",
      travel: 0,
      brand: "Trek",
      model: "Verve Fork"
    },
    wheels: {
      size: "700c",
      front: {
        rimBrand: "Bontrager Connection",
        tireSize: "700x45c",
        tireBrand: "Bontrager",
        tireModel: "H2 Hard-Case",
        tubelessReady: false,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Connection",
        tireSize: "700x45c",
        tireBrand: "Bontrager",
        tireModel: "H2 Hard-Case",
        tubelessReady: false,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano CUES",
      speeds: 9,
      shifterBrand: "Shimano",
      shifterModel: "CUES U4000",
      frontDerailleur: "Shimano CUES U4000",
      rearDerailleur: "Shimano CUES U4000",
      cranksetBrand: "Trek",
      chainringSize: "48/38T",
      cassetteRange: "11-36T",
      chainBrand: "KMC",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Tektro HD-M275",
      rear: "Tektro HD-M275",
      rotorSizeFront: 160,
      rotorSizeRear: 160,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 660,
      stemLength: 80,
      saddleBrand: "Bontrager",
      saddleModel: "Saddle",
      seatpostDiameter: 27.2,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 49999,
      mrp_usd: 549,
      street_inr: 47999,
      segment: "entry",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Sedona DX", "Specialized Roll Low-Entry"]
    },
    maintenance: {
      serviceInterval: "12 months",
      chainLubeFreq: "200 km",
      commonIssues: "Brake adjustment, tire pressure",
      annualCost_inr: 6000,
      spareAvailability: "High"
    },
    pros: [
      "Very comfortable upright riding position",
      "Wide tires for stability",
      "Step-through frame option available",
      "Reliable hydraulic disc brakes"
    ],
    cons: [
      "Heavy steel fork",
      "Non-tubeless ready wheels",
      "Basic component level",
      "Limited performance capability"
    ],
    versions: [
      {
        year: 2024,
        changes: "CUES drivetrain, hydraulic disc brakes",
        price: 49999
      },
      {
        year: 2023,
        changes: "Shimano 21-speed, mechanical disc brakes",
        price: 44999
      },
      {
        year: 2022,
        changes: "Shimano 21-speed, V-brakes",
        price: 39999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Upgrade to suspension seatpost for comfort"
      },
      {
        priority: "medium",
        description: "Ergonomic grips and saddle upgrade"
      },
      {
        priority: "medium",
        description: "Lighter wheelset"
      },
      {
        priority: "low",
        description: "Comfort handlebar upgrade"
      }
    ],
    skillLevel: "beginner",
    terrain: "paved roads, bike paths, smooth trails"
  },
  {
    id: "trek-verve-2",
    name: "Verve 2",
    brand: "Trek",
    fullName: "Trek Verve 2",
    category: "hybrid",
    type: "comfort",
    year: 2024,
    tags: ["intermediate", "comfort", "hybrid", "aluminum"],
    overview: {
      history: "Step-up Verve with suspension fork and better components for enhanced comfort.",
      primaryUse: "Comfortable long-distance riding and commuting",
      skillLevel: "intermediate",
      terrain: "paved roads, bike paths, light gravel",
      idealFor: "Comfort-focused riders, commuters, recreational cyclists",
      notFor: "performance riding, rough trails"
    },
    frame: {
      material: "Alpha Aluminum",
      type: "Comfort Hybrid",
      geometry: "Comfort Geometry",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: false
    },
    fork: {
      type: "Suspension",
      material: "Aluminum",
      travel: 63,
      brand: "SR Suntour",
      model: "NEX E25"
    },
    wheels: {
      size: "700c",
      front: {
        rimBrand: "Bontrager Connection",
        tireSize: "700x45c",
        tireBrand: "Bontrager",
        tireModel: "H2 Hard-Case",
        tubelessReady: false,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Connection",
        tireSize: "700x45c",
        tireBrand: "Bontrager",
        tireModel: "H2 Hard-Case",
        tubelessReady: false,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano Altus",
      speeds: 21,
      shifterBrand: "Shimano",
      shifterModel: "Altus",
      frontDerailleur: "Shimano Altus",
      rearDerailleur: "Shimano Altus",
      cranksetBrand: "Trek",
      chainringSize: "48/38/28T",
      cassetteRange: "11-32T",
      chainBrand: "KMC",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Shimano MT200",
      rear: "Shimano MT200",
      rotorSizeFront: 160,
      rotorSizeRear: 160,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 680,
      stemLength: 80,
      saddleBrand: "Bontrager",
      saddleModel: "Saddle",
      seatpostDiameter: 27.2,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 69999,
      mrp_usd: 749,
      street_inr: 67999,
      segment: "mid",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Sedona DX W", "Specialized Roll 2.0"]
    },
    maintenance: {
      serviceInterval: "12 months",
      chainLubeFreq: "250 km",
      commonIssues: "Suspension fork maintenance, brake bleeding",
      annualCost_inr: 8000,
      spareAvailability: "High"
    },
    pros: [
      "Suspension fork for comfort",
      "Wide gear range with 3x drivetrain",
      "Comfortable upright geometry",
      "Hydraulic disc brakes"
    ],
    cons: [
      "Heavy due to suspension fork",
      "Non-tubeless ready wheels",
      "Basic Altus components",
      "Limited performance capability"
    ],
    versions: [
      {
        year: 2024,
        changes: "Suspension fork, hydraulic brakes, 3x drivetrain",
        price: 69999
      },
      {
        year: 2023,
        changes: "Mechanical disc brakes, 21-speed",
        price: 59999
      },
      {
        year: 2022,
        changes: "V-brakes, basic drivetrain",
        price: 54999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Upgrade to tubeless ready wheels"
      },
      {
        priority: "medium",
        description: "Ergonomic grips and saddle"
      },
      {
        priority: "medium",
        description: "Suspension seatpost upgrade"
      },
      {
        priority: "low",
        description: "Comfort handlebar upgrade"
      }
    ],
    skillLevel: "intermediate",
    terrain: "paved roads, bike paths, light gravel"
  },
  {
    id: "trek-domane-al-2",
    name: "Domane AL 2",
    brand: "Trek",
    fullName: "Trek Domane AL 2",
    category: "road",
    type: "endurance",
    year: 2024,
    tags: ["entry-level", "endurance", "road", "aluminum"],
    overview: {
      history: "The Domane AL series brings endurance road geometry to aluminum frames, inspired by the carbon Domane line.",
      primaryUse: "Long-distance road riding and light touring",
      skillLevel: "beginner",
      terrain: "paved roads, smooth gravel",
      idealFor: "Endurance riders, commuters, fitness cyclists",
      notFor: "racing, rough off-road"
    },
    frame: {
      material: "Alpha Aluminum",
      type: "Endurance Road",
      geometry: "Endurance Geometry",
      sizes: ["44", "47", "50", "52", "54", "56", "58", "60", "62"],
      internalCableRouting: false,
      dropperPostReady: false
    },
    fork: {
      type: "Rigid",
      material: "Carbon",
      travel: 0,
      brand: "Trek",
      model: "Domane AL Carbon Fork"
    },
    wheels: {
      size: "700c",
      front: {
        rimBrand: "Bontrager Affinity",
        tireSize: "700x32c",
        tireBrand: "Bontrager",
        tireModel: "R3 Hard-Case Lite",
        tubelessReady: false,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Affinity",
        tireSize: "700x32c",
        tireBrand: "Bontrager",
        tireModel: "R3 Hard-Case Lite",
        tubelessReady: false,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano Claris",
      speeds: 16,
      shifterBrand: "Shimano",
      shifterModel: "Claris",
      frontDerailleur: "Shimano Claris",
      rearDerailleur: "Shimano Claris",
      cranksetBrand: "Trek",
      chainringSize: "50/34T",
      cassetteRange: "11-32T",
      chainBrand: "KMC",
      pedalIncluded: false
    },
    brakes: {
      type: "Caliper",
      front: "Tektro R312",
      rear: "Tektro R312",
      rotorSizeFront: 0,
      rotorSizeRear: 0,
      padType: "Rim brake pads"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 400,
      stemLength: 90,
      saddleBrand: "Bontrager",
      saddleModel: "Saddle",
      seatpostDiameter: 27.2,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 69999,
      mrp_usd: 799,
      street_inr: 67999,
      segment: "entry",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Contend 3", "Specialized Allez Sport"]
    },
    maintenance: {
      serviceInterval: "12 months",
      chainLubeFreq: "300 km",
      commonIssues: "Rim brake adjustment, tire wear",
      annualCost_inr: 8000,
      spareAvailability: "High"
    },
    pros: [
      "Comfortable endurance geometry",
      "Carbon fork for vibration damping",
      "Wide tire clearance",
      "Reliable Shimano Claris groupset"
    ],
    cons: [
      "Rim brakes in disc brake era",
      "Heavy aluminum frame",
      "Non-tubeless ready wheels",
      "Basic component level"
    ],
    versions: [
      {
        year: 2024,
        changes: "Updated graphics, Claris 2x8",
        price: 69999
      },
      {
        year: 2023,
        changes: "Shimano Sora 2x9 option",
        price: 74999
      },
      {
        year: 2022,
        changes: "Shimano Claris 2x8, basic wheels",
        price: 64999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Upgrade to disc brakes for better stopping"
      },
      {
        priority: "medium",
        description: "Tubeless ready wheelset"
      },
      {
        priority: "medium",
        description: "Upgrade to Sora or Tiagra groupset"
      },
      {
        priority: "low",
        description: "Carbon seatpost for comfort"
      }
    ],
    skillLevel: "beginner",
    terrain: "paved roads, smooth gravel"
  },
  {
    id: "trek-domane-al-3",
    name: "Domane AL 3",
    brand: "Trek",
    fullName: "Trek Domane AL 3 Disc",
    category: "road",
    type: "endurance",
    year: 2024,
    tags: ["intermediate", "endurance", "road", "aluminum"],
    overview: {
      history: "Mid-range Domane AL with disc brakes and better components for serious endurance riding.",
      primaryUse: "Performance endurance riding and all-weather commuting",
      skillLevel: "intermediate",
      terrain: "paved roads, gravel, wet conditions",
      idealFor: "Serious endurance riders, all-weather commuters, fitness enthusiasts",
      notFor: "racing, extreme off-road"
    },
    frame: {
      material: "Alpha Aluminum",
      type: "Endurance Road",
      geometry: "Endurance Geometry",
      sizes: ["44", "47", "50", "52", "54", "56", "58", "60", "62"],
      internalCableRouting: false,
      dropperPostReady: false
    },
    fork: {
      type: "Rigid",
      material: "Carbon",
      travel: 0,
      brand: "Trek",
      model: "Domane AL Carbon Disc Fork"
    },
    wheels: {
      size: "700c",
      front: {
        rimBrand: "Bontrager Affinity",
        tireSize: "700x32c",
        tireBrand: "Bontrager",
        tireModel: "R3 Hard-Case Lite",
        tubelessReady: true,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Affinity",
        tireSize: "700x32c",
        tireBrand: "Bontrager",
        tireModel: "R3 Hard-Case Lite",
        tubelessReady: true,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano Sora",
      speeds: 18,
      shifterBrand: "Shimano",
      shifterModel: "Sora",
      frontDerailleur: "Shimano Sora",
      rearDerailleur: "Shimano Sora",
      cranksetBrand: "FSA",
      chainringSize: "50/34T",
      cassetteRange: "11-32T",
      chainBrand: "KMC",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Shimano MT200",
      rear: "Shimano MT200",
      rotorSizeFront: 160,
      rotorSizeRear: 160,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 420,
      stemLength: 90,
      saddleBrand: "Bontrager",
      saddleModel: "Saddle",
      seatpostDiameter: 27.2,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 99999,
      mrp_usd: 1099,
      street_inr: 97999,
      segment: "mid",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Contend 2", "Specialized Allez Sprint Comp"]
    },
    maintenance: {
      serviceInterval: "12 months",
      chainLubeFreq: "300 km",
      commonIssues: "Disc brake bleeding, tubeless setup",
      annualCost_inr: 10000,
      spareAvailability: "High"
    },
    pros: [
      "Hydraulic disc brakes for all-weather performance",
      "Tubeless ready wheels",
      "Shimano Sora groupset",
      "Comfortable endurance geometry"
    ],
    cons: [
      "Heavy aluminum frame",
      "Basic MT200 brakes",
      "27.2mm seatpost limits upgrades",
      "No internal cable routing"
    ],
    versions: [
      {
        year: 2024,
        changes: "Disc brakes, tubeless ready, Sora groupset",
        price: 99999
      },
      {
        year: 2023,
        changes: "Mechanical disc brakes, Claris groupset",
        price: 84999
      },
      {
        year: 2022,
        changes: "Rim brakes, Sora groupset",
        price: 79999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Upgrade to Tiagra or 105 groupset"
      },
      {
        priority: "medium",
        description: "Lighter carbon wheelset"
      },
      {
        priority: "medium",
        description: "Upgrade to XT brakes for better modulation"
      },
      {
        priority: "low",
        description: "Carbon seatpost and handlebar"
      }
    ],
    skillLevel: "intermediate",
    terrain: "paved roads, gravel, all-weather"
  },
  {
    id: "trek-dual-sport-1",
    name: "Dual Sport 1",
    brand: "Trek",
    fullName: "Trek Dual Sport 1",
    category: "hybrid",
    type: "dual-sport",
    year: 2024,
    tags: ["entry-level", "dual-sport", "hybrid", "aluminum"],
    overview: {
      history: "The Dual Sport line bridges the gap between road and mountain bikes for versatile all-terrain riding.",
      primaryUse: "All-terrain commuting and light trail riding",
      skillLevel: "beginner",
      terrain: "paved roads, gravel paths, light trails",
      idealFor: "All-terrain commuters, recreational riders, fitness enthusiasts",
      notFor: "technical mountain biking, road racing"
    },
    frame: {
      material: "Alpha Aluminum",
      type: "Dual Sport Hybrid",
      geometry: "Dual Sport Geometry",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: false
    },
    fork: {
      type: "Suspension",
      material: "Aluminum",
      travel: 63,
      brand: "SR Suntour",
      model: "NEX E25"
    },
    wheels: {
      size: "700c",
      front: {
        rimBrand: "Bontrager Connection",
        tireSize: "700x40c",
        tireBrand: "Bontrager",
        tireModel: "H2 Hard-Case",
        tubelessReady: false,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Connection",
        tireSize: "700x40c",
        tireBrand: "Bontrager",
        tireModel: "H2 Hard-Case",
        tubelessReady: false,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano CUES",
      speeds: 9,
      shifterBrand: "Shimano",
      shifterModel: "CUES U4000",
      frontDerailleur: "Shimano CUES U4000",
      rearDerailleur: "Shimano CUES U4000",
      cranksetBrand: "Trek",
      chainringSize: "48/38T",
      cassetteRange: "11-36T",
      chainBrand: "KMC",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Tektro HD-M275",
      rear: "Tektro HD-M275",
      rotorSizeFront: 160,
      rotorSizeRear: 160,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 680,
      stemLength: 70,
      saddleBrand: "Bontrager",
      saddleModel: "Saddle",
      seatpostDiameter: 27.2,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 54999,
      mrp_usd: 599,
      street_inr: 52999,
      segment: "entry",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Roam 3", "Specialized Crosstrail Sport"]
    },
    maintenance: {
      serviceInterval: "12 months",
      chainLubeFreq: "200 km",
      commonIssues: "Suspension fork maintenance, brake adjustment",
      annualCost_inr: 7000,
      spareAvailability: "High"
    },
    pros: [
      "Versatile for road and light trail use",
      "Suspension fork for comfort",
      "Hydraulic disc brakes",
      "Wide tires for stability"
    ],
    cons: [
      "Heavy due to suspension fork",
      "Non-tubeless ready wheels",
      "Basic component level",
      "Limited off-road capability"
    ],
    versions: [
      {
        year: 2024,
        changes: "CUES drivetrain, hydraulic disc brakes",
        price: 54999
      },
      {
        year: 2023,
        changes: "Shimano 21-speed, mechanical disc brakes",
        price: 49999
      },
      {
        year: 2022,
        changes: "Shimano 21-speed, V-brakes",
        price: 44999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Upgrade to tubeless ready wheels"
      },
      {
        priority: "medium",
        description: "Better suspension fork with lockout"
      },
      {
        priority: "medium",
        description: "1x drivetrain conversion"
      },
      {
        priority: "low",
        description: "Ergonomic grips and saddle"
      }
    ],
    skillLevel: "beginner",
    terrain: "paved roads, gravel paths, light trails"
  },
  {
    id: "trek-dual-sport-2",
    name: "Dual Sport 2",
    brand: "Trek",
    fullName: "Trek Dual Sport 2",
    category: "hybrid",
    type: "dual-sport",
    year: 2024,
    tags: ["intermediate", "dual-sport", "hybrid", "aluminum"],
    overview: {
      history: "Step-up Dual Sport with better components and 1x drivetrain for simplified all-terrain riding.",
      primaryUse: "Advanced all-terrain riding and gravel grinding",
      skillLevel: "intermediate",
      terrain: "paved roads, gravel, moderate trails",
      idealFor: "Gravel riders, all-terrain commuters, adventure cyclists",
      notFor: "technical mountain biking, road racing"
    },
    frame: {
      material: "Alpha Aluminum",
      type: "Dual Sport Hybrid",
      geometry: "Dual Sport Geometry",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: false
    },
    fork: {
      type: "Suspension",
      material: "Aluminum",
      travel: 63,
      brand: "SR Suntour",
      model: "NEX E25"
    },
    wheels: {
      size: "700c",
      front: {
        rimBrand: "Bontrager Connection",
        tireSize: "700x40c",
        tireBrand: "Bontrager",
        tireModel: "H5 Hard-Case Lite",
        tubelessReady: false,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Connection",
        tireSize: "700x40c",
        tireBrand: "Bontrager",
        tireModel: "H5 Hard-Case Lite",
        tubelessReady: false,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano Deore",
      speeds: 10,
      shifterBrand: "Shimano",
      shifterModel: "Deore M4100",
      frontDerailleur: "None",
      rearDerailleur: "Shimano Deore M4100",
      cranksetBrand: "Praxis",
      chainringSize: "42T",
      cassetteRange: "11-46T",
      chainBrand: "Shimano",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Shimano MT200",
      rear: "Shimano MT200",
      rotorSizeFront: 180,
      rotorSizeRear: 160,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 700,
      stemLength: 70,
      saddleBrand: "Bontrager",
      saddleModel: "Saddle",
      seatpostDiameter: 27.2,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 79999,
      mrp_usd: 849,
      street_inr: 77999,
      segment: "mid",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Roam 2", "Specialized Crosstrail Elite"]
    },
    maintenance: {
      serviceInterval: "12 months",
      chainLubeFreq: "250 km",
      commonIssues: "Suspension fork maintenance, brake bleeding",
      annualCost_inr: 9000,
      spareAvailability: "High"
    },
    pros: [
      "Simple and reliable 1x drivetrain",
      "Better hydraulic disc brakes",
      "Wide gear range for all terrain",
      "Versatile geometry"
    ],
    cons: [
      "Heavy aluminum frame with suspension",
      "Non-tubeless ready wheels",
      "Basic MT200 brakes",
      "Limited off-road capability"
    ],
    versions: [
      {
        year: 2024,
        changes: "Deore 1x drivetrain, better brakes",
        price: 79999
      },
      {
        year: 2023,
        changes: "Shimano 2x drivetrain, basic brakes",
        price: 69999
      },
      {
        year: 2022,
        changes: "Shimano 3x drivetrain, mechanical disc",
        price: 59999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Upgrade to tubeless ready wheels"
      },
      {
        priority: "medium",
        description: "Better suspension fork with lockout"
      },
      {
        priority: "medium",
        description: "Upgrade to SLX brakes"
      },
      {
        priority: "low",
        description: "Carbon fork upgrade"
      }
    ],
    skillLevel: "intermediate",
    terrain: "paved roads, gravel, moderate trails"
  },
  {
    id: "trek-dual-sport-3",
    name: "Dual Sport 3",
    brand: "Trek",
    fullName: "Trek Dual Sport 3",
    category: "hybrid",
    type: "dual-sport",
    year: 2024,
    tags: ["advanced", "dual-sport", "hybrid", "aluminum"],
    overview: {
      history: "High-end Dual Sport with carbon fork and premium components for serious all-terrain performance.",
      primaryUse: "Performance all-terrain riding and gravel adventures",
      skillLevel: "advanced",
      terrain: "paved roads, gravel, technical trails",
      idealFor: "Gravel enthusiasts, adventure riders, serious commuters",
      notFor: "extreme mountain biking, road racing"
    },
    frame: {
      material: "Alpha Aluminum",
      type: "Dual Sport Hybrid",
      geometry: "Dual Sport Geometry",
      sizes: ["S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: false
    },
    fork: {
      type: "Rigid",
      material: "Carbon",
      travel: 0,
      brand: "Trek",
      model: "Carbon Fork"
    },
    wheels: {
      size: "700c",
      front: {
        rimBrand: "Bontrager Affinity",
        tireSize: "700x42c",
        tireBrand: "Bontrager",
        tireModel: "GR1 Team Issue",
        tubelessReady: true,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Affinity",
        tireSize: "700x42c",
        tireBrand: "Bontrager",
        tireModel: "GR1 Team Issue",
        tubelessReady: true,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano Deore",
      speeds: 11,
      shifterBrand: "Shimano",
      shifterModel: "Deore M5100",
      frontDerailleur: "None",
      rearDerailleur: "Shimano Deore M5100",
      cranksetBrand: "Praxis",
      chainringSize: "40T",
      cassetteRange: "11-51T",
      chainBrand: "Shimano",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Shimano Deore",
      rear: "Shimano Deore",
      rotorSizeFront: 180,
      rotorSizeRear: 180,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 720,
      stemLength: 80,
      saddleBrand: "Bontrager",
      saddleModel: "Arvada",
      seatpostDiameter: 27.2,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 109999,
      mrp_usd: 1199,
      street_inr: 107999,
      segment: "premium",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Roam 1", "Specialized Diverge E5"]
    },
    maintenance: {
      serviceInterval: "12 months",
      chainLubeFreq: "300 km",
      commonIssues: "Tubeless setup, brake bleeding",
      annualCost_inr: 12000,
      spareAvailability: "High"
    },
    pros: [
      "Lightweight carbon fork",
      "Tubeless ready wheels with gravel tires",
      "11-speed Deore drivetrain",
      "Better hydraulic disc brakes"
    ],
    cons: [
      "Premium price for aluminum frame",
      "27.2mm seatpost limits upgrades",
      "No internal cable routing",
      "Heavy compared to dedicated gravel bikes"
    ],
    versions: [
      {
        year: 2024,
        changes: "Carbon fork, tubeless ready, 11-speed Deore",
        price: 109999
      },
      {
        year: 2023,
        changes: "Aluminum fork, 10-speed Deore",
        price: 89999
      },
      {
        year: 2022,
        changes: "Basic fork, 9-speed drivetrain",
        price: 74999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Upgrade to SLX or XT groupset"
      },
      {
        priority: "medium",
        description: "Lighter carbon wheelset"
      },
      {
        priority: "medium",
        description: "Upgrade to XT brakes"
      },
      {
        priority: "low",
        description: "Carbon seatpost and handlebar"
      }
    ],
    skillLevel: "advanced",
    terrain: "paved roads, gravel, technical trails"
  },
  {
    id: "trek-x-caliber-7",
    name: "X-Caliber 7",
    brand: "Trek",
    fullName: "Trek X-Caliber 7",
    category: "mountain",
    type: "hardtail",
    year: 2024,
    tags: ["intermediate", "cross-country", "hardtail", "aluminum"],
    overview: {
      history: "The X-Caliber series is Trek's cross-country hardtail line designed for racing and fast trail riding.",
      primaryUse: "Cross-country racing and fast trail riding",
      skillLevel: "intermediate",
      terrain: "cross-country trails, singletrack, forest paths",
      idealFor: "XC racers, fitness riders, trail enthusiasts",
      notFor: "aggressive downhill, technical enduro"
    },
    frame: {
      material: "Alpha Silver Aluminum",
      type: "XC Hardtail",
      geometry: "Race Geometry",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: true
    },
    fork: {
      type: "RockShox Judy",
      material: "Aluminum",
      travel: 100,
      brand: "RockShox",
      model: "Judy Silver TK"
    },
    wheels: {
      size: "29",
      front: {
        rimBrand: "Bontrager Connection",
        tireSize: "29x2.20",
        tireBrand: "Bontrager",
        tireModel: "XR2 Comp",
        tubelessReady: true,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Connection",
        tireSize: "29x2.20",
        tireBrand: "Bontrager",
        tireModel: "XR2 Comp",
        tubelessReady: true,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano Deore",
      speeds: 11,
      shifterBrand: "Shimano",
      shifterModel: "Deore M5100",
      frontDerailleur: "None",
      rearDerailleur: "Shimano Deore M5100",
      cranksetBrand: "Praxis",
      chainringSize: "32T",
      cassetteRange: "11-51T",
      chainBrand: "Shimano",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Shimano MT200",
      rear: "Shimano MT200",
      rotorSizeFront: 180,
      rotorSizeRear: 180,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 720,
      stemLength: 70,
      saddleBrand: "Bontrager",
      saddleModel: "Saddle",
      seatpostDiameter: 31.6,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 99999,
      mrp_usd: 1099,
      street_inr: 97999,
      segment: "mid",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant XTC 800", "Specialized Rockhopper Comp 29"]
    },
    maintenance: {
      serviceInterval: "6 months",
      chainLubeFreq: "200 km",
      commonIssues: "Fork servicing, brake bleeding",
      annualCost_inr: 15000,
      spareAvailability: "High"
    },
    pros: [
      "RockShox Judy fork with good performance",
      "Race-ready geometry",
      "Tubeless ready wheels",
      "Simple and reliable 1x drivetrain"
    ],
    cons: [
      "Basic MT200 brakes",
      "Heavy aluminum frame",
      "No included dropper post",
      "Basic cockpit components"
    ],
    versions: [
      {
        year: 2024,
        changes: "Deore 11-speed, Judy fork, tubeless ready",
        price: 99999
      },
      {
        year: 2023,
        changes: "10-speed Deore, basic fork",
        price: 89999
      },
      {
        year: 2022,
        changes: "Shimano 1x10, SR Suntour fork",
        price: 79999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Add dropper post for descending confidence"
      },
      {
        priority: "medium",
        description: "Upgrade to SLX brakes for better power"
      },
      {
        priority: "medium",
        description: "Lighter wheelset upgrade"
      },
      {
        priority: "low",
        description: "Carbon handlebar for vibration damping"
      }
    ],
    skillLevel: "intermediate",
    terrain: "cross-country trails, singletrack, forest paths"
  },
  {
    id: "trek-x-caliber-8",
    name: "X-Caliber 8",
    brand: "Trek",
    fullName: "Trek X-Caliber 8",
    category: "mountain",
    type: "hardtail",
    year: 2024,
    tags: ["advanced", "cross-country", "hardtail", "aluminum"],
    overview: {
      history: "High-end X-Caliber with premium components for serious cross-country racing.",
      primaryUse: "Competitive cross-country racing and performance trail riding",
      skillLevel: "advanced",
      terrain: "technical XC courses, race trails, fast singletrack",
      idealFor: "XC racers, competitive riders, performance enthusiasts",
      notFor: "enduro racing, aggressive downhill"
    },
    frame: {
      material: "Alpha Platinum Aluminum",
      type: "XC Hardtail",
      geometry: "Race Geometry",
      sizes: ["S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: true
    },
    fork: {
      type: "RockShox Judy",
      material: "Aluminum",
      travel: 100,
      brand: "RockShox",
      model: "Judy Gold"
    },
    wheels: {
      size: "29",
      front: {
        rimBrand: "Bontrager Line Comp",
        tireSize: "29x2.20",
        tireBrand: "Bontrager",
        tireModel: "XR2 Team Issue",
        tubelessReady: true,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Line Comp",
        tireSize: "29x2.20",
        tireBrand: "Bontrager",
        tireModel: "XR2 Team Issue",
        tubelessReady: true,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano SLX",
      speeds: 12,
      shifterBrand: "Shimano",
      shifterModel: "SLX M7100",
      frontDerailleur: "None",
      rearDerailleur: "Shimano SLX M7100",
      cranksetBrand: "Praxis",
      chainringSize: "32T",
      cassetteRange: "10-51T",
      chainBrand: "Shimano",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Shimano Deore",
      rear: "Shimano Deore",
      rotorSizeFront: 203,
      rotorSizeRear: 180,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 750,
      stemLength: 70,
      saddleBrand: "Bontrager",
      saddleModel: "Arvada",
      seatpostDiameter: 31.6,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 149999,
      mrp_usd: 1599,
      street_inr: 147999,
      segment: "premium",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant XTC Advanced 2", "Specialized Epic Hardtail Comp"]
    },
    maintenance: {
      serviceInterval: "6 months",
      chainLubeFreq: "200 km",
      commonIssues: "Fork servicing, brake bleeding",
      annualCost_inr: 20000,
      spareAvailability: "High"
    },
    pros: [
      "SLX 12-speed drivetrain",
      "Better RockShox Judy Gold fork",
      "Race-proven geometry",
      "Tubeless ready with quality tires"
    ],
    cons: [
      "Premium price for aluminum frame",
      "No included dropper post",
      "Basic Deore brakes for this price",
      "Heavy compared to carbon race bikes"
    ],
    versions: [
      {
        year: 2024,
        changes: "SLX 12-speed, Judy Gold fork, better brakes",
        price: 149999
      },
      {
        year: 2023,
        changes: "11-speed Deore, Judy Silver fork",
        price: 119999
      },
      {
        year: 2022,
        changes: "10-speed Deore, basic fork",
        price: 99999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Add dropper post for technical sections"
      },
      {
        priority: "medium",
        description: "Upgrade to XT brakes for race performance"
      },
      {
        priority: "medium",
        description: "Lighter carbon wheelset"
      },
      {
        priority: "low",
        description: "Carbon cockpit components"
      }
    ],
    skillLevel: "advanced",
    terrain: "technical XC courses, race trails, fast singletrack"
  },
  {
    id: "trek-roscoe-7",
    name: "Roscoe 7",
    brand: "Trek",
    fullName: "Trek Roscoe 7",
    category: "mountain",
    type: "hardtail",
    year: 2024,
    tags: ["intermediate", "trail", "hardtail", "aluminum"],
    overview: {
      history: "The Roscoe series is Trek's trail hardtail line designed for fun and confidence on technical trails.",
      primaryUse: "Trail riding and technical singletrack adventures",
      skillLevel: "intermediate",
      terrain: "technical trails, rock gardens, forest singletrack",
      idealFor: "Trail riders, all-mountain enthusiasts, aggressive riders",
      notFor: "cross-country racing, extreme downhill"
    },
    frame: {
      material: "Alpha Silver Aluminum",
      type: "Trail Hardtail",
      geometry: "Trail Geometry",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: true
    },
    fork: {
      type: "RockShox Judy",
      material: "Aluminum",
      travel: 120,
      brand: "RockShox",
      model: "Judy Silver TK"
    },
    wheels: {
      size: "27.5+",
      front: {
        rimBrand: "Bontrager Line Comp",
        tireSize: "27.5x2.80",
        tireBrand: "Bontrager",
        tireModel: "XR4 Team Issue",
        tubelessReady: true,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Line Comp",
        tireSize: "27.5x2.80",
        tireBrand: "Bontrager",
        tireModel: "XR4 Team Issue",
        tubelessReady: true,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano Deore",
      speeds: 11,
      shifterBrand: "Shimano",
      shifterModel: "Deore M5100",
      frontDerailleur: "None",
      rearDerailleur: "Shimano Deore M5100",
      cranksetBrand: "Praxis",
      chainringSize: "32T",
      cassetteRange: "11-51T",
      chainBrand: "Shimano",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Shimano MT200",
      rear: "Shimano MT200",
      rotorSizeFront: 180,
      rotorSizeRear: 180,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 780,
      stemLength: 60,
      saddleBrand: "Bontrager",
      saddleModel: "Saddle",
      seatpostDiameter: 31.6,
      dropperPost: false
    },
    pricing: {
      mrp_inr: 119999,
      mrp_usd: 1299,
      street_inr: 117999,
      segment: "premium",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Fathom 2", "Specialized Stumpjumper ST Alloy"]
    },
    maintenance: {
      serviceInterval: "6 months",
      chainLubeFreq: "200 km",
      commonIssues: "Fork servicing, brake bleeding",
      annualCost_inr: 18000,
      spareAvailability: "High"
    },
    pros: [
      "Plus-size tires for traction and comfort",
      "120mm travel fork for aggressive trails",
      "Confidence-inspiring geometry",
      "Tubeless ready wheels"
    ],
    cons: [
      "Heavy due to plus-size wheels",
      "Basic MT200 brakes",
      "No included dropper post",
      "Limited climbing efficiency"
    ],
    versions: [
      {
        year: 2024,
        changes: "Deore 11-speed, Judy fork, plus-size tires",
        price: 119999
      },
      {
        year: 2023,
        changes: "10-speed Deore, SR Suntour fork",
        price: 99999
      },
      {
        year: 2022,
        changes: "Shimano 1x10, basic fork",
        price: 84999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Add dropper post for descending performance"
      },
      {
        priority: "medium",
        description: "Upgrade to SLX brakes for better power"
      },
      {
        priority: "medium",
        description: "Lighter wheelset upgrade"
      },
      {
        priority: "low",
        description: "Upgrade to Pike fork for premium performance"
      }
    ],
    skillLevel: "intermediate",
    terrain: "technical trails, rock gardens, forest singletrack"
  },
  {
    id: "trek-roscoe-8",
    name: "Roscoe 8",
    brand: "Trek",
    fullName: "Trek Roscoe 8",
    category: "mountain",
    type: "hardtail",
    year: 2024,
    tags: ["advanced", "trail", "hardtail", "aluminum"],
    overview: {
      history: "High-end Roscoe with premium components and dropper post for aggressive trail riding.",
      primaryUse: "Aggressive trail riding and technical singletrack",
      skillLevel: "advanced",
      terrain: "technical trails, rock gardens, steep descents",
      idealFor: "Aggressive trail riders, all-mountain enthusiasts, enduro beginners",
      notFor: "cross-country racing, extreme downhill"
    },
    frame: {
      material: "Alpha Silver Aluminum",
      type: "Trail Hardtail",
      geometry: "Trail Geometry",
      sizes: ["S", "M", "L", "XL", "XXL"],
      internalCableRouting: false,
      dropperPostReady: true
    },
    fork: {
      type: "RockShox Judy",
      material: "Aluminum",
      travel: 120,
      brand: "RockShox",
      model: "Judy Gold"
    },
    wheels: {
      size: "27.5+",
      front: {
        rimBrand: "Bontrager Line Comp",
        tireSize: "27.5x2.80",
        tireBrand: "Bontrager",
        tireModel: "XR4 Team Issue",
        tubelessReady: true,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Line Comp",
        tireSize: "27.5x2.80",
        tireBrand: "Bontrager",
        tireModel: "XR4 Team Issue",
        tubelessReady: true,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano SLX",
      speeds: 12,
      shifterBrand: "Shimano",
      shifterModel: "SLX M7100",
      frontDerailleur: "None",
      rearDerailleur: "Shimano SLX M7100",
      cranksetBrand: "Praxis",
      chainringSize: "32T",
      cassetteRange: "10-51T",
      chainBrand: "Shimano",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Shimano Deore",
      rear: "Shimano Deore",
      rotorSizeFront: 203,
      rotorSizeRear: 180,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 800,
      stemLength: 60,
      saddleBrand: "Bontrager",
      saddleModel: "Arvada",
      seatpostDiameter: 31.6,
      dropperPost: true
    },
    pricing: {
      mrp_inr: 169999,
      mrp_usd: 1799,
      street_inr: 167999,
      segment: "premium",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Fathom 1", "Specialized Stumpjumper Comp Alloy"]
    },
    maintenance: {
      serviceInterval: "6 months",
      chainLubeFreq: "200 km",
      commonIssues: "Dropper post maintenance, fork servicing",
      annualCost_inr: 25000,
      spareAvailability: "High"
    },
    pros: [
      "SLX 12-speed drivetrain",
      "Included dropper post",
      "Plus-size tires for maximum traction",
      "120mm travel for aggressive trails"
    ],
    cons: [
      "Very heavy due to plus-size wheels",
      "Premium price for aluminum frame",
      "Basic Deore brakes for this price point",
      "Limited climbing efficiency"
    ],
    versions: [
      {
        year: 2024,
        changes: "SLX 12-speed, dropper post, Judy Gold fork",
        price: 169999
      },
      {
        year: 2023,
        changes: "11-speed Deore, no dropper, Judy Silver fork",
        price: 129999
      },
      {
        year: 2022,
        changes: "10-speed Deore, basic fork",
        price: 109999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Upgrade to XT brakes for better stopping power"
      },
      {
        priority: "medium",
        description: "Lighter carbon wheelset"
      },
      {
        priority: "medium",
        description: "Upgrade to Pike fork for premium performance"
      },
      {
        priority: "low",
        description: "Carbon cockpit components"
      }
    ],
    skillLevel: "advanced",
    terrain: "technical trails, rock gardens, steep descents"
  },
  {
    id: "trek-slash-98",
    name: "Slash 9.8",
    brand: "Trek",
    fullName: "Trek Slash 9.8",
    category: "mountain",
    type: "full-suspension",
    year: 2024,
    tags: ["expert", "enduro", "full-suspension", "carbon"],
    overview: {
      history: "The Slash series is Trek's aggressive enduro race bike designed for winning on the most demanding courses.",
      primaryUse: "Enduro racing and aggressive all-mountain riding",
      skillLevel: "expert",
      terrain: "technical descents, rock gardens, race courses",
      idealFor: "Enduro racers, aggressive all-mountain riders, park enthusiasts",
      notFor: "cross-country riding, casual trail riding"
    },
    frame: {
      material: "OCLV Mountain Carbon",
      type: "Full Suspension",
      geometry: "Enduro Geometry",
      sizes: ["S", "M", "L", "XL", "XXL"],
      internalCableRouting: true,
      dropperPostReady: true
    },
    fork: {
      type: "RockShox ZEB",
      material: "Carbon",
      travel: 160,
      brand: "RockShox",
      model: "ZEB Select"
    },
    wheels: {
      size: "29",
      front: {
        rimBrand: "Bontrager Line Pro 30",
        tireSize: "29x2.40",
        tireBrand: "Bontrager",
        tireModel: "SE5 Team Issue",
        tubelessReady: true,
        valveType: "Presta"
      },
      rear: {
        rimBrand: "Bontrager Line Pro 30",
        tireSize: "29x2.40",
        tireBrand: "Bontrager",
        tireModel: "SE5 Team Issue",
        tubelessReady: true,
        valveType: "Presta"
      }
    },
    drivetrain: {
      groupset: "Shimano XT",
      speeds: 12,
      shifterBrand: "Shimano",
      shifterModel: "XT M8100",
      frontDerailleur: "None",
      rearDerailleur: "Shimano XT M8100",
      cranksetBrand: "Race Face",
      chainringSize: "34T",
      cassetteRange: "10-51T",
      chainBrand: "Shimano",
      pedalIncluded: false
    },
    brakes: {
      type: "Hydraulic Disc",
      front: "Shimano XT",
      rear: "Shimano XT",
      rotorSizeFront: 203,
      rotorSizeRear: 203,
      padType: "Resin"
    },
    cockpit: {
      handlebarBrand: "Bontrager",
      handlebarWidth: 800,
      stemLength: 50,
      saddleBrand: "Bontrager",
      saddleModel: "Evoke",
      seatpostDiameter: 34.9,
      dropperPost: true
    },
    pricing: {
      mrp_inr: 499999,
      mrp_usd: 5499,
      street_inr: 489999,
      segment: "expert",
      availableAt: "Trek Dealers, Online",
      alternatives: ["Giant Reign Advanced Pro 1", "Specialized Enduro Expert"]
    },
    maintenance: {
      serviceInterval: "3 months",
      chainLubeFreq: "150 km",
      commonIssues: "Suspension servicing, dropper post maintenance",
      annualCost_inr: 50000,
      spareAvailability: "High"
    },
    pros: [
      "High-performance carbon frame",
      "RockShox ZEB fork for aggressive riding",
      "Shimano XT drivetrain",
      "Internal cable routing"
    ],
    cons: [
      "Very expensive",
      "Complex maintenance requirements",
      "Heavy for a carbon bike",
      "Specialized for aggressive riding only"
    ],
    versions: [
      {
        year: 2024,
        changes: "Updated geometry, ZEB fork, XT drivetrain",
        price: 499999
      },
      {
        year: 2023,
        changes: "Lyrik fork, GX drivetrain",
        price: 459999
      },
      {
        year: 2022,
        changes: "Pike fork, NX drivetrain",
        price: 399999
      }
    ],
    upgrades: [
      {
        priority: "high",
        description: "Upgrade to Code RSC brakes for race performance"
      },
      {
        priority: "medium",
        description: "Lighter carbon wheelset upgrade"
      },
      {
        priority: "medium",
        description: "Upgrade to XTR drivetrain"
      },
      {
        priority: "low",
        description: "Carbon cockpit components"
      }
    ],
    skillLevel: "expert",
    terrain: "technical descents, rock gardens, race courses"
  }
];

module.exports = trekCycles;
