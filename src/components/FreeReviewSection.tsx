import React, { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";
import { CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, Phone, Sparkles, Layers, RefreshCw, Zap } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { useScrollReveal } from "../hooks/useScrollReveal";

const INDUSTRY_OPTIONS = [
  "Landscaping / Hardscaping",
  "Tree Service",
  "Concrete / Masonry",
  "Fencing / Decks",
  "Painting",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Paving",
  "Auto Services",
  "Cleaning",
  "Fitness / Gym",
  "Restaurant",
  "Professional Services",
  "Other",
];

const PROJECT_TYPE_OPTIONS = [
  "Custom Website — $499 One-Time",
  "Website Management & Updates — Starting at $49",
  "Digital Systems & Automation — Custom Quote",
  "General Inquiry / Other",
];

const PREFERRED_CONTACT_OPTIONS = ["Call", "Text", "Email"];

interface FreeReviewSectionProps {
  initialMode?: "review" | "project";
}

export const FreeReviewSection: React.FC<FreeReviewSectionProps> = ({ initialMode = "review" }) => {
  const { ref: formRef, isVisible: formVisible } = useScrollReveal<HTMLDivElement>({
    delay: 120,
    threshold: 0.1,
    once: true,
  });

  const [activeTab, setActiveTab] = useState<"review" | "project">(initialMode);

  useEffect(() => {
    if (initialMode) {
      setActiveTab(initialMode);
    }
  }, [initialMode]);

  const [formData, setFormData] = useState({
    name: "",
    business_name: "",
    email: "",
    phone: "",
    website: "",
    industry: "Landscaping / Hardscaping",
    project_interest: "Custom Website — $499 One-Time",
    service_area: "",
    goal: "",
    preferred_contact: "Email",
    _gotcha: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }
    if (!formData.business_name.trim()) {
      errors.business_name = "Business name is required.";
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errors.email = "A valid business email is required.";
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      errors.phone = "A valid phone number is required.";
    }
    if (activeTab === "review" && !formData.industry.trim()) {
      errors.industry = "Industry is required.";
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    const subjectLine =
      activeTab === "review"
        ? "New 1Up Digital Website Review Request"
        : `New 1Up Digital Project Inquiry (${formData.project_interest})`;

    try {
      // Spam honeypot trap
      if (formData._gotcha) {
        setIsSubmitting(false);
        setSubmitted(true);
        return;
      }

      const response = await fetch("https://formspree.io/f/xrpegnlk", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inquiry_type: activeTab === "review" ? "Free Website Review" : "Start a Project",
          name: formData.name,
          business_name: formData.business_name,
          email: formData.email,
          phone: formData.phone,
          website: formData.website || (activeTab === "review" ? "No website provided" : "N/A"),
          industry: formData.industry,
          project_interest: activeTab === "project" ? formData.project_interest : "Free Review",
          service_area: formData.service_area || "Not provided",
          message: formData.goal || "None specified",
          preferred_contact: formData.preferred_contact,
          _subject: subjectLine,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => null);
        if (data && data.errors && data.errors.length > 0) {
          setSubmitError(
            data.errors.map((err: { message: string }) => err.message).join(", ")
          );
        } else {
          setSubmitError(
            "Something went wrong. Please try again, or email mike@1updigital.com."
          );
        }
      }
    } catch {
      setSubmitError(
        "Something went wrong. Please try again, or email mike@1updigital.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="review"
      className="py-12 sm:py-16 md:py-24 bg-[#0a0b0c] relative border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column: Value Proposition & Context */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <ScrollReveal direction="up" delay={0} duration={750} className="space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-3">
                <div className="text-xs uppercase tracking-widest font-semibold text-[#c5a059]">
                  {activeTab === "review" ? "Complimentary Assessment" : "Direct Collaboration"}
                </div>

                <h2 className="font-display text-[30px] sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] sm:leading-tight text-balance">
                  {activeTab === "review"
                    ? "Ready to level up your website?"
                    : "Let's build something that grows your business."}
                </h2>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                  {activeTab === "review"
                    ? "Send us your current website and we’ll show you the biggest opportunities to improve your design, credibility, mobile experience, and conversion potential."
                    : "Tell us about your project—whether you need a custom website ($499 one-time), on-demand updates, or practical systems and automations."}
                </p>
              </div>

              {/* What we examine or deliver */}
              <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
                <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
                  {activeTab === "review" ? "What our personal review examines:" : "Why clients work with 1Up Digital:"}
                </div>

                <div className="space-y-2 sm:space-y-2.5">
                  {(activeTab === "review"
                    ? [
                        {
                          title: "First-Impression Credibility",
                          desc: "Does your homepage immediately justify top-tier business rates?",
                        },
                        {
                          title: "Mobile Friction & Tap-to-Call",
                          desc: "Are phone numbers and actions easy to use on smartphones?",
                        },
                        {
                          title: "Estimate & Inquiry Funnel",
                          desc: "Is your quote form converting or scaring away busy customers?",
                        },
                        {
                          title: "Trust Signals & Reviews",
                          desc: "Are your reviews and credentials placed where decisions happen?",
                        },
                      ]
                    : [
                        {
                          title: "Straightforward $499 Custom Website",
                          desc: "High-performing custom design with zero required monthly retainers.",
                        },
                        {
                          title: "Pay-As-You-Go Flexibility",
                          desc: "Website management and updates available on demand starting at $49.",
                        },
                        {
                          title: "Tailored Systems & Automations",
                          desc: "Practical lead capture, CRM pipelines, and workflows scoped to your needs.",
                        },
                        {
                          title: "Full Access & Domain Control",
                          desc: "You retain full access to your site and domain upon project completion.",
                        },
                      ]
                  ).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-[#131518] border border-white/[0.06] rounded-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">{item.title}</div>
                        <div className="text-[10px] sm:text-[11px] text-neutral-400">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Copy Guarantee */}
              <div className="p-3 sm:p-4 bg-[#14171a] border border-[#c5a059]/20 rounded-xs flex items-center gap-2.5 sm:gap-3">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#c5a059] shrink-0" />
                <p className="text-[11px] sm:text-xs text-neutral-300">
                  <strong className="text-white font-semibold">No pressure. No obligation. </strong>
                  You work directly with Michael Caprio. Straightforward guidance and real execution.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: High-Fidelity Form connected to Formspree */}
          <div
            ref={formRef}
            style={{
              transition:
                "opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1), border-color 1000ms ease, box-shadow 1000ms ease",
            }}
            className={`lg:col-span-7 bg-[#141619] rounded-sm p-4 sm:p-8 lg:p-10 relative will-change-[opacity,transform] ${
              formVisible
                ? "opacity-100 translate-y-0 border border-[#c5a059]/30 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_35px_rgba(197,160,89,0.08)]"
                : "opacity-0 translate-y-6 border border-white/10 shadow-2xl"
            }`}
          >
            {/* Top Toggle: Two Clear Conversion Paths */}
            <div className="flex items-center gap-1.5 p-1 bg-[#101214] border border-white/10 rounded-xs mb-5 sm:mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("review");
                  setFormErrors({});
                }}
                className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-xs transition-all cursor-pointer text-center ${
                  activeTab === "review"
                    ? "bg-[#c5a059] text-black shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                1. Free Website Review
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("project");
                  setFormErrors({});
                }}
                className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-xs transition-all cursor-pointer text-center ${
                  activeTab === "project"
                    ? "bg-[#c5a059] text-black shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                2. Start a Project
              </button>
            </div>

            {submitted ? (
              <div className="py-8 sm:py-12 text-center space-y-4 sm:space-y-6 animate-fadeIn">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center mx-auto text-[#c5a059]">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-[24px] sm:text-3xl font-bold text-white leading-[1.15]">
                    {activeTab === "review"
                      ? "Your website review request has been received."
                      : "Your project inquiry has been received."}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thanks for reaching out. Michael will personally review your information and be in touch promptly.
                  </p>
                </div>

                <div className="p-3 sm:p-4 bg-[#181a1d] border border-white/10 rounded-sm max-w-md mx-auto text-xs text-neutral-300 space-y-1">
                  <div className="font-semibold text-white">Need an immediate answer?</div>
                  <div>
                    Call or text Michael at{" "}
                    <a
                      href="tel:2034445273"
                      className="text-[#c5a059] font-bold hover:underline"
                    >
                      203-444-5273
                    </a>
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <a
                    href="tel:2034445273"
                    className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Call: 203-444-5273</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        business_name: "",
                        email: "",
                        phone: "",
                        website: "",
                        industry: "Landscaping / Hardscaping",
                        project_interest: "Custom Website — $499 One-Time",
                        service_area: "",
                        goal: "",
                        preferred_contact: "Email",
                        _gotcha: "",
                      });
                    }}
                    className="text-xs text-[#c5a059] hover:underline cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <form
                action="https://formspree.io/f/xrpegnlk"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5"
              >
                {/* Honeypot spam protection */}
                <input
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={(e) =>
                    setFormData({ ...formData, _gotcha: e.target.value })
                  }
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="border-b border-white/[0.08] pb-3 sm:pb-4">
                  <h3 className="font-display text-[22px] sm:text-2xl font-bold text-white leading-[1.2]">
                    {activeTab === "review"
                      ? "Request Your Free Website Review"
                      : "Start Your Project with 1Up Digital"}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5 sm:mt-1">
                    {activeTab === "review"
                      ? "Fill out the form below. Takes less than 60 seconds."
                      : "Tell us about your project. Clear scope, transparent pricing, and zero retainers."}
                  </p>
                </div>

                {submitError && (
                  <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xs flex items-start gap-2.5 text-xs text-red-200 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span>{submitError}</span>{" "}
                      <a
                        href="mailto:mike@1updigital.com"
                        className="underline text-red-300 font-semibold hover:text-white"
                      >
                        mike@1updigital.com
                      </a>
                    </div>
                  </div>
                )}

                {/* 2-Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* 1. Name */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-semibold text-neutral-300">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Michael Caprio"
                      className="w-full bg-[#1b1e22] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs text-white placeholder-neutral-500 transition-colors"
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-red-400">{formErrors.name}</p>
                    )}
                  </div>

                  {/* 2. Business Name */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-semibold text-neutral-300">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="business_name"
                      required
                      value={formData.business_name}
                      onChange={(e) =>
                        setFormData({ ...formData, business_name: e.target.value })
                      }
                      placeholder="e.g. Highline Services LLC"
                      className="w-full bg-[#1b1e22] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs text-white placeholder-neutral-500 transition-colors"
                    />
                    {formErrors.business_name && (
                      <p className="text-[11px] text-red-400">
                        {formErrors.business_name}
                      </p>
                    )}
                  </div>

                  {/* 3. Email */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-semibold text-neutral-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="you@company.com"
                      className="w-full bg-[#1b1e22] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs text-white placeholder-neutral-500 transition-colors"
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-400">{formErrors.email}</p>
                    )}
                  </div>

                  {/* 4. Phone */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-semibold text-neutral-300">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="203-444-5273"
                      className="w-full bg-[#1b1e22] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs text-white placeholder-neutral-500 transition-colors"
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-400">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Contextual field: Current Website for Reviews, Project Service for Projects */}
                  {activeTab === "review" ? (
                    <div className="space-y-1 sm:space-y-1.5">
                      <label className="text-[11px] sm:text-xs font-semibold text-neutral-300">
                        Current Website URL
                      </label>
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                        placeholder="https://yourwebsite.com or “No site yet”"
                        className="w-full bg-[#1b1e22] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs text-white placeholder-neutral-500 transition-colors"
                      />
                    </div>
                  ) : (
                    <div className="space-y-1 sm:space-y-1.5">
                      <label className="text-[11px] sm:text-xs font-semibold text-neutral-300">
                        Service of Interest *
                      </label>
                      <select
                        name="project_interest"
                        value={formData.project_interest}
                        onChange={(e) =>
                          setFormData({ ...formData, project_interest: e.target.value })
                        }
                        className="w-full bg-[#1b1e22] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs text-white transition-colors"
                      >
                        {PROJECT_TYPE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#1b1e22] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Industry */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-semibold text-neutral-300">
                      Industry / Trade
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                      className="w-full bg-[#1b1e22] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs text-white transition-colors"
                    >
                      {INDUSTRY_OPTIONS.map((ind) => (
                        <option key={ind} value={ind} className="bg-[#1b1e22] text-white">
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City / Location */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-semibold text-neutral-300">
                      City / Service Area
                    </label>
                    <input
                      type="text"
                      name="service_area"
                      value={formData.service_area}
                      onChange={(e) =>
                        setFormData({ ...formData, service_area: e.target.value })
                      }
                      placeholder="e.g. Stamford, CT or Fairfield County"
                      className="w-full bg-[#1b1e22] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs text-white placeholder-neutral-500 transition-colors"
                    />
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-semibold text-neutral-300">
                      Preferred Contact Method
                    </label>
                    <select
                      name="preferred_contact"
                      value={formData.preferred_contact}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferred_contact: e.target.value,
                        })
                      }
                      className="w-full bg-[#1b1e22] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs text-white transition-colors"
                    >
                      {PREFERRED_CONTACT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#1b1e22] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Goal / Details */}
                  <div className="space-y-1 sm:space-y-1.5 sm:col-span-2">
                    <label className="text-[11px] sm:text-xs font-semibold text-neutral-300">
                      {activeTab === "review"
                        ? "What would you like to improve?"
                        : "Tell us about your project & goals"}
                    </label>
                    <textarea
                      rows={2}
                      name="goal"
                      value={formData.goal}
                      onChange={(e) =>
                        setFormData({ ...formData, goal: e.target.value })
                      }
                      placeholder={
                        activeTab === "review"
                          ? "Tell us what you’d like to improve about your current website or online presence."
                          : "Briefly describe what you're looking for, your timeline, or any specific questions."
                      }
                      className="w-full bg-[#1b1e22] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs text-white placeholder-neutral-500 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-1 sm:pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary-interaction group w-full py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#d8b268] transition-all rounded-xs cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(197,160,89,0.35)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span>SENDING...</span>
                    ) : (
                      <>
                        <span>
                          {activeTab === "review"
                            ? "GET MY FREE WEBSITE REVIEW"
                            : "SUBMIT PROJECT INQUIRY"}
                        </span>
                        <ArrowRight className="w-4 h-4 group-arrow-hover" />
                      </>
                    )}
                  </button>
                </div>

                {/* Confidentiality Notice */}
                <p className="text-[11px] text-center text-neutral-400">
                  Your information is strictly confidential. No spam, ever.
                </p>

                {/* Secondary Conversion Path: Direct Phone Call */}
                <div className="pt-3 sm:pt-4 border-t border-white/[0.08] text-center space-y-1.5 sm:space-y-2">
                  <div className="text-xs text-neutral-300 font-medium">
                    Prefer to talk directly?
                  </div>
                  <div>
                    <a
                      href="tel:2034445273"
                      className="btn-secondary-interaction inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#c5a059]/40 text-[#c5a059] hover:text-[#d8b268] rounded-xs text-xs font-bold uppercase tracking-wider transition-colors group cursor-pointer shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>CALL 203-444-5273</span>
                    </a>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Speak directly with Michael about your project, current website, and goals.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
