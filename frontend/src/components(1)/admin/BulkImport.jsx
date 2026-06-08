import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';

export default function BulkImport({ onClose }) {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && selected.type === 'application/json') {
            setFile(selected);
        } else {
            toast.error('Invalid Protocol: Expecting .json configuration.', {
                style: { border: '1px solid #DC2626' },
                iconTheme: { primary: '#DC2626', secondary: '#000' }
            });
        }
    };

    const processImport = () => {
        if (!file) return;
        setIsProcessing(true);

        // Simulate API pipeline logic visually
        setTimeout(() => {
            setIsProcessing(false);
            toast.success('System Matrix Updated Sequence OK');
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-bg-deepest/90 backdrop-blur-md" onClick={onClose} />

            <div className="relative w-full max-w-lg bg-bg-dark border border-border-mid p-8 shadow-dark-lift">
                <div className="mb-6">
                    <span className="font-heading text-3xl text-gold uppercase tracking-widest block mb-2">Mass Data Pipeline</span>
                    <p className="font-body text-[10px] text-text-muted uppercase tracking-[0.2em] leading-relaxed">
                        Import a validated JSON payload to sync telemetry en masse. Erroneous schemas will be rejected by the matrix core.
                    </p>
                </div>

                <div
                    className="w-full h-32 border border-dashed border-border-mid flex flex-col items-center justify-center hover:bg-[#0F0F0F] hover:border-text-muted transition-colors cursor-pointer mb-6"
                    onClick={() => fileInputRef.current.click()}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="text-text-secondary mb-3">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span className="font-body text-xs text-text-primary mb-1">
                        {file ? file.name : 'Select or drop JSON file'}
                    </span>
                    <span className="font-mono text-[9px] text-text-muted uppercase">
                        {file ? `${(file.size / 1024).toFixed(2)} KB` : 'MAXIMUM SIZE: 5MB'}
                    </span>
                </div>
                <input type="file" required accept=".json" className="hidden" ref={fileInputRef} onChange={handleFileChange} />

                <div className="flex justify-between items-center pt-4 border-t border-[#0F0F0F]">
                    <button onClick={onClose} className="font-body text-[11px] uppercase tracking-widest text-[#444] hover:text-text-primary transition-colors focus:outline-none">
                        ABORT
                    </button>
                    <button
                        onClick={processImport}
                        disabled={!file || isProcessing}
                        className="bg-text-primary text-bg-deepest px-6 py-2 font-heading text-lg uppercase tracking-widest hover:bg-gold transition-colors disabled:opacity-50 focus:outline-none"
                    >
                        {isProcessing ? 'PROCESSING...' : 'EXECUTE IMPORT'}
                    </button>
                </div>
            </div>
        </div>
    );
}
