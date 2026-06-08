import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useSearch from '../../hooks/useSearch'; // Currently useSearch has a default export

export default function SearchBar() {
    const [expanded, setExpanded] = useState(false);
    const { query, setQuery, results, searching, clearSearch } = useSearch();
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const nav = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                setExpanded(false);
                clearSearch();
            }
        });

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [clearSearch]);

    const handleExpand = () => {
        setExpanded(true);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleSelect = (slug) => {
        setExpanded(false);
        clearSearch();
        nav(`/cycle/${slug}`);
    };

    return (
        <div className="relative z-50" ref={containerRef}>
            <motion.div
                className={`flex items-center bg-bee-black border rounded-full overflow-hidden transition-colors ${expanded ? 'border-gold shadow-glow' : 'border-bee-border hover:border-gold/50'
                    }`}
                initial={false}
                animate={{ width: expanded ? 300 : 40 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <button
                    onClick={handleExpand}
                    className="w-10 h-10 flex items-center justify-center text-gold/80 hover:text-gold shrink-0 focus:outline-none"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>

                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search cycles..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-transparent border-none text-white text-sm outline-none w-full p-0 pr-10 focus:ring-0 placeholder-gray-500"
                />

                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 text-gray-500 hover:text-white"
                    >
                        ×
                    </button>
                )}
            </motion.div>

            <AnimatePresence>
                {expanded && query.length >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-12 right-0 w-[400px] bg-bee-panel border border-bee-border rounded-xl shadow-glow overflow-hidden"
                    >
                        {searching ? (
                            <div className="p-4 text-center text-gray-500 text-sm animate-pulse">
                                Searching the hive... 🐝
                            </div>
                        ) : results.length > 0 ? (
                            <ul className="max-h-[300px] overflow-y-auto">
                                {results.slice(0, 8).map(cycle => (
                                    <li key={cycle._id}>
                                        <button
                                            onClick={() => handleSelect(cycle.slug)}
                                            className="w-fulltext-left px-4 py-3 hover:bg-gold/10 flex items-center justify-between border-b border-bee-border/50 transition-colors"
                                        >
                                            <div className="flex flex-col text-left">
                                                <span className="font-heading text-lg text-white">{cycle.name}</span>
                                                <span className="text-xs text-gray-500">{cycle.brand}</span>
                                            </div>
                                            <span className="text-[10px] uppercase font-bold text-gold px-2 py-1 border border-gold/30 rounded-md bg-gold/5">
                                                {cycle.category}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-6 text-center text-gray-400">
                                <div className="text-3xl mb-2">🐝❓</div>
                                <p>No cycles found for "{query}"</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
