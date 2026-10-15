import React from "react";
import { siteConfig } from "../config/siteConfig";
import { ScrollReveal } from "./ScrollReveal";

export const ProcessSection: React.FC = () => {
  return (
    <section
      id="process"
      className="py-8 sm:py-12 bg-[#0c0d0e] relative border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={600}>
          <div className="space-y-1.5 mb-6 sm:mb-8 text-left sm:text-center max-w-xl sm:mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              A Better Website. A Simpler Process.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              A clear, predictable roadmap from initial conversation to launch.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Restrained Steps: Gold Numbers, Concise Headings, No "STEP" Label Clutter */}
        <div className="space-y-2 sm:space-y-2.5">
          {siteConfig.processSteps.map((step, idx) => (
            <ScrollReveal
              key={step.step}
              direction="up"
              delay={idx * 60}
              duration={500}
            >
              <div className="p-3.5 sm:p-4 bg-[#131518] border border-white/[0.08] hover:border-[#c5a059]/30 rounded-xs flex items-start sm:items-center gap-3.5 sm:gap-5 transition-all duration-200">
                {/* Gold Number */}
                <div className="font-mono text-xl sm:text-2xl font-bold text-[#c5a059] shrink-0 w-8 sm:w-10">
                  {step.step}
                </div>

                <div className="h-6 w-px bg-white/[0.08] hidden sm:block shrink-0" />

                {/* Content */}
                <div className="flex-1 space-y-0.5">
                  <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
