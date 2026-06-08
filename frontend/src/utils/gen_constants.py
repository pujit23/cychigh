import re

brands = ["Trek", "Giant", "Specialized", "Hero", "Hercules", "Firefox", "Montra", "Cannondale", "Scott", "Merida", "Marin", "Polygon", "Btwin", "Cradiac", "Leader", "Java", "OMO", "Kross"]
categories = ["MTB", "Road", "Hybrid", "Gravel", "BMX", "City", "Touring", "Urban", "Electric"]

with open("raw_cycles.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

output = []
output.append("export const BRANDS = " + repr(brands) + ";\n")
output.append("export const CATEGORIES = " + repr(categories) + ";\n\n")
output.append("export const MOCK_CYCLES = [\n")

for line in lines:
    line = line.strip()
    if not line: continue
    
    parts = [p.strip() for p in line.split("—")]
    if len(parts) >= 3:
        num_name = parts[0]
        cat = parts[1]
        price_inr = parts[2]
        
        m = re.match(r"(\d+)\s+(.+)", num_name)
        if m:
            num = m.group(1)
            full_name = m.group(2)
            
            # Extract brand from full name
            brand_found = ""
            for b in brands:
                if full_name.lower().startswith(b.lower()):
                    brand_found = b
                    break
            
            if not brand_found:
                brand_found = "Unknown"
            
            name = full_name
            if brand_found != "Unknown" and name.startswith(brand_found):
                name = name[len(brand_found):].strip()
                
            id_str = full_name.lower().replace(" ", "-").replace(".", "")
            
            # Some default values based on prompt
            price_val = int(price_inr.replace("₹", "").replace(",", ""))
            price_usd = "$" + str(int(price_val / 83))
            
            obj_str = f"""  {{
    id: '{id_str}',
    name: '{name}',
    brand: '{brand_found}',
    fullName: '{full_name}',
    category: '{cat}',
    type: '{cat} Bike',
    price_inr: '{price_inr}',
    price_usd: '{price_usd}',
    weight: '14.2kg',
    frame: 'Aluminum',
    fork: 'SR Suntour XCT',
    wheelSize: '27.5"',
    speeds: 21,
    brakes: 'Mechanical Disc',
    groupset: 'Shimano Tourney',
    skillLevel: 'beginner',
    terrain: ['trail', 'city'],
    image: '/images/{id_str}.jpg',
    tags: ['entry-level', 'trail', 'hardtail']
  }},"""
            output.append(obj_str + "\n")

output.append("];\n")

with open("constants.js", "w", encoding="utf-8") as f:
    f.writelines(output)
