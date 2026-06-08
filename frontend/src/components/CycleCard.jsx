import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import CycleImage from './cycle/CycleImage';

export default function CycleCard({ cycle }) {
    return (
        <Link to={`/cycle/${cycle.id}`} className="group block bg-bee-card border border-bee-border rounded-2xl overflow-hidden hover:border-gold/30 hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
            <CycleImage cycle={cycle} height={180} />
            <div className="p-4">
                <h3 className="font-heading text-xl text-white tracking-wide mb-2 group-hover:text-gold transition-colors">{cycle.name || cycle.fullName}</h3>
                <div className="flex gap-2 flex-wrap mb-3">
                    <span className="px-2 py-0.5 bg-gold/10 text-gold text-[11px] font-semibold rounded-full border border-gold/20 uppercase tracking-wider">{cycle.brand}</span>
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[11px] font-semibold rounded-full uppercase tracking-wider">{cycle.category}</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-xs text-gray-500 mb-3">
                    <span>⚙️ {cycle.groupset || '—'}</span>
                    <span>🔩 {cycle.frame || '—'}</span>
                    <span>🛞 {cycle.wheelSize || '—'}</span>
                    <span>⚖️ {cycle.weight || '—'}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-bee-border">
                    <span className="font-heading text-gold text-lg tracking-wider">{cycle.price_inr || '—'}</span>
                    <FiChevronRight className="text-gold/50 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        </Link>
    );
}
