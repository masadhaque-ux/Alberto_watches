import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';



export const Navbar = ({ onBookAppointment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/60 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="font-bodoni text-xl md:text-2xl font-bold tracking-[0.2em] text-white hover:text-amber-400 transition-colors uppercase whitespace-nowrap shrink-0"
          >
            Meridian
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-[0.25em] uppercase text-white/70">
            <button
              onClick={() => scrollToSection('collections')}
              className="hover:text-white transition-colors py-1 relative group whitespace-nowrap shrink-0 cursor-pointer"
            >
              Collections
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('heritage')}
              className="hover:text-white transition-colors py-1 relative group whitespace-nowrap shrink-0 cursor-pointer"
            >
              Heritage
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('craftsmanship')}
              className="hover:text-white transition-colors py-1 relative group whitespace-nowrap shrink-0 cursor-pointer"
            >
              Craftsmanship
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="hover:text-white transition-colors py-1 relative group whitespace-nowrap shrink-0 cursor-pointer"
            >
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-white transition-colors py-1 relative group whitespace-nowrap shrink-0 cursor-pointer"
            >
              Boutiques
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onBookAppointment}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-xs font-semibold tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            >
              <span>Book Appointment</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center px-8 lg:hidden animate-in fade-in duration-300">
          <div className="flex flex-col gap-6 text-center">
            <button
              onClick={() => scrollToSection('home')}
              className="font-bodoni text-2xl tracking-[0.2em] text-white/90 hover:text-amber-400 py-2"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('collections')}
              className="font-bodoni text-2xl tracking-[0.2em] text-white/90 hover:text-amber-400 py-2"
            >
              Collections
            </button>
            <button
              onClick={() => scrollToSection('heritage')}
              className="font-bodoni text-2xl tracking-[0.2em] text-white/90 hover:text-amber-400 py-2"
            >
              Heritage
            </button>
            <button
              onClick={() => scrollToSection('craftsmanship')}
              className="font-bodoni text-2xl tracking-[0.2em] text-white/90 hover:text-amber-400 py-2"
            >
              Craftsmanship
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="font-bodoni text-2xl tracking-[0.2em] text-white/90 hover:text-amber-400 py-2"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="font-bodoni text-2xl tracking-[0.2em] text-white/90 hover:text-amber-400 py-2"
            >
              Boutiques
            </button>
            <div className="pt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookAppointment();
                }}
                className="w-full max-w-xs mx-auto py-3.5 px-6 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300 text-xs font-bold tracking-[0.25em] uppercase"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
