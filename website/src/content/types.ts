export type Locale = "de" | "en" | "zh";

export type CompanyInfo = {
  name: string;
  legalName: string;
  street: string;
  postal: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  mapUrl: string;
  managingDirector: string;
  registerCourt: string;
  registerNumber: string;
  vatId: string;
};

export type ImageKey =
  | "hero"
  | "side"
  | "contact"
  | "service"
  | "parts"
  | "lifts";

export type OfferBlock = {
  title: string;
  body: string;
};

export type ContentCard = {
  title: string;
  body: string;
};

export type SpecRow = {
  label: string;
  values: string[];
};

export type LocaleContent = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    /** Über uns / Was WiMa & SAS machen (legacy / footer) */
    about: string;
    contact: string;
    cta: string;
    gforce: string;
    service: string;
    parts: string;
  };
  home: {
    /** Top-bar primary slogan */
    sloganPrimary: string;
    /** Top-bar secondary slogan */
    sloganSecondary: string;
    eyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    whoTitle: string;
    whoBody: string;
    offerTitle: string;
    problemLabel: string;
    solutionLabel: string;
    offerParts: string;
    offerService: string;
    contactCta: string;
    /** Service band headline */
    serviceBandTitle: string;
    /** Type-plate / photo CTA */
    serviceCtaTitle: string;
    serviceCtaBody: string;
    serviceCtaButton: string;
  };
  offerings: {
    title: string;
    intro: string;
    journeyNote: string;
    /** G-Force & Easy Arm product pillar */
    lifts: OfferBlock;
    service: OfferBlock;
    parts: OfferBlock;
    ctaLabel: string;
  };
  gforcePage: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    intro: string;
    balancers: ContentCard;
    controls: ContentCard;
    easyArm: ContentCard;
    body: string;
    specsTitle: string;
    specsHeaders: string[];
    specs: SpecRow[];
    ctaLabel: string;
  };
  servicePage: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    headline: string;
    intro: string;
    highlights: ContentCard[];
    ctaTitle: string;
    ctaBody: string;
    ctaLabel: string;
    contactCta: string;
  };
  about: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
  };
  contact: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    title: string;
    intro: string;
    formName: string;
    formCompany: string;
    formEmail: string;
    formPhone: string;
    formMessage: string;
    formSubmit: string;
    formHint: string;
    formSuccess: string;
  };
  footer: {
    tagline: string;
    rights: string;
    impressum: string;
    privacy: string;
  };
  cookies: {
    title: string;
    body: string;
    acceptAll: string;
    essentialOnly: string;
    privacyLink: string;
  };
  impressum: {
    title: string;
    intro: string;
    sectionCompany: string;
    sectionContact: string;
    sectionRegister: string;
    sectionVat: string;
    sectionResponsible: string;
    sectionNote: string;
    noteBody: string;
    managingDirectorLabel: string;
    registerLabel: string;
    vatLabel: string;
    responsibleLabel: string;
  };
  privacy: {
    title: string;
    intro: string;
    lastUpdated: string;
    sections: { heading: string; body: string }[];
  };
};

export type SiteContent = {
  version: number;
  images: Record<ImageKey, string>;
  companies: {
    wima: CompanyInfo;
    sas: CompanyInfo;
  };
  siteOperator: "wima" | "sas";
  locales: Record<Locale, LocaleContent>;
};
