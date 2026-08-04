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
    title:
      "Gorbel G-Force® Service & Ersatzteile Europa | SAS × WiMa",
    description:
      "Stillstand bei Ihrem Gorbel G-Force®? Service, Wartung und größtes Ersatzteillager Deutschlands für G-Force® und Easy Arm® – SAS × WiMa.",
  },
  nav: {
    home: "Start",
    about: "Über uns",
    contact: "Kontakt",
    cta: "Anfrage",
    gforce: "G-Force®",
    service: "Service",
    parts: "Ersatzteile",
  },
  home: {
    sloganPrimary: "Stillstand bei Ihrem Gorbel G-Force®? Wir haben die Lösung!",
    sloganSecondary:
      "Ihr Partner für Service, Wartung und Ersatzteile in Europa",
    eyebrow: "G-Force® · Easy Arm® · Europa",
    heroTitle: "Intelligente Hebetechnik – Service und Teile, wenn es zählt",
    heroSubtitle:
      "Qualifizierter Service und schnelle Ersatzteile für Gorbel G-Force® und Easy Arm® – wenn europäische Werke nicht mehr rechtzeitig beliefert werden.",
    whoTitle: "WiMa & SAS – Ihr Service-Partner",
    whoBody:
      "WiMa Industrie-Automation und SAS Sauer-Automation Sachsen betreuen Gorbel G-Force® und Easy Arm® in der Praxis: Diagnose, Reparatur, Ersatzteile und Know-how aus dem übernommenen e-motion-Bestand – plus eigene Hebezeuge mit innovativer Elektronik.",
    offerTitle: "Das Problem – und unsere Lösung",
    problemLabel: "Problem",
    solutionLabel: "Lösung",
    offerParts:
      "Viele europäische Produktionsstandorte stehen aktuell vor der Herausforderung, zeitnah Ersatzteile oder qualifizierten Service für ihre Gorbel G-Force®-Hubgeräte zu erhalten.",
    offerService:
      "Wir haben diese Lücke geschlossen: Durch die Übernahme der gesamten Aktivitäten der e-motion Handlingsysteme GmbH und die Integration deren Kern-Expertise bieten wir Service und Teile aus einer Hand.",
    configuratorLabel: "3D Konfigurator",
    configuratorHint: "Öffnen",
    contactCta: "Jetzt anfragen",
    serviceBandTitle: "Guter Service … ein Stück vom Produkt",
    serviceCtaTitle: "Schnelles Ersatzteil-Angebot",
    serviceCtaBody:
      "Senden Sie uns ein Foto Ihres Typenschilds – wir identifizieren das Teil und melden uns mit einem konkreten Angebot.",
    serviceCtaButton: "Foto senden / Kontakt",
  },
  offerings: {
    title: "Leistungen im Überblick",
    intro:
      "G-Force® & Easy Arm®, qualifizierter Service und das Ersatzteillager – klar und praxisnah.",
    journeyNote:
      "Viele Kunden kommen zuerst wegen Ersatzteilen – und entdecken danach unseren Service und unsere eigenen Hebezeuge.",
    lifts: {
      title: "G-Force® & Easy Arm®",
      body: "Intelligente Seilbalancer und Easy Arm®-Systeme: Präzision, Geschwindigkeit und Programmierbarkeit für anspruchsvolle Hebeanwendungen – mit Support, wenn der frühere Europa-Herstellersupport fehlt.",
    },
    service: {
      title: "Service",
      body: "Wartung, Diagnose und Reparatur für intelligente Hebesysteme. Erfahrene Techniker von WiMa und SAS – werkstattseitig und vor Ort.",
    },
    parts: {
      title: "Ersatzteile",
      body: "Großes deutsches Ersatzteillager für Gorbel G-Force® und Easy Arm®. Identifikation, Lieferung und Unterstützung – inklusive 3D-Konfigurator zur Teileauswahl.",
    },
    ctaLabel: "Beratung anfragen",
  },
  about: {
    heroEyebrow: "WiMa · SAS · Europa",
    heroTitle: "WiMa & SAS – Ihr Partner für G-Force® und Easy Arm®",
    heroSubtitle:
      "Industrie-Automation und Service aus Wetter und Hohndorf: Technik, Ersatzteile und persönliche Betreuung für Ihre Hebeanlagen.",
  },
  contact: {
    heroEyebrow: "Service-Anfrage",
    heroTitle: "Kontakt aufnehmen – wir helfen weiter",
    heroSubtitle:
      "Ersatzteil, Störung oder Beratung zu G-Force® und Easy Arm®? Schreiben Sie uns – am besten mit Typenschild-Foto.",
    title: "Nachricht senden",
    intro: "Kurz Ihr Anliegen schildern – Formular öffnet Ihre E-Mail-App.",
    formName: "Name",
    formCompany: "Unternehmen",
    formEmail: "E-Mail",
    formPhone: "Telefon",
    formMessage: "Anliegen",
    formSubmit: "Senden",
    formHint: "Öffnet Ihre E-Mail-App mit vorausgefüllter Nachricht.",
    formSuccess: "E-Mail-App sollte geöffnet sein.",
  },
  configuratorPage: {
    title: "G-Force Konfigurator",
    titleWord: "Konfigurator",
    message: "Werkstatt",
    badge: "3D · G-Force®",
    hint: "Parts Library · Geräteansicht · Partlist",
    backLabel: "Zur Startseite",
    libraryTitle: "Parts Library",
    allCategories: "Alle",
    searchPlaceholder: "Suche Teilenummer, Name…",
    detailTitle: "Detail",
    partNumber: "Teilenummer",
    categoryLabel: "Kategorie",
    stageLabel: "Arbeitsbereich",
    selectHint: "Wählen Sie ein Gerät aus der Parts Library.",
    addToTray: "Zur Partlist hinzufügen",
    removeFromTray: "Entfernen",
    trayLabel: "Partlist",
    clearTray: "Leeren",
    requestLabel: "Anfrage senden",
    emptyLibrary: "Keine Geräte gefunden.",
    noImage: "Bild folgt",
    partlistTitle: "Partlist",
    emptyPartlist: "Keine Teile – Gerät wählen.",
    deletePart: "Teil entfernen",
    selectedPart: "Ausgewählt",
    viewImage: "Bild",
    hintRotate: "Drehen",
    hintZoom: "Zoom",
    hintDrag: "Teil ziehen",
    resetView: "Reset",
    hintSelect: "Im 3D-Modell anklicken und mit den Pfeilen verschieben.",
    lengthLabel: "Länge",
  },
  footer: {
    tagline:
      "Service, Wartung und Ersatzteile für Gorbel G-Force® & Easy Arm® in Europa · SAS × WiMa",
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
    lastUpdated: "Stand: August 2026",
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
    title: "Gorbel G-Force® service & spare parts Europe | SAS × WiMa",
    description:
      "Downtime on your Gorbel G-Force®? Service, maintenance and Germany’s largest spare-parts stock for G-Force® and Easy Arm® – SAS × WiMa.",
  },
  nav: {
    home: "Home",
    about: "About us",
    contact: "Contact",
    cta: "Request",
    gforce: "G-Force®",
    service: "Service",
    parts: "Spare parts",
  },
  home: {
    sloganPrimary: "Downtime on your Gorbel G-Force®? We have the solution!",
    sloganSecondary:
      "Your partner for service, maintenance and spare parts in Europe",
    eyebrow: "G-Force® · Easy Arm® · Europe",
    heroTitle: "Intelligent lifting – service and parts when it matters",
    heroSubtitle:
      "Qualified service and fast spare parts for Gorbel G-Force® and Easy Arm® – when European plants can no longer get timely support.",
    whoTitle: "WiMa & SAS – your service partner",
    whoBody:
      "WiMa Industrie-Automation and SAS Sauer-Automation Sachsen support Gorbel G-Force® and Easy Arm® in the field: diagnostics, repair, spare parts and expertise from the acquired e-motion portfolio – plus our own lifting devices with innovative electronics.",
    offerTitle: "The problem – and our answer",
    problemLabel: "Problem",
    solutionLabel: "Solution",
    offerParts:
      "Many European production sites currently struggle to obtain timely spare parts or qualified service for their Gorbel G-Force® lifting units.",
    offerService:
      "We closed this gap: by taking over the full activities of e-motion Handlingsysteme GmbH and integrating their core expertise, we deliver service and parts from one partner.",
    configuratorLabel: "3D Configurator",
    configuratorHint: "Open",
    contactCta: "Contact us",
    serviceBandTitle: "Good service … part of the product",
    serviceCtaTitle: "Fast spare-part quote",
    serviceCtaBody:
      "Send us a photo of your type plate – we identify the part and respond with a concrete offer.",
    serviceCtaButton: "Send photo / contact",
  },
  offerings: {
    title: "What we offer",
    intro:
      "G-Force® & Easy Arm®, qualified service and spare-parts stock – clear and practical.",
    journeyNote:
      "Most customers first come for spare parts – then discover our service and own lifting systems.",
    lifts: {
      title: "G-Force® & Easy Arm®",
      body: "Intelligent rope balancers and Easy Arm® systems: precision, speed and programmability for demanding lift applications – with support when former European manufacturer support is gone.",
    },
    service: {
      title: "Service",
      body: "Maintenance, diagnostics and repair for intelligent lifting systems. Experienced WiMa and SAS technicians – workshop and on site.",
    },
    parts: {
      title: "Spare parts",
      body: "Large German spare-parts stock for Gorbel G-Force® and Easy Arm®. Identification, supply and support – including a 3D configurator for part selection.",
    },
    ctaLabel: "Request advice",
  },
  about: {
    heroEyebrow: "WiMa · SAS · Europe",
    heroTitle: "WiMa & SAS – your partner for G-Force® and Easy Arm®",
    heroSubtitle:
      "Industrial automation and service from Wetter and Hohndorf: technology, spare parts and hands-on support for your lifting systems.",
  },
  contact: {
    heroEyebrow: "Service request",
    heroTitle: "Get in touch – we are here to help",
    heroSubtitle:
      "Spare part, fault or advice on G-Force® and Easy Arm®? Write to us – ideally with a type-plate photo.",
    title: "Send a message",
    intro: "Briefly describe your request – the form opens your email app.",
    formName: "Name",
    formCompany: "Company",
    formEmail: "Email",
    formPhone: "Phone",
    formMessage: "Message",
    formSubmit: "Send",
    formHint: "Opens your email app with a pre-filled message.",
    formSuccess: "Your email app should have opened.",
  },
  configuratorPage: {
    title: "G-Force Configurator",
    titleWord: "Configurator",
    message: "Workshop",
    badge: "3D · G-Force®",
    hint: "Parts Library · Unit view · Partlist",
    backLabel: "Back to home",
    libraryTitle: "Parts Library",
    allCategories: "All",
    searchPlaceholder: "Search part number, name…",
    detailTitle: "Detail",
    partNumber: "Part number",
    categoryLabel: "Category",
    stageLabel: "Workspace",
    selectHint: "Select a unit from the Parts Library.",
    addToTray: "Add to partlist",
    removeFromTray: "Remove",
    trayLabel: "Partlist",
    clearTray: "Clear",
    requestLabel: "Send request",
    emptyLibrary: "No units found.",
    noImage: "Image soon",
    partlistTitle: "Partlist",
    emptyPartlist: "No parts – select a unit.",
    deletePart: "Remove part",
    selectedPart: "Selected",
    viewImage: "Image",
    hintRotate: "Rotate",
    hintZoom: "Zoom",
    hintDrag: "Drag part",
    resetView: "Reset",
    hintSelect: "Click the part in 3D and drag with the handles.",
    lengthLabel: "Length",
  },
  footer: {
    tagline:
      "Service, maintenance and spare parts for Gorbel G-Force® & Easy Arm® in Europe · SAS × WiMa",
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
    lastUpdated: "Last updated: August 2026",
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
    title: "Gorbel G-Force® 服务与备件 · 欧洲 | SAS × WiMa",
    description:
      "Gorbel G-Force® 停机？G-Force® 与 Easy Arm® 的服务、维护与德国大型备件库——SAS × WiMa。",
  },
  nav: {
    home: "首页",
    about: "关于我们",
    contact: "联系",
    cta: "询价",
    gforce: "G-Force®",
    service: "服务",
    parts: "备件",
  },
  home: {
    sloganPrimary: "Gorbel G-Force® 停机？我们有解决方案！",
    sloganSecondary: "欧洲服务、维护与备件的合作伙伴",
    eyebrow: "G-Force® · Easy Arm® · 欧洲",
    heroTitle: "智能起重——关键时刻的服务与备件",
    heroSubtitle:
      "Gorbel G-Force® 与 Easy Arm® 的专业服务与快速备件——当欧洲工厂无法再及时获得支持时。",
    whoTitle: "WiMa 与 SAS——您的服务伙伴",
    whoBody:
      "WiMa Industrie-Automation 与 SAS Sauer-Automation Sachsen 在现场支持 Gorbel G-Force® 与 Easy Arm®：诊断、维修、备件以及来自 e-motion 整合的专长——并提供配备创新电子技术的自有提升设备。",
    offerTitle: "问题——以及我们的方案",
    problemLabel: "问题",
    solutionLabel: "方案",
    offerParts:
      "许多欧洲生产现场目前难以为 Gorbel G-Force® 提升设备及时获得备件或合格服务。",
    offerService:
      "我们填补了这一空白：接管 e-motion Handlingsysteme GmbH 的全部业务并整合其核心专长，提供一站式服务与备件。",
    configuratorLabel: "3D 配置器",
    configuratorHint: "打开",
    contactCta: "立即咨询",
    serviceBandTitle: "优质服务……产品的一部分",
    serviceCtaTitle: "快速备件报价",
    serviceCtaBody:
      "请发送铭牌照片——我们识别零件并给出具体报价。",
    serviceCtaButton: "发送照片 / 联系",
  },
  offerings: {
    title: "我们提供什么",
    intro: "G-Force® 与 Easy Arm®、专业服务与备件库——清晰务实。",
    journeyNote:
      "多数客户先因备件而来——随后发现我们的服务与自有提升设备。",
    lifts: {
      title: "G-Force® 与 Easy Arm®",
      body: "智能平衡器与 Easy Arm® 系统：为苛刻起重应用提供精度、速度与可编程性——在原欧洲原厂支持缺失时仍有支持。",
    },
    service: {
      title: "服务",
      body: "智能提升系统的维护、诊断与维修。WiMa 与 SAS 经验丰富的技术员——车间与现场。",
    },
    parts: {
      title: "备件",
      body: "德国大型 Gorbel G-Force® 与 Easy Arm® 备件库存。识别、供应与支持——含 3D 配置器辅助选件。",
    },
    ctaLabel: "咨询方案",
  },
  about: {
    heroEyebrow: "WiMa · SAS · 欧洲",
    heroTitle: "WiMa 与 SAS——G-Force® 与 Easy Arm® 的服务伙伴",
    heroSubtitle:
      "来自 Wetter 与 Hohndorf 的工业自动化与服务：技术、备件与现场支持，保障您的提升设备。",
  },
  contact: {
    heroEyebrow: "服务咨询",
    heroTitle: "联系我们——我们随时协助",
    heroSubtitle:
      "G-Force® / Easy Arm® 备件、故障或咨询？留言给我们——最好附上铭牌照片。",
    title: "发送消息",
    intro: "简要说明需求——表单将打开邮件应用。",
    formName: "姓名",
    formCompany: "公司",
    formEmail: "邮箱",
    formPhone: "电话",
    formMessage: "留言",
    formSubmit: "发送",
    formHint: "将打开邮件应用并预填内容。",
    formSuccess: "应已打开邮件应用。",
  },
  configuratorPage: {
    title: "G-Force 配置器",
    titleWord: "配置器",
    message: "车间",
    badge: "3D · G-Force®",
    hint: "零件库 · 设备视图 · 零件列表",
    backLabel: "返回首页",
    libraryTitle: "零件库",
    allCategories: "全部",
    searchPlaceholder: "搜索零件号、名称…",
    detailTitle: "详情",
    partNumber: "零件号",
    categoryLabel: "类别",
    stageLabel: "工作区",
    selectHint: "请从零件库选择设备。",
    addToTray: "加入零件列表",
    removeFromTray: "移除",
    trayLabel: "零件列表",
    clearTray: "清空",
    requestLabel: "发送申请",
    emptyLibrary: "未找到设备。",
    noImage: "图片待补充",
    partlistTitle: "零件列表",
    emptyPartlist: "无零件——请选择设备。",
    deletePart: "删除零件",
    selectedPart: "已选",
    viewImage: "图片",
    hintRotate: "旋转",
    hintZoom: "缩放",
    hintDrag: "拖动零件",
    resetView: "重置",
    hintSelect: "在 3D 中点击零件并用手柄拖动。",
    lengthLabel: "长度",
  },
  footer: {
    tagline:
      "欧洲 Gorbel G-Force® 与 Easy Arm® 的服务、维护与备件 · SAS × WiMa",
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
    lastUpdated: "更新日期：2026 年 8 月",
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
  version: 30,
  images: {
    hero: "/images/site/hero.webp",
    side: "/images/site/about.webp",
    contact: "/images/site/contact.webp",
    service: "/images/site/service.webp",
    parts: "/images/site/parts.webp",
    lifts: "/images/site/gforce.webp",
    configurator: "/images/site/konfigurator.webp",
  },
  companies: {
    wima: wimaBase,
    sas: sasBase,
  },
  siteOperator: "wima",
  locales: { de, en, zh },
};
