import React, { useEffect, useState } from "react";
import { PortfolioProject } from "../config/siteConfig";
import { X, CheckCircle2, ArrowUpRight, Phone, Monitor, Smartphone, Layers } from "lucide-react";

interface CaseStudyModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onOpenReview: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onOpenReview,
}) => {
  const [activeTab, setActiveTab] = useState<"desktopHero" | "desktopSecondary" | "mobile">("desktopHero");

  useEffect(() => {
    setActiveTab("desktopHero");
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-[#121417] border border-white/15 rounded-md shadow-2xl overflow-hidden my-4 sm:my-8 text-neutral-200">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#16191c]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold tracking-wider text-black bg-[#c5a059] px-2.5 py-0.5 rounded-xs">
              {project.badge}
            </span>
            <span className="text-xs text-neutral-300 font-medium">
              {project.industry} · {project.location || project.projectType}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Title & Description */}
          <div>
            <h3 className="font-display text-[26px] sm:text-3xl font-bold text-white mb-2 leading-[1.15]">
              {project.name}
            </h3>
            <p className="text-sm text-neutral-300 mb-4 font-normal">
              {project.description}
            </p>

            <div className="p-4 bg-[#181b1f] border border-white/10 rounded-xs space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#c5a059] font-bold">
                Design Objective
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                {project.designObjective}
              </p>
            </div>
          </div>

          {/* Interactive Screen Viewer with Thumbnail Switching */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                Screen Inspector
              </span>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("desktopHero")}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                    activeTab === "desktopHero"
                      ? "bg-[#c5a059] text-black font-bold shadow-sm"
                      : "bg-white/5 text-neutral-300 hover:text-white border border-white/10"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Main Desktop</span>
                </button>

                {project.desktopSecondary && (
                  <button
                    onClick={() => setActiveTab("desktopSecondary")}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                      activeTab === "desktopSecondary"
                        ? "bg-[#c5a059] text-black font-bold shadow-sm"
                        : "bg-white/5 text-neutral-300 hover:text-white border border-white/10"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Secondary View</span>
                  </button>
                )}

                {project.mobileImage && (
                  <button
                    onClick={() => setActiveTab("mobile")}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                      activeTab === "mobile"
                        ? "bg-[#c5a059] text-black font-bold shadow-sm"
                        : "bg-white/5 text-neutral-300 hover:text-white border border-white/10"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile Screen</span>
                  </button>
                )}
              </div>
            </div>

            {/* Showcase Stage - Widescreen fixed aspect ratio with contain to show 100% of the UI */}
            <div className="relative w-full rounded-sm overflow-hidden border border-white/10 bg-[#090a0d] min-h-[300px] sm:min-h-[380px] flex items-center justify-center p-3 sm:p-5">
              {/* Fade Container */}
              <div className="w-full h-full flex items-center justify-center transition-opacity duration-300">
                {activeTab === "desktopHero" && (
                  <div className="relative aspect-[16/9] w-full max-h-[460px] flex items-center justify-center bg-[#07080a] rounded border border-white/10 p-2 shadow-2xl">
                    <img
                      src={project.desktopHero}
                      alt={`${project.name} primary screen`}
                      className="w-full h-full object-contain rounded-xs"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {activeTab === "desktopSecondary" && (
                  <div className="relative aspect-[16/9] w-full max-h-[460px] flex items-center justify-center bg-[#07080a] rounded border border-white/10 p-2 shadow-2xl">
                    <img
                      src={project.desktopSecondary}
                      alt={`${project.name} secondary screen`}
                      className="w-full h-full object-contain rounded-xs"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {activeTab === "mobile" && (
                  <div className="py-3 flex items-center justify-center w-full">
                    {/* Polished Phone Mockup Frame */}
                    <div className="relative rounded-[28px] border-[5px] border-[#22262c] shadow-[0_12px_45px_rgba(0,0,0,0.8)] bg-black p-1 max-w-[240px] sm:max-w-[270px]">
                      {/* Speaker Notch */}
                      <div className="w-16 h-3 bg-[#1e2126] rounded-full mx-auto mb-1 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#111316]"></div>
                      </div>
                      <img
                        src={project.mobileImage}
                        alt={`${project.name} mobile responsive layout`}
                        className="w-full h-auto max-h-[420px] rounded-[22px] object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation Bar with mini preview snapshots */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <button
                onClick={() => setActiveTab("desktopHero")}
                className={`p-1.5 rounded-xs border text-left flex items-center gap-2 cursor-pointer transition-all ${
                  activeTab === "desktopHero"
                    ? "border-[#c5a059] bg-[#c5a059]/10"
                    : "border-white/10 hover:border-white/20 bg-[#141619]"
                }`}
              >
                <div className="w-12 h-8 bg-black rounded-xs overflow-hidden shrink-0 border border-white/10">
                  <img src={project.desktopHero} alt="Desktop thumbnail" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-[#c5a059] font-bold truncate">Main Desktop</div>
                  <div className="text-[9px] text-neutral-400 truncate">Primary View</div>
                </div>
              </button>

              {project.desktopSecondary && (
                <button
                  onClick={() => setActiveTab("desktopSecondary")}
                  className={`p-1.5 rounded-xs border text-left flex items-center gap-2 cursor-pointer transition-all ${
                    activeTab === "desktopSecondary"
                      ? "border-[#c5a059] bg-[#c5a059]/10"
                      : "border-white/10 hover:border-white/20 bg-[#141619]"
                  }`}
                >
                  <div className="w-12 h-8 bg-black rounded-xs overflow-hidden shrink-0 border border-white/10">
                    <img src={project.desktopSecondary} alt="Secondary thumbnail" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-[#c5a059] font-bold truncate">Secondary View</div>
                    <div className="text-[9px] text-neutral-400 truncate">Supporting Screen</div>
                  </div>
                </button>
              )}

              {project.mobileImage && (
                <button
                  onClick={() => setActiveTab("mobile")}
                  className={`p-1.5 rounded-xs border text-left flex items-center gap-2 cursor-pointer transition-all ${
                    activeTab === "mobile"
                      ? "border-[#c5a059] bg-[#c5a059]/10"
                      : "border-white/10 hover:border-white/20 bg-[#141619]"
                  }`}
                >
                  <div className="w-6 h-8 bg-black rounded-xs overflow-hidden shrink-0 border border-white/10 mx-auto">
                    <img src={project.mobileImage} alt="Mobile thumbnail" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-[#c5a059] font-bold truncate">Mobile View</div>
                    <div className="text-[9px] text-neutral-400 truncate">Phone Screen</div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Challenge & Strategic Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#16181b] border border-white/[0.08] p-4 rounded-xs space-y-1.5">
              <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold">
                The Challenge
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                {project.challenge}
              </p>
            </div>

            <div className="bg-[#16181b] border border-white/[0.08] p-4 rounded-xs space-y-1.5">
              <div className="text-xs font-mono uppercase tracking-wider text-[#c5a059] font-semibold">
                Strategic Design Solution
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Scope of Work Deliverables */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Project Deliverables & Architecture
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
              {project.scope?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-[#16181b] border border-white/5 rounded-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Direct CTA Block */}
          <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400 text-center sm:text-left">
              Want a similar clean, high-converting digital experience for your company?
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onOpenReview();
                }}
                className="btn-primary-interaction group w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#d8b268] transition-colors rounded-xs cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>GET FREE WEBSITE REVIEW</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-arrow-hover" />
              </button>

              <a
                href="tel:2034445273"
                className="btn-secondary-interaction group w-full sm:w-auto px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xs transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>CALL MICHAEL</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
