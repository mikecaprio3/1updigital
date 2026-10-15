import React, { useEffect } from "react";
import { siteConfig } from "../config/siteConfig";
import { X, MapPin, CheckCircle, ArrowRight, ShieldCheck, Phone } from "lucide-react";

interface SeoLandingModalProps {
  slug: string | null;
  onClose: () => void;
  onOpenReview: () => void;
}

export const SeoLandingModal: React.FC<SeoLandingModalProps> = ({
  slug,
  onClose,
  onOpenReview,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (slug) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [slug, onClose]);

  if (!slug) return null;

  const page = siteConfig.seoLandingPages.find((p) => p.slug === slug) || siteConfig.seoLandingPages[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#121417] border border-white/15 rounded-md max-w-3xl w-full max-h-[85vh] flex flex-col text-neutral-200 shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#16181b]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#c5a059]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#c5a059] font-bold">
              {page.region} Regional Hub
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 cursor-pointer"
            aria-label="Close regional page"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h3 className="font-display text-[26px] sm:text-3xl font-bold text-white mb-2 leading-[1.15]">
              {page.headline}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {page.metaDescription}
            </p>
          </div>

          <div className="p-4 bg-[#181a1e] border border-white/10 rounded space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Primary Trade Sectors Served in {page.region}:
            </div>
            <div className="flex flex-wrap gap-2">
              {page.focusTrades.map((trade, i) => (
                <span
                  key={i}
                  className="text-xs text-white bg-white/5 border border-white/10 px-3 py-1 rounded-xs"
                >
                  {trade}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-xl sm:text-lg font-bold text-white leading-snug">
              Why Local Market Positioning Wins in {page.region}
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Homeowners in {page.region} have high expectations when hiring trade specialists for their properties. When someone searches for a contractor, an amateurish website immediately sends them to your competitor. We build websites engineered specifically to pass the strict quality scrutiny of affluent property owners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <CheckCircle className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Town-level local SEO keyword architecture</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <CheckCircle className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Neighborhood-targeted portfolio galleries</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <CheckCircle className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Click-to-call mobile lead optimization</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <CheckCircle className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Full Google Business Profile alignment</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#16181b] flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href={`tel:${siteConfig.contact.phoneTel}`}
            className="flex items-center gap-2 text-xs text-neutral-300 hover:text-white"
          >
            <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Call direct: {siteConfig.contact.phoneDisplay}</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenReview();
            }}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#d8b268] rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Request {page.region} Strategy Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
