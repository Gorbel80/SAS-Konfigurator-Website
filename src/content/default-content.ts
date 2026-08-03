import type { CompanyInfo, LocaleContent, SiteContent } from "./types";

const wimaBase: CompanyInfo = {
  name: "WiMa Industrie-Automation",
  legalName: "WiMa Industrie-Automation GmbH",
  street: "Musterstraße 12",
  postal: "58300",
  city: "Wetter",
  country: "Deutschland",
  phone: "+49 (0) 2335 000000",
  email: "info@wima-industrie.de",
  mapUrl: "https://maps.google.com/?q=58300+Wetter+Germany",
  managingDirector: "Max Mustermann",
  registerCourt: "Amtsgericht Hagen",
  registerNumber: "HRB 00000",
  vatId: "DE000000000",
};

const sasBase: CompanyInfo = {
  name: "SAS Sauer-Automation Sachsen",
  legalName: "SAS Sauer-Automation Sachsen GmbH",
  street: "Beispielweg 5",
  postal: "09394",
  city: "Hohndorf",
  country: "Deutschland",
  phone: "+49 (0) 37296 000000",
  email: "info@sas-automation.de",
  mapUrl: "https://maps.google.com/?q=09394+Hohndorf+Germany",
  managingDirector: "Erika Musterfrau",
  registerCourt: "Amtsgericht Chemnitz",
  registerNumber: "HRB 00000",
  vatId: "DE000000000",
};

const de: LocaleContent = {
  meta: {
    title: "Gorbel G-Force® – Größtes Ersatzteillager Deutschlands | SAS × WiMa",
    description:
      "Größtes Ersatzteillager Deutschlands für Gorbel G-Force® und Easy Arm®. Service und eigene Seil-/Kettenzüge von WiMa und SAS.",
  },
  nav: {
    home: "Start",
    offerings: "Leistungen",
    contact: "Kontakt",
    cta: "Kontakt",
  },
  home: {
    eyebrow: "G-Force® · Easy Arm® · Service & Ersatzteile",
    heroTitle: "Größtes Ersatzteillager Deutschlands für Gorbel G-Force®",
    heroSubtitle:
      "Schnelle Ersatzteile und qualifizierter Service für G-Force® und Easy Arm® – wenn europäische Werke nicht mehr rechtzeitig beliefert werden.",
    whoTitle: "Was WiMa macht",
    whoBody:
      "WiMa Industrie-Automation GmbH entwickelt und baut Systeme für die Hebetechnik und rüstet Seil- und Kettenzüge mit innovativer Elektronik aus. Gemeinsam mit SAS betreuen wir Gorbel G-Force® und Easy Arm® in der Praxis.",
    offerTitle: "Das Problem – und unsere Lösung",
    problemLabel: "Problem",
    solutionLabel: "Lösung",
    offerParts:
      "Viele europäische Produktionsstandorte erhalten für Gorbel G-Force® und Easy Arm® keine zeitnahen Ersatzteile und keinen qualifizierten Service mehr.",
    offerService:
      "Wir schließen diese Lücke: komplettes Ersatzteillager von e-motion Handlingsysteme übernommen, Know-how integriert – Service und Teile aus einer Hand.",
    configuratorLabel: "3D Konfigurator",
    configuratorHint: "Bald verfügbar",
    contactCta: "Jetzt anfragen",
  },
  offerings: {
    title: "Leistungen",
    intro:
      "Service, Gorbel-Ersatzteile und eigene Hebezeuge – klar und praxisnah.",
    journeyNote:
      "Viele Kunden kommen zuerst wegen G-Force®- oder Easy Arm®-Ersatzteilen – und entdecken danach unsere eigenen Seil- und Kettenzüge.",
    service: {
      title: "Service",
      body: "Wartung, Diagnose und Reparatur für intelligente Hebesysteme. Erfahrene Techniker von WiMa und SAS – werkstattseitig und vor Ort.",
    },
    parts: {
      title: "G-Force® & Easy Arm® Ersatzteile",
      body: "Großes deutsches Ersatzteillager für Gorbel G-Force® und Easy Arm®. Identifikation, Lieferung und Unterstützung, wenn der frühere Europa-Support fehlt.",
    },
    lifts: {
      title: "Eigene Seil- und Kettenzüge",
      body: "WiMa/SAS-Hebezeuge mit innovativer Elektronik – Seilzüge und Kettenzüge zu etwa der Hälfte des Preises vergleichbarer Gorbel-Systeme.",
    },
    ctaLabel: "Beratung anfragen",
  },
  contact: {
    title: "Kontakt",
    intro: "Ersatzteil, Störung oder Service? Kurz melden – wir antworten.",
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
      "Größtes Ersatzteillager Deutschlands für Gorbel G-Force® & Easy Arm® · Service & Reparatur",
    rights: "Alle Rechte vorbehalten.",
    impressum: "Impressum",
    privacy: "Datenschutz",
  },
  cookies: {
    title: "Cookie-Einstellungen",
    body: "Wir verwenden technisch notwendige Cookies für den Betrieb der Website. Optionale Cookies (z. B. Statistik) setzen wir nur mit Ihrer Einwilligung. Details finden Sie in der Datenschutzerklärung.",
    acceptAll: "Alle akzeptieren",
    essentialOnly: "Nur notwendige",
    privacyLink: "Datenschutzerklärung",
  },
  impressum: {
    title: "Impressum",
    intro:
      "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz). Die Website wird betrieben von den unten genannten Unternehmen (Platzhalterangaben – bitte final prüfen).",
    sectionCompany: "Anbieter",
    sectionContact: "Kontakt",
    sectionRegister: "Registereintrag",
    sectionVat: "Umsatzsteuer-ID",
    sectionResponsible: "Verantwortlich für den Inhalt",
    sectionNote: "Hinweis",
    noteBody:
      "Die auf dieser Website genannten Firmendaten sind Platzhalter und müssen vor dem produktiven Betrieb durch die tatsächlichen Register- und Kontaktdaten ersetzt werden.",
    managingDirectorLabel: "Geschäftsführung",
    registerLabel: "Handelsregister",
    vatLabel: "USt-IdNr.",
    responsibleLabel: "Verantwortlich i. S. d. § 18 Abs. 2 MStV",
  },
  privacy: {
    title: "Datenschutzerklärung",
    intro:
      "Wir informieren Sie über die Verarbeitung personenbezogener Daten beim Besuch dieser Website (DSGVO / BDSG). Angaben sind auf den aktuellen Stand dieser Website abgestimmt.",
    lastUpdated: "Stand: März 2026",
    sections: [
      {
        heading: "1. Verantwortliche Stelle",
        body: "Verantwortlich für die Datenverarbeitung im Zusammenhang mit dieser Website ist der im Impressum genannte Website-Betreiber (WiMa Industrie-Automation GmbH bzw. die dort genannte Gesellschaft). Kontaktmöglichkeiten entnehmen Sie dem Impressum.",
      },
      {
        heading: "2. Hosting und Server-Logfiles",
        body: "Beim Aufruf der Website verarbeitet der Hosting-Anbieter (z. B. Vercel) technisch erforderliche Daten in Server-Logfiles (u. a. IP-Adresse, Datum/Uhrzeit, angeforderte Datei, User-Agent, Referrer). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem und stabilem Betrieb). Die Daten werden in der Regel nur kurzfristig gespeichert und nicht mit anderen Datenquellen zusammengeführt.",
      },
      {
        heading: "3. Cookies und Einwilligung",
        body: "Wir setzen technisch notwendige Cookies bzw. Speicherungen (z. B. Ihre Cookie-Entscheidung im Local Storage) ein, um die Website bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO bzw. § 25 Abs. 2 TDDDG). Nicht notwendige Cookies (z. B. Analyse) werden nur gesetzt, wenn Sie im Cookie-Banner „Alle akzeptieren“ wählen (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Sie können Ihre Entscheidung jederzeit ändern, indem Sie den Local-Storage-Eintrag „sas_cookie_consent“ löschen und die Seite neu laden.",
      },
      {
        heading: "4. Kontaktformular und E-Mail",
        body: "Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten (z. B. Name, Unternehmen, E-Mail, Telefon, Nachricht) zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen Maßnahmen bzw. lit. f bei allgemeinem Interesse). Das Formular öffnet lokal Ihre E-Mail-Anwendung; die Übermittlung erfolgt über Ihren E-Mail-Anbieter. Speicherdauer: solange die Bearbeitung es erfordert, danach Löschung, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.",
      },
      {
        heading: "5. Empfänger und Auftragsverarbeitung",
        body: "Technische Dienstleister (Hosting, ggf. E-Mail-Transport) können im Rahmen der Auftragsverarbeitung nach Art. 28 DSGVO eingesetzt werden. Eine Übermittlung in Drittländer kann beim Einsatz internationaler Cloud-Anbieter vorkommen; in diesem Fall werden geeignete Garantien (z. B. Standardvertragsklauseln) angestrebt. Details hängen vom konkret genutzten Hosting ab.",
      },
      {
        heading: "6. Ihre Rechte",
        body: "Sie haben nach der DSGVO insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Zudem besteht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde.",
      },
      {
        heading: "7. Pflicht zur Bereitstellung",
        body: "Die Bereitstellung personenbezogener Daten ist für den Website-Besuch technisch teilweise erforderlich (Logfiles). Für Kontaktanfragen ist die Angabe der für die Antwort nötigen Daten erforderlich; ohne diese können wir Anfragen ggf. nicht bearbeiten.",
      },
      {
        heading: "8. Aktualität",
        body: "Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich die Website, die Rechtslage oder unsere Prozesse ändern.",
      },
    ],
  },
};

const en: LocaleContent = {
  meta: {
    title: "Gorbel G-Force® – Germany’s largest spare-parts stock | SAS × WiMa",
    description:
      "Germany’s largest spare-parts warehouse for Gorbel G-Force® and Easy Arm®. Service and own rope/chain hoists from WiMa and SAS.",
  },
  nav: {
    home: "Home",
    offerings: "Solutions",
    contact: "Contact",
    cta: "Contact",
  },
  home: {
    eyebrow: "G-Force® · Easy Arm® · Service & spare parts",
    heroTitle: "Germany’s largest spare-parts warehouse for Gorbel G-Force®",
    heroSubtitle:
      "Fast spare parts and qualified service for G-Force® and Easy Arm® – when European plants can no longer get timely support.",
    whoTitle: "What WiMa does",
    whoBody:
      "WiMa Industrie-Automation GmbH develops and builds systems for lifting technology and equips rope and chain hoists with innovative electronics. Together with SAS, we support Gorbel G-Force® and Easy Arm® in the field.",
    offerTitle: "The problem – and our answer",
    problemLabel: "Problem",
    solutionLabel: "Solution",
    offerParts:
      "Many European production sites can no longer get timely spare parts or qualified service for Gorbel G-Force® and Easy Arm®.",
    offerService:
      "We closed this gap: full spare-parts warehouse from e-motion Handlingsysteme, expertise integrated – service and parts from one partner.",
    configuratorLabel: "3D Configurator",
    configuratorHint: "Coming soon",
    contactCta: "Contact us",
  },
  offerings: {
    title: "Solutions",
    intro: "Service, Gorbel spare parts and our own lifting systems – clear and practical.",
    journeyNote:
      "Most customers first come for G-Force® or Easy Arm® spare parts – then discover our own rope and chain hoists.",
    service: {
      title: "Service",
      body: "Maintenance, diagnostics and repair for intelligent lifting systems. Experienced WiMa and SAS technicians – workshop and on site.",
    },
    parts: {
      title: "G-Force® & Easy Arm® spare parts",
      body: "Large German spare-parts stock for Gorbel G-Force® and Easy Arm®. Identification, supply and support when former European manufacturer support is gone.",
    },
    lifts: {
      title: "Our own rope and chain hoists",
      body: "WiMa/SAS lifting devices with innovative electronics – rope and chain hoists at roughly half the price of comparable Gorbel systems.",
    },
    ctaLabel: "Request advice",
  },
  contact: {
    title: "Contact",
    intro: "Spare part, fault or service? Send a short note – we will reply.",
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
      "Germany’s largest spare-parts warehouse for Gorbel G-Force® & Easy Arm® · Service & repair",
    rights: "All rights reserved.",
    impressum: "Legal notice",
    privacy: "Privacy",
  },
  cookies: {
    title: "Cookie settings",
    body: "We use essential cookies for site operation. Optional cookies (e.g. analytics) are only set with your consent. See our privacy policy for details.",
    acceptAll: "Accept all",
    essentialOnly: "Essential only",
    privacyLink: "Privacy policy",
  },
  impressum: {
    title: "Legal notice (Impressum)",
    intro:
      "Information according to German Digital Services Act (DDG). This website is operated by the companies listed below (placeholder data – please verify before go-live).",
    sectionCompany: "Provider",
    sectionContact: "Contact",
    sectionRegister: "Commercial register",
    sectionVat: "VAT ID",
    sectionResponsible: "Responsible for content",
    sectionNote: "Note",
    noteBody:
      "Company details on this website are placeholders and must be replaced with actual register and contact data before productive use.",
    managingDirectorLabel: "Managing director(s)",
    registerLabel: "Register",
    vatLabel: "VAT ID",
    responsibleLabel: "Responsible for content",
  },
  privacy: {
    title: "Privacy policy",
    intro:
      "We inform you about the processing of personal data when using this website (GDPR). The information matches the current functionality of the site.",
    lastUpdated: "Last updated: March 2026",
    sections: [
      {
        heading: "1. Controller",
        body: "The controller for data processing related to this website is the website operator named in the legal notice (Impressum).",
      },
      {
        heading: "2. Hosting and server logs",
        body: "When you visit the site, the hosting provider (e.g. Vercel) processes technically necessary data in server logs (including IP address, date/time, requested file, user agent, referrer). Legal basis: Art. 6(1)(f) GDPR. Data is typically stored only briefly.",
      },
      {
        heading: "3. Cookies and consent",
        body: "We use essential cookies/storage (e.g. your cookie choice in local storage) to provide the website. Non-essential cookies are only set if you choose “Accept all” (Art. 6(1)(a) GDPR). You can reset your choice by deleting the local storage key “sas_cookie_consent” and reloading the page.",
      },
      {
        heading: "4. Contact form and email",
        body: "If you contact us via the form or email, we process the data you provide to handle your request (Art. 6(1)(b) or (f) GDPR). The form opens your local email client; transmission is via your email provider.",
      },
      {
        heading: "5. Recipients",
        body: "Technical service providers (hosting, email transport) may process data as processors under Art. 28 GDPR. International providers may involve third-country transfers with appropriate safeguards.",
      },
      {
        heading: "6. Your rights",
        body: "You have rights of access, rectification, erasure, restriction, portability and objection under the GDPR, as well as the right to lodge a complaint with a supervisory authority. Consents may be withdrawn at any time with effect for the future.",
      },
      {
        heading: "7. Obligation to provide data",
        body: "Some data is technically required to deliver the website (logs). Contact requests require the data needed to respond.",
      },
      {
        heading: "8. Updates",
        body: "We may update this policy if the website, the law or our processes change.",
      },
    ],
  },
};

const zh: LocaleContent = {
  meta: {
    title: "Gorbel G-Force® – 德国最大备件库 | SAS × WiMa",
    description:
      "德国最大的 Gorbel G-Force® 与 Easy Arm® 备件库。WiMa/SAS 服务与自有钢丝绳/环链葫芦。",
  },
  nav: {
    home: "首页",
    offerings: "服务方案",
    contact: "联系",
    cta: "联系",
  },
  home: {
    eyebrow: "G-Force® · Easy Arm® · 服务与备件",
    heroTitle: "德国最大的 Gorbel G-Force® 备件库",
    heroSubtitle:
      "G-Force® 与 Easy Arm® 的快速备件与专业服务——当欧洲工厂再也无法及时获得支持时。",
    whoTitle: "WiMa 做什么",
    whoBody:
      "WiMa Industrie-Automation GmbH 开发并建造起重技术系统，为钢丝绳与环链葫芦配备创新电子技术。与 SAS 一起，我们在现场服务 Gorbel G-Force® 与 Easy Arm®。",
    offerTitle: "问题——以及我们的答案",
    problemLabel: "问题",
    solutionLabel: "方案",
    offerParts:
      "许多欧洲生产现场已无法为 Gorbel G-Force® 与 Easy Arm® 及时获得备件或合格服务。",
    offerService:
      "我们填补了这一空白：接管 e-motion Handlingsysteme 的完整备件库并整合其专长——服务与备件统一对接。",
    configuratorLabel: "3D 配置器",
    configuratorHint: "即将推出",
    contactCta: "立即咨询",
  },
  offerings: {
    title: "服务方案",
    intro: "服务、Gorbel 备件与自有提升设备——清晰务实。",
    journeyNote:
      "多数客户先因 G-Force® 或 Easy Arm® 备件而来——随后发现我们的自有钢丝绳与环链葫芦。",
    service: {
      title: "服务",
      body: "智能提升系统的维护、诊断与维修。WiMa 与 SAS 经验丰富的技术员——车间与现场。",
    },
    parts: {
      title: "G-Force® 与 Easy Arm® 备件",
      body: "德国大型 Gorbel G-Force® 与 Easy Arm® 备件库存。在原欧洲原厂支持缺失时提供识别、供应与支持。",
    },
    lifts: {
      title: "自有钢丝绳与环链葫芦",
      body: "WiMa/SAS 提升设备配备创新电子技术——钢丝绳与环链葫芦价格约为同类 Gorbel 系统的一半。",
    },
    ctaLabel: "咨询方案",
  },
  contact: {
    title: "联系",
    intro: "备件、故障或服务？简短留言——我们会回复。",
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
    tagline: "德国最大 Gorbel G-Force® 与 Easy Arm® 备件库 · 服务与维修",
    rights: "版权所有。",
    impressum: "法律信息",
    privacy: "隐私政策",
  },
  cookies: {
    title: "Cookie 设置",
    body: "我们使用运营网站所必需的 Cookie。仅在您同意后才会设置可选 Cookie（如统计）。详情见隐私政策。",
    acceptAll: "全部接受",
    essentialOnly: "仅必要",
    privacyLink: "隐私政策",
  },
  impressum: {
    title: "法律信息 (Impressum)",
    intro:
      "根据德国数字服务法 (DDG) 的提供商信息。本网站由下列公司运营（占位数据——上线前请核对）。",
    sectionCompany: "提供方",
    sectionContact: "联系方式",
    sectionRegister: "商业登记",
    sectionVat: "增值税号",
    sectionResponsible: "内容责任人",
    sectionNote: "说明",
    noteBody:
      "本网站公司信息为占位内容，正式运营前须替换为真实登记与联系数据。",
    managingDirectorLabel: "总经理",
    registerLabel: "登记",
    vatLabel: "增值税识别号",
    responsibleLabel: "内容责任人",
  },
  privacy: {
    title: "隐私政策",
    intro:
      "我们说明您访问本网站时个人数据的处理方式（GDPR）。内容与当前网站功能一致。",
    lastUpdated: "更新日期：2026 年 3 月",
    sections: [
      {
        heading: "1. 控制者",
        body: "与本网站相关的数据处理控制者为法律信息页中列明的网站运营方。",
      },
      {
        heading: "2. 托管与服务器日志",
        body: "访问网站时，托管服务商（如 Vercel）会处理服务器日志中的必要技术数据（IP、时间、请求文件、User-Agent、来源页等）。法律依据为 GDPR 第 6(1)(f) 条。",
      },
      {
        heading: "3. Cookie 与同意",
        body: "我们使用必要的 Cookie/本地存储（如您的 Cookie 选择）。非必要 Cookie 仅在您选择“全部接受”时设置。可通过删除本地存储键 “sas_cookie_consent” 并刷新页面重置选择。",
      },
      {
        heading: "4. 联系表单与邮件",
        body: "通过表单或邮件联系时，我们处理您提供的数据以处理请求。表单会打开本地邮件客户端，传输经由您的邮件服务商完成。",
      },
      {
        heading: "5. 接收方",
        body: "技术服务商（托管、邮件传输）可能作为处理者处理数据。使用国际云服务时可能涉及第三国传输。",
      },
      {
        heading: "6. 您的权利",
        body: "您享有 GDPR 规定的查阅、更正、删除、限制、可携带与反对等权利，以及向监管机构投诉的权利。同意可随时撤回。",
      },
      {
        heading: "7. 提供数据的义务",
        body: "部分数据为交付网站所必需（日志）。联系请求需要足以回复的信息。",
      },
      {
        heading: "8. 更新",
        body: "网站、法律或流程变化时，我们可能更新本政策。",
      },
    ],
  },
};

export const defaultContent: SiteContent = {
  version: 14,
  images: {
    hero: "/images/site/hero.jpg",
    side: "/images/site/about.jpg",
    contact: "/images/site/contact.jpg",
    service: "/images/site/service.jpg",
    parts: "/images/site/workshop.jpg",
    lifts: "/images/site/story.jpg",
  },
  companies: {
    wima: wimaBase,
    sas: sasBase,
  },
  siteOperator: "wima",
  locales: { de, en, zh },
};
