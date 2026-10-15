import React, { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const SERVICE_OPTIONS = [
  "Custom Website",
  "CRM & Automation",
  "Not Sure / Other",
];

interface ContactSectionProps {
  initialService?: string;
}

const normalizeServiceChoice = (svc?: string) => {
  if (!svc) return "Custom Website";
  if (svc === "CRM & Automation" || svc === "crm-automation" || svc === "Business Tools & Automation") {
    return "CRM & Automation";
  }
  if (svc === "Not Sure / Other" || svc === "Not Sure") {
    return "Not Sure / Other";
  }
  return "Custom Website";
};

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    serviceNeed: normalizeServiceChoice(initialService),
    websiteUrl: "",
    message: "",
    _gotcha: "",
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceNeed: normalizeServiceChoice(initialService) }));
    }
  }, [initialService]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage("Please provide your name and email.");
      return;
    }

    setIsSubmitting(true);

    try {
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
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          business_name: formData.businessName || "Not provided",
          service_need: formData.serviceNeed,
          current_website: formData.websiteUrl || "Not provided / none yet",
          message: formData.message || "No additional message",
          _subject: `1Up Digital Inquiry: ${formData.serviceNeed} (${formData.name})`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => null);
        if (data && data.errors && data.errors.length > 0) {
          setErrorMessage(
            data.errors.map((err: { message: string }) => err.message).join(", ")
          );
        } else {
          setErrorMessage(
            "Something went wrong. Please call Michael directly at 203-444-5273."
          );
        }
      }
    } catch {
      setErrorMessage(
        "Could not send message. Please call Michael directly at 203-444-5273."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-8 sm:py-12 md:py-16 bg-[#0c0d0e] relative border-b border-white/[0.08] overflow-hidden"
    >
      <span id="review" className="absolute -top-24" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={600}>
          <div className="text-left sm:text-center space-y-1.5 mb-6 sm:mb-8">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Let's Build Something Better.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              Tell us a little about your business and what you need. We'll take it from there.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Form Card */}
        <ScrollReveal direction="up" delay={60} duration={600}>
          <div className="p-5 sm:p-7 bg-[#131518] border border-white/10 rounded-xs shadow-xl">
            {submitted ? (
              <div className="py-8 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center mx-auto text-[#c5a059]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Message Received.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed">
                  Thanks for reaching out. Michael will review your details and respond promptly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        businessName: "",
                        serviceNeed: "Website",
                        websiteUrl: "",
                        message: "",
                        _gotcha: "",
                      });
                    }}
                    className="text-xs text-[#c5a059] hover:underline cursor-pointer font-mono"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
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

                {errorMessage && (
                  <div className="p-2.5 bg-red-950/60 border border-red-500/40 rounded-xs flex items-start gap-2 text-xs text-red-200">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-300">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Jane Doe"
                      className="w-full bg-[#181a1e] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="you@company.com"
                      className="w-full bg-[#181a1e] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-300">
                      Phone Number <span className="text-neutral-500 font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="203-444-5273"
                      className="w-full bg-[#181a1e] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 transition-colors"
                    />
                  </div>

                  {/* Business Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-300">
                      Business Name <span className="text-neutral-500 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({ ...formData, businessName: e.target.value })
                      }
                      placeholder="Your business"
                      className="w-full bg-[#181a1e] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Inquiry Category Selector */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">
                    What do you need?
                  </label>
                  <select
                    value={formData.serviceNeed}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceNeed: e.target.value })
                    }
                    className="w-full bg-[#181a1e] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 py-2 text-xs sm:text-sm text-white transition-colors"
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#181a1e] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Current Website URL (Always Optional) */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">
                    Current Website <span className="text-neutral-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.websiteUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, websiteUrl: e.target.value })
                    }
                    placeholder="https://yourwebsite.com (leave blank if new)"
                    className="w-full bg-[#181a1e] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 transition-colors"
                  />
                </div>

                {/* Brief project description */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">
                    Brief Project Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us what you're looking to build or improve."
                    className="w-full bg-[#181a1e] border border-white/10 focus:border-[#c5a059] focus:outline-none rounded-xs px-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary-interaction group w-full py-3 bg-[#c5a059] hover:bg-[#d8b268] text-black text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>
                          {formData.serviceNeed === "CRM & Automation"
                            ? "Discuss CRM Project"
                            : "Start a Project"}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-arrow-hover" />
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Phone Option */}
                <div className="pt-3 border-t border-white/[0.06] text-center">
                  <p className="text-xs text-neutral-400">
                    Prefer to speak directly? Call Michael at{" "}
                    <a
                      href={`tel:${siteConfig.contact.phoneTel}`}
                      className="text-[#c5a059] font-bold hover:underline"
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
