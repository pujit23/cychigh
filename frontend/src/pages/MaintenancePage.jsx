import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';

const GUIDES = [
  { id: 1, title: 'Clean and Lube Your Chain', diff: 'EASY', time: '15 MINS', tools: ['Degreaser', 'Chain Lube', 'Rags', 'Brush'], steps: ['Apply degreaser to chain while backpedaling.', 'Scrub cassette and chainrings with brush.', 'Rinse thoroughly with low-pressure water and dry.', 'Apply one drop of lube per chain link.', 'Wipe off excess lube with a clean rag.'] },
  { id: 2, title: 'Fix a Flat Tire', diff: 'EASY', time: '20 MINS', tools: ['Tire Levers', 'Spare Tube or Patch Kit', 'Pump'], steps: ['Remove wheel from bike and deflate tire completely.', 'Use lever to unseat one bead of the tire.', 'Remove old tube and check inside of tire for sharp objects.', 'Slightly inflate new tube and insert.', 'Reseat tire bead, inflate to pressure, and reinstall wheel.'] },
  { id: 3, title: 'Adjust Mechanical Disc Brakes', diff: 'MEDIUM', time: '30 MINS', tools: ['Hex Keys', 'Clean Rag', 'Isopropyl Alcohol'], steps: ['Clean rotor with alcohol.', 'Loosen caliper mounting bolts slightly.', 'Squeeze brake lever to center caliper over rotor.', 'Snug bolts while holding lever.', 'Adjust inner pad dial until it just clears the rotor.'] },
  { id: 4, title: 'Index Rear Derailleur', diff: 'MEDIUM', time: '30 MINS', tools: ['Hex Keys', 'Phillips Screwdriver'], steps: ['Shift to smallest rear cog.', 'Adjust H-limit screw until pulley aligns with cog.', 'Shift up one gear. If it hesitates, turn barrel adjuster counter-clockwise.', 'Check shifting through all gears.', 'Adjust L-limit screw for largest cog.'] },
  { id: 5, title: 'Replace Brake Pads (Hydraulic)', diff: 'MEDIUM', time: '20 MINS', tools: ['Pliers', 'Pad Spreader', 'Hex Keys'], steps: ['Remove wheel.', 'Remove retaining pin/clip from caliper.', 'Pull old pads out.', 'Use spreader to push pistons back into housing.', 'Insert new pads and spring, reinstall pin, pump brakes.'] },
  { id: 6, title: 'Wash Your Bike', diff: 'EASY', time: '30 MINS', tools: ['Bucket', 'Bike Wash Soap', 'Brushes', 'Sponge'], steps: ['Rinse bike gently (no high pressure).', 'Wash frame from top to bottom.', 'Degrease drivetrain separately.', 'Rinse everything thoroughly.', 'Dry with towel and re-lube chain.'] },
  { id: 7, title: 'Wrap Handlebar Tape', diff: 'HARD', time: '45 MINS', tools: ['New Tape', 'Scissors', 'Electrical Tape'], steps: ['Remove old tape and clean bars.', 'Start at bar ends, leaving 1/3 overlap.', 'Wrap outward and upward, keeping tension.', 'Use figure-8 method around shifters.', 'Cut angle at the top and secure with electrical tape.'] },
  { id: 8, title: 'Bleed Hydraulic Brakes', diff: 'HARD', time: '60 MINS', tools: ['Bleed Kit', 'Brake Fluid', 'Hex Keys', 'Rags'], steps: ['Orient lever parallel to ground.', 'Attach syringes to lever and caliper.', 'Push fluid from bottom to top to remove air.', 'Close system and clean any spilled fluid.', 'Test lever feel.'] },
  { id: 9, title: 'Replace a Chain', diff: 'MEDIUM', time: '20 MINS', tools: ['Chain Breaker Tool', 'Quick Link Pliers'], steps: ['Break old chain and remove.', 'Route new chain through derailleurs.', 'Size chain by wrapping around largest chainring and largest cog (bypassing derailleur) and adding 2 links.', 'Cut to size with breaker tool.', 'Connect with quick link.'] },
  { id: 10, title: 'Adjust Headset Basics', diff: 'EASY', time: '10 MINS', tools: ['Hex Keys'], steps: ['Loosen stem clamp bolts.', 'Tighten top cap bolt until play is removed but steering is smooth.', 'Check alignment of stem with front wheel.', 'Tighten stem clamp bolts to spec.'] }
];

const GuideCard = ({ guide }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getDiffColor = (d) => {
    if (d === 'EASY') return 'text-[#16B364] border-[#16B364]';
    if (d === 'MEDIUM') return 'text-[#FFD700] border-[#FFD700]';
    return 'text-[#DC2626] border-[#DC2626]';
  };

  return (
    <div className="bg-[#0C0C0C] border border-[#1F1F1F] rounded-lg overflow-hidden transition-colors hover:border-[#FFD700]">
      <div 
        className="p-6 cursor-pointer flex items-center justify-between group bg-[#0A0A0A] hover:bg-[#111]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-[9px] font-body uppercase border px-2 py-0.5 rounded tracking-[1px] ${getDiffColor(guide.diff)}`}>
              {guide.diff}
            </span>
            <span className="font-mono text-[11px] text-[#777] flex items-center gap-1">⏱ {guide.time}</span>
          </div>
          <h3 className="font-display text-[24px] md:text-[28px] text-[#F0F0F0] leading-none group-hover:text-[#FFD700] transition-colors">
            {guide.title}
          </h3>
        </div>
        <div className="ml-4 w-10 h-10 border border-[#2A2A2A] rounded-full flex items-center justify-center text-[#777] group-hover:border-[#FFD700] group-hover:text-[#FFD700] transition-colors">
          <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </div>
      </div>
      
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] border-t border-[#1F1F1F]' : 'max-h-0'}`}>
        <div className="p-6 bg-[#050505]">
          <div className="mb-6">
            <h4 className="font-body text-[10px] text-[#555] uppercase tracking-[2px] mb-3">Tools Needed</h4>
            <div className="flex flex-wrap gap-2">
              {guide.tools.map((t, i) => (
                <span key={i} className="font-body text-[11px] text-[#AAAAAA] bg-[#111] border border-[#141414] px-3 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-body text-[10px] text-[#555] uppercase tracking-[2px] mb-4">Steps</h4>
            <div className="space-y-4">
              {guide.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="font-mono text-[14px] text-[#FFD700] mt-0.5">{(i + 1).toString().padStart(2, '0')}</div>
                  <div className="font-body text-[14px] text-[#F0F0F0] leading-relaxed">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MaintenancePage = () => {
  return (
    <PageLayout>
      <div className="max-w-[800px] mx-auto w-full px-6 py-12 min-h-screen pb-32">
         <div className="text-center mb-16">
          <h1 className="font-display text-[56px] md:text-[80px] text-[#F0F0F0] leading-none mb-4">MAINTENANCE</h1>
          <p className="font-body text-[14px] text-[#555] tracking-[2px] uppercase">DIY guides to keep your ride smooth</p>
        </div>
        
        <div className="space-y-4">
          {GUIDES.map(g => (
            <GuideCard key={g.id} guide={g} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default MaintenancePage;
