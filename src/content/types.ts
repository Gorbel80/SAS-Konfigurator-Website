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

export type ImageKey =
  | "hero"
  | "about"
  | "service"
  | "workshop"
  | "contact"
  | "warehouse";

export type ValueItem = {
  title: string;
  body: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type LocaleContent = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    about: string;
    service: string;
    contact: string;
    cta: string;
  };
  home: {
    eyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    trustLabel: string;
    trustItems: string[];
    valueTitle: string;
    valueSubtitle: string;
    values: ValueItem[];
    storyTitle: string;
    storyBody: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    storyTitle: string;
    storyBody: string[];
    companiesTitle: string;
    companiesSubtitle: string;
    wimaRole: string;
    sasRole: string;
    factsTitle: string;
    facts: ValueItem[];
  };
  service: {
    eyebrow: string;
    title: string;
    intro: string;
    helpTitle: string;
    helpIntro: string;
    helpItems: ValueItem[];
    processTitle: string;
    processSubtitle: string;
    steps: ProcessStep[];
    devicesTitle: string;
    devicesBody: string;
    devices: string[];
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    locationsTitle: string;
    formTitle: string;
    formName: string;
    formCompany: string;
    formEmail: string;
    formPhone: string;
    formMessage: string;
    formSubmit: string;
    formHint: string;
    formSuccess: string;
    hoursTitle: string;
    hoursBody: string;
  };
  footer: {
    tagline: string;
    rights: string;
    locations: string;
    links: string;
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
