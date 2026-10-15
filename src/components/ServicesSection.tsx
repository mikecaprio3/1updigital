import React from "react";
import { siteConfig } from "../config/siteConfig";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface ServicesSectionProps {
  onSelectService: (serviceType: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section
      id="services"
      className="py-8 sm:py-12 md:py-16 bg-[#0e1012] relative border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={600}>
          <div className="max-w-xl space-y-1.5 mb-6 sm:mb-8 text-left sm:text-center sm:mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              What We Do.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              Two focused digital solutions built around your business needs.
            </p>
          </div>
        </ScrollReveal>

        {/* TWO Primary Service Blocks: Balanced Side-by-Side on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {siteConfig.services.map((service, idx) => (
            <ScrollReveal
              key={service.id}
              direction="up"
              delay={idx * 70}
              duration={550}
              className="flex flex-col h-full"
            >
              <div className="h-full p-5 sm:p-6 bg-[#131518] border border-white/[0.08] hover:border-[#c5a059]/40 rounded-xs flex flex-col justify-between group transition-all duration-200 shadow-sm">
                <div className="space-y-2.5">
                  {/* Top Bar: Title & Price */}
                  <div className="flex items-baseline justify-between gap-2 pb-2.5 border-b border-white/[0.06]">
                    <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-wide">
                      {service.title}
                    </h3>
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#c5a059] shrink-0">
                      {service.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                    {service.description}
                  </p>

                  {service.id === "crm-automation" && (
                    <p className="text-[10px] sm:text-[11px] text-neutral-400 font-mono pt-1">
                      Custom-scoped solutions subject to technical feasibility.
                    </p>
                  )}
                </div>

                {/* Inquiry Action Button */}
                <div className="pt-4 mt-4 border-t border-white/[0.05]">
                  <button
                    onClick={() => onSelectService(service.inquiryType)}
                    className="w-full py-2.5 px-4 bg-white/[0.04] hover:bg-[#c5a059] text-neutral-200 hover:text-black border border-white/10 hover:border-[#c5a059] rounded-xs text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
