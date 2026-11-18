import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Check, Send, MapPin, Clock, Calendar, Mail, Phone, Sparkles } from 'lucide-react';



const BOUTIQUES = [
  { city: 'Geneva', address: 'Rue du Rhône 42, 1204 Genève', phone: '+41 22 819 0000', hours: 'Mon - Sat: 10:00 - 18:30' },
  { city: 'Paris', address: '12 Place Vendôme, 75001 Paris', phone: '+33 1 42 68 0000', hours: 'Mon - Sat: 10:30 - 19:00' },
  { city: 'New York', address: '645 Fifth Avenue, New York, NY 10022', phone: '+1 212 555 0192', hours: 'Mon - Sat: 10:00 - 18:00' },
  { city: 'Tokyo', address: 'Ginza 6-10-1, Chuo-ku, Tokyo 104-0061', phone: '+81 3 5555 0184', hours: 'Daily: 11:00 - 20:00' },
];

export const Contact = ({ initialWatch }) => {
  const formRef = useRef(null);
  const isInView = useInView(formRef, { amount: 0.3, once: true });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [boutique, setBoutique] = useState('Geneva');
  const [timepiece, setTimepiece] = useState(initialWatch || 'Royal Ocean');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setBookingRef(`MED-VIP-${randomNum}`);
    setIsSubmitted(true);
  };

  const selectedBoutiqueData = BOUTIQUES.find((b) => b.city === boutique) || BOUTIQUES[0];

  return (
    <section
      id="contact"
      className="relative w-full bg-[#050505] text-white pt-28 pb-12 px-6 md:px-12 border-t border-white/5 overflow-hidden"
    >
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-inter text-xs tracking-[0.35em] uppercase text-amber-400 font-semibold">
              Private Concierge
            </span>
          </div>

          <h2 className="font-bodoni text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
            Private Appointment
          </h2>

          <p className="font-inter text-xs md:text-sm text-white/60 font-light leading-relaxed">
            Reserve a confidential viewing with a master horologist at our global salons. Experience rare calibres in private salon suites.
          </p>
        </div>

        {/* Content Section with InView Motion */}
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Left Column: Form with transparent inputs & border-b border-white/20 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 p-8 md:p-10 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            {isSubmitted ? (
              <div className="text-center py-12 flex flex-col items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-300">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-bodoni text-3xl font-bold text-white uppercase">
                    Invitation Confirmed
                  </h3>
                  <p className="font-inter text-xs md:text-sm text-white/70 max-w-md mx-auto">
                    Dear {name}, our private concierge in {boutique} has received your reservation. A Senior Horological Advisor will contact you within 4 hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs tracking-wider text-amber-300 font-mono">
                  VIP REFERENCE: {bookingRef}
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full border border-white/20 text-xs font-semibold tracking-widest uppercase text-white/70 hover:text-white hover:border-white transition-colors cursor-pointer"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[11px] tracking-[0.25em] uppercase text-white/50">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lord Alistair Vance"
                      className="w-full bg-transparent border-b border-white/20 focus:border-amber-400 py-2.5 text-sm md:text-base text-white placeholder-white/20 outline-none transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[11px] tracking-[0.25em] uppercase text-white/50">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@prestige.com"
                      className="w-full bg-transparent border-b border-white/20 focus:border-amber-400 py-2.5 text-sm md:text-base text-white placeholder-white/20 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Boutique Selection Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[11px] tracking-[0.25em] uppercase text-white/50">
                      Boutique Location *
                    </label>
                    <select
                      value={boutique}
                      onChange={(e) => setBoutique(e.target.value)}
                      className="w-full bg-black/90 border-b border-white/20 focus:border-amber-400 py-2.5 text-sm md:text-base text-white outline-none cursor-pointer transition-colors"
                    >
                      <option value="Geneva" className="bg-zinc-900 text-white">Geneva (Rue du Rhône)</option>
                      <option value="Paris" className="bg-zinc-900 text-white">Paris (Place Vendôme)</option>
                      <option value="New York" className="bg-zinc-900 text-white">New York (Fifth Avenue)</option>
                      <option value="Tokyo" className="bg-zinc-900 text-white">Tokyo (Ginza 6)</option>
                    </select>
                  </div>

                  {/* Preferred Timepiece */}
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[11px] tracking-[0.25em] uppercase text-white/50">
                      Timepiece of Interest
                    </label>
                    <select
                      value={timepiece}
                      onChange={(e) => setTimepiece(e.target.value)}
                      className="w-full bg-black/90 border-b border-white/20 focus:border-amber-400 py-2.5 text-sm md:text-base text-white outline-none cursor-pointer transition-colors"
                    >
                      <option value="Royal Ocean" className="bg-zinc-900 text-white">Royal Ocean (Aura Blue)</option>
                      <option value="Sahara Heritage" className="bg-zinc-900 text-white">Sahara Heritage (Sand Gold)</option>
                      <option value="Rose Elegance" className="bg-zinc-900 text-white">Rose Elegance (Sedna Rose)</option>
                      <option value="Noir Crimson" className="bg-zinc-900 text-white">Noir Crimson (Carbon Chrono)</option>
                      <option value="Bespoke Commission" className="bg-zinc-900 text-white">Bespoke Masterpiece Commission</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Preferred Date */}
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[11px] tracking-[0.25em] uppercase text-white/50">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-transparent border-b border-white/20 focus:border-amber-400 py-2.5 text-sm md:text-base text-white outline-none transition-colors"
                    />
                  </div>

                  {/* Private Notes */}
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[11px] tracking-[0.25em] uppercase text-white/50">
                      Special Requests
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Viewing with Master Horologist"
                      className="w-full bg-transparent border-b border-white/20 focus:border-amber-400 py-2.5 text-sm md:text-base text-white placeholder-white/20 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 flex items-center justify-between">
                  <p className="font-inter text-[11px] text-white/40 tracking-wider">
                    Discretion & NDA guaranteed.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/20 bg-white text-black font-bold text-xs tracking-[0.2em] uppercase hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-xl"
                  >
                    <span>Request Appointment</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right Column: Active Boutique Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="p-8 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-md">
              <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-amber-400 block mb-2">
                Flagship Boutique
              </span>
              <h3 className="font-bodoni text-3xl font-bold uppercase text-white mb-6">
                Maison {selectedBoutiqueData.city}
              </h3>

              <div className="space-y-4 text-xs md:text-sm text-white/70">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{selectedBoutiqueData.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-mono">{selectedBoutiqueData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{selectedBoutiqueData.hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>concierge.{selectedBoutiqueData.city.toLowerCase()}@maison-horlogerie.ch</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 tracking-wider">
                <span>Private Valet Parking Available</span>
                <span className="text-amber-400">Champagne Service</span>
              </div>
            </div>

            {/* Atelier guarantee banner */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <h4 className="font-bodoni text-base font-bold text-white uppercase mb-2">
                The Maison Guarantee
              </h4>
              <p className="font-inter text-xs text-white/60 font-light leading-relaxed">
                All timepieces include a 10-year international warranty, complimentary biennial servicing, and lifetime archival registration in the Geneva Register of Haute Horlogerie.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer: Simple flex row displaying "Maison", social links, and copyright */}
        <footer className="border-t border-white/10 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/50">
          <div className="flex items-center gap-3">
            <span className="font-bodoni text-xl font-bold text-white tracking-[0.2em] uppercase">
              Maison
            </span>
            <span className="text-white/20">|</span>
            <span className="font-inter text-xs text-white/40">Haute Horlogerie Suisse · Fondée 1884</span>
          </div>

          <div className="flex items-center gap-8 text-xs font-medium tracking-[0.2em] uppercase">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors"
            >
              Facebook
            </a>
            <a
              href="#heritage"
              className="hover:text-amber-300 transition-colors"
            >
              Journal
            </a>
            <a
              href="#home"
              className="hover:text-amber-300 transition-colors"
            >
              Legal & Privacy
            </a>
          </div>

          <div className="text-white/40 text-[12px] tracking-wider">
            © 2026 Meridian SA. All Rights Reserved.
          </div>
        </footer>
      </div>
    </section>
  );
};
