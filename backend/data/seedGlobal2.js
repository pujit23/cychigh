// CycHigh — Global Brands Seed Data (Cycles 91-100)
const seedGlobal2 = [
    {
        slug: 'merida-big-nine-200', name: 'Merida Big Nine 200', brand: 'Merida', category: 'Mountain Bike', type: 'non-motorized', year: 2024, tags: ['mtb', 'hardtail', 'intermediate'],
        overview: { fullName: 'Merida Big.Nine 200', nicknames: ['Big Nine 200'], origin: 'Taiwan', history: 'Upgraded Big Nine with 1x drivetrain.', primaryUse: 'Trail/XC', skillLevel: 'Intermediate', terrainType: ['Off-road', 'Trail'] },
        specs: { frameMaterial: 'Merida TFS aluminum', frameGeometry: 'XC/Trail', suspensionType: 'Hardtail - SR Suntour XCR Air 100mm', weight: { min: 12.8, max: 13.3, unit: 'kg' }, maxLoadCapacity: 136, wheelSize: '29"', tireType: 'Maxxis Ikon 29x2.20"', rimType: 'Merida Comp CC', gearCount: 11, gearSystem: 'Shimano Deore 1x11', drivetrainType: '1x11 speed', shifterType: 'Shimano Deore M5100', crankset: 'Shimano Deore M5100 32T', bottomBracket: 'Sealed BSA' },
        wheels: { front: { size: '29"', psi: '25-45', tubeSize: '29x2.20', rimDiameter: '622mm', rimWidth: '25mm', spokeCount: 32, valveType: 'Presta' }, rear: { size: '29"', psi: '25-45', tubeSize: '29x2.20', rimDiameter: '622mm', rimWidth: '25mm', spokeCount: 32, valveType: 'Presta' } },
        brakes: { type: 'Hydraulic Disc', front: 'Shimano MT200', rear: 'Shimano MT200', rotorSize: '180/160mm' },
        drivetrain: { pedalType: 'VP platform', crankArmLength: '170mm', chainStandard: 'Shimano Deore', freewheelOrCassette: 'Shimano Deore 11-51T', frontDerailleur: 'N/A (1x)', rearDerailleur: 'Shimano Deore M5120' },
        ergonomics: { handlebarType: 'Merida Comp flat', handlebarWidth: '720mm', saddleType: 'Merida Sport', seatHeightRange: '680-890mm', ridingPosture: 'Upright' },
        parts: [], pricing: { entryLevel: { inr: '56,999', usd: '680' }, midRange: { inr: '56,999', usd: '680' }, premium: { inr: '56,999', usd: '680' } },
        maintenance: { serviceInterval: 'Every 6 months', commonIssues: ['Fork air check'], tasks: ['Check fork pressure', 'Chain lube'] },
        pros: ['Air fork', '1x11 Shimano Deore', 'Maxxis tires'], cons: ['Basic brakes'], whoIsItFor: { idealRider: 'Trail riders', bestScenarios: ['Trail', 'XC'] }
    },
    {
        slug: 'merida-big-seven-100', name: 'Merida Big Seven 100', brand: 'Merida', category: 'Mountain Bike', type: 'non-motorized', year: 2024, tags: ['mtb', 'hardtail', 'beginner'],
        overview: { fullName: 'Merida Big.Seven 100', nicknames: ['Big Seven 100'], origin: 'Taiwan', history: 'Meridas 27.5" wheel trail hardtail.', primaryUse: 'Trail', skillLevel: 'Beginner', terrainType: ['Off-road', 'Trail'] },
        specs: { frameMaterial: 'Merida TFS aluminum', frameGeometry: 'Trail', suspensionType: 'Hardtail - SR Suntour XCM 100mm coil', weight: { min: 13.5, max: 14.0, unit: 'kg' }, maxLoadCapacity: 136, wheelSize: '27.5"', tireType: 'Maxxis Ikon 27.5x2.20"', rimType: 'Merida Comp CC', gearCount: 18, gearSystem: 'Shimano Altus 2x9', drivetrainType: '2x9 speed', shifterType: 'Shimano Altus', crankset: 'Shimano FC-MT210 36-22T', bottomBracket: 'Sealed cartridge' },
        wheels: { front: { size: '27.5"', psi: '30-50', tubeSize: '27.5x2.20', rimDiameter: '584mm', rimWidth: '23mm', spokeCount: 32, valveType: 'Presta' }, rear: { size: '27.5"', psi: '30-50', tubeSize: '27.5x2.20', rimDiameter: '584mm', rimWidth: '23mm', spokeCount: 32, valveType: 'Presta' } },
        brakes: { type: 'Hydraulic Disc', front: 'Shimano MT200', rear: 'Shimano MT200', rotorSize: '160mm' },
        drivetrain: { pedalType: 'VP platform', crankArmLength: '170mm', chainStandard: 'KMC X9', freewheelOrCassette: 'Shimano HG400 11-36T', frontDerailleur: 'Shimano Altus', rearDerailleur: 'Shimano Alivio M3120' },
        ergonomics: { handlebarType: 'Merida Comp flat', handlebarWidth: '720mm', saddleType: 'Merida Sport', seatHeightRange: '660-850mm', ridingPosture: 'Upright' },
        parts: [], pricing: { entryLevel: { inr: '42,999', usd: '510' }, midRange: { inr: '42,999', usd: '510' }, premium: { inr: '42,999', usd: '510' } },
        maintenance: { serviceInterval: 'Every 6 months', commonIssues: ['Brake bleed'], tasks: ['Chain lube', 'Brake check'] },
        pros: ['Maxxis tires', 'Hydraulic brakes', '27.5" agility'], cons: ['Coil fork', '2x drivetrain'], whoIsItFor: { idealRider: 'Shorter riders or agility seekers', bestScenarios: ['Trail', 'Tight singletrack'] }
    },
    {
        slug: 'merida-scultura-200', name: 'Merida Scultura 200', brand: 'Merida', category: 'Road Bike', type: 'non-motorized', year: 2024, tags: ['road', 'endurance', 'beginner'],
        overview: { fullName: 'Merida Scultura 200', nicknames: ['Scultura 200'], origin: 'Taiwan', history: 'Meridas entry endurance road bike.', primaryUse: 'Road Cycling', skillLevel: 'Beginner', terrainType: ['Road'] },
        specs: { frameMaterial: 'Scultura lite aluminum', frameGeometry: 'Endurance Road', suspensionType: 'Rigid', weight: { min: 9.8, max: 10.3, unit: 'kg' }, maxLoadCapacity: 120, wheelSize: '700c', tireType: 'Maxxis Detonator 700x25c', rimType: 'Merida Comp SL', gearCount: 18, gearSystem: 'Shimano Sora 2x9', drivetrainType: '2x9 speed', shifterType: 'Shimano Sora R3000', crankset: 'Shimano Sora R3000 50-34T', bottomBracket: 'Sealed BSA' },
        wheels: { front: { size: '700c', psi: '85-120', tubeSize: '700x25c', rimDiameter: '622mm', rimWidth: '19mm', spokeCount: 24, valveType: 'Presta' }, rear: { size: '700c', psi: '85-120', tubeSize: '700x25c', rimDiameter: '622mm', rimWidth: '19mm', spokeCount: 24, valveType: 'Presta' } },
        brakes: { type: 'Caliper Rim', front: 'Merida Road Comp', rear: 'Merida Road Comp', rotorSize: 'N/A' },
        drivetrain: { pedalType: 'Not included', crankArmLength: '170mm', chainStandard: 'KMC X9', freewheelOrCassette: 'Shimano HG400 11-34T', frontDerailleur: 'Shimano Sora R3000', rearDerailleur: 'Shimano Sora R3000' },
        ergonomics: { handlebarType: 'Merida Comp drop', handlebarWidth: '400mm', saddleType: 'Merida Sport', seatHeightRange: '720-960mm', ridingPosture: 'Semi-aggressive' },
        parts: [], pricing: { entryLevel: { inr: '62,999', usd: '750' }, midRange: { inr: '62,999', usd: '750' }, premium: { inr: '62,999', usd: '750' } },
        maintenance: { serviceInterval: 'Every 3-6 months', commonIssues: ['Rim brake wear'], tasks: ['Replace brake pads', 'Chain lube'] },
        pros: ['Shimano Sora 2x9', 'Lightweight frame', 'Good entry road bike'], cons: ['Rim brakes', 'Narrow tires'], whoIsItFor: { idealRider: 'Road cycling beginners', bestScenarios: ['Road rides', 'Fitness'] }
    },
    {
        slug: 'merida-crossway-20', name: 'Merida Crossway 20', brand: 'Merida', category: 'Hybrid Bike', type: 'non-motorized', year: 2024, tags: ['hybrid', 'commuter', 'beginner'],
        overview: { fullName: 'Merida Crossway 20-D', nicknames: ['Crossway 20'], origin: 'Taiwan', history: 'Meridas popular city hybrid.', primaryUse: 'Commuting', skillLevel: 'Beginner', terrainType: ['Road', 'Urban'] },
        specs: { frameMaterial: 'Merida Crossway TFS aluminum', frameGeometry: 'City Hybrid', suspensionType: 'Rigid', weight: { min: 12.0, max: 12.5, unit: 'kg' }, maxLoadCapacity: 130, wheelSize: '700c', tireType: 'Maxxis Detonator 700x35c', rimType: 'Merida Comp CC', gearCount: 24, gearSystem: 'Shimano Altus/Acera 3x8', drivetrainType: '3x8 speed', shifterType: 'Shimano Altus', crankset: 'Shimano TY501 48-38-28T', bottomBracket: 'Sealed cartridge' },
        wheels: { front: { size: '700c', psi: '50-80', tubeSize: '700x35c', rimDiameter: '622mm', rimWidth: '21mm', spokeCount: 32, valveType: 'Schrader' }, rear: { size: '700c', psi: '50-80', tubeSize: '700x35c', rimDiameter: '622mm', rimWidth: '21mm', spokeCount: 32, valveType: 'Schrader' } },
        brakes: { type: 'Hydraulic Disc', front: 'Shimano MT200', rear: 'Shimano MT200', rotorSize: '160mm' },
        drivetrain: { pedalType: 'VP platform', crankArmLength: '170mm', chainStandard: 'KMC Z8', freewheelOrCassette: 'Shimano HG31 11-32T', frontDerailleur: 'Shimano Altus', rearDerailleur: 'Shimano Acera M3020' },
        ergonomics: { handlebarType: 'Merida Comp flat', handlebarWidth: '620mm', saddleType: 'Merida Sport Comfort', seatHeightRange: '740-990mm', ridingPosture: 'Upright' },
        parts: [], pricing: { entryLevel: { inr: '39,999', usd: '475' }, midRange: { inr: '39,999', usd: '475' }, premium: { inr: '39,999', usd: '475' } },
        maintenance: { serviceInterval: 'Every 6 months', commonIssues: ['Brake bleed'], tasks: ['Chain lube', 'Brake check'] },
        pros: ['Hydraulic disc brakes', 'Comfortable geometry', 'Maxxis tires'], cons: ['3x8 is dated', 'No suspension'], whoIsItFor: { idealRider: 'City commuters', bestScenarios: ['Daily commuting', 'Fitness'] }
    },
    {
        slug: 'marin-fairfax-1', name: 'Marin Fairfax 1', brand: 'Marin', category: 'Hybrid Bike', type: 'non-motorized', year: 2024, tags: ['hybrid', 'fitness', 'commuter'],
        overview: { fullName: 'Marin Fairfax 1', nicknames: ['Fairfax 1'], origin: 'USA (Marin County, CA)', history: 'Marins entry fitness hybrid named after Fairfax, CA.', primaryUse: 'Fitness & Commuting', skillLevel: 'Beginner', terrainType: ['Road', 'Urban'] },
        specs: { frameMaterial: '6061 Aluminum', frameGeometry: 'Fitness Hybrid', suspensionType: 'Rigid', weight: { min: 12.0, max: 12.5, unit: 'kg' }, maxLoadCapacity: 136, wheelSize: '700c', tireType: 'Vee Tire Speedster 700x35c', rimType: 'Marin alloy', gearCount: 21, gearSystem: 'Shimano Tourney 3x7', drivetrainType: '3x7 speed', shifterType: 'Shimano Tourney EF41', crankset: 'Shimano Tourney 48-38-28T', bottomBracket: 'Sealed cartridge' },
        wheels: { front: { size: '700c', psi: '50-80', tubeSize: '700x35c', rimDiameter: '622mm', rimWidth: '20mm', spokeCount: 32, valveType: 'Schrader' }, rear: { size: '700c', psi: '50-80', tubeSize: '700x35c', rimDiameter: '622mm', rimWidth: '20mm', spokeCount: 32, valveType: 'Schrader' } },
        brakes: { type: 'V-Brake', front: 'Alloy linear-pull', rear: 'Alloy linear-pull', rotorSize: 'N/A' },
        drivetrain: { pedalType: 'VP platform', crankArmLength: '170mm', chainStandard: 'KMC Z7', freewheelOrCassette: 'Freewheel 14-34T', frontDerailleur: 'Shimano Tourney', rearDerailleur: 'Shimano Tourney' },
        ergonomics: { handlebarType: 'Marin alloy flat', handlebarWidth: '600mm', saddleType: 'Marin Sport', seatHeightRange: '740-990mm', ridingPosture: 'Upright' },
        parts: [], pricing: { entryLevel: { inr: '32,999', usd: '390' }, midRange: { inr: '32,999', usd: '390' }, premium: { inr: '32,999', usd: '390' } },
        maintenance: { serviceInterval: 'Every 6 months', commonIssues: ['Brake pad wear'], tasks: ['Adjust brakes', 'Lube chain'] },
        pros: ['Lightweight', 'Clean design', 'Good commuter'], cons: ['V-brakes', 'Basic gearing'], whoIsItFor: { idealRider: 'Budget fitness commuters', bestScenarios: ['Commuting', 'Fitness rides'] }
    },
    {
        slug: 'marin-fairfax-2', name: 'Marin Fairfax 2', brand: 'Marin', category: 'Hybrid Bike', type: 'non-motorized', year: 2024, tags: ['hybrid', 'fitness', 'commuter'],
        overview: { fullName: 'Marin Fairfax 2', nicknames: ['Fairfax 2'], origin: 'USA (Marin County, CA)', history: 'Upgraded Fairfax with disc brakes.', primaryUse: 'Fitness & Commuting', skillLevel: 'Beginner', terrainType: ['Road', 'Urban'] },
        specs: { frameMaterial: '6061 Aluminum', frameGeometry: 'Fitness Hybrid', suspensionType: 'Rigid', weight: { min: 11.5, max: 12.0, unit: 'kg' }, maxLoadCapacity: 136, wheelSize: '700c', tireType: 'Vee Tire Speedster 700x35c', rimType: 'Marin alloy disc', gearCount: 16, gearSystem: 'Shimano Altus 2x8', drivetrainType: '2x8 speed', shifterType: 'Shimano Altus', crankset: 'Shimano FC-TY501 46-30T', bottomBracket: 'Sealed cartridge' },
        wheels: { front: { size: '700c', psi: '50-80', tubeSize: '700x35c', rimDiameter: '622mm', rimWidth: '20mm', spokeCount: 32, valveType: 'Schrader' }, rear: { size: '700c', psi: '50-80', tubeSize: '700x35c', rimDiameter: '622mm', rimWidth: '20mm', spokeCount: 32, valveType: 'Schrader' } },
        brakes: { type: 'Mechanical Disc', front: 'Tektro MD-M280', rear: 'Tektro MD-M280', rotorSize: '160mm' },
        drivetrain: { pedalType: 'VP platform', crankArmLength: '170mm', chainStandard: 'KMC Z8', freewheelOrCassette: 'Shimano HG31 11-32T', frontDerailleur: 'Shimano Tourney', rearDerailleur: 'Shimano Altus M310' },
        ergonomics: { handlebarType: 'Marin alloy flat', handlebarWidth: '600mm', saddleType: 'Marin Sport', seatHeightRange: '740-990mm', ridingPosture: 'Upright sporty' },
        parts: [], pricing: { entryLevel: { inr: '39,999', usd: '475' }, midRange: { inr: '39,999', usd: '475' }, premium: { inr: '39,999', usd: '475' } },
        maintenance: { serviceInterval: 'Every 6 months', commonIssues: ['Brake pad wear'], tasks: ['Adjust disc brakes', 'Lube chain'] },
        pros: ['Disc brakes', 'Shimano Altus', 'Good value'], cons: ['Mechanical discs', 'No suspension'], whoIsItFor: { idealRider: 'Commuters wanting disc brakes', bestScenarios: ['Commuting', 'Fitness'] }
    },
    {
        slug: 'marin-bobcat-trail', name: 'Marin Bobcat Trail', brand: 'Marin', category: 'Mountain Bike', type: 'non-motorized', year: 2024, tags: ['mtb', 'hardtail', 'beginner'],
        overview: { fullName: 'Marin Bobcat Trail 3', nicknames: ['Bobcat Trail'], origin: 'USA (Marin County)', history: 'Marins entry trail hardtail.', primaryUse: 'Trail', skillLevel: 'Beginner', terrainType: ['Off-road', 'Trail'] },
        specs: { frameMaterial: '6061 Aluminum Series 3', frameGeometry: 'Trail', suspensionType: 'Hardtail - SR Suntour XCE 100mm', weight: { min: 13.5, max: 14.0, unit: 'kg' }, maxLoadCapacity: 136, wheelSize: '29"', tireType: 'Vee Tire Crown Gem 29x2.25"', rimType: 'Marin alloy', gearCount: 16, gearSystem: 'Shimano Altus 2x8', drivetrainType: '2x8 speed', shifterType: 'Shimano Altus', crankset: 'Shimano FC-TY501 36-22T', bottomBracket: 'Sealed cartridge' },
        wheels: { front: { size: '29"', psi: '30-50', tubeSize: '29x2.25', rimDiameter: '622mm', rimWidth: '23mm', spokeCount: 32, valveType: 'Schrader' }, rear: { size: '29"', psi: '30-50', tubeSize: '29x2.25', rimDiameter: '622mm', rimWidth: '23mm', spokeCount: 32, valveType: 'Schrader' } },
        brakes: { type: 'Hydraulic Disc', front: 'Tektro HD-M275', rear: 'Tektro HD-M275', rotorSize: '160mm' },
        drivetrain: { pedalType: 'VP platform', crankArmLength: '170mm', chainStandard: 'KMC Z8', freewheelOrCassette: 'Shimano HG31 11-34T', frontDerailleur: 'Shimano Tourney', rearDerailleur: 'Shimano Altus M310' },
        ergonomics: { handlebarType: 'Marin alloy flat', handlebarWidth: '720mm', saddleType: 'Marin Sport', seatHeightRange: '680-890mm', ridingPosture: 'Upright' },
        parts: [], pricing: { entryLevel: { inr: '39,999', usd: '475' }, midRange: { inr: '39,999', usd: '475' }, premium: { inr: '39,999', usd: '475' } },
        maintenance: { serviceInterval: 'Every 6 months', commonIssues: ['Fork service'], tasks: ['Lube chain', 'Fork check'] },
        pros: ['Hydraulic brakes', 'Good trail geo', 'Marin heritage'], cons: ['Basic fork', '2x drivetrain'], whoIsItFor: { idealRider: 'Beginner trail riders', bestScenarios: ['Trail riding', 'Light off-road'] }
    },
    {
        slug: 'marin-gestalt', name: 'Marin Gestalt', brand: 'Marin', category: 'Gravel Bike', type: 'non-motorized', year: 2024, tags: ['gravel', 'road', 'adventure'],
        overview: { fullName: 'Marin Gestalt 1', nicknames: ['Gestalt'], origin: 'USA (Marin County)', history: 'Marins entry gravel/adventure road bike.', primaryUse: 'Gravel & Road', skillLevel: 'Beginner', terrainType: ['Gravel', 'Road', 'Mixed'] },
        specs: { frameMaterial: 'Beyond Road Series 2 aluminum', frameGeometry: 'Gravel Endurance', suspensionType: 'Rigid', weight: { min: 10.5, max: 11.0, unit: 'kg' }, maxLoadCapacity: 125, wheelSize: '700c', tireType: 'Vee Tire Speedster 700x38c', rimType: 'Marin alloy disc', gearCount: 16, gearSystem: 'Shimano Claris 2x8', drivetrainType: '2x8 speed', shifterType: 'Shimano Claris R2000', crankset: 'Shimano Claris R2000 50-34T', bottomBracket: 'Sealed BSA' },
        wheels: { front: { size: '700c', psi: '45-75', tubeSize: '700x38c', rimDiameter: '622mm', rimWidth: '21mm', spokeCount: 28, valveType: 'Presta' }, rear: { size: '700c', psi: '45-75', tubeSize: '700x38c', rimDiameter: '622mm', rimWidth: '21mm', spokeCount: 28, valveType: 'Presta' } },
        brakes: { type: 'Mechanical Disc', front: 'Tektro MD-C550', rear: 'Tektro MD-C550', rotorSize: '160mm' },
        drivetrain: { pedalType: 'Not included', crankArmLength: '170mm', chainStandard: 'KMC X8', freewheelOrCassette: 'Shimano HG50 11-34T', frontDerailleur: 'Shimano Claris R2000', rearDerailleur: 'Shimano Claris R2000' },
        ergonomics: { handlebarType: 'Marin alloy flare drop', handlebarWidth: '420mm', saddleType: 'Marin Speed', seatHeightRange: '720-960mm', ridingPosture: 'Endurance' },
        parts: [], pricing: { entryLevel: { inr: '55,999', usd: '670' }, midRange: { inr: '55,999', usd: '670' }, premium: { inr: '55,999', usd: '670' } },
        maintenance: { serviceInterval: 'Every 3-6 months', commonIssues: ['Brake pad wear'], tasks: ['Adjust brakes', 'Chain lube'] },
        pros: ['Wide tire clearance', 'Flared drop bars', 'Affordable gravel'], cons: ['Mechanical discs', 'Claris groupset'], whoIsItFor: { idealRider: 'Budget gravel riders', bestScenarios: ['Gravel rides', 'Mixed terrain'] }
    },
    {
        slug: 'marin-rift-zone', name: 'Marin Rift Zone', brand: 'Marin', category: 'Mountain Bike', type: 'non-motorized', year: 2024, tags: ['mtb', 'full-suspension', 'trail', 'intermediate'],
        overview: { fullName: 'Marin Rift Zone 1 29', nicknames: ['Rift Zone'], origin: 'USA (Marin County)', history: 'Marins affordable full-suspension trail bike.', primaryUse: 'Trail', skillLevel: 'Intermediate', terrainType: ['Off-road', 'Trail'] },
        specs: { frameMaterial: '6061 Aluminum MultiTrac', frameGeometry: 'Trail', suspensionType: 'Full Suspension - RockShox Recon Silver RL 130mm / X-Fusion O2 Pro R 120mm', weight: { min: 14.5, max: 15.0, unit: 'kg' }, maxLoadCapacity: 136, wheelSize: '29"', tireType: 'Vee Tire Crown Gem 29x2.30"', rimType: 'Marin alloy tubeless-ready', gearCount: 12, gearSystem: 'Shimano Deore 1x12', drivetrainType: '1x12 speed', shifterType: 'Shimano Deore M6100', crankset: 'Shimano Deore M6100 30T', bottomBracket: 'Sealed BSA' },
        wheels: { front: { size: '29"', psi: '22-35', tubeSize: '29x2.30', rimDiameter: '622mm', rimWidth: '30mm', spokeCount: 32, valveType: 'Presta' }, rear: { size: '29"', psi: '25-38', tubeSize: '29x2.30', rimDiameter: '622mm', rimWidth: '30mm', spokeCount: 32, valveType: 'Presta' } },
        brakes: { type: 'Hydraulic Disc', front: 'Shimano MT201', rear: 'Shimano MT201', rotorSize: '180/160mm' },
        drivetrain: { pedalType: 'VP platform', crankArmLength: '175mm', chainStandard: 'Shimano Deore', freewheelOrCassette: 'Shimano Deore 10-51T', frontDerailleur: 'N/A (1x)', rearDerailleur: 'Shimano Deore M6100' },
        ergonomics: { handlebarType: 'Marin alloy riser', handlebarWidth: '780mm', saddleType: 'Marin Speed', seatHeightRange: '660-860mm', ridingPosture: 'Aggressive' },
        parts: [], pricing: { entryLevel: { inr: '1,49,999', usd: '1,800' }, midRange: { inr: '1,49,999', usd: '1,800' }, premium: { inr: '1,49,999', usd: '1,800' } },
        maintenance: { serviceInterval: 'Every 3-6 months', commonIssues: ['Pivot bearings', 'Suspension service'], tasks: ['Suspension service', 'Pivot check'] },
        pros: ['Full suspension at great price', '1x12 Deore', 'MultiTrac suspension'], cons: ['Heavy', 'Basic shock'], whoIsItFor: { idealRider: 'Budget full-suspension seekers', bestScenarios: ['Trail riding', 'All-mountain'] }
    },
    {
        slug: 'marin-dsx', name: 'Marin DSX', brand: 'Marin', category: 'Hybrid Bike', type: 'non-motorized', year: 2024, tags: ['hybrid', 'dual-sport', 'commuter'],
        overview: { fullName: 'Marin DSX 1', nicknames: ['DSX'], origin: 'USA (Marin County)', history: 'Marins dual-sport hybrid with front suspension.', primaryUse: 'Mixed Terrain', skillLevel: 'Beginner', terrainType: ['Road', 'Gravel', 'Light trail'] },
        specs: { frameMaterial: '6061 Aluminum', frameGeometry: 'Dual Sport', suspensionType: 'Hardtail - SR Suntour NEX 63mm', weight: { min: 13.5, max: 14.0, unit: 'kg' }, maxLoadCapacity: 136, wheelSize: '700c', tireType: 'Vee Tire Speedster 700x42c', rimType: 'Marin alloy', gearCount: 21, gearSystem: 'Shimano Tourney 3x7', drivetrainType: '3x7 speed', shifterType: 'Shimano Tourney EF41', crankset: 'Shimano Tourney 48-38-28T', bottomBracket: 'Sealed cartridge' },
        wheels: { front: { size: '700c', psi: '40-65', tubeSize: '700x42c', rimDiameter: '622mm', rimWidth: '21mm', spokeCount: 32, valveType: 'Schrader' }, rear: { size: '700c', psi: '40-65', tubeSize: '700x42c', rimDiameter: '622mm', rimWidth: '21mm', spokeCount: 32, valveType: 'Schrader' } },
        brakes: { type: 'Mechanical Disc', front: 'Tektro MD-M280', rear: 'Tektro MD-M280', rotorSize: '160mm' },
        drivetrain: { pedalType: 'VP platform', crankArmLength: '170mm', chainStandard: 'KMC Z7', freewheelOrCassette: 'Freewheel 14-34T', frontDerailleur: 'Shimano Tourney', rearDerailleur: 'Shimano Tourney' },
        ergonomics: { handlebarType: 'Marin alloy flat', handlebarWidth: '640mm', saddleType: 'Marin Sport', seatHeightRange: '730-970mm', ridingPosture: 'Upright' },
        parts: [], pricing: { entryLevel: { inr: '32,999', usd: '390' }, midRange: { inr: '32,999', usd: '390' }, premium: { inr: '32,999', usd: '390' } },
        maintenance: { serviceInterval: 'Every 6 months', commonIssues: ['Fork stiction'], tasks: ['Lube fork', 'Adjust brakes'] },
        pros: ['Front suspension', 'Wide tires', 'Disc brakes'], cons: ['Mechanical discs', 'Basic gearing', 'Heavy'], whoIsItFor: { idealRider: 'Mixed terrain commuters', bestScenarios: ['Road + gravel commuting'] }
    },
];

export default seedGlobal2;
