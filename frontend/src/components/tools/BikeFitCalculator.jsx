import React, { useState } from 'react';
import PageLayout from '../layout/PageLayout';
import { calculateBikeFit } from '../../utils/bikeFitCalculator';

const BikeFitCalculator = () => {
  const [inseam, setInseam] = useState('');
  const [shoulders, setShoulders] = useState('');
  const [result, setResult] = useState(null);

  const handleCalc = () => {
    if (inseam && shoulders) {
      setResult(calculateBikeFit(Number(inseam), Number(shoulders)));
    }
  };

  return (
    <PageLayout>
      <div className="p-8 max-w-2xl mx-auto w-full">
        <h1 className="font-display text-5xl text-gold mb-6">BIKE FIT CALCULATOR</h1>
        <div className="bg-bg-dark border border-border-subtle p-6 rounded space-y-4">
          <div>
            <label className="block text-xs font-body text-text-muted uppercase tracking-widest mb-2">Inseam (cm)</label>
            <input type="number" className="w-full bg-bg-void border border-border-soft p-3 rounded text-white font-mono focus:outline-none focus:border-gold" value={inseam} onChange={e=>setInseam(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-body text-text-muted uppercase tracking-widest mb-2">Shoulder Width (cm)</label>
            <input type="number" className="w-full bg-bg-void border border-border-soft p-3 rounded text-white font-mono focus:outline-none focus:border-gold" value={shoulders} onChange={e=>setShoulders(e.target.value)} />
          </div>
          <button onClick={handleCalc} className="w-full bg-gold text-[#000] font-body uppercase tracking-widest font-bold py-3 mt-4 rounded hover:bg-gold-bright transition-colors">Calculate Fit</button>
        </div>
        {result && (
          <div className="mt-8 bg-[#111] p-6 rounded border border-gold">
            <h3 className="font-display text-2xl text-white mb-4">YOUR IDEAL FIT</h3>
            <div className="space-y-2 font-mono text-gold text-lg">
              <div className="flex justify-between border-b border-[#222] pb-2">
                <span className="font-body text-xs text-text-secondary uppercase">Frame Size</span>
                <span>{result.frameSize}</span>
              </div>
              <div className="flex justify-between border-b border-[#222] pb-2">
                <span className="font-body text-xs text-text-secondary uppercase">Saddle Height</span>
                <span>{result.saddleHeight}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-body text-xs text-text-secondary uppercase">Handlebar Width</span>
                <span>{result.handlebarWidth}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
export default BikeFitCalculator;
