/* ==========================================================================
   WiMa Industrie-Automation – Website-Skript
   --------------------------------------------------------------------------
   Bewusst klein gehalten. Kein Framework, keine externen Abhängigkeiten.
   Die Seite funktioniert auch ohne JavaScript – nur diese Komfort-
   Funktionen fehlen dann:

     1.  Mobiles Menü auf-/zuklappen
     1b. Sprachumschalter (Dropdown, Desktop + Mobile)
     2.  Cookie-Hinweis (Einwilligung im localStorage merken)
     3.  Kontaktformular ohne Neuladen absenden (sendmail.php)

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
     1b. Sprachumschalter (Dropdown)
     Gleich auf Desktop und Mobile:
       - Button .lang-current zeigt die aktuelle Sprache
       - Klick öffnet/schließt .lang-menu
       - Klick außerhalb oder Escape schließt
     Markup: <div class="lang-switch"> … </div>
     ---------------------------------------------------------------------- */
  function initLangSwitch() {
    var root = document.querySelector(".lang-switch");
    if (!root) return;

    var button = root.querySelector(".lang-current");
    var menu = root.querySelector(".lang-menu");
    if (!button || !menu) return;

    function isOpen() {
      return !menu.hidden;
    }

    function open() {
      menu.hidden = false;
      button.setAttribute("aria-expanded", "true");
      root.classList.add("is-open");
    }

    function close() {
      menu.hidden = true;
      button.setAttribute("aria-expanded", "false");
      root.classList.remove("is-open");
    }

    function toggle() {
      if (isOpen()) close();
      else open();
    }

    // Startzustand: zu
    close();

    button.addEventListener("click", function (event) {
      event.preventDefault();
      toggle();
    });

    // Klick außerhalb (auf dem gesamten .lang-switch basierend – zuverlässig
    // auf Laptop/Desktop, ohne stopPropagation-Tricks)
    document.addEventListener("click", function (event) {
      if (!isOpen()) return;
      if (!root.contains(event.target)) close();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
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
     3. Kontaktformular
     Das Formular wird per fetch an sendmail.php geschickt – kein mailto,
     kein Wechsel ins Mailprogramm. Die Seite bleibt stehen und zeigt
     darunter eine Erfolgs- oder Fehlermeldung.

     Alle Texte stehen im HTML (Meldungen als <p data-form-success> bzw.
     <p data-form-error>), damit sie je Sprache übersetzbar bleiben.

     Ohne JavaScript sendet das Formular ganz normal an sendmail.php; das
     Skript liefert dann eine schlichte Bestätigungsseite aus.
     ---------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    var button = form.querySelector('button[type="submit"]');
    var okBox = form.querySelector("[data-form-success]");
    var errorBox = form.querySelector("[data-form-error]");

    function zeige(box) {
      if (okBox) okBox.hidden = box !== okBox;
      if (errorBox) errorBox.hidden = box !== errorBox;
      if (box) box.scrollIntoView({ block: "nearest" });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Browserseitige Pflichtfeldprüfung zuerst – spart einen Serveraufruf.
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      zeige(null);
      if (button) {
        button.disabled = true;
      }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json", "X-Requested-With": "fetch" }
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          if (result && result.ok) {
            form.reset();
            zeige(okBox);
          } else {
            zeige(errorBox);
          }
        })
        .catch(function () {
          // Netzwerkfehler oder Server nicht erreichbar
          zeige(errorBox);
        })
        .then(function () {
          if (button) button.disabled = false;
        });
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
