import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data/collections';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Gallery = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeModalItem, setActiveModalItem] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // QuickSetter for velocity skew effect on .gallery-item
    const skewSetter = gsap.quickSetter('.gallery-item', 'skewX', 'deg');
    const proxy = { skew: 0 };
    const skewClamp = gsap.utils.clamp(-15, 15);

    const getScrollDistance = () => track.scrollWidth - window.innerWidth + 200;

    const tween = gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Velocity Skew Effect clamped between -15 and 15 degrees
          const velocity = self.getVelocity();
          const skewVal = skewClamp(velocity / -250);
          gsap.to(proxy, {
            skew: skewVal,
            duration: 0.3,
            ease: 'power3',
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const handlePrev = useCallback(() => {
    if (!activeModalItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex((item) => item.id === activeModalItem.id);
    const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setActiveModalItem(GALLERY_ITEMS[prevIndex]);
  }, [activeModalItem]);

  const handleNext = useCallback(() => {
    if (!activeModalItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex((item) => item.id === activeModalItem.id);
    const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    setActiveModalItem(GALLERY_ITEMS[nextIndex]);
  }, [activeModalItem]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!activeModalItem) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalItem(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalItem, handlePrev, handleNext]);

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="relative h-screen w-full bg-black overflow-hidden flex flex-col justify-between py-12 md:py-16 select-none border-t border-white/5"
      >
        {/* Header Bar */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex items-end justify-between z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-inter text-xs tracking-[0.35em] uppercase text-amber-400">
                Visual Exhibition
              </span>
            </div>
            <h2 className="font-bodoni text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
              The Horological Gallery
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
            <span>Scroll Horizontally</span>
            <span className="text-white/20">|</span>
            <span>Click to Enlarge</span>
          </div>
        </div>

        {/* Horizontal Moving Track */}
        <div className="relative w-full flex-1 flex items-center my-auto">
          <div
            ref={trackRef}
            className="flex items-center gap-8 md:gap-12 pl-6 md:pl-16 pr-24 will-change-transform"
          >
            {/* Gallery Intro Banner */}
            <div className="gallery-item shrink-0 w-[280px] sm:w-[340px] md:w-[400px] h-[400px] md:h-[500px] p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-black border border-white/10 flex flex-col justify-between shadow-2xl">
              <div>
                <span className="font-bodoni text-4xl text-amber-400 font-bold block mb-4">
                  05
                </span>
                <h3 className="font-bodoni text-2xl md:text-3xl font-bold text-white uppercase leading-tight mb-3">
                  Captured In Rare Form
                </h3>
                <p className="font-inter text-xs md:text-sm text-white/60 font-light leading-relaxed">
                  Every angle reflects decades of devotion. Explore our archive of macro photographs, highlighting light refraction on curved sapphire crystals and hand-chamfered gears.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs tracking-wider text-white/40">
                <span>Curated Atelier Archive</span>
                <span className="text-amber-400/80">5 Works</span>
              </div>
            </div>

            {/* Gallery Image Cards */}
            {GALLERY_ITEMS.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="gallery-item group relative shrink-0 w-[300px] sm:w-[380px] md:w-[460px] h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 hover:border-amber-400/40 shadow-2xl transition-all duration-500 cursor-pointer will-change-transform"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Corner Badge */}
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover:bg-amber-400 group-hover:text-black group-hover:scale-110 transition-all duration-300">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Caption Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-[11px] tracking-[0.25em] uppercase text-amber-400 font-semibold">
                      0{index + 1} · {item.year}
                    </span>
                    <span className="font-inter text-[10px] tracking-wider text-white/40 uppercase">
                      Inspect Work
                    </span>
                  </div>

                  <h4 className="font-bodoni text-xl md:text-2xl font-bold text-white uppercase group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h4>

                  <p className="font-inter text-xs text-white/60 line-clamp-2 font-light">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info bar */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between text-xs tracking-widest text-white/40 uppercase z-10 border-t border-white/5 pt-4">
          <span>Haute Horlogerie Exhibition</span>
          <span>Vallée de Joux · Geneva Atelier</span>
        </div>
      </section>

      {/* Fullscreen Modal powered by Framer Motion AnimatePresence */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="font-inter text-xs tracking-[0.3em] uppercase text-amber-400">
                  Atelier Exhibition
                </span>
                <span className="text-white/20">|</span>
                <span className="font-bodoni text-sm font-bold text-white tracking-widest">
                  {activeModalItem.subtitle}
                </span>
              </div>

              <button
                onClick={() => setActiveModalItem(null)}
                className="p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 cursor-pointer shadow-lg"
                aria-label="Close exhibition modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Main Image & Center Navigation */}
            <div className="relative flex-1 flex items-center justify-center my-auto py-4">
              {/* Previous button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-8 z-20 p-3.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 cursor-pointer"
                aria-label="Previous artwork"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Borderless Center Image with Motion */}
              <motion.div
                key={activeModalItem.id}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-h-[65vh] md:max-h-[72vh] max-w-4xl w-full flex items-center justify-center"
              >
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] md:max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                />
              </motion.div>

              {/* Next button */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-8 z-20 p-3.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 cursor-pointer"
                aria-label="Next artwork"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Bottom Descriptive Text */}
            <motion.div
              key={`caption-${activeModalItem.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="max-w-2xl mx-auto text-center flex flex-col items-center gap-2 z-10"
            >
              <h3 className="font-bodoni text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
                {activeModalItem.title}
              </h3>
              <p className="font-inter text-xs md:text-sm text-white/70 font-light leading-relaxed">
                {activeModalItem.caption}
              </p>
              <span className="font-inter text-[11px] text-amber-400 tracking-wider">
                {activeModalItem.details}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
