import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ query, setQuery, placeholder = "Search cycles, brands, categories..." }) => {
    return (
        <div className="relative w-full max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/50 group-focus-within:text-brand-gold transition-colors">
                <Search size={20} />
            </div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-brand-panel border border-white/10 rounded-full py-4 pl-12 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            />
            {query && (
                <button 
                    onClick={() => setQuery('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-brand-red transition-colors"
                >
                    <X size={20} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
