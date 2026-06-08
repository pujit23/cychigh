import React from 'react';

export default function PrintExport() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <button
                onClick={handlePrint}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider text-gold border hover:bg-gold hover:text-bee-black border-gold/50 rounded-lg transition-colors shadow-glow hover:shadow-glow-lg print-hidden"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                Export Spec Sheet
            </button>

            {/* Print-only Global Styles Injection */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @media print {
          @page { margin: 2cm; }
          body { 
            background: white !important; 
            color: black !important; 
            -webkit-print-color-adjust: exact; 
          }
          .print-hidden, nav, footer, aside, button { display: none !important; }
          .print-visible { display: block !important; }
          
          /* Force colors for printing Spec Sheet specifically */
          .bg-bee-black, .bg-bee-panel, .bg-bee-card { background: white !important; border: 1px solid #ddd !important; }
          .text-gold, .text-white, .text-gray-400, .text-gray-500 { color: black !important; }
          .border-bee-border { border-color: #ddd !important; }
          
          /* Ensure layout stays clean */
          #root { maxWidth: 100% !important; margin: 0 !important; padding: 0 !important; }
          main { padding: 0 !important; }
        }
      `}} />
        </>
    );
}
