import React from "react";
import { Clock } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export const PortfolioSection: React.FC = () => {
  return (
    <section
      id="work"
      className="py-5 sm:py-7 bg-[#0c0d0e] relative border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" duration={500}>
          <div className="p-4 sm:p-5 bg-[#131518] border border-white/10 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 shadow-sm">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-[#c5a059]">
                <Clock className="w-3 h-3" />
                <span>IN PRODUCTION · CONNECTICUT</span>
              </div>
              <h2 className="font-display text-base sm:text-lg font-bold text-white tracking-tight">
                Real Work. Coming Soon.
              </h2>
            </div>

            <p className="text-xs text-neutral-300 font-normal sm:text-right max-w-xs">
              Our first featured client website is nearly ready.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
