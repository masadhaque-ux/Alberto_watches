import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Zap, Compass, Droplets, CheckCircle, ArrowRight } from 'lucide-react';



export const WatchModal = ({ watch, onClose, onBookViewing }) => {
  if (!watch) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-white/15 p-6 sm:p-10 shadow-2xl text-white custom-scrollbar"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all cursor-pointer z-20"
            aria-label="Close timepiece dossier"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Watch Visual */}
            <div className="lg:col-span-5 relative flex items-center justify-center py-6 min-h-[340px]">
              <div
                className="absolute inset-0 rounded-2xl blur-3xl opacity-30"
                style={{ backgroundColor: watch.themeColor.light }}
              />
              <img
                src={watch.image}
                alt={watch.name}
                referrerPolicy="no-referrer"
                className="relative max-h-[380px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Right: Technical Dossier */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div>
                <span className="font-inter text-xs tracking-[0.35em] text-amber-400 font-semibold uppercase block mb-1">
                  {watch.subtitle} · {watch.number}
                </span>
                <h3 className="font-bodoni text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                  {watch.name}
                </h3>
                <p className="font-inter text-xs md:text-sm text-white/50 italic mt-1">
                  "{watch.headline}"
                </p>
              </div>

              <p className="font-inter text-xs md:text-sm text-white/70 font-light leading-relaxed">
                {watch.description}
              </p>

              {/* Comprehensive Specs Table */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider">Calibre</span>
                  <span className="font-semibold text-white">{watch.specs.movement}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider">Power Reserve</span>
                  <span className="font-semibold text-white tabular-nums">{watch.specs.powerReserve}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider">Case & Bezel</span>
                  <span className="font-semibold text-white">{watch.specs.caseMaterial}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider">Water Resistance</span>
                  <span className="font-semibold text-white tabular-nums">{watch.specs.waterResistance}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider">Case Diameter</span>
                  <span className="font-semibold text-white tabular-nums">{watch.specs.diameter}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider">Escapement Frequency</span>
                  <span className="font-semibold text-white tabular-nums">{watch.specs.frequency}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider">Jewel Bearings</span>
                  <span className="font-semibold text-white tabular-nums">{watch.specs.jewels}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase tracking-wider">Bracelet / Strap</span>
                  <span className="font-semibold text-white">{watch.specs.strap}</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 block">Price Upon Request</span>
                  <span className="font-bodoni text-xl font-bold text-amber-300">
                    {watch.price}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      onBookViewing(watch.name);
                      onClose();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-xs tracking-[0.2em] uppercase hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xl"
                  >
                    <span>Request Private Salon Viewing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
