import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Quiz from '../components/quiz/Quiz';
import QuizResults from '../components/quiz/QuizResults';

export default function QuizPage() {
    const [quizComplete, setQuizComplete] = useState(false);
    const [answers, setAnswers] = useState(null);

    const handleQuizComplete = (finalAnswers) => {
        setAnswers(finalAnswers);
        setQuizComplete(true);
    };

    const handleRetake = () => {
        setQuizComplete(false);
        setAnswers(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full min-h-screen pt-12 pb-24 px-6 relative overflow-hidden"
            style={{ background: 'var(--bg-deepest)' }}
        >
            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-20" style={{
                backgroundSize: '48px 48px',
                backgroundImage: 'linear-gradient(var(--border-ghost) 1px, transparent 1px), linear-gradient(90deg, var(--border-ghost) 1px, transparent 1px)'
            }}></div>

            <div className="max-w-7xl mx-auto relative z-10 w-full h-full">
                
                {!quizComplete && (
                    <div className="w-full flex flex-col justify-center items-center text-center mb-16">
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--red)', letterSpacing: '4px', display: 'block', marginBottom: '8px' }}>
                            SYS.MATCH
                        </span>
                        <h1 className="m-0" style={{ fontFamily: 'var(--font-display)', fontSize: '56px', color: 'var(--text-primary)', textTransform: 'uppercase', lineHeight: 1 }}>
                            Rider Diagnostic
                        </h1>
                        <p className="m-0 mt-3 max-w-lg" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-ghost)', textTransform: 'uppercase', letterSpacing: '3px' }}>
                            ANSWER 5 QUESTIONS TO ISOLATE YOUR PERFECT CYCLE MATCH FROM OUR 120-VEHICLE DATABASE.
                        </p>
                    </div>
                )}

                {!quizComplete ? (
                    <Quiz onComplete={handleQuizComplete} />
                ) : (
                    <QuizResults answers={answers} onRetake={handleRetake} />
                )}

            </div>
        </motion.div>
    );
}
