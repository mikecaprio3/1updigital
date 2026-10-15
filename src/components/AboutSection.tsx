import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { User, ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface AboutSectionProps {
  onStartProject: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onStartProject }) => {
  const [imageError, setImageError] = useState(false);
  const { founder } = siteConfig;

  return (
    <section
      id="about"
      className="py-8 sm:py-12 md:py-16 bg-[#0e1012] relative border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
          {/* Founder Photo */}
          <div className="md:col-span-5 flex justify-center">
            <ScrollReveal direction="scale" duration={600}>
              <div className="relative w-48 sm:w-56 md:w-full max-w-[260px]">
                <div className="relative bg-[#141619] border border-white/10 rounded-xs overflow-hidden p-1.5 shadow-xl">
                  <div className="aspect-square relative overflow-hidden rounded-xs bg-[#1a1c1e] flex items-center justify-center">
                    {!imageError ? (
                      <img
                        src={founder.image}
                        alt={founder.name}
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "center 25%" }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-[#15171a] space-y-1">
                        <User className="w-7 h-7 text-[#c5a059]" />
                        <span className="font-mono text-xs font-bold text-white">{founder.name}</span>
                        <span className="text-[10px] text-neutral-400">{founder.role}</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2.5">
                      <div>
                        <div className="font-display text-xs sm:text-sm font-bold text-white">
                          {founder.name}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-[#c5a059] font-mono">
                          {founder.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Founder Copy */}
          <div className="md:col-span-7 space-y-3 sm:space-y-4">
            <ScrollReveal direction="up" delay={60} duration={600} className="space-y-3 sm:space-y-4">
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-widest font-semibold text-[#c5a059] font-mono">
                  Direct Founder Collaboration
                </div>
                <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
                  {founder.heading}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                {founder.copy}
              </p>

              <p className="text-xs text-[#c5a059] font-mono">
                {founder.supportingLine}
              </p>

              <div className="pt-1">
                <button
                  onClick={onStartProject}
                  className="btn-primary-interaction group inline-flex items-center gap-2 px-5 py-2.5 bg-[#c5a059] hover:bg-[#d8b268] text-black text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer shadow-sm transition-all"
                >
                  <span>{founder.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-arrow-hover" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
