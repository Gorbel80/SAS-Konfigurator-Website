import type { LocaleContent, SiteContent } from "./types";

const de: LocaleContent = {
  meta: {
    title: "Gorbel G-Force – Größtes Ersatzteillager Deutschlands | SAS × WiMa",
    description:
      "Größtes Ersatzteillager Deutschlands für Gorbel G-Force. Service, Wartung und Reparatur durch WiMa und SAS.",
  },
  nav: {
    home: "Start",
    contact: "Kontakt",
    cta: "Kontakt",
  },
  home: {
    eyebrow: "Gorbel G-Force · Deutschland & Europa",
    heroTitle: "Größtes Ersatzteillager Deutschlands für Gorbel G-Force",
    heroSubtitle:
      "Service, Wartung, Reparatur und Ersatzteile – aus einer Hand. WiMa (Wetter) und SAS (Hohndorf).",
    whoTitle: "Wer wir sind",
    whoBody:
      "WiMa Industrie-Automation und SAS Sauer-Automation Sachsen betreuen Gorbel G-Force Anlagen seit Jahren. Offizieller Support von Gorbel in Europa fehlt – wir liefern Teile und technischen Service.",
    offerTitle: "Was wir bieten",
    offerParts: "Ersatzteile aus dem größten G-Force-Lager in Deutschland",
    offerService: "Qualifizierter Service, Wartung und Reparatur",
    configuratorLabel: "3D Konfigurator",
    configuratorHint: "Bald verfügbar",
    contactCta: "Jetzt anfragen",
  },
  contact: {
    title: "Kontakt",
    intro: "Kurz Ihr Anliegen schildern – wir melden uns.",
    formName: "Name",
    formCompany: "Unternehmen",
    formEmail: "E-Mail",
    formPhone: "Telefon",
    formMessage: "Anliegen",
    formSubmit: "Senden",
    formHint: "Öffnet Ihre E-Mail-App mit vorausgefüllter Nachricht.",
    formSuccess: "E-Mail-App sollte geöffnet sein.",
  },
  footer: {
    tagline:
      "Größtes Ersatzteillager Deutschlands für Gorbel G-Force · Service & Reparatur",
    rights: "Alle Rechte vorbehalten.",
  },
};

const en: LocaleContent = {
  meta: {
    title: "Gorbel G-Force – Germany’s largest spare-parts stock | SAS × WiMa",
    description:
      "Germany’s largest spare-parts warehouse for Gorbel G-Force. Service, maintenance and repair by WiMa and SAS.",
  },
  nav: {
    home: "Home",
    contact: "Contact",
    cta: "Contact",
  },
  home: {
    eyebrow: "Gorbel G-Force · Germany & Europe",
    heroTitle: "Germany’s largest spare-parts warehouse for Gorbel G-Force",
    heroSubtitle:
      "Service, maintenance, repair and spare parts – from one partner. WiMa (Wetter) and SAS (Hohndorf).",
    whoTitle: "Who we are",
    whoBody:
      "WiMa Industrie-Automation and SAS Sauer-Automation Sachsen have supported Gorbel G-Force systems for years. Official Gorbel support in Europe is no longer available – we supply parts and technical service.",
    offerTitle: "What we offer",
    offerParts: "Spare parts from Germany’s largest G-Force stock",
    offerService: "Qualified service, maintenance and repair",
    configuratorLabel: "3D Configurator",
    configuratorHint: "Coming soon",
    contactCta: "Contact us",
  },
  contact: {
    title: "Contact",
    intro: "Briefly describe your request – we will get back to you.",
    formName: "Name",
    formCompany: "Company",
    formEmail: "Email",
    formPhone: "Phone",
    formMessage: "Message",
    formSubmit: "Send",
    formHint: "Opens your email app with a pre-filled message.",
    formSuccess: "Your email app should have opened.",
  },
  footer: {
    tagline:
      "Germany’s largest spare-parts warehouse for Gorbel G-Force · Service & repair",
    rights: "All rights reserved.",
  },
};

const zh: LocaleContent = {
  meta: {
    title: "Gorbel G-Force – 德国最大备件库 | SAS × WiMa",
    description:
      "德国最大的 Gorbel G-Force 备件库存。WiMa 与 SAS 提供服务、维护与维修。",
  },
  nav: {
    home: "首页",
    contact: "联系",
    cta: "联系",
  },
  home: {
    eyebrow: "Gorbel G-Force · 德国与欧洲",
    heroTitle: "德国最大的 Gorbel G-Force 备件库",
    heroSubtitle:
      "服务、维护、维修与备件——统一对接。WiMa（Wetter）与 SAS（Hohndorf）。",
    whoTitle: "我们是谁",
    whoBody:
      "WiMa 与 SAS 多年来服务 Gorbel G-Force 设备。欧洲已无官方 Gorbel 支持——我们提供备件与技术服务。",
    offerTitle: "我们提供",
    offerParts: "来自德国最大 G-Force 库存的备件",
    offerService: "专业服务、维护与维修",
    configuratorLabel: "3D 配置器",
    configuratorHint: "即将推出",
    contactCta: "立即咨询",
  },
  contact: {
    title: "联系",
    intro: "简要说明需求——我们会回复。",
    formName: "姓名",
    formCompany: "公司",
    formEmail: "邮箱",
    formPhone: "电话",
    formMessage: "留言",
    formSubmit: "发送",
    formHint: "将打开邮件应用并预填内容。",
    formSuccess: "应已打开邮件应用。",
  },
  footer: {
    tagline: "德国最大 Gorbel G-Force 备件库 · 服务与维修",
    rights: "版权所有。",
  },
};

export const defaultContent: SiteContent = {
  version: 10,
  images: {
    hero: "/images/site/hero.jpg",
    side: "/images/site/about.jpg",
    contact: "/images/site/contact.jpg",
  },
  companies: {
    wima: {
      name: "WiMa Industrie-Automation",
      legalName: "WiMa Industrie-Automation GmbH",
      street: "Service-Standort",
      postal: "58300",
      city: "Wetter",
      country: "Deutschland",
      phone: "+49 (0) 000 000000",
      email: "service@wima-example.de",
      mapUrl: "https://maps.google.com/?q=58300+Wetter+Germany",
    },
    sas: {
      name: "SAS Sauer-Automation Sachsen",
      legalName: "SAS Sauer-Automation Sachsen",
      street: "Service-Standort",
      postal: "09394",
      city: "Hohndorf",
      country: "Deutschland",
      phone: "+49 (0) 000 000000",
      email: "service@sas-example.de",
      mapUrl: "https://maps.google.com/?q=09394+Hohndorf+Germany",
    },
  },
  locales: { de, en, zh },
};
