import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface IndustriesSectionProps {
  onOpenReview: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onOpenReview }) => {
  const [showAllModal, setShowAllModal] = useState(false);

  const compactList = [
    "Landscaping & Hardscaping",
    "Home Improvement & Remodeling",
    "HVAC & Plumbing",
    "Electrical Contracting",
    "Tree & Outdoor Services",
    "Auto Services & Detailing",
  ];

  const fullIndustries = [
    { title: "Landscaping & Lawn Care", focus: "Commercial & residential seasonal packages" },
    { title: "Hardscaping & Outdoor Living", focus: "High-ticket patios, walls & pool houses" },
    { title: "Tree Services & Arborists", focus: "Emergency storm dispatch & crane rigging" },
    { title: "Concrete Contractors", focus: "Driveways, stamped concrete & commercial pours" },
    { title: "Masonry & Stone Work", focus: "Custom stone veneers, chimneys & restoration" },
    { title: "Fencing & Deck Builders", focus: "Material comparison & linear-foot estimate tools" },
    { title: "Painting Contractors", focus: "Interior, exterior & dustless cabinet refinishing" },
    { title: "Plumbing Contractors", focus: "Emergency service beacons & flat-rate pricing" },
    { title: "HVAC Specialists", focus: "Heat pump rebates & seasonal maintenance clubs" },
    { title: "Electrical Contractors", focus: "Panel upgrades, EV chargers & backup generators" },
    { title: "Roofing Companies", focus: "Storm damage claims, warranties & aerial drone proof" },
    { title: "Paving & Asphalt", focus: "Commercial parking lots & residential asphalt driveways" },
    { title: "Auto Detailing & Specialty", focus: "Ceramic coating, PPF & showroom galleries" },
    { title: "Private Gyms & Studios", focus: "Trial classes, facility tours & memberships" },
    { title: "Cleaning Services", focus: "Commercial janitorial & post-construction cleaning" },
    { title: "General Contractors", focus: "Whole-home builds, renovations & architectural trades" },
  ];

  return (
    <section id="industries" className="py-8 sm:py-12 bg-[#0e1012] border-b border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={700}>
          <div className="bg-[#131518] border border-white/10 rounded-sm p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 hover:border-[#c5a059]/30 transition-colors duration-300">
            {/* Left Text */}
            <div className="space-y-1.5 sm:space-y-2 text-center md:text-left">
              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#c5a059] font-bold">
                Built for Local Service Businesses
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white font-medium">
                {compactList.map((item, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 sm:gap-2">
                    <span>{item}</span>
                    <span className="text-white/20 select-none">·</span>
                  </span>
                ))}
                <span className="text-[#c5a059] font-bold">+ MANY MORE</span>
              </div>
              <p className="text-xs text-neutral-400 font-normal">
                If customers search online before calling your business, we can probably help.
              </p>
            </div>

            {/* Right Action */}
            <button
              onClick={() => setShowAllModal(true)}
              className="btn-secondary-interaction group px-4 sm:px-5 py-2 sm:py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#c5a059]/40 text-neutral-200 hover:text-white rounded-xs text-xs font-bold uppercase tracking-wider transition-all shrink-0 flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>View All Industries</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c5a059] group-arrow-hover" />
            </button>
          </div>
        </ScrollReveal>

        {/* Modal for All Industries */}
        {showAllModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-[#121417] border border-white/15 rounded-md max-w-3xl w-full max-h-[85vh] flex flex-col text-neutral-200 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#16181b]">
                <h3 className="font-display text-lg font-bold text-white">
                  Local Trade Sectors We Serve
                </h3>
                <button
                  onClick={() => setShowAllModal(false)}
                  className="text-neutral-400 hover:text-white p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {fullIndustries.map((ind, i) => (
                  <div key={i} className="p-3 bg-[#181a1e] border border-white/[0.06] rounded-xs space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{ind.title}</span>
                    </div>
                    <div className="text-[11px] text-neutral-400 pl-5">
                      Focus: {ind.focus}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-3 border-t border-white/10 bg-[#16181b] flex items-center justify-between">
                <button
                  onClick={() => setShowAllModal(false)}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowAllModal(false);
                    onOpenReview();
                  }}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#d8b268] rounded-xs"
                >
                  Request Trade Strategy Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
