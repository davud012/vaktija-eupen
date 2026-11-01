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

## Später geplant

- **Neuer Takvim:** Jedes Jahr im **Dezember** die Takvim-Seiten fürs nächste Jahr fotografieren und Claude schicken. Claude trägt sie in `vaktija.js` ein und lädt sie hoch. Der Fernseher übernimmt das automatisch.
  Wichtig: Aktuell ist nur bis **31.12.2026** echt eingetragen. Der Takvim für 2027 muss also **vor Januar** kommen.
- Gespräch mit dem **App-Entwickler** (Paket in `fuer-app-entwickler/` liegt bereit)

## Erledigt / verworfen

- Logo-Entwurf (Halbmond mit „Elif“): auf Wunsch verworfen
- Umgehen des IZ-App-Abos: abgelehnt, stattdessen diese eigene Anzeige
