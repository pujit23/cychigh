import React from 'react';
import PageLayout from '../layout/PageLayout';

const MinimalTool = ({ title }) => (
  <PageLayout>
    <div className="p-8 max-w-4xl mx-auto w-full text-center mt-20">
      <h1 className="font-display text-5xl text-gold mb-6 border-b border-border-subtle pb-4">{title}</h1>
      <p className="font-body text-text-secondary text-lg">This tool is currently in development. Please check back later.</p>
    </div>
  </PageLayout>
);

export const GearRatioCalculator = () => <MinimalTool title="GEAR RATIO CALCULATOR" />;
export const TireFinder = () => <MinimalTool title="TIRE FINDER" />;
export const WeightSimulator = () => <MinimalTool title="WEIGHT SIMULATOR" />;
export const UpgradeRecommender = () => <MinimalTool title="UPGRADE RECOMMENDER" />;
