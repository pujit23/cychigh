import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { matchCycle } from '../../utils/quizMatcher';
import { useCycles } from '../../context/CycleContext';
import QuizResults from './QuizResults';

const Quiz = () => {
    const { cycles, loading } = useCycles();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({
        terrain: '',
        budget: '',
        experience: ''
    });
    const [results, setResults] = useState(null);

    const questions = [
        {
            key: 'terrain',
            title: "Where do you plan to ride the most?",
            options: [
                { label: "Off-road/Trails", desc: "Dirt, rocks, roots, uneven surfaces." },
                { label: "Paved Roads", desc: "Smooth tarmac, long distances, speed." },
                { label: "Mixed/City", desc: "Commuting, potholes, occasional gravel." }
            ]
        },
        {
            key: 'budget',
            title: "What is your budget range?",
            options: [
                { label: "Under ₹20,000", desc: "Entry-level, reliable basics." },
                { label: "₹20,000 - ₹50,000", desc: "Mid-range, better components." },
                { label: "Over ₹50,000", desc: "Premium, lightweight, pro-tier." }
            ]
        },
        {
            key: 'experience',
            title: "What is your cycling experience?",
            options: [
                { label: "Beginner", desc: "Just starting out or returning after years." },
                { label: "Intermediate", desc: "Ride regularly, know basic maintenance." },
                { label: "Pro/Racer", desc: "Competitions, long endurance rides." }
            ]
        }
    ];

    const handleSelect = (val) => {
        const key = questions[step].key;
        setAnswers(prev => ({ ...prev, [key]: val }));
    };

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // Process Results
            if (!loading) {
                const matches = matchCycle(answers, cycles);
                setResults(matches);
            }
        }
    };

    if (results) {
        return <QuizResults results={results} onRestart={() => { setStep(0); setResults(null); setAnswers({ terrain:'', budget:'', experience:'' }) }} />;
    }

    const currentQ = questions[step];

    return (
        <div className="max-w-3xl mx-auto glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden mt-8">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
                <motion.div 
                    className="h-full bg-brand-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="mb-8 flex justify-between items-center text-sm font-dmono text-brand-muted">
                <span>Step {step + 1} of {questions.length}</span>
                {step > 0 && (
                    <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 hover:text-white transition-colors">
                        <ArrowLeft size={16} /> Back
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="heading-md mb-8">{currentQ.title}</h2>
                    <div className="flex flex-col gap-4 mb-10">
                        {currentQ.options.map((opt, i) => {
                            const isSelected = answers[currentQ.key] === opt.label;
                            return (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(opt.label)}
                                    className={`text-left p-6 rounded-xl border ${isSelected ? 'bg-brand-gold/10 border-brand-gold text-brand-gold' : 'bg-black/40 border-white/10 hover:border-white/30 text-white'} transition-all`}
                                >
                                    <div className="font-bebas text-2xl tracking-widest">{opt.label}</div>
                                    <div className={`mt-1 font-dsans text-sm ${isSelected ? 'text-brand-gold/80' : 'text-brand-muted'}`}>{opt.desc}</div>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            </AnimatePresence>

            <button 
                onClick={handleNext} 
                disabled={!answers[currentQ.key]}
                className={`w-full btn-gold py-4 flex justify-center items-center gap-2 ${!answers[currentQ.key] ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {step === questions.length - 1 ? 'Show My Results' : 'Continue'} <ArrowRight size={20} />
            </button>
        </div>
    );
};

export default Quiz;
