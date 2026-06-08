import React from 'react';
import { Wrench, Droplet, Cog, ArrowRight } from 'lucide-react';

const tasks = [
    { title: "Weekly Wash", icon: Droplet, desc: "A clean bike is a fast bike. Use gentle soap, avoid high-pressure water near bearings, and dry thoroughly." },
    { title: "Drivetrain Degrease", icon: Cog, desc: "Every 200km. Use a dedicated citrus degreaser on the chain, cassette, and chainrings. Scrub with a stiff brush." },
    { title: "Chain Lube", icon: Wrench, desc: "Apply a single drop of dry/wet lube to each chain link roller. Let it set, then wipe off all excess. Never lube a dirty chain." },
    { title: "Tire Inspection", icon: Wrench, desc: "Check tire pressure before every ride. Inspect for cuts, embedded glass, and wear indicators weekly." },
    { title: "Bolt Torque Check", icon: Cog, desc: "Monthly check of stem, seatpost, and pedal torques. Use a torque wrench, especially on carbon components." },
    { title: "Brake Pad Wear", icon: Wrench, desc: "Inspect pads every month. If the pad material is thinner than a dime (1mm), replace them immediately." }
];

const MaintenancePage = () => {
    return (
        <div className="py-12 max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
                <h1 className="heading-lg mb-4">Maintenance Garage</h1>
                <p className="text-xl text-brand-muted font-dsans max-w-2xl mx-auto">Keep your machine running perfectly with these essential maintenance routines.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tasks.map((task, i) => (
                    <div key={i} className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-all hover:-translate-y-1 group">
                        <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <task.icon size={28} className="text-brand-gold" />
                        </div>
                        <h3 className="font-bebas text-2xl tracking-widest text-white mb-3">{task.title}</h3>
                        <p className="text-brand-muted font-dsans leading-relaxed mb-6">{task.desc}</p>
                        
                        <button className="flex items-center gap-2 text-sm font-dmono uppercase tracking-widest text-brand-gold hover:text-white transition-colors mt-auto">
                            Read Guide <ArrowRight size={16} />
                        </button>
                    </div>
                ))}
            </div>
            
            <div className="mt-16 bg-brand-red/10 border border-brand-red/30 p-8 rounded-2xl text-center">
                <h3 className="font-bebas text-3xl tracking-widest text-brand-red mb-2">When to see a professional?</h3>
                <p className="text-white/80 font-dsans max-w-3xl mx-auto">Complex tasks like suspension fluid changes, wheel truing, press-fit bottom bracket replacement, and hydraulic brake bleeding should be left to certified mechanics if you don't have the specific tools and experience.</p>
            </div>
        </div>
    );
};

export default MaintenancePage;
