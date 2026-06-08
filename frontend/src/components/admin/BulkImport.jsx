import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { addCycle } from '../../services/api'; // In a real app we'd have a bulk api endpoint, simulating looping addCycle for this frontend demo
import { FiUploadCloud, FiFile, FiCheckCircle, FiXCircle } from 'react-icons/fi';

export default function BulkImport({ onComplete }) {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file) => {
        if (file.type !== "application/json") {
            toast.error('Only JSON files are supported');
            return;
        }
        setFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target.result);
                if (!Array.isArray(json)) {
                    throw new Error('JSON root must be an array of cycle objects');
                }
                setPreview(json);
            } catch (err) {
                toast.error('Invalid JSON file format');
                setFile(null);
                setPreview(null);
            }
        };
        reader.readAsText(file);
    };

    const handleImport = async () => {
        if (!preview || preview.length === 0) return;

        setLoading(true);
        setProgress(0);
        let successCount = 0;
        let failCount = 0;

        // Simulate bulk import loop
        for (let i = 0; i < preview.length; i++) {
            try {
                await addCycle(preview[i]);
                successCount++;
            } catch (err) {
                failCount++;
            }
            setProgress(Math.round(((i + 1) / preview.length) * 100));
        }

        setLoading(false);
        toast.success(`Import complete: ${successCount} added, ${failCount} failed`, { icon: '🐝' });
        if (onComplete) onComplete();
        setFile(null);
        setPreview(null);
        setProgress(0);
    };

    return (
        <div className="bg-bee-card border border-bee-border rounded-3xl p-6 md:p-8 shadow-glow max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl text-gold tracking-widest mb-2">BULK IMPORT</h2>
            <p className="text-gray-400 font-body text-sm mb-8">Upload a JSON array of cycle objects to import multiple cycles at once.</p>

            {!file ? (
                <form
                    onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                    onSubmit={(e) => e.preventDefault()}
                    className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all bg-bee-black
            ${dragActive ? 'border-gold bg-gold-subtle shadow-glow' : 'border-gold/30 hover:border-gold/60'}
          `}
                >
                    <input ref={inputRef} type="file" multiple={false} accept=".json" onChange={handleChange} className="hidden" />

                    <motion.div
                        animate={{ y: dragActive ? -10 : 0, scale: dragActive ? 1.1 : 1 }}
                        className="text-5xl text-gold mb-4"
                    >
                        <FiUploadCloud />
                    </motion.div>

                    <p className="font-heading text-2xl text-white mb-2 tracking-wider">DRAG & DROP JSON FILE</p>
                    <p className="text-sm text-gray-400 mb-6">or click to browse your computer</p>

                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="px-6 py-2 bg-bee-panel border border-bee-border rounded-lg text-gold font-bold uppercase tracking-wider hover:bg-gold hover:text-bee-black transition-colors"
                    >
                        Select File
                    </button>
                </form>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-bee-border bg-bee-black rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-bee-border">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold text-2xl">
                                <FiFile />
                            </div>
                            <div>
                                <h3 className="font-heading text-xl text-white tracking-widest">{file.name}</h3>
                                <p className="text-xs text-gray-500 uppercase">{(file.size / 1024).toFixed(2)} KB • {preview?.length || 0} cycles identified</p>
                            </div>
                        </div>
                        {!loading && (
                            <button onClick={() => { setFile(null); setPreview(null); }} className="text-gray-500 hover:text-danger p-2">
                                <FiXCircle size={24} />
                            </button>
                        )}
                    </div>

                    {preview && preview.length > 0 && !loading && (
                        <div className="mb-6 max-h-[200px] overflow-y-auto pr-2 custom-scroll space-y-2">
                            <h4 className="text-xs font-heading tracking-widest text-gold uppercase mb-3 sticky top-0 bg-bee-black py-1 z-10">Preview Data:</h4>
                            {preview.slice(0, 5).map((c, i) => (
                                <div key={i} className="bg-bee-panel border border-bee-border p-3 rounded-lg flex justify-between items-center text-sm">
                                    <span className="text-white font-medium">{c.name || 'Unknown Name'}</span>
                                    <span className="text-gray-500 bg-black px-2 py-0.5 rounded text-xs">{c.brand || 'Unknown Brand'}</span>
                                </div>
                            ))}
                            {preview.length > 5 && (
                                <div className="text-center text-xs text-gray-500 mt-2 py-2 italic bg-bee-panel/50 rounded-lg">
                                    ...and {preview.length - 5} more cycles
                                </div>
                            )}
                        </div>
                    )}

                    {loading ? (
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs font-bold text-gold uppercase">
                                <span>Importing Cycles...</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full h-3 bg-bee-panel rounded-full overflow-hidden border border-bee-border">
                                <motion.div
                                    className="h-full bg-gold shadow-glow"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                            <p className="text-xs text-center text-gray-500 mt-2">Please do not close this window</p>
                        </div>
                    ) : (
                        <button
                            onClick={handleImport}
                            className="w-full bg-gold text-bee-black font-heading text-xl tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-glow hover:shadow-glow-lg transition-all hover:scale-[1.02]"
                        >
                            <FiCheckCircle />
                            START IMPORT ({preview?.length || 0})
                        </button>
                    )}

                    <style dangerouslySetInnerHTML={{
                        __html: `
            .custom-scroll::-webkit-scrollbar { width: 4px; }
            .custom-scroll::-webkit-scrollbar-track { background: transparent; }
            .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,215,0,0.3); border-radius: 4px; }
          `}} />
                </motion.div>
            )}
        </div>
    );
}
