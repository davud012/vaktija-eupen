# Vaktija-TV für den Džemat Eupen – Einrichtung

So läuft es:

```
GitHub (die Dateien liegen online)  →  Android-TV-Stick/-Box (öffnet die Seite)  →  Fernseher (HDMI)
```

Es wird **kein USB-Speicherstick** gebraucht. Der „Stick“ ist das kleine Android-Gerät selbst,
das in den HDMI-Anschluss des Fernsehers gesteckt wird. Es lädt die Anzeige aus dem Internet.
Änderungen (z. B. neuer Takvim) kommen **automatisch innerhalb von 5 Minuten** auf den Fernseher.

---

## Teil 1: Auf GitHub online stellen (einmalig, ca. 10 Minuten, am PC)

1. Auf **github.com** anmelden.
2. Oben rechts **„+“ → „New repository“**.
   - Repository name: `vaktija-eupen`
   - **Public** auswählen (GitHub Pages ist für öffentliche Repositories kostenlos).
   - Auf **„Create repository“** klicken.
3. Auf der neuen Seite den Link **„uploading an existing file“** anklicken.
4. Die ZIP-Datei `vaktija-eupen-github.zip` am PC **entpacken**. Dann den **Inhalt** des entpackten Ordners
   (alle Dateien und den Ordner `fonts`, nicht den Ordner selbst) in das Browserfenster ziehen.
   Warten, bis alle Dateien hochgeladen sind, dann unten **„Commit changes“**.
5. Im Repository oben auf **„Settings“** → links **„Pages“**.
   - Bei „Source“: **„Deploy from a branch“**
   - Branch: **main**, Ordner: **/(root)** → **Save**
6. 1–2 Minuten warten. Oben auf der Pages-Seite erscheint die Adresse:
   **`https://DEIN-BENUTZERNAME.github.io/vaktija-eupen/`**
7. Diese Adresse am PC im Browser öffnen und prüfen, ob alles richtig angezeigt wird.

**Updates später:** Im Repository die Datei anklicken (z. B. `vaktija.js`) → „Add file → Upload files“ →
neue Datei mit gleichem Namen hochziehen → „Commit changes“. Der Fernseher übernimmt das in höchstens 5 Minuten.
(Noch einfacher: das Repository mit Claude verbinden, dann kann Claude die Updates direkt hochladen.)

---

## Teil 2: Android-TV-Stick einrichten (einmalig, am Fernseher)

Geeignet sind z. B. ein gebrauchter **Chromecast mit Google TV**, ein **Fire TV Stick** oder eine
**Android-TV-Box**. Wichtig: WLAN (oder LAN) in der Moschee.

1. Stick in den HDMI-Anschluss des Fernsehers stecken, Strom anschließen, Fernseher auf diesen HDMI-Eingang stellen.
2. Der Einrichtung auf dem Bildschirm folgen (Sprache, **WLAN**, Konto).
3. **Uhrzeit:** Einstellungen → System/Gerät → **Datum & Uhrzeit** → „Automatisch (vom Netzwerk)“ einschalten,
   **Zeitzone: Brüssel**. (Die Anzeige korrigiert sich zusätzlich selbst über das Internet.)
4. **Bildschirmschoner aus:** Einstellungen → Display/Gerät → **Bildschirmschoner → Nie**,
   und „Ruhezustand/Sleep“ → **Nie**.
5. **Kiosk-Browser installieren:** „**Fully Kiosk Browser**“.
   - Google TV / Android TV: im Play Store suchen. Falls nicht vorhanden: App „**Downloader**“ installieren
     und Fully Kiosk von der Herstellerseite **fully-kiosk.com** laden.
   - Fire TV: App „Downloader“ aus dem Amazon-Store, in den Einstellungen für „Downloader“
     „Apps unbekannter Herkunft“ erlauben, dann Fully Kiosk von **fully-kiosk.com** installieren.
6. In Fully Kiosk:
   - **Start URL:** `https://DEIN-BENUTZERNAME.github.io/vaktija-eupen/`
   - **Launch on Boot** (beim Einschalten starten): **an**
   - **Keep Screen On** (Bildschirm anlassen): **an**
   - Vollbild / Statusleiste ausblenden: **an**
   (Einige Zusatzfunktionen von Fully Kiosk kosten einmalig ein paar Euro. Die Grundfunktionen reichen.)
7. **Am Fernseher selbst:** „Automatisch ausschalten“ / „Auto-Standby“ / „Eco“ **ausschalten**.
   Viele Fernseher schalten sich sonst nach 4 Stunden ohne Fernbedienung ab.
8. Test: Stecker vom Stick ziehen, wieder einstecken → die Anzeige muss von alleine wieder starten.

---

## Teil 3: Fernzugriff mit AnyDesk

Damit man von zu Hause auf den Stick zugreifen kann (nur für Probleme am Gerät nötig, die Anzeige
selbst aktualisiert sich über GitHub automatisch):

1. Auf dem Stick: **AnyDesk** installieren (Play Store bzw. Amazon-Store). Beim ersten Start fragt AnyDesk
   eventuell nach einem **„Control Plugin“** – installieren und Berechtigungen erlauben.
2. In AnyDesk: Einstellungen → Sicherheit → **„Unbeaufsichtigten Zugriff“** aktivieren und ein
   **starkes Passwort** festlegen.
3. Die **AnyDesk-ID** (9–10 Ziffern) notieren.
4. Zu Hause am PC AnyDesk installieren, die ID eingeben, mit dem Passwort verbinden.
5. **Vor dem Aufhängen testen**, ob Steuern (nicht nur Zuschauen) funktioniert. Das klappt nicht auf jedem Gerät gleich gut.

Hinweise:
- Die kostenlose AnyDesk-Version ist für **private Nutzung**. Bei Nutzung für einen Verein kann AnyDesk
  das als gewerblich einstufen und die Verbindung begrenzen. Kostenlose Alternative: **RustDesk**
  (gleiche Bedienung, auch für Android). Ebenfalls möglich: TeamViewer QuickSupport.
- ID und Passwort niemandem weitergeben.

---

## Wie das Datum stimmt

Die Anzeige fragt jede Sekunde die Uhr ab und zeigt immer die Zeiten des **heutigen** Tages.
War der Fernseher 5 Tage aus, zeigt er beim Einschalten direkt den richtigen Tag.
Zusätzlich holt sie sich alle 5 Minuten die genaue Zeit vom Server und korrigiert eine falsche Geräteuhr.
Stimmt die Uhr gar nicht (kein Internet nach einem Stromausfall), erscheint oben ein roter Hinweis.

## Neuer Takvim

Einmal im Jahr (im Dezember) die Takvim-Seiten fotografieren und Claude schicken.
Claude erstellt eine neue `vaktija.js`, die wie oben unter „Updates später“ hochgeladen wird.

## Zum Ausprobieren (am PC)

An die Adresse anhängen:
- `?vrijeme=2026-12-10T12:34:50` – eine bestimmte Uhrzeit (hier: kurz vor Podne)
- `?brzina=600` – Zeitraffer (1 Sekunde = 10 Minuten)
