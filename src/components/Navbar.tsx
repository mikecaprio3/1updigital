import React, { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";
import { Logo } from "./Logo";
import { Menu, X, ArrowUpRight, LogIn } from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onStartProject: () => void;
  onOpenPortalNotice: () => void;
  onMenuToggle?: (isOpen: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onStartProject,
  onOpenPortalNotice,
  onMenuToggle,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = (open: boolean) => {
    setMobileMenuOpen(open);
    if (onMenuToggle) {
      onMenuToggle(open);
    }
  };

  const navItems = [
    { label: "Work", target: "work" },
    { label: "Services", target: "services" },
    { label: "Pricing", target: "pricing" },
    { label: "About", target: "about" },
    { label: "Contact", target: "contact" },
  ];

  const handleNavClick = (target: string) => {
    onNavigate(target);
    toggleMobileMenu(false);
  };

  const handleCtaClick = () => {
    toggleMobileMenu(false);
    onStartProject();
  };

  const handleClientLoginClick = () => {
    toggleMobileMenu(false);
    if (siteConfig.clientPortal.url) {
      window.open(siteConfig.clientPortal.url, "_blank", "noopener,noreferrer");
    } else {
      onOpenPortalNotice();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled
          ? "bg-[#0c0d0e]/95 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-lg"
          : "bg-[#0c0d0e]/60 backdrop-blur-xs border-b border-white/[0.04] py-3.5 sm:py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("hero")}
            className="text-left cursor-pointer flex items-center"
            aria-label={`${siteConfig.brandName} Home`}
          >
            <Logo size="header" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-neutral-300">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="hover:text-white transition-colors duration-200 cursor-pointer whitespace-nowrap text-sm"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Utility Actions: Client Login + Primary CTA */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <button
              onClick={handleClientLoginClick}
              className="text-xs font-mono font-medium text-neutral-400 hover:text-[#c5a059] transition-colors flex items-center gap-1.5 cursor-pointer py-1.5 px-2.5 rounded-xs hover:bg-white/[0.03]"
              title={siteConfig.clientPortal.url ? "Log in to Client Portal" : "Client Portal production setup"}
            >
              <LogIn className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Client Login</span>
            </button>

            <button
              onClick={handleCtaClick}
              className="btn-primary-interaction group px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#d8b268] rounded-xs cursor-pointer whitespace-nowrap shadow-sm hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] flex items-center gap-1.5 transition-all"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-arrow-hover" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => toggleMobileMenu(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0d0e] border-b border-white/[0.08] px-5 py-4 space-y-3.5 animate-fadeIn max-h-[calc(100vh-60px)] overflow-y-auto">
          <div className="flex flex-col space-y-0.5">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="text-left text-sm font-medium text-neutral-200 hover:text-[#c5a059] py-2 border-b border-white/[0.04] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Client Login - visually separated above primary sales CTA */}
          <div className="pt-2 border-t border-white/[0.08] space-y-2.5">
            <button
              onClick={handleClientLoginClick}
              className="w-full flex items-center justify-between text-left text-xs font-mono font-medium text-neutral-300 hover:text-[#c5a059] py-2 px-1 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <LogIn className="w-3.5 h-3.5 text-[#c5a059]" />
                <span className="font-semibold uppercase tracking-wider text-[11px]">Client Login</span>
              </div>
              {!siteConfig.clientPortal.url && (
                <span className="text-[10px] text-neutral-500 font-mono">In Setup</span>
              )}
            </button>

            <button
              onClick={handleCtaClick}
              className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#d8b268] rounded-xs text-center cursor-pointer shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
