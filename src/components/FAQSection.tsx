import React, { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { ChevronDown, Plus, Minus, HelpCircle } from "lucide-react";

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#0e1012] relative border-b border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#c5a059]">
            Straight Answers
          </div>
          <h2 className="font-display text-[30px] sm:text-4xl font-bold tracking-tight text-white leading-[1.12] sm:leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-neutral-300 font-normal">
            Everything you need to know about working with us, our timeline, deliverables, and how we help your business win more jobs.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {siteConfig.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#131518] border border-white/[0.08] hover:border-white/15 rounded-sm transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg sm:text-lg font-bold text-white pr-4 leading-[1.2]">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-sm bg-[#1a1c1f] border border-white/10 flex items-center justify-center shrink-0 text-[#c5a059]">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-neutral-300 leading-relaxed border-t border-white/[0.04]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
