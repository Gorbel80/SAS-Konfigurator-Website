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
  };
};

export type SiteContent = {
  version: number;
  images: Record<ImageKey, string>;
  companies: {
    wima: CompanyInfo;
    sas: CompanyInfo;
  };
  locales: Record<Locale, LocaleContent>;
};
