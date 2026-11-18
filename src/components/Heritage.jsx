import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Compass, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);



const MILESTONES = [
  {
    year: '1884',
    title: 'The Valley Workshop',
    description: 'Master horologist Augustin Vianney establishes the atelier in Vallée de Joux, crafting chronometers for transatlantic navigators.',
  },
  {
    year: '1928',
    title: 'Astronomical Perpetual Calibre',
    description: 'Unveiling the first ultra-thin perpetual calendar complication capable of tracking leap years without manual intervention.',
  },
  {
    year: '1974',
    title: 'Silicon Escapement Architecture',
    description: 'Pioneering diamagnetic escapement components resistant to high magnetic fields, setting new precision benchmarks in Neuchâtel.',
  },
  {
    year: '2026',
    title: 'The Quadruple Tourbillon',
    description: 'Harmonizing four differential-coupled tourbillon regulators with 120-hour power reserve and Geneva Hallmark certification.',
  },
];

export const Heritage = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const textContainerRef = useRef(null);
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const imageContainer = imageContainerRef.current;
    const image = imageRef.current;
    const textContainer = textContainerRef.current;

    if (!section || !imageContainer || !image || !textContainer) return;

    // Inset clip-path mask reveal for the image container
    gsap.fromTo(
      imageContainer,
      { clipPath: 'inset(15% 15% 15% 15%)', opacity: 0.2 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    );

    // Parallax y: "20%" on the heritage image
    gsap.fromTo(
      image,
      { yPercent: -10, scale: 1.15 },
      {
        yPercent: 15,
        scale: 1.0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    // Staggered reveal for right side text elements
    const textElements = textContainer.querySelectorAll('.reveal-item');
    gsap.fromTo(
      textElements,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textContainer,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      id="heritage"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-28 md:py-36 px-6 md:px-12 flex items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Asymmetrical tall image with inset mask reveal and parallax */}
        <div className="lg:col-span-6 relative">
          <div
            ref={imageContainerRef}
            className="relative h-[55vh] md:h-[75vh] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 will-change-transform"
          >
            <img
              ref={imageRef}
              src="/images/heritage.png"
              alt="Geneva atelier watchmaking heritage since 1884"
              referrerPolicy="no-referrer"
              className="w-full h-[125%] object-cover object-center grayscale mix-blend-luminosity will-change-transform"
            />
            {/* Fine luxury gradient scrim & grain overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 pointer-events-none" />

            {/* Corner Hallmark Tag */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs tracking-[0.25em] uppercase text-white/70 backdrop-blur-md bg-black/60 px-5 py-3 rounded-lg border border-white/10">
              <span className="font-bodoni font-bold text-amber-400">Vallée de Joux</span>
              <span className="text-white/40">·</span>
              <span className="font-inter">Geneva Hallmark #084</span>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Text & History */}
        <div ref={textContainerRef} className="lg:col-span-6 flex flex-col justify-center gap-6">
          <div className="reveal-item">
            <span className="font-inter text-xs md:text-sm font-semibold tracking-[0.35em] text-amber-500 uppercase">
              Since 1884
            </span>
          </div>

          <h2 className="reveal-item font-bodoni text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] uppercase">
            A Legacy of <br />
            <span className="italic font-normal text-amber-200">Perfection</span>
          </h2>

          <div className="reveal-item space-y-4 font-inter text-sm md:text-base text-white/70 font-light leading-relaxed">
            <p>
              For over a century and four decades, Meridian has stood in unyielding pursuit of horological transcendence. Nestled in the secluded Swiss Jura mountains, our master artisans preserve centuries-old hand-finishing techniques that machines cannot replicate.
            </p>
            <p>
              Every timepiece represents up to 800 hours of devoted manual craftsmanship—from the mirror anglage on micro-bridges to the precise thermal bluing of hand-coiled Breguet balance springs. We do not mass-produce; we immortalize time.
            </p>
          </div>

          {/* Interactive Historical Milestones Timeline */}
          <div className="reveal-item pt-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Compass className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/60">
                Chronicles of Mastery
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {MILESTONES.map((item, idx) => (
                <button
                  key={item.year}
                  onClick={() => setSelectedMilestone(idx)}
                  className={`py-2 px-1 text-center border-b-2 transition-all cursor-pointer ${
                    selectedMilestone === idx
                      ? 'border-amber-400 text-amber-300 font-bold'
                      : 'border-white/10 text-white/40 hover:text-white/80 hover:border-white/30'
                  }`}
                >
                  <span className="font-bodoni text-sm md:text-base block">{item.year}</span>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 transition-all duration-300">
              <h3 className="font-bodoni text-base md:text-lg font-bold text-white mb-1">
                {MILESTONES[selectedMilestone].title}
              </h3>
              <p className="font-inter text-xs md:text-sm text-white/60 font-light leading-relaxed">
                {MILESTONES[selectedMilestone].description}
              </p>
            </div>
          </div>

          {/* Hallmarks summary strip */}
          <div className="reveal-item flex flex-wrap items-center gap-6 pt-2 text-xs tracking-wider text-white/50">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400/80" />
              <span>Poinçon de Genève Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400/80" />
              <span>100% In-House Swiss Calibres</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
