import React, { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";
import { ArrowUpRight, ArrowDown } from "lucide-react";

interface HeroProps {
  onStartProject: () => void;
  onViewWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onViewWork }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative pt-20 sm:pt-28 md:pt-32 pb-8 sm:pb-14 md:pb-20 bg-[#0c0d0e] border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-3.5 sm:space-y-5">
            {/* Subtle Eyebrow */}
            <div
              style={{
                transition: "opacity 500ms ease, transform 500ms ease",
              }}
              className={`text-[11px] sm:text-xs font-mono tracking-widest uppercase font-semibold text-[#c5a059] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              1Up Digital · Connecticut
            </div>

            {/* Dominant Headline */}
            <h1
              style={{
                transition: "opacity 600ms ease 60ms, transform 600ms ease 60ms",
              }}
              className={`font-display text-[32px] sm:text-5xl lg:text-6xl xl:text-[66px] font-bold tracking-tight leading-[1.08] text-balance ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              <span className="text-white block">Your Business.</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5ca8a] via-[#c5a059] to-[#ebd296] block mt-0.5 sm:mt-1">
                Better Online.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              style={{
                transition: "opacity 600ms ease 120ms, transform 600ms ease 120ms",
              }}
              className={`text-sm sm:text-lg text-neutral-300 leading-relaxed max-w-xl font-normal ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              {siteConfig.hero.supportingCopy}
            </p>

            {/* CTAs */}
            <div
              style={{
                transition: "opacity 600ms ease 180ms, transform 600ms ease 180ms",
              }}
              className={`pt-1 sm:pt-2 space-y-2.5 sm:space-y-3.5 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <button
                  onClick={onStartProject}
                  className="btn-primary-interaction group px-6 sm:px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#d8b268] rounded-xs shadow-md hover:shadow-[0_0_25px_rgba(197,160,89,0.3)] flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap transition-all"
                >
                  <span>{siteConfig.hero.primaryCta}</span>
                  <ArrowUpRight className="w-4 h-4 group-arrow-hover" />
                </button>

                <button
                  onClick={onViewWork}
                  className="btn-secondary-interaction px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-xs flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap transition-all"
                >
                  <span>{siteConfig.hero.secondaryCta}</span>
                  <ArrowDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>
              </div>

              {/* Supporting Price Note */}
              <p className="text-xs sm:text-sm text-[#c5a059] font-mono">
                {siteConfig.hero.microcopy}
              </p>
            </div>
          </div>

          {/* Desktop Right Side: Studio Credo Card */}
          <div
            style={{
              transition: "opacity 700ms ease 220ms, transform 700ms ease 220ms",
            }}
            className={`hidden lg:block lg:col-span-4 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="p-6 bg-[#131518] border border-white/10 rounded-sm space-y-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#c5a059] font-bold">
                  Boutique Studio
                </div>
                <div className="font-display text-base font-bold text-white">
                  Built for businesses that want real results.
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed border-t border-b border-white/[0.06] py-3 font-normal">
                No junior handoffs or convoluted agency bloat. Direct founder communication, clean modern code, and practical tools to win more clients.
              </p>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 bg-[#171a1e] rounded-xs border border-white/5">
                  <span className="text-[10px] font-mono text-[#c5a059] uppercase block font-semibold">Websites</span>
                  <span className="text-white font-medium">From $499</span>
                </div>
                <div className="p-2.5 bg-[#171a1e] rounded-xs border border-white/5">
                  <span className="text-[10px] font-mono text-[#c5a059] uppercase block font-semibold">CRM & Tools</span>
                  <span className="text-white font-medium">Custom Quote</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
