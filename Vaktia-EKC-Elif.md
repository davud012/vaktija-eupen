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

**Design (seit 2026-11-04.9 fest, keine anderen Varianten mehr):** helles beiges Design, dunkelgrüne Schrift, Standard-Schrift. Uhr, Name mit kleinem Logo, Datum (BS · DE), Hidžra und „Sljedeće“ in der Mitte, darunter 6 weiße Karten, unten die Džuma-Leiste, großes Logo als Wasserzeichen.

**Gebets-Bildschirm:** Ab dem Ezan 30 Minuten lang ein eigener Bildschirm (arabischer Name, Countdown bis Ikamet, „Namaz je počeo · molimo utišajte mobitele“, danach „Allah neka primi namaz“, dazu das nächste Gebet). Danach zurück zur Hauptanzeige. Eigener Džuma-Bildschirm am Freitag. Der Freitag ist so, wie er ist, **perfekt** und bleibt so.

**Takvim eingetragen:** 31.10.2026 (vom Nutzer bestätigt: 05:34 · 07:18 · 12:25 · 14:50 · 17:21 · 18:52) sowie der ganze **November und Dezember 2026** (von den Fotos).
Außerhalb dieses Zeitraums stehen nur **Beispielzeiten** drin. Dann erscheint oben ein Hinweis-Banner.

**Technik:**
- Automatische Updates: Der Fernseher prüft alle 5 Minuten, ob es auf GitHub eine neue Version gibt, und lädt dann neu. Zusätzlich jede Nacht um 03:00.
- Datum stimmt immer, auch wenn der Fernseher tagelang aus war (Uhr der Box, Korrektur über den Server nur bei mehr als 1 Stunde Abweichung).
- Uhrzeit-Fehler (Seite ging 2 bis 8 Minuten vor) ist behoben.
- Offline-Speicher: Fällt das Internet aus, läuft die Anzeige weiter.
- Leichte Version für schwache Boxen: in `vaktija.js` `lagano: true` (aktiv).

## Wichtige Dateien

| Datei | Inhalt |
|---|---|
| `vaktija.js` | **Die Gebetszeiten** und Einstellungen (Name, Regeln, Design). Hier wird der neue Takvim eingetragen. Oben die Versionsnummer hochzählen. |
| `index.html` | Die Anzeige selbst |
| `slike/logo.png` | Logo des Džemats |
| `prijevod-veza.js`, `lib/` | Verbindung Handy ↔ Fernseher (MQTT), Claude für die Übersetzung |
| `hutba/` | Handyseite für die Hutba-Übersetzung, `kuran.js` = Qur'an-Text (Lizenz in `KURAN-LICENCA.txt`) |
| `sw.js` | Offline-Speicher |
| `ANLEITUNG.md` | Anleitung GitHub, Box, Fully Kiosk, AnyDesk |
| `fuer-app-entwickler/vaktija.json` | Gebetszeiten als Link für die App des Entwicklers (nicht löschen, seine App liest diese Datei) |

**Zum Ausprobieren** (an die Adresse anhängen):
`?vrijeme=2026-12-10T12:34:50` (bestimmte Uhrzeit) · `?brzina=600` (Zeitraffer)

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
- **Update 2026-11-03.3 – Arabisch + Übersetzung, ﷺ:**
  - **Nur wenn die gesprochene Sprache Bosnisch ist:** Arabisches (Formeln, Dua, Hadith, Koran-Verse) steht in Arabisch in Klammern, bei Versen mit Quelle („Sure Ash-Sharh 94:5“), und **direkt dahinter die Übersetzung** in die Zielsprache, ohne Zusatzwörter. Beispiel: „(بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ) Im Namen Allahs, des Allerbarmers, des Barmherzigen.“
  - Technik: Claude liefert `arabic_meanings` (für die Marker [1], [2]) und `verses[].meaning`; die Seite setzt sie hinter den arabischen Block. Bei Google wird der arabische Block zusätzlich Arabisch→Zielsprache übersetzt. Zielsprache Arabisch: keine Übersetzung dahinter.
  - Gesprochen Deutsch/Arabisch: kein arabischer Klammerblock, alles wird normal übersetzt.
  - **Segensspruch immer nur ﷺ**: auch ausgeschriebene Formen („Friede und Segen seien auf ihm“, „que la paix … soit sur lui“, „neka je mir … na njim“, صلى الله عليه وسلم) werden in ﷺ umgewandelt (Prompt + Nachbearbeitung in `ocistiIzlaz`).
- **Update 2026-11-03.4 – falsch gehörtes Arabisch (iPhone):** Die Spracherkennung (Apple, Kroatisch/Bosnisch) schreibt Arabisch als bosnisch aussehende Wörter („mila Rahman Rahim“, „sa veselim“, „usro“).
  - Feste Erkennung: „mila Rahman Rahim“ u. ä. → Bismillah; „Poslanik/Muhammed sa veselim / salala alej vesellem“ → ﷺ.
  - Kurze Stücke (unter 4 Wörtern ohne Punkt) warten bis 5 s auf den nächsten Teil und werden zusammen übersetzt (vorher kamen „Usro“, „Kaže“ einzeln).
  - Prompt-Hinweise auf typische Fehlhörungen (z. B. „usro/jusro“ nach „Allah kaže“ = 94:5-6).
  - Gemini-Audio-Modus (hört das echte Arabisch) unterstützt jetzt auch Verse aus dem Mushaf (`verses` im Schema).
- **Update 2026-11-03.5:** weitere Fehlhörungen fest erkannt: „hamdo bila“, „Alhamdulillahi Rabbil Alamin“, „a hamdo lila rabil alemin“ → الحمد لله (رب العالمين); „mila Rahim“ → Bismillah. Doppelte gleiche arabische Blöcke werden zu einem. Sinnlose Wörter neben Arabisch („Kajesu Fatih“) soll die KI weglassen statt übersetzen.
- **Update 2026-11-03.6 – Gemini als Übersetzer, Schlüssel bleiben:**
  - Übersetzer-Auswahl jetzt: Google (kostenlos) · Claude Haiku · Claude · **Gemini – nach Sinn, kostenlos**. Gemini nutzt denselben Schlüssel wie die Gemini-Spracherkennung (`hutba-gkljuc`, Modell `gemini-flash-latest`), gleiche Regeln/JSON-Felder wie Claude (Verse aus dem Mushaf, Arabisch + Übersetzung). Fehler → automatisch Google.
  - Gespeicherte Schlüssel (Claude und Gemini) werden nicht mehr gelöscht, wenn man mit leerem Feld „Speichern“ drückt oder den Übersetzer wechselt; beim Zurückwechseln wird der gespeicherte Schlüssel wieder benutzt.

## Logo der Gemeinde (2026-11-04.1)
- Logo-Dateien: `slike/logo.png` (Original, grüner Halbmond + sandfarbener Stern, freigestellt) und `slike/logo-svijetli.png` (Halbmond hell/creme für dunklen Hintergrund).
- Einstellung in `vaktija.js`: `logo: 0` (aus, blaues Design) oder 1–5; zum Ansehen ohne Änderung: `?logo=1` … `?logo=5` an die Adresse hängen.
  - 1 = Logo links neben dem Namen (grünes Design) · 2 = großes Logo oben in der Mitte · 3 = helles Design (Creme, dunkelgrüne Schrift, Original-Logo) · 4 = großes Logo als Wasserzeichen im Hintergrund · 5 = Logo neben der Uhr.
- Grünes Design: Hintergrund #145a33 → #062615, Akzent sand #d9c59c (aus dem Logo #a59272), Karten dunkelgrün transparent; Gebets- und Hutba-Bildschirm ebenfalls grün.
- **Update 2026-11-04.2 – aktiv: Layout 6** (Wunsch des Nutzers): helles Design aus Layout 3 (Creme, dunkelgrüne Schrift, Original-Logo links) **+ großes Logo als Wasserzeichen** in der Mitte (Original-Logo, 100vh groß, Deckkraft 0.08). Gebets- und Hutba-Bildschirm sind dabei dunkelgrün mit heller Schrift. Zurück zum blauen Design: `logo: 0` in vaktija.js.
- **Update 2026-11-04.5 – helles Design auch auf Gebets- und Hutba-Bildschirm** (ohne großes Wasserzeichen):
  - Gebetsbildschirm: Creme-Hintergrund, dunkelgrüne Schrift, arabischer Name sandgold, kleines Logo oben in der Mitte.
  - Hutba-Bildschirm: Creme-Hintergrund, dunkelgrüner Text, Arabisch sandgold-braun, kleines Logo links neben „UŽIVO · LIVE“.
  - Animationen (auch in der leichten Version, nur transform/opacity bzw. einmaliges Linienzeichnen): Logo fliegt beim Erscheinen ein und schwebt danach leicht; Ornament zeichnet sich und dreht sich langsam; beim Ezan grüne Wellen; Hutba-Wörter blenden ein, LIVE-Punkt pulsiert.
- Option ohne Sternmuster: `?muster=0` (Vorschau) bzw. `uzorak: false` in vaktija.js – **aktiv seit 2026-11-04.6** (Fernseher ohne Sternmuster).
- **Update 2026-11-04.7:** Grundfarbe vor dem Laden des Skripts ist jetzt Creme statt Blau → kein blaues Aufblitzen mehr beim Neuladen (F5). Blau nur noch, wenn das blaue Design gewählt ist (`logo: 0`).
- **Layout-Vorschläge (beiges Design)**, ansehen per Adresse, Fernseher bleibt bei Layout 1:
  - A `?raspored=2` – eine weiße Leiste unten mit allen Zeiten
  - B `?raspored=3&font=outfit` – Uhr groß links, Liste rechts, Schrift Outfit
  - C `?raspored=4&font=cormorant` – Uhr groß in der Mitte, Zeiten ohne Kästen, Schrift Cormorant (elegant), weniger Text
  - D `?raspored=5&font=montserrat` – Uhr links, 6 Karten 3×2 rechts mit Farbleiste oben, weniger Text
  - E `?raspored=6&font=cormorant` – Tabelle wie ein Takvim
  - Einschalten in vaktija.js: `raspored: N` und `font: "…"`.
  - **Aktiv auf dem TV (ab Version 2026-11-04.8): `raspored: 7`** = aktuelles Layout (Karten, Schrift, alle Texte wie Layout 1), aber Uhr, Name mit kleinem Logo, Datum (BS · DE), Hidžra und „Sljedeće“ zentriert in der Mitte wie bei C. Zurück zum alten Kopf: `raspored: 1`.
- **Hutba-Handyseite (/hutba/) im hellen Design:** beiger Hintergrund, dunkelgrüne Schrift, Logo auf Anmeldung und oben neben dem Titel, grüne Knöpfe und Mikrofon, weiße Kästen.

## Aufräumen (Version 2026-11-04.9)
Auf Wunsch des Nutzers gibt es nur noch zwei Seiten: https://davud012.github.io/vaktija-eupen/ und https://davud012.github.io/vaktija-eupen/hutba/
- Entfernt: alle Vorschau-Varianten (Designs 1–4, Layouts 2–6, Logos 1–5, Schriften, Sternmuster, `?dizajn=`, `?raspored=`, `?logo=`, `?font=`, `?muster=`, `?lagano=`), Himmel (`nebo.js`, `nebeski-kalendar.js`), Wetter (`prilike.js`, holte alle 10 Min. Daten von Open-Meteo, war aber unsichtbar), Probe-Hutba, Beispielbilder, zusätzliche Schriften, App-Entwickler-Extras (Dart, CSV, Regeln, Muster-Generator).
- Das Aussehen ist unverändert (Bildvergleich vorher/nachher). Die Einstellungen `dizajn`, `raspored`, `font`, `logo`, `uzorak`, `nebo`, `pozadina` gibt es in `vaktija.js` nicht mehr.
- Behalten: `fuer-app-entwickler/vaktija.json`, weil die App des Entwicklers diesen Link liest.
- Offline-Speicher (`sw.js`) auf v3, alte Kopien werden gelöscht.

## Logo-Blende (Version 2026-11-04.10)
- Video vom Nutzer (`vorschau_blende.mp4`), nur der Teil mit dem Logo (1,70–5,32 s), Szene 1 und 2 entfernt → `slike/blende.mp4` (H.264, 170 KB) und `slike/blende.webm` (VP9, 110 KB, falls das Gerät kein H.264 kann). Länge 3,6 s.
- Erscheint über allem (Vollbild) bei: 1) TV wechselt zur Hutba (Handy „Prikaži na TV-u“), 2) Gebetsbeginn genau zur Ezan-Zeit, 3) Rückkehr zur Vaktija (Ende des Gebetsbildschirms, und auch wenn die Hutba endet).
- Beim Neuladen mitten im Gebetsbildschirm kommt keine Blende (nur in der ersten Minute ab Ezan).
- Die Animationen darunter warten, bis die Blende weg ist; Blende blendet in 0,9 s aus.
- Das Video wird einmal in den Speicher geladen und offline gespeichert. Ausschalten: `blenda: false` in vaktija.js.
- **Fix 2026-11-04.11:** Bei Akšam (17:11) kam die Blende auf der Box nicht. Grund: Der Android-Browser in Fully Kiosk startet Videos nicht ohne Antippen (Autoplay-Sperre), die Seite hat die Blende dann übersprungen. Jetzt ist die Blende ein **animiertes Bild** (`slike/blende.webp`, 1600 px, 25 Bilder/s, 390 KB), das ohne Sperre abspielt. Das MP4 und das WebM wurden entfernt. Getestet mit eingeschalteter Autoplay-Sperre.

## Version 2026-11-04.12 (Foto vom Samsung-TV in der Moschee)
- **Kästchen klebten aneinander, Logo direkt am Namen:** Der ältere Browser auf der Box kennt den CSS-Abstand `gap` nicht. Alle Abstände sind jetzt Ränder (`margin`), funktioniert überall.
- **Logo unscharf/pixelig:** Das 520-px-Logo wurde auf der Box grob verkleinert. Jetzt vorab sauber verkleinerte Logos: `slike/logo-klein.png` (180 px hoch, Kopf und Hutba) und `slike/logo-mittel.png` (260 px, Gebetsbildschirm). Das große Wasserzeichen bleibt `logo.png`.
- **Zora heißt jetzt Sabah** (Karte, morgen-Ansicht).
- **Gebetsbildschirm:** ab Ezan 10 Min. Countdown, danach „Namaz je počeo“ 10 Min. (Jacija 15 Min.), dann Hauptbildschirm. Sabah: Ezan 60 Min. vor Sonnenaufgang (z. B. 06:31), Countdown bis 06:41, bis 06:51. `trajanjeEkranaVakta: { zora: 20, podne: 20, ikindija: 20, aksam: 20, jacija: 25 }`, `trajanjeNamaza: 15`. Freitag (Džuma) unverändert.
- Schwarzer Rand ums Bild am Samsung: Bild der Box ist verkleinert (Zoom/Bildschirmposition der Box bzw. Bildgröße am TV), Einstellung am Gerät, nicht in der Seite.

## Version 2026-11-04.13
- **Logo-Blende entfernt** (Wunsch des Nutzers), `slike/blende.webp` gelöscht.
- **Hutba wechselte auf dem TV nicht (am PC schon):** Die MQTT-Bibliothek `lib/mqtt.min.js` (mqtt.js 5.16, sehr neues JavaScript: Klassenfelder, `?.` usw.) läuft im alten Browser der Box nicht → keine Verbindung. Der Fernseher nutzt jetzt `lib/mqtt-tv.min.js` = mqtt.js 4.3.8, mit esbuild auf ES2015 heruntergerechnet. Das Handy (`hutba/`) nutzt weiter `lib/mqtt.min.js`. Getestet: Handy → TV wechselt zur Hutba und zurück.
- Großes Logo im Hintergrund stärker: Deckkraft 0.08 → 0.14.
- Hinweis: Der Browser der Box ist alt (kein flex-`gap`, kein neues JavaScript). Neue Funktionen für den TV immer in einfachem JavaScript (ES5) und ohne neue CSS-Funktionen bauen.
- Schwarzer Rand: lag an der Box (Display → HDMI → Bildgröße), vom Nutzer behoben.

## Version 2026-11-04.14 – Diagnose (vorübergehend)
- Hutba wechselte auf der Box immer noch nicht. Unten links auf dem TV erscheint nach jedem Laden für 15 Minuten eine Diagnose: Chrome-/Android-Version der Box, Uhr der Box, ob die MQTT-Bibliothek geladen ist, Zustand jedes der 3 Server (VERBUNDEN / FEHLER …), Anzahl Nachrichten vom Handy, JavaScript-Fehler. Nutzer schickt ein Foto davon. Danach wieder entfernen (`#dijagnoza` in index.html, `naDogadjaj` in prijevod-veza.js).

## Lösung Hutba auf der Box (2026-11-04.16)
- **Ursache:** Die Uhr der Box (H20, Android 10, ohne Uhr-Batterie) stand nach dem Neustart auf 1.1.1970 bzw. war falsch → alle sicheren Verbindungen (SSL/wss zu den MQTT-Servern, GitHub) schlugen fehl → keine Hutba, keine Updates, alte gespeicherte Seite.
- **Behoben:** Datum & Uhrzeit an der Box von Hand eingestellt, Cache in Fully geleert. Hutba funktioniert jetzt.
- **Achtung nach Stromausfall:** Uhr der Box prüfen (Einstellungen → Datum & Uhrzeit). Ist sie falsch, gehen Hutba und Updates nicht.
- Diagnose-Anzeige wieder entfernt. Die MQTT-Bibliothek für alte Browser (`lib/mqtt-tv.min.js`) bleibt.

## Neues Logo aus dem PDF (2026-11-04.17)
- Quelle: PDF des Nutzers (Adobe Illustrator, Vektor), **Seite 2** (Logo ohne Schrift), mit pdftocairo bei 400 dpi transparent gerendert und zugeschnitten (2467 × 2333 px).
- Daraus: `slike/logo.png` (1100 px hoch, Wasserzeichen), `logo-klein.png` (180 px), `logo-mittel.png` (260 px).
- **App-Symbol für Verknüpfung auf dem Handy:** `slike/apple-touch-icon.png` (iPhone), `slike/ikona-192.png`, `ikona-512.png`, `ikona-512-maskable.png` (Android), `slike/favicon.png` + `favicon.ico` (Browser-Tab). `manifest.webmanifest` („Vaktija Elif“) und `hutba/manifest.webmanifest` („Hutba Elif“), Hintergrund Creme #fbf8ef.
- **2026-11-04.18:** Countdown in den letzten 15 Min. vor dem Gebet bleibt golden, pulsiert aber nicht mehr (wird nicht mehr größer/kleiner).
- **2026-11-04.20:** Grüne Ringe (Wellen) auf dem Gebetsbildschirm entfernt, weil der TV dabei ruckelte.
- **2026-11-04.21:** Gebetsbildschirm unten „Sljedeći namaz“ zeigt jetzt die **Ezan-Zeit** (z. B. Sabah sutra u 06:32, Jacija u 19:00), nicht mehr die Gebetszeit (+10 Min.).
- **Jacija-Regel:** Ezan frühestens 19:00. Ist die Jacija laut Takvim später als 19:00, gilt der Takvim (`jacijaFiksno: { vrijeme: "19:00" }`, ohne Enddatum, gilt also auch für den nächsten Takvim).

## Hutba: Arabisch richtig erkennen (2026-11-06)
- **Problem:** Die Spracherkennung des Handys kennt nur eine Sprache (Bosnisch). Arabisch kommt deshalb „verhört“ an, z. B. „Hamdo rabbi alim“ statt „Elhamdulillahi rabbil alemin“, und wurde falsch übersetzt.
- **Neu: unscharfe Erkennung auf dem Handy** (`hutba/index.html` → `NEJASNE`, `nejasneFormule`): Verhörte Wörter werden nach dem Klang (ohne Vokal-Unterschiede, h und doppelte Buchstaben, bis 20 % Abweichung bei langen Formeln) mit über 30 bekannten Formeln verglichen und durch den **genauen arabischen Text** ersetzt. Das läuft vor jedem Übersetzer, also für **Google (kostenlos), Claude Haiku, Claude und Gemini** gleich.
  - Enthalten u. a.: Elhamdulillahi rabbil alemin, Bismillah, Euzu billahi, Hutba-Eröffnung (Innel-hamde lillahi nahmeduhu …, ve neuzu billahi …, men jehdihillahu …, ešhedu …), La ilahe illallah, La havle …, Inna lillahi …, Allahumme salli …, Ekulu kavli haza …, Subhanehu ve teala, Azze ve dželle, Emma ba'du, Sadekallahul azim, Amin ja rabbel alemin, Salavat (→ ﷺ), Verse 2:201, 33:56, 16:90 (Text aus `kuran.js`).
  - Neue Formel hinzufügen: in `NEJASNE` eine Zeile `["arabischer Text", "schreibweise 1|schreibweise 2"]` – am besten so geschrieben, wie die Erkennung sie auf dem Handy anzeigt.
  - Getestet: normaler bosnischer Hutba-Text (auch Wörter wie alim, Alem, Lila, Ila, Rabija) wird **nicht** verändert.
- **Neue Einstellung „Arabisch in der Hutba“:** Standard **„Nur arabische Schrift, ohne Übersetzung“**. Alternativ „Arabische Schrift + Übersetzung“ (wie vorher). Gilt für alle Übersetzer und auch für Gemini-Spracherkennung (gespeichert als `hutba-arnacin`).
- KI-Anweisungen (Haiku, Claude, Gemini) ergänzt: weitere verhörte Beispiele, Arabisch immer in arabischer Schrift, je nach Einstellung ohne Übersetzung.
- **Tipp:** Die Spracherkennung „Gemini“ (Einstellungen → Spracherkennung) hört die Tonaufnahme selbst und erkennt Arabisch direkt, auch Sätze, die nicht in der Liste stehen. Kostenloser Schlüssel von aistudio.google.com.

## Hutba: Taste „Arapski / Kur'an“ (2026-11-06, vor der Džuma)
- **Ursache, warum Arabisch nicht ging:** Die Spracherkennung des Handys (Chrome/Safari) kann **immer nur eine Sprache gleichzeitig**. Auf Bosnisch eingestellt, hört sie Arabisch als bosnische Wörter („u rahmet ula“) oder schreibt bei einer Sure gar nichts. Bosnisch und Arabisch automatisch gemischt erkennt nur eine KI, die den Ton selbst hört (Gemini-Spracherkennung).
- **Lösung:** Während das Mikrofon läuft, gibt es unter dem Mikrofon die goldene Taste **„Arapski / Kur'an“**. Vor dem Rezitieren antippen, dann hört das Handy Arabisch (ar-SA). Danach wieder antippen, und es hört wieder Bosnisch.
  - Was auf Arabisch erkannt wird, wird im gespeicherten Mushaf (`kuran.js`, ganzer Koran) gesucht. Gefundene Verse erscheinen als **exakter Mushaf-Text mit Quelle** (z. B. Sure Al-Ikhlas 112:1-2), danach die Übersetzung.
  - Euzu und Bismillah vor dem Vers werden erkannt und exakt geschrieben.
  - Bei fortlaufender Rezitation wird der nächste Vers bevorzugt (auch die wiederholten Verse in Ar-Rahman).
  - Ein langer Vers, der in mehreren Atemzügen gelesen wird, erscheint nur einmal (4 Min. Sperre pro Vers).
  - Arabisch, das kein Vers ist (Hadith, Dua), erscheint so, wie es erkannt wurde, in arabischer Schrift mit Übersetzung.
  - Wenn man vergisst zurückzuschalten: Haiku, Claude und Gemini merken, wenn der „arabische“ Text keinen Sinn ergibt (also eigentlich Bosnisch war). Der Satz wird dann verworfen, und es wird automatisch auf Bosnisch zurückgeschaltet.
  - Suche: Text ohne Vokalzeichen, Alif und Hamza. Kandidaten über 4-Buchstaben-Stücke, dann genauer Vergleich. Treffer bis 30 % Abweichung, kurze Stücke bis 22 %. Der Index wird 3 s nach dem Laden im Hintergrund aufgebaut. Test: 85–89 % Treffer bei 12 % zufälligen Buchstabenfehlern; Hadithe und Duas werden nicht als Vers erkannt.
- **Selam** (Esselamu alejkum ve rahmetullahi ve berekatuhu, auch „Assalamu alaikum … u rahmet ula …“), ve alejkumu selam: in die Formel-Liste aufgenommen. „ve/va/wa/u“ gelten beim Vergleich als dasselbe Wort, j = i.
- **Fehler behoben:** War „Gesprochene Sprache: Arabisch“ eingestellt, wurde gar nicht übersetzt.
- **Standard jetzt wieder „Arabische Schrift + Übersetzung“** (Wunsch des Nutzers: Arabisch auch übersetzen). Einmalig für alle Handys umgestellt (`hutba-v5`), die Einstellung kann weiter geändert werden.
- Später möglich: die deutsche Koran-Übersetzung aus dem PDF des Nutzers (german.pdf) fest einbauen. Dann kommt die Bedeutung jedes Verses aus der Übersetzung statt von der KI bzw. Google.

## Hutba: Arabisch ohne Übersetzung, Versnummern, Sure am Ende (2026-11-06, mittags)
- **Wunsch:** Arabisches wird **nicht übersetzt**, weil der Imam selbst übersetzt. Standard wieder „Nur arabische Schrift“ (einmalig umgestellt: `hutba-v6`).
- **Versnummer wie im Mushaf** hinter jedem Vers: ﴿١﴾, ﴿٢﴾ … (auch bei einem einzelnen Vers).
- **Quelle erst am Ende:** Während der Rezitation stehen nur die Verse. Wenn die Taste zurück auf Bosnisch getippt wird, erscheint nach ca. 2,5 s eine eigene Zeile, z. B. **„Sure Al-Ikhlas, Verse 1–4 · Sure Ash-Sharh, Verse 5–6“**. Aufeinanderfolgende Verse werden zusammengefasst, Sure-Namen aus `kuran.js`, Wörter in der Zielsprache (Vers/Verse, verset/versets, ajet/ajeti …).
- **„Sadakallahul-azim“ (صدق الله العظيم)** am Ende der Rezitation wird erkannt, exakt geschrieben und schaltet automatisch zurück auf Bosnisch (mit Sure-Zeile).
- Ein einzelnes arabisches Wort ohne Vers (z. B. أنا „Ana“, wenn „sura“ falsch gehört wird) wird nicht angezeigt.
- Mit Claude-Schlüssel prüft Haiku arabische Teile ohne Vers kurz: Ist das gar kein Arabisch (z. B. Bosnisch, falsch erkannt), wird der Satz entfernt und zurückgeschaltet.
- KI-Anweisung ergänzt: „sura“ und „ajet“ werden oft falsch gehört (z. B. „Ana“). Vor einem Sure-Namen oder einer Zahl als Sure/Vers übersetzen, nie als Name.

## Hutba: ﷺ und Sure-Namen auf Bosnisch (2026-11-06)
- **ﷺ hinter dem Namen:** Mehr Schreibweisen der Spracherkennung werden erkannt (wa sallam, vesselem, ve selam, sala lahu …, auch nur „alejhi ve sellem“ nach Muhammed/Poslanik/Resulullah). Ergebnis z. B. „Muhammed ﷺ je rekao“. Die Schrift Amiri auf dem TV enthält das Zeichen (geprüft).
- **Sure-Namen:** Liste aller 114 Suren auf Bosnisch (`SURE_BS`, z. B. El-Fatiha, Kaf, En-Nas, Ja-Sin) plus Varianten (Qaf, Yasin, Ikhlas, Tebbet …) und die Namen aus `kuran.js`. Nach dem Wort „sura/suri/suru/sure“ (oder dem falsch gehörten „Ana“) wird der ähnlichste Name gesucht und richtig geschrieben: „u suri kafa kaže“ → „u suri Kaf kaže“, „Ana Kaf“ → „sura Kaf“.
- Ohne das Wort „sura“ (wenn die Erkennung es verschluckt) entscheidet Haiku nach dem Zusammenhang. Die KI-Anweisung enthält dafür die Namensliste und den Hinweis „nie Kaffee, nie Personenname“.
- Getestet: „sura na kraju“, „sura koja govori“, „Ana je došla“, „popiti kafu“ bleiben unverändert.
- **Nachtrag (06.11.):** Die Spracherkennung schreibt den Salavat oft nur als „a e i“. Darum jetzt: **Nach „Muhammed“ (auch Muhammeda/-u/-om) kommt immer ﷺ**. Kurzer Buchstabensalat bzw. Salavat-Reste direkt danach (a, e, i, ve, sala, lahu, alejhi, selam …) werden entfernt, sobald es mindestens zwei solche Stücke oder ein Salavat-Wort sind. Ein einzelnes „i“ (und) bleibt stehen. Nach Poslanik/Resulullah/Vjerovjesnik kommt ﷺ, wenn dahinter ein Salavat folgt. Nicht bei „sura Muhammed“. Steht ﷺ schon am Ende des vorigen Teils, wird es am Anfang des nächsten nicht wiederholt.
- **„uri“ statt „suri“:** Ein Wort wie uri/ure/uru/turi/zuri **direkt vor einem Sure-Namen** wird zu suri/sure/suru („u uri Merjem“ → „u suri Merjem“). Beim Namensvergleich gilt j = i (Meriem = Merjem).

## Džuma auf dem TV (geprüft 2026-11-06)
- Ablauf am Freitag (Einstellung `dzuma` in `vaktija.js`: hutbaZimi 13:00, hutbaLjeti 14:00, trajanje 40):
  - Zur normalen Podne-Zeit passiert nichts.
  - Bis 13:00 zeigt das Dashboard „Sljedeće: Džuma – hutba za …“.
  - **Um 13:00** erscheint die Folie „Džuma – Hutba je počela · bitte Handys lautlos stellen“ **ohne Countdown**.
  - **Um 13:40** geht es zurück zum Dashboard mit allen Vakten.
- Die Hutba-Übersetzung liegt während dieser Zeit über der Folie. Wird sie beendet, ist die Folie bis 13:40 wieder da.
- **Neu:** Läuft die Übersetzung um 13:40 noch, beendet der Fernseher sie trotzdem und zeigt das Dashboard. Diese Hutba-Sitzung wird danach ignoriert. Eine neu gestartete Hutba wird wieder angezeigt. Gilt nur freitags.
- Wichtig: Der Fernseher lädt nur neu, wenn sich `vaktija.js` ändert. Die Änderung in `index.html` wurde am 06.11. um 12:50 bewusst ohne Versionssprung hochgeladen, damit der TV während der Džuma nicht neu lädt. Aktiv seit Version 2026-11-07.22 (am 07.11. hochgezählt).

## Hutba: Arabisch automatisch (2026-11-07)
- Wunsch: ohne Taste Bosnisch und Arabisch sprechen.
- Die Handy-Spracherkennung kann nur eine Sprache gleichzeitig. Deshalb wechselt das Handy jetzt **selbst** an typischen Stellen. Einstellung „Arabisch automatisch erkennen“ (Standard: Ja, `hutba-arauto`).
- **Auf Arabisch:**
  - wenn „Euzu billahi …“ / „… šejtanir radžim“ erkannt wird, schon während des Sprechens,
  - bei Bismillah, aber nur bis 12 s nach einer automatischen Rezitation (nächste Sure).
- **Zurück auf Bosnisch:**
  - wenn ein Vers zu Ende rezitiert ist und danach kein Koran bzw. kein echtes Arabisch kommt. Das Gehörte wird verworfen, es gehen ca. 1–2 s verloren.
  - 5 s nach einem vollständigen Vers ohne weitere Rezitation,
  - am Ende einer Sure,
  - bei „Sadakallahul azim“,
  - nach 8 s ohne arabisches Ergebnis,
  - nach 30 s ohne erkannten Vers.
  - Nach jedem Zurückschalten erscheint die Sure-Zeile.
- „Echtes Arabisch“ wird so geprüft: Gilt der Text als Vers aus dem Mushaf, oder stehen mindestens 50 % der Wörter (ab 3 Buchstaben) im Wortschatz des Korans? Ist der Anteil unter 35 % (bei einem fertigen Satz), wird der Satz verworfen. Mit Claude-Schlüssel prüft zusätzlich Haiku.
- Reste von Euzu am Anfang nach dem Umschalten (… الشيطان الرجيم) werden entfernt und nicht als Vers erkannt.
- Die Taste geht weiterhin. Von Hand eingeschaltet, gibt es kein automatisches Zurückschalten (nur „Sadakallahul azim“ und die Haiku-Prüfung).
- Arabisch **ohne** Euzu (Formeln, kurzer Vers mitten im Satz) wird wie bisher im Bosnisch-Modus behandelt (Formel-Liste, Haiku erkennt Verse).
- Vollautomatisch überall ginge nur mit der Spracherkennung „Gemini“ (hört den Ton selbst). Dafür braucht es einen Gemini-Schlüssel, und der Text kommt ca. 10 s später.
- Getestet mit simulierter Spracherkennung: Euzu → Ash-Sharh 5–6 → bosnischer „Unsinn“ → sofort zurück; Euzu → Al-Ikhlas komplett → Sure-Ende → zurück; Bismillah → Al-Falaq 1–2 → 5 s Stille → zurück; Taste → bleibt; Bismillah ohne Rezitation → bleibt Bosnisch.
- **Nachtrag:** Bei eingeschalteter Automatik ist die Taste dezent (gestrichelt) und heißt „Arapski: automatski – sam prelazi kod „Euzu billahi …“, dodirnite samo ako zatreba“. Im automatischen Arabisch-Modus steht dort „Sada: ARAPSKI (automatski) – sam se vraća na bosanski, dodir = odmah nazad“. Nur bei ausgeschalteter Automatik steht noch „vor dem Rezitieren tippen“.

## Hutba: Gemini als „Ohr“ für Bosnisch + Arabisch gemischt (2026-11-07)
- **Ziel des Imams:** mitten in der Hutba nie aufs Handy schauen, egal ob Bosnisch, ein arabischer Einschub oder eine Rezitation, auch ohne „Euzu“.
- Mit der Spracherkennung des Handys ist das unmöglich, sie hört nur eine Sprache. Deshalb wurde die Spracherkennung **„Gemini“** umgebaut:
  - Gemini **hört nur zu** und schreibt alles auf: Bosnisch in lateinischer Schrift, Arabisch in arabischer Schrift in Klammern (Prompt in `gemini()`, Antwort-Feld `text`). Arabisch ohne Klammern wird automatisch eingeklammert (`zagradiArapski`).
  - Danach läuft alles wie im normalen Modus. Übersetzt wird mit dem gewählten Übersetzer (z. B. **Haiku**), die Übersetzer-Auswahl ist jetzt auch bei Gemini sichtbar. Formeln, ﷺ und Sure-Namen werden wie gewohnt ergänzt. Arabisch nach Einstellung, Standard ohne Übersetzung.
  - Jeder arabische Teil wird im gespeicherten Mushaf gesucht (`arapskiBlokoviGemini`). Gefundene Verse erscheinen **exakt** mit ﴿١﴾. Die Verse müssen also nicht von Gemini selbst erkannt werden.
  - **Sure-Angabe:** Kommt nach dem letzten Vers im selben Stück Bosnisch, steht „Sure …, Verse …“ direkt unter dem Vers (der TV zeigt es als Quellenzeile). Endet ein Stück mit einem Vers, wird beim nächsten Stück ein Platz reserviert. Enthält das nächste Stück keinen Vers, steht dort die Sure-Zeile, zwischen Rezitation und bosnischem Text. Beim Ausschalten des Mikrofons kommt sie nach 4 s.
  - Ton-Stücke: Schnitt bei Sprechpause nach mind. 4 s, spätestens nach 12 s (vorher 5/14 s). Der Text kommt ca. 5–15 s nach dem Sprechen.
  - **Modell:** Standard `gemini-flash-latest`. Meldet Gemini „Kontingent erschöpft“ (429), wechselt die Seite für den Rest der Sitzung automatisch auf `gemini-flash-lite-latest`. Ein im Feld „Gemini-Modell“ eingetragenes Modell wird immer verwendet.
  - **Kontingent kostenlos:** Google nennt keine festen Zahlen (siehe aistudio.google.com/rate-limit). Berichtet werden für Flash teils nur ~20 Anfragen/Tag, für Flash-Lite ~500–1500/Tag. Eine Hutba braucht ca. 150–250 Anfragen. Wenn es nicht reicht: in AI Studio die Abrechnung aktivieren, das kostet wenige Cent pro Hutba.
- Sure-Namen-Korrektur und ﷺ wirken nur noch **außerhalb** arabischer Klammern, damit die Quellenangabe nicht verändert wird. Ein richtig geschriebener Sure-Name mit großem Anfangsbuchstaben (z. B. „El-Inširah“) bleibt, wie der Imam ihn gesagt hat.
- Getestet mit simuliertem Mikrofon und simulierten Gemini-Antworten. Echte Gemini-Aufrufe sind in dieser Umgebung gesperrt und **nicht getestet**.
- **Nachtrag (07.11.):** Auf dem iPhone blieben alle Zeilen bei „Höre zu…“ stehen. Gemini antwortete nicht oder sehr langsam, wahrscheinlich weil das große Modell vorher „nachdenkt“. Änderungen:
  - Standardmodell jetzt **`gemini-flash-lite-latest`**. Das reicht, weil Gemini nur mitschreibt, und es ist schneller und hat mehr Gratis-Kontingent.
  - „Nachdenken“ ist aus (`thinkingBudget: 0`). Lehnt ein Modell das ab (400 „thinking“), kommt automatisch ein zweiter Versuch ohne diese Einstellung.
  - Bei 429/404 wird zwischen Flash-Lite und Flash gewechselt.
  - **Zeitgrenze 30 s** pro Tonstück. Danach erscheint die Fehlermeldung oben und 20 s lang in der Liste.
  - Wartende Zeilen zeigen die Sekunden („Höre zu… 7 s“).
  - Neue Taste **„Gemini testen“** in den Einstellungen. Sie schickt eine kurze Testfrage und zeigt Ergebnis, Dauer und Modell bzw. den genauen Fehler.
