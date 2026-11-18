
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { Navbar } from './components/Navbar';
// import { CustomCursor } from './components/CustomCursor';
import { Home } from './components/Home';
import { CollectionsShowcase } from './components/CollectionsShowcase';
import { Heritage } from './components/Heritage';
import { Craftsmanship } from './components/Craftsmanship';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { WatchModal } from './components/WatchModal';
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef(null);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [inquiryWatchName, setInquiryWatchName] = useState('Royal Ocean');

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // 2. Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once everything is mounted
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleBookAppointment = (watchName) => {
    if (watchName) {
      setInquiryWatchName(watchName);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(contactElem, { offset: 0, duration: 1.5 });
      } else {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleExplore = () => {
    const collectionsElem = document.getElementById('collections');
    if (collectionsElem) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(collectionsElem, { offset: 0, duration: 1.2 });
      } else {
        collectionsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-amber-500/30 selection:text-amber-200">
      {/* Custom Luxury Physics Cursor */}
     

      {/* Top Glassmorphic Navigation */}
      <Navbar onBookAppointment={() => handleBookAppointment()} />

      <main>
        {/* Section 1: Hero / Home */}
        <Home onExplore={handleExplore} />

        {/* Section 2: Collections Showcase */}
        <CollectionsShowcase onSelectWatch={(watch) => setSelectedWatch(watch)} />

        {/* Section 3: Heritage */}
        <Heritage />

        {/* Section 4: Craftsmanship */}
        <Craftsmanship />

        {/* Section 5: Gallery */}
        <Gallery />

        {/* Section 6: Contact & Footer */}
        <Contact initialWatch={inquiryWatchName} />
      </main>

      {/* Watch Technical Sheet Dossier Modal */}
      <WatchModal
        watch={selectedWatch}
        onClose={() => setSelectedWatch(null)}
        onBookViewing={(name) => handleBookAppointment(name)}
      />
    </div>
  );
}
