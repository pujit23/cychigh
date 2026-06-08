import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-bee-panel border-t border-bee-border">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="font-heading text-2xl text-gold tracking-[3px] mb-2">P23</div>
                        <h3 className="font-heading text-lg text-white tracking-wider mb-2">CYCHIGH</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">The World's Most Complete Cycle Encyclopedia. 120+ cycles with real specs.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-3 text-sm tracking-wider uppercase">Navigate</h4>
                        <div className="flex flex-col gap-2">
                            {[['/', 'Home'], ['/explore', 'Explore Cycles'], ['/compare', 'Compare'], ['/glossary', 'Glossary']].map(([p, l]) => (
                                <Link key={p} to={p} className="text-gray-500 hover:text-gold text-sm transition-colors">{l}</Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-3 text-sm tracking-wider uppercase">Top Brands</h4>
                        <div className="flex flex-col gap-2">
                            {['Trek', 'Giant', 'Specialized', 'Cannondale', 'Scott'].map(b => (
                                <Link key={b} to={`/explore?brand=${b}`} className="text-gray-500 hover:text-gold text-sm transition-colors">{b}</Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-3 text-sm tracking-wider uppercase">Categories</h4>
                        <div className="flex flex-col gap-2">
                            {['Mountain Bike', 'Road Bike', 'Hybrid Bike', 'Gravel Bike'].map(c => (
                                <Link key={c} to={`/explore?category=${c}`} className="text-gray-500 hover:text-gold text-sm transition-colors">{c}</Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border-t border-bee-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <span className="font-heading text-gold text-lg tracking-[3px]">P23</span>
                        <span className="text-gray-600 text-sm">CycHigh — Know Your Ride</span>
                    </div>
                    <p className="text-gray-600 text-[13px] font-body">Made by Pujit Balanthiran</p>
                    <p className="text-gray-700 text-xs">© 2024 CycHigh. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
