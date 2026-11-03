# Vaktia EKC-Elif: Projektstand

Stand: 1. November 2026

Wenn wir weitermachen wollen, sag Claude einfach:
**„Lies die Datei `Vaktia-EKC-Elif.md` im Repository `davud012/vaktija-eupen` und mach dort weiter.“**

---

## Worum es geht

Eine Gebetszeiten-Anzeige (Vaktija) für den **Džemat EKC Elif Eupen** (Edukativno kulturni centar „Elif“, Eupen, Belgien).
Sie läuft im Vollbild auf dem Samsung-Fernseher der Moschee (UE65RU7179, Eingang **HDMI 1**) über eine Android-Box (**H20**).

- **Adresse der Anzeige:** https://davud012.github.io/vaktija-eupen/
- **GitHub-Repository:** https://github.com/davud012/vaktija-eupen (öffentlich, kostenlos über GitHub Pages)
- Sprachen: Bosnisch und Deutsch
- Zeiten: minutengenau aus dem Takvim der Islamska Zajednica (Papier-Takvim, abfotografiert)

## Regeln für die Zeiten

| Was | Regel |
|---|---|
| Ikamet / Gebet | immer **Ezan + 10 Minuten** (alle Gebete) |
| Sabah-Ezan | **Izlazak (Sonnenaufgang) − 60 Minuten**, Sabah-Namaz 10 Minuten später |
| Džuma (Freitag) | Hutba **14:00 im Sommer**, **13:00 im Winter** |
| Fußzeile | nur „Džuma namaz · Freitagsgebet 13:00“ (bzw. 14:00) |

## Was fertig ist

**Design:** Design 5 „Nebo“ (Himmel), Layout 1 (Karten unten), Standard-Schrift.
- Echter Himmel über Eupen: Sonne, Mond mit echter Mondphase, Planeten (ohne Beschriftung), Sterne, Milchstraße
- Kein Boden, keine Moschee-Silhouette, kein Laufband
- Einzige Info: nächstes Gebet und verbleibende Zeit
- Echtes Wetter aus Eupen (Open-Meteo): Wolken, Regen mit Tropfen auf der Scheibe, Schnee, Gewitter mit Blitzen, Nebel
- Himmelsereignisse bis 2028 vorberechnet (Finsternisse, Supermond, Konjunktionen, Sternschnuppen)

**Gebets-Bildschirm:** Ab dem Ezan 30 Minuten lang ein eigener Bildschirm (arabischer Name, Countdown bis Ikamet, „Namaz je počeo · molimo utišajte mobitele“, danach „Allah neka primi namaz“, dazu das nächste Gebet). Danach zurück zur Hauptanzeige. Eigener Džuma-Bildschirm am Freitag. Der Freitag ist so, wie er ist, **perfekt** und bleibt so.

**Takvim eingetragen:** 31.10.2026 (vom Nutzer bestätigt: 05:34 · 07:18 · 12:25 · 14:50 · 17:21 · 18:52) sowie der ganze **November und Dezember 2026** (von den Fotos).
Außerhalb dieses Zeitraums stehen nur **Beispielzeiten** drin. Dann erscheint oben ein Hinweis-Banner.

**Technik:**
- Automatische Updates: Der Fernseher prüft alle 5 Minuten, ob es auf GitHub eine neue Version gibt, und lädt dann neu. Zusätzlich jede Nacht um 03:00.
- Datum stimmt immer, auch wenn der Fernseher tagelang aus war (Uhr der Box, Korrektur über den Server nur bei mehr als 1 Stunde Abweichung).
- Uhrzeit-Fehler (Seite ging 2 bis 8 Minuten vor) ist behoben.
- Offline-Speicher: Fällt das Internet aus, läuft die Anzeige weiter.
- Leichte Version für schwache Boxen: in `vaktija.js` `lagano: true` setzen, oder an die Adresse `?lagano=1` anhängen.

## Wichtige Dateien

| Datei | Inhalt |
|---|---|
| `vaktija.js` | **Die Gebetszeiten** und Einstellungen (Name, Regeln, Design). Hier wird der neue Takvim eingetragen. Oben die Versionsnummer hochzählen. |
| `index.html` | Die Anzeige selbst |
| `nebo.js` | Himmel (Sonne, Mond, Planeten, Sterne) |
| `prilike.js` | Wetter-Animationen |
| `nebeski-kalendar.js` | Himmelsereignisse bis 2028 |
| `sw.js` | Offline-Speicher |
| `ANLEITUNG.md` | Anleitung GitHub, Box, Fully Kiosk, AnyDesk |
| `fuer-app-entwickler/` | Paket für den App-Entwickler: gleiche Zeiten und Regeln (JSON, Regeln als JavaScript, Testfälle) |

**Zum Ausprobieren** (an die Adresse anhängen):
`?vrijeme=2026-12-10T12:34:50` (bestimmte Uhrzeit) · `?brzina=600` (Zeitraffer) · `?prilike=kisa` (Wetter: `vedro`, `oblacno`, `magla`, `kisa`, `snijeg`, `oluja`) · `?lagano=1` (leichte Version)

## Wo wir gerade stehen: Einrichtung der Box in der Moschee

Erledigt:
- H20-Box (Menü auf Französisch) am Samsung an HDMI 1 angeschlossen
- WLAN verbunden, Webseite auf der Box geöffnet (ohne Konto)

Noch zu tun:
1. **Fully Kiosk Browser** installieren (von fully-kiosk.com die APK laden, Installation erlauben)
2. In Fully einstellen:
   - Start URL: `https://davud012.github.io/vaktija-eupen/`
   - Launch on Boot: an
   - Keep Screen On: an
   - Fullscreen, Statusleiste und Navigationsleiste ausblenden: an
3. Fully als **Startbildschirm** festlegen (Home-Taste → Fully Kiosk → „Toujours“), damit die Anzeige immer zurückkommt
4. Am Samsung „Auto-Standby“ / „Automatisch ausschalten“ / Eco ausschalten
5. Testen: Strom der Box ziehen und wieder einstecken, die Anzeige muss von selbst kommen. Am Fernseher auf einen anderen Eingang und zurück auf HDMI 1, die Anzeige muss sofort da sein.
6. Optional: **AnyDesk** oder **RustDesk** (kostenlos, auch für Vereine) für Fernzugriff

Tipps von unterwegs:
- Kein OK-Knopf bzw. keine Bildschirmtastatur: Mausmodus der Fernbedienung ausschalten, Tastatur in den Einstellungen aktivieren (Paramètres → Préférences de l'appareil → Clavier), oder eine USB-Tastatur bzw. ein LAN-Kabel nehmen.
- Das kleine Fenster mit „+“ unten links auf dem Box-Startbildschirm ist nur die Favoriten-Leiste und wird nicht gebraucht.

## Hutba-Übersetzung live (TEST-Version, seit 1.11.2026)

- Handy-Seite: **https://davud012.github.io/vaktija-eupen/hutba/**, Passwort **123** (in `vaktija.js` unter `hutbaPrijevod.lozinka` änderbar)
- Ablauf: Knopf **„Auf Fernseher übertragen“** → Fernseher zeigt die Übersetzung. Dann **Mikrofon** drücken und sprechen. Am Ende Mikrofon aus und Knopf **„Beenden“**. Ist das Mikrofon 15 Minuten aus, geht der Fernseher von selbst zurück. Mikrofon ohne Fernseher geht auch (Übersetzung nur am Handy). Auf dem Fernseher steht **nur Deutsch**, ohne den bosnischen Text (Wunsch des Nutzers).
- Handy-Seite einsprachig: oben rechts **DE / BS / FR** umschalten (wird gemerkt)
- Roter Knopf **„Hutba beenden“** (erscheint, sobald Fernseher oder Mikrofon läuft) beendet Mikrofon und Fernseher zusammen
- iPhone: Die Spracherkennung des Browsers geht nur in **Safari** (mit eingeschalteter Diktierfunktion/Siri). In Chrome, Brave oder der Google-App auf dem iPhone blockiert Apple sie. Die Seite zeigt dann einen Knopf „In Safari öffnen“. Für eine Lösung in jedem Browser müsste der Ton selbst aufgenommen und an einen Cloud-Dienst geschickt werden (z. B. Gemini oder Whisper, braucht einen Schlüssel).
- Fernseher zeigt die Übersetzung wie ein **Teleprompter**: Wörter kommen nacheinander, alter Text gleitet langsam nach oben, nichts springt
- Kostenlose Übersetzung probiert nacheinander: Google (translate_a/t), Google (translate_a/single), MyMemory. Fällt einer aus („Load failed“), wird der nächste genommen.
- Übersetzer zur Wahl: Google (kostenlos), **Claude Haiku** (claude-haiku-5-5, ca. 1–2 Cent pro Hutba), Claude (claude-opus-5-5, ca. 0,50 €). Claude-API ist **nicht** im Claude-Pro-Abo enthalten, sondern wird separat auf platform.claude.com mit Guthaben bezahlt.
- **Einstellungen auf allen Geräten:** Unter Einstellungen → „Passwort & alle Geräte“ ein eigenes Passwort (mind. 8 Zeichen) festlegen. Die Einstellungen inkl. Schlüssel werden damit verschlüsselt (AES-GCM, Schlüssel per PBKDF2 aus dem Passwort) und über den Verbindungsserver an alle Geräte verteilt. Danach gilt zum Anmelden **nur noch dieses Passwort**, „123“ nicht mehr. Der Fernseher hebt das verschlüsselte Paket auf (kann es nicht lesen) und stellt es wieder her, falls der Server es verliert. Wer das Passwort vergisst: Sag Claude Bescheid, dann wird der Kanalname in `vaktija.js` geändert, und es geht wieder mit „123“ los.
- **Ganze Sätze statt Wortfetzen:** Die Spracherkennung gibt Text möglichst bis zum Satzende (Punkt/Fragezeichen der automatischen Interpunktion) weiter, sonst nach 1,8 s Pause oder nach ca. 28 Wörtern am Komma.
- **Claude antwortet im JSON-Format** mit „translation“ (nur das kommt auf den Fernseher) und „comment“ (Ablage für Erklärungen, wird verworfen). Enthält die Übersetzung trotzdem Englisch oder eine Erklärung, wird stattdessen die Google-Übersetzung dieses Satzes genommen.
- **Arabische Formeln fest eingebaut:** Bismillah, Euzu billahi, Elhamdulillah (rabbil alemin), Subhanallah, Allahu ekber, Inšallah, Mašallah, Es-selamu alejkum, Estagfirullah, Džezakallahu hajran werden direkt in arabische Schrift umgesetzt (ohne KI), „sallallahu alejhi ve sellem“/„s.a.v.s.“ → ﷺ. Reine Formeln werden gar nicht übersetzt.
- **Arabisch als eigener Block:** Mehrere arabische Teile hintereinander (z. B. „Elhamdulillah, ves-salatu ves-selamu ala resulillah“) werden zu **einer** Klammer zusammengeführt und auf dem Fernseher und Handy in einer eigenen Zeile von rechts nach links angezeigt (Koran-Stelle klein darunter).
- **Feste Hutba-Texte:** zusätzlich Al-Ahzab 33:70 („Ja ejjuhellezine amenu ittekullahe ve kulu kavlen sedida“), Al-Imran 3:102, „Ve ahiru da'vana …“, „Allahumme ja mukallibel kulub …“, „Allahu e'lem“, „radijallahu anhu/anha“.
- **Arabisch geht nicht an Claude:** Arabische Blöcke werden vor dem Senden durch [1], [2] ersetzt und danach unverändert wieder eingesetzt (Claude kann Koran-Text also nicht verfälschen). Für Deutsch bekommt Claude 5 Beispiel-Antworten mit.
- **Probe-Hutba** (Einstellungen → „Probe-Hutba starten“): schickt `hutba/proba-hutba.js` (ca. 290 Wörter, Bosnisch mit Arabisch) durch die echte Übersetzung und zeigt einen Bericht mit Original → Übersetzung → Weg (Claude / Google / Arabisch). Bericht kopieren und Claude schicken.
- **Kontrolle jeder Claude-Antwort:** Englisch, Erklärungen oder bosnische Wörter aus dem Original in der Übersetzung → verworfen, stattdessen Google-Übersetzung dieses Satzes.
- Die Handy-Seite **aktualisiert sich selbst**, wenn es eine neue Version gibt (nicht während Mikrofon/Fernseher laufen). Versionsnummer steht unten in den Einstellungen.
- **Treue Übersetzung:** Claude darf nichts hinzufügen (keine Erklärungen, Deutungen, Bemerkungen wie „der Satz setzt den vorherigen fort“), bleibt nah am Wortlaut, nur Redewendungen werden sinngemäß übertragen. Bruchstücke werden als Bruchstück übersetzt. Zusätzlich filtert die Seite Sätze mit solchen Bemerkungen heraus.
- **Tempo am Fernseher:** ca. 3 Wörter pro Sekunde; liegen 2 Sätze in der Warteschlange, etwas schneller, ab 3–4 Sätzen deutlich schneller (aber nie alles auf einmal).
- **Jeder Satz in eigener Zeile** mit Abstand (Satzende an . ! ? oder Ende eines Koran-Zitats; Abkürzungen wie „bzw.“ ausgenommen). Claude soll auch schnell aneinandergereihte Sätze trennen. Absätze haben einen größeren Abstand.
- Übersetzungsregeln: kein Englisch (auch keine Anmerkungen/Etiketten, zusätzlich wird die Ausgabe gesäubert); alles, was auf Arabisch gesagt wird, steht in arabischer Schrift in Klammern; die Segensformel für den Propheten erscheint nur als Zeichen ﷺ. Arabische Schrift (auch ﷺ) wird mit der Schrift Amiri (`fonts/Amiri-arabic.woff2`) angezeigt.
- Gesprochene Sprachen: Bosnisch (auf dem iPhone intern Kroatisch), Deutsch, Arabisch. Zielsprachen: Deutsch, Französisch, Bosnisch, Arabisch, Türkisch.
- **Absätze** auf dem Fernseher: neuer Absatz bei einer Sprechpause des Imams (über 2,5 s), wenn Claude/Gemini einen neuen Gedanken erkennt (Zeichen ¶), oder nach ca. 55 Wörtern am Satzende. Der aktuelle Absatz ist hell, ältere sind abgedunkelt.
- **Gemini als Spracherkennung** (Einstellungen → Spracherkennung → Gemini): geht in jedem Browser, auch Chrome/Google-App auf dem iPhone. Ton wird an Sprechpausen in Stücke von 5–14 s geschnitten, Gemini schreibt mit und übersetzt nach Sinn. Braucht einen Gemini-Schlüssel (aistudio.google.com), Modell standardmäßig `gemini-flash-latest` (änderbar)
- Seite schließen → Fernseher geht zurück zu den Gebetszeiten (spätestens nach 25 Sekunden)
- Mikrofon-Erlaubnis speichert der Browser selbst: bei der Frage „Bei Besuch der Website zulassen“ wählen, nicht „Nur dieses Mal“
- Übersetzer wählbar unter „Einstellungen“: **Google** (Standard, kostenlos, eher Wort für Wort, erkennt keine Koran-Verse) oder **Claude** (Modell claude-opus-5-5, nach Sinn, ca. 0,50 € pro Hutba, braucht einen API-Schlüssel, der nur auf dem Handy gespeichert wird)
- Gesprochene Sprache wählbar (Bosnisch, Kroatisch, Serbisch, Deutsch, Englisch, Türkisch, Arabisch) und Zielsprache (Deutsch, Französisch, Niederländisch, Englisch, Türkisch, Arabisch, Bosnisch)
- Beim Druck aufs Mikrofon kommt das Fenster „Mikrofon erlauben“. War es früher blockiert, zeigt die Seite eine Anleitung zum Freigeben.
- „Abmelden & alles löschen“ löscht alles Gesagte und Übersetzte, am Handy, am Fernseher und auf dem Server. Nach dem Stoppen bleibt auch sonst nichts auf dem Server oder dem Fernseher.
- Koran-Rezitation wird nicht übersetzt. Stattdessen erscheint der Vers auf Arabisch in Klammern mit der Quelle, z. B. (الٓمٓ · Sure Al-Baqara 2:1). Das passiert nur, wenn der Vers sicher erkannt wird, sonst erscheint [Rezitation auf Arabisch].
- Verbindung Handy → Fernseher: zwei kostenlose öffentliche MQTT-Server (HiveMQ, EMQX). Kanalname steht in `vaktija.js` unter `hutbaPrijevod.kanal`.
- Dateien: `hutba/index.html` (Handy), `prijevod-veza.js` (Verbindung), `lib/` (Bibliotheken), Anzeige in `index.html`
- Fernseher-Vorschau ohne Handy: Adresse + `?test=hutba`
- Offen: echter Test in der Moschee (Mikrofon, Hall), eventuell ein Ansteckmikrofon, später ein richtiges Passwort und eine geschützte Verbindung

## Hauptanzeige (Änderungen 1.11.2026)

- Datum groß geschrieben und ohne Punkt nach dem Jahr: „Nedjelja, 1. Novembar 2026“
- Sekunden oben rechts klein und ruhig, ohne Animation

## Änderungen 1.11.2026 (Abend)

- **Jacija fest um 19:00, Gebet 19:10**, vom 01.11. bis 31.12.2026 (`vaktija.js` → `jacijaFiksno`). Ab Januar gilt wieder der Takvim. Auch im Paket für den App-Entwickler eingetragen.
- **Gebets-Bildschirm** je Gebet: Sabah 15 Min., Podne 20, Ikindija 20, Akšam 20, Jacija 20 (ab Ezan, `trajanjeEkranaVakta`). Džuma unverändert.
- **Ruhiger blauer Hintergrund** statt lebendigem Himmel (`nebo: false`), weil die Box beim Himmel ruckelte. Damit gibt es auch keine Wetter-Animationen mehr. Zurück zum Himmel: `nebo: true`.

## Änderungen 1.11.2026 (Moschee-Test)

- **Fehler behoben:** Ging die Uhr der Android-Box mehr als 90 s anders als die Handy-Uhr, hat der Fernseher das Hutba-Signal ignoriert. Jetzt werden keine Uhrzeiten mehr verglichen. Gespeicherte (alte) Signale vom Server werden ignoriert, es zählt nur das Live-Signal des Handys (alle 5 s).
- Hintergrund jetzt **dunkelblau wie der Hutba-Bildschirm**.
- **Verbindungsanzeige** unten links: auf Wunsch ausgeblendet (`.veza-tv { display: none }` in index.html; zum Wiedereinschalten `display: none;` entfernen).
- **Leichte Version an** (`lagano: true`) und versteckte Bildschirme ohne Animation, damit die Box nicht überlastet wird.
- Fernseher-Fehler „ERR_CONNECTION_RESET“ = die Box hatte in dem Moment kein Internet zu GitHub. In Fully Kiosk automatisches Neuladen einstellen (siehe Chat).

## Später geplant

- **Neuer Takvim:** Jedes Jahr im **Dezember** die Takvim-Seiten fürs nächste Jahr fotografieren und Claude schicken. Claude trägt sie in `vaktija.js` ein und lädt sie hoch. Der Fernseher übernimmt das automatisch.
  Wichtig: Aktuell ist nur bis **31.12.2026** echt eingetragen. Der Takvim für 2027 muss also **vor Januar** kommen.
- Gespräch mit dem **App-Entwickler** (Paket in `fuer-app-entwickler/` liegt bereit)

## Erledigt / verworfen

- Logo-Entwurf (Halbmond mit „Elif“): auf Wunsch verworfen
- Umgehen des IZ-App-Abos: abgelehnt, stattdessen diese eigene Anzeige

## Nach Jacija: Zeiten für morgen (2026-11-01.19)
- Wenn der Jacija-Bildschirm vorbei ist, rücken die Karten 2 Plätze nach links (Podne … Jacija). Rechts stehen **Zora und Izlazak sunca von morgen**, gestrichelt umrandet, darüber das Datum (Bosnisch + Deutsch, z. B. „2. Novembar 2026 / 2. November 2026“).
- Um 00:00 wird wieder normal angezeigt (Zora … Jacija).
- Abschalten: in vaktija.js `sutraNakonJacije: false`.
- Kein grüner Blitz mehr beim Laden: Grundhintergrund ist jetzt dunkelblau (Grün nur noch bei Design 1).

## Hintergrundmuster (2026-11-02.5)
- Sechseck-Stern-Muster (6-zackige Sterne mit Sechsecken, goldene Linien), selbst gezeichnet nach Vorlage des Nutzers. Die Vorlagen hatten Wasserzeichen und wurden deshalb nicht übernommen.
- Datei: `slike/uzorak-zvijezde.svg`. Erzeugt mit `fuer-app-entwickler/muster-generator.py` (Hankin-Verfahren auf Sechseck-Raster): `python3 muster-generator.py 30 ../slike/uzorak-zvijezde.svg 1.3` (Winkel 30°, Linienstärke 1.3).
- Eingebunden in index.html über `body.dizajn-5.plavo::before`: Größe `5.5vw 9.526vw` (Seitenverhältnis der Kachel 1:√3), Deckkraft `0.12`, Verlauf per mask-image (oben schwach, unten kräftiger). Keine Animation → keine Last für die Box.

## Hutba-Übersetzung: Claude statt Haiku, kein Passwort-Abgleich, Koran-Verse aus dem Mushaf (2026-11-03.1)
- **Standard-Übersetzer ist jetzt „Claude“** (claude-opus-5-5, effort low). Haiku bleibt wählbar. Geräte, die Haiku eingestellt hatten, werden einmalig auf Claude umgestellt (Merker `hutba-v3`).
  - Kosten grob: Claude ca. 1,50–2 $ pro 30-Min-Hutba, Haiku ca. 5 Cent.
  - Kein Guthaben mehr (Fehler „credit balance“) → Hinweis am Handy, Übersetzung läuft automatisch über Google weiter.
- **„Passwort & alle Geräte“ entfernt**: kein verschlüsselter Einstellungs-Abgleich mehr. Anmeldung nur noch mit dem Passwort aus `vaktija.js` (`hutbaPrijevod.lozinka`). Schlüssel bleiben nur auf dem jeweiligen Gerät. Das Handy löscht das alte Paket vom Server (`postavke`), der Fernseher speichert/veröffentlicht es nicht mehr.
- **Koran-Verse**: Claude liefert nur Sure + Versnummern (JSON-Feld `verses`, Marker `[Q1]` im Text). Der arabische Text wird **exakt aus `hutba/kuran.js`** eingesetzt (Uthmani-Text aus quran-json 3.1.2 / quranenc.com, Lizenz CC BY-SA 4.0 → `hutba/KURAN-LICENCA.txt`), nie von der KI geschrieben. Immer ganze Verse, mehrere Verse mit ﴿٥﴾-Zeichen, Quelle z. B. „Sure Ash-Sharh 94:5-6“. Unsicher → „[Rezitation auf Arabisch]“. Ungültige Sure/Vers wird verworfen.
- Die festen Formeln 33:70 und 3:102 kommen jetzt auch aus dem Mushaf.
- **Update 2026-11-03.2:** Standard wieder **Claude Haiku** (claude-haiku-5-5, effort low), auf Wunsch des Nutzers. Alle Verbesserungen (Koran-Verse aus dem Mushaf, kein Passwort-Abgleich, Guthaben-Hinweis) bleiben. Geräte werden einmalig auf Haiku gestellt (Merker `hutba-v4`). „Claude“ (Opus) bleibt in den Einstellungen wählbar.
