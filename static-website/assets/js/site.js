/* ==========================================================================
   WiMa Industrie-Automation – Website-Skript
   --------------------------------------------------------------------------
   Bewusst klein gehalten. Kein Framework, keine externen Abhängigkeiten.
   Die Seite funktioniert auch ohne JavaScript – nur diese Komfort-
   Funktionen fehlen dann:

     1.  Mobiles Menü auf-/zuklappen
     1b. Sprachumschalter aufklappen
     2.  Cookie-Hinweis (Einwilligung im localStorage merken)
     3.  Kontaktformular als vorausgefüllte E-Mail öffnen

   Texte stehen NICHT hier, sondern im HTML (data-Attribute bzw. Markup),
   damit Übersetzungen an einer Stelle gepflegt werden.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. Mobiles Menü
     Der Button <button class="nav-toggle"> steuert <nav class="site-nav">.
     ---------------------------------------------------------------------- */
  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Beim Wechsel auf Desktop-Breite den mobilen Zustand zurücksetzen,
    // sonst bleibt das Menü nach dem Drehen des Geräts hängen.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ------------------------------------------------------------------------
     1b. Sprachumschalter (Pill-Menü)
     Der Button <button class="lang-current"> klappt <ul class="lang-menu">
     auf. Ohne JavaScript bleibt das Menü zu – die Sprachen sind dann über
     die Links im Seitenkopf der jeweiligen Sprachfassung erreichbar.
     ---------------------------------------------------------------------- */
  function initLangSwitch() {
    var button = document.querySelector(".lang-current");
    var menu = document.querySelector(".lang-menu");
    if (!button || !menu) return;

    function close() {
      menu.hidden = true;
      button.setAttribute("aria-expanded", "false");
    }

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      var willOpen = menu.hidden;
      menu.hidden = !willOpen;
      button.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });

    // Klick daneben oder Escape schließt das Menü wieder
    document.addEventListener("click", function (event) {
      if (!menu.hidden && !menu.contains(event.target)) close();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !menu.hidden) {
        close();
        button.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. Cookie-Hinweis
     Diese Website setzt nur technisch notwendige Speicherungen. Gespeichert
     wird ausschließlich die Entscheidung selbst – kein Tracking.
     Schlüssel bleibt "sas_cookie_consent" (so steht es in der
     Datenschutzerklärung; beides zusammen ändern, falls nötig).
     ---------------------------------------------------------------------- */
  var CONSENT_KEY = "sas_cookie_consent";

  function readConsent() {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      // Private-Mode o. Ä.: Banner dann einfach nicht zeigen.
      return "unavailable";
    }
  }

  function storeConsent(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {
      /* Speichern nicht möglich – Banner trotzdem schließen. */
    }
  }

  function initCookieBanner() {
    var banner = document.querySelector(".cookie-banner");
    if (!banner) return;
    if (readConsent()) return; // Entscheidung liegt schon vor

    banner.classList.add("is-visible");

    banner.addEventListener("click", function (event) {
      var button = event.target.closest("[data-consent]");
      if (!button) return;
      storeConsent(button.getAttribute("data-consent")); // "all" oder "essential"
      banner.classList.remove("is-visible");
    });
  }

  /* ------------------------------------------------------------------------
     3. Kontaktformular -> E-Mail-App
     Es gibt auf All-Inkl bewusst kein serverseitiges Skript. Das Formular
     baut stattdessen einen mailto:-Link und öffnet das Mailprogramm.

     Empfängeradresse und Betreff kommen aus dem HTML:
       <form data-mail-to="..." data-mail-subject="...">
     ---------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.querySelector("[data-mail-to]");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var data = new FormData(form);
      var lines = [];

      // Beschriftungen aus dem <label> übernehmen, damit die E-Mail in der
      // jeweiligen Sprache ankommt, ohne dass hier Text hinterlegt ist.
      Array.prototype.forEach.call(form.elements, function (field) {
        if (!field.name || field.type === "submit") return;
        var label = form.querySelector('label[for="' + field.id + '"]');
        var caption = label ? label.textContent.trim() : field.name;
        lines.push(caption + ": " + (data.get(field.name) || "-"));
      });

      var to = form.getAttribute("data-mail-to");
      var subject = form.getAttribute("data-mail-subject") || "";
      var href =
        "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));

      window.location.href = href;

      // Bestätigung einblenden (Text steht im HTML).
      var success = form.querySelector("[data-mail-success]");
      if (success) success.hidden = false;
    });
  }

  /* ------------------------------------------------------------------------
     Start
     ---------------------------------------------------------------------- */
  function init() {
    initNavToggle();
    initLangSwitch();
    initCookieBanner();
    initContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
