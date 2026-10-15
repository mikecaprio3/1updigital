export interface PortfolioProject {
  id: string;
  name: string;
  title?: string;
  industry: string;
  category?: string;
  projectType?: string;
  location?: string;
  badge?: string;
  description: string;
  servicesDelivered?: string[];
  desktopHero?: string;
  desktopSecondary?: string;
  mobileImage?: string;
  heroImage?: string;
  url?: string;
  isComingSoon?: boolean;
  designObjective?: string;
  challenge?: string;
  solution?: string;
  scope?: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  price: string;
  description: string;
  ctaText: string;
  inquiryType: string;
}

export const siteConfig = {
  // Brand & Legal Identity
  brandName: "1Up Digital",
  brandWordmark: "1Up Digital",
  legalCompanyName: "Call Master LLC",
  dbaText: "Call Master LLC d/b/a 1Up Digital",

  // Positioning & Hero Typography
  hero: {
    line1: "Your Business.",
    line2: "Better Online.",
    supportingCopy: "Professional websites and smarter business tools, built around your needs.",
    primaryCta: "Start a Project",
    secondaryCta: "View Our Work",
    microcopy: "Websites starting at $499",
  },

  // Real Contact Information
  contact: {
    phoneDisplay: "203-444-5273",
    phoneTel: "+12034445273",
    email: "mike@1updigital.com",
    serviceArea: "Connecticut · Serving clients nationwide",
    businessHours: "Mon – Fri: 8:00 AM – 6:00 PM EST",
    locationDetail: "Based in Connecticut",
  },

  // Palette Constants
  colors: {
    accent: "#c5a059", // Champagne burnished gold
    accentHover: "#d8b268",
    accentLight: "rgba(197, 160, 89, 0.12)",
    surfaceDark: "#0c0d0e",
    surfaceCard: "#131518",
    surfaceElevated: "#181a1e",
    textMuted: "#9ca3af",
  },

  // TWO Primary Public-Facing Services
  services: [
    {
      id: "custom-websites",
      title: "CUSTOM WEBSITES",
      price: "Starting at $499",
      description:
        "Professional, mobile-friendly websites that help your business stand out and make it easy for customers to get in touch.",
      ctaText: "Start Your Website",
      inquiryType: "Custom Website",
    },
    {
      id: "crm-automation",
      title: "CRM & AUTOMATION",
      price: "Custom Quote",
      description:
        "Keep track of new leads, manage customer information, and automate follow-ups so fewer opportunities slip through the cracks.",
      ctaText: "Discuss Your Project",
      inquiryType: "CRM & Automation",
    },
  ] as ServiceCategory[],

  // 3-Step Simple Process: Let's Talk, See The Plan, We Build. You Approve.
  processSteps: [
    {
      step: "01",
      title: "Let's Talk",
      description: "Tell us about your business and what you'd like to improve.",
    },
    {
      step: "02",
      title: "See the Plan",
      description: "We'll explain the approach, scope, and price.",
    },
    {
      step: "03",
      title: "We Build. You Approve.",
      description:
        "Once we're officially underway with an agreed scope and deposit, we build, refine, and launch.",
    },
  ],

  // Simple, Upfront Pricing
  pricing: {
    title: "Simple, Upfront Pricing.",
    subtitle: "Clear pricing with zero forced monthly maintenance plans.",
    mainOffer: {
      title: "Custom Website",
      price: "Starting at $499",
      priceDetail: "One-time build",
      description: "A tailored, modern website built to represent your business professionally and drive inquiries.",
      ctaText: "Start a Project",
      features: [
        "Custom responsive design",
        "Contact or booking integration as agreed",
        "Basic on-page search setup",
        "Launch assistance",
        "Standard hosting for eligible projects",
        "Seven-day post-launch minor-correction window",
      ],
      scopeNote:
        "Domain registration, third-party services, and advanced features are quoted separately. Standard hosting and revisions are subject to agreed project terms. No mandatory monthly website maintenance plan.",
    },
    crmCallout: "Need CRM integration or automation? Custom projects are quoted individually.",
  },

  // Centralized Client Portal & Existing-Client Configuration
  clientPortal: {
    // Verified production portal URL (Set via environment variable VITE_CLIENT_PORTAL_URL)
    url: (import.meta.env.VITE_CLIENT_PORTAL_URL as string) || "",
    heading: "Already a Client?",
    description: "Access your projects, request website updates, and track progress in your client portal.",
    ctaText: "Client Login",
  },

  // Founder Information
  founder: {
    name: "Michael Caprio",
    role: "Founder",
    image: "/images/owner.jpg",
    heading: "A Real Person Behind Every Project.",
    copy: "I'm Michael, founder of 1Up Digital. I work directly with business owners to build professional websites and practical digital solutions, without the agency runaround.",
    supportingLine: "You'll work directly with me from first conversation to launch.",
    ctaText: "Let's Talk",
  },

  // Portfolio Presentation
  work: {
    title: "Our Work.",
    subtitle: "Real projects. Thoughtful design. Built for real businesses.",
    placeholder: {
      headline: "Real Work. Coming Soon.",
      supportingText: "Our first featured client website is nearly ready.",
      statusBadge: "IN PRODUCTION",
      location: "Connecticut",
    },
  },

  // Frequently Asked Questions
  faqs: [
    {
      q: "How much does a website cost?",
      a: "Custom websites start at $499 one-time. This includes custom responsive design, contact integration, basic on-page search setup, launch assistance, standard hosting for eligible projects, and a 7-day post-launch minor-correction window.",
    },
    {
      q: "Are there required monthly maintenance plans?",
      a: "No. There are no mandatory monthly subscriptions.",
    },
    {
      q: "Can I keep my existing domain?",
      a: "Yes. You maintain control of your domain name. We connect it seamlessly during launch.",
    },
  ],

  // Regional SEO Landing Pages
  seoLandingPages: [
    {
      slug: "web-design-connecticut",
      title: "1Up Digital | Website Design in Connecticut",
      metaDescription: "Professional custom websites and digital solutions for local businesses across Connecticut.",
      headline: "Connecticut's Premier Web Design & Digital Solutions",
      region: "Connecticut",
      focusTrades: ["Local Businesses", "Contractors", "Professional Services"],
    },
  ],
};
