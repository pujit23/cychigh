import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompare } from '../context/CompareContext';
import PageLayout from '../components/layout/PageLayout';
import CompareSelector from '../components/compare/CompareSelector';
import CompareTable from '../components/compare/CompareTable';
import { MOCK_CYCLES } from '../utils/constants';

const ComparePage = () => {
  const { compareList = [], removeFromCompare, addToCompare } = useCompare() || { compareList: [] };
  
  const [cycle1, setCycle1] = useState(null);
  const [cycle2, setCycle2] = useState(null);

  // Sync with context if navigated with items in compare list
  useEffect(() => {
    if (compareList.length > 0 && !cycle1) setCycle1(compareList[0]);
    if (compareList.length > 1 && !cycle2) setCycle2(compareList[1]);
  }, []);

  useEffect(() => {
    if (cycle1 && cycle2) {
      window.scrollTo({ top: document.getElementById('compare-table')?.offsetTop - 80, behavior: 'smooth' });
    }
  }, [cycle1, cycle2]);

  return (
    <PageLayout>
      <div className="max-w-[1000px] mx-auto w-full px-6 py-12 relative min-h-[calc(100vh-56px)] pb-32">
        <div style={{
          padding: '48px 48px 32px 48px',
        }}>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '10px',
            color: '#444444',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>
            SPEC · BY · SPEC
          </p>
          <h1 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '96px',
            lineHeight: '0.85',
            fontWeight: '400',
            margin: '0',
            background: 'linear-gradient(180deg, #F0F0F0 0%, #333333 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            COMPARE
          </h1>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            color: '#444444',
            letterSpacing: '2px',
            marginTop: '12px',
          }}>
            Select two cycles to compare spec-by-spec
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <CompareSelector 
            selectedCycle={cycle1} 
            onSelect={setCycle1} 
            onRemove={() => setCycle1(null)} 
          />
          <CompareSelector 
            selectedCycle={cycle2} 
            onSelect={setCycle2} 
            onRemove={() => setCycle2(null)} 
          />
        </div>

        {cycle1 && cycle2 && (
          <div id="compare-table">
            <CompareTable cycle1={cycle1} cycle2={cycle2} />
          </div>
        )}

        {/* Floating Compare Bar */}
        <AnimatePresence>
          {(cycle1 && !cycle2) || (!cycle1 && cycle2) ? (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 md:left-[260px] bg-[#0C0C0C] border-t border-[#1F1F1F] p-4 flex flex-col md:flex-row items-center justify-between gap-4 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-body uppercase border border-[#FFD700] text-[#FFD700] px-2 py-1 rounded">
                  {(cycle1 || cycle2).brand} {(cycle1 || cycle2).name}
                </span>
                <span className="font-body text-[12px] text-[#555555] tracking-[2px] uppercase animate-pulse">
                  + ADD SECOND CYCLE
                </span>
              </div>
              <button className="bg-[#111111] text-[#777] px-6 py-2 font-display text-[16px] tracking-[2px] uppercase border border-[#2A2A2A] cursor-not-allowed">
                COMPARE NOW →
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
};

export default ComparePage;
