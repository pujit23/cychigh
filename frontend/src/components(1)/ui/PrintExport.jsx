import React from 'react';
import { Printer } from 'lucide-react';

const PrintExport = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <button 
            onClick={handlePrint}
            className="flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors font-dsans text-sm uppercase tracking-wider"
            title="Print Spec Sheet"
        >
            <Printer size={18} />
            <span>Export Specs</span>
            
            <style jsx global>{`
                @media print {
                    nav, footer, .no-print {
                        display: none !important;
                    }
                    body {
                        background: white !important;
                        color: black !important;
                    }
                    .glass-panel {
                        border: 1px solid #ccc !important;
                        box-shadow: none !important;
                        color: black !important;
                    }
                    .text-white, .text-brand-muted, .text-brand-text {
                        color: black !important;
                    }
                    * {
                        color: black !important;
                    }
                    img {
                        max-width: 100% !important;
                        page-break-inside: avoid;
                    }
                }
            `}</style>
        </button>
    );
};

export default PrintExport;
