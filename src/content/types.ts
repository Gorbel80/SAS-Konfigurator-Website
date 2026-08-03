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

export type ImageKey = "hero" | "side" | "contact";

export type LocaleContent = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    contact: string;
    cta: string;
  };
  home: {
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
    configuratorLabel: string;
    configuratorHint: string;
    contactCta: string;
  };
  contact: {
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
  /** Website operator key for Impressum responsibility */
  siteOperator: "wima" | "sas";
  locales: Record<Locale, LocaleContent>;
};
