import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Craftsmanship = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const bgImageRef = useRef(null);
  const foregroundTextRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const bgImage = bgImageRef.current;
    const foregroundText = foregroundTextRef.current;
    const details = detailsRef.current;

    if (!container || !bgImage || !foregroundText) return;

    // Background Layer: Macro shot scaling up and moving y: "20%" via GSAP scrub
    gsap.fromTo(
      bgImage,
      { scale: 1.0, yPercent: -10 },
      {
        scale: 1.25,
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    );

    // Foreground Text: Center-aligned "Unseen Precision" that fades in at start: "top 60%" and fades out at start: "bottom 80%"
    gsap.fromTo(
      foregroundText,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 60%',
          end: 'center 45%',
          scrub: true,
        },
      }
    );

    // Fade out towards the end of the 150vh scroll
    gsap.to(foregroundText, {
      opacity: 0,
      y: -50,
      scale: 1.05,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: container,
        start: 'center 30%',
        end: 'bottom 80%',
        scrub: true,
      },
    });

    if (details) {
      gsap.fromTo(
        details,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: container,
            start: 'top 40%',
            end: 'center center',
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="craftsmanship"
      ref={containerRef}
      className="relative w-full bg-black select-none"
      style={{ height: '160vh' }} // High-height section allowing extended sticky scroll interaction
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Background Layer: Macro shot of watch gears */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={bgImageRef}
            src="/images/craftsmanship.png"
            alt="Haute horlogerie watch movement macro craftsmanship"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 will-change-transform filter brightness-90 contrast-125"
          />
          {/* Measured scrims and radial vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000000_90%)] pointer-events-none" />
        </div>

        {/* Clockwork Rotating Dashed Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          {/* Outer Gear Ring */}
          <div className="w-[500px] h-[500px] md:w-[750px] md:h-[750px] rounded-full border border-dashed border-amber-400/20 animate-[spin_120s_linear_infinite]" />
          {/* Middle Gear Ring */}
          <div className="w-[350px] h-[350px] md:w-[540px] md:h-[540px] rounded-full border border-dotted border-white/15 animate-[spin_90s_linear_infinite_reverse]" />
          {/* Inner Escapement Ring */}
          <div className="w-[200px] h-[200px] md:w-[320px] md:h-[320px] rounded-full border border-dashed border-amber-500/25 animate-[spin_60s_linear_infinite]" />
        </div>

        {/* Foreground Content: Center-aligned "Unseen Precision" */}
        <div
          ref={foregroundTextRef}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6 will-change-transform"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-amber-400" />
            <span className="font-inter text-xs md:text-sm font-semibold tracking-[0.4em] uppercase text-amber-400">
              The Soul of the Calibre
            </span>
            <span className="w-8 h-[1px] bg-amber-400" />
          </div>

          <h2 className="font-bodoni text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-white leading-none">
            Unseen <br />
            <span className="italic font-normal text-amber-200">Precision</span>
          </h2>

          <p className="font-inter text-sm md:text-lg text-white/70 font-light max-w-2xl leading-relaxed">
            Beneath the sapphire crystal lies a labyrinth of micro-components polished to the micron. Tolerances measured in thousandths of a millimeter, tuned entirely by human touch and ear.
          </p>

          {/* Craftsmanship Metrics Strip */}
          <div
            ref={detailsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 pt-6 w-full max-w-3xl border-t border-white/10"
          >
            <div className="text-center p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
              <span className="font-bodoni text-2xl md:text-3xl font-bold text-amber-400 block tabular-nums">
                0.002mm
              </span>
              <span className="font-inter text-[11px] tracking-wider uppercase text-white/50 block mt-1">
                Tolerance Precision
              </span>
            </div>

            <div className="text-center p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
              <span className="font-bodoni text-2xl md:text-3xl font-bold text-white block tabular-nums">
                480h
              </span>
              <span className="font-inter text-[11px] tracking-wider uppercase text-white/50 block mt-1">
                Hand-Decoration
              </span>
            </div>

            <div className="text-center p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
              <span className="font-bodoni text-2xl md:text-3xl font-bold text-amber-400 block tabular-nums">
                36,000
              </span>
              <span className="font-inter text-[11px] tracking-wider uppercase text-white/50 block mt-1">
                VPH Escapement
              </span>
            </div>

            <div className="text-center p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
              <span className="font-bodoni text-2xl md:text-3xl font-bold text-white block tabular-nums">
                100%
              </span>
              <span className="font-inter text-[11px] tracking-wider uppercase text-white/50 block mt-1">
                Swiss Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
