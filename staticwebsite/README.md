# Statische Website – WiMa Industrie-Automation

Fertige Website zum Hochladen per FTP auf All-Inkl. **Kein Build-Schritt,
kein npm, kein Framework** – was hier liegt, wird 1:1 ausgeliefert.

Alle Seiten sind handgeschriebenes HTML und lassen sich direkt in einem
Texteditor ändern.

---

## Ordnerstruktur

```
static-website/
  index.html          Weiterleitung auf /de/ (Rückfallebene zur .htaccess)
  404.html            Fehlerseite, dreisprachig
  sendmail.php        Versand des Kontaktformulars (Empfänger steht oben drin)
  .htaccess           Apache-Regeln: Weiterleitungen, Cache, Sicherheit
  robots.txt          Freigabe für Suchmaschinen
  sitemap.xml         Liste aller Seiten für Suchmaschinen
  favicon.ico

  assets/
    css/site.css      Das gesamte Layout. Farben stehen ganz oben.
    js/site.js        Menü, Sprachumschalter, Cookie-Hinweis, Kontaktformular
    fonts/            Schrift DM Sans, lokal (kein Google-Fonts-Aufruf)
    flags/            Flaggen für den Sprachumschalter (DE/EN/ZH)

  de/  en/  zh/       Je Sprache dieselben neun Seiten:
    index.html            Startseite
    g-force/              G-Force® & Easy Arm®
    service/              Service
    anwendungen/          Anwendungen
    downloads/            Downloads
    ueber-uns/            Über uns
    contact/              Kontakt
    impressum/            Impressum
    datenschutz/          Datenschutzerklärung
    konfigurator/         3-D-Konfigurator  <-- Sonderfall, siehe unten

  images/
    site/             Fotos für Hero-Bereiche und Karten
    brand/            Logos (nur vom Konfigurator genutzt)
  models/profiles/    3-D-Modelle (.glb) für den Konfigurator
  _next/              Programmcode des Konfigurators  <-- nicht bearbeiten
```

---

## Häufige Änderungen

### Text ändern

Datei der betreffenden Seite öffnen, Text zwischen den Tags ändern, speichern,
per FTP hochladen. Beispiel: die Überschrift der deutschen Startseite steht in
`de/index.html` in der Zeile mit `<h1>`.

**Denken Sie an die anderen Sprachen** – dieselbe Stelle gibt es auch in
`en/` und `zh/`.

### Farbe ändern

`assets/css/site.css`, ganz oben im Abschnitt „1. DESIGN-TOKENS". Eine Farbe
dort ändern wirkt auf die gesamte Website.

### Foto austauschen

1. Neues Bild nach `images/site/` legen – am besten als `.webp`.
2. Wenn Sie den Dateinamen beibehalten, ist nichts weiter zu tun.
3. Bei neuem Dateinamen den Pfad im HTML anpassen:
   - Hero-Bilder stehen im `<section class="hero" style="--hero-image: url('…')">`
   - Karten-Bilder im jeweiligen `<img src="…">`

### Menüpunkt hinzufügen

In **jeder** Sprachdatei im Block `<nav class="site-nav">` einen `<li>`-Eintrag
ergänzen – und den neuen Ordner samt `index.html` anlegen. Danach die neue
Adresse in `sitemap.xml` nachtragen.

### Kontaktformular

Das Formular verschickt die Nachricht direkt über den Server – kein
E-Mail-Programm, kein `mailto`. Zuständig ist `sendmail.php` im
Wurzelverzeichnis.

**Empfängeradresse ändern:** in `sendmail.php` ganz oben:

```php
$EMPFAENGER = 'info@wima-automation.de';
$ABSENDER   = 'info@wima-automation.de';
```

`$ABSENDER` muss eine Adresse **Ihrer eigenen Domain** sein. Trägt man dort
die Adresse des Besuchers ein, stuft der empfangende Mailserver die
Nachricht als Fälschung ein (SPF/DMARC) und sie landet im Spam. Die Adresse
des Besuchers steht deshalb im `Reply-To` – ein Klick auf „Antworten"
schreibt trotzdem an den richtigen Empfänger.

**Ablauf:** `assets/js/site.js` schickt das Formular per `fetch` an
`sendmail.php` und blendet darunter eine Erfolgs- oder Fehlermeldung ein.
Die Seite lädt dabei nicht neu. Ist JavaScript abgeschaltet, sendet der
Browser ganz normal an dieselbe Adresse; `sendmail.php` liefert dann eine
schlichte Bestätigungsseite aus.

**Meldungstexte ändern:** stehen im HTML der jeweiligen Kontaktseite, nicht
im JavaScript – gesucht nach `data-form-success` bzw. `data-form-error`.

**Spamschutz:** Ein unsichtbares Feld (`<div class="form-trap">`) fängt
Bots ab, dazu kommt eine Sperre von 30 Sekunden je IP-Adresse. Das Feld
bitte nicht entfernen. Sollte trotzdem Spam durchkommen, lässt sich in
`sendmail.php` ergänzen, was nötig ist.

---

## Der 3-D-Konfigurator ist ein Sonderfall

Die Ordner `*/konfigurator/` und `_next/` stammen aus der früheren Next.js-
Anwendung und bestehen aus **maschinell erzeugtem Code**. Sie sind bewusst
unverändert übernommen worden, weil sich die 3-D-Ansicht nicht sinnvoll von
Hand nachbauen lässt.

- **Nicht** von Hand bearbeiten – die Dateien sind minifiziert.
- Änderungen am Konfigurator müssen in der Next.js-Anwendung erfolgen und neu
  exportiert werden.
- Alle übrigen Seiten sind davon unabhängig und ganz normal editierbar.

---

## Hochladen auf All-Inkl

Den **gesamten Inhalt** dieses Ordners in das Webverzeichnis legen (bei
All-Inkl üblicherweise `/`), nicht den Ordner `static-website` selbst.

Zwei Punkte, die erfahrungsgemäß Ärger machen:

1. **`.htaccess` wird mit übertragen.** FTP-Programme blenden Dateien mit
   führendem Punkt oft aus. In FileZilla: *Server → Versteckte Dateien
   anzeigen*. Ohne diese Datei funktionieren die Weiterleitungen nicht und die
   Startseite bleibt leer.
2. **Binärmodus für Bilder, Schriften und `.glb`.** Bei „Automatisch" ist das
   normalerweise korrekt; bei Anzeigefehlern in FileZilla auf *Binär* stellen.

### Testen vor dem Hochladen

Ein Doppelklick auf `de/index.html` reicht nicht – die Seite nutzt absolute
Pfade (`/assets/...`). Stattdessen im Ordner einen lokalen Server starten:

```bash
python3 -m http.server 8000
```

Dann im Browser `http://localhost:8000/de/` öffnen.

Damit lässt sich alles prüfen **außer dem Kontaktformular** – dafür wird PHP
gebraucht. Wer PHP installiert hat, startet stattdessen:

```bash
php -S localhost:8000
```

Auch dann wird lokal in der Regel keine Mail zugestellt; das Formular meldet
dann einen Fehler. Der echte Test läuft auf All-Inkl.

---

## Was hier bewusst fehlt

- Kein Cookie-Tracking, kein Analytics, keine externen Schriftarten oder CDNs.
  Die Seite lädt ausschließlich eigene Dateien – das hält die
  Datenschutzerklärung schlank und die Ladezeit kurz.
- Keine Build-Werkzeuge. Wer HTML lesen kann, kann diese Website pflegen.
