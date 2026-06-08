import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  {
    title: "HOW LONG HAVE YOU BEEN CYCLING?",
    options: ["Never ridden", "Less than 1 year", "1 to 3 years", "More than 3 years"]
  },
  {
    title: "WHERE WILL YOU RIDE MOST?",
    options: ["City roads and commuting", "Mountain trails and off-road", "Long highway tours", "Mix of roads and trails"]
  },
  {
    title: "WHAT IS YOUR BUDGET?",
    options: ["Under ₹15,000", "₹15,000 to ₹30,000", "₹30,000 to ₹60,000", "Above ₹60,000"]
  },
  {
    title: "WHAT IS YOUR PRIMARY GOAL?",
    options: ["Fitness and health", "Daily commuting", "Adventure and exploration", "Speed and competition"]
  },
  {
    title: "WHAT IS YOUR HEIGHT?",
    options: ["Under 5'2\"", "5'2\" to 5'6\"", "5'6\" to 5'10\"", "Above 5'10\""]
  }
];

const Quiz = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleOptionClick = (idx) => {
    const newAnswers = [...answers, idx];
    if (currentStep < QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentStep(s => s + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const currentQ = QUESTIONS[currentStep];
  const progressPercent = ((currentStep) / QUESTIONS.length) * 100;

  return (
    <div className="w-full flex justify-center items-center min-h-[calc(100vh-56px)] bg-[#020202] px-4 md:px-0">
      
      {/* Progress Bar Top */}
      <div className="fixed top-[56px] left-0 right-0 h-[3px] bg-[#111111] z-[100]">
        <div 
          className="h-full bg-[#FFD700] transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="w-full max-w-[640px] pt-8">
        <p className="font-mono text-[11px] text-[#333333] mb-8 tracking-[2px] uppercase">
          QUESTION {currentStep + 1} OF {QUESTIONS.length}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-display text-[40px] md:text-[56px] text-[#F0F0F0] leading-none mb-2 tracking-tight">
              {currentQ.title}
            </h2>
            <p className="font-body text-[13px] text-[#444444] mb-12">Select the option that best describes you.</p>
            
            <div className="space-y-4">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  className="w-full group bg-[#0C0C0C] border border-[#1F1F1F] p-5 rounded flex items-center justify-between hover:border-[#FFD700] hover:bg-[#111111] transition-all duration-200 text-left"
                >
                  <span className="font-body text-[14px] text-[#AAAAAA] group-hover:text-[#F0F0F0] transition-colors">{opt}</span>
                  <div className="w-5 h-5 rounded-full border border-[#333333] group-hover:border-[#FFD700] flex items-center justify-center transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full bg-transparent group-active:bg-[#FFD700] transition-colors"></div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
