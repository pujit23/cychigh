import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BeeMascot() {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 1000);
    };

    return (
        <motion.div
            className="fixed bottom-[80px] right-6 z-40 cursor-pointer hidden md:block group"
            onClick={handleClick}
            title="CycHigh 🐝"

            // Infinite flying figure-8 path
            animate={clicked ? {
                scale: [1, 1.5, 0.8, 1.2, 1],
                rotate: [0, -20, 20, -10, 0],
                transition: { duration: 0.6 }
            } : {
                y: [0, -20, 0, 15, 0],
                x: [0, -15, -30, -15, 0, 15, 30, 15, 0],
                rotate: [0, -10, 0, 10, 0],
                transition: {
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop"
                }
            }}
        >
            <div className="relative">
                <span className="text-[48px] filter drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                    🐝
                </span>

                {/* Tooltip on hover */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-bee-panel border border-bee-border text-gold px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-glow">
                    Bzzzt!
                </div>
            </div>
        </motion.div>
    );
}
