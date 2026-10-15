import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PortfolioSection } from "./components/PortfolioSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProcessSection } from "./components/ProcessSection";
import { PricingSection } from "./components/PricingSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { LegalModal } from "./components/LegalModal";
import { Phone, ArrowUpRight, Info, X } from "lucide-react";
import { siteConfig } from "./config/siteConfig";

export default function App() {
  const [legalModalType, setLegalModalType] = useState<"privacy" | "terms" | null>(null);
  const [portalNoticeOpen, setPortalNoticeOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Custom Website");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleStartProject = (serviceNeed?: string) => {
    if (serviceNeed) {
      setSelectedService(serviceNeed);
    }
    scrollToSection("contact");
  };

  const handleViewWork = () => {
    scrollToSection("work");
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#e8e8ea] flex flex-col font-sans selection:bg-[#c5a059] selection:text-black">
      {/* 1. Header & Navigation */}
      <Navbar
        onNavigate={scrollToSection}
        onStartProject={() => handleStartProject("Custom Website")}
        onOpenPortalNotice={() => setPortalNoticeOpen(true)}
        onMenuToggle={(open) => setMobileMenuOpen(open)}
      />

      {/* Main Flow: 7 Streamlined Sections */}
      <main className="flex-1 pb-20 sm:pb-24 md:pb-0">
        {/* 1. Hero */}
        <Hero
          onStartProject={() => handleStartProject("Custom Website")}
          onViewWork={handleViewWork}
        />

        {/* 2. Our Work (Compact coming soon placeholder) */}
        <PortfolioSection />

        {/* 3. What We Do (2 primary service blocks) */}
        <ServicesSection
          onSelectService={(serviceType) => handleStartProject(serviceType)}
        />

        {/* 4. Simple Process (3 steps) */}
        <ProcessSection />

        {/* 5. Clear Pricing (One prominent $499 card + CRM line) */}
        <PricingSection
          onStartProject={(serviceNeed) => handleStartProject(serviceNeed || "Custom Website")}
        />

        {/* 6. Compact Founder Introduction */}
        <AboutSection
          onStartProject={() => handleStartProject("Custom Website")}
        />

        {/* 7. Contact (Unified lead capture) */}
        <ContactSection initialService={selectedService} />
      </main>

      {/* Footer & Existing Client Support */}
      <Footer
        onNavigate={scrollToSection}
        onOpenPrivacy={() => setLegalModalType("privacy")}
        onOpenTerms={() => setLegalModalType("terms")}
        onStartProject={(serviceType) => handleStartProject(serviceType || "Custom Website")}
        onOpenPortalNotice={() => setPortalNoticeOpen(true)}
      />

      {/* Mobile Compact Sticky Quick-Action Bar (Hidden when mobile menu is open to prevent overlap) */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0d0e]/95 backdrop-blur-md border-t border-white/10 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] flex items-center justify-between gap-2 shadow-2xl transition-opacity duration-200 ${
          mobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <a
          href={`tel:${siteConfig.contact.phoneTel}`}
          className="flex-1 py-2 px-2 bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 text-[11px] font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 whitespace-nowrap min-h-[38px]"
        >
          <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Call Us</span>
        </a>

        <button
          onClick={() => handleStartProject("Custom Website")}
          className="flex-[1.5] py-2 px-3 bg-[#c5a059] hover:bg-[#d8b268] text-black text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap shadow-md min-h-[38px]"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Informational Portal Modal Notice */}
      {portalNoticeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#141619] border border-[#c5a059]/40 rounded-xs p-5 sm:p-6 max-w-md w-full space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-[#c5a059]">
                <Info className="w-5 h-5 shrink-0" />
                <h4 className="font-display text-base font-bold text-white">
                  Client Portal Access
                </h4>
              </div>
              <button
                onClick={() => setPortalNoticeOpen(false)}
                className="text-neutral-400 hover:text-white p-1 cursor-pointer"
                aria-label="Close notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-neutral-300 leading-relaxed font-normal">
              <p>
                Production client portal authentication is currently in preparation.
              </p>
              <p>
                Existing 1Up Digital clients can request project updates or account assistance directly with Michael:
              </p>
              <div className="p-3 bg-[#191c20] rounded-xs space-y-1 font-mono text-[11px] text-neutral-200 border border-white/5">
                <div>Direct Phone: <a href={`tel:${siteConfig.contact.phoneTel}`} className="text-[#c5a059] font-bold hover:underline">{siteConfig.contact.phoneDisplay}</a></div>
                <div>Direct Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-[#c5a059] font-bold hover:underline">{siteConfig.contact.email}</a></div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPortalNoticeOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-black bg-[#c5a059] hover:bg-[#d8b268] rounded-xs cursor-pointer transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legal Modal (Privacy Policy & Terms) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
