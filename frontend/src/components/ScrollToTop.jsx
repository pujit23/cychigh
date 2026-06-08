import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export default function ScrollToTop() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 400);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    if (!show) return null;
    return (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gold text-bee-black flex items-center justify-center shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-110" aria-label="Scroll to top">
            <span className="text-lg">🐝</span>
        </button>
    );
}
