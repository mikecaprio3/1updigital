import React from "react";
import { siteConfig } from "../config/siteConfig";
import { Check, ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface PricingSectionProps {
  onStartProject: (serviceNeed?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onStartProject }) => {
  const { mainOffer, crmCallout } = siteConfig.pricing;

  return (
    <section
      id="pricing"
      className="py-8 sm:py-12 md:py-16 bg-[#0c0d0e] relative border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={600}>
          <div className="text-left sm:text-center space-y-1.5 mb-6 sm:mb-8">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Simple, Upfront Pricing.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              No mandatory monthly website maintenance plan. Transparent scope before work begins.
            </p>
          </div>
        </ScrollReveal>

        {/* ONE Prominent Pricing Card: Custom Website */}
        <ScrollReveal direction="up" delay={60} duration={600}>
          <div className="p-5 sm:p-7 bg-[#131518] border border-[#c5a059]/60 rounded-xs shadow-[0_0_25px_rgba(197,160,89,0.12)] relative">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-white/[0.08]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a059] font-bold block mb-0.5">
                  PRIMARY SERVICE
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {mainOffer.title}
                </h3>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {mainOffer.price}
                </span>
                <span className="font-mono text-[11px] text-[#c5a059] uppercase tracking-wider">
                  {mainOffer.priceDetail}
                </span>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="py-4 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                Included Deliverables:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-200">
                {mainOffer.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accurate Scope Note */}
            <p className="text-xs text-neutral-300/90 font-sans border-t border-white/[0.06] pt-3.5 mb-4 leading-relaxed font-normal">
              {mainOffer.scopeNote}
            </p>

            {/* CTA Button */}
            <button
              onClick={() => onStartProject("Custom Website")}
              className="btn-primary-interaction group w-full py-3 px-5 bg-[#c5a059] hover:bg-[#d8b268] text-black text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
            >
              <span>{mainOffer.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-arrow-hover" />
            </button>
          </div>
        </ScrollReveal>

        {/* ONE Concise Line Beneath the Main Offer */}
        <ScrollReveal direction="up" delay={100} duration={600}>
          <div className="mt-4 p-3.5 bg-[#131518]/70 border border-white/[0.06] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-center sm:text-left">
            <p className="text-xs text-neutral-300 font-normal">
              {crmCallout}
            </p>
            <button
              onClick={() => onStartProject("CRM & Automation")}
              className="text-xs text-[#c5a059] hover:text-[#d8b268] font-bold uppercase tracking-wider font-mono inline-flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap self-center sm:self-auto"
            >
              <span>Discuss CRM</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
