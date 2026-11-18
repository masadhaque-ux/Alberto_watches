import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { COLLECTIONS } from '../data/collections';
import { ArrowRight, Compass, Shield, Zap, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);



export const CollectionsShowcase = ({ onSelectWatch }) => {
  const containerRef = useRef(null);
  const pinnedSectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const pinnedSection = pinnedSectionRef.current;
    if (!container || !pinnedSection) return;

    // Pin container for scrolling through 4 collections
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=2400',
      pin: pinnedSection,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Map 0 -> 1 progress cleanly into 4 indices (0, 1, 2, 3)
        const count = COLLECTIONS.length;
        const rawIndex = Math.floor(self.progress * count);
        const nextIndex = Math.min(count - 1, Math.max(0, rawIndex));

        // Ref check to prevent unnecessary React renders on every pixel scroll
        if (nextIndex !== activeIndexRef.current) {
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const current = COLLECTIONS[activeIndex];

  const handleManualSelect = (index) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  return (
    <div
      id="collections"
      ref={containerRef}
      className="relative w-full bg-black select-none"
      style={{ height: '3400px' }} // Provides room for the pinned scroll experience
    >
      <div
        ref={pinnedSectionRef}
        className="h-screen w-full relative flex items-center justify-center overflow-hidden"
      >
        {/* Dynamic Background Morph Layer */}
        <div
          className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none"
          style={{ background: current.themeColor.gradient }}
        />

        {/* Floating Luxury Particle Dust SVGs */}
        <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="particle-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={current.themeColor.accent} stopOpacity="0.8" />
                <stop offset="100%" stopColor={current.themeColor.accent} stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="15%" cy="20%" r="3" fill="url(#particle-glow)" className="animate-pulse" />
            <circle cx="85%" cy="30%" r="4" fill="url(#particle-glow)" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <circle cx="25%" cy="75%" r="2.5" fill="url(#particle-glow)" className="animate-pulse" style={{ animationDelay: '2s' }} />
            <circle cx="78%" cy="80%" r="3.5" fill="url(#particle-glow)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
            <circle cx="50%" cy="15%" r="2" fill="url(#particle-glow)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="60%" cy="85%" r="3" fill="url(#particle-glow)" className="animate-pulse" style={{ animationDelay: '2.5s' }} />
          </svg>
        </div>

        {/* Subtle Background Radial Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-bodoni text-[20vw] font-bold text-white/[0.02] tracking-tighter leading-none uppercase whitespace-nowrap">
            {current.name}
          </span>
        </div>

        {/* 3-Column Luxury Layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto h-full px-6 md:px-12 flex flex-col justify-between py-24 md:py-16">
          {/* Top Collection Progress Indicators */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-inter text-xs tracking-[0.3em] uppercase text-white/50">
                Collection Archive
              </span>
              <span className="text-white/20">|</span>
              <span className="font-bodoni text-sm font-bold text-amber-400">
                {current.number}
              </span>
            </div>

            {/* Quick Selector Pills */}
            <div className="flex items-center gap-2">
              {COLLECTIONS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => handleManualSelect(i)}
                  className={`px-3 py-1 text-[11px] font-semibold tracking-wider rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === i
                      ? 'bg-white text-black font-bold scale-105'
                      : 'text-white/40 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label={`Switch to ${c.name}`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Main 3-Column Grid */}
          <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto">
            {/* Left Column: Number, Title, Headline, CTA */}
            <div className="lg:col-span-4 z-20 flex flex-col justify-center order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4 text-left"
                >
                  <span className="font-inter text-xs font-semibold tracking-[0.35em] uppercase text-amber-400/90">
                    {current.subtitle}
                  </span>

                  <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none uppercase">
                    {current.name}
                  </h2>

                  <p className="font-inter text-sm md:text-base font-light text-white/80 tracking-wide leading-relaxed">
                    "{current.headline}"
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => onSelectWatch(current)}
                      className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/30 bg-white/5 backdrop-blur-md text-xs font-bold tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-xl"
                    >
                      <span>Discover Timepiece</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <span className="font-inter text-xs text-white/40 tracking-wider">
                      {current.limitedEdition}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center Column: Massive Absolute Watch Drop-In Image */}
            <div className="lg:col-span-4 relative h-[360px] sm:h-[420px] md:h-[500px] lg:h-[620px] flex items-center justify-center order-1 lg:order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ y: '100%', opacity: 0, scale: 0.85 }}
                  animate={{ y: '0%', opacity: 1, scale: 1 }}
                  exit={{ y: '-60%', opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  {/* Subtle backglow behind watch */}
                  <div
                    className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl opacity-50"
                    style={{ backgroundColor: current.themeColor.light }}
                  />

                  <img
                    src={current.image}
                    alt={current.name}
                    referrerPolicy="no-referrer"
                    className="relative max-h-[88%] max-w-[92%] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] filter hover:scale-105 transition-transform duration-700 pointer-events-auto"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Description & 2x2 Specs Grid */}
            <div className="lg:col-span-4 z-20 flex flex-col justify-center order-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-6"
                >
                  <p className="font-inter text-xs md:text-sm text-white/70 font-light leading-relaxed">
                    {current.description}
                  </p>

                  {/* 2x2 Specifications Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-white/40 mb-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-inter text-[10px] tracking-wider uppercase">Movement</span>
                      </div>
                      <p className="font-inter text-xs font-semibold text-white truncate">
                        {current.specs.movement}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-white/40 mb-1">
                        <Compass className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-inter text-[10px] tracking-wider uppercase">Power Reserve</span>
                      </div>
                      <p className="font-inter text-xs font-semibold text-white tabular-nums">
                        {current.specs.powerReserve}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-white/40 mb-1">
                        <Shield className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-inter text-[10px] tracking-wider uppercase">Case Material</span>
                      </div>
                      <p className="font-inter text-xs font-semibold text-white truncate">
                        {current.specs.caseMaterial}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-white/40 mb-1">
                        <Droplets className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-inter text-[10px] tracking-wider uppercase">Water Resistance</span>
                      </div>
                      <p className="font-inter text-xs font-semibold text-white tabular-nums">
                        {current.specs.waterResistance}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 block">Price Upon Request</span>
                      <span className="font-bodoni text-lg font-bold text-white tracking-wide">
                        {current.price}
                      </span>
                    </div>

                    {/* Left/Right arrow controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleManualSelect((activeIndex - 1 + COLLECTIONS.length) % COLLECTIONS.length)}
                        className="p-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        aria-label="Previous timepiece"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleManualSelect((activeIndex + 1) % COLLECTIONS.length)}
                        className="p-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        aria-label="Next timepiece"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Scroll Cue */}
          <div className="flex items-center justify-between text-[11px] text-white/40 tracking-[0.25em] uppercase pt-4 border-t border-white/5">
            <span>Scroll to Cycle Calibres</span>
            <span className="hidden sm:inline">Geneva Seal · Swiss Made</span>
            <span>{activeIndex + 1} of {COLLECTIONS.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
