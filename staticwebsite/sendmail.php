<?php
/* ============================================================================
 * Kontaktformular – Mailversand
 * ----------------------------------------------------------------------------
 * Nimmt das Formular der Kontaktseite entgegen und verschickt eine E-Mail
 * über den Mailserver von All-Inkl. Kein Framework, keine Bibliothek.
 *
 * Ablauf:
 *   1. Nur POST zulassen
 *   2. Spam abweisen (Honigtopf-Feld, zu kurze Nachricht, Zeitsperre)
 *   3. Eingaben prüfen und von Steuerzeichen befreien
 *   4. Mail verschicken, Ergebnis als JSON zurückgeben
 *
 * Antwort:  {"ok":true}                     – Mail wurde übergeben
 *           {"ok":false,"error":"..."}      – Grund siehe error-Feld
 *
 * Diese Datei gehört ins Wurzelverzeichnis des Webspace, neben index.html.
 * ========================================================================= */


/* ----------------------------------------------------------------------------
 * Einstellungen – hier anpassen
 * ------------------------------------------------------------------------- */

// Wohin die Anfragen gehen sollen.
$EMPFAENGER = 'info@wima-automation.de';

// Absender der Mail. WICHTIG: muss eine Adresse Ihrer eigenen Domain sein,
// sonst stuft der Empfänger die Mail als Fälschung ein (SPF/DMARC).
// Also NICHT die Adresse des Besuchers eintragen – die steht in "Reply-To".
$ABSENDER = 'info@wima-automation.de';

// Kürzeste erlaubte Nachricht (Zeichen). Filtert leere Testeinträge.
$MIN_NACHRICHT = 10;

// Sperrzeit je IP-Adresse in Sekunden. Verhindert, dass ein Skript
// den Mailserver in Serie beschickt.
$SPERRE_SEKUNDEN = 30;


/* ----------------------------------------------------------------------------
 * Hilfsfunktionen
 * ------------------------------------------------------------------------- */

/**
 * Antwortet als JSON und beendet das Skript.
 * Bei Aufrufen ohne JavaScript wird stattdessen eine schlichte HTML-Seite
 * ausgegeben, damit der Besucher nicht rohen JSON-Code sieht.
 */
function antwort($ok, $fehler = null) {
    $istAjax = (
        (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'fetch')
        || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)
    );

    if ($istAjax) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $fehler]);
        exit;
    }

    // Rückfallebene ohne JavaScript
    header('Content-Type: text/html; charset=utf-8');
    $titel = $ok ? 'Nachricht gesendet' : 'Senden fehlgeschlagen';
    $text  = $ok
        ? 'Vielen Dank – Ihre Nachricht ist bei uns eingegangen. Wir melden uns zeitnah.'
        : 'Ihre Nachricht konnte leider nicht gesendet werden. Bitte schreiben Sie uns direkt an info@wima-automation.de.';
    echo '<!DOCTYPE html><html lang="de"><head><meta charset="utf-8">'
       . '<meta name="viewport" content="width=device-width, initial-scale=1">'
       . '<title>' . $titel . '</title><link rel="stylesheet" href="/assets/css/site.css"></head>'
       . '<body><main class="section"><div class="container">'
       . '<h1>' . $titel . '</h1><p>' . $text . '</p>'
       . '<p><a class="btn btn--dark" href="/de/contact/">Zurück zum Kontakt</a></p>'
       . '</div></main></body></html>';
    exit;
}

/**
 * Entfernt Zeilenumbrüche und Steuerzeichen.
 * Zwingend für alles, was in einen Mail-Kopf wandert: Ein Angreifer könnte
 * sonst über ein "\n" eigene Kopfzeilen einschleusen (Header-Injection).
 */
function saubereZeile($wert) {
    $wert = (string) $wert;
    $wert = str_replace(["\r", "\n", "\0"], ' ', $wert);
    $wert = preg_replace('/[\x00-\x1F\x7F]/u', '', $wert);
    return trim($wert);
}

/** Kürzt einen Text auf eine Höchstlänge. */
function kuerzen($wert, $max) {
    $wert = trim((string) $wert);
    return function_exists('mb_substr') ? mb_substr($wert, 0, $max) : substr($wert, 0, $max);
}


/* ----------------------------------------------------------------------------
 * 1. Nur POST zulassen
 * ------------------------------------------------------------------------- */

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    antwort(false, 'method');
}


/* ----------------------------------------------------------------------------
 * 2. Spamabwehr
 * ------------------------------------------------------------------------- */

// Honigtopf: Das Feld ist im Browser unsichtbar. Ist es gefüllt, war ein Bot
// am Werk. Wir antworten bewusst mit "ok", damit der Bot nichts dazulernt.
if (trim($_POST['website'] ?? '') !== '') {
    antwort(true);
}

// Zeitsperre je IP-Adresse. Schlägt der Zugriff auf das temporäre
// Verzeichnis fehl, wird die Sperre übersprungen statt das Formular zu blockieren.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unbekannt';
$sperrdatei = sys_get_temp_dir() . '/wima-kontakt-' . sha1($ip) . '.txt';
if (is_readable($sperrdatei) && (time() - (int) @filemtime($sperrdatei)) < $SPERRE_SEKUNDEN) {
    http_response_code(429);
    antwort(false, 'zu_schnell');
}


/* ----------------------------------------------------------------------------
 * 3. Eingaben prüfen
 * ------------------------------------------------------------------------- */

$name       = saubereZeile(kuerzen($_POST['name']    ?? '', 100));
$firma      = saubereZeile(kuerzen($_POST['company'] ?? '', 100));
$email      = saubereZeile(kuerzen($_POST['email']   ?? '', 150));
$telefon    = saubereZeile(kuerzen($_POST['phone']   ?? '', 50));
$sprache    = saubereZeile(kuerzen($_POST['lang']    ?? 'de', 5));
$nachricht  = kuerzen($_POST['message'] ?? '', 5000);

// Steuerzeichen aus der Nachricht entfernen, Zeilenumbrüche aber behalten
$nachricht = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $nachricht);
$nachricht = trim($nachricht);

if ($name === '') {
    antwort(false, 'name');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    antwort(false, 'email');
}
if (mb_strlen($nachricht) < $MIN_NACHRICHT) {
    antwort(false, 'nachricht');
}
if (!in_array($sprache, ['de', 'en', 'zh'], true)) {
    $sprache = 'de';
}


/* ----------------------------------------------------------------------------
 * 4. Mail zusammenstellen und verschicken
 * ------------------------------------------------------------------------- */

$betreff = sprintf('Website-Anfrage (%s): %s', strtoupper($sprache), $name);

$zeilen = [
    'Neue Nachricht über das Kontaktformular auf gorbel.eu',
    str_repeat('-', 55),
    'Name:        ' . $name,
    'Unternehmen: ' . ($firma   !== '' ? $firma   : '-'),
    'E-Mail:      ' . $email,
    'Telefon:     ' . ($telefon !== '' ? $telefon : '-'),
    'Sprache:     ' . strtoupper($sprache),
    'Zeitpunkt:   ' . date('d.m.Y H:i:s'),
    str_repeat('-', 55),
    '',
    $nachricht,
];
$text = implode("\n", $zeilen);

// Betreff und Name für den Mailkopf kodieren, damit Umlaute und
// chinesische Zeichen korrekt ankommen.
$betreffKodiert = '=?UTF-8?B?' . base64_encode($betreff) . '?=';
$nameKodiert    = '=?UTF-8?B?' . base64_encode($name) . '?=';

$header = implode("\r\n", [
    'From: ' . $nameKodiert . ' <' . $ABSENDER . '>',
    'Reply-To: ' . $email,          // Antworten gehen an den Besucher
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: gorbel.eu Kontaktformular',
]);

$erfolg = @mail($EMPFAENGER, $betreffKodiert, $text, $header, '-f' . $ABSENDER);

if (!$erfolg) {
    http_response_code(500);
    antwort(false, 'versand');
}

// Zeitstempel für die Sperre erst nach erfolgreichem Versand setzen
@file_put_contents($sperrdatei, (string) time());

antwort(true);
