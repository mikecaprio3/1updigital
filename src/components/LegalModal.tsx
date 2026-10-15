import React, { useEffect } from "react";
import { siteConfig } from "../config/siteConfig";
import { X, Shield } from "lucide-react";

interface LegalModalProps {
  type: "privacy" | "terms" | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (type) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#121417] border border-white/15 rounded-md max-w-2xl w-full max-h-[85vh] flex flex-col text-neutral-200 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#16181b]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#c5a059]" />
            <h3 className="font-display text-lg font-bold text-white">
              {type === "privacy" ? "Privacy Policy" : "Terms of Service"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 cursor-pointer"
            aria-label="Close legal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-neutral-300">
          <div className="text-[11px] font-mono text-neutral-400">
            Entity: {siteConfig.dbaText} · Effective: {new Date().getFullYear()}
          </div>

          {type === "privacy" ? (
            <>
              <p>
                At {siteConfig.brandName} ("we", "us", or "our"), operating under {siteConfig.legalCompanyName}, we respect your privacy and are committed to protecting the personal information you share with us through our website.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">1. Information We Collect</h4>
              <p>
                When you request a website review or contact us, we collect information you voluntarily provide, including your name, company name, telephone number, email address, website URL, and project notes.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">2. How We Use Your Information</h4>
              <p>
                We use this information exclusively to analyze your website, produce your requested review, respond to your project inquiries, and communicate about our web design services. We never sell, rent, or trade your data to third parties.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">3. Cookies & Analytics</h4>
              <p>
                We may utilize standard analytics tools (e.g. Google Analytics) to monitor aggregate traffic patterns, device resolutions, and user navigation paths to improve page speed and user experience.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">4. Contact Us</h4>
              <p>
                For privacy inquiries or to request deletion of your submitted contact details, email us directly at {siteConfig.contact.email}.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to {siteConfig.brandName}. By accessing our website or engaging our services, you agree to comply with and be bound by the following terms and conditions.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">1. Services & Engagement</h4>
              <p>
                {siteConfig.brandName} provides custom web design, conversion optimization, and maintenance services for local businesses. Specific scope, milestones, and deliverable commitments are governed by individual client proposals and work orders.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">2. Intellectual Property & Website Access</h4>
              <p>
                Upon receipt of full payment for services, clients receive full access to their website and complete control over their domain name, subject to standard open-source licenses for any underlying third-party libraries and hosting platforms.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">3. Portfolio Representation</h4>
              <p>
                Concept projects displayed on this website labeled "CONCEPT PROJECT" demonstrate design capabilities and architectural prototypes for trade industries. Real client work is displayed with client authorization.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">4. Limitation of Liability</h4>
              <p>
                {siteConfig.legalCompanyName} shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our website or services.
              </p>
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-white/10 bg-[#16181b] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 rounded-xs cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
