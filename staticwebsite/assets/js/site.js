/* ==========================================================================
   WiMa Industrie-Automation – Website-Skript
   --------------------------------------------------------------------------
   Bewusst klein gehalten. Kein Framework, keine externen Abhängigkeiten.
   Die Seite funktioniert auch ohne JavaScript – nur diese vier Komfort-
   Funktionen fehlen dann:

     1. Mobiles Menü auf-/zuklappen
     2. Sprachumschalter auf-/zuklappen
     3. Cookie-Hinweis (Einwilligung im localStorage merken)
     4. Kontaktformular als vorausgefüllte E-Mail öffnen

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
     2. Sprachumschalter
     Button .lang-switch-btn öffnet/schließt .lang-switch (Klasse is-open).
     Klick außerhalb und Escape schließen. Funktioniert auf Desktop/Laptop.
     ---------------------------------------------------------------------- */
  function initLangSwitch() {
    var root = document.querySelector(".lang-switch");
    if (!root) return;

    var btn = root.querySelector(".lang-switch-btn");
    if (!btn) return;

    function isOpen() {
      return root.classList.contains("is-open");
    }

    function open() {
      root.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }

    function close() {
      if (!isOpen()) return;
      root.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }

    function toggle() {
      if (isOpen()) close();
      else open();
    }

    btn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      toggle();
    });

    // Klick / Zeiger außerhalb schließt (pointerdown + click für alle Desktop-Browser)
    function onOutside(event) {
      if (!root.contains(event.target)) close();
    }
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("click", onOutside);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" || event.key === "Esc") {
        if (!isOpen()) return;
        close();
        btn.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. Cookie-Hinweis
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
     4. Kontaktformular -> E-Mail-App
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
