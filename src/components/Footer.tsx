import React from "react";
import { siteConfig } from "../config/siteConfig";
import { Logo } from "./Logo";
import { ArrowUp, ArrowRight, LogIn } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onStartProject: (serviceType?: string) => void;
  onOpenPortalNotice: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
  onStartProject,
  onOpenPortalNotice,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePortalClick = () => {
    if (siteConfig.clientPortal.url) {
      window.open(siteConfig.clientPortal.url, "_blank", "noopener,noreferrer");
    } else {
      onOpenPortalNotice();
    }
  };

  return (
    <footer className="bg-[#08090a] border-t border-white/[0.08] text-neutral-400 text-xs overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Compact Existing-Client Section Near Footer */}
        <ScrollReveal direction="up" duration={600}>
          <div className="mb-8 p-4 sm:p-5 bg-[#111316] border border-white/10 rounded-xs flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#c5a059] font-bold uppercase tracking-wider">
                <span>CLIENT SERVICES</span>
              </div>
              <h3 className="font-display text-sm sm:text-base font-bold text-white">
                {siteConfig.clientPortal.heading}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                {siteConfig.clientPortal.description}
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={handlePortalClick}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#d8b268] rounded-xs cursor-pointer transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{siteConfig.clientPortal.ctaText}</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" duration={600}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {/* Column 1: Brand & Contact */}
            <div className="md:col-span-6 space-y-3.5">
              <button
                onClick={() => onNavigate("hero")}
                className="text-left cursor-pointer inline-block"
                aria-label={`${siteConfig.brandName} Home`}
              >
                <Logo size="footer" />
              </button>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-md font-normal">
                {siteConfig.hero.supportingCopy}
              </p>

              <div className="pt-1 text-xs text-neutral-400 space-y-1">
                <div>Based in Connecticut · Serving clients nationwide</div>
                <div>
                  Direct:{" "}
                  <a
                    href={`tel:${siteConfig.contact.phoneTel}`}
                    className="text-neutral-200 hover:text-[#c5a059] font-medium"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
                <div>
                  Email:{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-neutral-200 hover:text-[#c5a059] font-medium"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onStartProject("Custom Website")}
                  className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#d8b268] rounded-xs cursor-pointer transition-colors shadow-sm"
                >
                  Start a Project
                </button>
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white border border-white/10 hover:border-[#c5a059]/40 rounded-xs transition-colors"
                >
                  Call {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="md:col-span-3 space-y-2.5">
              <div className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                Navigation
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm">
                {[
                  { label: "Our Work", target: "work" },
                  { label: "What We Do", target: "services" },
                  { label: "How It Works", target: "process" },
                  { label: "Clear Pricing", target: "pricing" },
                  { label: "About Founder", target: "about" },
                  { label: "Contact Us", target: "contact" },
                ].map((item) => (
                  <li key={item.target}>
                    <button
                      onClick={() => onNavigate(item.target)}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services Summary */}
            <div className="md:col-span-3 space-y-2.5">
              <div className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                Services
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-300">
                <li>Custom Websites (from $499)</li>
                <li>CRM & Automation (Custom Quote)</li>
                <li>
                  <button
                    onClick={handlePortalClick}
                    className="text-neutral-400 hover:text-[#c5a059] transition-colors cursor-pointer flex items-center gap-1 text-left"
                  >
                    <span>Client Login</span>
                    <LogIn className="w-3 h-3 text-[#c5a059]" />
                  </button>
                </li>
              </ul>
              <div className="pt-2 text-[11px] text-neutral-400 font-mono">
                {siteConfig.contact.businessHours}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom Bar: Legal */}
        <div className="mt-8 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-neutral-400 text-center sm:text-left">
            © {new Date().getFullYear()} {siteConfig.dbaText}. All rights reserved.
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={scrollToTop}
              className="p-1 text-neutral-400 hover:text-white hover:bg-white/5 rounded-xs transition-colors cursor-pointer flex items-center gap-1"
              aria-label="Scroll to top of page"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
