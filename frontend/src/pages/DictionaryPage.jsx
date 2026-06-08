import React from 'react';
import PageLayout from '../components/layout/PageLayout';

const DictionaryPage = () => {
  const terms = [
    { term: "Aero", def: "Design features intended to reduce aerodynamic drag." },
    { term: "Bonk", def: "A state of sudden, severe exhaustion caused by the depletion of glycogen stores." },
    { term: "Cadence", def: "The rate at which a cyclist pedals, measured in revolutions per minute (RPM)." },
    { term: "Cassette", def: "The cluster of sprockets on the rear hub of a bicycle." },
    { term: "Chainring", def: "The toothed disk attached to the crank arm that drives the chain." },
    { term: "Derailleur", def: "A mechanism for moving the chain from one sprocket to another to change gears." },
    { term: "Drop bar", def: "Curved handlebars found on road bikes that offer multiple hand positions." },
    { term: "Enduro", def: "A type of mountain bike racing where downhills are timed and uphills are mandatory but not timed." },
    { term: "FTP", def: "Functional Threshold Power. The highest power output a cyclist can maintain for 60 minutes." },
    { term: "Groupset", def: "The collection of components that make up the drivetrain and brakes." },
    { term: "Hardtail", def: "A mountain bike that has a front suspension fork but no rear suspension." },
    { term: "KOM/QOM", def: "King/Queen of the Mountain. The fastest recorded time on a specific Strava segment." },
    { term: "Lycra", def: "The spandex clothing typically worn by road cyclists for aerodynamic advantage." },
    { term: "Pannier", def: "A basket, bag, box, or similar container, carried in pairs either slung over the back or attached to the sides of a bicycle." },
    { term: "Peloton", def: "The main group or pack of riders in a road bicycle race." },
    { term: "Presta", def: "A type of valve commonly found in high-pressure road bike tubes, narrower than a Schrader valve." },
    { term: "Schrader", def: "The type of valve identical to those found on car tires, common on entry-level or mountain bikes." },
    { term: "Singletrack", def: "A narrow mountain biking trail that is approximately the width of the bike." },
    { term: "Tubeless", def: "A tire system that does not use an inner tube, relying instead on the tire and rim to hold air, often with liquid sealant." },
    { term: "Watt", def: "The standard unit of power output used to measure a cyclist's effort." }
  ];

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <PageLayout>
      <div className="max-w-[1000px] mx-auto w-full px-6 py-12 min-h-screen">
        <h1 className="font-display text-[56px] md:text-[80px] text-[#F0F0F0] leading-none mb-2 mt-4 text-center">DICTIONARY</h1>
        <p className="font-body text-[13px] text-[#555] tracking-[2px] uppercase text-center mb-12">The language of cycling</p>

        <div className="mb-12">
          <input 
            type="text" 
            placeholder="Search for a term..." 
            className="w-full bg-[#050505] border-2 border-[#141414] rounded-lg p-4 font-body text-[16px] text-[#F0F0F0] focus:outline-none focus:border-[#FFD700] text-center transition-colors placeholder:text-[#333]"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {letters.map(letter => (
            <button key={letter} className="w-8 h-8 flex items-center justify-center font-display text-[18px] text-[#777] hover:bg-[#FFD700] hover:text-[#000] rounded transition-colors bg-[#0A0A0A] border border-[#141414]">
              {letter}
            </button>
          ))}
        </div>

        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          {terms.map((t, i) => (
            <div key={i} className="break-inside-avoid bg-[#0C0C0C] border-l-2 border-l-[#FFD700] border border-[#141414] p-6 rounded hover:border-[#2A2A2A] transition-colors rounded-l-none">
              <h3 className="font-display text-[28px] text-[#F0F0F0] mb-2">{t.term}</h3>
              <p className="font-body text-[14px] text-[#AAAAAA] leading-relaxed">{t.def}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default DictionaryPage;
