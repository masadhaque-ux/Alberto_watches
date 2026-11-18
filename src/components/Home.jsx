import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);



export const Home = ({ onExplore }) => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const subtitleRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const title3Ref = useRef(null);
  const bottomBarRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const sub = subtitleRef.current;
    const t1 = title1Ref.current;
    const t2 = title2Ref.current;
    const t3 = title3Ref.current;
    const bBar = bottomBarRef.current;

    if (!hero || !content) return;

    // Entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      sub,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 0.7, duration: 1.2, delay: 0.3 }
    )
      .fromTo(
        [t1, t2, t3],
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.18 },
        '-=0.8'
      )
      .fromTo(
        bBar,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.6'
      );

    // Parallax scroll-down effect via ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        // Scale down to 0.85 and fade out
        if (content) {
          gsap.set(content, {
            scale: 1 - progress * 0.15,
            opacity: Math.max(0, 1 - progress * 1.3),
            y: progress * 120,
          });
        }
      },
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Video with Gradient Scrim */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-70 scale-105"
          src="src/assets/video/hero_bg_watch.mp4"
        />
        {/* Gradients overlay: linear gradient overlay from-black/80 via-black/40 to-black */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      {/* Hero Typography & Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto will-change-transform"
      >
        <p
          ref={subtitleRef}
          className="font-inter text-xs md:text-sm font-semibold tracking-[0.4em] text-white/60 uppercase mb-4 md:mb-6"
        >
          The Pinnacle of Swiss Watchmaking
        </p>

        <h1 className="font-bodoni flex flex-col items-center justify-center font-bold tracking-tight text-white leading-[0.92] select-none">
          <span
            ref={title1Ref}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase"
          >
            Time
          </span>
          <span
            ref={title2Ref}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic font-normal tracking-wide text-amber-200/90 py-1"
          >
            Is An
          </span>
          <span
            ref={title3Ref}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase"
          >
            Art
          </span>
        </h1>

        <div className="mt-8 md:mt-10 flex items-center gap-4">
          <button
            onClick={onExplore}
            className="group relative px-8 py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg"
          >
            Explore Collections
          </button>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div
        ref={bottomBarRef}
        className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center justify-center gap-2 pointer-events-auto"
      >
        <button
          onClick={onExplore}
          className="group flex flex-col items-center gap-2 text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-white/50 hover:text-amber-300 transition-colors cursor-pointer"
        >
          <span>Scroll to Discover</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-amber-400/80" />
        </button>
      </div>
    </section>
  );
};
