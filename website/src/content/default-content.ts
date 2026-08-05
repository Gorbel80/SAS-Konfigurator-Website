import type { CompanyInfo, LocaleContent, SiteContent } from "./types";

const wimaBase: CompanyInfo = {
  name: "WiMa Industrie-Automation",
  legalName: "Wima Industrie Automation GmbH",
  street: "Schöllinger Feld 46",
  postal: "D-58300",
  city: "Wetter/R",
  country: "Deutschland",
  phone: "+49 (0)2335 8499-155",
  fax: "037204-50 55 03",
  email: "info@wima-automation.de",
  mapUrl: "https://maps.google.com/?q=Sch%C3%B6llinger+Feld+46+58300+Wetter",
  managingDirector: "Klaus Marchewka",
  registerCourt: "Amtsgericht Hagen",
  registerNumber: "HRB 11782",
  vatId: "DE 815 381 799",
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
      "Ihr exklusiver Partner für Service, Wartung und Ersatzteile in Europa!",
    eyebrow: "G-Force® · Easy Arm® · Europa",
    heroTitle: "Stillstand bei Ihrem Gorbel G-Force®? Wir haben die Lösung!",
    heroSubtitle:
      "Ihr exklusiver Partner für Service, Wartung und Ersatzteile in Europa!",
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
  gforcePage: {
    heroEyebrow: "Gorbel® · G-Force® · Easy Arm®",
    heroTitle: "G-Force® & Easy Arm®",
    heroSubtitle:
      "Intelligente Hebevorrichtungen mit patentierter Servotechnik – Präzision, Geschwindigkeit und Sicherheit.",
    intro:
      "Wenn Geschwindigkeit, Präzision und Programmierbarkeit entscheidend sind, sind Gorbel® G-Force® und Easy Arm® die richtige Wahl.",
    balancers: {
      title: "G-Force® Balancers",
      body: "Servo-gesteuerte Seilbalancer für ergonomisches, präzises Heben – ideal an Brückenkranen und in der Fertigungslinie.",
    },
    controls: {
      title: "G-Force® Bedienung",
      body: "Ergonomische Handgriffe und Bedienelemente für intuitive Führung – der Mensch steuert, die Technik liefert Kraft und Präzision.",
    },
    easyArm: {
      title: "Easy Arm®",
      body: "Dieselbe intelligente Hebetechnologie in einem Gelenkausleger – flexibel positionierbar für Montage und Materialhandling.",
    },
    body: "Benötigt Ihre Hebeanwendung etwas mehr als herkömmliche Hebegeräte bieten können? Wenn Geschwindigkeit, Präzision und Programmierbarkeit wichtig sind, wählen Sie Gorbel® G-Force® und Easy Arm®. Die intelligenten Hebevorrichtungen von Gorbel, G-Force® und Easy Arm® verwenden eine exklusive, patentierte Technik und ein von einem Industrieprozessor gesteuertes Servo-Antriebssystem, um eine einmalige Präzision und Geschwindigkeit zu erzielen. Durch die Fusion modernster Technik mit der Führung und Lenkung durch den Menschen wird nicht nur die Produktivität maximiert, sondern auch die Verletzungsgefahr für den Bediener minimiert. Wählen Sie eine G-Force®-Einheit zur Montage an einem Brückenkran oder mit unserem Easy Arm®, der die gleiche Hebetechnologie in ein Gelenkauslegerdesign integriert. Beide Konfigurationen sind in zwei Modellen verfügbar, sodass Sie die für Ihre Anwendungen sinnvollen Funktionen und Anpassungen auswählen können.",
    specsTitle: "Easy Arm® – technische Daten (Auszug)",
    specsHeaders: [
      "Parameter",
      "165 lb / 75 kg",
      "330 lb / 150 kg",
      "660 lb / 300 kg",
    ],
    specs: [
      {
        label: "Max. Kapazität (Last & Tool)",
        values: ["165 lb / 75 kg", "330 lb / 150 kg", "660 lb / 300 kg"],
      },
      {
        label: "Max. Hubgeschwindigkeit unbelastet",
        values: ["175 fpm / 53 mpm", "80 fpm / 24 mpm", "40 fpm / 12 mpm"],
      },
      {
        label: "Max. Hubgeschwindigkeit voll beladen",
        values: ["125 fpm / 38 mpm", "50 fpm / 15 mpm", "30 fpm / 9 mpm"],
      },
      {
        label: "Max. Float-Mode Hubgeschwindigkeit",
        values: ["90 fpm / 27 mpm", "40 fpm / 12 mpm", "36 fpm / 11 mpm"],
      },
      {
        label: "Max. Hubweg",
        values: ["11 ft / 3,4 m", "11 ft / 3,4 m", "11 ft / 3,4 m"],
      },
      {
        label: "Max. Auslegerreichweite",
        values: ["14 ft / 4,3 m", "14 ft / 4,3 m", "14 ft / 4,3 m"],
      },
    ],
    ctaLabel: "Anfrage senden",
  },
  servicePage: {
    heroEyebrow: "Service · Wartung · Reparatur",
    heroTitle: "Service für Gorbel G-Force® & Easy Arm®",
    heroSubtitle:
      "Stillstand vermeiden – mit erfahrenen Technikern, schneller Diagnose und europäischem Ersatzteil-Support.",
    headline: "Guter Service … ein Stück vom Produkt",
    intro:
      "Service ist bei uns kein Nachgedanke. WiMa und SAS begleiten Ihre G-Force®- und Easy Arm®-Systeme mit Wartung, Fehlerdiagnose und Reparatur – in der Werkstatt und vor Ort.",
    highlights: [
      {
        title: "Wartung & Diagnose",
        body: "Planmäßige Wartung und systematische Fehlersuche, damit Ihre Anlagen zuverlässig laufen und Ausfallzeiten kurz bleiben.",
      },
      {
        title: "Elektronik & Antrieb",
        body: "Kompetenz an Mainboards, Sensorik und Servotechnik – vom Typenschild bis zur Baugruppe.",
      },
      {
        title: "Europa-Support",
        body: "Ihr Partner, wenn früherer Europa-Support fehlt: Teile, Know-how und persönliche Betreuung aus einer Hand.",
      },
    ],
    ctaTitle: "Schnelles Ersatzteil-Angebot",
    ctaBody:
      "Senden Sie uns ein Foto Ihres Typenschilds – per Kontaktformular oder Nachricht – und erhalten Sie ein zügiges Ersatzteil-Angebot.",
    ctaLabel: "Typenschild senden",
    contactCta: "Service anfragen",
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
      "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz). Anbieter dieser Website ist die Wima Industrie Automation GmbH.",
    sectionCompany: "Anbieter",
    sectionContact: "Kontakt",
    sectionRegister: "Registereintrag",
    sectionVat: "Umsatzsteuer-ID",
    sectionResponsible: "Verantwortlich für den Inhalt",
    sectionDispute: "Streitschlichtung",
    disputeBody:
      "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    sectionLiabilityContent: "Haftung für Inhalte",
    liabilityContentBody:
      "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
    sectionLiabilityLinks: "Haftung für Links",
    liabilityLinksBody:
      "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
    sectionCopyright: "Urheberrecht",
    copyrightBody:
      "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
    managingDirectorLabel: "Geschäftsführung",
    registerLabel: "Handelsregister",
    vatLabel: "USt-IdNr.",
    responsibleLabel: "Inhaltlich Verantwortlicher gemäß § 18 Abs. 2 MStV",
    phoneLabel: "Telefon",
    faxLabel: "Telefax",
    emailLabel: "E-Mail",
  },
  privacy: {
    title: "Datenschutzerklärung",
    intro:
      "Wir informieren Sie über die Verarbeitung personenbezogener Daten beim Besuch dieser Website (DSGVO / BDSG). Angaben sind auf den aktuellen Stand dieser Website abgestimmt.",
    lastUpdated: "Stand: August 2026",
    sections: [
      {
        heading: "1. Verantwortliche Stelle",
        body: "Verantwortlich für die Datenverarbeitung im Zusammenhang mit dieser Website ist die Wima Industrie Automation GmbH (siehe Impressum). Kontaktmöglichkeiten entnehmen Sie dem Impressum.",
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
      "Your exclusive partner for service, maintenance and spare parts in Europe!",
    eyebrow: "G-Force® · Easy Arm® · Europe",
    heroTitle: "Downtime on your Gorbel G-Force®? We have the solution!",
    heroSubtitle:
      "Your exclusive partner for service, maintenance and spare parts in Europe!",
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
      body: "Large German spare-parts stock for Gorbel G-Force® and Easy Arm®. Identification, supply and support – including support for part identification and selection.",
    },
    ctaLabel: "Request advice",
  },
  gforcePage: {
    heroEyebrow: "Gorbel® · G-Force® · Easy Arm®",
    heroTitle: "G-Force® & Easy Arm®",
    heroSubtitle:
      "Intelligent lifting devices with patented servo technology – precision, speed and safety.",
    intro:
      "When speed, precision and programmability matter, choose Gorbel® G-Force® and Easy Arm®.",
    balancers: {
      title: "G-Force® balancers",
      body: "Servo-controlled rope balancers for ergonomic, precise lifting – ideal on bridge cranes and production lines.",
    },
    controls: {
      title: "G-Force® controls",
      body: "Ergonomic handles and controls for intuitive guidance – people steer, technology delivers power and precision.",
    },
    easyArm: {
      title: "Easy Arm®",
      body: "The same intelligent lifting technology in an articulating-arm design – flexible positioning for assembly and material handling.",
    },
    body: "Does your lifting application need more than conventional devices can offer? When speed, precision and programmability are important, choose Gorbel® G-Force® and Easy Arm®. These intelligent lifting devices use exclusive patented technology and an industrial-processor-controlled servo drive system for unique precision and speed. Combining modern technology with human guidance maximises productivity and minimises operator injury risk. Choose a G-Force® unit for bridge-crane mounting or our Easy Arm®, which integrates the same lifting technology into an articulating-arm design. Both configurations are available in two models so you can select the functions that fit your applications.",
    specsTitle: "Easy Arm® – technical data (excerpt)",
    specsHeaders: [
      "Parameter",
      "165 lb / 75 kg",
      "330 lb / 150 kg",
      "660 lb / 300 kg",
    ],
    specs: [
      {
        label: "Max capacity (load & tool)",
        values: ["165 lb / 75 kg", "330 lb / 150 kg", "660 lb / 300 kg"],
      },
      {
        label: "Max lifting speed unloaded",
        values: ["175 fpm / 53 mpm", "80 fpm / 24 mpm", "40 fpm / 12 mpm"],
      },
      {
        label: "Max lifting speed fully loaded",
        values: ["125 fpm / 38 mpm", "50 fpm / 15 mpm", "30 fpm / 9 mpm"],
      },
      {
        label: "Max float-mode lifting speed",
        values: ["90 fpm / 27 mpm", "40 fpm / 12 mpm", "36 fpm / 11 mpm"],
      },
      {
        label: "Max lift range",
        values: ["11 ft / 3.4 m", "11 ft / 3.4 m", "11 ft / 3.4 m"],
      },
      {
        label: "Max arm span",
        values: ["14 ft / 4.3 m", "14 ft / 4.3 m", "14 ft / 4.3 m"],
      },
    ],
    ctaLabel: "Send enquiry",
  },
  servicePage: {
    heroEyebrow: "Service · maintenance · repair",
    heroTitle: "Service for Gorbel G-Force® & Easy Arm®",
    heroSubtitle:
      "Avoid downtime – with experienced technicians, fast diagnostics and European spare-parts support.",
    headline: "Good service … part of the product",
    intro:
      "Service is not an afterthought. WiMa and SAS support your G-Force® and Easy Arm® systems with maintenance, fault diagnosis and repair – in the workshop and on site.",
    highlights: [
      {
        title: "Maintenance & diagnostics",
        body: "Scheduled maintenance and systematic troubleshooting so your systems run reliably and downtime stays short.",
      },
      {
        title: "Electronics & drives",
        body: "Expertise on mainboards, sensors and servo technology – from the nameplate to the assembly.",
      },
      {
        title: "European support",
        body: "Your partner when former European manufacturer support is gone: parts, know-how and personal care from one source.",
      },
    ],
    ctaTitle: "Fast spare-part quote",
    ctaBody:
      "Send us a photo of your nameplate via the contact form or message – and receive a prompt spare-part offer.",
    ctaLabel: "Send nameplate photo",
    contactCta: "Request service",
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
      "Information pursuant to Section 5 of the German Digital Services Act (DDG). The provider of this website is Wima Industrie Automation GmbH.",
    sectionCompany: "Provider",
    sectionContact: "Contact",
    sectionRegister: "Commercial register",
    sectionVat: "VAT ID",
    sectionResponsible: "Responsible for content",
    sectionDispute: "Dispute resolution",
    disputeBody:
      "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
    sectionLiabilityContent: "Liability for content",
    liabilityContentBody:
      "As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to Section 7 (1) TMG. According to Sections 8 to 10 TMG, however, we as a service provider are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general laws remain unaffected. Liability in this respect is only possible from the time of knowledge of a specific infringement. Upon becoming aware of corresponding infringements, we will remove this content immediately.",
    sectionLiabilityLinks: "Liability for links",
    liabilityLinksBody:
      "Our offer contains links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any liability for this third-party content. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. Permanent monitoring of the content of the linked pages is not reasonable without concrete evidence of a violation. Upon becoming aware of legal violations, we will remove such links immediately.",
    sectionCopyright: "Copyright",
    copyrightBody:
      "The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is marked as such. If you nevertheless become aware of a copyright infringement, please inform us. Upon becoming aware of legal violations, we will remove such content immediately.",
    managingDirectorLabel: "Managing director",
    registerLabel: "Commercial register",
    vatLabel: "VAT ID",
    responsibleLabel: "Responsible for content pursuant to Section 18 (2) MStV",
    phoneLabel: "Phone",
    faxLabel: "Fax",
    emailLabel: "Email",
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
    sloganSecondary: "您在欧洲的专属服务、维护与备件合作伙伴！",
    eyebrow: "G-Force® · Easy Arm® · 欧洲",
    heroTitle: "Gorbel G-Force® 停机？我们有解决方案！",
    heroSubtitle: "您在欧洲的专属服务、维护与备件合作伙伴！",
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
  gforcePage: {
    heroEyebrow: "Gorbel® · G-Force® · Easy Arm®",
    heroTitle: "G-Force® 与 Easy Arm®",
    heroSubtitle: "采用专利伺服技术的智能提升设备——更高精度、速度与安全性。",
    intro: "当速度、精度与可编程性至关重要时，请选择 Gorbel® G-Force® 与 Easy Arm®。",
    balancers: {
      title: "G-Force® 平衡器",
      body: "伺服控制钢丝绳平衡器，实现符合人体工学的精准提升——适用于桥式起重机与产线。",
    },
    controls: {
      title: "G-Force® 操作",
      body: "符合人体工学的手柄与操控，引导直观——人主导，技术提供力量与精度。",
    },
    easyArm: {
      title: "Easy Arm®",
      body: "同样的智能提升技术集成于关节臂设计——装配与物料搬运定位更灵活。",
    },
    body: "您的提升应用是否需要超越传统设备的能力？当速度、精度与可编程性重要时，请选择 Gorbel® G-Force® 与 Easy Arm®。这些智能提升装置采用独家专利技术与工业处理器控制的伺服驱动系统，实现独特精度与速度。现代技术与人工引导相结合，最大化生产力并降低操作者受伤风险。可选择安装于桥式起重机的 G-Force® 单元，或将相同技术集成于关节臂的 Easy Arm®。两种配置均有两个型号，便于按应用选择功能。",
    specsTitle: "Easy Arm® – 技术参数（节选）",
    specsHeaders: [
      "参数",
      "165 lb / 75 kg",
      "330 lb / 150 kg",
      "660 lb / 300 kg",
    ],
    specs: [
      {
        label: "最大容量（负载与工具）",
        values: ["165 lb / 75 kg", "330 lb / 150 kg", "660 lb / 300 kg"],
      },
      {
        label: "最大空载提升速度",
        values: ["175 fpm / 53 mpm", "80 fpm / 24 mpm", "40 fpm / 12 mpm"],
      },
      {
        label: "最大满载提升速度",
        values: ["125 fpm / 38 mpm", "50 fpm / 15 mpm", "30 fpm / 9 mpm"],
      },
      {
        label: "最大浮动模式提升速度",
        values: ["90 fpm / 27 mpm", "40 fpm / 12 mpm", "36 fpm / 11 mpm"],
      },
      {
        label: "最大提升行程",
        values: ["11 ft / 3.4 m", "11 ft / 3.4 m", "11 ft / 3.4 m"],
      },
      {
        label: "最大臂展",
        values: ["14 ft / 4.3 m", "14 ft / 4.3 m", "14 ft / 4.3 m"],
      },
    ],
    ctaLabel: "发送询价",
  },
  servicePage: {
    heroEyebrow: "服务 · 维护 · 维修",
    heroTitle: "Gorbel G-Force® 与 Easy Arm® 服务",
    heroSubtitle: "避免停机——经验丰富的技术员、快速诊断与欧洲备件支持。",
    headline: "优质服务……产品的一部分",
    intro:
      "服务不是事后补救。WiMa 与 SAS 以维护、故障诊断与维修支持您的 G-Force® 与 Easy Arm® 系统——车间与现场均可。",
    highlights: [
      {
        title: "维护与诊断",
        body: "计划性维护与系统化排障，让设备可靠运行、停机时间更短。",
      },
      {
        title: "电子与驱动",
        body: "主板、传感器与伺服技术专长——从铭牌到总成。",
      },
      {
        title: "欧洲支持",
        body: "当原欧洲原厂支持缺失时的合作伙伴：备件、专长与一站式对接。",
      },
    ],
    ctaTitle: "快速备件报价",
    ctaBody: "通过联系表单或消息发送铭牌照片——即可获得迅速的备件报价。",
    ctaLabel: "发送铭牌照片",
    contactCta: "预约服务",
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
      "依据德国《数字服务法》(DDG) 第 5 条的提供商信息。本网站提供方为 Wima Industrie Automation GmbH。",
    sectionCompany: "提供方",
    sectionContact: "联系方式",
    sectionRegister: "商业登记",
    sectionVat: "增值税号",
    sectionResponsible: "内容责任人",
    sectionDispute: "争议解决",
    disputeBody:
      "我们既无意愿也无义务参加消费者仲裁机构的争议解决程序。",
    sectionLiabilityContent: "内容责任",
    liabilityContentBody:
      "作为服务提供商，我们依据德国《电信媒体法》(TMG) 第 7 条第 1 款对自身页面内容依法承担责任。根据 TMG 第 8 至 10 条，我们没有义务监控传输或存储的第三方信息，也没有义务主动调查可能的违法活动。依法删除或屏蔽信息的义务不受影响。仅在知悉具体侵权行为后才可能产生相关责任。一旦知悉相关侵权行为，我们将立即删除相关内容。",
    sectionLiabilityLinks: "链接责任",
    liabilityLinksBody:
      "本网站可能包含指向外部第三方网站的链接，我们无法控制其内容，因此不对这些外部内容承担责任。链接页面的内容始终由相应提供方或运营方负责。链接时已检查是否存在明显违法行为；链接时未发现违法内容。在没有具体违法迹象的情况下，对链接页面进行持续内容审查是不合理的。一旦知悉违法行为，我们将立即删除相关链接。",
    sectionCopyright: "版权",
    copyrightBody:
      "本站运营方制作的内容与作品受德国著作权法保护。超出著作权法范围的复制、编辑、传播及任何形式的利用，均需获得相应作者或制作人的书面同意。本站内容的下载与复制仅允许用于私人、非商业用途。非运营方制作的内容将尊重第三方著作权，并尽可能标明来源。如您发现版权侵权，请通知我们；一旦知悉侵权行为，我们将立即删除相关内容。",
    managingDirectorLabel: "总经理",
    registerLabel: "商业登记",
    vatLabel: "增值税识别号",
    responsibleLabel: "内容责任人（依据 MStV 第 18 条第 2 款）",
    phoneLabel: "电话",
    faxLabel: "传真",
    emailLabel: "电子邮件",
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
  version: 33,
  images: {
    hero:
      "https://raw.githubusercontent.com/Gorbel80/SAS-Konfigurator-Website/main/public/images/site/hero-sm.webp",
    side:
      "https://raw.githubusercontent.com/Gorbel80/SAS-Konfigurator-Website/main/public/images/site/about-sm.webp",
    contact:
      "https://raw.githubusercontent.com/Gorbel80/SAS-Konfigurator-Website/main/public/images/site/contact-sm.webp",
    service:
      "https://raw.githubusercontent.com/Gorbel80/SAS-Konfigurator-Website/main/public/images/site/service-sm.webp",
    parts:
      "https://raw.githubusercontent.com/Gorbel80/SAS-Konfigurator-Website/main/public/images/site/parts-sm.webp",
    lifts:
      "https://raw.githubusercontent.com/Gorbel80/SAS-Konfigurator-Website/main/public/images/site/gforce-sm.webp",
  },
  companies: {
    wima: wimaBase,
    sas: sasBase,
  },
  siteOperator: "wima",
  locales: { de, en, zh },
};
