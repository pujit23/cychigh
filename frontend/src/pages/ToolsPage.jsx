import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { MOCK_CYCLES } from '../utils/constants';

const TABS = ['BIKE FIT', 'TIRE FINDER', 'GEAR RATIO', 'WEIGHT SIM', 'UPGRADES'];

const BikeFitTab = () => {
  const [results, setResults] = useState(null);

  const calculateFit = (e) => {
    e.preventDefault();
    setResults({
      frame: 'M / 54cm',
      saddle: '72.5 cm',
      handlebar: '42 cm (Road) / 720mm (MTB)',
      stem: '90 mm',
      cycles: MOCK_CYCLES.slice(10, 15)
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <form onSubmit={calculateFit} className="space-y-6 bg-[#080808] p-8 rounded border border-[#141414]">
        <h3 className="font-display text-[32px] text-[#F0F0F0] mb-4">YOUR MEASUREMENTS</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'h', label: 'Height (cm)', default: '175' },
            { id: 'i', label: 'Inseam (cm)', default: '82' },
            { id: 'a', label: 'Arm Length (cm)', default: '60' },
            { id: 't', label: 'Torso Length (cm)', default: '62' },
            { id: 's', label: 'Shoulder Width (cm)', default: '42' }
          ].map((field) => (
            <div key={field.id} className={field.id === 'h' ? 'col-span-2' : ''}>
              <label className="block font-body text-[11px] text-[#777] uppercase tracking-[1px] mb-2">{field.label}</label>
              <input type="number" defaultValue={field.default} className="w-full bg-[#050505] border border-[#1F1F1F] rounded p-3 text-center font-mono text-[#F0F0F0] focus:outline-none focus:border-[#FFD700] transition-colors" />
            </div>
          ))}
        </div>
        <button type="submit" className="w-full mt-6 bg-[#FFD700] text-[#000] hover:bg-[#FFE033] py-4 font-display text-[18px] tracking-[3px] uppercase transition-colors">
          CALCULATE FIT
        </button>
      </form>

      {results && (
        <div className="space-y-8 fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0C0C0C] border border-[#1F1F1F] p-6 rounded col-span-2 text-center">
              <span className="font-body text-[11px] text-[#777] uppercase tracking-[2px] block mb-2">Ideal Frame Size</span>
              <span className="font-mono text-[48px] text-[#FFD700]">{results.frame}</span>
            </div>
            {[
              { l: 'Saddle Height', v: results.saddle },
              { l: 'Handlebar Width', v: results.handlebar },
              { l: 'Stem Length', v: results.stem },
              { l: 'Crank Length', v: '172.5 mm' }
            ].map(r => (
              <div key={r.l} className="bg-[#0C0C0C] border border-[#141414] p-4 rounded text-center">
                <span className="font-body text-[9px] text-[#555] uppercase tracking-[1px] block mb-1">{r.l}</span>
                <span className="font-mono text-[16px] text-[#AAAAAA]">{r.v}</span>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-body text-[11px] text-[#777] uppercase tracking-[3px] mb-4">MATCHING CYCLES IN {results.frame.split(' / ')[0]} SIZE</h4>
            <div className="space-y-2">
              {results.cycles.map(c => (
                <div key={c.id} className="flex justify-between items-center p-3 border border-[#141414] rounded hover:border-[#FFD700] transition-colors cursor-pointer group">
                  <div className="flex gap-3 items-center">
                    <span className="text-[9px] border border-[#FFD700] text-[#FFD700] px-1 rounded uppercase">{c.brand}</span>
                    <span className="font-body text-[13px] text-[#F0F0F0] truncate group-hover:text-[#FFD700]">{c.name}</span>
                  </div>
                  <span className="font-mono text-[13px] text-[#AAAAAA]">{c.price_inr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TireFinderTab = () => (
  <div className="space-y-12">
    <div className="bg-[#080808] p-6 border border-[#141414] rounded flex flex-col md:flex-row gap-4 items-end">
      <div className="flex-1 w-full">
        <label className="block font-body text-[10px] text-[#777] uppercase tracking-[1px] mb-2">Wheel Size</label>
        <select className="w-full bg-[#050505] border border-[#1F1F1F] rounded p-3 font-body text-[13px] text-[#F0F0F0] focus:outline-none focus:border-[#FFD700]">
          <option>29" / 700c</option>
          <option>27.5" / 650b</option>
          <option>26"</option>
        </select>
      </div>
      <div className="flex-1 w-full">
        <label className="block font-body text-[10px] text-[#777] uppercase tracking-[1px] mb-2">Current Width</label>
        <input type="text" placeholder="e.g. 2.25 or 28c" className="w-full bg-[#050505] border border-[#1F1F1F] rounded p-3 font-mono text-[13px] text-[#F0F0F0] focus:outline-none focus:border-[#FFD700]" />
      </div>
      <div className="flex-1 w-full">
        <label className="block font-body text-[10px] text-[#777] uppercase tracking-[1px] mb-2">Terrain / Goal</label>
        <select className="w-full bg-[#050505] border border-[#1F1F1F] rounded p-3 font-body text-[13px] text-[#F0F0F0] focus:outline-none focus:border-[#FFD700]">
          <option>Mixed Grip & Speed</option>
          <option>Maximum Grip (Mud/Roots)</option>
          <option>Maximum Speed (Tarmac)</option>
          <option>Puncture Protection (Commute)</option>
        </select>
      </div>
      <button className="bg-[#1A1A1A] border border-[#333] text-[#F0F0F0] hover:bg-[#333] py-3 px-8 font-body text-[12px] uppercase tracking-[2px] rounded h-[46px]">FIND</button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {['ROAD', 'GRAVEL', 'MTB', 'COMMUTER'].map(cat => (
        <div key={cat} className="space-y-4">
          <h4 className="font-display text-[24px] text-[#555] tracking-[2px] border-b border-[#141414] pb-2">{cat}</h4>
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-[#0C0C0C] border border-[#1F1F1F] p-4 rounded hover:border-[#FFD700] transition-colors cursor-pointer">
              <span className="font-body text-[9px] text-[#FFD700] uppercase tracking-[1px] mb-1 block">Brand {i}</span>
              <h5 className="font-display text-[20px] text-[#F0F0F0] mb-2 leading-none">Model X-{i}</h5>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#141414]">
                <span className="font-mono text-[12px] text-[#AAAAAA]">700x{25 + i * 3}c</span>
                <span className="font-mono text-[12px] text-[#FFD700]">₹{2500 + i * 500}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const GearRatioTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="space-y-6 bg-[#080808] p-6 border border-[#141414] rounded">
      <h3 className="font-display text-[32px] text-[#F0F0F0]">GEAR RATIO CALCULATOR</h3>
      <div>
        <label className="block font-body text-[10px] text-[#777] uppercase tracking-[1px] mb-2">Chainring Teeth (e.g. 50/34 or 32)</label>
        <input type="text" defaultValue="32" className="w-full bg-[#050505] border border-[#1F1F1F] rounded p-3 font-mono focus:outline-none focus:border-[#FFD700] text-[#F0F0F0]" />
      </div>
      <div>
        <label className="block font-body text-[10px] text-[#777] uppercase tracking-[1px] mb-2">Cassette (e.g. 11-36, 10-51)</label>
        <input type="text" defaultValue="11-51" className="w-full bg-[#050505] border border-[#1F1F1F] rounded p-3 font-mono focus:outline-none focus:border-[#FFD700] text-[#F0F0F0]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-[10px] text-[#777] uppercase tracking-[1px] mb-2">Wheel</label>
          <select className="w-full bg-[#050505] border border-[#1F1F1F] rounded p-3 font-mono focus:outline-none focus:border-[#FFD700] text-[#F0F0F0]"><option>29"</option><option>700c</option></select>
        </div>
        <div>
          <label className="block font-body text-[10px] text-[#777] uppercase tracking-[1px] mb-2">RPM</label>
          <input type="number" defaultValue="90" className="w-full bg-[#050505] border border-[#1F1F1F] rounded p-3 font-mono focus:outline-none focus:border-[#FFD700] text-[#F0F0F0]" />
        </div>
      </div>
      <button className="w-full bg-[#111] border border-[#333] hover:border-[#FFD700] text-[#FFD700] py-4 font-display text-[16px] tracking-[2px] transition-colors rounded">CALCULATE</button>
    </div>

    <div className="lg:col-span-2 space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: 'Min Ratio (Climb)', v: '0.63', h: true }, 
          { l: 'Max Ratio (Speed)', v: '2.91', h: false },
          { l: 'Max Speed @ 90RPM', v: '36.5 km/h', h: false }, 
          { l: 'Range %', v: '464%', h: false }
        ].map(s => (
          <div key={s.l} className={`bg-[#0C0C0C] p-4 border rounded ${s.h ? 'border-[#DC2626]' : 'border-[#141414]'}`}>
             <span className="font-body text-[9px] uppercase tracking-[1px] text-[#777] block mb-2">{s.l}</span>
             <span className={`font-mono text-[24px] ${s.h ? 'text-[#DC2626]' : 'text-[#FFD700]'}`}>{s.v}</span>
          </div>
        ))}
      </div>
      
      {/* Fake Chart Output */}
      <div className="bg-[#050505] border border-[#141414] rounded h-[300px] p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-end justify-between px-12 py-12 opacity-50">
          {[10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 100].map((h, i) => (
            <div key={i} className="w-[4%] bg-gradient-to-t from-[#FFD700] to-transparent" style={{ height: `${h}%` }}></div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-4 text-center font-body text-[10px] text-[#555] uppercase tracking-[3px]">Speed vs Cadence Chart Visualization</div>
      </div>
    </div>
  </div>
);

const WeightSimTab = () => (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8 p-6 bg-[#080808] border border-[#141414] rounded flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex-1 w-full">
        <label className="block font-body text-[10px] text-[#777] uppercase tracking-[1px] mb-2">Base Cycle</label>
        <select className="w-full bg-[#050505] border border-[#1F1F1F] rounded p-3 font-body text-[14px] text-[#F0F0F0] focus:outline-none focus:border-[#FFD700]">
          <option>Trek Marlin 7 (14.2kg)</option>
          <option>Giant Talon 1 (13.8kg)</option>
        </select>
      </div>
      <div className="text-center md:text-right w-full md:w-auto">
        <span className="font-body text-[10px] text-[#777] uppercase tracking-[2px] block mb-1">Estimated Total Weight</span>
        <span className="font-mono text-[48px] text-[#16B364] leading-none">12.8<span className="text-[20px] text-[#555]">kg</span></span>
        <p className="font-mono text-[12px] text-[#16B364] mt-1">- 1.4kg saved</p>
      </div>
    </div>

    <div className="space-y-2">
      <div className="grid grid-cols-4 px-4 py-2 font-body text-[10px] text-[#555] uppercase tracking-[2px] border-b border-[#141414]">
        <div>Component</div>
        <div>Stock Weight</div>
        <div>Swap To</div>
        <div className="text-right">Diff</div>
      </div>
      {[
        { p: 'Fork', w: '2.5kg', s: 'RockShox Recon (1.9kg)', d: '-0.6kg' },
        { p: 'Wheels', w: '2.2kg', s: 'Bontrager Kovee (1.8kg)', d: '-0.4kg' },
        { p: 'Tires', w: '1.8kg', s: 'Maxxis Ikon (1.2kg)', d: '-0.6kg' },
        { p: 'Cockpit', w: '0.8kg', s: 'Carbon Setup (0.5kg)', d: '-0.3kg' },
        { p: 'Drivetrain', w: '2.4kg', s: 'Keep Stock', d: '+0.0kg' }
      ].map(r => (
        <div key={r.p} className="grid grid-cols-4 px-4 py-4 bg-[#0C0C0C] border border-[#0D0D0D] rounded items-center">
          <div className="font-body text-[13px] text-[#AAAAAA]">{r.p}</div>
          <div className="font-mono text-[12px] text-[#777]">{r.w}</div>
          <div>
            <select className="w-[90%] bg-[#050505] border border-[#1F1F1F] rounded p-1 text-[11px] font-body text-[#F0F0F0]">
              <option>{r.s}</option>
            </select>
          </div>
          <div className={`font-mono text-[14px] text-right ${r.d.startsWith('-') ? 'text-[#16B364]' : 'text-[#777]'}`}>{r.d}</div>
        </div>
      ))}
    </div>
    
    <div className="flex gap-4 mt-8 justify-end">
      <button className="px-6 py-2 border border-[#DC2626] text-[#DC2626] font-body text-[10px] uppercase tracking-[2px] rounded hover:bg-[#DC2626] hover:text-[#fff] transition-colors">RESET STOCK</button>
      <button className="px-6 py-2 bg-[#FFD700] text-[#000] font-body text-[10px] uppercase tracking-[2px] rounded hover:bg-[#FFE033] transition-colors">SELECT LIGHTEST</button>
    </div>
  </div>
);

const UpgradesTab = () => (
  <div>
    <div className="max-w-md mx-auto mb-12">
      <label className="block text-center font-body text-[10px] text-[#777] uppercase tracking-[1px] mb-2">Select Your Cycle</label>
      <select className="w-full bg-[#050505] border border-[#1F1F1F] rounded p-4 font-body text-[16px] text-[#F0F0F0] text-center focus:outline-none focus:border-[#FFD700]">
        <option>Trek Marlin 7</option>
      </select>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Priority 1 */}
      <div className="p-6 bg-[#080808] border-t-2 border-t-[#FFD700] rounded border border-[#141414]">
        <h4 className="font-display text-[24px] text-[#F0F0F0] mb-1">PRIORITY 1</h4>
        <p className="font-body text-[11px] text-[#777] uppercase tracking-[1px] mb-6">High Impact, Low Cost</p>
        <div className="space-y-4">
          {['Tires', 'Saddle', 'Pedals'].map(p => (
            <div key={p} className="bg-[#111] p-4 rounded border border-[#2A2A2A] hover:border-[#FFD700] transition-colors cursor-pointer group">
              <span className="inline-block bg-[#FFD700] text-[#000] text-[8px] font-bold px-1 rounded uppercase tracking-[1px] mb-2">Recommended</span>
              <h5 className="font-body text-[14px] text-[#F0F0F0]">{p}</h5>
              <p className="font-body text-[11px] text-[#555] mt-1">Upgrade stock {p.toLowerCase()} to transform ride feel.</p>
              <div className="flex justify-between mt-4 border-t border-[#1F1F1F] pt-2 font-mono text-[11px] text-[#AAAAAA]">
                <span>Est. ₹3k - ₹8k</span>
                <span className="text-[#FFD700] group-hover:underline">View Options</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority 2 */}
      <div className="p-6 bg-[#080808] border-t-2 border-t-[#F0F0F0] rounded border border-[#141414]">
        <h4 className="font-display text-[24px] text-[#F0F0F0] mb-1">PRIORITY 2</h4>
        <p className="font-body text-[11px] text-[#777] uppercase tracking-[1px] mb-6">Medium Cost, Good Value</p>
        <div className="space-y-4">
          {['Grips/Tape', 'Brake Pads', 'Stem/Bars'].map(p => (
            <div key={p} className="bg-[#111] p-4 rounded border border-[#1F1F1F] hover:border-[#F0F0F0] transition-colors cursor-pointer">
              <span className="inline-block border border-[#F0F0F0] text-[#F0F0F0] text-[8px] px-1 rounded uppercase tracking-[1px] mb-2">Consider</span>
              <h5 className="font-body text-[14px] text-[#F0F0F0]">{p}</h5>
              <p className="font-body text-[11px] text-[#555] mt-1">Improves ergonomics and stopping power.</p>
            </div>
          ))}
        </div>
      </div>

      {/* Priority 3 */}
      <div className="p-6 bg-[#080808] border-t-2 border-t-[#DC2626] rounded border border-[#141414]">
        <h4 className="font-display text-[24px] text-[#F0F0F0] mb-1">PRIORITY 3</h4>
        <p className="font-body text-[11px] text-[#777] uppercase tracking-[1px] mb-6">High Cost, Max Impact</p>
        <div className="space-y-4">
           {['Wheelset', 'Fork/Suspension', 'Groupset'].map(p => (
            <div key={p} className="bg-[#111] p-4 rounded border border-[#1F1F1F] hover:border-[#DC2626] transition-colors cursor-pointer">
              <span className="inline-block bg-[#DC2626]/20 text-[#DC2626] text-[8px] px-1 rounded uppercase tracking-[1px] mb-2">Major Investment</span>
              <h5 className="font-body text-[14px] text-[#F0F0F0]">{p}</h5>
              <p className="font-body text-[11px] text-[#555] mt-1">Major performance gains but high cost.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ToolsPage = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <PageLayout>
      <div className="w-full min-h-[calc(100vh-56px)] pb-24">
        
        <div className="bg-[#050505] border-b border-[#141414] pt-12">
          <div className="max-w-[1200px] mx-auto px-6">
            <h1 className="font-display text-[56px] text-[#F0F0F0] leading-none mb-8">CYCLING TOOLS</h1>
            
            <div className="flex overflow-x-auto custom-scrollbar border-b border-[#1A1A1A]">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 font-body text-[11px] tracking-[2px] uppercase whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'border-[#FFD700] text-[#FFD700]' : 'border-transparent text-[#555] hover:text-[#AAAAAA]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 pt-12">
          {activeTab === 'BIKE FIT' && <BikeFitTab />}
          {activeTab === 'TIRE FINDER' && <TireFinderTab />}
          {activeTab === 'GEAR RATIO' && <GearRatioTab />}
          {activeTab === 'WEIGHT SIM' && <WeightSimTab />}
          {activeTab === 'UPGRADES' && <UpgradesTab />}
        </div>

      </div>
    </PageLayout>
  );
};

export default ToolsPage;
